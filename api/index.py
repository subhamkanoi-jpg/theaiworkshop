"""Single FastAPI backend for local dev and Vercel.

Payment rules:
- The ticket price is server-side only. Clients cannot pick an amount.
- A seat is only confirmed after a Razorpay signature check (or a venue hold).
- The 25-seat cap is enforced before creating an order or a venue hold.
- Razorpay is the source of truth (serverless has no durable local disk).
"""

from __future__ import annotations

import hmac
import html
import json
import os
import re
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
import razorpay

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

IST = timezone(timedelta(hours=5, minutes=30))
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

_FALLBACK = {
    "amountPaise": 59900,
    "price": 599,
    "marketValue": 1599,
    "totalSeats": 25,
    "dateLabel": "Sunday, 30 August 2026",
    "timeLabel": "11:00 AM – 1:00 PM",
    "durationLabel": "2 hours",
    "location": "Salt Lake, Kolkata",
    "whatsappWorkshop": "https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG",
    "phoneTel": "+919830715557",
    "phoneDisplay": "+91 98307 15557",
    "supportEmail": "theaiworkshop.in@gmail.com",
}


def load_workshop() -> dict:
    here = Path(__file__).resolve()
    candidates = [
        here.parent.parent / "workshop.json",
        here.parent.parent / "src" / "workshop.json",
        here.parent / "workshop.json",
    ]
    data = dict(_FALLBACK)
    for path in candidates:
        if path.is_file():
            data.update(json.loads(path.read_text(encoding="utf-8")))
            break
    return data


W = load_workshop()
WORKSHOP_AMOUNT = int(W["amountPaise"])
PRICE = int(W["price"])
TOTAL_SEATS = int(W["totalSeats"])
WORKSHOP_DATE_LABEL = str(W["dateLabel"])
WORKSHOP_TIME_LABEL = str(W["timeLabel"])
WORKSHOP_DURATION_LABEL = str(W["durationLabel"])
WORKSHOP_LOCATION = str(W["location"])
WHATSAPP_URL = str(W["whatsappWorkshop"])
PHONE_DISPLAY = str(W["phoneDisplay"])
SUPPORT_EMAIL = str(W["supportEmail"])


# ── helpers ────────────────────────────────────────────────────────────────


def get_client():
    key_id = os.environ.get("RAZORPAY_KEY_ID") or ""
    key_secret = os.environ.get("RAZORPAY_KEY_SECRET") or ""
    if not key_id or not key_secret:
        raise HTTPException(status_code=500, detail="Payment is not configured")
    return razorpay.Client(auth=(key_id, key_secret)), key_id


def iter_orders(client) -> list:
    items: list = []
    skip = 0
    while True:
        page = client.order.all({"count": 100, "skip": skip})
        batch = page.get("items") or []
        if not batch:
            break
        items.extend(batch)
        if len(batch) < 100:
            break
        skip += 100
    return items


def order_takes_seat(order: dict) -> bool:
    """Paid online tickets and open venue holds both occupy a seat."""
    status = (order.get("status") or "").lower()
    if status == "cancelled":
        return False
    if status == "paid":
        return True
    notes = order.get("notes") or {}
    return notes.get("hold") == "venue"


def count_taken(client) -> int:
    return sum(1 for order in iter_orders(client) if order_takes_seat(order))


def find_existing_seat(orders: list, email: str) -> dict | None:
    email_l = email.lower()
    for order in orders:
        if not order_takes_seat(order):
            continue
        notes = order.get("notes") or {}
        if (notes.get("email") or "").lower() == email_l:
            return order
    return None


def require_capacity(client, email: str) -> None:
    orders = iter_orders(client)
    existing = find_existing_seat(orders, email)
    if existing:
        notes = existing.get("notes") or {}
        if notes.get("hold") == "venue" and existing.get("status") != "paid":
            raise HTTPException(
                status_code=409,
                detail="This email already has a reserved seat. We'll see you at the venue.",
            )
        raise HTTPException(
            status_code=409,
            detail="This email is already registered for the workshop.",
        )
    taken = sum(1 for order in orders if order_takes_seat(order))
    if taken >= TOTAL_SEATS:
        raise HTTPException(
            status_code=409,
            detail="This workshop is full. Email us to join the waitlist.",
        )


def clean_person(name: str, email: str, phone: str) -> tuple[str, str, str]:
    name = (name or "").strip()
    email = (email or "").strip().lower()
    phone = (phone or "").strip()
    if len(name) < 2 or len(name) > 80:
        raise HTTPException(status_code=400, detail="Please enter your full name.")
    if not EMAIL_RE.match(email) or len(email) > 120:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
    digits = re.sub(r"\D", "", phone)
    if len(digits) < 10 or len(phone) > 24:
        raise HTTPException(status_code=400, detail="Please enter a valid phone number.")
    return name, email, phone


def admin_key_ok(provided: str) -> bool:
    expected = os.environ.get("ADMIN_ACCESS_KEY") or ""
    if not expected or not provided:
        return False
    left = provided.encode("utf-8")
    right = expected.encode("utf-8")
    if len(left) != len(right):
        return False
    return hmac.compare_digest(left, right)


def require_admin(x_admin_key: str = "") -> None:
    if not admin_key_ok(x_admin_key):
        raise HTTPException(status_code=403, detail="Forbidden")


def mark_confirmed(client, order: dict) -> dict:
    notes = dict(order.get("notes") or {})
    if notes.get("confirmed") == "1":
        return notes
    notes["confirmed"] = "1"
    try:
        client.order.edit(order["id"], {"notes": notes})
    except Exception as exc:
        print(f"[ORDER] Could not mark confirmed: {exc}")
    return notes


# ── email ──────────────────────────────────────────────────────────────────


def _smtp() -> tuple[str, str] | None:
    email = os.environ.get("SMTP_EMAIL")
    password = os.environ.get("SMTP_APP_PASSWORD")
    if not email or not password:
        return None
    return email, password


def _send(msg: MIMEMultipart, smtp_email: str, smtp_password: str, to_addr: str) -> bool:
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, to_addr, msg.as_string())
        return True
    except Exception as exc:
        print(f"[EMAIL ERROR] {to_addr}: {exc}")
        return False


def send_confirmation_email(name: str, email: str, pay_at_venue: bool = False) -> bool:
    creds = _smtp()
    if not creds:
        return False
    smtp_email, smtp_password = creds

    safe_name = html.escape(name)
    subject = (
        f"Seat Reserved! The AI Workshop — {WORKSHOP_DATE_LABEL}"
        if pay_at_venue
        else f"You're In! The AI Workshop — {WORKSHOP_DATE_LABEL}"
    )
    payment_note = (
        f"<p>Your seat is <strong>reserved</strong> — please bring <strong>₹{PRICE} cash</strong> "
        "to pay at the venue. We'll hold your spot until 15 minutes before the session starts.</p>"
        if pay_at_venue
        else "<p>Your payment is confirmed and your spot is secured for <strong>The AI Workshop</strong>.</p>"
    )
    html_body = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c8553d;">Hey {safe_name}, you're registered!</h2>
            {payment_note}
            <div style="background: #fdf6f4; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Date:</strong> {html.escape(WORKSHOP_DATE_LABEL)}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> {html.escape(WORKSHOP_TIME_LABEL)} ({html.escape(WORKSHOP_DURATION_LABEL)})</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> {html.escape(WORKSHOP_LOCATION)} (exact venue shared on WhatsApp)</p>
            </div>
            <p><strong>What to bring:</strong> a laptop with an active Claude subscription, and a few raw clips on your phone if you want to edit your own footage. No clips? We'll have sample footage ready.</p>
            <p>Join the workshop WhatsApp group — venue, timings and reminders live there:<br>
            <a href="{html.escape(WHATSAPP_URL, quote=True)}">{html.escape(WHATSAPP_URL)}</a></p>
            <p style="margin-top: 30px;">See you there!<br><strong>Team AI Workshop</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Questions? Reply to this email or WhatsApp us at {html.escape(PHONE_DISPLAY)}</p>
        </div>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = email
    msg.attach(MIMEText(html_body, "html"))
    ok = _send(msg, smtp_email, smtp_password, email)
    if ok:
        print(f"[EMAIL] Sent confirmation to {email}")
    return ok


def send_admin_notification(name: str, email: str, phone: str, payment_id: str = "") -> bool:
    creds = _smtp()
    if not creds:
        return False
    smtp_email, smtp_password = creds
    admin_email = os.environ.get("ADMIN_EMAIL", SUPPORT_EMAIL)

    html_body = f"""\
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c8553d;">New workshop registration</h2>
            <div style="background: #fdf6f4; border-radius: 8px; padding: 20px; margin: 16px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> {html.escape(name)}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> {html.escape(email)}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {html.escape(phone)}</p>
                <p style="margin: 5px 0;"><strong>Payment ID:</strong> {html.escape(payment_id or "—")}</p>
            </div>
            <p style="font-size: 13px; color: #777;">Workshop: {html.escape(WORKSHOP_DATE_LABEL)} · {html.escape(WORKSHOP_TIME_LABEL)} · {html.escape(WORKSHOP_LOCATION)}</p>
        </div>
    </body>
    </html>
    """
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"New registration: {name}"
    msg["From"] = f"The AI Workshop <{smtp_email}>"
    msg["To"] = admin_email
    msg["Reply-To"] = email
    msg.attach(MIMEText(html_body, "html"))
    ok = _send(msg, smtp_email, smtp_password, admin_email)
    if ok:
        print(f"[ADMIN EMAIL] Notified {admin_email} of {name}")
    return ok


def confirm_registration(client, order: dict, payment_id: str, pay_at_venue: bool) -> dict:
    notes = dict(order.get("notes") or {})
    if notes.get("confirmed") == "1":
        return {"status": "already_registered", "message": "Already confirmed."}

    name = notes.get("name") or "there"
    email = notes.get("email") or ""
    phone = notes.get("phone") or ""

    if email:
        send_confirmation_email(name, email, pay_at_venue=pay_at_venue)
    send_admin_notification(name, email, phone, payment_id)
    mark_confirmed(client, order)
    return {
        "status": "registered",
        "message": f"Welcome, {name}! You're registered for the workshop.",
    }


# ── models ─────────────────────────────────────────────────────────────────


class PersonRequest(BaseModel):
    name: str = Field(default="", max_length=80)
    email: str = Field(default="", max_length=120)
    phone: str = Field(default="", max_length=24)


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# ── app ────────────────────────────────────────────────────────────────────

app = FastAPI()


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/create-order")
def create_order(req: PersonRequest):
    name, email, phone = clean_person(req.name, req.email, req.phone)
    client, key_id = get_client()
    require_capacity(client, email)

    try:
        order = client.order.create(
            {
                "amount": WORKSHOP_AMOUNT,
                "currency": "INR",
                "receipt": f"workshop_{int(datetime.now(tz=IST).timestamp())}",
                "notes": {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "hold": "online",
                },
            }
        )
    except HTTPException:
        raise
    except Exception as exc:
        print(f"[CREATE ORDER] {exc}")
        raise HTTPException(status_code=500, detail="Failed to create order") from exc

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
        "razorpay_key_id": key_id,
    }


@app.post("/api/reserve")
def reserve_venue(req: PersonRequest):
    """Pay-at-venue hold. Occupies a seat until cancelled in Razorpay."""
    name, email, phone = clean_person(req.name, req.email, req.phone)
    client, _key_id = get_client()
    require_capacity(client, email)

    try:
        order = client.order.create(
            {
                "amount": WORKSHOP_AMOUNT,
                "currency": "INR",
                "receipt": f"venue_{int(datetime.now(tz=IST).timestamp())}",
                "notes": {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "hold": "venue",
                },
            }
        )
    except Exception as exc:
        print(f"[RESERVE] {exc}")
        raise HTTPException(status_code=500, detail="Could not reserve a seat") from exc

    result = confirm_registration(client, order, payment_id="PAY_AT_VENUE", pay_at_venue=True)
    return result


@app.post("/api/verify-payment")
def verify_payment(req: VerifyPaymentRequest):
    if not req.razorpay_order_id or not req.razorpay_payment_id or not req.razorpay_signature:
        raise HTTPException(status_code=400, detail="Missing required payment fields")

    client, _key_id = get_client()
    try:
        client.utility.verify_payment_signature(
            {
                "razorpay_order_id": req.razorpay_order_id,
                "razorpay_payment_id": req.razorpay_payment_id,
                "razorpay_signature": req.razorpay_signature,
            }
        )
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed") from None

    try:
        payment = client.payment.fetch(req.razorpay_payment_id)
        order = client.order.fetch(req.razorpay_order_id)
    except Exception as exc:
        print(f"[VERIFY FETCH] {exc}")
        raise HTTPException(status_code=500, detail="Could not fetch payment") from exc

    amount = int(payment.get("amount") or 0)
    status = (payment.get("status") or "").lower()
    if amount != WORKSHOP_AMOUNT or status not in ("captured", "authorized"):
        raise HTTPException(status_code=400, detail="Payment does not match this workshop")
    if payment.get("order_id") != req.razorpay_order_id:
        raise HTTPException(status_code=400, detail="Payment does not match this order")

    result = confirm_registration(
        client, order, payment_id=req.razorpay_payment_id, pay_at_venue=False
    )
    return result


@app.post("/api/razorpay-webhook")
async def razorpay_webhook(request: Request):
    secret = os.environ.get("RAZORPAY_WEBHOOK_SECRET") or ""
    if not secret:
        raise HTTPException(status_code=503, detail="Webhook is not configured")

    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature") or ""
    client, _key_id = get_client()
    try:
        client.utility.verify_webhook_signature(body.decode("utf-8"), signature, secret)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook signature") from None

    try:
        event = json.loads(body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid payload") from None

    if event.get("event") != "payment.captured":
        return {"status": "ignored"}

    payment = ((event.get("payload") or {}).get("payment") or {}).get("entity") or {}
    order_id = payment.get("order_id") or ""
    payment_id = payment.get("id") or ""
    amount = int(payment.get("amount") or 0)
    if not order_id or amount != WORKSHOP_AMOUNT:
        return {"status": "ignored"}

    try:
        order = client.order.fetch(order_id)
    except Exception as exc:
        print(f"[WEBHOOK FETCH] {exc}")
        raise HTTPException(status_code=500, detail="Could not fetch order") from exc

    confirm_registration(client, order, payment_id=payment_id, pay_at_venue=False)
    return {"status": "ok"}


@app.get("/api/seats-taken")
def seats_taken():
    try:
        client, _key_id = get_client()
        taken = count_taken(client)
    except Exception as exc:
        print(f"[SEATS] {exc}")
        return {"taken": None, "total": TOTAL_SEATS}
    return {"taken": taken, "total": TOTAL_SEATS}


def _admin_rows(client) -> list[dict]:
    rows = []
    for order in iter_orders(client):
        if not order_takes_seat(order):
            continue
        notes = order.get("notes") or {}
        created = order.get("created_at")
        date_str = ""
        if created:
            date_str = datetime.fromtimestamp(created, IST).strftime("%d %b %Y, %I:%M %p")
        venue = notes.get("hold") == "venue" and order.get("status") != "paid"
        rows.append(
            {
                "name": notes.get("name", ""),
                "email": notes.get("email", ""),
                "phone": notes.get("phone", ""),
                "amount": "Pay at Venue" if venue else f"₹{int(order.get('amount') or 0) / 100:,.0f}",
                "reference": order.get("id", ""),
                "date": date_str,
            }
        )
    return rows


@app.get("/api/admin/data")
def admin_data(x_admin_key: str = Header(default="")):
    require_admin(x_admin_key)
    client, _key_id = get_client()
    try:
        rows = _admin_rows(client)
    except Exception as exc:
        print(f"[ADMIN] {exc}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders") from exc
    return {"total": len(rows), "total_seats": TOTAL_SEATS, "rows": rows}


@app.get("/api/admin", response_class=HTMLResponse)
def admin_view():
    return HTMLResponse(ADMIN_HTML)


# Retired membership / lead endpoints stay gone on purpose.
# ApplicationForm, InterestForm and BecomeHost are unwired.


ADMIN_HTML = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Registrations — The AI Workshop</title>
<style>
  body{font-family:system-ui,-apple-system,Arial,sans-serif;margin:0;background:#f8f7fc;color:#1e1b2e}
  .wrap{max-width:960px;margin:0 auto;padding:32px 16px}
  h1{font-size:22px;margin:0 0 16px} .count{color:#c8553d}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}
  th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;white-space:nowrap}
  th{background:#fdf6f4;color:#8a4030;font-weight:600}
  tr:last-child td{border-bottom:none}
  .empty{padding:24px;color:#888}
  .gate{max-width:360px;margin:15vh auto;background:#fff;padding:28px;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
  label{display:block;font-size:13px;font-weight:600;margin-bottom:8px}
  input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #ddd;border-radius:8px;font-size:14px}
  button{margin-top:12px;width:100%;padding:10px 12px;border:0;border-radius:8px;background:#c8553d;color:#fff;font-weight:600;cursor:pointer}
  .err{color:#b91c1c;font-size:13px;margin-top:10px}
</style>
</head>
<body>
<div id="gate" class="gate">
  <h1>Workshop registrations</h1>
  <label for="key">Admin key</label>
  <input id="key" type="password" autocomplete="current-password">
  <button type="button" id="go">View registrations</button>
  <p id="err" class="err" hidden></p>
</div>
<div id="app" class="wrap" hidden></div>
<script>
const KEY = "taw_admin_key";
const err = document.getElementById("err");
const gate = document.getElementById("gate");
const app = document.getElementById("app");
const input = document.getElementById("key");

function showError(msg) {
  err.hidden = !msg;
  err.textContent = msg || "";
}

function render(data) {
  const rows = data.rows || [];
  let body = "";
  rows.forEach((r, i) => {
    const cells = ["name","email","phone","amount","reference","date"]
      .map((k) => "<td>" + escapeHtml(String(r[k] || "")) + "</td>")
      .join("");
    body += "<tr><td>" + (i + 1) + "</td>" + cells + "</tr>";
  });
  const table = rows.length
    ? "<table><thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Amount</th><th>Reference</th><th>Date</th></tr></thead><tbody>" + body + "</tbody></table>"
    : '<p class="empty">No registrations yet.</p>';
  app.innerHTML = "<h1>Workshop Registrations · <span class=\\"count\\">" + rows.length + "</span> / " + (data.total_seats || "") + "</h1>" + table;
  gate.hidden = true;
  app.hidden = false;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function load(key) {
  showError("");
  const res = await fetch("/api/admin/data", { headers: { "X-Admin-Key": key } });
  if (res.status === 403) {
    sessionStorage.removeItem(KEY);
    showError("That key is not valid.");
    return;
  }
  if (!res.ok) {
    showError("Could not load registrations.");
    return;
  }
  sessionStorage.setItem(KEY, key);
  render(await res.json());
}

document.getElementById("go").addEventListener("click", () => load(input.value.trim()));
input.addEventListener("keydown", (e) => { if (e.key === "Enter") load(input.value.trim()); });

const saved = sessionStorage.getItem(KEY);
if (saved) {
  input.value = saved;
  load(saved);
}
</script>
</body>
</html>
"""
