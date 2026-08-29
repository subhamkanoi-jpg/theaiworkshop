import { useEffect } from "react";
import pages from "@/seo/pages.json";

type PageKey = keyof typeof pages;

function upsertMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageSeo(key: PageKey) {
  useEffect(() => {
    const m = pages[key];
    const url = `https://www.theaiworkshop.in${m.path === "/" ? "/" : m.path}`;
    document.title = m.title;
    upsertMeta("name", "description", m.description);
    upsertMeta("property", "og:title", m.ogTitle);
    upsertMeta("property", "og:description", m.ogDescription);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", m.ogTitle);
    upsertMeta("name", "twitter:description", m.ogDescription);
    upsertLink("canonical", url);
  }, [key]);
}
