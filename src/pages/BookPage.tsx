import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Registration } from "@/components/Registration";
import {
  PRICE,
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  TOTAL_SEATS,
  inr,
  PHONE_TEL,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
} from "@/config";
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
    document.title = "Book Your Seat — The AI Workshop #1 | Kolkata, 28 June";
  }, []);

  const facts = [
    { icon: <Calendar className="h-4 w-4 text-primary" />, label: WORKSHOP_DATE_LABEL },
    { icon: <Clock className="h-4 w-4 text-primary" />, label: `${WORKSHOP_TIME_LABEL} (4 hrs)` },
    { icon: <MapPin className="h-4 w-4 text-primary" />, label: "Offline in Kolkata" },
    { icon: <Users className="h-4 w-4 text-primary" />, label: `A small batch of ${TOTAL_SEATS}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Slim header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="text-lg font-bold text-foreground">The AI Workshop</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-3">
            <Sparkles className="h-4 w-4" />
            AI is for everyone
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Workshop #01 · Build Your Own Website
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Reserve your seat
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Build & launch a real website you own — in one Sunday afternoon, no code. Early-bird{" "}
            <strong className="text-foreground">{inr(PRICE)}</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                {f.icon}
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Registration />

          <p className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            100% beginner-friendly · Secure Razorpay payment · Walk away with a live site
          </p>
        </div>
      </section>

      {/* Slim footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-bold text-foreground">The AI Workshop</span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
