import { useState } from "react";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  PRICE,
  inr,
} from "@/config";
import { Copy, Share2 } from "lucide-react";

const SHARE_TEXT = `Still writing every work follow-up from scratch?

Join The AI Workshop in Salt Lake, Kolkata: ${WORKSHOP_TITLE}.

Turn rough notes from a meeting, customer enquiry, or client call into a recap, action list, and follow-up draft. Build your own reusable assistant—no coding or paid AI subscription required. You review and send; nothing is sent automatically.

${WORKSHOP_DATE_LABEL}
${WORKSHOP_TIME_LABEL} · ${inr(PRICE)} · Offline
Laptop recommended. Beginners welcome.

https://www.theaiworkshop.in/workshop`;

export default function SharePage() {
  usePageSeo("share");
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(SHARE_TEXT);
      setStatus("Invitation copied.");
    } catch {
      setStatus(
        "Copy unavailable. Select and copy the invitation below, or use Share on WhatsApp.",
      );
    }
  }
  return (
    <SiteShell sticky={false}>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary">
            Bring someone who would use this
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight">
            A useful Sunday,
            <br />
            better with a friend.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Know someone whose meetings end with a pile of follow-ups? Send them
            the plan. No AI experience needed.
          </p>
          <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground">
            <img
              src="/meetup1/group-selfie.jpg"
              width={900}
              height={600}
              alt="Participants and hosts at the first AI Workshop in June 2026"
              className="aspect-video w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold">{WORKSHOP_TITLE}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {WORKSHOP_DATE_LABEL}
                <br />
                {WORKSHOP_TIME_LABEL} · Salt Lake · {inr(PRICE)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
            >
              <Share2 className="size-4" />
              Share on WhatsApp
            </a>
            <button
              onClick={copy}
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-base font-semibold"
            >
              <Copy className="size-4" />
              Copy invitation
            </button>
          </div>
          <p role="status" className="mt-3 text-sm text-muted-foreground">
            {status}
          </p>
          <details className="mt-5 border-t border-border pt-5">
            <summary className="cursor-pointer font-semibold">
              Read the invitation
            </summary>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {SHARE_TEXT}
            </p>
          </details>
          <a
            href="/book"
            className="mt-7 inline-flex min-h-11 items-center font-semibold text-primary"
          >
            Reserve your own seat →
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
