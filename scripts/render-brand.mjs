import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ deviceScaleFactor: 2 });

await page.setViewportSize({ width: 1200, height: 630 });
await page.goto("file://" + join(root, "scripts/share-card.html"), { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: join(root, "public/og-share.jpg"), type: "jpeg", quality: 88 });

const svg = readFileSync(join(root, "public/favicon.svg"), "utf8").replace(
  "<svg ",
  '<svg width="512" height="512" '
);
await page.setViewportSize({ width: 512, height: 512 });
await page.setContent(
  `<!DOCTYPE html><html><body style="margin:0;background:#f4eee4">${svg}</body></html>`
);
const png = await page.screenshot({ type: "png", omitBackground: false });
writeFileSync(join(root, "public/logo-icon.png"), png);
await page.setViewportSize({ width: 180, height: 180 });
const apple = await page.screenshot({ type: "png" });
writeFileSync(join(root, "public/apple-touch-icon.png"), apple);

await browser.close();
console.log("wrote og-share.jpg, logo-icon.png, apple-touch-icon.png");
