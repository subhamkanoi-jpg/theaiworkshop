import { useEffect } from "react";
import pages from "@/seo/pages.json";
import { LOCAL } from "@/seo/local";

type PageKey = keyof typeof pages;

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector(
    `meta[${attr}="${key}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

const ORIGIN = "https://theaiworkshop.in";
const INDEXABLE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export function usePageSeo(key: PageKey) {
  useEffect(() => {
    const m = pages[key];
    const url = `${ORIGIN}${m.path === "/" ? "/" : m.path}`;
    document.title = m.title;
    upsertMeta("name", "description", m.description);
    upsertMeta("property", "og:title", m.ogTitle);
    upsertMeta("property", "og:description", m.ogDescription);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", m.ogImage);
    upsertMeta("name", "twitter:image", m.ogImage);
    upsertMeta(
      "name",
      "robots",
      key === "book" ? "noindex, follow" : INDEXABLE,
    );
    upsertMeta("name", "twitter:title", m.ogTitle);
    upsertMeta("name", "twitter:description", m.ogDescription);
    // The shells ship these, but a client-side route change swaps the rest of
    // the head — re-asserting them keeps every URL geo-tagged for a crawler
    // that renders JS.
    upsertMeta("name", "geo.region", "IN-WB");
    upsertMeta("name", "geo.placename", "Salt Lake, Kolkata");
    upsertMeta("name", "geo.position", `${LOCAL.lat};${LOCAL.lng}`);
    upsertMeta("name", "ICBM", `${LOCAL.lat}, ${LOCAL.lng}`);
    upsertLink("canonical", url);
  }, [key]);
}
