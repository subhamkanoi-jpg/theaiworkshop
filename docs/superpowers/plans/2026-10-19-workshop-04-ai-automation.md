# Workshop #4 (AI Automation, 25 Oct) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 27 September video-ad workshop with the 25 October AI automation workshop everywhere the site, the share card, the discovery files and the booking backend sell it.

**Architecture:** `workshop.json` is the single source of truth. `src/config.ts` re-exports it for React; `api/index.py` loads it for payments; `scripts/write-seo-html.mjs` writes the crawlable HTML shells and public discovery files from it. Per-workshop page copy now lives in `workshop.json` too, so pages only read it.

**Tech Stack:** React 19 + Vite + Tailwind 3, FastAPI + Razorpay (Python), Node 20 scripts, pytest.

**Spec:** `docs/superpowers/specs/2026-10-19-workshop-04-ai-automation-design.md`

## Global Constraints

- Date `Sunday, 25 October 2026`, time `12:00 PM – 4:00 PM`, doors `11:30 AM`, price `₹699` (`69900` paise), `50` seats, Salt Lake Sector 1. Read these from `workshop.json`; never retype them in code.
- Lead: `Neeraj Kanoi`, `Growth Lead`, `Wokelo AI` (`workshop.json` → `lead`).
- Banned words in public copy: leverage, ecosystem, agentic, disrupting, 10x, superintelligence, digital transformation. No income or results promises.
- No public file or page may still sell 27 September: no `27 Sept`, `27 September`, `₹799`, `11:00 AM`, `face lock`, `ElevenLabs`, `Build a Complete AI Video Ad`. Past-tense archive mentions of "AI video ads" in September are allowed.
- Do not run `npm run dev` or `npm run build` (both rewrite the HTML shells; tasks run in parallel). Type-check with `npx tsc -p tsconfig.app.json --noEmit`.
- Do not commit. The coordinator reviews and commits each task.
- Windows checkout; use forward-slash paths in commands; files are UTF-8.

## Review Focus

1. Someone who booked 27 September books 25 October with the same email → succeeds (Task 2 test `test_previous_workshop_attendee_can_book_again`).
2. September's paid orders do not count toward October's 50 seats → booking still open (Task 2 test `test_previous_workshop_does_not_fill_this_one`).
3. Homepage at 375px wide: hero run log and the five-block run rail fit without horizontal scroll (Task 4 step "verify layout"; coordinator checks in browser).
4. `prefers-reduced-motion: reduce` → run log shows every line, no animation (Task 4 CSS + coordinator check).
5. A share on WhatsApp shows the October card, not September's (Task 3 test asserts `og:image` = `/assets/og-kolkata-oct25.png` and the file exists; Task 5 makes the file).

---

### Task 1: Content and interface — DONE by coordinator

**Files:** `workshop.json`, `src/config.ts`

**Produces (read these, do not edit them):**
- `workshop.json` keys, new: `doorLabel`, `lead{name,role,org,photo,photoPosition,bio}`, `hero{lines[2],sub}`, `stages[5]`, `artifactsHeading`, `artifactSpecs[5]`, `runHeading`, `run[{time,title}]×5`, `finishLine`, `belong[3]`, `stayHome[3]`, `doNotBring[3]`, `ticketChips[3]`, `ticketNote`, `captainTask`, `prep[5]`, `share{pitch,hook,body}`, `seo{updated,homeTitle,homeOgTitle,homeHeading,homeDescription,workshopDescription,answersDescription,bookTail,shareTail,planHeading,history,scope,personas[]}`. Existing keys keep their meaning.
- `src/config.ts` exports, new: `WORKSHOP_DAY_MONTH` ("25 October"), `WORKSHOP_MONTH` ("October"), `WORKSHOP_DOOR_LABEL`, `HERO`, `STAGES`, `ARTIFACTS_HEADING`, `RUN`, `RUN_HEADING`, `FINISH_LINE`, `BELONG`, `STAY_HOME`, `DO_NOT_BRING`, `TICKET_CHIPS`, `TICKET_NOTE`, `CAPTAIN_TASK`, `PREP`, `SHARE`, `LEAD`. `WORKSHOP_DATE_SHORT` is "25 Oct". `ARTIFACT_SPECS` now reads `workshop.artifactSpecs`.

---

### Task 2: Backend — seats counted per workshop, October email

**Files:**
- Modify: `api/index.py` (docstring line 6, `_FALLBACK` 37-52, constants 71-83, `order_takes_seat` 112-120, `send_confirmation_email` 224-273, `create_order` 448-479, `reserve_venue` 481-506)
- Test: `tests/test_api.py`

**Interfaces:**
- Consumes: `workshop.json` → `slug`, `prep`, `bringLabel`.
- Produces: `WORKSHOP_SLUG: str`, `PREP: list[str]`; `order_takes_seat(order: dict) -> bool` is true only when `notes.workshop == WORKSHOP_SLUG` and the order is paid or an open venue hold. Every order created by `/api/create-order` and `/api/reserve` carries `notes["workshop"] = WORKSHOP_SLUG`.

- [ ] **Step 1: Write the failing tests** in `tests/test_api.py` (import `WORKSHOP_SLUG`, `PREP` from `api.index`):

```python
def test_order_takes_seat_only_for_this_workshop():
    mine = {"workshop": WORKSHOP_SLUG}
    assert order_takes_seat({"status": "paid", "notes": dict(mine)})
    assert order_takes_seat({"status": "created", "notes": {**mine, "hold": "venue"}})
    assert not order_takes_seat({"status": "paid", "notes": {"workshop": "ai-video-ad-from-scratch"}})
    assert not order_takes_seat({"status": "paid", "notes": {}})  # legacy, pre-tagging orders

def test_previous_workshop_attendee_can_book_again(monkeypatch):
    # paid September order for ada@example.com, no workshop tag
    # POST /api/create-order with the same email -> 200
    # new order notes["workshop"] == WORKSHOP_SLUG

def test_previous_workshop_does_not_fill_this_one(monkeypatch):
    # TOTAL_SEATS paid orders tagged "ai-video-ad-from-scratch"
    # POST /api/reserve -> 200 (send_* monkeypatched to True)

def test_reserve_tags_the_order_with_this_workshop(monkeypatch):
    # POST /api/reserve -> store[0]["notes"]["workshop"] == WORKSHOP_SLUG

def test_confirmation_email_lists_the_prep(monkeypatch):
    # capture the MIMEMultipart passed to api.index._send (monkeypatch _smtp to return creds)
    # html contains every item of PREP, html.escape'd
    # "three WhatsApp messages" not in html
```

Update existing fixtures that expect a seat (`test_reserve_enforces_capacity`, `test_reserve_blocks_duplicate_email`, `test_admin_data_with_key`, `test_order_takes_seat`) so their orders carry `"workshop": WORKSHOP_SLUG`.

- [ ] **Step 2: Run, expect the new tests to fail**

Run: `python -m pytest tests/test_api.py -q`
Expected: failures on `WORKSHOP_SLUG`/`PREP` import or the new assertions.

- [ ] **Step 3: Implement**
  - `WORKSHOP_SLUG = str(W["slug"])`, `PREP = [str(p) for p in W.get("prep") or []]`.
  - `order_takes_seat`: return False unless `notes.get("workshop") == WORKSHOP_SLUG`, then the existing paid/venue logic. `count_taken`, `find_existing_seat`, `require_capacity`, `_admin_rows` all go through it, so they scope automatically.
  - Add `"workshop": WORKSHOP_SLUG` to the `notes` of both `client.order.create` calls.
  - Email: replace the "What to bring" paragraph with `BRING_LABEL`, then a `<p><strong>Before Sunday:</strong></p><ul>` of `PREP` items (each `html.escape`d). Delete the "three WhatsApp messages or captions" sentence.
  - `_FALLBACK`: mirror the new `workshop.json` values for `slug`, `amountPaise`, `price`, `dateLabel`, `timeLabel`, `durationLabel`, `title`, `bringLabel`, `prep`.
  - Docstring line 6: "The seat cap (`totalSeats` in workshop.json) is enforced per workshop, by `notes.workshop`."
  - Admin page header: show `WORKSHOP_TITLE` and `WORKSHOP_DATE_LABEL` under the count.

- [ ] **Step 4: Run, expect pass**

Run: `python -m pytest tests/test_api.py -q`
Expected: all pass.

---

### Task 3: SEO shells, discovery files and config tests read workshop.json

**Files:**
- Modify: `scripts/write-seo-html.mjs`, `tests/test_config_sync.py`, `seo/keywords.json`, `src/seo/local.ts` (`LOCAL_KEYWORDS` only)
- Regenerated by the script (commit them): `index.html`, `workshop.html`, `book.html`, `path.html`, `room.html`, `host.html`, `about.html`, `kolkata.html`, `answers.html`, `share.html`, `src/seo/pages.json`, `src/seo/elmo.json`, `public/ai/{faq,summary,service}.json`, `public/llms.txt`, `public/llms-full.txt`, `public/{about,kolkata,answers}.md`, `public/.well-known/ai.txt`, `public/feed.xml`, `public/sitemap.xml`

**Interfaces:**
- Consumes: Task 1 `workshop.json` keys (`seo.*`, `lead`, `doorLabel`, `prep`, `ogImage`).
- Produces: shells whose `og:image` is `https://theaiworkshop.in/assets/og-kolkata-oct25.png` (file made by Task 5).

- [ ] **Step 1: Update the tests first** in `tests/test_config_sync.py`:
  - `test_home_head_targets_the_local_query`: assert `f"<title>{CFG['seo']['homeTitle']}</title>"` and `CFG["seo"]["homeDescription"]` are in `index.html` (drop the hardcoded September strings); keep the robots, `og:image` and file-exists asserts.
  - New `test_seo_copy_names_the_current_offer`: `"25 Oct"` (derive from `dateIso`) is in `seo.homeTitle`, `seo.homeOgTitle`, `seo.homeDescription`; `"25 October"` and `f"₹{CFG['price']}"` are in `seo.workshopDescription`; `CFG["lead"]["name"]` is in `public/llms-full.txt`.
  - `test_event_carries_the_full_local_entity`: performer is `{"@type": "Person", "name": CFG["lead"]["name"], ...}` with `worksFor.name == CFG["lead"]["org"]` (replace the "Core Team" assert).
  - `test_public_copy_has_one_current_offer`: extend `stale` with `"27 Sept"`, `"27 September"`, `"Build a Complete AI Video Ad"`, `"face lock"`, `"Face lock"`, `"ElevenLabs"`, `"₹799"`, `"11:00 AM"`.
  - Replace `test_teaser_end_card_matches_the_live_offer` and `test_teaser_renders_are_served_from_public` with one `test_any_page_playing_the_teaser_matches_the_live_offer`: collect `src/**/*.tsx` files containing `teaser-9x16`; if none, pass; otherwise run the old end-card check and the webm-before-mp4 order check against each file that uses it.

- [ ] **Step 2: Run, expect failures**

Run: `python -m pytest tests/test_config_sync.py -q`
Expected: FAIL on the title/description/performer/stale assertions.

- [ ] **Step 3: Make the generator read workshop.json** (`scripts/write-seo-html.mjs`)
  - Derive `dayMonth` ("25 October"), `dayMonthShort` ("25 Oct"), `year` and `startTime` ("12:00 PM", the part of `timeLabel` before "–", trimmed) from `w.dateIso` / `w.timeLabel`.
  - `modified = w.seo.updated`; `history = w.seo.history`; `pack.personas = w.seo.personas`.
  - `descriptions`: `home = w.seo.homeDescription`; `workshop = w.seo.workshopDescription`; `answers = w.seo.answersDescription`; `book = \`Reserve ${w.title}. ${facts} ${w.seo.bookTail}\``; `share = \`Invite a friend to ${w.title}. ${facts} ${w.seo.shareTail}\``; `kolkata = \`Learn AI in Kolkata, one practical project at a time. Next: ${w.title}, ${dayMonth} ${year}. Salt Lake, offline, ₹${w.price}.\``; `path`, `room`, `host`, `about` unchanged.
  - `titles`: `home = w.seo.homeTitle`; `workshop = \`${w.title} | ${dayMonth}, Kolkata\``; `book = \`Book Your Seat | ${w.title}, ${dayMonth}\``; others unchanged. Home `ogTitle = w.seo.homeOgTitle`.
  - Fallback `<h1>` on home = `w.seo.homeHeading`; "The three-hour plan" → `w.seo.planHeading`; getting-there sentence → `Doors open at ${w.doorLabel} for a ${startTime} start.`
  - `og:image:alt` for the event image → `${w.title} — ${dayMonth} ${year}, Salt Lake, Kolkata`.
  - Event `performer` → `{ "@type": "Person", name: w.lead.name, jobTitle: w.lead.role, worksFor: { "@type": "Organization", name: w.lead.org } }`.
  - `llms-full.txt`: add `## Before the session` with `w.prep` as a bullet list (after `## Session plan`); contact block line becomes `Led by ${w.lead.name}, ${w.lead.role} at ${w.lead.org}. Hosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi.`; `## Scope` body = `w.seo.scope`.
  - Fix the comment that says "about 27 September" to say "about the current workshop".
  - `seo/keywords.json`: add `AI automation workshop Kolkata` (tags `["primary","topic"]`), `AI automation course Kolkata` (`["topic"]`), `email marketing automation Kolkata` (`["topic"]`), `chatbot workshop Kolkata` (`["topic"]`). Add the first two to `LOCAL_KEYWORDS` in `src/seo/local.ts`.

- [ ] **Step 4: Regenerate and run**

Run: `node scripts/write-seo-html.mjs && python -m pytest tests/test_config_sync.py -q`
Expected: everything passes except the og-image file-exists assert (Task 5 creates the PNG) and, until Task 4 lands, nothing else. `grep -rn "27 Sept\|₹799" *.html public` prints nothing.

---

### Task 4: Pages read the October copy; hero shows an automation running

**Files:**
- Create: `src/components/AutomationRun.tsx`, `tests/test_pages_copy.py`
- Modify: `src/App.tsx`, `src/components/KitchenRule.tsx`, `src/components/SiteChrome.tsx:31`, `src/components/Registration.tsx:205-220`, `src/pages/WorkshopPage.tsx`, `src/pages/KolkataPage.tsx`, `src/pages/RoomPage.tsx`, `src/pages/SharePage.tsx`, `src/pages/HostPage.tsx`, `src/pages/PathPage.tsx`, `src/pages/AboutPage.tsx`, `src/content/path.ts`, `src/index.css` (append run-log styles next to `.stage-rail`)

**Interfaces:**
- Consumes: Task 1 exports from `@/config`.
- Produces: `export function AutomationRun()` in `src/components/AutomationRun.tsx`.
- Must keep (tests grep for them): `workshopContent.localFaqs.map` in `App.tsx`; `workshopContent.faqs.slice(0, 5)` in `WorkshopPage.tsx`.

- [ ] **Step 1: Write the failing tests** in `tests/test_pages_copy.py` (same `ROOT`/`CFG` preamble as `test_config_sync.py`):

```python
def test_no_page_still_sells_september():
    for path in ROOT.glob("src/**/*.tsx"):
        text = path.read_text(encoding="utf-8")
        for phrase in ("27 Sept", "27 September", "filmmaking", "face lock", "Face lock", "finished ad"):
            assert phrase not in text, f"{path.name}: {phrase}"

def test_home_reads_its_copy_from_workshop_json():
    app = (ROOT / "src/App.tsx").read_text(encoding="utf-8")
    for name in ("HERO", "STAGES", "RUN", "BELONG", "STAY_HOME", "TICKET_CHIPS", "LEAD", "AutomationRun"):
        assert name in app
    assert "teaser-9x16" not in app

def test_every_outcome_has_a_spec():
    assert len(CFG["artifactSpecs"]) == len(CFG["outcomes"]) == len(CFG["stages"])
    assert all(":" in outcome for outcome in CFG["outcomes"])
```

- [ ] **Step 2: Run, expect fail** — `python -m pytest tests/test_pages_copy.py -q` → FAIL.

- [ ] **Step 3: `AutomationRun`** — inside the existing `.cinema-gate` > `.cinema-screen.cinema-screen-vert` frame, a header ("Your automation" left; a pulsing terracotta dot + "Running" right) and an `<ol className="run-log">` of these seven rows, each `<li style={{"--i": n}}>` with a mono time cell and a text cell, exact copy:

| time | text |
|---|---|
| 12:04 | New lead · Riya S. asks “Do you deliver to Salt Lake?” |
| 12:04 | Added to Leads.gsheet |
| 12:05 | AI reply written from your brief |
| 12:05 | Email 1 sent — “Yes, we deliver across Sectors 1 to 5…” |
| Day 2 | Follow-up 1 sent |
| Day 4 | Riya replied — follow-ups 2 and 3 cancelled |
| 24/7 | @YourBusiness_bot answered 14 questions, handed 1 to you |

`aria-label` on the frame: "An example run of the automation you build: a new lead gets an AI reply, follow-ups stop when she replies, and a bot answers questions." CSS (in `index.css`, palette `#f4eee4` text, `#e8a090` times, `#c8553d` accents, same terminal font as `.gate-term`): rows fade/slide in one after another (`animation-delay: calc(var(--i) * 1.2s)`) on a ~14s infinite loop; under `@media (prefers-reduced-motion: reduce)` every row is visible and nothing animates. Text wraps; nothing overflows at 300px wide.

- [ ] **Step 4: `App.tsx`**
  - Announcement bar: `Sun {WORKSHOP_DATE_SHORT}`.
  - Hero: `h1` = `HERO.lines[0]` `<br/>` `<span className="text-primary">{HERO.lines[1]}</span>`; `p` = `HERO.sub`; chips `[`${TOTAL_SEATS} seats`, "Tables of 8", "No coding"]`.
  - Right column: replace the `<video>` gate with `<AutomationRun />`; stage rail maps `STAGES`; caption `What yours looks like by {end}` where `end` is the part of `WORKSHOP_TIME_LABEL` after "–", trimmed.
  - Artifact section: heading `ARTIFACTS_HEADING` + muted " Not a certificate."; last card "Plus the blueprint." with link "See the full plan".
  - New "Led by" section between the artifact section and `<KitchenRule />`: `LEAD.photo` (object-position `LEAD.photoPosition`, ~144px, rounded-2xl), eyebrow "Led by", `h2` `LEAD.name`, line `{LEAD.role}, {LEAD.org}`, paragraph `LEAD.bio`. Same section chrome as its neighbours (`border-b border-border py-14 sm:py-20`, `max-w-5xl`).
  - Run rail: map `RUN` (`{time,title}`), heading `RUN_HEADING`, grid `sm:grid-cols-3 lg:grid-cols-5`, closing line `FINISH_LINE`.
  - Hosts row: under the host whose `name === LEAD.name`, show "Leads this session".
  - Door lists: `BELONG`, `STAY_HOME`. Ticket chips: `TICKET_CHIPS`. Getting there: `Doors {WORKSHOP_DOOR_LABEL}`.
  - Delete the local `STAGES`, `RUN`, `BELONG`, `STAY_HOME` consts.

- [ ] **Step 5: `KitchenRule.tsx`** — same layout and classes, new argument:
  - `h2`: "Same leads. Same Monday." / italic "Different system."
  - Left card label "Most people do"; three dim `gate-term` lines: "Reply when there is time", "Forget the second follow-up", "Type the price list out again"; big figure "Whenever" with small caption "to reply".
  - Right card label "We build"; `PLAN` rows: Trigger — "New form entry → Leads sheet"; AI step — "Gemini writes from your brief"; Sequence — "Day 2 · 5 · 9, stops on reply"; Bot — "Answers from your price list"; big figure "15 min" with small caption "to reply".
  - `MAXIMS`: "Draft before you send", "Your facts, not its guesses". Rewrite the file's doc comment to match.

- [ ] **Step 6: The other pages**
  - `WorkshopPage`: breadcrumb `${WORKSHOP_DAY_MONTH} workshop`; sub `HERO.sub`; under the date chips a "Led by" line with a 40px avatar: `Led by {LEAD.name} · {LEAD.role}, {LEAD.org}`; heading `ARTIFACTS_HEADING`; run from `RUN`/`RUN_HEADING` (same grid as home); "Do not bring" chips from `DO_NOT_BRING`; new section "Before Sunday" (between Bring and FAQs) as a numbered list of `PREP`.
  - `KolkataPage`: sub `HERO.sub`; history line `June 2026: websites. September: AI video ads. {WORKSHOP_DAY_MONTH}: your first AI automation.`
  - `RoomPage`: closing line `Come sit in it on {WORKSHOP_DAY_MONTH}.`; under the lead host: `Leads the {WORKSHOP_DAY_MONTH} workshop · {LEAD.role}, {LEAD.org}`.
  - `SharePage`: `SHARE_TEXT` = `SHARE.hook`, blank line, "Join The AI Workshop in Salt Lake, Kolkata: {WORKSHOP_TITLE}.", blank line, `SHARE.body`, blank line, date, `time · price · Offline`, `Laptop required. {TOTAL_SEATS} seats, tables of eight.`, blank line, URL. Intro paragraph = `SHARE.pitch`.
  - `HostPage`: `Help eight people {CAPTAIN_TASK} on {WORKSHOP_DAY_MONTH}. Guide at their device; let them build.`
  - `SiteChrome`: workshop nav label = `WORKSHOP_DATE_SHORT`.
  - `Registration`: chips = `TICKET_CHIPS`; the shield note = `TICKET_NOTE`.
  - `AboutPage`: under the lead host, `{LEAD.role}, {LEAD.org} · Host`; that host's `Person` node also gets `description: LEAD.bio`.
  - `path.ts`: `archive` items get optional `href` and `linkLabel`; entries: June (`/room`, "See the June workshop →"), September (`number: 3`, `date: "September 2026"`, `title: "AI video ads"`, `chapter: "Third workshop"`, `artifact: "A vertical AI video ad, built from a brief."`, `status: "shipped"`, no link), current workshop (`chapter: "Next project"`, `artifact: "One automation running, plus the blueprint."`, `href: "/workshop"`, `linkLabel: \`See the ${WORKSHOP_MONTH} plan →\``). `PathPage` renders the link only when `href` is set and uses grid `sm:grid-cols-3`.

- [ ] **Step 7: Verify**

Run: `python -m pytest tests/test_pages_copy.py -q && npx tsc -p tsconfig.app.json --noEmit && npx eslint src`
Expected: tests pass, no type errors, no new lint errors.
Run: `grep -rnE "27 Sep|video ad|filmmaking|Veo|ElevenLabs|three hours" src` → only the September archive lines in `path.ts`/`KolkataPage.tsx`.

---

### Task 5: The October share card

**Files:**
- Create: `scripts/og-kolkata-oct25.html`, `public/assets/og-kolkata-oct25.png`
- Modify: `scripts/make-og-event.mjs` (source/out paths and header comment)
- Keep: `scripts/og-kolkata-sept27.html`, `public/assets/og-kolkata-sept27.png` (archive)

**Interfaces:** Produces `public/assets/og-kolkata-oct25.png`, 1200×630, referenced by `workshop.json` → `ogImage`.

- [ ] **Step 1: Write `og-kolkata-oct25.html`** by copying `og-kolkata-sept27.html` (same palette, grain, edge bar, fonts, layout) with this copy:
  - eyebrow "Offline · Salt Lake, Kolkata"
  - `h1` "AI Automation Workshop" `<br>` `<span class="accent">in 4 hours.</span>`
  - sub "Lead capture, AI replies, a 3-email follow-up and a FAQ bot. Led by Neeraj Kanoi, growth lead at Wokelo AI."
  - facts: pill "Sun 25 Oct · ₹699" · "12 – 4 PM" · "50 seats"
  - phone panel: tag "Your automation", stage "Running", chain `01 Brief`, `02 Capture`, `03 AI reply`, `04 Follow-up`, `05 Bot`; replace the sprockets with five small status dots, the first four terracotta, the last pulsing-style ring (static image).
- [ ] **Step 2: Point `make-og-event.mjs` at the new files.**
- [ ] **Step 3: Render** — `npm i --no-save playwright`, then run with a local Chromium-family browser, e.g. `CHROMIUM_PATH="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" node scripts/make-og-event.mjs`. Do not run `npx playwright install`.
- [ ] **Step 4: Check the output** — the PNG exists, is 1200×630, and (open it as an image) no text is clipped or overlapping.

---

### Task 6: Runbook and docs — coordinator (Opus)

**Files:** Create `docs/WORKSHOP-04-AI-AUTOMATION.md` (minute-by-minute run, the brief template, the three prompts, the build steps per block, the QC checklist, the pre-event dry run and risks, the WhatsApp reminders). Modify `docs/README.md` (next SKU), `docs/ENCYCLOPEDIA.md` (archive rows, Sell chapter, date), `docs/MIND-MAP.md` (October line).

### Task 7: Integration — coordinator

- [ ] `node scripts/write-seo-html.mjs && python -m pytest -q` → all pass.
- [ ] `npm run lint && npm run build` → succeeds.
- [ ] Browser: `/`, `/workshop`, `/book`, `/share`, `/path` at desktop and 375px; reduced motion; console clean.
- [ ] Commit per task, push the branch, open the PR.
