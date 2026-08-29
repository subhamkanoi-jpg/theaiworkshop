/**
 * Writes crawlable HTML shells so Google and AI crawlers do not receive the
 * homepage <title> (or an empty #root) for /workshop, /path, /room, /host,
 * /kolkata, /about. index.html and book.html stay hand-authored.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = JSON.parse(readFileSync(join(root, "src/seo/pages.json"), "utf8"));
const elmo = JSON.parse(readFileSync(join(root, "src/seo/elmo.json"), "utf8"));
const origin = "https://www.theaiworkshop.in";
const MODIFIED = "2026-08-30";

const FALLBACK_STYLE =
  "max-width:40rem;margin:0 auto;padding:1.5rem;font-family:Georgia,serif;color:#2a211c";

const fallbacks = {
  workshop: `
      <h1>The AI Workshop — The Magic of AI</h1>
      <p>The Magic of AI is Workshop #3 of The AI Workshop, Kolkata's offline AI workshop in Salt Lake. Sunday 27 September 2026, 11:00–14:00 IST, 50 seats, community price ₹799. You talk about your work for a few minutes. You walk out with a week of finished work — a bio, an offer line, seven posts — and a recipe you can run on Tuesday. A free Google account is enough. Default tool: Google Gemini.</p>
      <h2>What you build</h2>
      <p>Not notes. A week of work made from how you actually talk. June's Sunday shipped websites. August shipped subtitled reels. September is the brief underneath both. Zero tech background is fine. Zero follow-through is not. Offline only, in Salt Lake, Kolkata, West Bengal 700064.</p>
      <h3>Bring</h3>
      <ul>
        <li>A phone, a charger, and a free Google account. A laptop if you have one.</li>
        <li>Raw material: a voice note, a messy paragraph, WhatsApp chats — or use ours.</li>
      </ul>
      <h2>How the three hours run</h2>
      <ol>
        <li>The host shows the trick once on the projector.</li>
        <li>You do it at a table of eight, with a captain on the floor.</li>
        <li>You leave with the files on your phone.</li>
      </ol>
      <h3>Place and contact</h3>
      <p>Salt Lake (Bidhannagar), Kolkata. Phone +91 98307 15557. Email theaiworkshop.in@gmail.com. Hosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi. Languages: English, Hindi, Bangla.</p>
      <p>Salt Lake is Bidhannagar, a planned township in the Kolkata metropolitan area — see <a href="https://en.wikipedia.org/wiki/Bidhannagar">Wikipedia on Bidhannagar</a>. Gemini docs: <a href="https://gemini.google.com/">gemini.google.com</a>.</p>
      <ul>
        <li><a href="/kolkata">Learn AI in Kolkata</a></li>
        <li><a href="/about">About The AI Workshop</a></li>
        <li><a href="/book">Reserve a seat</a></li>
      </ul>`,
  path: `
      <h1>The AI Workshop — The Path</h1>
      <p>The Path is how The AI Workshop teaches AI in Kolkata: Talk, Make, Sell, System, Lead. Every Sunday in Salt Lake belongs to one chapter. Enter on any Sunday. Leave with a thing every time. 60+ members as of 30 August 2026. Next chapter in the room: Talk — The Magic of AI, 27 September 2026, 50 seats, ₹799.</p>
      <h2>Five chapters</h2>
      <ol>
        <li>Talk — brief a model so it does useful work.</li>
        <li>Make — a named artifact (website in June, reel in August).</li>
        <li>Sell — turn the artifact into an offer someone can pay for.</li>
        <li>System — a weekday habit. Open it on Tuesday.</li>
        <li>Lead — captain a table, then teach.</li>
      </ol>
      <h3>Not a lock</h3>
      <p>You do not need Workshop #1 or #2 to sit on 27 September. The Path is a map, not a sequence you must buy. Offline in Salt Lake, Kolkata, West Bengal 700064. Phone +91 98307 15557.</p>
      <h2>Who it is for</h2>
      <ul>
        <li>Shop owners who live on WhatsApp.</li>
        <li>Students who want a skill they can charge for, not another certificate.</li>
        <li>Job-seekers who need a portfolio artifact this month.</li>
        <li>Professionals who will keep the job and want evenings back.</li>
      </ul>
      <h3>Sources</h3>
      <p><a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar (Salt Lake)</a>. <a href="/kolkata">Learn AI in Kolkata</a>. <a href="/workshop">This Sunday</a>. <a href="/about">About</a>.</p>`,
  room: `
      <h1>The AI Workshop — The Room</h1>
      <p>The Room is Kolkata's offline AI community in Salt Lake. 60+ people have sat here with laptops open. Meetup #1 on 28 June 2026 shipped live one-page websites. Meetup #2 on 30 August 2026 shipped subtitled reels. Next: The Magic of AI, Sunday 27 September 2026, 50 seats, ₹799.</p>
      <h2>Hosts</h2>
      <p>Yogesh Kanoi, Neeraj Kanoi and Subham Kanoi run the floor. Tables of eight. Alumni captains so 50 people still finish. English, Hindi and Bangla in the air.</p>
      <h3>What has already shipped</h3>
      <ul>
        <li>June 2026 — websites, built in the room, live the same afternoon.</li>
        <li>August 2026 — reels with subtitles, from phone footage.</li>
      </ul>
      <h2>Place</h2>
      <p>Salt Lake (Bidhannagar), Kolkata, West Bengal 700064, India. Phone +91 98307 15557. Email theaiworkshop.in@gmail.com. Exact hall after you reserve. See <a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar on Wikipedia</a>.</p>
      <h3>Not online</h3>
      <p>WhatsApp is the corridor between Sundays, not a substitute for the room. <a href="/kolkata">Learn AI in Kolkata</a>. <a href="/about">About The AI Workshop</a>. <a href="/book">Reserve</a>.</p>`,
  host: `
      <h1>The AI Workshop — Host a table</h1>
      <p>Alumni of The AI Workshop in Kolkata stand on the floor so 50 people still finish. You sat a Sunday. You shipped. Now you captain a table, then teach your use case. Next Sunday: 27 September 2026, The Magic of AI, Salt Lake, ₹799 for participants.</p>
      <h2>Why the room needs captains</h2>
      <p>A projector demo is one voice. A table of eight needs someone who has already done the trick. That is how 50 seats stay a workshop instead of a lecture. 60+ members as of 30 August 2026. Hosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi.</p>
      <h3>What you do</h3>
      <ol>
        <li>Arrive early in Salt Lake.</li>
        <li>Unblock one table when someone stalls.</li>
        <li>Later, teach a Sunday of your own if the room asks.</li>
      </ol>
      <h2>Place</h2>
      <p>Salt Lake, Kolkata, West Bengal 700064. Phone +91 98307 15557. <a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar</a>. <a href="/about">About</a>. <a href="/workshop">This Sunday</a>.</p>`,
  kolkata: `
      <h1>The AI Workshop — learn AI in Kolkata</h1>
      <p>The AI Workshop is an offline, hands-on AI workshop in Salt Lake (Bidhannagar), Kolkata, West Bengal 700064, India. No computer-science degree is required. As of 30 August 2026, 60+ members have sat in the room. Next: The Magic of AI, Sunday 27 September 2026, 11:00–14:00 IST, 50 seats, community price ₹799. A free Google account is enough.</p>
      <h2>Where in Kolkata</h2>
      <p>The room is in Salt Lake. Exact hall is shared after you reserve a seat. Catchment: Sector V, New Town, Howrah, Park Street, Gariahat, Dum Dum. East-West Metro toward Salt Lake, buses through Karunamoyee. Arrive 10:30. Start 11:00. Phone +91 98307 15557. Email theaiworkshop.in@gmail.com. Languages: English, Hindi, Bangla. কলকাতায় AI শিখুন — সল্ট লেকে, রবিবারে, নিজের হাতে।</p>
      <h3>Neighbourhoods</h3>
      <ul>
        <li>Salt Lake / Bidhannagar — the room is here. Sector I–V, Karunamoyee, City Centre.</li>
        <li>New Town / Action Area — about twenty minutes on a Sunday morning.</li>
        <li>Howrah, Park Street, Gariahat, Dum Dum — if you can reach Salt Lake by 11:00, you belong in the room.</li>
      </ul>
      <h2>Who this AI workshop is for</h2>
      <ul>
        <li>Shop owners in Salt Lake, New Town, Gariahat — people who live on WhatsApp.</li>
        <li>Students at JU, Calcutta University, IEM, Techno — a skill they can charge for, not another certificate.</li>
        <li>Job-seekers who need a portfolio artifact this month.</li>
        <li>Professionals who will keep the job and want evenings back.</li>
      </ul>
      <h3>Next Sunday</h3>
      <p>The Magic of AI — talk for a few minutes, walk out with a week of work. Default tool: <a href="https://gemini.google.com/">Google Gemini</a>. This is not an online class with a Kolkata keyword glued on. Salt Lake is Bidhannagar; see <a href="https://en.wikipedia.org/wiki/Bidhannagar">Wikipedia</a>.</p>
      <h2>Sources</h2>
      <p>Workshop #1 shipped websites on 28 June 2026. Workshop #2 shipped reels on 30 August 2026. Machine brief: <a href="https://llmstxt.org/">llms.txt spec</a>.</p>
      <ul>
        <li><a href="/workshop">This Sunday — The Magic of AI</a></li>
        <li><a href="/about">About The AI Workshop</a></li>
        <li><a href="/book">Reserve a seat</a></li>
      </ul>`,
  about: `
      <h1>The AI Workshop</h1>
      <p>The AI Workshop is Kolkata's offline AI workshop in Salt Lake (Bidhannagar), West Bengal 700064, India. Hosts: Yogesh Kanoi, Neeraj Kanoi, Subham Kanoi. You show up on a Sunday, build one real thing, and take it home. 60+ members as of 30 August 2026. Next Sunday: The Magic of AI, 27 September 2026, 50 seats, ₹799.</p>
      <h2>Contact</h2>
      <ul>
        <li>Address: Salt Lake, Kolkata, West Bengal 700064</li>
        <li>Phone: +91 98307 15557</li>
        <li>Email: theaiworkshop.in@gmail.com</li>
        <li>Instagram: @theaiworkshop.in</li>
      </ul>
      <h3>The room</h3>
      <p>Offline only. English, Hindi and Bangla. A free Google account is enough to start. Zero tech background is fine; zero follow-through is not. Workshop #1 on 28 June 2026 (websites). Workshop #2 on 30 August 2026 (reels).</p>
      <h2>Place</h2>
      <p>Salt Lake is Bidhannagar, a planned township in the Kolkata metropolitan area. Read <a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar on Wikipedia</a>. Local page: <a href="/kolkata">Learn AI in Kolkata</a>. <a href="/workshop">This Sunday</a>.</p>`,
  answers: `
      <h1>The AI Workshop — answers Kolkata actually asks</h1>
      <p>The AI Workshop is Kolkata's offline AI workshop in Salt Lake. Legal name: The AI Workshop. Also called AI Workshop Kolkata. These are the questions people type into ChatGPT, Perplexity and Gemini. Next Sunday: 27 September 2026, 50 seats, ₹799.</p>
${elmo.prompts
  .map(
    (p) => `      <h2>${p.value}</h2>
      <p>${p.answer}</p>
      <p><a href="${p.cite}">Read more</a></p>`,
  )
  .join("\n")}
      <h3>Sources</h3>
      <p><a href="https://en.wikipedia.org/wiki/Bidhannagar">Bidhannagar</a>. <a href="/kolkata">Learn AI in Kolkata</a>. <a href="/about">About</a>.</p>`,
};

function shell(page, { robots = "index, follow, max-image-preview:large", jsonLd = null, fallback = "" }) {
  const url = `${origin}${page.path}`;
  const ld = jsonLd
    ? `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 6).replace(/^/gm, "    ")}\n    </script>`
    : "";
  return `<!DOCTYPE html>
<html lang="en-IN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="facebook-domain-verification" content="%VITE_META_DOMAIN_VERIFICATION%" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en-IN" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <link rel="alternate" type="application/rss+xml" title="The AI Workshop" href="${origin}/feed.xml" />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="The AI Workshop" />
    <meta name="theme-color" content="#c8553d" />
    <meta name="geo.region" content="IN-WB" />
    <meta name="geo.placename" content="Kolkata" />
    <meta name="geo.position" content="22.5804;88.4177" />
    <meta name="ICBM" content="22.5804, 88.4177" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:locale:alternate" content="bn_IN" />
    <meta property="og:site_name" content="The AI Workshop" />
    <meta property="og:title" content="${page.ogTitle}" />
    <meta property="og:description" content="${page.ogDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/og-card.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="article:modified_time" content="${MODIFIED}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.ogTitle}" />
    <meta name="twitter:description" content="${page.ogDescription}" />
    <meta name="twitter:image" content="${origin}/og-card.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Nunito:wght@600;700;800;900&family=Caveat:wght@500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap" rel="stylesheet">${ld}
  </head>
  <body>
    <noscript>
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=%VITE_META_PIXEL_ID%&ev=PageView&noscript=1" />
    </noscript>
    <main id="geo-fallback" style="${FALLBACK_STYLE}">${fallback}
    </main>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

const files = {
  workshop: "workshop.html",
  path: "path.html",
  room: "room.html",
  host: "host.html",
  kolkata: "kolkata.html",
  about: "about.html",
  answers: "answers.html",
};

for (const [key, file] of Object.entries(files)) {
  const page = pages[key];
  const jsonLd =
    key === "answers"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: page.title,
          description: page.description,
          url: `${origin}${page.path}`,
          inLanguage: "en-IN",
          dateModified: MODIFIED,
          mainEntity: elmo.prompts.map((p) => ({
            "@type": "Question",
            name: p.value,
            acceptedAnswer: { "@type": "Answer", text: p.answer },
          })),
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.description,
          url: `${origin}${page.path}`,
          inLanguage: "en-IN",
          dateModified: MODIFIED,
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#localbusiness` },
        };
  writeFileSync(join(root, file), shell(page, { jsonLd, fallback: fallbacks[key] }), "utf8");
  console.log("wrote", file);
}

const faqJson = {
  name: "The AI Workshop FAQ",
  url: `${origin}/answers`,
  faqs: elmo.prompts.map((p) => ({
    question: p.value,
    answer: p.answer,
  })),
};
writeFileSync(join(root, "public", "ai", "faq.json"), JSON.stringify(faqJson, null, 2) + "\n", "utf8");
console.log("wrote public/ai/faq.json");
