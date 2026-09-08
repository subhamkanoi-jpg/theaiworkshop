import { LOCAL } from "@/seo/local";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: LOCAL.name, href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `https://theaiworkshop.in${c.href === "/" ? "/" : c.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href && i < all.length - 1 ? (
              <a href={c.href} className="hover:text-foreground">
                {c.label}
              </a>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
