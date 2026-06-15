import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import razorpay

app = FastAPI()


def send_confirmation_email(name: str, email: str) -> bool:
    """Send workshop registration confirmation email."""
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")
    if not smtp_email or not smtp_password:
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "You're In! The AI Workshop — 28 June 2026"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = email

    html = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed;">Hey {name}, you're registered! 🎉</h2>
            <p>Your payment is confirmed and your spot is secured for <strong>The AI Workshop</strong>.</p>
            <div style="background: #f8f5ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Date:</strong> Sunday, 28 June 2026</p>
                <p style="margin: 5px 0;"><strong>⏰ Duration:</strong> 3 Hours</p>
                <p style="margin: 5px 0;"><strong>📍 Location:</strong> Kolkata (venue details coming soon)</p>
            </div>
            <p><strong>What to bring:</strong> Just your laptop and curiosity!</p>
            <p>We'll share the exact venue and timings closer to the date via WhatsApp/email.</p>
            <p style="margin-top: 30px;">See you there!<br><strong>Team AI Workshop</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Questions? Reply to this email or WhatsApp us at +91 98307 15557</p>
        </div>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, email, msg.as_string())
        print(f"[EMAIL] Sent confirmation to {email}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send to {email}: {e}")
        return False


class Registration(BaseModel):
    name: str
    email: str
    phone: str


class CreateOrderRequest(BaseModel):
    amount: int
    currency: str = "INR"
    receipt: str = "workshop_receipt"


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/create-order")
def create_order(req: CreateOrderRequest):
    key_id = os.environ.get("RAZORPAY_KEY_ID")
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET")
    if not key_id or not key_secret:
        raise HTTPException(status_code=500, detail="Razorpay credentials not configured")

    if req.amount < 100:
        raise HTTPException(status_code=400, detail="Amount must be at least 100 paise (₹1)")

    client = razorpay.Client(auth=(key_id, key_secret))
    try:
        order = client.order.create({
            "amount": req.amount,
            "currency": req.currency,
            "receipt": req.receipt,
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
    }


@app.post("/api/verify-payment")
def verify_payment(req: VerifyPaymentRequest):
    key_id = os.environ.get("RAZORPAY_KEY_ID")
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET")
    if not key_secret:
        raise HTTPException(status_code=500, detail="Razorpay credentials not configured")

    if not req.razorpay_order_id or not req.razorpay_payment_id or not req.razorpay_signature:
        raise HTTPException(status_code=400, detail="Missing required payment fields")

    client = razorpay.Client(auth=(key_id, key_secret))
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": req.razorpay_order_id,
            "razorpay_payment_id": req.razorpay_payment_id,
            "razorpay_signature": req.razorpay_signature,
        })
        return {"status": "success", "message": "Payment verified successfully"}
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed")


@app.post("/api/register")
def register(reg: Registration):
    print(f"[REGISTER] Sending email to {reg.email}...")
    email_sent = send_confirmation_email(reg.name, reg.email)
    print(f"[REGISTER] Email result: {email_sent}")
    return {"status": "registered", "message": f"Welcome, {reg.name}! You're registered for the workshop."}
