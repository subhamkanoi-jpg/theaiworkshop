# Workshop #4 — Build Your First AI Automation (design)

Sunday 25 October 2026 · 12:00 PM – 4:00 PM · Salt Lake, Kolkata · ₹699 · 50 seats · led by Neeraj Kanoi

## Intent

The AI Workshop sells one offline Sunday at a time. Each one has to leave people with a
named, working artifact (PRODUCT-THESIS §3: "If a workshop does not produce a named,
screenshot-able artifact, it does not turn the flywheel") and pass the Tuesday test: they use
it on a weekday without us.

October was already pencilled in as the **Sell** chapter (MIND-MAP year map: "WhatsApp that
brings customers"). Automations for growth are that chapter, made concrete: the leads a small
business already gets stop going cold.

The story that sells the seat is the person leading it. Neeraj Kanoi is the solo growth lead
at Wokelo AI and is building its growth funnel single-handedly with AI. This is the first
workshop a named host leads, which is what the thesis asked for ("Anonymous avatars were a
waste of three real people").

## The artifact

By 4:00 PM each person has one automation running for their own business (or a sample
business we hand them):

1. **Business brief** — one page every automation reads: offer, prices, tone, never-say list.
2. **Lead capture** — a form that drops each enquiry into a Google Sheet.
3. **AI first reply** — Gemini writes a personal reply from the brief; Gmail sends it within
   minutes. Draft mode until five replies have been read.
4. **Follow-up sequence** — three emails on day 2, 5 and 9; each send checks the inbox and stops
   once the lead replies. The same pipeline sends one campaign to people who opted in.
5. **FAQ bot** — a Telegram bot answering from the price list, handing over when unsure.

Plus the exported blueprint and prompts, so the second one does not start from scratch.

## Decisions (Claude's calls, approved by "go with your guess")

- **Stack:** Make (free plan), Gemini via a free Google AI Studio key, Google Forms/Sheets,
  Gmail, Telegram. Free tiers only; no paid door fee (thesis §8). Telegram over WhatsApp because
  WhatsApp's official bot access needs Meta business verification and per-conversation fees —
  said honestly in an FAQ.
- **Time:** "morning 12-4" read as 12:00 PM – 4:00 PM; doors 11:30 AM; 15-minute break at 1:30.
- **Seats, venue, market value, WhatsApp group:** unchanged from September (50, Salt Lake
  Sector 1, ₹4,999 strike-through, same group link).
- **Homepage hero:** the September video-ad teaser is replaced by an on-page "run log" of an
  automation running. No new video render in six days.
- **Archive:** September is listed as a past session ("AI video ads") without claims about
  attendance.
- **Content lives in `workshop.json`.** Page copy that changes per workshop (hero lines, stages,
  run, door lists, ticket chips, share text, SEO titles/descriptions, history, scope) moves into
  it so the next workshop is a JSON edit, not six component edits.

## Must also be true

- **Seats are counted per workshop.** Today the backend counts every paid Razorpay order ever
  and blocks any email that has booked before; September's buyers would fill October's cap and
  be refused. Orders get `notes.workshop = slug`; only orders for the current slug take a seat or
  block an email.
- **Nothing public still sells 27 September.** HTML shells, llms files, AI JSON, feed, sitemap,
  OG card, nav label, announcement bar, booking chips, confirmation email.
- **No spam promise.** Copy says: only people who contacted you or opted in; sequences stop on
  reply; campaigns carry an opt-out; no bought or scraped lists. "You want to blast strangers"
  is on the stay-home list.
- **Voice rules from ENCYCLOPEDIA §6:** no leverage, ecosystem, agentic, disrupting, 10x,
  superintelligence, digital transformation. No income promises.

## Non-goals

- A new rendered video teaser.
- WhatsApp bots, paid tools, or anything needing installs on the laptop.
- Restructuring the site beyond what the new workshop needs.

## Left to Neeraj

- Confirm or swap the tool stack (it is a few strings in `workshop.json`).
- Dry-run the build on a fresh personal Gmail account before Sunday — see the runbook,
  `docs/WORKSHOP-04-AI-AUTOMATION.md`.
