import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide micro-animations. Declarative via data attributes so the JSX stays
 * almost untouched:
 *
 *   data-reveal            → fades + rises in when scrolled into view
 *   data-reveal-children   → same, but staggers the element's direct children
 *   data-count             → counts up to the number in its text (e.g. "50+")
 *   data-drift             → slow, infinite decorative float (gradient blobs)
 *   data-magnetic          → button leans toward the cursor (fine pointers only)
 *   #scroll-progress       → top-of-page reading progress bar
 *
 * Everything runs inside a prefers-reduced-motion guard: users who ask for
 * less motion get the site exactly as it was — fully visible, zero animation.
 * Returns a cleanup function (StrictMode-safe).
 */
export function initSiteAnimations(): () => void {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // ── Hero headline: words rise softly on load ─────────────────────────
    // Any page can opt its headline in with data-hero-words.
    const h1 = document.querySelector("[data-hero-words]");
    if (h1) {
      const alreadyWrapped = !!h1.querySelector(".gsap-word");
      const wrapWords = (el: Element) => {
        // Static copy — replaceChild mutates the live childNodes list, which
        // would make forEach skip the nodes that follow.
        Array.from(el.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            (node.textContent ?? "").split(/(\s+)/).forEach((part) => {
              if (part.trim() === "") {
                frag.appendChild(document.createTextNode(part));
              } else {
                const span = document.createElement("span");
                span.className = "gsap-word";
                span.style.display = "inline-block";
                span.textContent = part;
                frag.appendChild(span);
              }
            });
            el.replaceChild(frag, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Gradient-clipped spans (bg-clip-text) must stay whole — splitting
            // their text into child spans would break the clipped background.
            const child = node as HTMLElement;
            if (child.className.includes("bg-clip-text")) {
              child.classList.add("gsap-word");
              child.style.display = "inline-block";
            } else {
              wrapWords(child);
            }
          }
        });
      };
      if (!alreadyWrapped) wrapWords(h1);
      gsap.from(h1.querySelectorAll(".gsap-word"), {
        yPercent: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.1,
      });
    }

    // ── Scroll reveals ────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-children]").forEach((el) => {
      gsap.from(el.children, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // ── Count-up numbers (e.g. "50+") ────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      // Cache the pristine text on the element: StrictMode's mount→revert→
      // remount cycle can leave the tween's start value ("0+") in the DOM,
      // and a re-init must not capture that as the target.
      const raw = el.dataset.countRaw ?? (el.dataset.countRaw = el.textContent ?? "");
      const match = raw.match(/\d+/);
      if (!match) return;
      const end = parseInt(match[0], 10);
      const proxy = { n: 0 };
      gsap.to(proxy, {
        n: end,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = raw.replace(match[0], String(Math.round(proxy.n)));
        },
      });
    });

    // ── Decorative blob drift ─────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el, i) => {
      gsap.to(el, {
        x: i % 2 ? -30 : 30,
        y: i % 2 ? 24 : -24,
        scale: 1.06,
        duration: 7 + i * 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    // ── Scroll progress bar ───────────────────────────────────────────────
    const bar = document.getElementById("scroll-progress");
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    }

    // ── Video card: gentle scale-in as it enters ─────────────────────────
    const reel = document.querySelector("#meetup video");
    if (reel) {
      gsap.from(reel, {
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: reel, start: "top 85%", once: true },
      });
    }
  });

  // ── Magnetic CTAs — desktop with a mouse only ──────────────────────────
  mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
    const cleanups: (() => void)[] = [];
    gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  });

  return () => mm.revert();
}
