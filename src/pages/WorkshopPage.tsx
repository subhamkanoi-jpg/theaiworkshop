import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  PRICE,
  TOTAL_SEATS,
  BRING_LABEL,
  PHONE_TEL,
  inr,
  workshopContent,
} from "@/config";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function WorkshopPage() {
  usePageSeo("workshop");
  return (
    <SiteShell current="workshop">
      <section id="hero" className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "27 September workshop" }]} />
          <p className="mb-4 text-sm font-semibold text-primary">
            One finished ad · No filmmaking background · In person
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            {WORKSHOP_TITLE}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {workshopContent.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {WORKSHOP_DATE_LABEL}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              {WORKSHOP_TIME_LABEL}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Salt Lake, Kolkata
            </span>
          </div>
          <div className="mt-8">
            <ReserveButton />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {inr(PRICE)} · {TOTAL_SEATS} seats · Laptop required
          </p>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            Not another prompt collection. One rendered ad and the recipe that
            made it.
          </h2>
          <ul className="mt-7 flex flex-col gap-4">
            {workshopContent.outcomes.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            The recipe is a stack of prompts, one per stage, that you keep on
            your own laptop. Each stage takes the approved output of the last
            one and hands a single result to the next. That is the whole trick:
            no stage starts from a blank window, and nothing gets carried
            forward in four competing versions.
          </p>
          <a
            href="/#recipe"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
          >
            See the system before you book <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
      <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary">
            The full three hours
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">
            Four blocks. Every one ends with a file.
          </h2>
          <ol className="mt-8 flex flex-col gap-7">
            {workshopContent.agenda.map((step) => (
              <li
                key={step.time}
                className="flex flex-col gap-2 border-b border-border pb-6"
              >
                <p className="text-sm font-semibold text-primary">
                  {step.time}
                </p>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Bring this</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {BRING_LABEL}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A phone is not enough for this one. Power strips and table
                Wi-Fi are provided, so bring the charger and not the anxiety.
                Sign in to your tool accounts before you arrive, and top up
                credits beforehand if you want to render the full ad on the day
                — password recovery is a miserable way to spend block one.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Whose face, whose voice
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                The actor we build is generated, not cloned from a real person.
                Do not upload photographs of anybody who has not agreed to it,
                and if you clone a voice, clone your own. No confidential client
                files, contracts, or unreleased product material. Follow your
                employer&apos;s AI policy.
              </p>
            </div>
          </div>
          <p className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 text-base leading-relaxed text-foreground">
            <strong>What this is not:</strong> a media-buying class, a
            promise about how your ad will perform, or a tour of forty tools.
            It is one workflow, run end to end, until a file exists.
          </p>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Good questions</h2>
          <div className="mt-7">
            {workshopContent.faqs.map((faq) => (
              <details key={faq.q} className="border-b border-border py-4">
                <summary className="cursor-pointer font-semibold leading-relaxed">
                  {faq.q}
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            One useful Sunday. {inr(PRICE)}.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A three-hour guided production run, a table captain, and the prompt
            stack you keep. Image, video, and voice credits are your own. Pay
            online or reserve to pay cash at the venue.
          </p>
          <div className="mt-7">
            <ReserveButton />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Exact venue shared after reservation. Questions about travel or
            accessibility?{" "}
            <a
              className="font-semibold text-primary underline"
              href={`tel:${PHONE_TEL}`}
            >
              Call us before booking.
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
