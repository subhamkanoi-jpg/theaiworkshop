import { LogoMark } from "@/components/LogoMark";

/**
 * The system, argued visually.
 *
 * The first version of this section made the case in three essays. It does not
 * need them: put what most people do with an enquiry beside the shape of the
 * machine we build, and the wait for a reply lands before anybody reads a line.
 * The maxims are the only prose left standing.
 */

const HABITS = [
  "Reply when there is time",
  "Forget the second follow-up",
  "Type the price list out again",
];

const PLAN = [
  { label: "Trigger", line: "New form entry → Leads sheet" },
  { label: "AI step", line: "Gemini writes from your brief" },
  { label: "Sequence", line: "Day 2 · 5 · 9, stops on reply" },
  { label: "Bot", line: "Answers from your price list" },
];

const MAXIMS = [
  "Draft before you send",
  "Your facts, not its guesses",
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
              Same leads. Same Monday.
              <br />
              <span className="italic text-[#e8a090]">Different system.</span>
            </h2>
          </div>
          <LogoMark className="hidden h-14 w-14 opacity-90 sm:block" />
        </div>

        <div className="mt-9 grid items-start gap-4 lg:grid-cols-2">
          {/* Weak — the habits are the argument. */}
          <div className="rounded-xl border border-[#f4eee4]/12 bg-[#f4eee4]/[0.04] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4eee4]/45">
              Most people do
            </p>
            <ul className="mt-4 grid gap-1">
              {HABITS.map((habit) => (
                <li key={habit} className="gate-term text-[#f4eee4]/55">
                  <span className="gate-term-dim" aria-hidden>
                    –&nbsp;
                  </span>
                  {habit}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
              <span className="font-serif text-5xl leading-none text-[#f4eee4]/30">
                Whenever
              </span>
              <span className="text-sm text-[#f4eee4]/45">to reply</span>
            </p>
          </div>

          {/* Strong — the shape of the machine is the argument. */}
          <div className="rounded-xl border border-[#c8553d]/35 bg-[#c8553d]/[0.07] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
              We build
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
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
              <span className="font-serif text-5xl leading-none text-[#c8553d]">
                1 hour
              </span>
              <span className="text-sm text-[#e8a090]/70">to reply</span>
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
