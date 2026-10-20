# Workshop #4 — Build Your First AI Automation (runbook)

*Sunday 25 October 2026 · 12:00 PM – 4:00 PM · doors 11:30 AM · Salt Lake Sector 1 · ₹699 · 50 seats, tables of 8 · led by Neeraj Kanoi*

This is the room's script. The website sells the Sunday; this file runs it. `workshop.json` is the public promise, and nothing below may promise more than it does.

---

## 1. Why this Sunday

The Path has five chapters: Talk → Make → Sell → System → Lead. October is **Sell**, the chapter where "useful" becomes "livelihood". For most people in the room, the honest version of that is not a new customer from nowhere. It is the leads they already get going cold, because nobody replied fast enough, nobody followed up, or the same ten questions ate the afternoon.

Neeraj is the proof that one person can run this. He is the solo growth lead at Wokelo AI and is building its growth funnel single-handedly, with AI doing the work a team would. He does not perform that story. He opens his screen, shows what runs without him and what he still does by hand, and then builds a small version with the room.

**The law of the room still holds.** Zero coding background is fine. Leaving with nothing switched on is not.

## 2. What every person leaves with

A named, working machine for their own business, or for the sample business we hand them. "Done" means each line below is true on their laptop at 4:00 PM.

| # | Part | Done when |
|---|---|---|
| 1 | **Business brief** (`Business_Brief.txt`) | One page: offer, prices, tone, five FAQs, never-say list. Every prompt below pastes it in. |
| 2 | **Lead capture** (`Leads.gsheet`) | A Google Form they can open on their phone; each submission lands as a row in the Leads sheet. |
| 3 | **AI first reply** (`First_Reply_Prompt.txt`) | A test lead from their phone gets a personal email in their voice within 15 minutes, with no hand-typing. |
| 4 | **Follow-up sequence** (`Follow_Up_x3.txt`) | Follow-ups are scheduled for day 2, 5 and 9; a reply from the lead stops them (tested by replying from the phone). |
| 5 | **FAQ bot** (`@YourBusiness_bot`) | Their Telegram bot answers a price question correctly and hands over a question that is not in the brief. |
| + | **Blueprint** | Both Make scenarios exported as `.json`, plus the brief and prompts, in one folder named after the business. |

If someone only finishes 1–3, they still leave with the part that saves the most money: no lead waits more than an hour in working hours. Say this out loud at 3:30 so nobody leaves feeling they failed.

## 3. The stack, and why

| Job | Tool | Cost on the day | Why this one |
|---|---|---|---|
| Wiring | **Make** (free plan) | ₹0 | Visual, no install, a free plan that stays free. |
| Writing | **Gemini** via a Google AI Studio API key | ₹0 (free tier) | Google account they already have; good in English, Hindi and Bangla. |
| Lead store | **Google Forms + Sheets** | ₹0 | They already understand a spreadsheet. The sheet *is* the CRM. |
| Sending | **Gmail** | ₹0 | Replies come from their own address and land in their own inbox. |
| Bot | **Telegram** (BotFather) | ₹0 | A real bot in two minutes. WhatsApp needs Meta verification (see §10). |

**Free-tier facts to check in the dry run, because they change:** Make's free plan has had 2 active scenarios, about 1,000 operations a month and a 15-minute minimum schedule interval. The build below is designed to fit that: one scenario for email, one for the bot. Gemini's free tier rate-limits and may use inputs to improve Google's products, which is why nobody pastes real customer data on the day.

**Do the arithmetic out loud.** Hourly checks from 9 AM to 9 PM are about 400 runs a month before any lead arrives; each lead costs roughly 15 operations over its life (reply plus three follow-ups); each bot message about 3. One lead a day and ten bot messages a day is roughly 1,500–1,800 operations a month — above the free plan. The free plan carries a quiet month; a busy one needs Make's entry paid plan. Say this on the 3:45 slide; never promise free forever.

**Swapping tools is fine.** If Neeraj prefers n8n or another builder, the shape of the build does not change. Edit the tool names in `workshop.json` (`faqs`, `prep`, `seo.scope`), run `node scripts/write-seo-html.mjs`, and the site follows.

## 4. Before Sunday

### Neeraj's dry run (do this by Wednesday 21 October)

Build the whole thing once on a **fresh personal `@gmail.com` account**, not a work account, on a Windows laptop, following §7 exactly. Time each block. The risks to retire:

1. **Make ↔ Gmail with a personal Gmail account.** Google restricts third-party apps' access to Gmail, and Make has at times required a custom Google Cloud OAuth client for `@gmail.com` accounts. If that is still true, it is 15 fiddly minutes per person and must not happen live. Fallbacks, in order: (a) Make's **Email** app over IMAP/SMTP with a Google **app password** (needs 2-Step Verification on). It must do all three Gmail jobs in this build — create a draft, send, and search the inbox by sender — so confirm each one in the dry run. (b) **Brevo** free plan for sending, with draft mode replaced by sending to yourself first, and stop-on-reply still using (a)'s inbox search. If (a) is chosen, Thursday's message must add "Turn on 2-Step Verification on your Google account and create an app password — we show you where", because the confirmation email early bookers received does not say it. Decide before Thursday's reminder goes out, because it changes the pre-work.
2. **Gemini key in Make.** Create a key at aistudio.google.com, connect Make's Gemini module, generate one reply. Note the exact module name in today's Make UI and put it on the slide.
3. **Stop-on-reply, both ways.** Build §7.3 and run both tests at the end of it. Confirm the aggregator really turns an empty Gmail search into `count = 0` and reaches the send branch — that is the one Make behaviour the whole sequence depends on.
4. **Spam folder.** Send three test replies to an Outlook and a Gmail address. If they land in spam, keep emails plain-text, short, no links in email 1.
5. **Operations count.** Leave both scenarios on for an hour (email at a 15-minute interval, and send the bot ten messages) and read the ops used. Check the §3 arithmetic against what Make reports and put the real numbers on the 3:45 slide.
6. **Telegram from venue Wi-Fi.** BotFather and Make's Telegram webhook both need outbound access; test on the venue network if possible.

### Captains (call on Friday 23 October, 7:00 PM, one hour)

Every captain builds parts 2–5 once, on their own account, before Sunday. They do not need to be fast. They need to have seen every error in §9 once.

### Attendee messages (WhatsApp group + email)

**Thursday 22 October**
> Sunday is a build, not a talk. Please do these before you come — 10 minutes:
> 1. Make a free account at make.com
> 2. Check you can sign in to Gmail and Google Sheets on your laptop
> 3. Install Telegram on your phone
> 4. Write down your price list and the five questions customers ask you most
> 5. Copy the email you send when someone enquires
> No business of your own? Come anyway — we hand you one at the table.

**Saturday 24 October**
> Tomorrow, doors 11:30 AM, we start at 12:00 sharp in Salt Lake Sector 1. Bring a laptop, charger and your phone. Do not bring real customer lists — we build with test leads. Venue pin: [link]

**Sunday 10:00 AM**
> See you at 11:30. Charge your laptop. Chai is on us.

## 5. The room

- Projector + HDMI/USB-C adapters, mic for Neeraj, a second screen if possible for the "what it should look like" view.
- Power strips at every table. Wi-Fi tested with 50 devices at 11:00 AM.
- Table numbers 1–7 (tables of 8, captain on each).
- Printed per seat: the brief template (§8.1) and the QC checklist (§9).
- **Sample business cards** for anyone without one — three to choose from, each with a price list and five FAQs:
  - *Tiffin Ghar, Salt Lake* — home-cooked veg tiffin, ₹120/meal, ₹2,600/month, delivery Sector 1–5, order by 10 PM for next day.
  - *Smile Dental, Lake Town* — consultation ₹300, cleaning ₹1,200, Sunday closed, booking by phone.
  - *Pixel Tuition* — class 9–10 maths, ₹1,500/month, 3 batches, free demo class.
- A "parking lot" sheet on the wall for questions that would derail the room.

## 6. Minute by minute

| Time | Big screen | People do | Captains check |
|---|---|---|---|
| 11:30 | Wi-Fi name, the four accounts they need (Make, Google, AI Studio, Telegram) | Sign in to Make, Gmail, AI Studio, Telegram | Every laptop signed in to all four before 12:00 |
| 12:00 | Neeraj: why automation, in one picture | Listen (10 min max) | — |
| 12:10 | Neeraj's own funnel: what runs without him, what he still does by hand, one thing that broke | Listen, note one idea | — |
| 12:20 | The brief template (§8.1) | Fill it in for their business | Brief has real prices and a never-say list |
| 12:30 | §7.1 Lead capture | Build the form + sheet, submit one test lead from phone | Row appears in the sheet |
| 12:50 | §7.2 First reply | Build scenario A, route 1, in **draft mode** | One draft in Gmail that sounds like them |
| 1:20 | — | Read five drafts, fix the brief, then switch to send | They read the drafts before switching |
| 1:30 | **Break** | Chai | Every table: first workflow ran end to end |
| 1:45 | §7.3 Follow-ups | Add route 2 to scenario A | Next-send dates appear in the sheet |
| 2:30 | §7.4 Campaign | Run once to a 3-row opted-in test list | Opt-out line present |
| 2:45 | §7.5 FAQ bot | BotFather, scenario B, test from phone | Bot answers a price; hands over an unknown |
| 3:30 | §9 Break it | Fake lead from phone through everything; run the checklist | Each person ticks the checklist |
| 3:45 | "How to stay free" + switch on | Schedule scenario A, turn both ON, export blueprints | Both scenarios show ON |
| 3:50 | Show and tell | 6–8 people show their sheet or bot | — |
| 3:57 | Next Sunday named · group photo · Tuesday pulse | — | — |

## 7. The build (what goes on the projector)

Module names are Make's as of writing; confirm them in the dry run and update the slides.

### 7.1 Lead capture (12:30)

1. Google Forms → new form "Enquiry — {Business}": Name, Email, Phone (optional), "What can we help with?".
2. Responses → **Link to Sheets** → new sheet `Leads`.
3. In the sheet, add these columns after the form's own: `Status` · `Step` · `Next send` · `Last email`.
4. Submit one test lead from your phone, with an email address you can open on the phone.

### 7.2 Lead in, AI reply out — scenario A, route 1 (12:50)

One search feeds both routes, so follow-ups still run on a day with no new leads:

```
Google Sheets: Search Rows (Leads)
    filter: Status is empty
        OR (Status = replied AND Next send ≤ today AND Step ≤ 3)
  → Router
      ├─ Route 1 · new lead      (filter: Status is empty)
      │    → Gemini: generate a response   (First reply prompt, §8.2)
      │    → Gmail: Create a draft         (switch to "Send an email" after five good drafts)
      │    → Google Sheets: Update a Row
      │         draft mode:  Status = drafted
      │         sending:     Status = replied, Step = 1,
      │                      Next send = today + 2 days, Last email = the reply
      └─ Route 2 · follow-ups    (filter: Status = replied) — built in §7.3
```

- **Subject and body.** Gemini's first line is the subject. In the Gmail module map
  Subject = `trim(replace(first(split(<Gemini output>; newline)); "Subject:"; ""))` and
  Content = `trim(replace(<Gemini output>; first(split(<Gemini output>; newline)); ""))`.
  Use the same mapping in every Gmail send below.
- Set the scenario's timezone to **Asia/Kolkata** (Scenario settings). Dates go wrong otherwise.
- "Run once" while building. Do not schedule yet.
- **Draft mode is not optional.** Nobody sends to a real address until they have read five drafts and the brief has been fixed at least once. When you switch the Gmail module to send, clear `Status` on your test rows so they run again.

### 7.3 The follow-up sequence — scenario A, route 2 (1:45)

`Step` counts the emails already sent: 1 after the first reply, 4 after the last follow-up.

```
Route 2 · follow-ups (filter: Status = replied)
  → Gmail: Search emails       query: from:{{Email}} newer_than:14d   (limit 1)
  → Tools: Numeric aggregator  COUNT, source module = Gmail: Search emails,
                               "Stop processing after an empty aggregation" = No
  → Router
      ├─ count > 0   → Update a Row (Status = lead replied)            ← sequence stops
      └─ count = 0   → Gemini (Follow-up prompt, §8.3 — follow-up number = {{Step}})
                       → Gmail: Send an email (Subject/Content mapping as in §7.2)
                       → Update a Row (Step = Step + 1; Last email = this email;
                                       new Step 2 → Next send + 3 days,
                                       new Step 3 → Next send + 4 days,
                                       new Step 4 → Status = done)
```

Why the aggregator: a search that finds no reply outputs nothing, and the route would stop before the send. The aggregator turns "found nothing" into one bundle with `count = 0`, so the send branch runs.

Schedule: follow-up 1 on day 2, follow-up 2 on day 5, follow-up 3 on day 9.

**Test both paths, in this order.** (1) On the test row set `Next send` to today, run once: follow-up 1 must arrive on the phone. (2) Reply to it from the phone, set `Next send` to today again, run once: the row must turn `lead replied` and nothing is sent. A follow-up that never sends passes test (2) on its own, so test (1) is the one that proves the sequence works.

### 7.4 One campaign, the honest way (2:30)

- New tab `Campaign`: Name · Email · Note · Opted in (yes/no) · Sent.
- Three test rows only, all `Opted in = yes`, all addresses the person owns.
- `Search Rows (Opted in = yes, Sent empty)` → Gemini (§8.5) → Gmail send → Update `Sent`. **Run once, by hand. Never scheduled.**
- Every campaign email ends with an opt-out line. Above a few hundred contacts, this belongs in a proper email tool (Brevo, Mailchimp, MailerLite), not Gmail. Say so.

### 7.5 The FAQ bot — scenario B (2:45)

1. Telegram → **@BotFather** → `/newbot` → name "{Business} Help" → username ending in `_bot` → copy the token.
2. Make → new scenario: `Telegram Bot: Watch Updates` → `Gemini: generate a response` (Bot prompt, §8.4, with the message text) → `Telegram Bot: Send a Text Message or a Reply` (chat ID from the trigger).
3. **Required — the hand-over.** After Gemini add a Router. Route `text contains [HANDOVER]` → `Telegram Bot: Send a Text Message` to **your own** chat ID ("Customer {{first name}} asked: {{message text}}") and `Google Sheets: Add a Row` to a `Bot questions` tab. Get your chat ID by messaging your own bot once and reading it from the trigger's output. In every message sent to the customer, map the text as `trim(replace(<Gemini output>; "[HANDOVER]"; ""))` so the marker never shows.
4. Turn it ON. From the phone: open the bot, press **Start**, ask a price, then ask something not in the brief.

### 7.6 Switch on (3:45)

- Scenario A: schedule every 15 minutes for today. From Monday, **hourly from 9 AM to 9 PM**. That keeps a quiet month inside the free operations; see §3 for when it does not. Scenario B: instant.
- Both ON. Export both blueprints (`…` menu → Export Blueprint) into a folder named after the business, next to the brief and the prompts.

## 8. The prompts

Every prompt starts with the brief. That is the whole method: the brief is the product, and the tool is a rental car.

### 8.1 Business brief template (fill in at 12:20)

```
BUSINESS: {name}, {what you sell}, {where}
WHO ENQUIRES: {who they are, what they usually want}
OFFER + PRICES: {exact prices, packages, what is included}
HOW TO BUY / NEXT STEP: {the one thing you want them to do: call, book, pay, visit}
HOURS + AREA: {when, where you deliver or serve}
FIVE QUESTIONS PEOPLE ASK, WITH YOUR ANSWERS:
1. … 2. … 3. … 4. … 5. …
TONE: {3 adjectives} — write like this example of my own: "{paste one real message you sent}"
LANGUAGE: {English / Hindi / Bangla / match the customer}
NEVER: {promise discounts, delivery dates, medical/financial advice, anything not listed above}
SIGN-OFF: {name, phone}
```

### 8.2 First reply

```
{BRIEF}

You are replying, as me, to a new enquiry.
Their name: {{Name}}
What they wrote: {{Question}}

Write the email body only. Under 120 words. Plain text, no links, no emoji.
Answer their question using ONLY the facts in the brief. If the brief does not answer it,
say I will confirm personally today — never guess a price, date or policy.
End with the one next step from the brief.
First line: a subject line starting with "Subject:", under 8 words.
```

### 8.3 Follow-up (one prompt, three steps)

```
{BRIEF}

This is follow-up {{Step}} of 3 to {{Name}}, who asked: {{Question}}
My previous email to them: {{Last email}}

Follow-up 1 (day 2): one useful fact or tip related to their question, then the next step.
Follow-up 2 (day 5): one short real example of what customers get, then the next step.
Follow-up 3 (day 9): a polite last note — "I won't keep emailing; reply any time."

Under 80 words. Plain text, no links. Do not repeat the previous email.
Use only facts from the brief. Last line: "Reply STOP and I won't email again."
First line: "Subject:" under 8 words.
```

### 8.4 FAQ bot

```
{BRIEF}

You answer customer messages on Telegram for this business.
Rules:
- Answer only from the brief. Short: 1–3 sentences. Match the customer's language.
- If the answer is not in the brief, or they want to book, complain or negotiate:
  say a person will reply soon, and end your message with [HANDOVER].
- Never invent prices, dates, discounts or availability.

Customer message: {{text}}
```

### 8.5 Campaign line

```
{BRIEF}

Write a short email to {{Name}}, who opted in to hear from us. Note about them: {{Note}}.
Purpose of this email: {one sentence the person writes on the day}.
Under 100 words, plain text, one next step from the brief.
Last line: "Don't want these? Reply STOP and you won't hear from us again."
First line: "Subject:" under 8 words.
```

## 9. Break it — the 3:30 checklist

Print one per seat. Every box gets a tick or a fix.

- [ ] The test lead's **name** is right in the greeting
- [ ] No **price, date or promise** that is not in the brief
- [ ] The email is short and sounds like **them**, not like a brochure
- [ ] It did **not** land in spam (if it did: shorter, plain, no links)
- [ ] One enquiry produced **one** reply, not two (row status updated)
- [ ] A row due today with no reply **sent** follow-up 1
- [ ] Replying from the phone **stopped** the follow-ups
- [ ] Follow-ups and campaign carry the **STOP** line
- [ ] The bot answered a **price** correctly
- [ ] The bot said "a person will reply" to a question **not** in the brief, **your own Telegram got the alert**, and the customer never saw `[HANDOVER]`
- [ ] Scenario timezone is **Asia/Kolkata**; both scenarios are **ON**
- [ ] Blueprints **exported** to the business folder

**Captain fixes for the usual failures**

| Symptom | Usual cause |
|---|---|
| Google sign-in popup does nothing | Browser blocked the popup; allow popups for make.com |
| Scenario runs, nothing happens | Search filter wrong (Status not empty, wrong sheet tab) |
| Email says "Hi {{Name}}" literally | Field not mapped; drag the value from the trigger output |
| Two emails per lead | Update-a-Row step failed or points at the wrong row number |
| Follow-up dates wrong | Scenario timezone not Asia/Kolkata |
| Bot silent | Scenario B not ON, or they never pressed Start in Telegram |
| Gemini error 429 | Free-tier rate limit; wait a minute, run once again |

## 10. Guardrails we say out loud

- **Only people who contacted you or asked to hear from you.** No bought lists, no scraped contacts, no cold blasts. "If you want to email ten thousand strangers, skip this Sunday" is on the website; mean it in the room.
- **Every sequence stops on reply; every campaign carries an opt-out.**
- **Test leads on the day.** Free AI tiers may use inputs to improve products; no real customer data, no confidential client files.
- **WhatsApp:** the official WhatsApp Business Platform needs a Meta business account, business verification, a dedicated number and a provider, and Meta charges for many message types. It takes days. The bot's brain (brief + rules + handover) moves across unchanged. Show the path; do not attempt it live.
- **No promises of sales.** We promise that no lead waits more than an hour in working hours. Whether they buy is their offer, not our automation.

## 11. The last ten minutes

1. 6–8 people show their Leads sheet or their bot answering, 30 seconds each.
2. Next Sunday named on the screen before anyone leaves.
3. Group photo.
4. **Tuesday pulse** in the WhatsApp group: *"Open your Leads sheet. Screenshot one reply your automation sent this week, or one question your bot answered. Post it."*

## 12. After Sunday

- Same night: archive row in `docs/ENCYCLOPEDIA.md` §8 — four photos, one paragraph of what actually happened, one thing we change.
- **The System test, one week later:** how many people still have scenario A switched ON? That number, not the attendance, is whether this Sunday worked.

## 13. Open decisions for Neeraj

1. Keep Make, or swap to n8n or another builder (§3 says how).
2. Gmail, Gmail SMTP or Brevo as the sender, settled by the dry run (§4.1).
3. Which sample businesses to print (§5).
4. Whether to keep the September WhatsApp group link in `workshop.json` (`whatsappWorkshop`) or open a new group for October.
