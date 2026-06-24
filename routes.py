import os
import json
import html
import hmac
import hashlib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import razorpay


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


def send_confirmation_email(name: str, email: str, pay_at_venue: bool = False) -> bool:
    """Send workshop registration confirmation email."""
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")
    if not smtp_email or not smtp_password:
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Seat Reserved! The AI Workshop — 28 June 2026" if pay_at_venue else "You're In! The AI Workshop — 28 June 2026"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = email

    payment_note = (
        '<p>Your seat is <strong>reserved</strong> — please bring <strong>₹599 cash</strong> to pay at the venue. '
        'We\'ll hold your spot until 15 minutes before the session starts.</p>'
        if pay_at_venue
        else '<p>Your payment is confirmed and your spot is secured for <strong>The AI Workshop</strong>.</p>'
    )

    html_body = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed;">Hey {name}, you're registered! 🎉</h2>
            {payment_note}
            <div style="background: #f8f5ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📅 Date:</strong> Sunday, 28 June 2026</p>
                <p style="margin: 5px 0;"><strong>⏰ Time:</strong> 12:00 PM – 4:00 PM (4 hours)</p>
                <p style="margin: 5px 0;"><strong>📍 Location:</strong> Salt Lake, Kolkata (exact location shared after registration)</p>
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

    msg.attach(MIMEText(html_body, "html"))

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
            <p style="font-size: 13px; color: #777;">Workshop: Sunday, 28 June 2026 · 12:00–4:00 PM · Salt Lake, Kolkata</p>
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


def send_interest_notification(name: str, contact: str, interest: str) -> bool:
    """Notify the organiser inbox of a new 'show of interest' submission."""
    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_APP_PASSWORD")
    if not smtp_email or not smtp_password:
        return False
    admin_email = os.environ.get("ADMIN_EMAIL", "theaiworkshop.in@gmail.com")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🔔 New interest: {name}"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = admin_email

    body = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7c3aed;">New show of interest 🔔</h2>
            <p>Someone wants to hear about future / similar workshops.</p>
            <div style="background: #f8f5ff; border-radius: 8px; padding: 20px; margin: 16px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> {html.escape(name)}</p>
                <p style="margin: 5px 0;"><strong>Contact:</strong> {html.escape(contact)}</p>
                <p style="margin: 5px 0;"><strong>Interested in:</strong> {html.escape(interest) or "—"}</p>
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
        print(f"[INTEREST EMAIL] Notified {admin_email} of new interest: {name}")
        return True
    except Exception as e:
        print(f"[INTEREST EMAIL ERROR] Failed to notify admin: {e}")
        return False


REGISTRATIONS_FILE = Path("registrations.json")


def load_registrations() -> list:
    if REGISTRATIONS_FILE.exists():
        return json.loads(REGISTRATIONS_FILE.read_text())
    return []


def save_registrations(data: list) -> None:
    REGISTRATIONS_FILE.write_text(json.dumps(data, indent=2))


HOST_APPLICATIONS_FILE = Path("host_applications.json")


def load_host_applications() -> list:
    if HOST_APPLICATIONS_FILE.exists():
        return json.loads(HOST_APPLICATIONS_FILE.read_text())
    return []


def save_host_applications(data: list) -> None:
    HOST_APPLICATIONS_FILE.write_text(json.dumps(data, indent=2))


INTEREST_FILE = Path("interest.json")


def load_interest() -> list:
    if INTEREST_FILE.exists():
        return json.loads(INTEREST_FILE.read_text())
    return []


def save_interest(data: list) -> None:
    INTEREST_FILE.write_text(json.dumps(data, indent=2))


class Registration(BaseModel):
    name: str
    email: str
    phone: str
    payment_id: str = ""


class HostApplication(BaseModel):
    name: str
    phone: str
    use_case: str
    workshop_date: str  # ISO date (YYYY-MM-DD); must fall on a weekend


class InterestSubmission(BaseModel):
    name: str
    contact: str
    interest: str = ""


class CreateOrderRequest(BaseModel):
    amount: int  # in paise
    currency: str = "INR"
    receipt: str = "workshop_receipt"
    name: str = ""
    email: str = ""
    phone: str = ""


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


def create_app(static_dir: str) -> FastAPI:
    api = APIRouter()

    @api.get("/health")
    def health():
        return {"ok": True}

    @api.post("/register")
    def register(reg: Registration):
        pay_at_venue = reg.payment_id == "PAY_AT_VENUE"
        registrations = load_registrations()
        already_registered = any(r.get("email") == reg.email for r in registrations)
        if not already_registered:
            registrations.append({
                "name": reg.name,
                "email": reg.email,
                "phone": reg.phone,
                "payment_id": reg.payment_id,
            })
            save_registrations(registrations)
        print(f"[REGISTER] Sending email to {reg.email}...")
        email_sent = send_confirmation_email(reg.name, reg.email, pay_at_venue=pay_at_venue)
        print(f"[REGISTER] Email result: {email_sent}")
        send_admin_notification(reg.name, reg.email, reg.phone, reg.payment_id)
        if already_registered:
            return {"status": "already_registered", "message": "This email is already registered! We've re-sent your confirmation."}
        return {"status": "registered", "message": f"Welcome, {reg.name}! You're registered for the workshop."}

    @api.get("/registrations")
    def list_registrations():
        return load_registrations()

    @api.get("/admin", response_class=HTMLResponse)
    def admin_view():
        rows = [
            {
                "name": r.get("name", ""),
                "email": r.get("email", ""),
                "phone": r.get("phone", ""),
                "amount": "Pay at Venue" if r.get("payment_id") == "PAY_AT_VENUE" else "₹599",
                "reference": r.get("payment_id", "") if r.get("payment_id") != "PAY_AT_VENUE" else "—",
                "date": "",
            }
            for r in load_registrations()
        ]
        return HTMLResponse(render_admin_html(rows))

    @api.post("/become-host")
    def become_host(application: HostApplication):
        # Validate the chosen date is a weekend (workshops only run Sat/Sun).
        from datetime import date as _date
        try:
            d = _date.fromisoformat(application.workshop_date)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date.")
        if d.weekday() not in (5, 6):  # 5 = Sat, 6 = Sun
            raise HTTPException(status_code=400, detail="Workshop date must be a Saturday or Sunday.")

        applications = load_host_applications()
        applications.append({
            "name": application.name,
            "phone": application.phone,
            "use_case": application.use_case,
            "workshop_date": application.workshop_date,
        })
        save_host_applications(applications)
        send_host_application_notification(
            application.name, application.phone, application.use_case, application.workshop_date
        )
        return {"status": "received", "message": f"Thanks, {application.name}! We'll be in touch."}

    @api.get("/host-applications")
    def list_host_applications():
        return load_host_applications()

    @api.post("/interest")
    def show_interest(submission: InterestSubmission):
        name = submission.name.strip()
        contact = submission.contact.strip()
        if not name or not contact:
            raise HTTPException(status_code=400, detail="Name and contact are required.")

        entries = load_interest()
        entries.append({
            "name": name,
            "contact": contact,
            "interest": submission.interest.strip(),
        })
        save_interest(entries)
        send_interest_notification(name, contact, submission.interest.strip())
        return {"status": "received", "message": f"Thanks, {name}! We'll keep you posted."}

    @api.get("/interest")
    def list_interest():
        return load_interest()

    @api.post("/create-order")
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

    @api.post("/verify-payment")
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

    app = FastAPI()
    app.include_router(api, prefix="/api")

    if os.path.isdir(static_dir):
        assets_dir = os.path.join(static_dir, "assets")
        if os.path.isdir(assets_dir):
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

        @app.get("/{path:path}")
        async def spa_fallback(request: Request, path: str):
            file_path = os.path.join(static_dir, path)
            if path and os.path.isfile(file_path):
                return FileResponse(file_path)
            return FileResponse(
                os.path.join(static_dir, "index.html"),
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            )

    return app
