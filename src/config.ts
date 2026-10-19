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
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const [, ISO_MONTH, ISO_DAY] = workshop.dateIso.split("-").map(Number);
/** "25 Oct" — nav label and announcement bar. */
export const WORKSHOP_DATE_SHORT =
  ISO_MONTH && ISO_DAY
    ? `${ISO_DAY} ${MONTHS_SHORT[ISO_MONTH - 1]}`
    : workshop.dateLabel;
/** "25 October" — breadcrumbs and sentences. */
export const WORKSHOP_DAY_MONTH =
  ISO_MONTH && ISO_DAY
    ? `${ISO_DAY} ${MONTHS_LONG[ISO_MONTH - 1]}`
    : workshop.dateLabel;
/** "October" */
export const WORKSHOP_MONTH = ISO_MONTH
  ? MONTHS_LONG[ISO_MONTH - 1]
  : workshop.dateLabel;
export const WORKSHOP_DOOR_LABEL = workshop.doorLabel;
export const WORKSHOP_TIME_LABEL = workshop.timeLabel;
export const WORKSHOP_DURATION_LABEL = workshop.durationLabel;
export const WORKSHOP_TITLE = workshop.title;
export const WORKSHOP_NUMBER = workshop.number;
export const WORKSHOP_CHAPTER = workshop.chapter;
export const WORKSHOP_ARTIFACT = workshop.artifact;
export const WORKSHOP_SLUG = workshop.slug;
/** "Sunday": the first word of the date label, for "Before Sunday". */
export const WORKSHOP_WEEKDAY = workshop.dateLabel.split(",")[0];
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

/** What each part leaves behind, named the way the build names it. The
 *  landing page and the booking summary both render this, so the list lives
 *  in workshop.json, one entry per outcome. */
export const ARTIFACT_SPECS = workshop.artifactSpecs;

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

/** Page copy that changes with every workshop. Pages read it from here so the
 *  next workshop is an edit to workshop.json, not to six components. */
export const HERO = workshop.hero;
export const STAGES = workshop.stages;
export const ARTIFACTS_HEADING = workshop.artifactsHeading;
export const RUN = workshop.run;
export const RUN_HEADING = workshop.runHeading;
export const FINISH_LINE = workshop.finishLine;
export const BELONG = workshop.belong;
export const STAY_HOME = workshop.stayHome;
export const DO_NOT_BRING = workshop.doNotBring;
export const TICKET_CHIPS = workshop.ticketChips;
export const TICKET_NOTE = workshop.ticketNote;
export const CAPTAIN_TASK = workshop.captainTask;
export const PREP = workshop.prep;
export const SHARE = workshop.share;

/** The person leading this workshop. Also one of the hosts below. */
export const LEAD = workshop.lead;

export const hosts = [
  { name: "Yogesh Kanoi", src: "/yogesh.jpg", pos: "center 15%" },
  { name: "Neeraj Kanoi", src: "/neeraj.jpg", pos: "center 12%" },
  { name: "Subham Kanoi", src: "/subham.jpg", pos: "center 10%" },
] as const;
