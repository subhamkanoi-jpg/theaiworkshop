import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  PRICE,
  MARKET_VALUE,
  TOTAL_SEATS,
  BRING_SHORT,
  PHONE_TEL,
  inr,
  artifacts,
  workshopContent,
} from "@/config";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

/** Times and short titles; the long descriptions are gone. */
const RUN = [
  ["11:00", "Brief + face lock"],
  ["11:40", "Scenes + base stills"],
  ["12:40", "Motion + voice"],
  ["13:30", "QC + packaging"],
];

/** The five that decide whether to book. The rest live on /answers. */
const PRIMARY_FAQS = workshopContent.faqs.slice(0, 5);

export default function WorkshopPage() {
  usePageSeo("workshop");
  return (
    <SiteShell current="workshop">
      <section id="hero" className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "27 September workshop" }]} />
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            {WORKSHOP_TITLE}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Three hours. Five stages. One rendered ad.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {WORKSHOP_DATE_LABEL}
            </li>
            <li className="inline-flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {WORKSHOP_TIME_LABEL}
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Salt Lake, Kolkata
            </li>
          </ul>
          <div className="mt-7">
            <ReserveButton
              className="whitespace-nowrap"
              label={`Reserve · ${inr(PRICE)}`}
            />
          </div>
        </div>
      </section>

      {/* Five files, no prose. */}
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            You leave with five files.
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {artifacts.map((a, i) => (
              <li key={a.spec} className="slate">
                <div className="slate-head">
                  <span className="slate-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-4 sm:p-5">
                  <h3 className="font-serif text-xl font-semibold leading-snug">
                    {a.title}
                  </h3>
                  <p className="gate-term text-muted-foreground">{a.spec}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The call sheet. */}
      <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            The three hours.
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {RUN.map(([time, title], i) => (
              <li key={time} className="flex flex-col gap-2 bg-card p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Block {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl font-semibold tabular-nums text-primary">
                  {time}
                </span>
                <span className="text-base font-medium leading-snug">
                  {title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bring / don't bring, as chips. */}
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-9 sm:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold">Bring</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {BRING_SHORT.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold">Do not bring</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[
                  "Photos of other people",
                  "A voice that is not yours",
                  "Confidential client files",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Questions that decide the booking. */}
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Good questions</h2>
          <div className="mt-7 flex max-w-3xl flex-col">
            {PRIMARY_FAQS.map((faq) => (
              <details key={faq.q} className="border-b border-border py-4">
                <summary className="cursor-pointer font-semibold leading-snug">
                  {faq.q}
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <a
            href="/answers"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
          >
            Everything else <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="flex flex-wrap items-baseline justify-center gap-3">
            <span className="font-serif text-5xl font-semibold text-primary sm:text-6xl">
              {inr(PRICE)}
            </span>
            <span className="text-xl text-muted-foreground line-through">
              {inr(MARKET_VALUE)}
            </span>
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            {TOTAL_SEATS} seats · Tables of eight
          </p>
          <div className="mt-7 flex justify-center">
            <ReserveButton
              className="whitespace-nowrap"
              label={`Reserve · ${inr(PRICE)}`}
            />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Travel or accessibility question?{" "}
            <a className="font-semibold text-primary underline" href={`tel:${PHONE_TEL}`}>
              Call before booking.
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
