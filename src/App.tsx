import { useEffect } from "react";
import { trackViewContent } from "@/analytics";
import { usePageSeo } from "@/hooks/usePageSeo";
import { SiteShell } from "@/components/SiteChrome";
import { GlimpseReel, glimpses } from "@/components/GlimpseReel";
import { ReserveButton } from "@/components/ReserveButton";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_DURATION_LABEL,
  WORKSHOP_TITLE,
  WORKSHOP_NUMBER,
  WORKSHOP_ARTIFACT,
  PRICE,
  MARKET_VALUE,
  TOTAL_SEATS,
  inr,
  hosts,
} from "@/config";
import { pathChapters, faqs } from "@/content/path";
import { cn } from "@/lib/utils";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Users,
  Lock,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Wand2,
  BookOpen,
  MessageSquareText,
} from "lucide-react";

function App() {
  usePageSeo("home");
  useEffect(() => {
    trackViewContent("Homepage", "Workshop Lander");
  }, []);

  return (
    <SiteShell current="home">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden bg-background pt-8 pb-14 sm:pt-16 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#c8553d]/25 bg-[#c8553d]/[0.07] px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#c8553d]">
                <MapPin className="h-3.5 w-3.5" />
                Offline · Salt Lake · 27 Sept
              </div>

              <h1 className="font-serif text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-foreground text-balance">
                The AI Workshop —{" "}
                <span className="italic text-[#c8553d]">Kolkata&apos;s offline AI workshop.</span>
              </h1>

              <p className="mt-3 sm:mt-5 font-serif text-xl sm:text-3xl text-foreground/90 leading-snug text-balance">
                This Sunday:{" "}
                <span className="italic text-[#c8553d]">{WORKSHOP_TITLE}.</span>
              </p>
            </div>

            <div className="relative lg:row-span-2 lg:col-start-2">
              <GlimpseReel />
              <p className="font-hand mt-3 sm:mt-4 rotate-[1deg] text-center text-lg sm:text-xl text-muted-foreground">
                real room · real people · Kolkata
              </p>
            </div>

            <div>
              <p className="text-[17px] sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Kolkata&apos;s offline AI workshop in Salt Lake. You build one real
                thing with your own hands and take it home. Next — talk for a few
                minutes, walk out with a week of work already made. No tech
                background needed.{" "}
                <a href="/kolkata" className="font-semibold text-[#c8553d]">
                  Learn AI in Kolkata →
                </a>
              </p>

              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
                <ReserveButton />
                <a
                  href="/workshop"
                  className="pressable inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-8 text-base font-medium text-foreground shadow-e1"
                >
                  What you&apos;ll walk out with <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 sm:mt-7 flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex -space-x-2 shrink-0">
                  {hosts.map((av) => (
                    <div
                      key={av.src}
                      className="h-8 w-8 rounded-full overflow-hidden border-2 border-background ring-1 ring-border/40 flex-shrink-0"
                    >
                      <img
                        src={av.src}
                        alt={av.name}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: av.pos }}
                      />
                    </div>
                  ))}
                </div>
                <span className="leading-snug">
                  Yogesh, Neeraj &amp; Subham
                  <span className="block sm:inline"> · 60+ in the room · {TOTAL_SEATS} seats</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── This Sunday ────────────────────────────────────────────────────── */}
      <section id="workshop" className="border-t border-border py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="overflow-hidden rounded-3xl border border-[#c8553d]/25 bg-card shadow-e3">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-3 p-5 sm:p-8 lg:p-11">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c8553d]/25 bg-[#c8553d]/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Next workshop · #{String(WORKSHOP_NUMBER).padStart(2, "0")}
                </div>

                <h2 className="font-serif text-[1.75rem] sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
                  {WORKSHOP_TITLE}
                  <span className="italic text-[#c8553d]"> — one trick.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  You talk about your work for a few minutes. Before 2pm that talk
                  has become a week of finished work — a bio, an offer line, seven
                  posts — and a recipe you can run again on Tuesday. The magic is
                  not the model. The magic is work that did not exist at 11am.
                </p>

                <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    WORKSHOP_ARTIFACT,
                    "The recipe saved — yours to keep",
                    "Free Google account. No paid software.",
                    "50 people, tables of eight, captains on the floor",
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-[#c8553d] flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_DATE_LABEL}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_TIME_LABEL}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#c8553d]" /> Salt Lake, Kolkata
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center gap-4 sm:gap-5 border-t lg:border-t-0 lg:border-l border-border/60 bg-[#c8553d]/[0.04] p-5 sm:p-8 lg:p-11">
                <div>
                  <div className="flex items-end gap-3">
                    <span className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">{inr(PRICE)}</span>
                    <span className="mb-1.5 text-lg text-muted-foreground line-through">{inr(MARKET_VALUE)}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#c8553d]">
                    Community price · a freelancer kit is {inr(MARKET_VALUE)}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Wand2 className="mr-1.5 -mt-0.5 inline h-4 w-4 text-[#c8553d]" />
                  Capped at {TOTAL_SEATS} so the trick still happens in your hands,
                  not only on a screen.
                </p>

                <ReserveButton block />
                <a href="/workshop" className="text-center text-xs text-muted-foreground hover:text-foreground">
                  Full rundown of the three hours →
                </a>
              </div>
            </div>
          </div>

          <p className="font-hand mt-8 text-center text-xl text-muted-foreground rotate-[1deg]">
            a thing you&apos;ll open on Tuesday — not another webinar
          </p>
        </div>
      </section>

      {/* ── The Path ───────────────────────────────────────────────────────── */}
      <section id="path" className="border-t border-border bg-muted/20 py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              The Path
            </div>
            <h2 className="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
              The store has aisles.{" "}
              <span className="italic text-[#c8553d]">This Sunday is one shelf.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Talk → Make → Sell → System → Lead. Enter on any Sunday. Leave with
              an artifact every time.
            </p>
          </div>

          <div data-reveal-children className="snap-row sm:grid-cols-2 lg:grid-cols-5 sm:gap-3 -mx-4 px-4 sm:mx-0 sm:px-0">
            {pathChapters.map((c) => (
              <a
                key={c.id}
                href="/path"
                className={cn(
                  "snap-card rounded-2xl border p-5 bg-card shadow-e1 pressable",
                  c.status === "this-sunday"
                    ? "border-[#c8553d]/40"
                    : "border-border/60"
                )}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
                  {c.n} · {c.status === "this-sunday" ? "This Sunday" : c.status === "shipped" ? "Shipped" : c.status === "next" ? "Next" : "Later"}
                </p>
                <h3 className="font-serif text-xl font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.promise}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="/path" className="text-sm font-semibold text-[#c8553d] hover:underline">
              See the full Path and the archive of #1 and #2 →
            </a>
          </div>
        </div>
      </section>

      {/* ── How a Sunday works ─────────────────────────────────────────────── */}
      <section className="border-t border-border py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
              How a Sunday works
            </p>
            <h2 className="font-serif text-[1.75rem] sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12]">
              Show the trick once. Then you do it.
            </h2>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                icon: <MessageSquareText className="h-5 w-5" />,
                title: "You talk",
                desc: "Three minutes about your actual work — voice note or a messy paragraph. We have samples if you bring nothing.",
              },
              {
                step: "02",
                icon: <Wand2 className="h-5 w-5" />,
                title: "The kit appears",
                desc: "On the big screen, then on your phone: bio, offer line, seven posts. Captains unblock. They do not take the laptop.",
              },
              {
                step: "03",
                icon: <CheckCircle2 className="h-5 w-5" />,
                title: "You save the recipe",
                desc: "The brief that worked comes home with you. Tuesday still works. That is the whole magic.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-e1">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c8553d]/10 text-[#c8553d]">
                    {s.icon}
                  </span>
                  <span className="font-serif text-3xl font-semibold text-[#c8553d]/25">{s.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Velvet rope ────────────────────────────────────────────────────── */}
      <section id="who" className="border-t border-border py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              The velvet rope
            </div>
            <h2 className="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
              Who this room is for.{" "}
              <span className="italic text-[#c8553d]">And who it isn&apos;t.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Zero tech background is fine. Zero follow-through isn&apos;t.
            </p>
          </div>

          <div data-reveal className="invite-card grid sm:grid-cols-2 gap-0 rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="p-5 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-6">
                You belong here if
              </p>
              <ul className="space-y-5">
                {[
                  "You will sit in Salt Lake on a Sunday and do the work with your own hands.",
                  "You want AI to move money, time, or skill — not to decorate a bio.",
                  "You're happy to start from zero. Shop owner, student, freelancer, job-seeker: if you ship, you're in.",
                  "You want a thing on your phone at 2pm, not a certificate.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
                    <CheckCircle2 className="h-5 w-5 text-[#c8553d] flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 sm:p-10 bg-muted/30 border-t sm:border-t-0 sm:border-l border-border/60">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                This isn&apos;t for you if
              </p>
              <ul className="space-y-5">
                {[
                  "You want a webinar you can half-watch from bed.",
                  "You're a dabbler. You collect certificates and never build anything.",
                  "You want AI hype — not three hours of actually doing the work.",
                  "You're not in Kolkata, or you want this online. We're not that.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <XCircle className="h-5 w-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="font-hand mt-8 text-center text-xl text-muted-foreground -rotate-1">
            fifty people, serious tables, on purpose
          </p>
        </div>
      </section>

      {/* ── The Room ───────────────────────────────────────────────────────── */}
      <section id="proof" className="border-t border-border bg-muted/20 py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              The room
            </div>
            <h2 className="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
              60+ members.{" "}
              <span className="italic text-[#c8553d]">One room in Kolkata.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Meetup #1, 28 June: people built websites. Meetup #2, 30 August: people
              cut reels. Hosts — Yogesh, Neeraj, Subham — in the same room as you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-12 overflow-x-clip px-1">
            {glimpses.slice(0, 4).map((g, i) => (
              <figure
                key={g.src}
                className={cn("polaroid tape", i % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]")}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="h-full w-full object-cover filter saturate-[0.85]"
                  />
                </div>
              </figure>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {hosts.map((h) => (
              <div key={h.name} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-border/40">
                  <img
                    src={h.src}
                    alt={h.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: h.pos }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{h.name}</p>
                  <p className="text-xs text-muted-foreground">Host · Salt Lake</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/room" className="text-sm font-semibold text-[#c8553d] hover:underline">
              More from the room →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-border py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
              Questions
            </p>
            <h2 className="font-serif text-[1.75rem] sm:text-4xl font-semibold tracking-tight text-foreground">
              A stranger should not need WhatsApp to understand this.
            </h2>
          </div>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border/60 pb-6">
                <dt className="font-semibold text-foreground">{f.q}</dt>
                <dd className="mt-2 text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Closer ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/20 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[#c8553d]/25 bg-[#c8553d]/[0.04] p-6 sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
              Workshop #{WORKSHOP_NUMBER} · {WORKSHOP_DATE_LABEL}
            </p>
            <h2 className="font-serif text-[1.65rem] sm:text-3xl font-semibold text-foreground leading-tight mb-2">
              {WORKSHOP_TITLE}. Capped at {TOTAL_SEATS}.
            </h2>
            <p className="text-muted-foreground mb-7">
              {WORKSHOP_DURATION_LABEL} in Salt Lake. Everyone leaves with a week of
              work that did not exist at 11am.
            </p>
            <ReserveButton />
            <p className="mt-4 text-xs text-muted-foreground">
              Beginner-friendly · pay online or at the venue
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export default App;
