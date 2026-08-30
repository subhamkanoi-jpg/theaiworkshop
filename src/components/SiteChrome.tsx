import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, ArrowRight, MapPin, Instagram, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollButtons } from "@/components/ScrollToTop";
import { useSiteMotion } from "@/hooks/useSiteMotion";
import { trackContact } from "@/analytics";
import {
  WORKSHOP_DATE_LABEL,
  WORKSHOP_DATE_SHORT,
  WORKSHOP_TITLE,
  PRICE,
  inr,
  PHONE_TEL,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
  TOTAL_SEATS,
} from "@/config";
import { cn } from "@/lib/utils";

export type NavId = "home" | "path" | "workshop" | "room" | "host";

const links: { id: NavId; href: string; label: string }[] = [
  { id: "workshop", href: "/workshop", label: "27 Sept" },
  { id: "path", href: "/path", label: "The Path" },
  { id: "room", href: "/room", label: "The Room" },
];

export function SiteHeader({ current = "home" }: { current?: NavId }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("site:navigate", close);
    return () => document.removeEventListener("site:navigate", close);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <a href="/" className="flex items-center min-w-0 pressable">
            <Logo
              iconClassName="h-7 sm:h-8 w-auto"
              textClassName="text-[15px] sm:text-lg max-[340px]:hidden"
            />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={cn(
                  "nav-link text-sm font-medium transition-colors",
                  current === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/book"
              className="pressable inline-flex items-center rounded-full bg-[#c8553d] text-white text-sm font-bold h-9 px-5"
            >
              Reserve your seat <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </div>

          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center -mr-2 rounded-full text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <button
            type="button"
            className="menu-backdrop fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="menu-sheet relative z-50 border-t border-border/50 bg-background px-4 pb-6 pt-2">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={cn(
                  "flex min-h-12 items-center text-base font-medium px-1 border-b border-border/40",
                  current === l.id ? "text-[#c8553d]" : "text-foreground"
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/about"
              className="flex min-h-12 items-center text-base font-medium text-foreground px-1 border-b border-border/40"
            >
              About
            </a>
            <a
              href="/answers"
              className="flex min-h-12 items-center text-base font-medium text-foreground px-1 border-b border-border/40"
            >
              Answers
            </a>
            <a
              href="/kolkata"
              className="flex min-h-12 items-center text-base font-medium text-foreground px-1 border-b border-border/40"
            >
              Learn AI in Kolkata
            </a>
            <a
              href="/host"
              className="flex min-h-12 items-center text-base font-medium text-foreground px-1 border-b border-border/40"
            >
              Host a table
            </a>
            <a
              href="/book"
              className="pressable mt-4 flex min-h-12 items-center justify-center rounded-full bg-[#c8553d] text-white font-bold"
            >
              Reserve your seat <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20 py-12 sm:py-16 pb-28 lg:pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <Logo iconClassName="h-8 w-auto" textClassName="text-base" />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Kolkata&apos;s offline AI workshop. Show up on a Sunday. Leave with a
              thing. Come back.
            </p>
            <address className="mt-3 not-italic text-sm text-muted-foreground leading-relaxed">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Salt Lake, Kolkata, West Bengal 700064
              </span>
            </address>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              onClick={() => trackContact("email")}
              className="flex min-h-11 items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              {SUPPORT_EMAIL}
            </a>
            <a
              href="https://www.instagram.com/theaiworkshop.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 hover:text-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @theaiworkshop.in
            </a>
            <a href="/about" className="flex min-h-11 items-center hover:text-foreground transition-colors">
              About
            </a>
            <a href="/answers" className="flex min-h-11 items-center hover:text-foreground transition-colors">
              Answers
            </a>
            <a href="/kolkata" className="flex min-h-11 items-center font-medium text-foreground hover:text-[#c8553d] transition-colors">
              Learn AI in Kolkata
            </a>
            <a href="/workshop" className="flex min-h-11 items-center hover:text-foreground transition-colors">
              {WORKSHOP_TITLE}. {WORKSHOP_DATE_LABEL}
            </a>
            <a href="/share" className="flex min-h-11 items-center hover:text-foreground transition-colors">
              Share on WhatsApp
            </a>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
              <a href="/path" className="hover:text-foreground transition-colors">
                The Path
              </a>
              <a href="/room" className="hover:text-foreground transition-colors">
                The Room
              </a>
              <a href="/host" className="hover:text-foreground transition-colors">
                Host
              </a>
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/refund" className="hover:text-foreground transition-colors">
                Refunds
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} The AI Workshop · Kolkata</span>
          <span>
            Phone:{" "}
            <a href={`tel:${PHONE_TEL}`} className="hover:text-foreground transition-colors">
              {PHONE_DISPLAY}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function StickyBookBar({ afterId = "hero" }: { afterId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(afterId);
      if (!el) {
        setShow(window.scrollY > 240);
        return;
      }
      setShow(el.getBoundingClientRect().bottom < 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [afterId]);

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 lg:hidden bg-background/92 backdrop-blur-md border-t border-border px-4 pt-2.5 safe-bottom transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <a
        href="/book"
        className="pressable flex h-12 items-center justify-between gap-3 rounded-full bg-[#c8553d] px-5 text-white shadow-e2"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">
          {WORKSHOP_DATE_SHORT} · {TOTAL_SEATS} seats
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold">
          Reserve · {inr(PRICE)} <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}

export function SiteShell({
  children,
  current = "home",
  sticky = true,
}: {
  children: ReactNode;
  current?: NavId;
  sticky?: boolean;
}) {
  useSiteMotion();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader current={current} />
      {children}
      <SiteFooter />
      {sticky && <StickyBookBar />}
      <ScrollButtons />
    </div>
  );
}
