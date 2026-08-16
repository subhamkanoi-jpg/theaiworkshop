// Shared workshop config. Values come from workshop.json at the repo root —
// keep that file in sync with index.html / book.html structured data.
import workshop from "../workshop.json";

export const WORKSHOP_AMOUNT = workshop.amountPaise;
export const PRICE = workshop.price;
export const MARKET_VALUE = workshop.marketValue;
export const TOTAL_SEATS = workshop.totalSeats;
export const WORKSHOP_DATE_LABEL = workshop.dateLabel;
export const WORKSHOP_TIME_LABEL = workshop.timeLabel;
export const WORKSHOP_DURATION_LABEL = workshop.durationLabel;

export const SAVINGS = MARKET_VALUE - PRICE;
export const SAVINGS_PCT = Math.round((SAVINGS / MARKET_VALUE) * 100);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const WHATSAPP_URL = workshop.whatsappWorkshop;
export const HOST_WHATSAPP_URL = workshop.whatsappHost;
export const PHONE_TEL = workshop.phoneTel;
export const PHONE_DISPLAY = workshop.phoneDisplay;
export const SUPPORT_EMAIL = workshop.supportEmail;

export const valueStack = [
  { item: "2-hour live, hands-on workshop", value: "₹5,000" },
  { item: "Your raw footage → a finished, subtitled reel", value: "₹3,000+" },
  { item: "The complete Claude editing workflow — yours to keep", value: "₹5,000" },
  { item: "No editing software — Claude + free open-source tools", value: "Included" },
  { item: "Prompt kit & cheat sheets", value: "₹500" },
  { item: "Lifetime WhatsApp support community", value: "Priceless" },
  { item: "Certificate of completion", value: "✓" },
];
