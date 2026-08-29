import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "@/lib/router";
import { initAnalytics } from "./analytics.ts";

initAnalytics();

document.getElementById("geo-fallback")?.remove();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
