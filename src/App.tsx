import { useEffect } from "react";
import { trackViewContent } from "@/analytics";
import { usePageSeo } from "@/hooks/usePageSeo";
import { SiteShell } from "@/components/SiteChrome";
import { PipelineGate } from "@/components/PipelineGate";
import { KitchenRule } from "@/components/KitchenRule";
import { ReserveButton } from "@/components/ReserveButton";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  PRICE,
  MARKET_VALUE,
  TOTAL_SEATS,
  inr,
  hosts,
  workshopContent,
} from "@/config";
import { LOCAL } from "@/seo/local";
import { ArrowRight, Check, Minus, MapPin } from "lucide-react";

/**
 * The artifact rail. Titles come from workshop.json; the filename is the whole
 * argument, so the prose that used to sit under each one is gone.
 */
const SPECS = [
  "Face_Lock_Master.png",
  "Scene_01_BaseImage.png",
  "Scene_01_Video.mp4",
  "VO_Final.mp3",
  "TOW_Prompt_Stack.txt",
];

const artifacts = workshopContent.outcomes.map((outcome, i) => ({
  title: outcome.slice(0, outcome.indexOf(":")),
  spec: SPECS[i],
}));

/** Times and three-word titles. The detail lives on /workshop. */
const RUN = [
  ["11:00", "Brief + face lock"],
  ["11:40", "Scenes + base stills"],
  ["12:40", "Motion + voice"],
  ["13:30", "QC + packaging"],
];

const BELONG = [
  "You sell something",
  "Zero filmmaking background",
  "Three hours, own laptop",
];

const STAY_HOME = [
  "You want a webinar",
  "You collect certificates",
  "You would rather debate than export",
];

export default function App() {
  usePageSeo("home");
  useEffect(() => {
    trackViewContent("Homepage", "Workshop Lander");
  }, []);

  return (
    <SiteShell current="home">
      {/* ── Announcement bar ──────────────────────────────────────────── */}
      <div className="border-b border-border bg-[#16120f] text-[#f4eee4]">
        <div className="mx-auto max-w-5xl px-4 py-2.5 sm:px-6">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs">
            Offline<span className="text-[#e8a090]"> · </span>Salt Lake, Kolkata
            <span className="text-[#e8a090]"> · </span>Sun 27 Sept
            <span className="text-[#e8a090]"> · </span>
            {WORKSHOP_TIME_LABEL}
          </p>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section id="hero" className="border-b border-border py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Stop prompting sludge.
                <br />
                <span className="text-primary">Leave with a finished ad.</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Three hours. Five stages. One rendered ad.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ReserveButton
                  className="whitespace-nowrap"
                  label={`Reserve · ${inr(PRICE)}`}
                />
                <a
                  href="#recipe"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-6 text-base font-medium"
                >
                  See the system <ArrowRight className="size-4" />
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium text-muted-foreground">
                <li>{TOTAL_SEATS} seats</li>
                <li aria-hidden>·</li>
                <li>Tables of 8</li>
                <li aria-hidden>·</li>
                <li>No experience</li>
              </ul>
            </div>
            <PipelineGate />
          </div>
        </div>
      </section>

      {/* ── The artifact: five filenames ──────────────────────────────── */}
      <section
        id="artifact"
        className="border-b border-border py-14 sm:py-20"
        aria-labelledby="artifact-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2
            id="artifact-heading"
            className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
          >
            You leave with five files.
            <span className="text-muted-foreground"> Not a certificate.</span>
          </h2>

          <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((a, i) => (
              <li key={a.spec} className="slate">
                <div className="slate-head">
                  <span className="slate-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-4 sm:p-5">
                  <h3 className="font-serif text-xl font-semibold leading-snug">
                    {a.title}
                  </h3>
                  <p className="gate-term text-muted-foreground">{a.spec}</p>
                </div>
              </li>
            ))}
            <li className="invite-card flex flex-col justify-between rounded-xl border border-border bg-muted/40 p-5">
              <p className="font-serif text-xl font-semibold leading-snug">
                Plus the recipe.
              </p>
              <a
                href="/workshop"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                The full three hours <ArrowRight className="size-4" />
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* ── The system ────────────────────────────────────────────────── */}
      <KitchenRule />

      {/* ── The run: a time rail ──────────────────────────────────────── */}
      <section
        id="run"
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="run-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2
            id="run-heading"
            className="font-serif text-3xl font-semibold leading-tight sm:text-4xl"
          >
            The three hours.
          </h2>
          <ol className="mt-9 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {RUN.map(([time, title], i) => (
              <li key={time} className="flex flex-col gap-2 bg-card p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Block {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl font-semibold text-primary tabular-nums">
                  {time}
                </span>
                <span className="text-base font-medium leading-snug">
                  {title}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-base text-muted-foreground">
            2:00 PM — your ad exists.
          </p>
        </div>
      </section>

      {/* ── The room, as numbers ──────────────────────────────────────── */}
      <section
        className="border-t border-border bg-muted/30 py-14 sm:py-20"
        aria-labelledby="room-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2
                id="room-heading"
                className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
              >
                A captain at every table.
              </h2>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {[
                  [TOTAL_SEATS, "seats"],
                  ["8", "per table"],
                  ["3", "hosts"],
                ].map(([n, label]) => (
                  <div key={label}>
                    <dt className="font-serif text-5xl font-semibold leading-none text-primary sm:text-6xl">
                      {n}
                    </dt>
                    <dd className="mt-2 text-sm text-muted-foreground">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {hosts.map((h) => (
                <div key={h.name} className="flex items-center gap-3">
                  <img
                    src={h.src}
                    alt={h.name}
                    width={52}
                    height={52}
                    loading="lazy"
                    className="size-13 rounded-full object-cover"
                    style={{ objectPosition: h.pos, height: 52, width: 52 }}
                  />
                  <p className="text-sm font-semibold">{h.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The door ──────────────────────────────────────────────────── */}
      <section
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="door-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2
            id="door-heading"
            className="font-serif text-3xl font-semibold leading-tight sm:text-4xl"
          >
            Worth your Sunday?
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ul className="door door-in flex flex-col gap-3">
              {BELONG.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-snug">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  {line}
                </li>
              ))}
            </ul>
            <ul className="door flex flex-col gap-3 text-muted-foreground">
              {STAY_HOME.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-snug">
                  <Minus className="mt-0.5 size-5 shrink-0 opacity-50" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Ticket ────────────────────────────────────────────────────── */}
      <section
        id="ticket"
        className="border-t border-border bg-muted/30 py-14 sm:py-20"
        aria-labelledby="ticket-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="invite-card rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-9">
            <p className="flex flex-wrap items-baseline gap-3">
              <span
                id="ticket-heading"
                className="font-serif text-5xl font-semibold text-primary sm:text-6xl"
              >
                {inr(PRICE)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                {inr(MARKET_VALUE)}
              </span>
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              {WORKSHOP_DATE_LABEL} · {WORKSHOP_TIME_LABEL}
            </p>
            <div className="mt-7">
              <ReserveButton
                className="whitespace-nowrap"
                label={`Reserve · ${inr(PRICE)}`}
              />
            </div>
            <ul className="mt-7 flex flex-wrap gap-2 border-t border-border pt-6 text-sm text-muted-foreground">
              {[
                "Refund up to 48h before",
                "Holds released 15 min after kickoff",
                "Tool credits ₹500–1,500, yours",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border px-3 py-1.5"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Getting there ─────────────────────────────────────────────────
          The accordion below is also the home page's FAQ structured data, so
          these questions have to be on the page. */}
      <section
        id="getting-there"
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="getting-there-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2
                id="getting-there-heading"
                className="font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              >
                Getting there.
              </h2>
              <address className="mt-5 not-italic text-base leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {LOCAL.venueName}
                </span>
                <br />
                {LOCAL.areaLine}
                <br />
                Doors 10:30 AM
              </address>
              <a
                href={LOCAL.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-5 text-sm font-semibold"
              >
                <MapPin className="size-4" /> Google Maps
              </a>
            </div>
            <div className="flex flex-col">
              {workshopContent.localFaqs.map((faq) => (
                <details key={faq.q} className="border-b border-border py-4">
                  <summary className="cursor-pointer text-base font-semibold leading-snug">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
              <a
                href="/answers"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                Everything else <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
