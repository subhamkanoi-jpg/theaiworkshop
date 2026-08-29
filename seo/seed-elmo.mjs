/**
 * Seeds [Elmo](https://github.com/elmohq/elmo) with The AI Workshop brand,
 * aliases, competitors and tracking prompts. Does not clone Elmo.
 *
 *   npm install -g @elmohq/cli
 *   elmo init
 *   elmo compose up -d
 *   set ELMO_URL=http://localhost:1515
 *   set ELMO_API_KEY=<one of ADMIN_API_KEYS>
 *   node seo/seed-elmo.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pack = JSON.parse(readFileSync(join(root, "src/seo/elmo.json"), "utf8"));
const base = (process.env.ELMO_URL || "http://localhost:1515").replace(/\/$/, "");
const key = process.env.ELMO_API_KEY || process.env.ADMIN_API_KEY;

if (!key) {
  console.error("Set ELMO_API_KEY to a key from ADMIN_API_KEYS in your Elmo .env");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function api(method, path, body) {
  const res = await fetch(`${base}/api/v1${path}`, {
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
    const err = new Error(`${method} ${path} → ${res.status} ${JSON.stringify(json)}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

const payload = {
  id: pack.brand.id,
  name: pack.brand.name,
  domains: pack.brand.domains,
  aliases: pack.brand.aliases,
  competitors: pack.competitors,
  prompts: pack.prompts.map((p) => ({
    value: p.value,
    tags: p.tags,
    enabled: true,
  })),
};

console.log(`Seeding Elmo @ ${base} brand=${pack.brand.id} prompts=${payload.prompts.length}`);

try {
  const created = await api("POST", "/brands", payload);
  console.log("Brand created:", created.id || pack.brand.id);
} catch (err) {
  if (err.status !== 409) throw err;
  console.log("Brand exists — syncing aliases, then posting any missing prompts.");
  await api("PATCH", `/brands/${pack.brand.id}`, {
    brandName: pack.brand.name,
    domains: pack.brand.domains,
    aliases: pack.brand.aliases,
    enabled: true,
  });
  const listed = await api("GET", `/prompts?brandId=${encodeURIComponent(pack.brand.id)}&limit=100`);
  const have = new Set((listed.prompts || []).map((p) => String(p.value).trim().toLowerCase()));
  for (const p of payload.prompts) {
    if (have.has(p.value.trim().toLowerCase())) continue;
    await api("POST", "/prompts", { brandId: pack.brand.id, value: p.value, tags: p.tags });
    console.log("prompt +", p.value);
  }
  for (const c of pack.competitors) {
    try {
      await api("POST", "/competitors", {
        brandId: pack.brand.id,
        name: c.name,
        domains: c.domains,
        aliases: c.aliases,
      });
      console.log("competitor +", c.name);
    } catch (ce) {
      if (ce.status !== 409) console.warn("competitor skip", c.name, ce.message);
    }
  }
}

console.log("Open", `${base}`, "— visibility is mention rate on these prompts, not Google rank.");
console.log("Need at least one provider key (OpenAI / Anthropic / OpenRouter or a scraper) or the worker has nothing to call.");
