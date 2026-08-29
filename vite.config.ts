import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Connect } from "vite";

function spaFallback() {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const url = req.url?.split("?")[0] || "";
    if (url.startsWith("/api") || /\.[a-zA-Z0-9]+$/.test(url)) {
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
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server: { middlewares: Connect.Server }) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
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
      },
    },
  },
  server: {
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
