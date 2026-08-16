import { useEffect, useState } from "react";
import { trackViewContent, trackContact } from "@/analytics";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ScrollButtons } from "@/components/ScrollToTop";
import { cn } from "@/lib/utils";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  PRICE,
  MARKET_VALUE,
  SAVINGS_PCT,
  TOTAL_SEATS,
  inr,
  PHONE_TEL,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
} from "@/config";
import {
  MapPin,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Mail,
  CheckCircle2,
  XCircle,
  Users,
  Lock,
  ChevronDown,
  Calendar,
  Clock,
  Film,
  Sparkles,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────
// Glimpse reel — real meetup photos. Drop actual images in /public/meetup1/.
// ──────────────────────────────────────────────────────────────────────────
const glimpses = [
  { src: "/meetup1/glimpse-2.jpg", alt: "The room mid-session at Meetup #1 — laptops open" },
  { src: "/meetup1/group-selfie.jpg", alt: "The full group at The AI Workshop Meetup #1 in Kolkata" },
  { src: "/meetup1/glimpse-1.jpg", alt: "Live walkthrough on the big screen at Meetup #1" },
  { src: "/meetup1/hosts-trio.jpg", alt: "The hosts at Meetup #1" },
  { src: "/meetup1/glimpse-4.jpg", alt: "Participants building at Meetup #1" },
];

function GlimpseReel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % glimpses.length), 3400);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-e2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {glimpses.map((g, i) => (
        <img
          key={g.src}
          src={g.src}
          alt={i === current ? g.alt : ""}
          aria-hidden={i !== current}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 filter saturate-[0.88]",
            i === current ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute top-3 left-3 rounded-full bg-black/55 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        Meetup #1 · Salt Lake, Kolkata
      </div>
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {glimpses.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show glimpse ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyCTA, setStickyCTA] = useState(false);

  useEffect(() => {
    trackViewContent("Homepage", "Workshop Lander");
  }, []);

  // Show sticky mobile CTA after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      setStickyCTA(heroBottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const navEl = document.querySelector("nav");
        const navH = navEl ? navEl.getBoundingClientRect().height : 64;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  };

  const scrollToWorkshop = () => scrollTo("workshop");

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => scrollTo("hero")} className="flex items-center">
              <Logo iconClassName="h-8 w-auto" textClassName="text-lg" />
            </button>

            <div className="hidden lg:flex items-center gap-7">
              <button
                onClick={scrollToWorkshop}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                The Workshop
              </button>
              <button
                onClick={() => scrollTo("who")}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Who It&apos;s For
              </button>
              <button
                onClick={() => scrollTo("proof")}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                The Room
              </button>
              <a href="/book">
                <Button
                  size="sm"
                  className="bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 px-5"
                >
                  Reserve your seat <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </a>
            </div>

            <button
              className="lg:hidden text-foreground p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-5 pt-2 space-y-1 border-t border-border/50 mt-2">
              <button
                onClick={scrollToWorkshop}
                className="block w-full text-left text-sm font-medium text-foreground py-2.5 px-1"
              >
                The Workshop
              </button>
              <button
                onClick={() => scrollTo("who")}
                className="block w-full text-left text-sm font-medium text-foreground py-2.5 px-1"
              >
                Who It&apos;s For
              </button>
              <button
                onClick={() => scrollTo("proof")}
                className="block w-full text-left text-sm font-medium text-foreground py-2.5 px-1"
              >
                The Room
              </button>
              <a href="/book" className="block mt-3">
                <Button className="w-full bg-[#c8553d] hover:bg-[#b84a33] text-white border-0">
                  Reserve your seat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden bg-background pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left: Identity statement */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c8553d]/25 bg-[#c8553d]/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
                <MapPin className="h-3.5 w-3.5" />
                Offline · Kolkata · Every month
              </div>

              <h1 className="font-serif text-[2.8rem] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-foreground leading-[1.07] text-balance">
                AI is for the ones who{" "}
                <span className="italic text-[#c8553d]">show up.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Kolkata&apos;s offline AI workshops for business owners. Next up — automate your video
                editing with AI, {WORKSHOP_DATE_LABEL.replace("Sunday, ", "")}. No tech background needed.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                <a href="/book" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 text-base px-8 py-6 font-bold w-full sm:w-auto"
                  >
                    Reserve your seat <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToWorkshop}
                  className="text-base px-8 py-6 w-full sm:w-auto"
                >
                  What you&apos;ll build <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="mt-7 flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[
                    { src: "/yogesh.jpg",  alt: "Yogesh Kanoi",  pos: "center 15%" },
                    { src: "/neeraj.jpg",  alt: "Neeraj Kanoi",  pos: "center 12%" },
                    { src: "/subham.jpg",  alt: "Subham Kanoi",  pos: "center 10%" },
                  ].map((av) => (
                    <div
                      key={av.src}
                      className="h-8 w-8 rounded-full overflow-hidden border-2 border-background ring-1 ring-border/40 flex-shrink-0"
                    >
                      <img
                        src={av.src}
                        alt={av.alt}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: av.pos }}
                      />
                    </div>
                  ))}
                </div>
                <span>60+ in the community · small batches · Salt Lake</span>
              </div>
            </div>

            {/* Right: Real meetup photos */}
            <div className="relative">
              <GlimpseReel />
              <p className="font-hand mt-4 rotate-[1deg] text-center text-xl text-muted-foreground">
                real room · real people · Kolkata
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Next Workshop spotlight (#02) ──────────────────────────────────── */}
      <section id="workshop" className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#c8553d]/25 bg-card shadow-e3">
            <div className="grid lg:grid-cols-5">
              {/* Left: the pitch */}
              <div className="lg:col-span-3 p-8 sm:p-11">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c8553d]/25 bg-[#c8553d]/[0.07] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Next workshop · #02
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
                  Automate your video editing{" "}
                  <span className="italic text-[#c8553d]">with AI.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Two hours, hands-on. Turn raw footage into a polished, subtitled reel just by
                  talking to Claude — no editing software, no experience needed. You walk out with a
                  finished video.
                </p>

                {/* What you'll walk out with */}
                <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    "A finished, subtitled reel — made in the room",
                    "The full Claude editing workflow, yours to keep",
                    "Zero paid software — Claude + free open-source tools",
                    "Prompt kit, cheat sheets & lifetime WhatsApp support",
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-[#c8553d] flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                {/* Facts */}
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

              {/* Right: the offer + CTA */}
              <div className="lg:col-span-2 flex flex-col justify-center gap-5 border-t lg:border-t-0 lg:border-l border-border/60 bg-[#c8553d]/[0.04] p-8 sm:p-11">
                <div>
                  <div className="flex items-end gap-3">
                    <span className="font-serif text-5xl font-semibold text-foreground">{inr(PRICE)}</span>
                    <span className="mb-1.5 text-lg text-muted-foreground line-through">{inr(MARKET_VALUE)}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[#c8553d]">
                    Early-bird · save {SAVINGS_PCT}%
                  </p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Film className="mr-1.5 -mt-0.5 inline h-4 w-4 text-[#c8553d]" />
                  Seats are capped at {TOTAL_SEATS} so everyone gets real attention.
                </p>

                <a href="/book" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 text-base py-6 font-bold"
                  >
                    Reserve your seat <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground">
                  Small batch · beginner-friendly · pay online or at the venue
                </p>
              </div>
            </div>
          </div>

          <p className="font-hand mt-8 text-center text-xl text-muted-foreground rotate-[1deg]">
            a real thing you&apos;ll build — not another webinar
          </p>
        </div>
      </section>

      {/* ── The Velvet Rope ────────────────────────────────────────────────── */}
      <section id="who" className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              The velvet rope
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
              Who this room is for.{" "}
              <span className="italic text-[#c8553d]">And who it isn&apos;t.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              That tension is the whole design. Zero tech background is fine. Zero follow-through isn&apos;t.
            </p>
          </div>

          <div className="invite-card grid sm:grid-cols-2 gap-0 rounded-2xl border border-border/60 bg-card overflow-hidden">
            {/* For column */}
            <div className="p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-6">
                You belong here if
              </p>
              <ul className="space-y-5">
                {[
                  "You run a business or side hustle and want AI to move the needle — not just fill a feed.",
                  "You're in Kolkata and can show up in person on the day. This is always offline.",
                  "You're happy to start from zero. No jargon, no prior experience needed.",
                  "You ship things. You want to build something real, not collect another certificate.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
                    <CheckCircle2 className="h-5 w-5 text-[#c8553d] flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not for column */}
            <div className="p-8 sm:p-10 bg-muted/30 border-t sm:border-t-0 sm:border-l border-border/60">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-6">
                This isn&apos;t for you if
              </p>
              <ul className="space-y-5">
                {[
                  "You want a webinar you can half-watch from bed.",
                  "You're a dabbler. You collect certificates and never build anything.",
                  "You want AI hype — not two hours of actually doing the work.",
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
            small room, serious people, on purpose
          </p>
        </div>
      </section>

      {/* ── Proof of Room ──────────────────────────────────────────────────── */}
      <section id="proof" className="border-t border-border bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Proof of room
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.12] text-balance">
              60+ members.{" "}
              <span className="italic text-[#c8553d]">One room in Kolkata.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Meetup #1 happened on 28 June. Real people, laptops open, chai on the table. Here&apos;s what it looked like.
            </p>
          </div>

          {/* Photo strip — polaroid style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-16">
            {glimpses.slice(0, 4).map((g, i) => (
              <figure
                key={g.src}
                className={cn(
                  "polaroid tape",
                  i % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"
                )}
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

          <div className="mt-4 text-center">
            <a href="/book" className="inline-block">
              <Button
                size="lg"
                className="bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 text-base px-10 py-6 font-bold"
              >
                Reserve your seat <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/20 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-[#c8553d]/25 bg-[#c8553d]/[0.04] p-8 sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
              Workshop #02 · {WORKSHOP_DATE_LABEL}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-2">
              Capped at {TOTAL_SEATS} seats.
            </h2>
            <p className="text-muted-foreground mb-7">
              Small batch on purpose — everyone gets real attention, and everyone leaves with a
              finished reel.
            </p>

            <a href="/book" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 text-base px-10 py-6 font-bold w-full sm:w-auto"
              >
                Reserve your seat <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Beginner-friendly · pay online or at the venue
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/20 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <Logo iconClassName="h-8 w-auto" textClassName="text-base" />
              <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
                Kolkata&apos;s offline AI community for business owners. Monthly workshops in Salt Lake.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Salt Lake, Kolkata</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                onClick={() => trackContact("email")}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {SUPPORT_EMAIL}
              </a>
              <a
                href="https://www.instagram.com/theaiworkshop.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @theaiworkshop.in
              </a>
              <a
                href="/book"
                className="hover:text-foreground transition-colors"
              >
                Next Workshop — {WORKSHOP_DATE_LABEL}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                <a href="/refund" className="hover:text-foreground transition-colors">Refunds</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              &copy; {new Date().getFullYear()} The AI Workshop · Kolkata
            </span>
            <span>
              Phone:{" "}
              <a href={`tel:${PHONE_TEL}`} className="hover:text-foreground transition-colors">
                {PHONE_DISPLAY}
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* ── Sticky mobile reserve CTA ───────────────────────────────────────── */}
      <div
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 transition-transform duration-300",
          stickyCTA ? "translate-y-0" : "translate-y-full"
        )}
      >
        <a href="/book" className="block">
          <Button className="w-full bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 h-12 font-bold">
            Reserve your seat <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </a>
      </div>

      <ScrollButtons />
    </div>
  );
}

export default App;
