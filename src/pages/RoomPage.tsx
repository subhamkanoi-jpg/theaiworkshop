import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";
import { usePageSeo } from "@/hooks/usePageSeo";
import { glimpses } from "@/components/GlimpseReel";
import { ReserveButton } from "@/components/ReserveButton";
import { hosts } from "@/config";
import { cn } from "@/lib/utils";

const portfolio = [
  { src: "/portfolio/ur-hospitality.png", alt: "A site built in the room. UR Hospitality" },
  { src: "/portfolio/shreejee-infotech.png", alt: "A site built in the room. Shreejee Infotech" },
  { src: "/portfolio/amos-aerospace.png", alt: "A site built in the room. Amos Aerospace" },
  { src: "/portfolio/aakash-damani.png", alt: "A site built in the room. Aakash Damani" },
];

export default function RoomPage() {
  usePageSeo("room");

  return (
    <SiteShell current="room">
      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "The Room" }]} />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3 sm:mb-4">
            Proof of room
          </p>
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            The room is the company.
          </h1>
          <p className="mt-5 text-xl text-muted-foreground leading-relaxed">
            60+ people have already sat in Salt Lake with laptops open. The
            WhatsApp is the corridor between Sundays. The hosts have names.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-[1.75rem] sm:text-3xl font-semibold text-foreground mb-6 sm:mb-8">
            Meetup #1 · 28 June
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 overflow-x-clip px-1">
            {glimpses.map((g, i) => (
              <figure
                key={g.src}
                className={cn("polaroid tape", i % 2 === 0 ? "-rotate-[1deg]" : "rotate-[1deg]")}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="h-full w-full object-cover filter saturate-[0.85]"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-10 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-3">
            What people actually shipped
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Workshop #1 was websites. Real URLs, made in the room. No stock
            testimonials, the screenshots are the proof.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {portfolio.map((p) => (
              <div key={p.src} className="overflow-hidden rounded-2xl border border-border bg-card shadow-e1">
                <img src={p.src} alt={p.alt} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-10 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
            The hosts
          </h2>
          <div className="space-y-6">
            {hosts.map((h) => (
              <div key={h.name} className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden ring-1 ring-border/40 flex-shrink-0">
                  <img
                    src={h.src}
                    alt={h.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: h.pos }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{h.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Hosts the room in Salt Lake. Same Sunday as you.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-hand mt-10 text-xl text-muted-foreground -rotate-1">
            small room, serious people, on purpose
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="font-serif text-2xl font-semibold text-foreground mb-6">
            Come sit in it on 27 September.
          </p>
          <ReserveButton />
        </div>
      </section>
    </SiteShell>
  );
}
