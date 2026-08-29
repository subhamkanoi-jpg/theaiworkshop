import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReserveButton } from "@/components/ReserveButton";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import {
  PRICE,
  TOTAL_SEATS,
  WORKSHOP_DATE_LABEL,
  WORKSHOP_TIME_LABEL,
  WORKSHOP_TITLE,
  inr,
} from "@/config";
import { LOCAL } from "@/seo/local";
import { CheckCircle2, MapPin, Train, Users } from "lucide-react";

const areas = [
  { name: "Salt Lake / Bidhannagar", note: "The room is here. Sector I–V, Karunamoyee, City Centre." },
  { name: "New Town / Action Area", note: "Twenty minutes. Come on a Sunday morning." },
  { name: "Howrah", note: "Across the river. The workshop is still offline, still in Salt Lake." },
  { name: "Park Street / Esplanade", note: "Metro + East-West. Show up with a phone." },
  { name: "Gariahat / South Kolkata", note: "Students and shop owners. Same Sunday, same artifact." },
  { name: "Dum Dum / North", note: "If you can reach Salt Lake by 11, you belong in the room." },
];

const faqs = [
  {
    q: "Where can I learn AI in Kolkata without a computer-science degree?",
    a: "Here. The AI Workshop runs offline Sundays in Salt Lake. If you can use WhatsApp, you can do the session. Zero tech background is fine. Zero follow-through is not.",
  },
  {
    q: "Is there an AI course in Salt Lake or Sector V?",
    a: "Yes — this is it, and it is a workshop, not a recorded course. You sit in the room, you build, you leave with the file on your phone. Next date is published on this site.",
  },
  {
    q: "Do you teach ChatGPT or Gemini in Kolkata?",
    a: "We teach the brief — the way you talk to any model so it does useful work. The default tool on 27 September is Gemini because a free Google account is enough. ChatGPT and Claude are welcome if you already live there.",
  },
  {
    q: "Is this an online AI class?",
    a: "No. Offline is the product. Salt Lake, Kolkata. The WhatsApp group is the corridor between Sundays, not a substitute for the room.",
  },
  {
    q: "What language is the AI workshop in?",
    a: "The room is English with Hindi and Bangla in the air. Your artifact can be in the language your customer actually reads.",
  },
];

export default function KolkataPage() {
  usePageSeo("kolkata");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.theaiworkshop.in/kolkata#webpage",
        url: "https://www.theaiworkshop.in/kolkata",
        name: "Learn AI in Kolkata | Offline AI Workshop in Salt Lake",
        inLanguage: "en-IN",
        dateModified: "2026-08-30",
        isPartOf: { "@id": "https://www.theaiworkshop.in/#website" },
        about: { "@id": "https://www.theaiworkshop.in/#localbusiness" },
        primaryImageOfPage: "https://www.theaiworkshop.in/og-card.jpg",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <SiteShell current="home">
      <JsonLd data={schema} />
      <article className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "Learn AI in Kolkata" }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            Kolkata · Salt Lake · Offline
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            The AI Workshop —{" "}
            <span className="italic text-[#c8553d]">learn AI in Kolkata.</span>
          </h1>
          <p className="mt-4 text-[17px] sm:text-xl text-muted-foreground leading-relaxed">
            Not a webinar from Bangalore. Not a twelve-week recording. An actual
            Sunday in Salt Lake where you build something with your own hands and
            take it home. That is The AI Workshop.
          </p>
          <p className="mt-4 text-[17px] sm:text-lg text-foreground/85 leading-relaxed">
            কলকাতায় AI শিখুন — সল্ট লেকে, রবিবারে, নিজের হাতে। টেক ডিগ্রি লাগবে না।
          </p>
          <div className="mt-8">
            <ReserveButton />
          </div>
        </div>
      </article>

      <section className="border-b border-border bg-muted/20 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-4">
            Where in Kolkata
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The room is in {LOCAL.neighbourhood}. Exact hall is shared after you
            reserve a seat — we do not publish a pin that will be wrong next month.
            The geography does not change: Salt Lake, Kolkata.
          </p>
          <address className="not-italic rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-e1">
            <p className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#c8553d]" /> {LOCAL.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {LOCAL.areaLine}
              <br />
              Phone:{" "}
              <a className="text-foreground" href={`tel:${LOCAL.phoneTel}`}>
                {LOCAL.phoneDisplay}
              </a>
              <br />
              Email:{" "}
              <a className="text-foreground" href={`mailto:${LOCAL.email}`}>
                {LOCAL.email}
              </a>
            </p>
            <a
              href={LOCAL.mapsUrl}
              className="mt-3 inline-flex text-sm font-semibold text-[#c8553d]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Salt Lake, Kolkata on Google Maps →
            </a>
          </address>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <Train className="h-4 w-4 text-[#c8553d] mt-0.5 shrink-0" />
            East-West Metro toward Salt Lake, buses through Karunamoyee and Sector
            V, cabs from Howrah or the airport. Arrive by 10:30. We start at 11.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-4">
            Who this AI workshop is for
          </h2>
          <ul className="space-y-3">
            {[
              "Shop owners in Salt Lake, New Town, Gariahat — people who live on WhatsApp.",
              "Students at JU, Calcutta University, IEM, Techno — who want a skill they can charge for, not another certificate.",
              "Job-seekers who need a portfolio artifact this month.",
              "Professionals who will keep the job and want evenings back.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-foreground/90 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-[#c8553d] shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-3">
            Neighbourhoods we serve
          </h2>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
            If you can reach Salt Lake by 11:00
          </h3>
          <p className="text-muted-foreground mb-6">
            If you can get to Salt Lake on a Sunday, you are in catchment. This is
            not an online class with a Kolkata keyword glued on.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {areas.map((a) => (
              <li key={a.name} className="rounded-2xl border border-border bg-card p-5 shadow-e1">
                <p className="font-semibold text-foreground">{a.name}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{a.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-4">
            Next AI workshop in Kolkata
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{WORKSHOP_TITLE}</strong> —{" "}
            {WORKSHOP_DATE_LABEL}, {WORKSHOP_TIME_LABEL}. {TOTAL_SEATS} seats.
            Community price {inr(PRICE)}. You talk about your work for a few
            minutes. You walk out with a week of finished work.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            June was websites. August was reels. September is the trick underneath
            both. See{" "}
            <a href="/workshop" className="font-semibold text-[#c8553d]">
              this Sunday
            </a>{" "}
            and the{" "}
            <a href="/path" className="font-semibold text-[#c8553d]">
              full Path
            </a>
            .
          </p>
          <div className="mt-8">
            <ReserveButton />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-4">
            Sources
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Salt Lake is Bidhannagar, a planned township in the Kolkata
            metropolitan area. 60+ people have already sat in this room. Workshop
            #1 shipped websites on 28 June 2026; #2 shipped reels on 30 August
            2026; #3 is 50 seats at ₹799 on 27 September 2026.
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>
              <a href="https://en.wikipedia.org/wiki/Bidhannagar" rel="noopener noreferrer">
                Bidhannagar (Salt Lake) — Wikipedia
              </a>
            </li>
            <li>
              <a href="https://gemini.google.com/" rel="noopener noreferrer">
                Google Gemini — default free tool in the room
              </a>
            </li>
            <li>
              <a href="https://llmstxt.org/" rel="noopener noreferrer">
                llms.txt specification
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-6">
            Questions Kolkata actually asks
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border/60 pb-6">
                <dt className="font-semibold text-foreground">{f.q}</dt>
                <dd className="mt-2 text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4 text-[#c8553d]" /> 60+ already in the room
          </p>
          <h2 className="font-serif text-[1.65rem] sm:text-3xl font-semibold text-foreground mb-6">
            Show up in Salt Lake. Leave with a thing.
          </h2>
          <ReserveButton />
        </div>
      </section>
    </SiteShell>
  );
}
