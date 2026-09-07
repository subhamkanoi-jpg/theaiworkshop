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
const origin = "https://www.theaiworkshop.in";
const modified = "2026-09-07";
const image = `${origin}/meetup1/group-selfie.jpg`;
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
  home: `${w.mission} Next: ${w.title}, 27 September 2026. Offline in Salt Lake, Kolkata. ₹${w.price}.`,
  workshop: `Build an AI assistant for meeting recaps, action lists, and follow-up drafts. 27 September 2026, Salt Lake, Kolkata. 3 hours, ₹${w.price}. No coding.`,
  book: `Reserve ${w.title}. ${facts} Laptop recommended. Beginners welcome.`,
  path: "Learn AI through one real use-case project at a time. Offline workshops for non-techies in Salt Lake, Kolkata. Each session stands alone.",
  room: "Photos, hosts, and websites from The AI Workshop’s first session in June 2026. An offline learning space for non-techies in Salt Lake, Kolkata.",
  host: "Help non-techies build a practical AI project in person. Host a table with The AI Workshop in Salt Lake, Kolkata.",
  about: `${w.mission} Based in Salt Lake, Kolkata, and hosted by Yogesh, Neeraj, and Subham Kanoi.`,
  kolkata: `Learn AI in Kolkata, one practical project at a time. Next: ${w.title}, 27 September 2026. Salt Lake, offline, ₹${w.price}.`,
  answers:
    "Practical answers about The AI Workshop: September’s project, tools, privacy, venue, ticket, and what beginners need to bring.",
  share: `Invite a friend to ${w.title}. ${facts} One practical offline project for non-techies.`,
};
const titles = {
  home: "The AI Workshop | Practical AI for Non-Techies, Kolkata",
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
          ? "The AI Workshop · One real project at a time"
          : titles[key],
      ogDescription: descriptions[key],
      ogImage: image,
    },
  ]),
);
json("src/seo/pages.json", pages);
pack.personas = [
  { id: "pro", label: "Non-technical professionals and managers" },
  { id: "business", label: "Business owners handling customers and suppliers" },
  {
    id: "consultant",
    label: "Consultants and freelancers working with clients",
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
const faqSchema = {
  "@type": "FAQPage",
  mainEntity: w.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};
const address = {
  "@type": "PostalAddress",
  addressLocality: "Kolkata",
  addressRegion: "West Bengal",
  addressCountry: "IN",
  streetAddress: "Salt Lake",
  postalCode: "700064",
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
const event = {
  "@type": "EducationEvent",
  "@id": `${origin}/workshop#event`,
  name: w.title,
  description: w.description,
  startDate: w.startDate,
  endDate: w.endDate,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: `${origin}/workshop`,
  image,
  maximumAttendeeCapacity: w.totalSeats,
  organizer: { "@id": `${origin}/#organization` },
  location: {
    "@type": "Place",
    name: "Salt Lake, Kolkata — exact venue shared after reservation",
    address,
  },
  offers: {
    "@type": "Offer",
    price: String(w.price),
    priceCurrency: "INR",
    url: `${origin}/book`,
  },
};
const faqHtml = w.faqs
  .map((faq) => `<h3>${esc(faq.q)}</h3><p>${esc(faq.a)}</p>`)
  .join("\n");
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
  if (key === "home")
    graphs.push({
      "@type": "LocalBusiness",
      "@id": `${origin}/#localbusiness`,
      name: "The AI Workshop",
      address,
      telephone: w.phoneTel,
      url: origin,
    });
  if (["home", "workshop", "answers"].includes(key)) graphs.push(faqSchema);
  const structured = JSON.stringify(
    { "@context": "https://schema.org", "@graph": graphs },
    null,
    2,
  ).replace(/</g, "\\u003c");
  const fallback = `<h1>${esc(key === "home" ? "The AI Workshop | AI for Non-Techies" : page.title)}</h1><p>${esc(descriptions[key])}</p>${baseHtml}${key === "workshop" ? `<h2>The three-hour plan</h2>${agendaHtml}` : ""}${["home", "workshop", "answers"].includes(key) ? `<h2>Questions and answers</h2>${faqHtml}` : ""}<p><a href="/workshop">Workshop details</a> · <a href="/book">Reserve your seat</a> · <a href="/room">The June workshop</a> · <a href="/about">About</a></p>`;
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
  <meta name="robots" content="${key === "book" ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
  <meta name="theme-color" content="#c8553d" />
  <meta property="og:site_name" content="The AI Workshop" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:title" content="${esc(page.ogTitle)}" />
  <meta property="og:description" content="${esc(page.ogDescription)}" />
  <meta property="og:url" content="${origin}${page.path}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="900" />
  <meta property="og:image:alt" content="Participants at The AI Workshop’s first session in June 2026" />
  <meta property="article:modified_time" content="${modified}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(page.ogTitle)}" />
  <meta name="twitter:description" content="${esc(page.ogDescription)}" />
  <meta name="twitter:image" content="${image}" />
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
  `${brief}\n## Session plan\n\n${w.agenda.map((a) => `### ${a.time}: ${a.title}\n\n${a.body}`).join("\n\n")}\n\n## Contact\n\n${w.phoneDisplay} · ${w.supportEmail}\n\nHosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi.\n\n## Scope\n\nThe assistant drafts from participant-supplied notes. It does not send messages, record calls, connect an inbox, or operate in the background. Future workshop topics and dates have not been announced.\n`,
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
