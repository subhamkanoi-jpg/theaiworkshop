import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReserveButton } from "@/components/ReserveButton";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  PRICE,
  TOTAL_SEATS,
  inr,
  workshopContent,
} from "@/config";
import { LOCAL } from "@/seo/local";

export default function KolkataPage() {
  usePageSeo("kolkata");
  return (
    <SiteShell>
      <section className="border-b border-border py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "Learn AI in Kolkata" }]} />
          <p className="text-sm font-semibold text-primary">
            Salt Lake · Kolkata · In person
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Learn AI in Kolkata.
            <br />
            Use it in your real work.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            The AI Workshop is an offline space for non-techies to build one
            useful project at a time. Join other professionals, business owners,
            and consultants. No coding background or previous workshop required.
          </p>
          <p lang="bn" className="mt-4 text-lg leading-relaxed">
            কলকাতায় AI শিখুন। সল্ট লেকে, নিজের হাতে। টেক ডিগ্রি লাগবে না।
          </p>
          <div className="mt-7">
            <ReserveButton />
          </div>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Next: {WORKSHOP_TITLE}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {workshopContent.description}
          </p>
          <p className="mt-4 text-base leading-relaxed">
            {WORKSHOP_DATE_LABEL} · {WORKSHOP_TIME_LABEL}
            <br />
            {inr(PRICE)} · {TOTAL_SEATS} seats · Laptop required
          </p>
          <a
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary"
            href="/workshop"
          >
            Read the full session plan →
          </a>
        </div>
      </section>
      <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Where in Kolkata?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Salt Lake Sector 1 (Bidhannagar), reachable on the Metro Green Line
            at Salt Lake or City Centre, and about five minutes by cab from
            Ultadanga and the EM Bypass. The exact unit is emailed as soon as
            you book. If you are travelling from New Town, Howrah, or elsewhere
            in Kolkata, check your route before setting out, and contact us
            before booking for travel or accessibility questions.
          </p>
          <address className="mt-6 not-italic text-base leading-relaxed">
            <span className="font-semibold">{LOCAL.venueName}</span>
            <br />
            {LOCAL.areaLine}
            <br />
            <a
              href={`tel:${LOCAL.phoneTel}`}
              className="text-primary underline"
            >
              {LOCAL.phoneDisplay}
            </a>
            <br />
            <a
              href={`mailto:${LOCAL.email}`}
              className="text-primary underline"
            >
              {LOCAL.email}
            </a>
          </address>
          <a
            href={LOCAL.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary"
          >
            Open Salt Lake Sector 1 on Google Maps →
          </a>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Built around real projects since June 2026
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our first workshop was about building and hosting websites. On 27
            September, the project is a complete AI video ad. The format
            stays the same: learn together, build on your own device, and leave
            with something useful.
          </p>
          <a
            href="/room"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary"
          >
            See the first workshop →
          </a>
          <div className="mt-7">
            <ReserveButton />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
