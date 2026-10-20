import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import { RunRail } from "@/components/RunRail";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_DAY_MONTH,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_WEEKDAY,
  WORKSHOP_TITLE,
  PRICE,
  MARKET_VALUE,
  TOTAL_SEATS,
  BRING_SHORT,
  PHONE_TEL,
  inr,
  artifacts,
  workshopContent,
  HERO,
  LEAD,
  ARTIFACTS_HEADING,
  RUN_HEADING,
  DO_NOT_BRING,
  PREP,
} from "@/config";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

/** The five that decide whether to book. The rest live on /answers. */
const PRIMARY_FAQS = workshopContent.faqs.slice(0, 5);

export default function WorkshopPage() {
  usePageSeo("workshop");
  return (
    <SiteShell current="workshop">
      <section id="hero" className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: `${WORKSHOP_DAY_MONTH} workshop` }]} />
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            {WORKSHOP_TITLE}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {HERO.sub}
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
          <p className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
            <img
              src={LEAD.photo}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
              style={{ objectPosition: LEAD.photoPosition }}
            />
            <span>
              Led by{" "}
              <span className="font-semibold text-foreground">{LEAD.name}</span>{" "}
              · {LEAD.role}, {LEAD.org}
            </span>
          </p>
          <div className="mt-7">
            <ReserveButton
              className="whitespace-nowrap"
              label={`Reserve · ${inr(PRICE)}`}
            />
          </div>
        </div>
      </section>

      {/* Five parts, no prose. */}
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            {ARTIFACTS_HEADING}
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
            {RUN_HEADING}
          </h2>
          <RunRail className="mt-8" />
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
                {DO_NOT_BRING.map((item) => (
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

      {/* What to set up at home, so the four hours go on building. */}
      {PREP.length > 0 && (
        <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-serif text-3xl font-semibold leading-tight">
              Before {WORKSHOP_WEEKDAY}
            </h2>
            <ol className="mt-7 grid max-w-3xl gap-3">
              {PREP.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 text-base leading-snug"
                >
                  <span className="font-serif text-xl font-semibold leading-none text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

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
