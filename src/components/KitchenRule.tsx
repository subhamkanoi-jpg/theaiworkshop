import { LogoMark } from "@/components/LogoMark";

/**
 * The system, argued visually.
 *
 * The first version of this section made the case in three essays. It does not
 * need them: put the nine-word prompt beside the shape of a real one and the
 * asymmetry lands before anybody reads a line. The maxims are the only prose
 * left standing.
 */

const PLAN = [
  { label: "Premise", line: "Man alone in a blizzard, UGC…" },
  { label: "Constraints", line: "Accent · jacket · snow · alone…" },
  { label: "Structure lock", line: "Exactly 6 shots, in order…" },
  { label: "Shot breakdown", line: "Duration, camera, lens, action…" },
];

const MAXIMS = [
  "One output moves forward",
  "A plan, not an idea",
];

export function KitchenRule() {
  return (
    <section
      id="recipe"
      className="cinema-room relative overflow-hidden"
      aria-labelledby="recipe-heading"
    >
      <div className="cinema-beam" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
              The system
            </p>
            <h2
              id="recipe-heading"
              className="font-serif text-[1.85rem] font-semibold leading-[1.05] tracking-tight text-balance text-[#f4eee4] sm:text-4xl lg:text-[2.7rem]"
            >
              Same model. Same afternoon.
              <br />
              <span className="italic text-[#e8a090]">Different prompt.</span>
            </h2>
          </div>
          <LogoMark className="hidden h-14 w-14 opacity-90 sm:block" />
        </div>

        <div className="mt-9 grid items-start gap-4 lg:grid-cols-2">
          {/* Weak — the emptiness is the argument. */}
          <div className="rounded-xl border border-[#f4eee4]/12 bg-[#f4eee4]/[0.04] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4eee4]/45">
              Most people type
            </p>
            <p className="gate-term mt-4 text-[#f4eee4]/85">
              <span className="gate-term-dim">&gt;&nbsp;</span>
              Make a video of a man making coffee in snow.
            </p>
            <p className="mt-8 font-serif text-5xl leading-none text-[#f4eee4]/30">
              9 words
            </p>
          </div>

          {/* Strong — the density is the argument. */}
          <div className="rounded-xl border border-[#c8553d]/35 bg-[#c8553d]/[0.07] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
              We type
            </p>
            <dl className="mt-4 grid gap-2.5">
              {PLAN.map((b) => (
                <div key={b.label}>
                  <dt className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#e8a090]/80">
                    {b.label}
                  </dt>
                  <dd className="gate-term truncate text-[#f4eee4]/70">{b.line}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-serif text-5xl leading-none text-[#c8553d]">
              180 words
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {MAXIMS.map((m) => (
            <li
              key={m}
              className="rounded-full border border-[#f4eee4]/15 px-4 py-2 text-sm font-medium text-[#f4eee4]/70"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
