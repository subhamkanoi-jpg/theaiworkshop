import os

os.environ.setdefault("RAZORPAY_KEY_ID", "rzp_test_dummy")
os.environ.setdefault("RAZORPAY_KEY_SECRET", "dummysecretvalue")
os.environ.setdefault("ADMIN_ACCESS_KEY", "test-admin-key")

from fastapi.testclient import TestClient

from api.index import (
    WORKSHOP_AMOUNT,
    TOTAL_SEATS,
    app,
    confirm_registration,
    order_takes_seat,
    send_confirmation_email,
)


client = TestClient(app)


class FakeOrderAPI:
    def __init__(self, store):
        self.store = store

    def create(self, payload):
        order = {
            "id": f"order_{len(self.store) + 1}",
            "amount": payload["amount"],
            "currency": payload.get("currency", "INR"),
            "status": "created",
            "notes": dict(payload.get("notes") or {}),
            "created_at": 1_700_000_000,
        }
        self.store.append(order)
        return order

    def all(self, params):
        skip = int(params.get("skip") or 0)
        count = int(params.get("count") or 100)
        return {"items": self.store[skip : skip + count]}

    def fetch(self, order_id):
        for order in self.store:
            if order["id"] == order_id:
                return order
        raise RuntimeError("missing order")

    def edit(self, order_id, payload):
        for order in self.store:
            if order["id"] == order_id:
                order["notes"] = dict(payload.get("notes") or {})
                return order
        raise RuntimeError("missing order")


class FakeUtility:
    def verify_payment_signature(self, payload):
        if payload.get("razorpay_signature") == "bad":
            import razorpay

            raise razorpay.errors.SignatureVerificationError("bad")

    def verify_webhook_signature(self, body, signature, secret):
        if signature != "good-sig":
            raise ValueError("bad webhook")


class FakePaymentAPI:
    def fetch(self, payment_id):
        return {
            "id": payment_id,
            "order_id": "order_1",
            "amount": WORKSHOP_AMOUNT,
            "status": "captured",
        }


class FakeClient:
    def __init__(self, store=None):
        self.store = store if store is not None else []
        self.order = FakeOrderAPI(self.store)
        self.utility = FakeUtility()
        self.payment = FakePaymentAPI()


def test_health_does_not_leak_credentials():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"ok": True}
    assert "razorpay" not in res.text.lower()
    assert "secret" not in res.text.lower()


def test_retired_endpoints_are_gone():
    for path in ("/api/register", "/api/apply", "/api/interest"):
        assert client.post(path, json={}).status_code == 404


def test_become_host_requires_name_and_phone():
    res = client.post("/api/become-host", json={})
    assert res.status_code == 400


def test_become_host_accepts_a_captain(monkeypatch):
    sent = []

    def fake_admin(name, email, phone, payment_id=""):
        sent.append((name, phone, payment_id))
        return True

    monkeypatch.setattr("api.index.send_admin_notification", fake_admin)
    res = client.post(
        "/api/become-host",
        json={
            "name": "Ada Lovelace",
            "phone": "9830715557",
            "use_case": "Captain a table",
            "workshop_date": "2026-09-27",
        },
    )
    assert res.status_code == 200
    assert res.json()["ok"] is True
    assert sent[0][0] == "Ada Lovelace"


def test_create_order_uses_server_amount(monkeypatch):
    fake = FakeClient()
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.post(
        "/api/create-order",
        json={"name": "Ada Lovelace", "email": "ada@example.com", "phone": "9830715557", "amount": 100},
    )
    assert res.status_code == 200
    assert fake.store[0]["amount"] == WORKSHOP_AMOUNT
    assert res.json()["amount"] == WORKSHOP_AMOUNT
    assert fake.store[0]["notes"]["hold"] == "online"


def test_create_order_rejects_bad_email(monkeypatch):
    fake = FakeClient()
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.post(
        "/api/create-order",
        json={"name": "Ada", "email": "not-an-email", "phone": "9830715557"},
    )
    assert res.status_code == 400
    assert fake.store == []


def test_reserve_enforces_capacity(monkeypatch):
    full = [
        {
            "id": f"order_{i}",
            "status": "paid",
            "notes": {"email": f"p{i}@x.com", "hold": "online"},
        }
        for i in range(TOTAL_SEATS)
    ]
    fake = FakeClient(full)
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.post(
        "/api/reserve",
        json={"name": "Ada Lovelace", "email": "ada@example.com", "phone": "9830715557"},
    )
    assert res.status_code == 409


def test_reserve_blocks_duplicate_email(monkeypatch):
    existing = [
        {
            "id": "order_1",
            "status": "created",
            "notes": {"email": "ada@example.com", "hold": "venue", "name": "Ada"},
        }
    ]
    fake = FakeClient(existing)
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.post(
        "/api/reserve",
        json={"name": "Ada Lovelace", "email": "ada@example.com", "phone": "9830715557"},
    )
    assert res.status_code == 409


def test_verify_rejects_bad_signature(monkeypatch):
    fake = FakeClient()
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.post(
        "/api/verify-payment",
        json={
            "razorpay_order_id": "order_1",
            "razorpay_payment_id": "pay_1",
            "razorpay_signature": "bad",
        },
    )
    assert res.status_code == 400


def test_verify_confirms_valid_payment(monkeypatch):
    store = [
        {
            "id": "order_1",
            "status": "paid",
            "amount": WORKSHOP_AMOUNT,
            "notes": {"name": "Ada", "email": "ada@example.com", "phone": "9830715557", "hold": "online"},
        }
    ]
    fake = FakeClient(store)
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    monkeypatch.setattr("api.index.send_confirmation_email", lambda *a, **k: True)
    monkeypatch.setattr("api.index.send_admin_notification", lambda *a, **k: True)
    res = client.post(
        "/api/verify-payment",
        json={
            "razorpay_order_id": "order_1",
            "razorpay_payment_id": "pay_1",
            "razorpay_signature": "good",
        },
    )
    assert res.status_code == 200
    assert res.json()["status"] == "registered"
    assert store[0]["notes"]["confirmed"] == "1"


def test_webhook_requires_secret(monkeypatch):
    monkeypatch.delenv("RAZORPAY_WEBHOOK_SECRET", raising=False)
    res = client.post("/api/razorpay-webhook", content=b"{}", headers={"X-Razorpay-Signature": "x"})
    assert res.status_code == 503


def test_webhook_accepts_captured_payment(monkeypatch):
    store = [
        {
            "id": "order_1",
            "status": "paid",
            "amount": WORKSHOP_AMOUNT,
            "notes": {"name": "Ada", "email": "ada@example.com", "phone": "9830715557"},
        }
    ]
    fake = FakeClient(store)
    monkeypatch.setenv("RAZORPAY_WEBHOOK_SECRET", "whsec")
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    monkeypatch.setattr("api.index.send_confirmation_email", lambda *a, **k: True)
    monkeypatch.setattr("api.index.send_admin_notification", lambda *a, **k: True)
    body = {
        "event": "payment.captured",
        "payload": {
            "payment": {
                "entity": {
                    "id": "pay_1",
                    "order_id": "order_1",
                    "amount": WORKSHOP_AMOUNT,
                }
            }
        },
    }
    import json

    res = client.post(
        "/api/razorpay-webhook",
        content=json.dumps(body),
        headers={"X-Razorpay-Signature": "good-sig"},
    )
    assert res.status_code == 200
    assert store[0]["notes"]["confirmed"] == "1"


def test_admin_requires_header():
    assert client.get("/api/admin/data").status_code == 403
    assert client.get("/api/admin/data", headers={"X-Admin-Key": "wrong"}).status_code == 403


def test_admin_data_with_key(monkeypatch):
    fake = FakeClient(
        [
            {
                "id": "order_1",
                "status": "paid",
                "amount": WORKSHOP_AMOUNT,
                "created_at": 1_700_000_000,
                "notes": {"name": "Ada", "email": "ada@example.com", "phone": "9830715557"},
            }
        ]
    )
    monkeypatch.setattr("api.index.get_client", lambda: (fake, "rzp_test_dummy"))
    res = client.get("/api/admin/data", headers={"X-Admin-Key": "test-admin-key"})
    assert res.status_code == 200
    assert res.json()["total"] == 1
    assert res.json()["rows"][0]["email"] == "ada@example.com"


def test_order_takes_seat():
    assert order_takes_seat({"status": "paid", "notes": {}})
    assert order_takes_seat({"status": "created", "notes": {"hold": "venue"}})
    assert not order_takes_seat({"status": "created", "notes": {"hold": "online"}})
    assert not order_takes_seat({"status": "cancelled", "notes": {"hold": "venue"}})


def test_confirmation_email_escapes_html(monkeypatch):
    captured = {}

    class DummySMTP:
        def __init__(self, *a, **k):
            pass

        def __enter__(self):
            return self

        def __exit__(self, *a):
            return False

        def login(self, *a):
            return None

        def sendmail(self, _frm, to, payload):
            captured["to"] = to
            captured["payload"] = payload

    monkeypatch.setenv("SMTP_EMAIL", "from@example.com")
    monkeypatch.setenv("SMTP_APP_PASSWORD", "pw")
    monkeypatch.setattr("api.index.smtplib.SMTP_SSL", DummySMTP)
    assert send_confirmation_email('<img src=x onerror=alert(1)>', "ada@example.com")
    payload = captured["payload"]
    assert "<img src=x onerror=alert(1)>" not in payload
    import base64, re
    blobs = re.findall(r"(?<=\n\n)[A-Za-z0-9+/=\n]+", payload)
    decoded = "".join(base64.b64decode(b).decode("utf-8", "ignore") for b in blobs if "html" not in b[:20].lower())
    assert "&lt;img src=x onerror=alert(1)&gt;" in decoded
    assert "ada@example.com" in captured["to"]


def test_confirm_registration_is_idempotent(monkeypatch):
    sent = {"n": 0}

    def count(*_a, **_k):
        sent["n"] += 1
        return True

    store = [
        {
            "id": "order_1",
            "notes": {
                "name": "Ada",
                "email": "ada@example.com",
                "phone": "1",
                "confirmed": "1",
            },
        }
    ]
    fake = FakeClient(store)
    monkeypatch.setattr("api.index.send_confirmation_email", count)
    monkeypatch.setattr("api.index.send_admin_notification", count)
    result = confirm_registration(fake, store[0], "pay_1", False)
    assert result["status"] == "already_registered"
    assert sent["n"] == 0
