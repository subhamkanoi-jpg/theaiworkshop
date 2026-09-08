# The AI Workshop

Marketing and booking site for The AI Workshop — offline AI sessions in Salt Lake, Kolkata.

Frontend: React + Vite + Tailwind + shadcn/ui  
Backend: FastAPI + Razorpay (one app in `api/index.py`, used locally and on Vercel)

## Quick start

```bash
cp .env.example .env
# fill Razorpay test keys, SMTP, ADMIN_ACCESS_KEY

# Windows
.\start.ps1

# macOS / Linux
bash start.sh
```

Or separately:

```bash
npm install
pip install -r requirements.txt
uvicorn app:asgi --reload --port 3101
npm run dev
```

Vite proxies `/api` to the FastAPI port (`VITE_BACKEND_PORT`, default 3101).

## Workshop config

Edit `workshop.json` for price, date, seats, contact and WhatsApp links. The frontend (`src/config.ts`) and backend (`api/index.py`) both read it.

Also update `index.html` / `book.html` structured data and social meta when the date or price changes. `tests/test_config_sync.py` checks the important fields.

## Payments

- Ticket amount is set on the server. The browser cannot pick a price.
- Online: `POST /api/create-order` → Razorpay Checkout → `POST /api/verify-payment`
- Venue hold: `POST /api/reserve` (occupies a seat until cancelled in Razorpay)
- Seat cap is enforced on both paths
- Add a Razorpay webhook to `https://theaiworkshop.in/api/razorpay-webhook` for `payment.captured`, and set `RAZORPAY_WEBHOOK_SECRET`

Admin UI: `/api/admin` (enter `ADMIN_ACCESS_KEY`; it is sent as `X-Admin-Key`, not in the URL)

## Deploy

Vercel builds with `npm run build` and serves `dist`. API routes rewrite to `api/index.py`. Set the same env vars in the Vercel project.

## Tests

```bash
pip install -r requirements.txt
pytest -q
```
