import { useEffect, useRef, useState, type RefObject } from "react";
import { LogoMark } from "@/components/LogoMark";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ReserveButton } from "@/components/ReserveButton";
import { PRICE, WORKSHOP_DATE_LABEL, WORKSHOP_NUMBER, WORKSHOP_TITLE, inr } from "@/config";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

type Reel = {
  id: string;
  stamp: string;
  title: string;
  place: string;
  spoken: string;
  kit: string[];
  video?: string;
  poster: string;
  loop: boolean;
  href?: string;
};

const REELS: Reel[] = [
  {
    id: "trick",
    stamp: "00",
    title: "The trick",
    place: "Salt Lake · 27 Sept",
    spoken: "You talk. A week of work appears.",
    kit: [
      "A bio, in your voice",
      "An offer line people can answer",
      "Seven posts for the week",
      "The recipe, saved for Tuesday",
    ],
    video: "/cinema/sunday-reel.mp4",
    poster: "/cinema/trick.jpg",
    loop: true,
  },
  {
    id: "clinic",
    stamp: "01",
    title: "Clinic",
    place: "Sector 1, Salt Lake",
    spoken: "I run a clinic. People miss their evenings.",
    kit: [
      "Evening slots still open. Reply 1.",
      "Desk-card bio, three lines",
      "Seven appointment posts",
    ],
    video: "/cinema/clinic.mp4",
    poster: "/cinema/clinic.jpg",
    loop: true,
  },
  {
    id: "tiffin",
    stamp: "02",
    title: "Tiffin",
    place: "Park Street",
    spoken: "I pack tiffins. Lunch is the whole day.",
    kit: [
      "Weekday tiffin. Eighty rupees. Message before 9.",
      "Polaroids of the boxes, already captioned",
      "A Tuesday reminder that sends itself",
    ],
    video: "/cinema/tiffin.mp4",
    poster: "/cinema/tiffin.jpg",
    loop: true,
  },
  {
    id: "boutique",
    stamp: "03",
    title: "Boutique",
    place: "Gariahat",
    spoken: "The clothes are better than the page.",
    kit: [
      "One page. Three reels. A bio.",
      "A WhatsApp note for the rail that just came in",
      "The week, already shot",
    ],
    video: "/cinema/boutique.mp4",
    poster: "/cinema/boutique.jpg",
    loop: true,
  },
  {
    id: "room",
    stamp: "04",
    title: "The room",
    place: "Meetup #1, Kolkata",
    spoken: "Real tables. Real people. Kolkata.",
    kit: ["60+ in the room", "Tables of eight", "Captains on the floor, not on a screen"],
    video: "/meetup1/recap.mp4",
    poster: "/meetup1/group-selfie.jpg",
    loop: false,
  },
  {
    id: "yours",
    stamp: "05",
    title: "Yours",
    place: "Hold to talk, below",
    spoken: "Now you. The messy version of what you actually do.",
    kit: ["No account", "The words stay on this phone", "On 27 September you get a week of this"],
    poster: "/cinema/room.jpg",
    loop: false,
    href: "#try",
  },
];

const FALLBACK_VIDEO: Record<string, string> = {
  trick: "/cinema/preroll.mp4",
};

const SHARE_HREF = `https://wa.me/?text=${encodeURIComponent(
  `The AI Workshop. You talk. A week of work appears.

Workshop #3: ${WORKSHOP_TITLE}
${WORKSHOP_DATE_LABEL}
50 seats. ${inr(PRICE)}. Salt Lake.

https://www.theaiworkshop.in/share`
)}`;

function useInView(ref: RefObject<HTMLElement | null>, amount = 0.35) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);
  return inView;
}

export function SundayReel() {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [caption, setCaption] = useState("");
  const [showKit, setShowKit] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reel = REELS[active];
  const src = reel.video || "";

  useEffect(() => {
    setShowKit(false);
    if (reduced) {
      setCaption(reel.spoken);
      setShowKit(true);
      return;
    }
    setCaption("");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setCaption(reel.spoken.slice(0, i));
      if (i >= reel.spoken.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setShowKit(true), 280);
      }
    }, 26);
    return () => window.clearInterval(timer);
  }, [reel, reduced]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !src) return;
    if (inView && !reduced && !reel.href) {
      node.play().catch(() => {});
    } else {
      node.pause();
    }
  }, [inView, src, reduced, reel.href, muted]);

  useEffect(() => {
    const strip = stripRef.current;
    const frame = strip?.querySelector<HTMLElement>("[data-active='true']");
    if (!strip || !frame) return;
    const left = frame.offsetLeft - strip.clientWidth / 2 + frame.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const onGateClick = () => {
    if (reel.href) {
      document.querySelector(reel.href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) node.play().catch(() => {});
    else setMuted((m) => !m);
  };

  return (
    <section
      id="reel"
      ref={rootRef}
      className="cinema-room relative overflow-hidden"
      aria-label="The Sunday reel"
    >
      <div className="cinema-beam" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
              The Sunday reel · 16mm
            </p>
            <h2 className="font-serif text-[1.85rem] sm:text-4xl lg:text-[2.7rem] font-semibold tracking-tight leading-[1.1] text-[#f4eee4] text-balance">
              Lights down.{" "}
              <span className="italic text-[#e8a090]">Three Kolkata Sundays.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[16px] sm:text-lg leading-relaxed text-[#f4eee4]/70">
              Pull the film. A spoken sentence becomes a week of work. Clinic,
              tiffin, boutique, then the real room. The last frame is yours.
            </p>
          </div>
          <LogoMark className="hidden sm:block h-14 w-14 opacity-90" />
        </div>

        <div className="cinema-gate">
          <div
            role="button"
            tabIndex={0}
            onClick={onGateClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onGateClick();
              }
            }}
            className="cinema-screen group"
            aria-label={
              reel.href
                ? "Go try it on your phone"
                : muted
                  ? "Unmute the reel"
                  : "Mute the reel"
            }
          >
            {src && !reel.href ? (
              <video
                key={src}
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={reel.poster}
                src={src}
                muted={muted}
                playsInline
                loop={reel.loop}
                preload="metadata"
                onError={(e) => {
                  const fb = FALLBACK_VIDEO[reel.id];
                  if (fb && !e.currentTarget.src.includes(fb)) {
                    e.currentTarget.src = fb;
                  }
                }}
              />
            ) : (
              <img
                src={reel.poster}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
            <div className="cinema-grain" aria-hidden />
            <div className="cinema-vignette" aria-hidden />

            {reel.id !== "trick" && !reel.href && (
              <div className="cinema-caption">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8a090] mb-1.5">
                  {reel.stamp} · {reel.title}
                  <span className="text-[#f4eee4]/45"> · {reel.place}</span>
                </p>
                <p className="font-serif text-xl sm:text-2xl leading-snug text-[#fbf6ea] min-h-[2.6em]">
                  {caption}
                  {!reduced && caption.length < reel.spoken.length ? (
                    <span className="cinema-caret" />
                  ) : null}
                </p>
                <div
                  className={cn(
                    "cinema-slip",
                    showKit ? "cinema-slip-in" : "pointer-events-none opacity-0 translate-y-3"
                  )}
                >
                  {reel.kit.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {!reel.href && (
              <span className="cinema-mute">
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
                <span>{muted ? "Tap for sound" : "Sound on"}</span>
              </span>
            )}

            {reel.href && (
              <span className="cinema-yours">
                <LogoMark className="h-16 w-16" />
                <span className="font-serif text-2xl">Your frame is empty.</span>
                <span className="text-sm text-[#f4eee4]/70">
                  Hold to talk, on the phone below.
                </span>
              </span>
            )}
          </div>
        </div>

        <p className="font-hand mt-4 text-center text-lg text-[#f4eee4]/55 rotate-[-1deg]">
          pull the film · the frame in the gate plays
        </p>

        <div
          ref={stripRef}
          className="film-strip mt-5"
          role="listbox"
          aria-label="Sunday reels"
        >
          {REELS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="option"
              aria-selected={i === active}
              data-active={i === active}
              onClick={() => setActive(i)}
              className={cn("film-frame", i === active && "is-in-gate")}
            >
              <img src={r.poster} alt="" />
              <span className="film-meta">
                <span className="film-stamp">{r.stamp}</span>
                {r.title}
              </span>
            </button>
          ))}
        </div>

        <div className="cinema-ticket mt-10 sm:mt-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d]">
              Admit one · Workshop #{String(WORKSHOP_NUMBER).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#2a211c]">
              {WORKSHOP_TITLE}
            </h3>
            <p className="mt-2 text-sm text-[#2a211c]/70 leading-relaxed">
              {WORKSHOP_DATE_LABEL}. 11:00 AM to 2:00 PM. Salt Lake. {inr(PRICE)}.
              Fifty seats. Pull a frame, then sit in the real room.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-stretch">
            <ReserveButton block label="Take a seat" />
            <a
              href={SHARE_HREF}
              target="_blank"
              rel="noreferrer"
              className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#2a211c]/15 bg-white/70 px-6 text-sm font-medium text-[#2a211c]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Forward the Sunday
            </a>
            <a
              href="#try"
              className="text-center text-xs font-medium text-[#c8553d] hover:underline"
            >
              Or print a week from your own sentence ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
