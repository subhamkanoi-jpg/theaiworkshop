import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReserveButton } from "@/components/ReserveButton";
import { SiteShell } from "@/components/SiteChrome";
import { hosts } from "@/config";
import { usePageSeo } from "@/hooks/usePageSeo";
import { LOCAL } from "@/seo/local";

export default function AboutPage() {
  usePageSeo("about");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://theaiworkshop.in/about#webpage",
        url: "https://theaiworkshop.in/about",
        name: "About The AI Workshop",
        description:
          LOCAL.name + " is Kolkata's offline AI workshop in Salt Lake.",
        dateModified: "2026-08-30",
        inLanguage: "en-IN",
        isPartOf: { "@id": "https://theaiworkshop.in/#website" },
        about: { "@id": "https://theaiworkshop.in/#organization" },
      },
      ...hosts.map((h) => ({
        "@type": "Person",
        name: h.name,
        jobTitle: "Host",
        worksFor: { "@id": "https://theaiworkshop.in/#organization" },
        image: `https://theaiworkshop.in${h.src}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
      })),
    ],
  };

  return (
    <SiteShell current="home">
      <JsonLd data={schema} />
      <article className="py-10 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "About" }]} />
          <h1 className="font-serif text-[2.15rem] sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            The AI Workshop
          </h1>
          <p className="mt-4 text-[17px] sm:text-xl text-muted-foreground leading-relaxed">
            An offline space in Salt Lake, Kolkata, for non-techies to put AI to
            work—one real use-case project at a time. We started in June 2026
            with a workshop on making websites and hosting them. Each session
            stands alone: bring a practical task, build with guidance, and leave
            knowing how to use what you made.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We welcome professionals, business owners, consultants, and curious
            beginners. You do not need a technical background or a plan to
            change careers. The point is to make AI useful in the work you
            already do. Your hosts are Yogesh Kanoi, Neeraj Kanoi, and Subham
            Kanoi.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-foreground">Address</dt>
              <dd className="text-muted-foreground">{LOCAL.areaLine}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Phone</dt>
              <dd>
                <a href={`tel:${LOCAL.phoneTel}`}>{LOCAL.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Email</dt>
              <dd>
                <a href={`mailto:${LOCAL.email}`}>{LOCAL.email}</a>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col sm:flex-row gap-6">
            {hosts.map((h) => (
              <div key={h.name} className="flex items-center gap-3">
                <img
                  src={h.src}
                  alt={h.name}
                  className="h-14 w-14 rounded-full object-cover"
                  style={{ objectPosition: h.pos }}
                />
                <div>
                  <p className="font-semibold text-foreground">{h.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Host · Salt Lake
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8">
            <a href="/kolkata" className="font-semibold text-[#c8553d]">
              Learn AI in Kolkata →
            </a>
          </p>
          <div className="mt-8">
            <ReserveButton />
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
