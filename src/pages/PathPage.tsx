import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import { archive, briefLoop } from "@/content/path";

export default function PathPage() {
  usePageSeo("path");
  return (
    <SiteShell current="path">
      <section className="border-b border-border py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "How we learn" }]} />
          <p className="text-sm font-semibold text-primary">
            The original idea
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">
            One real use case.
            <br />
            One project at a time.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            AI is easier to understand when it helps with something you already
            care about. We are an offline space for non-techies to try it, ask
            questions, and build something useful—not a syllabus of tools to
            memorise.
          </p>
        </div>
      </section>
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            How every workshop works
          </h2>
          <ol className="mt-8 flex flex-col gap-7">
            {briefLoop.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="text-xl font-semibold text-primary">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Where we started. What is next.
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {archive.map((event) => (
              <article
                key={event.number}
                className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
              >
                <p className="text-sm font-semibold text-primary">
                  {event.chapter} · {event.date}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {event.artifact}
                </p>
                <a
                  href={event.status === "next" ? "/workshop" : "/room"}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary"
                >
                  {event.status === "next"
                    ? "See the September plan →"
                    : "See the June workshop →"}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Future topics are not a fixed course or a promised calendar. We will
            choose them around useful tasks people want to implement. You can
            join any session without attending the earlier ones.
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-6 font-serif text-3xl font-semibold">
            Start with the project you need.
          </h2>
          <ReserveButton />
        </div>
      </section>
    </SiteShell>
  );
}
