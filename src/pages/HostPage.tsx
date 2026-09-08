import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { BecomeHost } from "@/components/BecomeHost";

export default function HostPage() {
  usePageSeo("host");

  return (
    <SiteShell current="host">
      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "Host" }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3 sm:mb-4">
            Lead
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Captain a table. Then teach.
          </h1>
          <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
            Help eight people render a finished ad on 27 September. Guide at
            their device; let them build.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <BecomeHost />
        </div>
      </section>
    </SiteShell>
  );
}
