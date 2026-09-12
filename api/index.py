"""Vercel serverless entry point for the contact form API.

Adapted for Vercel's serverless runtime, where every invocation may land on a
fresh, short-lived instance:

- Rate limiting can no longer live in an in-process dict (each instance would
  have its own, and it wouldn't survive between invocations), so it's backed
  by Upstash Redis instead.
- The client IP is read from X-Forwarded-For rather than an internally
  trusted proxy header, because on Vercel that header is set by Vercel's own
  edge network in front of the function and can't be spoofed by the caller -
  unlike a self-hosted box where you have to prove the request actually came
  through your own reverse proxy first.

Requires these environment variables (Vercel project settings):
  RESEND_API_KEY, RECAPTCHA_SECRET_KEY,
  UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
(the two Upstash ones are set automatically if you add Upstash via the
Vercel integration).

vercel.json rewrites /api/(.*) to this function, so the routes below are
declared at their full public path - except /api/pepy/*, which vercel.json
carves out ahead of that rule and proxies straight to pepy.tech, so it never
reaches this app. Don't add a route here for it.
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from upstash_redis import Redis
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

redis = Redis.from_env()

app = FastAPI()

# CORS - only allow yelon.dev. yelon.pro now just 301s here (see
# vercel.json), so no page is ever served from that origin anymore.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yelon.dev", "https://www.yelon.dev"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

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
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


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
    key = f"contact-rate:{ip}"
    count = redis.incr(key)
    if count == 1:
        redis.expire(key, RATE_WINDOW)
    return count <= RATE_LIMIT


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
            "from": "Contact Form <contact@yelon.dev>",
            "to": ["root@yelon.dev"],
            "reply_to": form.email,
            "subject": f"[yelon.dev] Message from {form.name}",
            "text": f"""New message from yelon.dev contact form:

Name: {form.name}
Email: {form.email}
IP: {client_ip}

Message:
{form.message}

---
Sent via yelon.dev contact form"""
        })
        return {"status": "success", "message": "Message sent"}
    except Exception as e:
        print(f"Resend error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
