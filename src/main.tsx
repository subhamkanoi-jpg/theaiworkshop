import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BookPage from "./pages/BookPage.tsx";
import { initAnalytics } from "./analytics.ts";
import { inject } from "@vercel/analytics";

initAnalytics();
inject();

// Lightweight path-based routing. Vercel rewrites all paths to index.html
// (see vercel.json), so /book is served by this single bundle.
const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
const Page = path === "/book" ? BookPage : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
