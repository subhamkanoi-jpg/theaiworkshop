import { useEffect, useState } from "react";
import { trackViewContent, trackContact } from "@/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/Logo";
import { HeroCanvas } from "@/components/HeroCanvas";
import { initSiteAnimations } from "@/lib/animations";
import { BecomeHost } from "@/components/BecomeHost";
import { InterestForm } from "@/components/InterestForm";
import { ScrollButtons } from "@/components/ScrollToTop";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";
import {
  PRICE,
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_DURATION_LABEL,
  WHATSAPP_URL,
  inr,
} from "@/config";
import {
  Globe,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Rocket,
  Mail,
  Menu,
  X,
  Linkedin,
  ShieldCheck,
  Star,
  ExternalLink,
  TrendingUp,
  Phone,
  Bell,
  Film,
  Scissors,
  Wand2,
  MessageSquare,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────
// Portfolio — websites built with vibe coding.
// 👉 Drop screenshots into /public/portfolio/ and fill in real URLs below.
//    If an image is missing, a gradient placeholder shows automatically.
// ──────────────────────────────────────────────────────────────────────────
const portfolio = [
  { name: "UR Hospitality", tag: "Corporate Catering", url: "https://www.urhospitality.in", image: "/portfolio/ur-hospitality.png" },
  { name: "Shree Jee Infotech", tag: "IT Distribution", url: "https://www.shreejeeinfotech.com", image: "/portfolio/shreejee-infotech.png" },
  { name: "Subham Kanoi", tag: "Founder Portfolio", url: "https://www.subhamkanoi.com", image: "/portfolio/subham-kanoi.png" },
  // aakashdamani.com was down when we captured — gradient placeholder shows until a screenshot
  // is added at /portfolio/aakash-damani.png
  { name: "Aakash Damani", tag: "Personal Website", url: "https://www.aakashdamani.in", image: "/portfolio/aakash-damani.png" },
  { name: "Amos Aerospace", tag: "Aerospace", url: "https://amosaerospace.com", image: "/portfolio/amos-aerospace.png" },
  { name: "The AI Workshop", tag: "This very website", url: "https://www.theaiworkshop.in", image: "/portfolio/aiworkshop.png" },
];

// ──────────────────────────────────────────────────────────────────────────
// Workshop hosts. Drop portraits in /public (square images work best).
// ──────────────────────────────────────────────────────────────────────────
const hosts = [
  {
    name: "Yogesh Kanoi",
    role: "The Backbone",
    image: "/yogesh.png",
    link: "https://www.linkedin.com/in/yogesh-kanoi-37219a63/",
    linkType: "linkedin" as const,
    bio: `AI/ML engineer at LTI, deep in deep learning since 2020. The architect who turns "can we do this?" into a working system.`,
  },
  {
    name: "Subham Kanoi",
    role: "The Instigator",
    image: "/subham.png",
    link: "https://www.linkedin.com/in/subhamkanoi/",
    linkType: "linkedin" as const,
    bio: `Xavier's grad and founder of Urban Rasoi, Kolkata's gourmet cloud kitchen. The non-techie who started it all — living proof this works for anyone.`,
  },
  {
    name: "Neeraj Kanoi",
    role: "The Growth Guy",
    image: "/neeraj.png",
    link: "https://www.linkedin.com/in/neeraj-kanoi-marketing/",
    linkType: "linkedin" as const,
    bio: `Left a safe IT job to lead growth at Wokelo AI. He knows what it takes to go from zero to scale — and brings that energy here.`,
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Community mission / vision / people — the three hero "artifact" cards.
// Desktop shows them as a 3-up grid; mobile cycles them as a carousel.
// ──────────────────────────────────────────────────────────────────────────
const missionCards = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    label: "Our Mission",
    text: "Put real, working AI skills in the hands of non-techies — one hands-on, offline workshop at a time.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    label: "Our Vision",
    text: "A community where anyone with a proven AI use-case can teach it, and anyone curious can learn it.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    label: "Our People",
    text: "60+ members and growing daily — swapping tips, building in public, shaping what we create next.",
  },
];

function MissionCard({ icon, label, text }: (typeof missionCards)[number]) {
  return (
    <div className="h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-6 shadow-sm text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-bold text-foreground">{label}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

// Mobile-only: the three cards slide through one at a time, auto-advancing.
function MissionCarousel() {
  const [current, setCurrent] = useState(0);
  const count = missionCards.length;

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 3000);
    return () => clearInterval(id);
  }, [current, count]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex items-stretch transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {missionCards.map((c) => (
            <div key={c.label} className="w-full flex-shrink-0">
              <MissionCard {...c} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-0.5 mt-4">
        {missionCards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="flex items-center justify-center p-3 -m-1"
            aria-label={`Go to card ${i + 1}`}
          >
            <span className={cn(
              "h-1.5 rounded-full transition-all duration-300 block",
              i === current ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
}

function PortfolioThumb({ name, tag, image, url }: (typeof portfolio)[number]) {
  const [broken, setBroken] = useState(false);
  return (
    <a
      href={url}
      target={url !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {!broken ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-primary/20">
            <Globe className="h-10 w-10 text-primary/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-xs font-medium text-muted-foreground rounded-full bg-muted px-2.5 py-1">{tag}</span>
      </div>
    </a>
  );
}

function HostCard({
  name,
  role,
  bio,
  image,
  link,
  linkType,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
  linkType: "linkedin" | "website";
}) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex flex-col items-center text-center">
      <a href={link} target="_blank" rel="noopener noreferrer" className="group" aria-label={name}>
        <div className="h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ring-1 ring-border shadow-sm bg-muted">
          {!broken ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-secondary">
              <span className="text-3xl font-bold text-muted-foreground">{initials}</span>
            </div>
          )}
        </div>
      </a>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm font-medium text-primary mt-0.5">{role}</p>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">{bio}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        {linkType === "website" ? <Globe className="h-4 w-4" /> : <Linkedin className="h-4 w-4" />}
        {linkType === "website" ? "Website" : "LinkedIn"}
      </a>
    </div>
  );
}

// Mobile-only: the host portraits slide through one at a time, auto-advancing.
function HostCarousel() {
  const [current, setCurrent] = useState(0);
  const count = hosts.length;

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 3500);
    return () => clearInterval(id);
  }, [current, count]);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="flex items-start transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {hosts.map((h) => (
            <div key={h.name} className="w-full flex-shrink-0 px-4">
              <HostCard {...h} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-0.5 mt-6">
        {hosts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="flex items-center justify-center p-3 -m-1"
            aria-label={`Go to host ${i + 1}`}
          >
            <span className={cn(
              "h-1.5 rounded-full transition-all duration-300 block",
              i === current ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
}

function PortfolioCarousel() {
  const [current, setCurrent] = useState(0);
  const count = portfolio.length;

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 2500);
    return () => clearInterval(id);
  }, [current, count]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {portfolio.map((p) => (
            <div key={p.name} className="w-full flex-shrink-0">
              <PortfolioThumb {...p} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-0.5 mt-4">
        {portfolio.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="flex items-center justify-center p-3 -m-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className={cn(
              "h-1.5 rounded-full transition-all duration-300 block",
              i === current ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Hero glimpse reel — auto-crossfading frames from meetup #1, right on
// screen one. Proof beats promises: visitors see a real room, real laptops,
// real people before they read a single claim.
// ──────────────────────────────────────────────────────────────────────────
const glimpses = [
  { src: "/meetup1/glimpse-2.jpg", alt: "The room mid-session at meetup #1 — laptops open, slides up" },
  { src: "/meetup1/group-selfie.jpg", alt: "The full group at The AI Workshop meetup #1 in Kolkata" },
  { src: "/meetup1/glimpse-1.jpg", alt: "Live walkthrough on the big screen at meetup #1" },
  { src: "/meetup1/hosts-trio.jpg", alt: "The hosts at meetup #1" },
  { src: "/meetup1/glimpse-4.jpg", alt: "Participants heads-down building at meetup #1" },
];

function MeetupGlimpses({ onWatchRecap }: { onWatchRecap: () => void }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Respect reduced-motion: show a single static frame, no timer, no zoom.
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % glimpses.length), 3400);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border shadow-xl bg-muted"
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
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0",
            i === current && !reduced && "glimpse-kenburns"
          )}
        />
      ))}

      {/* Soft bottom scrim so the chips stay readable on any frame. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute top-3 left-3 rounded-full bg-black/55 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        Glimpses · Meetup #1 · 28 June
      </div>

      <button
        onClick={onWatchRecap}
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-foreground shadow-md hover:bg-white transition-colors"
      >
        ▶ Watch the 35s recap
      </button>

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

// Eased "quart" curve: a slow, weighty start and a soft, decelerating settle —
// noticeably more refined than the browser's built-in `behavior: "smooth"`.
function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

let scrollRAF = 0;

// Animate the window scroll to `targetY` with a distance-scaled duration, then
// run `onDone`. Bails out (without firing `onDone`) the moment the user takes
// over with the wheel, a touch, or the keyboard — so we never fight their input.
function animatedScrollTo(targetY: number, onDone?: () => void) {
  cancelAnimationFrame(scrollRAF);

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    onDone?.();
    return;
  }

  // Respect users who ask for less motion: jump instantly, skip the flourish.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  // Longer jumps take a little longer, but stay snappy (clamped 450–1000ms).
  const duration = Math.min(1000, Math.max(450, Math.abs(distance) * 0.5));
  const start = performance.now();

  const cleanup = () => {
    window.removeEventListener("wheel", onInterrupt);
    window.removeEventListener("touchstart", onInterrupt);
    window.removeEventListener("keydown", onInterrupt);
  };
  const onInterrupt = () => {
    cancelAnimationFrame(scrollRAF);
    cleanup();
  };
  window.addEventListener("wheel", onInterrupt, { passive: true });
  window.addEventListener("touchstart", onInterrupt, { passive: true });
  window.addEventListener("keydown", onInterrupt);

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOutQuart(t));
    if (t < 1) {
      scrollRAF = requestAnimationFrame(step);
    } else {
      cleanup();
      onDone?.();
    }
  };
  scrollRAF = requestAnimationFrame(step);
}

// On arrival, the section's first heading rises into place and an accent
// underline sweeps beneath it (see .arrive-heading in index.css). The underline
// is aligned to the heading's own text-align so it sits correctly under both
// centred and left-aligned headings.
function highlightArrival(section: HTMLElement) {
  const heading = section.querySelector<HTMLElement>("h1, h2, h3");
  if (!heading) return;

  const align = getComputedStyle(heading).textAlign;
  const isCenter = align === "center";
  const isRight = align === "right" || align === "end";
  heading.style.setProperty("--arrive-ml", isCenter || isRight ? "auto" : "0");
  heading.style.setProperty("--arrive-mr", isCenter || !isRight ? "auto" : "0");

  // Re-trigger the animation even if the class is already present.
  heading.classList.remove("arrive-heading");
  void heading.offsetWidth; // force reflow
  heading.classList.add("arrive-heading");
  window.setTimeout(() => heading.classList.remove("arrive-heading"), 1800);
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Mobile: the WhatsApp CTA starts as a compact bubble and "blows" open on tap.
  const [waOpen, setWaOpen] = useState(false);

  useEffect(() => {
    trackViewContent("Homepage", "Lander");
  }, []);

  // GSAP micro-animations (scroll reveals, counters, magnetic CTAs…).
  // Returns its own cleanup, so StrictMode's double-mount is handled.
  useEffect(() => initSiteAnimations(), []);

  const scrollTo = (id: string) => {
    // Close the mobile menu *first*. While it's open, the expanded menu adds
    // height to the sticky nav, which shifts the whole page down. If we measured
    // the target now and then let the menu collapse, the page would jump up and
    // the scroll would overshoot — landing mid-section. So we defer the measure
    // until after the menu has collapsed and the layout is final.
    setMobileMenuOpen(false);

    const run = () => {
      const el = document.getElementById(id);
      if (!el) return;

      // Offset for the sticky nav so content isn't hidden under it.
      const NAV_OFFSET = 72;

      // Always anchor to the section's own top so you land on its heading —
      // e.g. "Become a Host" lands on the heading, not the form below it.
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY;
      const isMobile = window.innerWidth < 768;
      const bottomInset = isMobile ? 80 : 0; // mobile sticky CTA bar
      const usable = window.innerHeight - NAV_OFFSET - bottomInset;

      // On mobile, always pin the target's top just below the nav so you land
      // at the start of the section rather than mid-content. On desktop, centre
      // a short target in the usable viewport for a nicer look; if it's taller
      // than that space, pin its top below the nav instead.
      const y =
        isMobile || rect.height >= usable
          ? targetTop - NAV_OFFSET - 12
          : targetTop - NAV_OFFSET - (usable - rect.height) / 2;
      animatedScrollTo(Math.max(0, y), () => highlightArrival(el));
    };

    // Two frames: one for React to re-render with the menu closed, one for the
    // browser to lay out before we read the target's final position.
    requestAnimationFrame(() => requestAnimationFrame(run));
  };

  // All "Book your seat" CTAs lead to the dedicated booking page.
  const goToBook = () => {
    setMobileMenuOpen(false);
    window.location.href = "/book";
  };

  const workshopTopics = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Edit by Conversation",
      desc: "No timelines, no software — just tell Claude what you want.",
    },
    {
      icon: <Scissors className="h-6 w-6" />,
      title: "Cuts, Trims & Stitching",
      desc: "Turn raw phone clips into one tight, watchable edit.",
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Subtitles, Grades & Audio",
      desc: "Auto-captions, colour grading and clean sound — done for you.",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "Export a Share-Ready Reel",
      desc: "Walk out with a finished reel, cut for Instagram & YouTube.",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Reading progress — a hairline gradient that fills as you scroll. */}
      <div
        id="scroll-progress"
        className="fixed top-0 inset-x-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
      />

      {/* Announcement Bar */}
      <button
        onClick={goToBook}
        className="block w-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-center text-xs sm:text-sm font-medium py-2.5 px-4 hover:opacity-95 transition-opacity"
      >
        <span className="inline-flex items-center gap-x-1.5 gap-y-0.5 flex-wrap justify-center">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Workshop #2 · Automate video editing with AI</span>
          <span className="hidden sm:inline">· Kolkata, Sun 26 July</span>
          <span>· Early-bird <strong>{inr(PRICE)}</strong></span>
          <span className="underline underline-offset-2">Reserve your spot →</span>
        </span>
      </button>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => scrollTo("hero")} className="flex items-center">
              <Logo iconClassName="h-9 w-auto" textClassName="text-xl" />
            </button>

            <div className="hidden md:flex items-center gap-7">
              <button onClick={() => scrollTo("workshop")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Workshop</button>
              <button onClick={() => scrollTo("roadmap")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">What's Next</button>
              <button onClick={() => scrollTo("work")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Community Builds</button>
              <button onClick={() => scrollTo("team")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hosts</button>
              <button onClick={() => scrollTo("host")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Become a Host</button>
              <button onClick={() => scrollTo("faq")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
              <Button onClick={goToBook} size="sm">
                Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <button
              className="md:hidden text-foreground p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button onClick={() => scrollTo("workshop")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Workshop</button>
              <button onClick={() => scrollTo("roadmap")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">What's Next</button>
              <button onClick={() => scrollTo("work")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Community Builds</button>
              <button onClick={() => scrollTo("team")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Hosts</button>
              <button onClick={() => scrollTo("host")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Become a Host</button>
              <button onClick={() => scrollTo("faq")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">FAQ</button>
              <Button onClick={goToBook} size="sm" className="w-full">
                Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section — community first. Before the workshop pitch, we lead with
          who we are: the mission, the vision, and an invitation to the community. */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div data-drift className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div data-drift className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        {/* Living constellation — the brand's node network, gently drifting. */}
        <HeroCanvas />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          {/* Screen one: the message on the left, living proof on the right. */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm sm:text-base font-bold text-primary mb-5">
                <Users className="h-5 w-5" />
                The AI Workshop Community
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                AI is for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  everyone
                </span>{" "}
                — not just engineers.
              </h1>

              <p className="mx-auto lg:mx-0 mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground">
                We're a Kolkata community making AI practical and hands-on for everyone —
                business owners, freelancers, students, anyone curious. No jargon, no gatekeeping.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white hover:bg-[#1ebe57] transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Join the community
                </a>
                <Button size="lg" variant="outline" onClick={() => scrollTo("workshop")} className="text-base px-8 py-6 w-full sm:w-auto">
                  Explore Workshop #02 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <p className="mt-5 text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0" />
                60+ members · Meetup #1 done ✓ · Next: Sun, 26 July
              </p>
            </div>

            {/* Meetup #1 glimpses — confidence, right where eyes land first. */}
            <MeetupGlimpses onWatchRecap={() => scrollTo("meetup")} />
          </div>

          {/* Mission / vision artifact cards.
              Desktop: 3-up grid. Mobile: an auto-advancing carousel. */}
          <div className="mt-14">
            <div data-reveal-children className="hidden sm:grid sm:grid-cols-3 gap-5">
              {missionCards.map((c) => (
                <MissionCard key={c.label} {...c} />
              ))}
            </div>
            <div className="sm:hidden">
              <MissionCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Workshop pitch — the current use-case the community is running. */}
      <section id="workshop-pitch" className="relative overflow-hidden border-t border-border bg-muted/20">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-16 sm:pb-20 text-center">
          <p data-reveal className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
            Workshop #02 · Automate Video Editing with AI
          </p>

          <h2 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Turn raw footage into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              polished reels
            </span>{" "}
            — just by talking to AI.
          </h2>

          <p data-reveal className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-muted-foreground">
            No Premiere. No timelines. Tell Claude what you want — and watch your video edit itself.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Salt Lake, Kolkata · {WORKSHOP_DATE_LABEL}
          </div>

          {/* Compact value pointers */}
          <div data-reveal-children className="mt-8 flex flex-wrap items-start justify-center gap-x-8 sm:gap-x-12 gap-y-6">
            {[
              { icon: <Sparkles className="h-6 w-6" />, label: "No editing software" },
              { icon: <Clock className="h-6 w-6" />, label: "2 hours" },
              { icon: <Film className="h-6 w-6" />, label: "Your own reel" },
              { icon: <Wand2 className="h-6 w-6" />, label: "Just Claude" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {p.icon}
                </div>
                <span className="text-sm font-semibold text-foreground">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Price pill */}
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
            <span className="text-2xl font-extrabold text-foreground">{inr(PRICE)}</span>
            <span className="text-sm font-medium text-muted-foreground">community early-bird</span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Editors charge <strong className="text-foreground">₹2,000–₹5,000 per video</strong> for the same thing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button data-magnetic size="lg" onClick={goToBook} className="text-base px-8 py-6 w-full sm:w-auto font-bold shadow-md hover:shadow-lg transition-shadow">
              Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("meetup")} className="text-base px-8 py-6 w-full sm:w-auto">
              See meetup #1 highlights
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-accent" />
            100% beginner-friendly · Secure Razorpay payment · Walk away with a finished reel
          </p>

          {/* Meta row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{WORKSHOP_DATE_LABEL}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{WORKSHOP_TIME_LABEL} ({WORKSHOP_DURATION_LABEL})</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Small batch · real attention</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proof band — real traction in place of stock photos / fake testimonials.
          Founding-cohort framing turns "Workshop #01, no alumni yet" into a draw. */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-center">
            {[
              { value: "50+", label: "in the community, growing daily" },
              { value: "Small", label: "batch — everyone gets real attention" },
              { value: "100%", label: "beginner-friendly" },
              { value: "Sun 28", label: "your build-&-launch day" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            You'd be part of the founding cohort of The AI Workshop.{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="font-semibold text-primary hover:underline"
            >
              See the community →
            </a>
          </p>
        </div>
      </section>

      {/* Community Builds / Portfolio Section */}
      <section id="work" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Star className="h-4 w-4" />
              Community Builds
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Real websites, built with the exact tools we'll teach you
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No agencies. No code. Each one started as a sentence typed into AI — same as yours will.
            </p>
          </div>

          {/* Desktop: 3-col grid */}
          <div data-reveal-children className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((p) => (
              <PortfolioThumb key={p.name} {...p} />
            ))}
          </div>

          {/* Mobile: auto-advancing carousel */}
          <div className="sm:hidden">
            <PortfolioCarousel />
          </div>

          <p className="mt-8 text-center text-muted-foreground">
            This very website? Vibe-coded too.{" "}
            <button onClick={goToBook} className="font-semibold text-primary hover:underline">
              Learn how to build your own →
            </button>
          </p>
        </div>
      </section>

      {/* Team Section — right after the community builds: who teaches builds trust early. */}
      <section id="team" className="py-20 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Meet Your Workshop Hosts
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three brothers who believe AI should be for everyone — not just engineers.
            </p>
          </div>

          {/* Desktop: 3-up grid. Mobile: an auto-advancing carousel. */}
          <div data-reveal-children className="hidden sm:grid sm:grid-cols-3 gap-10 sm:gap-8 max-w-4xl mx-auto">
            {hosts.map((h) => (
              <HostCard key={h.name} {...h} />
            ))}
          </div>
          <div className="sm:hidden">
            <HostCarousel />
          </div>
        </div>
      </section>

      {/* Become a Host Section — pulled up to follow the real-websites proof,
          riding the momentum from "look what the community built". */}
      <section id="host" className="py-20 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              Become a host
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Implemented AI in your business? Teach it.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Can you run a 3-hour hands-on session on your use-case? Fill out the form below.
            </p>
          </div>

          <BecomeHost />
        </div>
      </section>

      {/* Workshop Section */}
      <section id="workshop" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              <Film className="h-4 w-4" />
              Workshop #2 · Automate Video Editing with AI
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              From raw footage to a finished reel — in 2 hours
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Bring clips from your phone. Leave with an edited, subtitled reel — and a workflow you keep forever.
            </p>
            {/* Why video at all — the basic, important case, kept short. */}
            <p className="mt-5 inline-flex items-start gap-2 rounded-xl bg-accent/5 border border-accent/15 px-4 py-3 text-left text-sm text-muted-foreground">
              <Film className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-foreground">Why video?</strong> In 2026 reels and shorts are how
                people discover you. The footage is easy — editing is the bottleneck. AI removes it.
              </span>
            </p>
          </div>

          {/* Workshop Details Card */}
          <Card className="mb-12 overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-foreground mb-6">What You'll Learn</h3>
                  <div data-reveal-children className="space-y-6">
                    {workshopTopics.map((topic, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {topic.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{topic.title}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">{topic.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-primary/5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Workshop Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{WORKSHOP_DATE_LABEL}</p>
                          <p className="text-sm text-muted-foreground">Mark your calendar</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{WORKSHOP_TIME_LABEL}</p>
                          <p className="text-sm text-muted-foreground">{WORKSHOP_DURATION_LABEL}, hands-on</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Salt Lake, Kolkata</p>
                          <p className="text-sm text-muted-foreground">Exact location shared after registration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Small batch</p>
                          <p className="text-sm text-muted-foreground">Founding cohort — small enough for real attention</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Claude subscription required</p>
                          <p className="text-sm text-muted-foreground">It's the AI that does the editing — we'll help you set it up</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={goToBook} className="mt-8 w-full font-bold shadow-md hover:shadow-lg transition-shadow" size="lg">
                    Save my seat — {inr(PRICE)} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The same reel, a fraction of the price — compact comparison strip. */}
          <div data-reveal className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  The same reel. A fraction of the price.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pay an editor for every video. Or learn it once — and never pay again.
                </p>
                <p className="mt-3 text-sm text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent flex-shrink-0" />
                  A single reel pays for the workshop ~4× over. The skill pays forever.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 rounded-xl border border-border/60 bg-background/60 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hire an editor</p>
                  <p className="mt-1 text-xl font-extrabold text-foreground line-through decoration-destructive/60">₹2,000+/video</p>
                  <p className="mt-1 text-xs text-muted-foreground">Days of back-and-forth · pay per video, forever</p>
                </div>
                <div className="flex-1 rounded-xl border border-primary/40 bg-card p-4 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">This workshop</p>
                  <p className="mt-1 text-xl font-extrabold text-foreground">{inr(PRICE)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">A finished reel in 2 hours · a skill you keep for life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next / Roadmap Section */}
      <section id="roadmap" className="py-20 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              <TrendingUp className="h-4 w-4" />
              This is just the beginning
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Workshop #1 is done. The series continues.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Use-case #1 shipped — real websites, live on the internet. Next up: video.
            </p>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-3 gap-5">
            <Card className="relative border-border/60">
              <div className="absolute -top-3 left-6 rounded-full bg-[#25D366]/15 px-3 py-1 text-xs font-semibold text-[#128C46]">
                Done ✓ · 28 June
              </div>
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Workshop #01</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Build Your Own Website</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The founding cohort walked in with ideas and walked out with live websites they own.
                </p>
              </CardContent>
            </Card>

            <Card className="relative border-primary/40 bg-primary/5 shadow-sm">
              <div className="absolute -top-3 left-6 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                Up next · 26 July
              </div>
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Film className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Workshop #02</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Automate Video Editing</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Cuts, subtitles, grades and exports — done by talking to Claude, not dragging timelines.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">You decide</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Your Use-Case, Next</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Tell us the problem you want solved. The community shapes which use-case we build next.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-center text-muted-foreground">
            First-of-its-kind, use-case-based, and fully offline.{" "}
            <a
              href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Join the community to shape what's next →
            </a>
          </p>

          <div className="mt-6 flex flex-col items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => scrollTo("host")}>
              <Sparkles className="mr-1.5 h-4 w-4" /> Become a Host
            </Button>
            <p className="text-sm text-muted-foreground">
              Got a use-case of your own? Teach it in the next workshop.
            </p>
          </div>
        </div>
      </section>

      {/* Meetup #1 recap — proof the community is real: photos + the recap reel.
          The reel itself was edited with Claude + FFmpeg — i.e. exactly what
          Workshop #2 teaches — so it doubles as a live demo of the outcome. */}
      <section id="meetup" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Users className="h-4 w-4" />
              Meetup #1 · 28 June · Kolkata
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              The first meetup, in 35 seconds
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real people, real laptops, real websites shipped. And here's the kicker —
              this recap reel was edited by talking to Claude. That's exactly what
              Workshop #2 teaches.
            </p>
          </div>

          <div data-reveal-children className="grid gap-5 sm:grid-cols-3 items-start">
            {/* The reel — vertical, click to play */}
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-none overflow-hidden rounded-2xl border border-primary/20 shadow-md bg-black">
              <video
                src="/meetup1/recap.mp4"
                poster="/meetup1/recap-poster.jpg"
                controls
                playsInline
                preload="none"
                className="aspect-[9/16] w-full object-cover"
              />
              <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                ▶ Recap reel — edited with Claude
              </div>
            </div>

            {/* Photos */}
            <div className="sm:col-span-2 grid gap-5">
              <figure className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <img
                  src="/meetup1/group-selfie.jpg"
                  alt="The full group at The AI Workshop meetup #1 in Kolkata"
                  loading="lazy"
                  className="w-full object-cover"
                />
                <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">
                  The founding cohort — business owners, freelancers and students, all shipping together.
                </figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-5">
                <figure className="overflow-hidden rounded-2xl border border-border shadow-sm">
                  <img
                    src="/meetup1/hosts-trio.jpg"
                    alt="Hosts at The AI Workshop meetup #1"
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </figure>
                <div className="flex flex-col justify-center rounded-2xl border border-accent/20 bg-accent/5 p-5">
                  <p className="text-3xl font-extrabold text-foreground">You're next</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Meetup #2 is a small batch again — real attention, hands-on,
                    and a finished reel to take home.
                  </p>
                  <Button size="sm" onClick={goToBook} className="mt-4 w-full font-bold">
                    Book for 26 July <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Show of Interest Section — for people who want similar / future workshops. */}
      <section id="interest" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Bell className="h-4 w-4" />
              Show of interest
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Want workshops like this in the future?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Can't make this one, or curious about a different use-case? Leave your details and
              we'll let you know when the next workshop that fits you is announced.
            </p>
          </div>

          <InterestForm />
        </div>
      </section>

      {/* AI Tools Section — pulled down: a light "tools we use" footnote, not a headline. */}
      <section className="py-14 border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-10 tracking-wide uppercase">
            The AI tools you'll actually use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {/* ChatGPT */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10a37f]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#10a37f"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">ChatGPT</span>
            </div>

            {/* Claude */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97757]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#d97757"><circle cx="12" cy="12" r="10"/><path d="M8 12l2-6 2 6m-3.5-2h3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Claude</span>
            </div>

            {/* Vercel */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 1L24 22H0z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Vercel</span>
            </div>

            {/* Cursor */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#7c3aed"><path d="M5.5 3l13 9-13 9V3z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Cursor</span>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion data-reveal-children type="single" collapsible className="space-y-3">
            <AccordionItem value="q1" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Do I need any video-editing experience?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                None at all. If you can chat on WhatsApp, you can edit with Claude — that's the whole point.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q-price" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Why is it only {inr(PRICE)} when editors charge so much more?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                It just covers our venue and running costs — we're a community, not a business. Editors charge ₹2,000–₹5,000 per video; here you learn to do it yourself and never pay again.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q-domain" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Do I need to buy any editing software?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                No editing software — no Premiere, no trials. You will need a Claude subscription (that's the AI doing the editing); everything else is free and open-source, and we set it all up together, live in the session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Will I actually walk out with a finished reel?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes. In 2 hours you'll cut real footage into a subtitled, share-ready reel yourself — not just watch a demo. Our own meetup recap reel on this page was edited exactly this way.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What do I need to bring?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Your laptop with a Claude subscription active, and a few raw clips on your phone if you'd like to edit your own footage. No clips? No problem, we'll have sample footage ready. No installs needed beforehand.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Which tools will we actually use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Claude, plus free open-source tools like FFmpeg and Whisper — for cuts, colour grading and auto-subtitles. The same stack we used to edit our meetup #1 recap reel.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What if I need help after the workshop?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                You'll join our WhatsApp support group — ask questions anytime, even after the workshop.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Where in Kolkata is the workshop?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                In Salt Lake, Kolkata — a comfortable, well-connected spot. The exact location is shared with participants after registration.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Will there be more workshops after this?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes — this is workshop #2 of a growing series. Workshop #1 (build your own website) already happened on 28 June. Register and you'll be first to know about #3.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* WhatsApp Community Section */}
      <section className="py-12 bg-[#25D366]/5 border-y border-[#25D366]/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <h3 data-count className="text-lg font-semibold text-foreground">60+ members and growing daily</h3>
              <p className="text-sm text-muted-foreground">Join the founding community — swap AI tips, help shape what we build next, and get first dibs on every future workshop.</p>
            </div>
            <a
              href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp")}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] transition-colors"
            >
              Join the Community <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div data-drift className="pointer-events-none absolute -top-10 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div data-drift className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div data-reveal className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to edit videos by talking to AI?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Small batch. Real attention. {WORKSHOP_DATE_LABEL}.
          </p>
          <Button data-magnetic size="lg" onClick={goToBook} className="mt-8 text-base px-8 py-6 font-bold shadow-md hover:shadow-lg transition-shadow">
            Book your seat — {inr(PRICE)} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Secure Razorpay payment · Walk away with a finished reel
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        {/* Extra bottom padding so the fixed WhatsApp floater (bottom-right) never
            covers the contact links — on mobile it sits higher (above the sticky
            CTA bar), so both sizes need the clearance. */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-28">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Logo iconClassName="h-8 w-auto" textClassName="text-lg" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href="tel:+919830715557"
                onClick={() => trackContact("phone")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 98307 15557
              </a>
              <a
                href="mailto:theaiworkshop.in@gmail.com"
                onClick={() => trackContact("email")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                theaiworkshop.in@gmail.com
              </a>
              <a
                href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp")}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:underline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Community
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-lg px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-foreground">{inr(PRICE)}</span>
            <span className="text-xs font-medium text-muted-foreground">early-bird</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Small batch · limited seats</p>
        </div>
        <Button onClick={goToBook} className="flex-1 max-w-[60%] font-bold">
          Book your seat <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>

      <ScrollButtons />

      {/* WhatsApp Floating CTA.
          Desktop: a full labelled pill — the value prop is always visible.
          Mobile: a compact icon-only bubble so it doesn't crowd the screen.
          Tapping the WhatsApp icon toggles it open ("blows up" into the full
          CTA) and closed again; tapping the label joins the community. */}
      <div className="group fixed bottom-24 right-4 sm:right-6 md:bottom-6 z-50 flex items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:bg-[#1ebe57] hover:shadow-xl md:hover:-translate-y-0.5">
        {/* Pulsing notification dot — classic "you've got something" attention cue */}
        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-background" />
        </span>

        {/* Icon = expand/contract toggle on mobile; opens WhatsApp on desktop. */}
        <button
          type="button"
          onClick={() => {
            if (window.innerWidth < 768) {
              setWaOpen((o) => !o);
              return;
            }
            trackContact("whatsapp");
            window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
          }}
          className="flex shrink-0 items-center justify-center"
          aria-label={waOpen ? "Collapse the community button" : "Join the free WhatsApp community"}
          aria-expanded={waOpen}
        >
          <WhatsAppIcon className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
        </button>

        {/* Label expands from 0-width so the bubble "blows" open smoothly; it's the
            tap target that actually joins the community. */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("whatsapp")}
          tabIndex={waOpen ? 0 : -1}
          className={cn(
            "flex flex-col items-start overflow-hidden whitespace-nowrap pr-1 leading-tight transition-all duration-300",
            waOpen
              ? "ml-2.5 max-w-[220px] opacity-100"
              : "pointer-events-none max-w-0 opacity-0 md:pointer-events-auto md:ml-2.5 md:max-w-[220px] md:opacity-100",
          )}
        >
          <span className="text-sm font-bold">Join the community</span>
          <span className="text-[11px] font-medium text-white/85">New &amp; growing daily — get in early</span>
        </a>
      </div>
    </div>
  );
}

export default App;
