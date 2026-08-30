import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Connect } from "vite";

function localKit(raw: string) {
  const text = raw.replace(/\s+/g, " ").trim();
  const bits = text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 8);
  const first = bits[0] || text;
  const words = text.split(" ").filter(Boolean);
  let offer = words.slice(0, Math.min(11, words.length)).join(" ");
  if (offer) offer = offer.charAt(0).toUpperCase() + offer.slice(1);
  if (offer && !/[.!?]$/.test(offer)) offer += ".";
  const clip = (s: string, n: number) => {
    const t = s.trim();
    if (t.length <= n) return t;
    const cut = t.slice(0, n - 1);
    const at = cut.lastIndexOf(" ");
    return (at > 40 ? cut.slice(0, at) : cut).replace(/[,:;.-]+$/, "") + ".";
  };
  const bio = clip(/i\b/i.test(first) ? first : `I work on this: ${first}`, 160);
  const hook = offer.replace(/[.!?]$/, "");
  return {
    offer: clip(offer, 78),
    bio,
    posts: [
      clip(`${hook}. Done in my own words, on my phone.`, 140),
      clip(`This week I actually finished it. ${first}`, 140),
      clip(`Salt Lake Sunday. I talked for a minute. This came out: ${hook}.`, 140),
    ],
  };
}

function gaspApi() {
  const handle: Connect.NextHandleFunction = (req, res, next) => {
    const url = req.url?.split("?")[0] || "";
    if (req.method !== "POST" || url !== "/api/gasp") {
      next();
      return;
    }
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c as Buffer));
    req.on("end", () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
        const text = String(body.text || "").slice(0, 600);
        if (text.trim().length < 8) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "short" }));
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(localKit(text)));
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "bad" }));
      }
    });
  };
  return {
    name: "gasp-api",
    configureServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(handle);
    },
  };
}

function spaFallback() {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const url = req.url?.split("?")[0] || "";
    if (
      url.startsWith("/api") ||
      url.startsWith("/@") ||
      url.startsWith("/src") ||
      url.startsWith("/node_modules") ||
      /\.[a-zA-Z0-9]+$/.test(url)
    ) {
      next();
      return;
    }
    const htmlPages: Record<string, string> = {
      "/book": "/book.html",
      "/workshop": "/workshop.html",
      "/path": "/path.html",
      "/room": "/room.html",
      "/host": "/host.html",
      "/kolkata": "/kolkata.html",
      "/about": "/about.html",
      "/answers": "/answers.html",
      "/share": "/share.html",
    };
    const mapped = htmlPages[url.replace(/\/$/, "") || "/"];
    if (mapped) {
      req.url = mapped;
    } else if (url !== "/" && url !== "/index.html") {
      req.url = "/index.html";
    }
    next();
  };
  return {
    name: "spa-fallback",
    configureServer(server: { middlewares: Connect.Server }) {
      return () => {
        server.middlewares.use(rewrite);
      };
    },
    configurePreviewServer(server: { middlewares: Connect.Server }) {
      return () => {
        server.middlewares.use(rewrite);
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), gaspApi(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        book: path.resolve(__dirname, "book.html"),
        workshop: path.resolve(__dirname, "workshop.html"),
        path: path.resolve(__dirname, "path.html"),
        room: path.resolve(__dirname, "room.html"),
        host: path.resolve(__dirname, "host.html"),
        kolkata: path.resolve(__dirname, "kolkata.html"),
        about: path.resolve(__dirname, "about.html"),
        answers: path.resolve(__dirname, "answers.html"),
        share: path.resolve(__dirname, "share.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      "/api": `http://localhost:${process.env.VITE_BACKEND_PORT || 3101}`,
    },
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.venv/**",
        "**/.git/**",
        "**/dist/**",
        "**/__pycache__/**",
      ],
    },
  },
});
