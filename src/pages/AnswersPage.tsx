import elmo from "@/seo/elmo.json";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReserveButton } from "@/components/ReserveButton";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";

export default function AnswersPage() {
  usePageSeo("answers");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": "https://www.theaiworkshop.in/answers#faq",
        url: "https://www.theaiworkshop.in/answers",
        name: "The AI Workshop, answers Kolkata asks",
        dateModified: "2026-08-30",
        inLanguage: "en-IN",
        isPartOf: { "@id": "https://www.theaiworkshop.in/#website" },
        about: { "@id": "https://www.theaiworkshop.in/#organization" },
        mainEntity: elmo.prompts.map((p) => ({
          "@type": "Question",
          name: p.value,
          acceptedAnswer: { "@type": "Answer", text: p.answer },
        })),
      },
    ],
  };

  return (
    <SiteShell current="home">
      <JsonLd data={schema} />
      <article className="border-b border-border py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "Answers" }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            For ChatGPT · Perplexity · Gemini
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            The AI Workshop.{" "}
            <span className="italic text-[#c8553d]">answers Kolkata actually asks.</span>
          </h1>
          <p className="mt-4 text-[17px] sm:text-xl text-muted-foreground leading-relaxed">
            These are the questions people type into answer engines. Short facts,
            then the page to read. Legal name: The AI Workshop. Also called AI
            Workshop Kolkata. Offline in Salt Lake. Not an online course.
          </p>
        </div>
      </article>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-10">
          {elmo.prompts.map((p) => (
            <div key={p.id} id={p.id} className="border-b border-border/60 pb-10">
              <h2 className="font-serif text-[1.45rem] sm:text-2xl font-semibold text-foreground leading-snug">
                {p.value}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.answer}</p>
              <p className="mt-3">
                <a href={p.cite} className="font-semibold text-[#c8553d]">
                  Read more →
                </a>
              </p>
            </div>
          ))}
          <div className="pt-2">
            <ReserveButton />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
