import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { HeroCanvas } from "@/components/HeroCanvas";
import { initSiteAnimations } from "@/lib/animations";
import { Registration } from "@/components/Registration";
import { ScrollButtons } from "@/components/ScrollToTop";
import {
  PRICE,
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  inr,
  PHONE_TEL,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
} from "@/config";
import { trackViewContent, trackContact } from "@/analytics";
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";

/**
 * Standalone, distraction-free booking page served at /book.
 * Ideal as the destination for ad campaigns and shared links.
 */
export default function BookPage() {
  useEffect(() => {
    document.title = "Book Your Seat — The AI Workshop #2 | Kolkata, 26 July";
    trackViewContent("Workshop Booking Page", "Workshop Registration", PRICE);
  }, []);

  // Same GSAP micro-animation engine as the homepage (scroll reveals, word
  // rise, drift blobs…). Returns its own cleanup — StrictMode-safe.
  useEffect(() => initSiteAnimations(), []);

  const facts = [
    { icon: <Calendar className="h-4 w-4 text-primary" />, label: WORKSHOP_DATE_LABEL },
    { icon: <Clock className="h-4 w-4 text-primary" />, label: `${WORKSHOP_TIME_LABEL} (2 hrs)` },
    { icon: <MapPin className="h-4 w-4 text-primary" />, label: "Salt Lake, Kolkata" },
    { icon: <Users className="h-4 w-4 text-primary" />, label: "A small batch" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress — same hairline gradient as the homepage. */}
      <div
        id="scroll-progress"
        className="fixed top-0 inset-x-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
      />

      {/* Slim header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex h-16 items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo iconClassName="h-9 w-auto" textClassName="text-xl" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div data-drift className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div data-drift className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        {/* Living constellation — same brand node network as the homepage. */}
        <HeroCanvas />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI is for everyone
          </div>
          <p data-reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            Workshop #02 · Automate Video Editing with AI
          </p>
          <h1 data-hero-words className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Reserve your seat
          </h1>
          <p data-reveal className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Turn raw footage into a polished, subtitled reel — by talking to Claude, no editing
            software. Early-bird <strong className="text-foreground">{inr(PRICE)}</strong>.
          </p>

          <div data-reveal-children className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                {f.icon}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking — the constellation's bookend, same as the homepage: opens
          the page in the hero above, quietly closes it here rather than
          being confined to screen one. */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div data-drift className="pointer-events-none absolute -top-10 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div data-drift className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <HeroCanvas />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Registration />

          <p data-reveal className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            100% beginner-friendly · Secure Razorpay payment · Walk away with a finished reel
          </p>
        </div>
      </section>

      {/* Slim footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center">
            <Logo iconClassName="h-7 w-auto" textClassName="text-base" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackContact("phone")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              onClick={() => trackContact("email")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
      <ScrollButtons />
    </div>
  );
}
