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
    if (url === "/book" || url === "/book/") {
      req.url = "/book.html";
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
