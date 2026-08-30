import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export const glimpses = [
  { src: "/meetup1/glimpse-2.jpg", alt: "The room mid-session at Meetup #1, laptops open" },
  { src: "/meetup1/group-selfie.jpg", alt: "The full group at The AI Workshop Meetup #1 in Kolkata" },
  { src: "/meetup1/glimpse-1.jpg", alt: "Live walkthrough on the big screen at Meetup #1" },
  { src: "/meetup1/hosts-trio.jpg", alt: "The hosts at Meetup #1" },
  { src: "/meetup1/glimpse-4.jpg", alt: "Participants building at Meetup #1" },
];

export function GlimpseReel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % glimpses.length), 3800);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const go = (dir: number) => {
    setCurrent((c) => (c + dir + glimpses.length) % glimpses.length);
  };

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (dx > 36) go(-1);
    else if (dx < -36) go(1);
    setPaused(false);
  };
  const onPointerCancel = () => {
    startX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="relative aspect-[3/2] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-e2 touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={() => {
        if (startX.current != null) onPointerCancel();
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from Meetup #1"
    >
      {glimpses.map((g, i) => (
        <img
          key={g.src}
          src={g.src}
          alt={i === current ? g.alt : ""}
          aria-hidden={i !== current}
          draggable={false}
          className={cn(
            "absolute inset-0 h-full w-full object-cover filter saturate-[0.88] transition-opacity duration-700",
            i === current ? "opacity-100" : "opacity-0",
            i === current && !reduced && "glimpse-kenburns"
          )}
        />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute top-3 left-3 rounded-full bg-black/55 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        Meetup #1 · Salt Lake, Kolkata
      </div>
      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-0.5">
        {glimpses.map((_, i) => (
          <button
            key={i}
            onClick={(ev) => {
              ev.stopPropagation();
              setCurrent(i);
            }}
            aria-label={`Show glimpse ${i + 1}`}
            aria-current={i === current}
            className="flex h-10 w-10 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current ? "w-5 bg-white" : "w-1.5 bg-white/55"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
