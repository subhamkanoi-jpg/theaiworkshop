/**
 * Seeds v-serpbear (https://github.com/djav1985/v-serpbear) with Kolkata
 * keywords. Map-pack matching uses businessName "The AI Workshop".
 *
 *   set SERPBEAR_URL=http://localhost:3030
 *   set SERPBEAR_APIKEY=...
 *   node seo/seed-keywords.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const pack = JSON.parse(readFileSync(join(root, "keywords.json"), "utf8"));
const base = (process.env.SERPBEAR_URL || "http://localhost:3030").replace(/\/$/, "");
const key = process.env.SERPBEAR_APIKEY || process.env.APIKEY;

if (!key) {
  console.error("Set SERPBEAR_APIKEY (same value as APIKEY in seo/.env)");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function api(method, path, body) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

const keywords = [];
for (const row of pack.keywords) {
  for (const device of pack.devices) {
    keywords.push({
      keyword: row.keyword,
      device,
      country: pack.country,
      domain: "theaiworkshop.in",
      tags: `${row.tags.join(",")},${device}`,
      city: pack.city,
    });
  }
}

console.log(`Seeding ${keywords.length} rows (${pack.keywords.length} queries × ${pack.devices.length} devices) @ ${base}`);

try {
  await api("POST", "/api/domains", { domains: [pack.domain] });
  console.log("Domain added (or already present).");
} catch (err) {
  console.warn("Domain POST skipped:", err.message);
}

const created = await api("POST", "/api/keywords", { keywords });
const count = created?.keywords?.length ?? keywords.length;
console.log(`Keywords posted: ${count}`);
console.log("In the domain Scraper tab set Business Name to:", pack.businessName);
console.log("City: Kolkata · Country: IN · prefer a Map Pack scraper (ValueSerp / SerpAPI / SearchAPI / HasData).");
