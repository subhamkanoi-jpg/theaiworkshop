// ──────────────────────────────────────────────────────────────────────────
// Ad / analytics tracking — Meta Pixel + Google Analytics 4 + Google Ads.
//
// This file is INERT until you provide IDs. To turn tracking on, set these in
// Vercel → Project → Settings → Environment Variables (and .env for local dev):
//
//   VITE_META_PIXEL_ID            e.g. 1234567890        (Meta Events Manager)
//   VITE_GA_ID                    e.g. G-XXXXXXXXXX      (Google Analytics 4)
//   VITE_GOOGLE_ADS_ID            e.g. AW-1234567890     (Google Ads)
//   VITE_GOOGLE_ADS_PURCHASE_LABEL  the conversion "label" from Google Ads
//
// Leave any of them unset and that platform is simply skipped — no errors.
// ──────────────────────────────────────────────────────────────────────────

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
const GOOGLE_ADS_PURCHASE_LABEL = import.meta.env.VITE_GOOGLE_ADS_PURCHASE_LABEL as string | undefined;

/* eslint-disable @typescript-eslint/no-explicit-any */
const w = () => window as any;

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Call once, as early as possible (from main.tsx). Loads whatever is configured. */
export function initAnalytics() {
  // Meta Pixel
  if (META_PIXEL_ID) {
    /* Standard Meta Pixel bootstrap, condensed. */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function (...args: any[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(w(), document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    w().fbq("init", META_PIXEL_ID);
    w().fbq("track", "PageView");
  }

  // Google (GA4 and/or Google Ads share the same gtag.js)
  const gtagId = GA_ID || GOOGLE_ADS_ID;
  if (gtagId) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gtagId}`);
    w().dataLayer = w().dataLayer || [];
    w().gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w().dataLayer.push(arguments);
    };
    w().gtag("js", new Date());
    if (GA_ID) w().gtag("config", GA_ID);
    if (GOOGLE_ADS_ID) w().gtag("config", GOOGLE_ADS_ID);
  }
}

/** Fire when the user starts the payment flow (form submitted). */
export function trackBeginCheckout(value: number, email?: string, phone?: string, name?: string) {
  if (META_PIXEL_ID) {
    if (email || phone || name) {
      const matchingData: any = {};
      if (email) matchingData.em = email.trim().toLowerCase();
      if (phone) matchingData.ph = phone.trim().replace(/\D/g, "");
      if (name) {
        const parts = name.trim().split(/\s+/);
        matchingData.fn = parts[0]?.toLowerCase();
        if (parts.length > 1) {
          matchingData.ln = parts.slice(1).join(" ").toLowerCase();
        }
      }
      w().fbq("init", META_PIXEL_ID, matchingData);
    }
    w().fbq?.("track", "InitiateCheckout", { value, currency: "INR" });
  }
  if (GA_ID) w().gtag?.("event", "begin_checkout", { value, currency: "INR" });
}

/** Fire on confirmed, paid registration — this is the ad conversion. */
export function trackPurchase(value: number, email?: string, phone?: string, name?: string) {
  if (META_PIXEL_ID) {
    if (email || phone || name) {
      const matchingData: any = {};
      if (email) matchingData.em = email.trim().toLowerCase();
      if (phone) matchingData.ph = phone.trim().replace(/\D/g, "");
      if (name) {
        const parts = name.trim().split(/\s+/);
        matchingData.fn = parts[0]?.toLowerCase();
        if (parts.length > 1) {
          matchingData.ln = parts.slice(1).join(" ").toLowerCase();
        }
      }
      w().fbq("init", META_PIXEL_ID, matchingData);
    }
    w().fbq?.("track", "Purchase", { value, currency: "INR" });
    w().fbq?.("track", "CompleteRegistration", { value, currency: "INR" });
  }
  if (GA_ID) w().gtag?.("event", "purchase", { value, currency: "INR" });
  if (GOOGLE_ADS_ID && GOOGLE_ADS_PURCHASE_LABEL) {
    w().gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`,
      value,
      currency: "INR",
    });
  }
}

/** Fire when a user views a page or key section. */
export function trackViewContent(contentName: string, category: string, value?: number) {
  if (META_PIXEL_ID) {
    w().fbq?.("track", "ViewContent", {
      content_name: contentName,
      content_category: category,
      value: value,
      currency: value ? "INR" : undefined,
    });
  }
  if (GA_ID) {
    w().gtag?.("event", "view_item", {
      items: [{
        item_name: contentName,
        item_category: category,
        price: value,
      }],
      value: value,
      currency: value ? "INR" : undefined,
    });
  }
}

/** Fire when a user clicks a contact link (WhatsApp, Phone, Email). */
export function trackContact(method: "whatsapp" | "phone" | "email") {
  if (META_PIXEL_ID) {
    w().fbq?.("track", "Contact", { method });
  }
  if (GA_ID) {
    w().gtag?.("event", "contact", { method });
  }
}
