# Kolkata SEO + SerpBear

Two jobs. Do not mix them up.

1. **Rank** — on-page + local signals on theaiworkshop.in (this repo’s site).
2. **Measure** — [v-serpbear](https://github.com/djav1985/v-serpbear) watches those queries from **Kolkata**, including the **Google Map Pack**.

v-serpbear does not make you rank. It tells you whether you are.

## Rank (already in the site)

| Asset | Query it is built for |
|---|---|
| Homepage title + H1 | `AI workshop Kolkata` |
| `/kolkata` | `learn AI Kolkata`, `AI classes Kolkata`, `AI course Salt Lake` |
| `/workshop` | this Sunday + `AI workshop Salt Lake` |
| LocalBusiness schema + NAP in the footer | Map Pack / GBP alignment |
| Unique HTML shells per route | Google no longer sees one title for every URL |

Google Search Console: add `https://www.theaiworkshop.in/`, submit `sitemap.xml`, request index on `/` and `/kolkata`.

**Google Business Profile (you, in the browser — cannot be done from git):**

- Name: **The AI Workshop** (must match schema + SerpBear business name)
- Category: Educational consultant / Computer training school
- Location: Salt Lake, Kolkata, West Bengal
- Service area: Kolkata
- Website: https://www.theaiworkshop.in/kolkata
- Phone: +91 98307 15557
- Photos: meetup1 images from `/public/meetup1/`
- Posts: every Sunday workshop

Citations (same NAP everywhere): Justdial, Sulekha, IndiaMART, Facebook page, Instagram bio.

## Measure (v-serpbear)

```bash
cp seo/.env.example seo/.env
# set PASSWORD, SECRET, APIKEY
docker compose -f seo/docker-compose.yml --env-file seo/.env up -d
```

Open http://localhost:3030

1. Add domain `https://www.theaiworkshop.in`
2. Scraper tab: city **Kolkata**, country **IN**, business name **The AI Workshop**
3. Pick a scraper that returns Map Pack (ValueSerp, SerpAPI, SearchAPI, HasData, Serply, SpaceSerp)
4. Seed:

```bash
# PowerShell
$env:SERPBEAR_URL="http://localhost:3030"
$env:SERPBEAR_APIKEY="<APIKEY from seo/.env>"
node seo/seed-keywords.mjs
```

Watch `AI workshop Kolkata` on **mobile** first. That is 99% of the city.

Image: `vontainment/v-serpbear:latest` — the maintained fork of SerpBear with Map Pack badges.

## Generative Engine Optimization

Not Google Maps. [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) scores whether ChatGPT, Perplexity, Gemini and AI Overviews can **cite** this site.

On-site files:

- `public/robots.txt` — explicit Allow for OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Applebot
- `public/llms.txt` + `public/llms-full.txt`
- `public/.well-known/ai.txt`
- `public/ai/summary.json`, `faq.json`, `service.json`
- `public/feed.xml`
- `/about` entity page

Config: `.geo-optimizer.yml`. CI: `.github/workflows/geo.yml` (Monday 06:00 UTC + manual). Target **70**. Local score of the built `dist/` against geo-optimizer-skill 4.16.4: **95 / excellent** (robots 18, llms 16, schema 16, meta 14, content 12, signals 6, AI discovery 6, brand 7). Two points sit in `llms.txt` word count ≥ 5,000 — we keep that in `llms-full.txt` per llmstxt.org. Three brand points need Wikipedia / Wikidata / LinkedIn / Crunchbase — we do not invent those.

```bash
pip install geo-optimizer-skill
geo audit --url https://www.theaiworkshop.in
```

That score is citeability, not a promise ChatGPT will mention us. After deploy: confirm `https://www.theaiworkshop.in/llms.txt`, `/.well-known/ai.txt`, `/ai/summary.json` return 200 (not the SPA HTML). Then run the audit. Google Search Console: submit sitemap, request index on `/` and `/kolkata`.

## Mentions (Elmo)

Not on-page scoring. [Elmo](https://github.com/elmohq/elmo) asks ChatGPT, Perplexity, Gemini and AI Overviews the questions a Kolkata person would type, then records whether they **mention** The AI Workshop and **cite** theaiworkshop.in.

Three layers, do not mix them:

| Layer | Tool | Question it answers |
|---|---|---|
| Rank | v-serpbear | Are we on Google / Map Pack in Kolkata? |
| Citeable | geo-optimizer-skill | *Can* an engine parse and quote this site? |
| Mentioned | Elmo | *Does* the engine actually name us? |

Do not clone Elmo into this repo. Seed from `src/seo/elmo.json` (aliases, competitors, prompts). The site page that those prompts are written against is `/answers`.

```bash
npm install -g @elmohq/cli
elmo init
# add at least one provider key (OPENAI_API_KEY, ANTHROPIC_API_KEY, OPENROUTER_API_KEY, or a scraper)
# add ADMIN_API_KEYS=a-long-random-token
elmo compose up -d
# open http://localhost:1515 — create the first account

$env:ELMO_URL="http://localhost:1515"
$env:ELMO_API_KEY="<one ADMIN_API_KEYS value>"
node seo/seed-elmo.mjs
```

Watch unbranded prompts first: “Where can I learn AI in Kolkata without a computer science degree?” Branded prompts (“What is The AI Workshop?”) are easier and less useful.

Elmo needs API spend. `RUNS_PER_PROMPT` defaults to 5 samples × every engine. Start with one cheap API (OpenRouter or OpenAI) before adding scrapers for the consumer ChatGPT / Google AI Mode surfaces.
