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
            One project · No coding · In person
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
            {inr(PRICE)} · {TOTAL_SEATS} seats · Laptop recommended
          </p>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold leading-tight">
            Not another prompt collection. Your own working assistant.
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
            A Gem is a saved assistant inside Google Gemini. You give it a job,
            rules, and a preferred format. You still supply the notes, check the
            draft, and decide what to send. If Gem creation is unavailable, we
            save the same instructions for use in a normal chat.
          </p>
          <a
            href="/#try"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
          >
            See an example before you book <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
      <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary">
            The full three hours
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">
            Watch a little. Build a lot.
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
                Phone-only is fine for the chat-and-saved-instructions version.
                Sign in before arriving so account recovery does not take up
                your workshop.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Leave private data at home
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Use anonymised notes you have permission to share. No patient
                records, client secrets, salary details, passwords, or private
                chat exports. Follow your employer&apos;s AI policy. Our
                fictional examples work just as well.
              </p>
            </div>
          </div>
          <p className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 text-base leading-relaxed text-foreground">
            <strong>What this is not:</strong> inbox integration, a call
            recorder, automatic WhatsApp sending, or an agent that chases
            customers. The project drafts a follow-up. You stay in control.
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
            A three-hour guided build, reusable instructions, and practice on
            your own example. Pay online or reserve to pay cash at the venue.
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
