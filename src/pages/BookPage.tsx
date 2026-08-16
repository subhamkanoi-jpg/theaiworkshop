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
  Film,
  Wand2,
  Captions,
  Download,
  MessageSquareText,
} from "lucide-react";

/**
 * Standalone, distraction-free booking page served at /book.
 * Ideal as the destination for ad campaigns and shared links.
 */
export default function BookPage() {
  useEffect(() => {
    document.title = "Book Your Seat — The AI Workshop #2 | Kolkata, 30 August";
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

      {/* Social proof strip — this isn't a one-off; there's a real room behind it. */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span data-reveal className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> 60+ members in the community
          </span>
          <span data-reveal className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Meetup #1 sold out
          </span>
          <span data-reveal className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Offline · Kolkata
          </span>
        </div>
      </section>

      {/* What you'll walk away with */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-11">
            <p data-reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              What you&apos;ll walk away with
            </p>
            <h2 data-reveal className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12]">
              Not notes. A finished reel.
            </h2>
            <p data-reveal className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
              You leave the room with the video made and the whole workflow in your pocket — ready to
              do it again the next morning.
            </p>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Film className="h-6 w-6" />,
                title: "A polished, subtitled reel",
                desc: "Built live from your own footage during the session — export it before you leave.",
              },
              {
                icon: <Wand2 className="h-6 w-6" />,
                title: "The complete Claude workflow",
                desc: "The exact prompts and steps to cut, caption and export — yours to keep and reuse forever.",
              },
              {
                icon: <Download className="h-6 w-6" />,
                title: "A zero-cost toolkit",
                desc: "No paid editing software. Claude plus free, open-source tools — we set it all up with you.",
              },
              {
                icon: <MessageSquareText className="h-6 w-6" />,
                title: "Lifetime support circle",
                desc: "Prompt kit, cheat sheets and a WhatsApp group of people doing the same thing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-e1"
              >
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the two hours flow */}
      <section className="border-b border-border bg-muted/20 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-11">
            <p data-reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              How the two hours flow
            </p>
            <h2 data-reveal className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12]">
              Show up with footage. Leave with a reel.
            </h2>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                icon: <Film className="h-5 w-5" />,
                title: "Bring your footage",
                desc: "Any raw clips from your phone — a product, your storefront, a piece to camera. That's all you need.",
              },
              {
                step: "02",
                icon: <Wand2 className="h-5 w-5" />,
                title: "Talk to Claude",
                desc: "Together we cut, tidy and shape it — just by describing what you want in plain words. No timelines, no jargon.",
              },
              {
                step: "03",
                icon: <Captions className="h-5 w-5" />,
                title: "Caption & export",
                desc: "Auto-subtitles, a clean finish, and a reel that's ready to post before you walk out the door.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-7 shadow-e1">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {s.icon}
                  </span>
                  <span className="font-serif text-3xl font-semibold text-primary/25">{s.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
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
            <a href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="/refund" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Refunds</a>
          </div>
        </div>
      </footer>
      <ScrollButtons />
    </div>
  );
}
