import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Registration } from "@/components/Registration";
import { usePageSeo } from "@/hooks/usePageSeo";
import {
  PRICE,
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  TOTAL_SEATS,
  PHONE_TEL,
  PHONE_DISPLAY,
  BRING_LABEL,
  inr,
} from "@/config";
import { trackViewContent } from "@/analytics";
import { ArrowLeft } from "lucide-react";

export default function BookPage() {
  usePageSeo("book");
  useEffect(() => {
    trackViewContent("Workshop Booking Page", "Workshop Registration", PRICE);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a href="/" aria-label="The AI Workshop home">
            <Logo iconClassName="h-8 w-auto" textClassName="text-lg" />
          </a>
          <a
            href="/workshop"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> Details
          </a>
        </div>
      </header>
      <main>
        <section className="border-b border-border py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold text-primary">
              {WORKSHOP_DATE_LABEL} · Offline in Salt Lake
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Reserve your seat
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-balance">
              {WORKSHOP_TITLE}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              One vertical ad, built end to end: face lock, base stills,
              motion, voice.
              <br />
              {WORKSHOP_TIME_LABEL} · {TOTAL_SEATS} seats · {inr(PRICE)}
            </p>
          </div>
        </section>
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Registration />
            <div className="mt-8 rounded-2xl border border-border p-5">
              <h2 className="font-semibold">Before you arrive</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {BRING_LABEL}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Exact venue shared after reservation. Check travel or
                accessibility before booking:{" "}
                <a
                  className="font-semibold text-primary underline"
                  href={`tel:${PHONE_TEL}`}
                >
                  {PHONE_DISPLAY}
                </a>
                . The ticket covers the room and the system; image, video,
                and voice credits are your own.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-5 px-4 text-sm text-muted-foreground">
          <a href="/">Home</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/refund">Refunds</a>
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </div>
      </footer>
    </div>
  );
}
