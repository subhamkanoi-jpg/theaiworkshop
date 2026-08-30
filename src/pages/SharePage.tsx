import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { ScrollButtons } from "@/components/ScrollToTop";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  WORKSHOP_NUMBER,
  TOTAL_SEATS,
  PRICE,
  inr,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/config";
import { Calendar, Clock, MapPin, Users, Share2 } from "lucide-react";

const SHARE_URL = "https://www.theaiworkshop.in/share";
const SHARE_TEXT = `The AI Workshop. Kolkata's offline AI room in Salt Lake.

Vision: a beginner walks in, builds a real thing, and comes back.
Mission: one Sunday, one trick, work you can open on Tuesday.

Workshop #${WORKSHOP_NUMBER}: ${WORKSHOP_TITLE}
${WORKSHOP_DATE_LABEL}, ${WORKSHOP_TIME_LABEL}
${TOTAL_SEATS} seats. ${inr(PRICE)}. Salt Lake.

${SHARE_URL}`;

function whatsappHref() {
  return `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`;
}

export default function SharePage() {
  useEffect(() => {
    document.title = `Share The AI Workshop | ${WORKSHOP_TITLE}, 27 September`;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 flex h-14 sm:h-16 items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo iconClassName="h-8 w-auto" textClassName="text-lg" />
          </a>
          <a href="/book" className="text-sm font-medium text-[#c8553d]">
            Reserve a seat
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <div className="overflow-hidden rounded-3xl border border-[#c8553d]/20 bg-card shadow-e3">
          <img
            src="/og-share.jpg"
            alt="The AI Workshop. You talk. A week of work appears. Workshop #3, The Magic of AI, Sunday 27 September 2026, Salt Lake, 50 seats, ₹799."
            className="w-full aspect-[1200/630] object-cover"
          />

          <div className="px-6 py-6 space-y-5">
            <h1 className="font-serif text-2xl font-semibold text-foreground">
              Forward this card
            </h1>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-1.5">
                Vision
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/90">
                Kolkata's default place to learn applied AI with your own
                hands. Offline. A store, not a webinar.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-1.5">
                Mission
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/90">
                One Sunday, one trick, one artifact. You talk. You walk out
                with work that did not exist at 11am. You open it on Tuesday.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
                Workshop #{String(WORKSHOP_NUMBER).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                {WORKSHOP_TITLE}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_DATE_LABEL}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_TIME_LABEL}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#c8553d]" /> Salt Lake, Kolkata
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#c8553d]" /> {TOTAL_SEATS} seats · {inr(PRICE)}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white"
          >
            <Share2 className="h-4 w-4" /> Share on WhatsApp
          </a>
          <a
            href="/book"
            className="pressable inline-flex min-h-12 items-center justify-center rounded-full bg-[#c8553d] px-6 text-sm font-bold text-white"
          >
            Reserve a seat · {inr(PRICE)}
          </a>
          <a
            href="/#try"
            className="inline-flex min-h-11 items-center justify-center text-sm text-muted-foreground"
          >
            Try the 12-second trailer first
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Phone{" "}
          <a href={`tel:${PHONE_TEL}`} className="underline">
            {PHONE_DISPLAY}
          </a>
          . Forward this card as it is. The preview carries the poster.
        </p>
      </main>
      <ScrollButtons />
    </div>
  );
}
