import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BookPage from "./pages/BookPage.tsx";
import { PrivacyPage, TermsPage, RefundPage } from "./pages/LegalPages.tsx";
import { initAnalytics } from "./analytics.ts";

initAnalytics();

// Lightweight path-based routing. Vercel rewrites all paths to index.html
// (see vercel.json), so /book and the legal pages share this bundle.
const path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
const pages: Record<string, ComponentType> = {
  "/book": BookPage,
  "/privacy": PrivacyPage,
  "/terms": TermsPage,
  "/refund": RefundPage,
};
const Page = pages[path] ?? App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
