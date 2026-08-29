import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { ReserveButton } from "@/components/ReserveButton";
import { pathChapters, archive, briefLoop, faqs } from "@/content/path";
import { WORKSHOP_TITLE } from "@/config";
import { cn } from "@/lib/utils";

export default function PathPage() {
  usePageSeo("path");

  return (
    <SiteShell current="path">
      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "The Path" }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3 sm:mb-4">
            The catalog
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            The Path
          </h1>
          <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
            Five chapters. Every Sunday belongs to one of them. You do not have to
            walk them in order. You do have to leave with a thing.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="snap-row sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {pathChapters.map((c) => (
              <div
                key={c.id}
                className={cn(
                  "snap-card rounded-2xl border bg-card p-5 sm:p-6 shadow-e1",
                  c.status === "this-sunday" ? "border-[#c8553d]/40" : "border-border/60"
                )}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
                  {c.n}
                </p>
                <h2 className="font-serif text-2xl font-semibold text-foreground">{c.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.promise}</p>
                <p className="mt-4 text-xs text-foreground/80">{c.sunday}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            The one skill
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Everything is this loop, wearing different clothes.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            If you only remember one page, remember this. {WORKSHOP_TITLE} on 27
            September is this loop, done live, on your own work.
          </p>
          <ol className="space-y-5">
            {briefLoop.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif text-2xl font-semibold text-[#c8553d]/40 w-10 flex-shrink-0">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
            Archive
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
            A store with no memory is a pop-up.
          </h2>
          <ul className="space-y-5">
            {archive.map((w) => (
              <li
                key={w.number}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-e1"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
                  #{String(w.number).padStart(2, "0")} · {w.chapter} · {w.date}
                  {w.status === "next" ? " · This Sunday" : " · Shipped"}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                  {w.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{w.artifact}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-8">FAQ</h2>
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

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="font-serif text-2xl font-semibold text-foreground mb-6">
            This Sunday is the Talk chapter. Come do it with your own hands.
          </p>
          <ReserveButton />
        </div>
      </section>
    </SiteShell>
  );
}
