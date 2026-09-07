import { useEffect } from "react";
import { trackViewContent } from "@/analytics";
import { usePageSeo } from "@/hooks/usePageSeo";
import { SiteShell } from "@/components/SiteChrome";
import { GlimpseReel } from "@/components/GlimpseReel";
import { ReserveButton } from "@/components/ReserveButton";
import { TalkTrailer } from "@/components/TalkTrailer";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  PRICE,
  TOTAL_SEATS,
  inr,
  hosts,
  workshopContent,
} from "@/config";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

export default function App() {
  usePageSeo("home");
  useEffect(() => {
    trackViewContent("Homepage", "Workshop Lander");
  }, []);

  return (
    <SiteShell current="home">
      <section id="hero" className="border-b border-border py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold text-primary">
                Offline in Kolkata · Built for non-techies
              </p>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
                Less AI theory.
                <br />
                <span className="text-primary">More “I made this.”</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                An offline space to put AI to work, one real use-case project at
                a time. Bring your everyday work. Build alongside other
                professionals and business owners. Leave with something you can
                use.
              </p>
              <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground">
                <p className="text-sm font-semibold text-primary">
                  Next project · 27 September
                </p>
                <h2 className="mt-2 text-xl font-semibold text-balance">
                  {WORKSHOP_TITLE}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Rough notes in. Clear next steps and a follow-up draft out.
                  Your tone. Your work. No code.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ReserveButton />
                <a
                  href="#try"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-base font-medium"
                >
                  See a real example <ArrowRight className="size-4" />
                </a>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {inr(PRICE)} · {WORKSHOP_TIME_LABEL} · Salt Lake
                <br />
                No previous workshop or paid AI subscription required.
              </p>
            </div>
            <div>
              <GlimpseReel />
              <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                Our first workshop · June 2026
                <br />
                We built websites and learned to put them online.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TalkTrailer />

      <section id="workshop" className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-primary">
                One Sunday. One working project.
              </p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                Stop starting every follow-up from scratch.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The call is over, but the work is not. You still need to explain
                what was agreed, decide who does what, and send a clear message.
                That is the one job we will build an assistant for.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Not an autonomous bot. Not a new app to code. A saved set of
                instructions in Gemini that you can use again after your next
                conversation.
              </p>
              <a
                href="/workshop"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                See the full three-hour plan <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground sm:p-8">
              <h3 className="text-xl font-semibold">What you take home</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {workshopContent.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed"
                  >
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                You check every output. The assistant does not send messages,
                record calls, or access your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary">
            Same project. Your everyday work.
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            You do not need to be a tech person.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "Professionals & managers",
                "Turn meeting notes into a team recap, clear owners, and next steps. Spend the session on a real task—not another list of prompts.",
              ],
              [
                "Business owners",
                "Turn a customer enquiry or supplier discussion into a polite follow-up. Keep quantities, prices, and commitments grounded in your notes.",
              ],
              [
                "Consultants & freelancers",
                "Turn a client call into an agreed-scope recap and a next-step email. Make the draft sound like you, not a generic sales pitch.",
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            New to AI? You belong here. Already use ChatGPT? Learn to make one
            task repeatable. This is not a coding bootcamp or a
            background-automation course.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-primary">
                The room is the point
              </p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                In June, we put websites online. Now, we put AI into the
                workday.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Our first workshop in June 2026 was about making and hosting
                websites. The idea has not changed: choose a useful project,
                build it in person, and leave knowing how to use it yourself.
              </p>
              <a
                href="/room"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary"
              >
                See the June workshop and websites{" "}
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-semibold">Meet your hosts</h3>
              {hosts.map((h) => (
                <div key={h.name} className="flex items-center gap-4">
                  <img
                    src={h.src}
                    alt={h.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="size-14 rounded-full object-cover"
                    style={{ objectPosition: h.pos }}
                  />
                  <div>
                    <p className="font-semibold">{h.name}</p>
                    <p className="text-sm text-muted-foreground">
                      The AI Workshop · Kolkata
                    </p>
                  </div>
                </div>
              ))}
              <p className="text-base leading-relaxed text-muted-foreground">
                Ask questions when you get stuck. Work at your own device. Learn
                alongside people solving similar problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">Before you book</h2>
          <div className="mt-8 flex flex-col gap-2">
            {workshopContent.faqs.map((faq) => (
              <details key={faq.q} className="border-b border-border py-4">
                <summary className="cursor-pointer text-base font-semibold leading-relaxed">
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

      <section className="border-t border-border bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold text-primary">
            {WORKSHOP_DATE_LABEL}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
            Bring messy notes.
            <br />
            Leave with your own assistant.
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" /> Salt Lake, Kolkata
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" /> {WORKSHOP_TIME_LABEL}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4" /> {TOTAL_SEATS} seats · {inr(PRICE)}
            </span>
          </div>
          <div className="mt-8">
            <ReserveButton />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Laptop recommended. Sample notes provided. Beginners welcome.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
