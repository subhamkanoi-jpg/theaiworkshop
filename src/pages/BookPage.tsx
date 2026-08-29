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
  WORKSHOP_TITLE,
  WORKSHOP_NUMBER,
  TOTAL_SEATS,
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
  Wand2,
  MessageSquareText,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function BookPage() {
  useEffect(() => {
    document.title = `Book Your Seat — ${WORKSHOP_TITLE} | The AI Workshop #${WORKSHOP_NUMBER}, Kolkata`;
    trackViewContent("Workshop Booking Page", "Workshop Registration", PRICE);
  }, []);

  useEffect(() => initSiteAnimations(), []);

  const facts = [
    { icon: <Calendar className="h-4 w-4 text-primary" />, label: WORKSHOP_DATE_LABEL },
    { icon: <Clock className="h-4 w-4 text-primary" />, label: `${WORKSHOP_TIME_LABEL} (3 hrs)` },
    { icon: <MapPin className="h-4 w-4 text-primary" />, label: "Salt Lake, Kolkata" },
    { icon: <Users className="h-4 w-4 text-primary" />, label: `${TOTAL_SEATS} seats · tables of 8` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div
        id="scroll-progress"
        className="fixed top-0 inset-x-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
      />

      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex h-14 sm:h-16 items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo iconClassName="h-9 w-auto" textClassName="text-xl" />
          </a>
          <a
            href="/workshop"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Details
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div data-drift className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div data-drift className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl hidden md:block" />
        <div className="hidden md:block">
          <HeroCanvas />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-16 text-center">
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            AI is for the ones who show up
          </div>
          <p data-reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            Workshop #{String(WORKSHOP_NUMBER).padStart(2, "0")} · {WORKSHOP_TITLE}
          </p>
          <h1 data-hero-words className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Reserve your seat
          </h1>
          <p data-reveal className="mt-3 text-[17px] sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Talk for a few minutes. Walk out with a week of finished work.
            Community price <strong className="text-foreground">{inr(PRICE)}</strong>.
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

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span data-reveal className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> 60+ members in the community
          </span>
          <span data-reveal className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> #1 websites · #2 reels
          </span>
          <span data-reveal className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Offline · Kolkata
          </span>
        </div>
      </section>

      <section className="relative overflow-hidden py-8 sm:py-16">
        <div data-drift className="pointer-events-none absolute -top-10 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl hidden md:block" />
        <div data-drift className="pointer-events-none absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl hidden md:block" />
        <div className="hidden md:block">
          <HeroCanvas />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Registration />

          <p data-reveal className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            100% beginner-friendly · Secure Razorpay payment · Walk away with a week of work
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-11">
            <p data-reveal className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              What you&apos;ll walk away with
            </p>
            <h2 data-reveal className="font-serif text-[1.75rem] sm:text-4xl font-semibold tracking-tight text-foreground leading-[1.12]">
              Not notes. A week of work.
            </h2>
            <p data-reveal className="mt-3 text-muted-foreground max-w-xl mx-auto">
              The magic is work that did not exist at 11am, sitting on your phone at 2.
            </p>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <MessageSquareText className="h-6 w-6" />,
                title: "Bio, offer, seven posts",
                desc: "Made from how you actually talk — not brochure-English.",
              },
              {
                icon: <Wand2 className="h-6 w-6" />,
                title: "The recipe, saved",
                desc: "A Gem on a free Google account. Tuesday still works.",
              },
              {
                icon: <Download className="h-6 w-6" />,
                title: "No paid software",
                desc: "Phone plus a free Google account. Laptop if you have one.",
              },
              {
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: "The unlocked door",
                desc: "This kit is what shops already pay ₹3,000–₹8,000 for.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 sm:gap-5 rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-e1"
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

      <footer className="border-t border-border bg-muted/30 safe-bottom">
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
