import os
import html
import smtplib
from datetime import datetime, timezone, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import razorpay

app = FastAPI()

IST = timezone(timedelta(hours=5, minutes=30))


def render_admin_html(rows: list) -> str:
    """Render a simple registrations table. `rows` are dicts with keys:
    name, email, phone, amount, reference, date."""
    body_rows = ""
    for i, r in enumerate(rows, 1):
        cells = "".join(
            f"<td>{html.escape(str(r.get(k, '') or ''))}</td>"
            for k in ("name", "email", "phone", "amount", "reference", "date")
        )
        body_rows += f"<tr><td>{i}</td>{cells}</tr>"

    table = (
        "<table><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th>"
        "<th>Amount</th><th>Reference</th><th>Date</th></tr></thead><tbody>"
        f"{body_rows}</tbody></table>"
        if rows
        else '<p class="empty">No registrations yet.</p>'
    )

    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Registrations — The AI Workshop</title>
<style>
  body{{font-family:system-ui,-apple-system,Arial,sans-serif;margin:0;background:#f8f7fc;color:#1e1b2e}}
  .wrap{{max-width:960px;margin:0 auto;padding:32px 16px}}
  h1{{font-size:22px;margin:0 0 16px}} .count{{color:#7c3aed}}
  table{{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}}
  th,td{{text-align:left;padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;white-space:nowrap}}
  th{{background:#f3f0fb;color:#5b4b8a;font-weight:600}}
  tr:last-child td{{border-bottom:none}}
  .empty{{padding:24px;color:#888}}
</style></head><body><div class="wrap">
<h1>Workshop Registrations · <span class="count">{len(rows)}</span></h1>
{table}
</div></body></html>"""


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
                <p style="margin: 5px 0;"><strong>⏰ Time:</strong> 12:00 PM – 4:00 PM (4 hours)</p>
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


def send_admin_notification(name: str, email: str, phone: str, payment_id: str = "") -> bool:
    """Notify the organiser inbox of a new registration."""
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")
    if not smtp_email or not smtp_password:
        return False
    admin_email = os.environ.get("ADMIN_EMAIL", "theaiworkshop.in@gmail.com")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🎉 New registration: {name}"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = admin_email
    msg["Reply-To"] = email

    html = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed;">New workshop registration 🎉</h2>
            <div style="background: #f8f5ff; border-radius: 8px; padding: 20px; margin: 16px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> {name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> {email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {phone}</p>
                <p style="margin: 5px 0;"><strong>Payment ID:</strong> {payment_id or "—"}</p>
            </div>
            <p style="font-size: 13px; color: #777;">Workshop: Sunday, 28 June 2026 · 12:00–4:00 PM · Kolkata</p>
        </div>
    </body>
    </html>
    """
    msg.attach(MIMEText(html, "html"))
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, admin_email, msg.as_string())
        print(f"[ADMIN EMAIL] Notified {admin_email} of new registration: {name}")
        return True
    except Exception as e:
        print(f"[ADMIN EMAIL ERROR] Failed to notify admin: {e}")
        return False


def send_host_application_notification(name: str, phone: str, use_case: str, workshop_date: str) -> bool:
    """Notify the organiser inbox of a new 'become a host' application."""
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")
    if not smtp_email or not smtp_password:
        return False
    admin_email = os.environ.get("ADMIN_EMAIL", "theaiworkshop.in@gmail.com")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🙋 New host application: {name}"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = admin_email

    body = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed;">New host application 🙋</h2>
            <p>Someone wants to teach a workshop. Reach out to plan the details.</p>
            <div style="background: #f8f5ff; border-radius: 8px; padding: 20px; margin: 16px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> {html.escape(name)}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {html.escape(phone)}</p>
                <p style="margin: 5px 0;"><strong>Use case:</strong> {html.escape(use_case)}</p>
                <p style="margin: 5px 0;"><strong>Preferred date:</strong> {html.escape(workshop_date)}</p>
            </div>
        </div>
    </body>
    </html>
    """
    msg.attach(MIMEText(body, "html"))
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, admin_email, msg.as_string())
        print(f"[HOST EMAIL] Notified {admin_email} of new host application: {name}")
        return True
    except Exception as e:
        print(f"[HOST EMAIL ERROR] Failed to notify admin: {e}")
        return False


class Registration(BaseModel):
    name: str
    email: str
    phone: str
    payment_id: str = ""


class CreateOrderRequest(BaseModel):
    amount: int
    currency: str = "INR"
    receipt: str = "workshop_receipt"
    name: str = ""
    email: str = ""
    phone: str = ""


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class HostApplication(BaseModel):
    name: str
    phone: str
    use_case: str
    workshop_date: str  # ISO date (YYYY-MM-DD); must fall on a weekend


@app.get("/api/health")
def health():
    key_id = os.environ.get("RAZORPAY_KEY_ID", "")
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET", "")
    return {
        "ok": True,
        "razorpay_key_id_present": bool(key_id),
        "razorpay_key_id_prefix": key_id[:12] + "..." if len(key_id) > 12 else key_id,
        "razorpay_secret_length": len(key_secret),
    }


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
            "notes": {"name": req.name, "email": req.email, "phone": req.phone},
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
        "razorpay_key_id": key_id,
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
    # Notify the organiser inbox of every paid registration.
    send_admin_notification(reg.name, reg.email, reg.phone, reg.payment_id)
    return {"status": "registered", "message": f"Welcome, {reg.name}! You're registered for the workshop."}


@app.post("/api/become-host")
def become_host(application: HostApplication):
    # Validate the chosen date is a weekend (workshops only run Sat/Sun).
    try:
        d = datetime.strptime(application.workshop_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date.")
    if d.weekday() not in (5, 6):  # 5 = Sat, 6 = Sun
        raise HTTPException(status_code=400, detail="Workshop date must be a Saturday or Sunday.")

    send_host_application_notification(
        application.name, application.phone, application.use_case, application.workshop_date
    )
    return {"status": "received", "message": f"Thanks, {application.name}! We'll be in touch."}


@app.get("/api/admin", response_class=HTMLResponse)
def admin_view():
    key_id = os.environ.get("RAZORPAY_KEY_ID")
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET")
    if not key_id or not key_secret:
        raise HTTPException(status_code=500, detail="Razorpay credentials not configured")

    client = razorpay.Client(auth=(key_id, key_secret))
    try:
        orders = client.order.all({"count": 100})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch orders: {str(e)}")

    rows = []
    for o in orders.get("items", []):
        if o.get("status") != "paid":
            continue
        notes = o.get("notes") or {}
        created = o.get("created_at")
        date_str = ""
        if created:
            date_str = datetime.fromtimestamp(created, IST).strftime("%d %b %Y, %I:%M %p")
        rows.append({
            "name": notes.get("name", ""),
            "email": notes.get("email", ""),
            "phone": notes.get("phone", ""),
            "amount": f"₹{o.get('amount', 0) / 100:,.0f}",
            "reference": o.get("id", ""),
            "date": date_str,
        })
    return HTMLResponse(render_admin_html(rows))
