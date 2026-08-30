import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_DURATION_LABEL,
  WORKSHOP_TITLE,
  WORKSHOP_NUMBER,
  WORKSHOP_ARTIFACT,
  PRICE,
  MARKET_VALUE,
  TOTAL_SEATS,
  BRING_LABEL,
  inr,
} from "@/config";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Wand2,
  MessageSquareText,
  CheckCircle2,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function WorkshopPage() {
  usePageSeo("workshop");

  return (
    <SiteShell current="workshop">
      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: WORKSHOP_TITLE }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#c8553d] mb-3 sm:mb-4">
            Workshop #{String(WORKSHOP_NUMBER).padStart(2, "0")} · Talk
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            {WORKSHOP_TITLE}
          </h1>
          <p className="mt-4 sm:mt-5 text-[17px] sm:text-xl text-muted-foreground leading-relaxed">
            Talk for a few minutes about your actual work. Walk out with a week of
            finished work already made, and the recipe to do it again on Tuesday.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_DATE_LABEL}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#c8553d]" /> {WORKSHOP_TIME_LABEL} ({WORKSHOP_DURATION_LABEL})
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#c8553d]" /> Salt Lake, Kolkata
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#c8553d]" /> {TOTAL_SEATS} seats · tables of 8
            </span>
          </div>
          <div className="mt-8">
            <ReserveButton />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            The artifact
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-4">
            Not notes. A week of work.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {WORKSHOP_ARTIFACT}. Specifically, before you leave:
          </p>
          <ul className="space-y-4">
            {[
              "A one-line offer that a stranger understands",
              "A bio, in your voice, not brochure-English",
              "Seven posts or WhatsApp messages, ready to send",
              "The brief saved, a Gem on a free Google account, so Tuesday still works",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-[#c8553d] flex-shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            The three hours
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
            Show the trick once. Then you do it.
          </h2>
          <ol className="space-y-6">
            {[
              {
                icon: <Sparkles className="h-5 w-5" />,
                t: "11:00. The gasp",
                d: "A host talks for ninety seconds about a Salt Lake clinic. A kit appears on the big screen. That is the magic. Then we tell you how it actually works.",
              },
              {
                icon: <MessageSquareText className="h-5 w-5" />,
                t: "11:20. You talk",
                d: "Three minutes about YOUR work. Voice note or a messy paragraph. Shop, studies, job hunt, freelance, same recipe, your facts.",
              },
              {
                icon: <Wand2 className="h-5 w-5" />,
                t: "11:45. The kit",
                d: "Everyone mirrors the projector. Bio, offer, seven posts. Captains on the floor. They do not type on your phone unless you ask.",
              },
              {
                icon: <CheckCircle2 className="h-5 w-5" />,
                t: "12:45. Make it yours + save",
                d: "Edit three pieces by hand so you stay the human. Save the brief. Hear how this kit is what shops already pay ₹3,000–₹8,000 for. Optional show-and-tell. Photo.",
              },
            ].map((b) => (
              <li key={b.t} className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c8553d]/10 text-[#c8553d]">
                  {b.icon}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
                Bring this
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {BRING_LABEL} If you can, three WhatsApp messages or captions you
                already wrote that sound like you. No material? We have samples.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
                Do not bring
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A computer-science degree. Premiere. A paid ChatGPT plan. Fear of
                looking like a beginner. The default tool is Gemini, free, on your
                phone.
              </p>
            </div>
          </div>
          <p className="mt-8 inline-flex items-start gap-2 text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4 text-[#c8553d] mt-0.5 flex-shrink-0" />
            50 people on purpose, tables of eight, alumni captains, one projector.
            Intimate enough to finish. Large enough to feel like a room.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="font-serif text-3xl font-semibold text-foreground">
            {inr(PRICE)}{" "}
            <span className="text-lg font-normal text-muted-foreground line-through ml-2">
              {inr(MARKET_VALUE)}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground mb-6">
            Community price. Surplus goes back into the hall. Pay online or cash at the venue.
          </p>
          <ReserveButton />
        </div>
      </section>
    </SiteShell>
  );
}
