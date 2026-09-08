import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The five stages of the run, as one continuous state pack.
 *
 * Each stage carries the two facts that matter to somebody deciding whether to
 * come: which tool the step belongs to, and what the step hands to the next
 * one. The `line` is the prompt fragment that does the actual work — quoted
 * from the system we run in the room, not invented for the page.
 */
const STAGES = [
  {
    stamp: "01",
    name: "Brief",
    tool: "ChatGPT / Claude",
    takes: "One sentence about what you sell",
    gives: "Audience, angle, and one chosen format",
    line: 'We sell copper water dispensers for people who want healthier, better-looking homes.',
    note: "Not “a holistic lifestyle solution for modern consumers.” Write it like you would say it to a friend.",
  },
  {
    stamp: "02",
    name: "Face lock",
    tool: "Nano Banana Pro",
    takes: "The brief and the script",
    gives: "One headshot. One person. Reused all day.",
    line: "One person only, shoulders-up, neutral background, real skin texture, continuity-safe identity reference.",
    note: "No collage, no contact sheet, no four outfits. This is the identity card of your actor, and everything downstream depends on it.",
  },
  {
    stamp: "03",
    name: "Base stills",
    tool: "Nano Banana Pro",
    takes: "Scene breakdown plus the face-lock block",
    gives: "Four to six approved 9:16 frames",
    line: "Full character description repeated, exact action, framing, lens, lighting, product placement, aspect ratio 9:16.",
    note: "Every scene prompt stands alone. The tool remembers nothing, so continuity is something you type, not something you hope for.",
  },
  {
    stamp: "04",
    name: "Motion",
    tool: "Google Flow / Veo",
    takes: "An approved still, one per scene",
    gives: "A clip that moves like a hand held it",
    line: "She leans slightly toward the camera and speaks. Camera holds. No cuts, no new objects, no outfit change.",
    note: "Describe movement only — the picture already exists. Weak motion prompts are why AI people melt between frames.",
  },
  {
    stamp: "05",
    name: "Voice",
    tool: "ElevenLabs",
    takes: "The final script",
    gives: "A read that breathes in the right places",
    line: "[calm, confident] You do not need a studio to make an ad anymore. [pause] [slightly more intimate] You need the right workflow.",
    note: "Cues before the line, never inside it. Test one line before you spend credits on the whole script.",
  },
];

const HOLD_MS = 6200;
const TYPE_MS = 16;

export function PipelineGate() {
  // Which stage is in the gate and how much of its prompt has been typed are
  // one fact, not two: keeping them in a single value means the readout can
  // never render a new stage sliced by the previous stage's cursor.
  const [{ at, chars }, setCursor] = useState({ at: 0, chars: 0 });
  const [held, setHeld] = useState(false);
  // Same idiom the other reels on this site use: read the query at render
  // time rather than holding it in a ref, so the caret below stays in sync.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stage = STAGES[at];
  const typed = reduced ? stage.line : stage.line.slice(0, chars);
  const typing = !reduced && chars < stage.line.length;

  // Type the prompt line out. Reduced motion gets the finished line at once.
  useEffect(() => {
    if (reduced) return;
    const { line } = STAGES[at];
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setCursor({ at, chars: n });
      if (n >= line.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [at, reduced]);

  // Advance on its own until somebody takes over, then stay put.
  useEffect(() => {
    if (held || reduced) return;
    const id = window.setTimeout(
      () => setCursor({ at: (at + 1) % STAGES.length, chars: 0 }),
      HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [at, held, reduced]);

  return (
    <div className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
      <div className="cinema-gate">
        <div className="cinema-screen cinema-screen-vert">
          <div className="gate-body">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
                Production state pack
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4eee4]/40">
                9:16 · 16mm
              </p>
            </div>

            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-serif text-3xl leading-none text-[#c8553d]">
                {stage.stamp}
              </span>
              <h3 className="font-serif text-2xl font-semibold leading-none text-[#fbf6ea]">
                {stage.name}
              </h3>
            </div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4eee4]/45">
              {stage.tool}
            </p>

            <div className="gate-rule mt-4" />

            <dl className="mt-4 grid gap-3">
              <div>
                <dt className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#f4eee4]/40">
                  In
                </dt>
                <dd className="mt-0.5 text-[13px] leading-snug text-[#f4eee4]/85">
                  {stage.takes}
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
                  Out
                </dt>
                <dd className="mt-0.5 text-[13px] leading-snug text-[#fbf6ea]">
                  {stage.gives}
                </dd>
              </div>
            </dl>

            <div className="gate-rule mt-4" />

            <div className="mt-4 min-h-[6.5rem]" aria-live="polite">
              <p className="gate-term">
                <span className="gate-term-hot">&gt;&nbsp;</span>
                {typed}
                {typing ? <span className="cinema-caret" /> : null}
              </p>
            </div>

            <p className="mt-auto text-[11.5px] leading-relaxed text-[#f4eee4]/50">
              {stage.note}
            </p>
          </div>
          <div className="cinema-grain" aria-hidden />
          <div className="cinema-vignette" aria-hidden />
        </div>
      </div>

      <div className="stage-rail" role="tablist" aria-label="The five stages">
        {STAGES.map((s, i) => (
          <button
            key={s.stamp}
            type="button"
            role="tab"
            aria-selected={i === at}
            className={cn("stage-cell", "pressable")}
            onClick={() => {
              setCursor({ at: i, chars: 0 });
              setHeld(true);
            }}
          >
            <b>{s.stamp}</b>
            {s.name}
          </button>
        ))}
      </div>

      <p className="font-hand mt-3 text-center text-base text-muted-foreground rotate-[-1deg]">
        one output moves forward · pick a stage to hold it
      </p>
    </div>
  );
}
