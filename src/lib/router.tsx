import { useEffect, useState, type ComponentType } from "react";
import App from "@/App";
import BookPage from "@/pages/BookPage";
import WorkshopPage from "@/pages/WorkshopPage";
import PathPage from "@/pages/PathPage";
import RoomPage from "@/pages/RoomPage";
import HostPage from "@/pages/HostPage";
import { PrivacyPage, TermsPage, RefundPage } from "@/pages/LegalPages";
import KolkataPage from "@/pages/KolkataPage";
import AboutPage from "@/pages/AboutPage";
import AnswersPage from "@/pages/AnswersPage";

function normalizePath(pathname: string) {
  const p = pathname.replace(/\/+$/, "").toLowerCase();
  return p === "" ? "/" : p;
}

const pages: Record<string, ComponentType> = {
  "/": App,
  "/book": BookPage,
  "/workshop": WorkshopPage,
  "/path": PathPage,
  "/room": RoomPage,
  "/host": HostPage,
  "/privacy": PrivacyPage,
  "/terms": TermsPage,
  "/refund": RefundPage,
  "/kolkata": KolkataPage,
  "/about": AboutPage,
  "/answers": AnswersPage,
};

type NavDir = "fwd" | "back";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

function applyPath(next: string, dir: NavDir, setPath: (p: string) => void) {
  const run = () => {
    setPath(next);
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event("site:navigate"));
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as ViewTransitionDoc;
  if (!reduce && typeof doc.startViewTransition === "function") {
    document.documentElement.dataset.nav = dir;
    const t = doc.startViewTransition(run);
    void t.finished.finally(() => {
      delete document.documentElement.dataset.nav;
    });
    return;
  }
  run();
}

export function Router() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => applyPath(normalizePath(location.pathname), "back", setPath);
    window.addEventListener("popstate", onPop);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }
      let url: URL;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;

      if (url.pathname === location.pathname && url.search === location.search) {
        if (url.hash) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      e.preventDefault();
      history.pushState({}, "", url.pathname + url.search + url.hash);
      applyPath(normalizePath(url.pathname), "fwd", setPath);
    };

    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const Page = pages[path] ?? App;
  return <Page />;
}
