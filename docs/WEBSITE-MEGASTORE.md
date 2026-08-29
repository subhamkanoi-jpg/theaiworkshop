# Website as mega store

How theaiworkshop.in must read so a stranger does not need a host on WhatsApp to explain the company.

This is the design for the next rebuild. Do not implement until the SKU and the 100-person format are confirmed. Then do it in one pass, not in six “copy tweaks.”

---

## 1. The job of the site

In 60 seconds, on a phone, without scrolling into mystery:

1. **What this is** — Kolkata’s offline AI store / community. Not a webinar. Not a college course.
2. **What you can do today** — reserve 27 September, *Make a second you.*
3. **What the year is** — the Path, with #1 and #2 already on the shelf.
4. **Whether you belong** — velvet rope, still kind.
5. **That the room is real** — photos, named hosts, 60+ already.

If the visitor only remembers one line it should be:

> Show up on a Sunday. Leave with a thing. Come back.

---

## 2. What is wrong with the current site

The current site is a **well-designed flyer for Workshop #2.**

| Strength | Failure |
|---|---|
| Brand (terracotta, Fraunces, Caveat, ivory) | Poetry before explanation |
| Proof photos | Hosts are unnamed avatars |
| `/book` conversion path | Home has *less* information than `/book` (inverted store) |
| Velvet rope | “Business owners” shrinks the actual room |
| Sticky CTA | CTA has nothing to say except “seat” |
| Seat cap 25 as intimacy | Contradicts a 100-person assembly |
| FAQ in JSON-LD only | Humans never see the answers |
| Membership / host / interest code still in the repo | Ghost products, unwired |

IKEA would not put the product manual in the warehouse and the poster in the window.

---

## 3. Information architecture

Keep path-based routing. Do not introduce a SPA framework for its own sake. Add pages the store actually needs.

| URL | Job | Index? |
|---|---|---|
| `/` | Storefront. 60-second read. This month + Path preview + Room + FAQ. | yes |
| `/workshop` | This Sunday in full: artifact, rundown, bring-this, velvet rope, captains. | yes |
| `/book` | Pay. No new ideas. Ad landing page. `noindex` stays. | no |
| `/path` | The encyclopedia, human-readable. Archive of past Sundays. Year wall. | yes |
| `/room` | Photos, hosts with names, captains, member artifacts. | yes |
| `/host` | Table captain / future host. Rewire `BecomeHost`. Alumni energy, not a career page. | yes |
| `/privacy` `/terms` `/refund` | As now. | yes, low |

WhatsApp links stay off the public homepage as *join the group without paying* — they remain the post-purchase corridor. Putting a public group link in the footer turned the community into a leak last time; don’t.

---

## 4. Homepage, section by section

Keep the visual system (ivory, terracotta `#c8553d`, Fraunces italic, Caveat asides, polaroid proof). Change the **order and the nouns.**

### Nav

Logo · The Path · This Sunday · The Room · **Reserve 27 Sept**

Mobile: logo + Reserve. Hamburger holds the rest.

### 1. Window (hero)

**Badge:** Offline · Salt Lake · Sunday 27 September

**H1 (keep the soul, add the noun):**

> AI is for the ones who show up.
>
> *This Sunday: make a second you.*

**Lead, one breath:**

> Kolkata’s offline AI workshops. You build one real thing with your own hands and take it home. Next: an assistant that already knows your work — on your phone — 27 September.

**Buttons:** `Reserve your seat` → `/book` · `What you’ll walk out with` → `#workshop`

**Proof line:** 60+ in the room · Meetup #1 websites · Meetup #2 reels · hosts named as the three faces, not “community avatars.”

**Right column:** glimpse reel, same as now. Caption stays: `real room · real people · Kolkata`

### 2. This Sunday (the table in the middle of the store)

The current workshop card, rewritten for #3.

- Title: Make a second you.
- Artifact: named Gemini Gem, their voice, three live tests.
- Facts: Sun 27 Sept · 11:00–14:00 · Salt Lake · 50 seats (tables of 8, captains).
- Price: ₹799 early bird / ₹999 · market strike-through only if we keep a honest market number (a working assistant built by a freelancer is ₹5,000–₹15,000, not a fake ₹1,599).
- Four bullets from the runbook.
- CTA to `/book`. Secondary: `Full rundown` → `/workshop`

Handwritten aside: `a thing you’ll open on Tuesday — not another webinar`

### 3. The Path (aisle directory)

Five chapters in one horizontal scroller / five cards. #1 and #2 marked **shipped**. #3 marked **this Sunday**. October marked **next**.

This is the encyclopedia teaser. Link: `See the full Path` → `/path`

### 4. How a Sunday works

Three steps, same for every month:

1. You bring your raw material (or use ours).
2. You build, on the big screen, with a captain at your table.
3. You leave with the artifact on your phone.

### 5. Velvet rope

Keep the two-column invite card. Widen “who” beyond business owners. Keep “this isn’t for you if” exactly as sharp.

### 6. The Room

Meetup #1 photos. Add a strip for #2 if photos exist after 30 Aug. **Name the hosts.** Three sentences, not bios.

Placeholder member stories from the old membership lander were `[MEMBER STORY]`. Do not ship fiction. If we do not have a real name, we show the artifact (website screenshot, reel still) and the neighbourhood only.

### 7. FAQ

The encyclopedia FAQ, on the page. Schema stays in `index.html` and must match.

### 8. Closer

Seat cap, date, CTA, pay-online-or-venue. No new slogan.

Footer: Path, Room, Host, legal, Instagram, email, phone. Next Sunday named.

Sticky mobile CTA: `27 Sept · Make a second you · ₹799` — not a naked “Reserve.”

---

## 5. `/workshop` — self-explanatory SKU page

This is the page a mother, a partner, or a sceptical friend gets sent.

Must contain, in this order:

1. Artifact (what is in your hands at 14:15)
2. Who it is for (three people: shop, student, professional)
3. Rundown (the table from the runbook, shortened)
4. Bring this / don’t bring that
5. Tools (Gemini default, others welcome)
6. Captains / why 100 is still a room
7. Price + CTA to `/book`
8. Link to Path and archive

`/book` then only has: 8-line recap, value stack, form, trust. It should not be where people *learn* what the Sunday is. That inversion is the current bug.

---

## 6. `/path` — the live encyclopedia on the web

Render [ENCYCLOPEDIA.md](./ENCYCLOPEDIA.md) as a designed page, not a markdown dump.

- Chapter cards with the Sunday that belongs to them.
- Archive with photos.
- The loop (Job / Context / Examples / Tests / Save) as a five-step graphic.
- Glossary as a short definition list.
- A printed-feeling layout, same brand. This is the store’s catalog, not Notion.

Implementation note: a `src/content/path.ts` (or JSON) should be the source of truth the page maps over, so a date change is not a hunt through JSX. `workshop.json` grows into `workshop.json` (this SKU) + `path.json` (the catalog). Backend keeps reading this SKU only.

---

## 7. Copy rules for the rebuild

1. **Noun before vibe.** “Make a second you” then the italic. Never the reverse on transactional surfaces.
2. **Artifact on every CTA surface.** Seats are not the product.
3. **No fake scarcity.** 100 seats is a real cap. Don’t invent “14 of 25 taken” unless the API says so.
4. **No fake testimonials.** Screenshots and neighbourhoods until a named person agrees.
5. **Hosts have names.**
6. **Business-owner-only language is retired.** The rope is follow-through, not GST registration.
7. **Keep Caveat asides.** They are the soul. They are not the H1.
8. **Market value** must be a real alternative cost, or we drop the strike-through. Fake ₹1,599 trained people to distrust us.

---

## 8. `workshop.json` for #3 (proposed)

```json
{
  "slug": "make-a-second-you",
  "number": 3,
  "chapter": "System",
  "title": "Make a second you",
  "artifact": "A named AI assistant trained on your work, on your phone",
  "amountPaise": 79900,
  "price": 799,
  "priceAfter": 999,
  "earlyBirdUntil": "2026-09-13",
  "marketValue": 8000,
  "totalSeats": 120,
  "dateLabel": "Sunday, 27 September 2026",
  "timeLabel": "11:00 AM – 2:15 PM",
  "durationLabel": "3 hours 15 minutes",
  "location": "Salt Lake, Kolkata",
  "dateIso": "2026-09-27",
  "startDate": "2026-09-27T11:00:00+05:30",
  "endDate": "2026-09-27T14:15:00+05:30",
  "whatsappWorkshop": "(rotate after #2 — do not leak the old group as a public CTA)",
  "whatsappHost": "(captains group)",
  "phoneTel": "+919830715557",
  "phoneDisplay": "+91 98307 15557",
  "supportEmail": "theaiworkshop.in@gmail.com"
}
```

Backend seat cap, emails, Razorpay description, OG, JSON-LD, tests in `test_config_sync.py` — all of these move together. The August 30 labels are currently hard-coded in `index.html`, `book.html`, `BookPage` title, and FAQ schema. The last audit already taught us this. Do not half-update.

---

## 9. What we rewire vs leave dead

| Component | Action |
|---|---|
| `Registration` | Keep. New value stack, new duration, new price. |
| `BecomeHost` | Rewire on `/host` as table-captain application. Weekend-only date can wait; captains for 27 Sept are invited by hand. |
| `ApplicationForm` | Stay dead. Belonging is not an application. |
| `InterestForm` | Optional on `/path` for “tell me when you do X” — waitlist for future SKUs, not a second conversion path on home. |
| `HeroCanvas` | Optional atmosphere on `/book` only. Home should stay photo-real. |
| Portfolio images | Show on `/room` and `/path` archive for #1. |

---

## 10. Build order (once confirmed)

1. `workshop.json` + config + JSON-LD + tests (date/price/seats/title).
2. Homepage sections in the new order (copy + Path preview + named hosts + FAQ).
3. `/workshop` SKU page.
4. `/book` thinned to checkout.
5. `/path` encyclopedia page.
6. `/room` and `/host`.
7. OG card for #3 (new sentence, real photo, new date).
8. Browser pass: home, workshop, book, path, room — phone and desktop — actually reserve in test mode.

Do not restyle the brand. The store was always well-dressed. It was empty of aisles.
