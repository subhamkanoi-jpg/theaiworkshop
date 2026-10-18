import { workshopContent, WORKSHOP_MONTH } from "@/config";

type Workshop = {
  number: number;
  date: string;
  title: string;
  chapter: string;
  artifact: string;
  status: "shipped" | "next";
  /** Where the card links, if anywhere. September has no page of its own. */
  href?: string;
  linkLabel?: string;
};

export const archive: Workshop[] = [
  {
    number: 1,
    date: "June 2026",
    title: "Build and host a website",
    chapter: "First workshop",
    artifact: "Websites, live by the end of the day.",
    status: "shipped",
    href: "/room",
    linkLabel: "See the June workshop →",
  },
  {
    number: 3,
    date: "September 2026",
    title: "AI video ads",
    chapter: "Third workshop",
    artifact: "A vertical AI video ad, built from a brief.",
    status: "shipped",
  },
  {
    number: workshopContent.number,
    date: workshopContent.dateLabel,
    title: workshopContent.title,
    chapter: "Next project",
    artifact: "One automation running, plus the blueprint.",
    status: "next",
    href: "/workshop",
    linkLabel: `See the ${WORKSHOP_MONTH} plan →`,
  },
];

export const briefLoop = [
  {
    n: "01",
    title: "Choose one task",
    body: "Start with something you actually do at work. Define what a useful result would look like.",
  },
  {
    n: "02",
    title: "Give it context",
    body: "Provide the facts, audience, language, and constraints. Leave out confidential information.",
  },
  {
    n: "03",
    title: "Build alongside us",
    body: "Follow the demonstration, try it on your own device, and ask for help when you get stuck.",
  },
  {
    n: "04",
    title: "Check and test",
    body: "Compare the result with the source. Try a second example before trusting a repeatable process.",
  },
  {
    n: "05",
    title: "Save and use again",
    body: "Take home the project and instructions. Use them on your next working day.",
  },
];

export const faqs = workshopContent.faqs;
