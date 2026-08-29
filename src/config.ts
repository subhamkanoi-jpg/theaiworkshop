// Shared workshop config. Values come from workshop.json at the repo root —
// keep that file in sync with index.html / book.html structured data.
import workshop from "../workshop.json";

export const WORKSHOP_AMOUNT = workshop.amountPaise;
export const PRICE = workshop.price;
export const MARKET_VALUE = workshop.marketValue;
export const TOTAL_SEATS = workshop.totalSeats;
export const WORKSHOP_DATE_LABEL = workshop.dateLabel;
export const WORKSHOP_DATE_ISO = workshop.dateIso;
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const WORKSHOP_DATE_SHORT = (() => {
  const parts = workshop.dateIso.split("-").map(Number);
  const month = parts[1];
  const day = parts[2];
  if (!month || !day) return workshop.dateLabel;
  return `${day} ${MONTHS_SHORT[month - 1]}`;
})();
export const WORKSHOP_TIME_LABEL = workshop.timeLabel;
export const WORKSHOP_DURATION_LABEL = workshop.durationLabel;
export const WORKSHOP_TITLE = workshop.title;
export const WORKSHOP_NUMBER = workshop.number;
export const WORKSHOP_CHAPTER = workshop.chapter;
export const WORKSHOP_ARTIFACT = workshop.artifact;
export const WORKSHOP_SLUG = workshop.slug;
export const BRING_LABEL = workshop.bringLabel;

export const SAVINGS = MARKET_VALUE - PRICE;
export const SAVINGS_PCT = Math.round((SAVINGS / MARKET_VALUE) * 100);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const WHATSAPP_URL = workshop.whatsappWorkshop;
export const HOST_WHATSAPP_URL = workshop.whatsappHost;
export const PHONE_TEL = workshop.phoneTel;
export const PHONE_DISPLAY = workshop.phoneDisplay;
export const SUPPORT_EMAIL = workshop.supportEmail;

export const valueStack = [
  { item: "3-hour live Magic of AI workshop", value: "₹5,000" },
  { item: "A week of finished work, made from how you talk", value: "₹4,000+" },
  { item: "The recipe saved — yours to reuse on Tuesday", value: "₹3,000" },
  { item: "Free Google account is enough — no paid software", value: "Included" },
  { item: "Printed kit & WhatsApp community", value: "Priceless" },
  { item: "Certificate of completion", value: "✓" },
];

export const hosts = [
  { name: "Yogesh Kanoi", src: "/yogesh.jpg", pos: "center 15%" },
  { name: "Neeraj Kanoi", src: "/neeraj.jpg", pos: "center 12%" },
  { name: "Subham Kanoi", src: "/subham.jpg", pos: "center 10%" },
] as const;
