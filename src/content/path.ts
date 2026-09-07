import { workshopContent } from "@/config";

export const archive = [
  {
    number: 1,
    date: "June 2026",
    title: "Build and host a website",
    chapter: "First workshop",
    artifact: "Participants made websites and learned to put them online.",
    status: "shipped" as const,
  },
  {
    number: workshopContent.number,
    date: workshopContent.dateLabel,
    title: workshopContent.title,
    chapter: "Next project",
    artifact: workshopContent.artifact,
    status: "next" as const,
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
