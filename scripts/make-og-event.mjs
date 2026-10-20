/**
 * Renders the 25 October event share card to public/assets/.
 *
 * The older make-og.mjs uses resvg on an SVG source; this one uses the
 * headless browser we already have for screenshots, so the card is authored in
 * HTML/CSS with the site's own palette instead of hand-placed SVG text.
 *
 * To run:  npm i --no-save playwright && node scripts/make-og-event.mjs
 * (set CHROMIUM_PATH to a local Chrome/Edge to skip the Playwright browser download)
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "scripts/og-kolkata-oct25.html");
const out = join(root, "public/assets/og-kolkata-oct25.png");

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle" });
await page.screenshot({ path: out });
await browser.close();
console.log("Wrote", out);
