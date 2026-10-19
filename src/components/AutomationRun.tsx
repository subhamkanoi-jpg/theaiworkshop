import type { CSSProperties } from "react";

/**
 * One automation, mid-run, in the phone-shaped frame the hero has always had.
 *
 * It tells the whole October story in seven lines: a lead arrives, the AI
 * answers from the brief, follow-ups go out, the lead replies and they stop,
 * the bot covers the rest. The rows draw in one after another, once, when the
 * component mounts, and then the log holds: no timer, no hidden-tab blanking,
 * nothing looping (see `.run-log` in index.css). With reduced motion every row
 * is simply there from the start.
 */

/** Times are mono cells, so keep them to five characters. */
const ROWS = [
  { time: "12:41", text: "New lead · Riya S. asks “Do you deliver to Salt Lake?”" },
  { time: "12:41", text: "Added to Leads.gsheet" },
  { time: "1:00", text: "AI reply written from your brief" },
  {
    time: "1:00",
    text: "Email 1 sent — “Yes, we deliver across Sectors 1 to 5…”",
  },
  { time: "Day 2", text: "Follow-up 1 sent" },
  { time: "Day 4", text: "Riya replied — follow-ups 2 and 3 cancelled" },
  { time: "24/7", text: "@YourBusiness_bot answered 14 questions, handed 1 to you" },
];

export function AutomationRun() {
  return (
    <div className="cinema-gate">
      <div
        className="cinema-screen cinema-screen-vert run-screen"
        role="group"
        aria-label="An example run of the automation you build: a new lead gets an AI reply, follow-ups stop when she replies, and a bot answers questions."
      >
        <div className="run-head">
          <span className="run-title">Your automation</span>
          <span className="run-status">
            <i className="run-dot" aria-hidden />
            Running
          </span>
        </div>
        <ol className="run-log gate-term">
          {ROWS.map((row, i) => (
            <li key={row.text} style={{ "--i": i } as CSSProperties}>
              <span className="run-time">{row.time}</span>
              <span className="run-text">{row.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
