import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

// Regenerate the social/OG cards. To run:
//   bun add -d @resvg/resvg-js && bun scripts/make-og.mjs && bun remove @resvg/resvg-js
const cards = [
  { svg: "./og-card.svg", out: "../public/og-image.png" }, // home / default
  { svg: "./og-book.svg", out: "../public/og-book.png" },  // /book page
];

for (const { svg, out } of cards) {
  const source = readFileSync(new URL(svg, import.meta.url), "utf8");
  const resvg = new Resvg(source, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();
  writeFileSync(new URL(out, import.meta.url), png);
  console.log("Wrote", out, png.length, "bytes");
}
