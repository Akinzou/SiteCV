"""Combined static-site + contact-form server for the Mikrus Frog deployment.

Frog gives you one small Alpine box with no Docker, no root/sudo, and no
public IPv4 (see wiki.mikr.us/frog) - just a dedicated IPv6 address plus 3
NAT'd high ports on a shared IPv4. Binding port 80 fails as a non-root user,
so this listens on one of the assigned high ports instead, on both IPv4 and
IPv6 via a single dual-stack socket (bindv6only=0 on this box), and Cloudflare
sits in front doing TLS + proxying 443/80 -> that port via an Origin Rule.

There's no nginx to do it, so this single FastAPI/Uvicorn process serves
*both* the built frontend (vite's dist/) - reimplementing the
`try_files $uri $uri.html $uri/ =404` logic from the VPS's nginx.conf - and
the contact API, instead of splitting them across a web server and a
separate backend container like the Docker deployment did.

Rate limiting is a plain in-process dict, same as the original VPS version
(contact-api/main.py) - correct here because Frog runs exactly one
long-lived process, unlike a serverless deployment where that assumption
breaks (see the abandoned api/ Vercel attempt, which needed Redis instead).
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from pydantic import BaseModel, EmailStr
from collections import defaultdict
from pathlib import Path
import ipaddress
import time
import os
import resend
import httpx

resend.api_key = os.environ.get("RESEND_API_KEY")
if not resend.api_key:
    raise RuntimeError("RESEND_API_KEY environment variable is required")

RECAPTCHA_SECRET_KEY = os.environ.get("RECAPTCHA_SECRET_KEY")
if not RECAPTCHA_SECRET_KEY:
    raise RuntimeError("RECAPTCHA_SECRET_KEY environment variable is required")

DIST_DIR = Path(os.environ.get("DIST_DIR", Path(__file__).parent / "dist")).resolve()

# Cloudflare's published edge ranges (cloudflare.com/ips) - only these peers
# are trusted to set CF-Connecting-IP. Anyone connecting directly (bypassing
# Cloudflare, e.g. straight to the IPv6 or the frog01.mikr.us port) gets rate
# limited by their real socket address instead, so they can't spoof the
# header to dodge the per-IP limit the same way the VPS's X-Real-IP could be
# spoofed before that was fixed.
CLOUDFLARE_NETWORKS = [
    ipaddress.ip_network(net)
    for net in [
        "173.245.48.0/20", "103.21.244.0/22", "103.22.200.0/22", "103.31.4.0/22",
        "141.101.64.0/18", "108.162.192.0/18", "190.93.240.0/20", "188.114.96.0/20",
        "197.234.240.0/22", "198.41.128.0/17", "162.158.0.0/15", "104.16.0.0/13",
        "104.24.0.0/14", "172.64.0.0/13", "131.0.72.0/22",
        "2400:cb00::/32", "2606:4700::/32", "2803:f800::/32", "2405:b500::/32",
        "2405:8100::/32", "2a06:98c0::/29", "2c0f:f248::/32",
    ]
]

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yelon.pro", "https://www.yelon.pro"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

rate_limit_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 3  # max requests
RATE_WINDOW = 3600  # per hour (seconds)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    timestamp: int  # form open timestamp
    website: str = ""  # honeypot field - should be empty
    recaptcha: str  # reCAPTCHA response token


def get_client_ip(request: Request) -> str:
    peer = request.client.host if request.client else ""
    try:
        is_from_cloudflare = any(
            ipaddress.ip_address(peer) in net for net in CLOUDFLARE_NETWORKS
        )
    except ValueError:
        is_from_cloudflare = False

    if is_from_cloudflare:
        cf_ip = request.headers.get("cf-connecting-ip")
        if cf_ip:
            return cf_ip

    return peer


async def verify_recaptcha(token: str, ip: str) -> bool:
    """Verify reCAPTCHA token with Google"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": token,
                "remoteip": ip
            }
        )
        result = response.json()
        return result.get("success", False)


def check_rate_limit(ip: str) -> bool:
    """Returns True if request is allowed, False if rate limited"""
    now = time.time()
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < RATE_WINDOW]

    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        return False

    rate_limit_store[ip].append(now)
    return True


@app.post("/api/contact/send")
async def send_message(form: ContactForm, request: Request):
    client_ip = get_client_ip(request)

    # 1. Honeypot check - if filled, it's a bot
    if form.website:
        # Pretend success but don't send
        return {"status": "success", "message": "Message sent"}

    # 2. reCAPTCHA verification
    if not await verify_recaptcha(form.recaptcha, client_ip):
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    # 3. Timestamp check - form filled too fast (< 3 seconds)
    current_time = int(time.time() * 1000)
    time_diff = current_time - form.timestamp
    if time_diff < 3000:  # less than 3 seconds
        raise HTTPException(status_code=400, detail="Please slow down")

    # 4. Rate limiting
    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Try again later.")

    # 5. Basic validation
    if len(form.name) < 2 or len(form.message) < 10:
        raise HTTPException(status_code=400, detail="Name or message too short")

    if len(form.name) > 100:
        raise HTTPException(status_code=400, detail="Name too long")

    if len(form.message) > 5000:
        raise HTTPException(status_code=400, detail="Message too long")

    # 6. Send email via Resend
    try:
        resend.Emails.send({
            "from": "Contact Form <contact@yelon.pro>",
            "to": ["root@yelon.pro"],
            "reply_to": form.email,
            "subject": f"[yelon.pro] Message from {form.name}",
            "text": f"""New message from yelon.pro contact form:

Name: {form.name}
Email: {form.email}
IP: {client_ip}

Message:
{form.message}

---
Sent via yelon.pro contact form"""
        })
        return {"status": "success", "message": "Message sent"}
    except Exception as e:
        print(f"Resend error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message")


@app.get("/health")
async def health():
    return {"status": "ok"}


# ---- Static site: reimplements nginx.conf's try_files behaviour ----

WEBMANIFEST_MEDIA_TYPE = "application/manifest+json"
LONG_CACHE_HEADERS = {"Cache-Control": "public, max-age=31536000, immutable"}
LONG_CACHE_SUFFIXES = (
    ".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot",
)


def _safe_dist_path(relative: str) -> Path | None:
    """Resolves relative against DIST_DIR, rejecting any path that escapes it."""
    candidate = (DIST_DIR / relative).resolve()
    if candidate != DIST_DIR and DIST_DIR not in candidate.parents:
        return None
    return candidate


def _serve_file(path: Path) -> FileResponse:
    headers = LONG_CACHE_HEADERS if path.name.endswith(LONG_CACHE_SUFFIXES) else None
    media_type = WEBMANIFEST_MEDIA_TYPE if path.name == "site.webmanifest" else None
    return FileResponse(path, headers=headers, media_type=media_type)


@app.get("/{path:path}")
async def serve_static(path: str):
    if path == "about.html":
        return RedirectResponse("/about", status_code=301)

    if path in ("", "index.html"):
        return _serve_file(DIST_DIR / "index.html")

    exact = _safe_dist_path(path)
    if exact and exact.is_file():
        return _serve_file(exact)

    html_variant = _safe_dist_path(f"{path}.html")
    if html_variant and html_variant.is_file():
        return _serve_file(html_variant)

    index_variant = _safe_dist_path(f"{path}/index.html")
    if index_variant and index_variant.is_file():
        return _serve_file(index_variant)

    return FileResponse(DIST_DIR / "404.html", status_code=404)
