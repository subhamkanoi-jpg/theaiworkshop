import { LogoMark } from "@/components/LogoMark";

/**
 * The methodology section. The site keeps exactly one true-black room, and the
 * argument for the system belongs in it: the weak prompt and the production
 * plan sit side by side, and the length difference makes the case before
 * anybody reads a word.
 */

const WEAK = "Make a video of a man making coffee in snow.";

const STRONG = [
  {
    label: "Premise",
    body: "An Indian man alone in a heavy snow blizzard, making coffee step by step while filming himself. Ultra-realistic, shot like a UGC video captured on an iPhone-style front and back camera.",
  },
  {
    label: "Global constraints",
    body: "Simple English, Indian accent, natural delivery. Bright orange and dark yellow high-visibility winter jacket. Heavy snowfall, strong wind, low visibility. He is completely alone — no cameraman, no second person. Product label stays sharp and readable.",
  },
  {
    label: "Structure lock",
    body: "Exactly 6 shots. All 6 are mandatory. No shot skipping. No merged shots. Order must be 1 → 2 → 3 → 4 → 5 → 6.",
  },
  {
    label: "Shot breakdown",
    body: "Per shot: number, name, duration, camera, lens, framing, action, dialogue, performance, environment, motion, lighting.",
  },
];

const CHAIN = [
  {
    tool: "ChatGPT / Claude",
    job: "Strategy, script, scene breakdown, and every prompt the other three tools will run",
  },
  {
    tool: "Nano Banana Pro",
    job: "The face lock and the base stills — the frames that decide how good the video can possibly be",
  },
  {
    tool: "Google Flow / Veo",
    job: "Motion only. Camera behaviour, subject movement, and the list of things that must not happen",
  },
  {
    tool: "ElevenLabs",
    job: "The read. Bracketed cues for text-to-speech, or voice changing over a take you recorded yourself",
  },
];

export function KitchenRule() {
  return (
    <section
      id="recipe"
      className="cinema-room relative overflow-hidden"
      aria-labelledby="recipe-heading"
    >
      <div className="cinema-beam" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
              The kitchen rule · The system we run
            </p>
            <h2
              id="recipe-heading"
              className="font-serif text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-balance text-[#f4eee4] sm:text-4xl lg:text-[2.7rem]"
            >
              You do not throw everything in the pan{" "}
              <span className="italic text-[#e8a090]">at once.</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#f4eee4]/70 sm:text-lg">
              Prepare the ingredients. Choose the recipe. Cook in order. Taste
              and fix. Three rules hold the whole thing together, and they are
              the reason the ad you leave with does not look like the ones you
              have been throwing away.
            </p>
          </div>
          <LogoMark className="hidden h-14 w-14 opacity-90 sm:block" />
        </div>

        {/* Rule 01 */}
        <div className="mt-12 border-t border-[#f4eee4]/12 pt-8 sm:mt-16">
          <div className="grid gap-6 lg:grid-cols-[7rem_1fr]">
            <p className="font-serif text-4xl leading-none text-[#c8553d] sm:text-5xl">
              01
            </p>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#fbf6ea] sm:text-[1.75rem]">
                One output moves forward
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#f4eee4]/70">
                Not three scripts, four characters, and six visual styles. One.
                At every stage you pick the strongest result, fold it into the
                state pack, and delete the rest. Prompt bloat is what turns a
                three-hour build into a three-week one, and carrying options
                forward is how most people quietly never finish anything.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#f4eee4]/70">
                The state pack is the save file. Stop in the middle and you do
                not restart the game — you load it and continue.
              </p>
            </div>
          </div>
        </div>

        {/* Rule 02 — with the comparison that carries the argument */}
        <div className="mt-10 border-t border-[#f4eee4]/12 pt-8">
          <div className="grid gap-6 lg:grid-cols-[7rem_1fr]">
            <p className="font-serif text-4xl leading-none text-[#c8553d] sm:text-5xl">
              02
            </p>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#fbf6ea] sm:text-[1.75rem]">
                A production plan, not an idea
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#f4eee4]/70">
                A weak prompt gives the tool an idea. A strong prompt gives it a
                production plan. Same subject, same model, same afternoon — the
                difference is entirely in what you were willing to specify.
              </p>

              <div className="mt-7 grid items-start gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-[#f4eee4]/12 bg-[#f4eee4]/[0.04] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4eee4]/45">
                    Weak prompt
                  </p>
                  <p className="gate-term mt-3 text-[#f4eee4]/85">
                    <span className="gate-term-dim">&gt;&nbsp;</span>
                    {WEAK}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-[#f4eee4]/45">
                    Nine words. Everything that matters — who he is, what he
                    wears, how it is shot, how many shots there are — is left
                    for the model to guess. It will guess, and that is the
                    sludge.
                  </p>
                </div>

                <div className="rounded-xl border border-[#c8553d]/35 bg-[#c8553d]/[0.07] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8a090]">
                    Production plan
                  </p>
                  <dl className="mt-3 grid gap-3">
                    {STRONG.map((block) => (
                      <div key={block.label}>
                        <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#e8a090]/80">
                          {block.label}
                        </dt>
                        <dd className="gate-term mt-1 text-[#f4eee4]/85">
                          {block.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 03 */}
        <div className="mt-10 border-t border-[#f4eee4]/12 pt-8">
          <div className="grid gap-6 lg:grid-cols-[7rem_1fr]">
            <p className="font-serif text-4xl leading-none text-[#c8553d] sm:text-5xl">
              03
            </p>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#fbf6ea] sm:text-[1.75rem]">
                Nothing gets punted to the next tool
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#f4eee4]/70">
                You do not talk to a strategist, a photographer, and a singer
                the same way. Each tool has one job and one prompt shape, and a
                problem you leave unsolved at one step does not get fixed at the
                next one — it gets amplified. A melted face in the still is a
                melted face in the video.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {CHAIN.map((step, i) => (
                  <div
                    key={step.tool}
                    className="rounded-xl border border-[#f4eee4]/12 bg-[#f4eee4]/[0.04] p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#e8a090]">
                      Step {i + 1} · {step.tool}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#f4eee4]/70">
                      {step.job}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#f4eee4]/45">
                Editing happens in CapCut, Premiere, or DaVinci — whichever you
                already have. We are not going to make you learn a new editor on
                a Sunday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
