// Shared workshop config. Values come from workshop.json at the repo root.
// keep that file in sync with index.html / book.html structured data.
import workshop from "../workshop.json";

export const WORKSHOP_AMOUNT = workshop.amountPaise;
export const PRICE = workshop.price;
export const MARKET_VALUE = workshop.marketValue;
export const TOTAL_SEATS = workshop.totalSeats;
export const WORKSHOP_DATE_LABEL = workshop.dateLabel;
export const WORKSHOP_DATE_ISO = workshop.dateIso;
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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

export const workshopContent = workshop;

/** The file each stage leaves on your laptop, named the way the system names
 *  it. The landing page and the booking summary both render this, so the list
 *  lives here rather than in either of them. */
export const ARTIFACT_SPECS = [
  "Face_Lock_Master.png",
  "Scene_01_BaseImage.png",
  "Scene_01_Video.mp4",
  "VO_Final.mp3",
  "TOW_Prompt_Stack.txt",
] as const;

export const artifacts = workshop.outcomes.map((outcome, i) => ({
  title: outcome.slice(0, outcome.indexOf(":")),
  spec: ARTIFACT_SPECS[i],
}));

/** The booking page's offer summary: a title and the file, not a paragraph. */
export const valueStack = artifacts.map((a) => ({
  item: a.title,
  value: a.spec,
}));

export const BRING_SHORT = workshop.bringShort;

export const hosts = [
  { name: "Yogesh Kanoi", src: "/yogesh.jpg", pos: "center 15%" },
  { name: "Neeraj Kanoi", src: "/neeraj.jpg", pos: "center 12%" },
  { name: "Subham Kanoi", src: "/subham.jpg", pos: "center 10%" },
] as const;
