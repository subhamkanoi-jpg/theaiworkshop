import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";

const svg = readFileSync(new URL("./og-card.svg", import.meta.url), "utf8");
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
});
const png = resvg.render().asPng();
writeFileSync(new URL("../public/og-image.png", import.meta.url), png);
console.log("Wrote public/og-image.png", png.length, "bytes");
