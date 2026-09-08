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
        "@id": "https://theaiworkshop.in/answers#faq",
        url: "https://theaiworkshop.in/answers",
        name: "The AI Workshop, answers Kolkata asks",
        dateModified: "2026-08-30",
        inLanguage: "en-IN",
        isPartOf: { "@id": "https://theaiworkshop.in/#website" },
        about: { "@id": "https://theaiworkshop.in/#organization" },
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
            Offline in Salt Lake, Kolkata. Not an online course.
          </p>
        </div>
      </article>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {elmo.prompts.map((p) => (
            <details key={p.id} id={p.id} className="border-b border-border py-4">
              <summary className="cursor-pointer font-semibold leading-snug">
                {p.value}
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.answer}
              </p>
              <a href={p.cite} className="mt-3 inline-block font-semibold text-[#c8553d]">
                Read more →
              </a>
            </details>
          ))}
          <div className="pt-8">
            <ReserveButton />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
