export const pathChapters = [
  {
    id: "talk",
    n: "01",
    title: "Talk",
    promise: "Brief a model so it does useful work, not generic sludge.",
    status: "this-sunday" as const,
    sunday: "Workshop #3 · The Magic of AI · 27 Sept",
  },
  {
    id: "make",
    n: "02",
    title: "Make",
    promise: "Leave with a named artifact: a site, a reel, a kit.",
    status: "shipped" as const,
    sunday: "#1 website · #2 reel",
  },
  {
    id: "sell",
    n: "03",
    title: "Sell",
    promise: "Turn the artifact into an offer a real person can pay for.",
    status: "next" as const,
    sunday: "October. WhatsApp that brings customers",
  },
  {
    id: "system",
    n: "04",
    title: "System",
    promise: "A weekday habit. The thing you open on Tuesday.",
    status: "later" as const,
    sunday: "Save the recipe. Run it every week.",
  },
  {
    id: "lead",
    n: "05",
    title: "Lead",
    promise: "Captain a table. Then teach your own use case.",
    status: "later" as const,
    sunday: "Alumni floor, not a stage",
  },
];

export const archive = [
  {
    number: 1,
    date: "28 June 2026",
    title: "Build a website",
    chapter: "Make",
    artifact: "A live one-page site, shipped in the room.",
    status: "shipped" as const,
  },
  {
    number: 2,
    date: "30 August 2026",
    title: "Automate video editing",
    chapter: "Make",
    artifact: "A subtitled reel from raw phone footage.",
    status: "shipped" as const,
  },
  {
    number: 3,
    date: "27 September 2026",
    title: "The Magic of AI",
    chapter: "Talk",
    artifact: "A week of finished work, made from how you talk.",
    status: "next" as const,
  },
];

export const briefLoop = [
  { n: "01", title: "Job", body: "One sentence. What should exist when this is done?" },
  { n: "02", title: "Context", body: "Who you are, who it is for, facts, language, constraints." },
  { n: "03", title: "Examples", body: "Two or three pieces of work you already like. Adjectives are a trap." },
  { n: "04", title: "Tests", body: "“Give me 3 options. Flag anything you invented.”" },
  { n: "05", title: "Save", body: "The brief that worked is the product. Reuse it on Tuesday." },
];

export const faqs = [
  {
    q: "Is this only for tech people?",
    a: "No. If you can use WhatsApp, you can do a Sunday. Zero tech background is fine. Zero follow-through isn’t.",
  },
  {
    q: "Is this only for business owners?",
    a: "No. Shop owners, students, job-seekers, freelancers, professionals keeping their job, the room holds all of them if they ship.",
  },
  {
    q: "Do I need Workshop #1 or #2?",
    a: "No. Every Sunday stands alone. The Path is a map, not a lock.",
  },
  {
    q: "What do I walk out with on 27 September?",
    a: "A week of finished work made from how you actually talk, a bio, an offer line, seven posts, and the recipe saved so you can do it again on Tuesday.",
  },
  {
    q: "Do I need a paid AI subscription?",
    a: "No. A free Google account is enough. Bring a phone. A laptop if you have one. Paid Claude or ChatGPT is welcome if you already live there, the recipe is the same.",
  },
  {
    q: "Will I actually build, or just watch?",
    a: "You build. We show the trick once on the big screen. Then you do it with your own work, at a table of eight, with a captain on the floor.",
  },
  {
    q: "Where in Kolkata?",
    a: "Salt Lake. Exact venue is shared after you reserve a seat.",
  },
  {
    q: "Is this online?",
    a: "No. Offline is the product.",
  },
];
