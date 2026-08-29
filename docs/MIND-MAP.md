# Mind map

The whole organism. If a page, a workshop, or a WhatsApp message cannot be placed on this map, it does not belong yet.

---

## One-glance map

```mermaid
mindmap
  root((The AI Workshop
  Kolkata offline store))
    Why
      AI is for the ones who show up
      Artifact not notes
      Room not webinar
      Daily habit not Sunday applause
    Who
      Shop owners
      Students
      Job-seekers
      Freelancers
      Professionals keeping their job
      Disqualify: dabblers, bed webinars
    Storefront
      Homepage 60-second read
      This month SKU above the fold
      The Path as aisle directory
      The Room as proof
      FAQ on the page not only in schema
    Catalog The Path
      1 Talk
        How to brief a model
        Examples beat adjectives
        Save what works
      2 Make
        Jun 28 Website
        Aug 30 Reel
        Images docs decks
      3 Sell
        Oct WhatsApp selling
        Offer page
        First paid skill
      4 System
        Sep 27 Make a second you
        Weekly rhythm
        Prompt kit that is yours
      5 Lead
        Table captain
        Host a Sunday
        Teach your use case
    This month SKU
      Workshop 3
      Sunday 27 Sep 2026
      The Magic of AI
      Talk then a week of work
      50 people tables of 8
    The Room
      Salt Lake
      Hosts Yogesh Neeraj Subham
      60 plus already
      WhatsApp after the Sunday
      Alumni as table captains
    Flywheel
      Show up
      Build named artifact
      Post it
      Friend asks
      Next Sunday
      Captain a table
    Money
      Community ticket 799 to 999
      Surplus back into the hall
      Member skill: build a second-you for a shop
      Not a membership fee this quarter
    Defaults
      Offline only
      Google account Gemini free
      Phone plus laptop
      No install
      Claude is a power-up
```

---

## System map (how the pieces talk)

```mermaid
flowchart TB
  subgraph storefront [Storefront — theaiworkshop.in]
    Home["Home: what this is + this month"]
    Path["/path: encyclopedia"]
    Workshop["/workshop: this Sunday in full"]
    Book["/book: pay"]
    Room["/room: photos, hosts, archive"]
  end

  subgraph sunday [A Sunday in Salt Lake]
    Door["Doors, chai, wifi, account check"]
    Demo["One demo on the big screen"]
    Build["Build YOUR artifact"]
    Share["8 people show it"]
    Photo["Group photo, next SKU named"]
  end

  subgraph graph [The graph — weekday]
    WA["WhatsApp community"]
    Tuesday["Tuesday pulse: use it, post it"]
    Captain["Table captains help"]
  end

  subgraph catalog [The Path — 12 months]
    Talk["Talk"]
    Make["Make"]
    Sell["Sell"]
    System["System"]
    Lead["Lead"]
  end

  Home --> Workshop
  Home --> Path
  Home --> Room
  Workshop --> Book
  Book --> Door
  Door --> Demo --> Build --> Share --> Photo
  Photo --> WA
  WA --> Tuesday
  Tuesday --> Home
  Path --> Talk --> Make --> Sell --> System --> Lead
  System -.-> Workshop
  Lead -.-> Captain
  Captain -.-> Door
```

---

## The store, drawn as a floor

```
┌─────────────────────────────────────────────────────────────┐
│  WINDOW (hero)                                              │
│  The AI Workshop · Kolkata                                  │
│  “AI is for the ones who show up.”                          │
│  THIS SUNDAY: Make a second you · 27 Sept · ₹799 · 100 seats│
│  [ Reserve your seat ]        [ See the Path ]              │
├──────────────┬──────────────────────────────┬───────────────┤
│ AISLE GUIDE  │  SHOWROOM TABLE              │  THE ROOM     │
│              │                              │               │
│ 1 Talk       │  Workshop #3 kit             │  Meetup #1    │
│ 2 Make       │  - 8 questions               │  websites     │
│ 3 Sell       │  - Gem recipe                │  Meetup #2    │
│ 4 System ◄── │  - “sell this to a shop”     │  reels        │
│ 5 Lead       │    one-pager                 │  Hosts named  │
│              │                              │  Captains     │
├──────────────┴──────────────────────────────┴───────────────┤
│  COUNTER: /book · Razorpay or pay at venue · WhatsApp after │
│  STAFF DOOR: become a table captain (alumni only)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Year map (the catalog on the wall)

```mermaid
timeline
  title The Path as a year of Sundays
  Jun 2026 : #1 Make — Build a website
  Aug 2026 : #2 Make — Automate video editing
  Sep 2026 : #3 System — Make a second you (100-person assembly)
  Oct 2026 : #4 Sell — WhatsApp that brings customers
  Nov 2026 : #5 Make — 30 days of content in one afternoon
  Dec 2026 : #6 Sell — Your first offer, priced and written
  Jan 2027 : #7 Talk — Briefing mastery / evals for beginners
  Feb 2027 : #8 Make — Brand kit: logo, photos, on-brand posts
  Mar 2027 : #9 System — A weekly AI operating rhythm
  Apr 2027 : #10 Sell — Deliver work for a real local client
  May 2027 : #11 Lead — Table-captain Sunday
  Jun 2027 : #12 Assembly — Year-one show-and-tell
```

Sundays can slide. The **chapter** cannot. If we skip System and jump to more Make, people collect artifacts they do not use. If we skip Sell, the “monetize” promise is a poster. If we skip Lead, the hosts become the bottleneck and the store dies at 60 members.

---

## Decision map (when we say no)

```mermaid
flowchart LR
  Idea[New idea] --> Q1{Does it produce a named artifact?}
  Q1 -->|no| Kill[Not a Sunday]
  Q1 -->|yes| Q2{Can 100 beginners finish it on phones + a projector?}
  Q2 -->|no| Small[Keep for a 25-person room]
  Q2 -->|yes| Q3{Will they open it on a Tuesday?}
  Q3 -->|no| Demo[Nice demo, wrong SKU]
  Q3 -->|yes| Q4{Can someone charge for this pattern later?}
  Q4 -->|no| Hobby[Community hobby night, not the hero]
  Q4 -->|yes| Yes[Put it on the table]
```
