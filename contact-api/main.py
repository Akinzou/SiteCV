from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from collections import defaultdict
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

app = FastAPI()

# CORS - only allow yelon.pro
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yelon.pro", "https://www.yelon.pro"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Rate limiting storage (in production use Redis)
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
    # Clean old entries
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < RATE_WINDOW]

    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        return False

    rate_limit_store[ip].append(now)
    return True

@app.post("/send")
async def send_message(form: ContactForm, request: Request):
    client_ip = request.headers.get("X-Real-IP", request.client.host)

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
