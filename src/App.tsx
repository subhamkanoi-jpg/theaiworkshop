import { useEffect } from "react";
import { trackViewContent } from "@/analytics";
import { usePageSeo } from "@/hooks/usePageSeo";
import { SiteShell } from "@/components/SiteChrome";
import { GlimpseReel } from "@/components/GlimpseReel";
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
import { ArrowRight, Check, Minus, MapPin, Clock, Calendar } from "lucide-react";

/**
 * The artifact rail. Titles and bodies come from workshop.json so the page,
 * the structured data, and the plain-text brief cannot drift apart; the spec
 * line is the file you will actually find on your laptop afterwards, named
 * the way the system names it.
 */
const SPECS = [
  "Face_Lock_Master.png",
  "Scene_01_Hook_BaseImage.png",
  "Scene_01_Hook_Video.mp4",
  "VO_Final_ElevenLabs.mp3",
  "TOW_Prompt_Stack.txt",
];

const artifacts = workshopContent.outcomes.map((outcome, i) => {
  const split = outcome.indexOf(":");
  // The body reads as a clause after the colon in the plain-text brief, but as
  // its own sentence on a card, so it gets a capital here.
  const body = outcome.slice(split + 1).trim();
  return {
    title: outcome.slice(0, split),
    body: body.charAt(0).toUpperCase() + body.slice(1),
    spec: SPECS[i],
  };
});

const BELONG = [
  "You want ads that bring in revenue, not a showreel that impresses other marketers.",
  "You have zero filmmaking background and have stopped pretending that is the problem.",
  "You are ready to sit and produce, on your own laptop, for three uninterrupted hours.",
  "You already tried the tools, got plastic skin and melted hands, and want to know why.",
];

const STAY_HOME = [
  "You want a webinar to half-watch in bed with the tab muted.",
  "You collect certificates. There is no certificate. There is a rendered file.",
  "You would rather debate whether AI is art than export something by 2:00 PM.",
  "You want the deck afterwards instead of the three hours in the room.",
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
          <p className="text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] sm:text-xs">
            Offline
            <span className="text-[#e8a090]"> · </span>
            Salt Lake, Kolkata
            <span className="text-[#e8a090]"> · </span>
            Sunday, 27 Sept
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
              <p className="text-sm font-semibold text-primary">
                Workshop #3 · Built in the room, not in a slide deck
              </p>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
                Stop prompting random sludge.
                <br />
                <span className="text-primary">
                  Walk out with a finished AI ad.
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Three hours in Salt Lake. One continuous workflow — brief, face
                lock, base image, motion, voice. From an empty chat window to a
                vertical ad rendered on your phone before lunch.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ReserveButton
                  className="whitespace-nowrap"
                  label={`Reserve your seat · ${inr(PRICE)}`}
                />
                <a
                  href="#recipe"
                  className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-6 text-base font-medium"
                >
                  See the system <ArrowRight className="size-4" />
                </a>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {TOTAL_SEATS} seats only
                </span>{" "}
                · Tables of eight · A floor captain at every table
                <br />
                {WORKSHOP_DATE_LABEL} · {WORKSHOP_TIME_LABEL} · Salt Lake
              </p>
            </div>

            <PipelineGate />
          </div>
        </div>
      </section>

      {/* ── The artifact ──────────────────────────────────────────────── */}
      <section
        id="artifact"
        className="border-b border-border py-14 sm:py-20"
        aria-labelledby="artifact-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              What you actually leave with
            </p>
            <h2
              id="artifact-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
            >
              Not a certificate. A production pack and a rendered ad.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Five files on your own laptop by 2:00 PM, named the way the system
              names them, so the folder still makes sense on Tuesday when you
              open it to build the next one.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((a, i) => (
              <article key={a.spec} className="slate">
                <div className="slate-head">
                  <span>
                    <span className="slate-num">
                      Artifact {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-[#f4eee4]/45">
                    {String(i + 1)}/{artifacts.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-semibold leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-base leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                  <p className="gate-term mt-5 border-t border-border pt-3 text-muted-foreground">
                    {a.spec}
                  </p>
                </div>
              </article>
            ))}

            <article className="invite-card flex flex-col justify-between rounded-xl border border-border bg-muted/40 p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  The point
                </p>
                <p className="mt-3 font-serif text-xl font-semibold leading-snug">
                  You do not leave with notes about how it could be done.
                </p>
                <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                  You leave with the file, and the recipe that made it, and
                  enough repetitions to run the whole thing again without
                  anybody standing next to you.
                </p>
              </div>
              <a
                href="/workshop"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                See the full three hours <ArrowRight className="size-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ── The methodology ───────────────────────────────────────────── */}
      <KitchenRule />

      {/* ── The 3-hour production run ─────────────────────────────────── */}
      <section
        id="run"
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="run-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              The call sheet · {WORKSHOP_TIME_LABEL}
            </p>
            <h2
              id="run-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
            >
              Three hours, four blocks, one file at the end of it.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Nothing here is a demo you watch. Every block ends with something
              saved on your machine that the next block needs.
            </p>
          </div>

          <ol className="mt-10 flex flex-col">
            {workshopContent.agenda.map((step, i) => (
              <li
                key={step.time}
                className="grid gap-3 border-t border-border py-7 sm:grid-cols-[10.5rem_1fr] sm:gap-8"
              >
                <div>
                  <p className="text-sm font-bold tabular-nums text-primary">
                    {step.time}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Block {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-2 border-t border-border pt-7 text-base leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">2:00 PM.</span> The
            room empties. Your ad exists.
          </p>
        </div>
      </section>

      {/* ── The room and the table system ─────────────────────────────── */}
      <section
        className="border-t border-border bg-muted/30 py-14 sm:py-20"
        aria-labelledby="room-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-primary">
                The room is the method
              </p>
              <h2
                id="room-heading"
                className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
              >
                Fifty people. Tables of eight. A captain who fixes your prompt
                without touching your keyboard.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                A render comes back with six fingers and a warped logo. Online,
                that is where you quit. Here it is where somebody leans over,
                reads the prompt you actually typed, and tells you which
                constraint you left out. That is the entire reason this is not a
                webinar.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                We cap it at {TOTAL_SEATS} because a captain can hold eight
                screens in their head and not eighty.
              </p>
              <div className="flex flex-col gap-5 pt-1">
                <h3 className="text-xl font-semibold">In the room with you</h3>
                <div className="flex flex-col gap-4">
                  {hosts.map((h) => (
                    <div key={h.name} className="flex items-center gap-4">
                      <img
                        src={h.src}
                        alt={h.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="size-14 rounded-full object-cover"
                        style={{ objectPosition: h.pos }}
                      />
                      <div>
                        <p className="font-semibold">{h.name}</p>
                        <p className="text-sm text-muted-foreground">
                          The AI Workshop · Kolkata
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <GlimpseReel />
              <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                Our first workshop · June 2026
                <br />
                Sixty people built websites and put them online. Same tables,
                same captains, different file at the end.
              </p>
              <a
                href="/room"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                See the June room <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The door policy ───────────────────────────────────────────── */}
      <section
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="door-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              Before you book
            </p>
            <h2
              id="door-heading"
              className="mt-3 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
            >
              This is a good use of your Sunday, or it is a waste of it.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              We would rather you read the right-hand column and keep your ₹799.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <div className="door door-in">
              <h3 className="font-serif text-2xl font-semibold">
                You belong here
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {BELONG.map((line) => (
                  <li key={line} className="flex gap-3 text-base leading-relaxed">
                    <Check className="mt-1 size-5 shrink-0 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                D2C founders, agency owners, video creators, freelancers, and
                local business owners. No filmmaking background assumed at any
                point.
              </p>
            </div>

            <div className="door">
              <h3 className="font-serif text-2xl font-semibold text-muted-foreground">
                Stay home
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {STAY_HOME.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <Minus className="mt-1 size-5 shrink-0 opacity-50" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                No hard feelings. The seat goes to somebody who will fill it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Price and seat cap ────────────────────────────────────────── */}
      <section
        id="ticket"
        className="border-t border-border bg-muted/30 py-14 sm:py-20"
        aria-labelledby="ticket-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="invite-card rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-9">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Admit one · {TOTAL_SEATS} seats · {WORKSHOP_DATE_LABEL}
            </p>
            <h2
              id="ticket-heading"
              className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
            >
              {inr(PRICE)} for the three hours and the recipe.
            </h2>
            <p className="mt-4 flex flex-wrap items-baseline gap-3 text-base text-muted-foreground">
              <span className="line-through">{inr(MARKET_VALUE)}</span>
              <span>agency kit price for the same workflow</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The ticket covers the guided production run, the table captains,
              and the prompt system you keep. Image, video, and voice tools run
              on credits you supply — budget roughly ₹500 to ₹1,500 if you want
              to render the full ad on the day. We say so here rather than at
              the door.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ReserveButton
                  className="whitespace-nowrap"
                  label={`Reserve your seat · ${inr(PRICE)}`}
                />
              <a
                href="/workshop"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-6 text-base font-medium"
              >
                Read the full plan <ArrowRight className="size-4" />
              </a>
            </div>

            <dl className="mt-8 grid gap-4 border-t border-border pt-6 text-sm leading-relaxed sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-foreground">Refunds</dt>
                <dd className="mt-1 text-muted-foreground">
                  Full refund up to 48 hours before the session. Message us and
                  it is done — no form, no reason required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Venue holds</dt>
                <dd className="mt-1 text-muted-foreground">
                  Reserved-to-pay-at-venue seats are released 15 minutes after
                  kickoff and given to the waiting list.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" /> Salt Lake, Kolkata
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" /> {WORKSHOP_TIME_LABEL}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" /> {WORKSHOP_DATE_LABEL}
            </span>
          </div>
        </div>
      </section>

      {/* ── Getting there ─────────────────────────────────────────────────
          These answers are also the home page's FAQ structured data, so they
          have to be on the page and worded the same way. */}
      <section
        id="getting-there"
        className="border-t border-border py-14 sm:py-20"
        aria-labelledby="getting-there-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold text-primary">
                Venue, travel and refunds
              </p>
              <h2
                id="getting-there-heading"
                className="mt-3 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl"
              >
                Getting there.
              </h2>
              <address className="mt-5 not-italic text-base leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {LOCAL.venueName}
                </span>
                <br />
                {LOCAL.street}
                <br />
                {LOCAL.locality}, {LOCAL.region} {LOCAL.postalCode}
              </address>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Doors at <span className="font-semibold text-foreground">10:30 AM</span>{" "}
                for an 11:00 AM start. The exact unit is emailed the moment you
                book — arrive a little early and take the coffee.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={LOCAL.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-5 text-sm font-semibold"
                >
                  <MapPin className="size-4" /> Open in Google Maps
                </a>
                <a
                  href={`tel:${LOCAL.phoneTel}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-5 text-sm font-semibold"
                >
                  Call {LOCAL.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {workshopContent.localFaqs.map((faq) => (
                <details key={faq.q} className="border-b border-border py-4">
                  <summary className="cursor-pointer text-base font-semibold leading-relaxed">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Questions ─────────────────────────────────────────────────── */}
      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            The questions people actually ask
          </h2>
          <div className="mt-8 flex flex-col gap-2">
            {workshopContent.faqs.map((faq) => (
              <details key={faq.q} className="border-b border-border py-4">
                <summary className="cursor-pointer text-base font-semibold leading-relaxed">
                  {faq.q}
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold text-primary">
            {WORKSHOP_DATE_LABEL}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
            Walk in with an idea.
            <br />
            Walk out with the file.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {TOTAL_SEATS} seats, tables of eight, and three hours that end with
            a rendered ad instead of a reading list.
          </p>
          <div className="mt-8 flex justify-center">
            <ReserveButton
                  className="whitespace-nowrap"
                  label={`Reserve your seat · ${inr(PRICE)}`}
                />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Laptop required. Bring headphones and one thing you actually sell.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
