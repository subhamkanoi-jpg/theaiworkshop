/**
 * Writes crawlable HTML shells and public discovery files from workshop.json.
 * Keeping the booking shell here prevents old event copy surviving a title change.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const w = JSON.parse(readFileSync(join(root, "workshop.json"), "utf8"));
const pack = JSON.parse(readFileSync(join(root, "src/seo/elmo.json"), "utf8"));
// One host for canonicals, sitemap, JSON-LD @ids and share URLs. Splitting
// these between www and non-www is what splits the ranking signal, so the
// value lives in workshop.json and nothing here hardcodes a host.
const origin = w.origin;
const modified = "2026-09-08";
// The event card is the share image wherever the page is about 27 September;
// pages about the room or the archive keep the photograph of the room.
const eventImage = `${origin}${w.ogImage}`;
const roomImage = `${origin}/meetup1/group-selfie.jpg`;
const EVENT_PAGES = ["home", "workshop", "book", "kolkata", "share", "answers"];
const imageFor = (key) => (EVENT_PAGES.includes(key) ? eventImage : roomImage);
const write = (file, value) => writeFileSync(join(root, file), value, "utf8");
const json = (file, value) =>
  write(file, JSON.stringify(value, null, 2) + "\n");
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const facts = `${w.dateLabel}, ${w.timeLabel}. ${w.location}. ${w.totalSeats} seats. ₹${w.price}.`;
const history =
  "Our first workshop in June 2026 was about making websites and hosting them. Each workshop stands alone; no earlier session is required.";
const descriptions = {
  home: "Build a complete AI video ad in 3 hours. Hands-on offline workshop in Salt Lake, Kolkata on 27 Sept 2026. Consistent faces, motion & voiceover. 50 seats.",
  workshop: `Build one finished vertical AI video ad in three hours: face lock, base stills, Veo motion, ElevenLabs voice. 27 September 2026, Salt Lake, Kolkata. ₹${w.price}. No filmmaking background.`,
  book: `Reserve ${w.title}. ${facts} Laptop required. No filmmaking background needed.`,
  path: "Learn AI through one real use-case project at a time. Offline workshops for non-techies in Salt Lake, Kolkata. Each session stands alone.",
  room: "Photos, hosts, and websites from The AI Workshop’s first session in June 2026. An offline learning space for non-techies in Salt Lake, Kolkata.",
  host: "Help non-techies build a practical AI project in person. Host a table with The AI Workshop in Salt Lake, Kolkata.",
  about: `${w.mission} Based in Salt Lake, Kolkata, and hosted by Yogesh, Neeraj, and Subham Kanoi.`,
  kolkata: `Learn AI in Kolkata, one practical project at a time. Next: ${w.title}, 27 September 2026. Salt Lake, offline, ₹${w.price}.`,
  answers:
    "Practical answers about The AI Workshop: September’s AI video ad build, the tools and credits it needs, privacy, venue, ticket, and what to bring.",
  share: `Invite a friend to ${w.title}. ${facts} One finished ad, built in the room, in three hours.`,
};
const titles = {
  home: "AI Video Ad Workshop Kolkata | 27 Sept · Salt Lake",
  workshop: `${w.title} | 27 September, Kolkata`,
  book: `Book Your Seat | ${w.title}, 27 September`,
  path: "How We Learn | One Real AI Project at a Time",
  room: "The Room | Our First AI Workshop, June 2026",
  host: "Host a Table | The AI Workshop, Kolkata",
  about: "About The AI Workshop | Offline AI for Non-Techies",
  kolkata: "Learn AI in Kolkata | Offline Workshop in Salt Lake",
  answers: "Questions and Answers | The AI Workshop",
  share: `Share ${w.title} | The AI Workshop`,
};
const pages = Object.fromEntries(
  Object.keys(titles).map((key) => [
    key,
    {
      path: key === "home" ? "/" : `/${key}`,
      title: titles[key],
      description: descriptions[key],
      ogTitle:
        key === "home"
          ? "AI Video Ad Workshop Kolkata · 27 Sept, Salt Lake"
          : titles[key],
      ogDescription: descriptions[key],
      ogImage: imageFor(key),
    },
  ]),
);
json("src/seo/pages.json", pages);
pack.personas = [
  { id: "founder", label: "D2C founders and local business owners running their own ads" },
  { id: "agency", label: "Agency owners and video creators producing client work" },
  {
    id: "freelancer",
    label: "Freelancers and marketers with no filmmaking background",
  },
];
pack.prompts = w.faqs.map((faq, index) => ({
  id: `workshop-question-${index + 1}`,
  value: faq.q,
  tags: ["workshop", "beginner"],
  cite: "/workshop",
  answer: `The AI Workshop: ${faq.a}`,
}));
json("src/seo/elmo.json", pack);
const question = (faq) => ({
  "@type": "Question",
  name: faq.q,
  acceptedAnswer: { "@type": "Answer", text: faq.a },
});
// One FAQPage per page, never two. The home page answers the local logistics
// questions as well as the workshop ones, so its node carries both sets — and
// both sets are rendered on that page, which is what FAQ structured data
// requires. Other pages carry only the questions they actually show.
const faqSchemaFor = (key) => ({
  "@type": "FAQPage",
  "@id": `${origin}${key === "home" ? "/" : `/${key}`}#faq`,
  mainEntity: (key === "home" ? [...w.localFaqs, ...w.faqs] : w.faqs).map(
    question,
  ),
});
// One address for every entity on the site. A local pack is built on NAP
// agreement, so Organization, LocalBusiness and the Event's Place all read
// this object rather than restating a street.
const address = {
  "@type": "PostalAddress",
  streetAddress: w.venue.streetAddress,
  addressLocality: w.venue.addressLocality,
  addressRegion: w.venue.addressRegion,
  postalCode: w.venue.postalCode,
  addressCountry: w.venue.addressCountry,
};
const geo = {
  "@type": "GeoCoordinates",
  latitude: w.venue.latitude,
  longitude: w.venue.longitude,
};
const organization = {
  "@type": "EducationalOrganization",
  "@id": `${origin}/#organization`,
  name: "The AI Workshop",
  alternateName: ["AI Workshop Kolkata", "AI Workshop Salt Lake"],
  url: origin,
  description: w.mission,
  telephone: w.phoneTel,
  email: w.supportEmail,
  address,
  logo: `${origin}/logo-icon.png`,
};
// EducationEvent rather than a bare Event: it is a subtype, so it still
// satisfies every Event consumer, and it tells Google what kind of event
// this is.
const event = {
  "@type": "EducationEvent",
  "@id": `${origin}/#event`,
  name: w.eventName,
  description: w.eventDescription,
  startDate: w.startDate,
  endDate: w.endDate,
  doorTime: w.doorTime,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: `${origin}/workshop`,
  image: [eventImage, roomImage],
  maximumAttendeeCapacity: w.totalSeats,
  inLanguage: "en-IN",
  isAccessibleForFree: false,
  organizer: {
    "@type": "Organization",
    name: "The AI Workshop",
    url: origin,
    "@id": `${origin}/#organization`,
  },
  performer: { "@type": "Organization", name: "The AI Workshop Core Team" },
  location: {
    "@type": "Place",
    name: w.venue.name,
    address,
    geo,
    hasMap: w.venue.hasMap,
  },
  offers: {
    "@type": "Offer",
    url: `${origin}/book`,
    price: String(w.price),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: w.offerValidFrom,
  },
};
const faqListHtml = (list) =>
  list.map((faq) => `<h3>${esc(faq.q)}</h3><p>${esc(faq.a)}</p>`).join("\n");
const faqHtml = faqListHtml(w.faqs);
// The home page's FAQ node also carries the local questions, so the crawlable
// fallback has to carry their text too — structured data may not answer
// questions the page itself does not.
const localFaqHtml = faqListHtml(w.localFaqs);
const gettingThereHtml = `<h2>Getting to the workshop</h2><p>${esc(w.venue.name)}, ${esc(w.venue.streetAddress)}, ${esc(w.venue.addressLocality)}, ${esc(w.venue.addressRegion)} ${esc(w.venue.postalCode)}. Doors open at 10:30 AM for an 11:00 AM start. <a href="${esc(w.venue.hasMap)}">Open in Google Maps</a>.</p>`;
const outcomesHtml = `<ul>${w.outcomes.map((outcome) => `<li>${esc(outcome)}</li>`).join("")}</ul>`;
const agendaHtml = `<ol>${w.agenda.map((step) => `<li><strong>${esc(step.time)}: ${esc(step.title)}</strong><p>${esc(step.body)}</p></li>`).join("")}</ol>`;
const baseHtml = `<h2>${esc(w.title)}</h2><p>${esc(w.description)}</p><p>${esc(facts)}</p><h2>What you build</h2>${outcomesHtml}<h3>What to bring</h3><p>${esc(w.bringLabel)}</p><h2>Our first workshop</h2><p>${esc(history)}</p><h3>Visit us in Kolkata</h3><p>Salt Lake is also known as <a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar</a>. The exact workshop venue is shared after reservation. Ask about travel or accessibility before booking.</p><p><a href="tel:${esc(w.phoneTel)}">${esc(w.phoneDisplay)}</a> · <a href="mailto:${esc(w.supportEmail)}">${esc(w.supportEmail)}</a></p>`;

for (const [key, page] of Object.entries(pages)) {
  const graphs = [
    organization,
    {
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: origin + page.path,
      dateModified: modified,
    },
  ];
  if (["home", "workshop", "book"].includes(key)) graphs.push(event);
  if (["home", "kolkata"].includes(key))
    graphs.push({
      "@type": "LocalBusiness",
      "@id": `${origin}/#localbusiness`,
      name: "The AI Workshop",
      address,
      geo,
      hasMap: w.venue.hasMap,
      telephone: w.phoneTel,
      email: w.supportEmail,
      url: origin,
      image: eventImage,
      priceRange: "₹₹",
      areaServed: {
        "@type": "City",
        name: "Kolkata",
        containedInPlace: { "@type": "State", name: "West Bengal" },
      },
    });
  if (["home", "workshop", "answers"].includes(key))
    graphs.push(faqSchemaFor(key));
  const structured = JSON.stringify(
    { "@context": "https://schema.org", "@graph": graphs },
    null,
    2,
  ).replace(/</g, "\\u003c");
  const fallback = `<h1>${esc(key === "home" ? "AI Video Ad Workshop in Kolkata" : page.title)}</h1><p>${esc(descriptions[key])}</p>${baseHtml}${["home", "kolkata"].includes(key) ? gettingThereHtml : ""}${key === "workshop" ? `<h2>The three-hour plan</h2>${agendaHtml}` : ""}${key === "home" ? `<h2>Venue, travel and refunds</h2>${localFaqHtml}` : ""}${["home", "workshop", "answers"].includes(key) ? `<h2>Questions and answers</h2>${faqHtml}` : ""}<p><a href="/workshop">Workshop details</a> · <a href="/book">Reserve your seat</a> · <a href="/room">The June workshop</a> · <a href="/about">About</a></p>`;
  write(
    key === "home" ? "index.html" : `${key}.html`,
    `<!DOCTYPE html>
<html lang="en-IN" class="bg-background">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="facebook-domain-verification" content="%VITE_META_DOMAIN_VERIFICATION%" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <link rel="canonical" href="${origin}${page.path}" />
  <meta name="robots" content="${key === "book" ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}" />
  <meta name="theme-color" content="#c8553d" />
  <meta name="geo.region" content="IN-WB" />
  <meta name="geo.placename" content="Salt Lake, Kolkata" />
  <meta name="geo.position" content="${w.venue.latitude};${w.venue.longitude}" />
  <meta name="ICBM" content="${w.venue.latitude}, ${w.venue.longitude}" />
  <meta property="og:site_name" content="The AI Workshop" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:title" content="${esc(page.ogTitle)}" />
  <meta property="og:description" content="${esc(page.ogDescription)}" />
  <meta property="og:url" content="${origin}${page.path}" />
  <meta property="og:image" content="${page.ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="${page.ogImage === eventImage ? "630" : "900"}" />
  <meta property="og:image:alt" content="${esc(page.ogImage === eventImage ? `${w.title} — 27 September 2026, Salt Lake, Kolkata` : "Participants at The AI Workshop’s first session in June 2026")}" />
  <meta property="article:modified_time" content="${modified}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(page.ogTitle)}" />
  <meta name="twitter:description" content="${esc(page.ogDescription)}" />
  <meta name="twitter:image" content="${page.ogImage}" />
  <link rel="alternate" type="application/rss+xml" title="The AI Workshop" href="${origin}/feed.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${structured}</script>
</head>
<body class="font-sans">
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=%VITE_META_PIXEL_ID%&amp;ev=PageView&amp;noscript=1" alt="" /></noscript>
  <main id="geo-fallback" style="max-width:48rem;margin:auto;padding:2rem;font-family:system-ui;line-height:1.6">${fallback}</main>
  <div id="root"></div>
${key === "book" ? '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>' : ""}
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>\n`,
  );
}

json("public/ai/faq.json", {
  name: "The AI Workshop FAQ",
  url: `${origin}/answers`,
  faqs: pack.prompts.map((p) => ({ question: p.value, answer: p.answer })),
});
json("public/ai/summary.json", {
  name: "The AI Workshop",
  description: w.mission,
  url: origin,
  updated: modified,
  offline_only: true,
  location: w.location,
  contact: { email: w.supportEmail, telephone: w.phoneTel },
  next_workshop: {
    title: w.title,
    date: w.dateIso,
    startDate: w.startDate,
    endDate: w.endDate,
    priceINR: w.price,
    seats: w.totalSeats,
    artifact: w.artifact,
  },
});
json("public/ai/service.json", {
  name: "The AI Workshop",
  description: w.mission,
  url: origin,
  capabilities: [
    "Offline, hands-on AI workshops for non-techies",
    "One practical use-case project per session",
    ...w.outcomes,
  ],
  next_workshop: w.title,
  priceINR: w.price,
  updated: modified,
});
const links = Object.entries(pages)
  .filter(([key]) => key !== "book")
  .map(
    ([, page]) =>
      `- [${page.title}](${origin}${page.path}): ${page.description}`,
  )
  .join("\n");
const faqText = w.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");
const brief = `# The AI Workshop\n\n> ${w.mission}\n\nUpdated ${modified}.\n\n## Next workshop\n\n${w.title}\n\n${facts}\n\n${w.description}\n\n## What participants take home\n\n${w.outcomes.map((o) => `- ${o}`).join("\n")}\n\n## First workshop\n\n${history}\n\n## Preparation\n\n${w.bringLabel}\n\n## Pages\n\n${links}\n\n## Optional\n\n- [About in Markdown](${origin}/about.md)\n- [Kolkata in Markdown](${origin}/kolkata.md)\n- [Full public brief](${origin}/llms-full.txt)\n\n## Questions\n\n${faqText}\n`;
write("public/llms.txt", brief);
write(
  "public/llms-full.txt",
  `${brief}\n## Session plan\n\n${w.agenda.map((a) => `### ${a.time}: ${a.title}\n\n${a.body}`).join("\n\n")}\n\n## Contact\n\n${w.phoneDisplay} · ${w.supportEmail}\n\nHosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi.\n\n## Scope\n\nParticipants build one ad for their own product using generated characters, not clones of real people. Image, video, and voice tools run on credits the participant supplies; the ticket does not include them. The session does not buy media, run campaigns, or promise advertising results. Future workshop topics and dates have not been announced.\n`,
);
for (const key of ["about", "kolkata", "answers"])
  write(
    `public/${key}.md`,
    `# ${titles[key]}\n\n${descriptions[key]}\n\n${facts}\n\n${history}\n\n${faqText}\n\n[Workshop details](${origin}/workshop)\n`,
  );
write(
  "public/.well-known/ai.txt",
  `The AI Workshop\n${w.mission}\nPublic brief: ${origin}/llms.txt\nCurrent workshop: ${origin}/workshop\nUpdated: ${modified}\n`,
);
write(
  "public/feed.xml",
  `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The AI Workshop</title><link>${origin}</link><description>${esc(w.mission)}</description><item><title>${esc(w.title)}</title><link>${origin}/workshop</link><guid>${origin}/workshop#${w.slug}</guid><description>${esc(w.description + " " + facts)}</description></item></channel></rss>\n`,
);
write(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.entries(
    pages,
  )
    .filter(([key]) => key !== "book")
    .map(
      ([, page]) =>
        `<url><loc>${origin}${page.path}</loc><lastmod>${modified}</lastmod></url>`,
    )
    .join("")}</urlset>\n`,
);
console.log(
  "Synchronized page shells, search answers, and public discovery files from workshop.json",
);
