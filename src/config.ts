// ──────────────────────────────────────────────────────────────────────────
// Shared, editable workshop config. Update prices / dates here — these values
// are used across the home page (App.tsx) and the booking page (BookPage.tsx).
// NOTE: prices & dates are also hard-coded in index.html (SEO structured data
// and the OG image) — keep those in sync when you change anything here.
// ──────────────────────────────────────────────────────────────────────────
export const WORKSHOP_AMOUNT = 59900; // amount in paise (₹599)
export const PRICE = 599; // early-bird price (₹)
export const MARKET_VALUE = 1599; // workshop's regular list price (early-bird is ₹599)
export const TOTAL_SEATS = 25; // we cap each batch here so everyone gets real attention
export const WORKSHOP_DATE_LABEL = "Sunday, 26 July 2026";
export const WORKSHOP_TIME_LABEL = "11:00 AM – 1:00 PM";
export const WORKSHOP_DURATION_LABEL = "2 hours";

export const SAVINGS = MARKET_VALUE - PRICE;
export const SAVINGS_PCT = Math.round((SAVINGS / MARKET_VALUE) * 100);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const WHATSAPP_URL = "https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG";
export const HOST_WHATSAPP_URL = "https://chat.whatsapp.com/EeAC3WtfJdGIDIt1AeWyLK";
export const PHONE_TEL = "+919830715557";
export const PHONE_DISPLAY = "+91 98307 15557";
export const SUPPORT_EMAIL = "theaiworkshop.in@gmail.com";

export const valueStack = [
  { item: "2-hour live, hands-on workshop", value: "₹5,000" },
  { item: "Your raw footage → a finished, subtitled reel", value: "₹3,000+" },
  { item: "The complete Claude editing workflow — yours to keep", value: "₹5,000" },
  { item: "No editing software — Claude + free open-source tools", value: "Included" },
  { item: "Prompt kit & cheat sheets", value: "₹500" },
  { item: "Lifetime WhatsApp support community", value: "Priceless" },
  { item: "Certificate of completion", value: "✓" },
];
