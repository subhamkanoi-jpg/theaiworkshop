import { useEffect, useRef, useState, type PointerEvent } from "react";
import { LogoMark } from "@/components/LogoMark";
import {
  DEMO_KIT,
  DEMO_LINE,
  makeKit,
  parseKitPayload,
  type Kit,
} from "@/lib/makeKit";
import { WORKSHOP_DATE_LABEL, WORKSHOP_TITLE, PRICE, inr } from "@/config";
import { cn } from "@/lib/utils";

type Phase = "boot" | "idle" | "hold" | "print" | "done";

const SpeechRecognition =
  typeof window !== "undefined"
    ? (
        window as unknown as {
          SpeechRecognition?: new () => Rec;
          webkitSpeechRecognition?: new () => Rec;
        }
      ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => Rec })
        .webkitSpeechRecognition
    : undefined;

type Rec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult:
    | ((ev: {
        results: { length: number; [i: number]: { [j: number]: { transcript: string } } };
      }) => void)
    | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

async function polishKit(raw: string): Promise<Kit> {
  const local = makeKit(raw);
  try {
    const res = await fetch("/api/gasp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: raw.slice(0, 600) }),
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return local;
    return parseKitPayload(await res.json(), raw);
  } catch {
    return local;
  }
}

function kitShareText(kit: Kit) {
  return `The gasp. A trailer from The AI Workshop, Salt Lake.

${kit.offer}

${kit.bio}

${kit.posts.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Sunday 27 September. ${WORKSHOP_TITLE}. ${inr(PRICE)}.
https://www.theaiworkshop.in/share`;
}

export function TalkTrailer() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [draft, setDraft] = useState("");
  const [kit, setKit] = useState<Kit | null>(null);
  const [typed, setTyped] = useState(false);
  const [demo, setDemo] = useState(true);
  const recRef = useRef<Rec | null>(null);
  const holdRef = useRef(false);
  const draftRef = useRef("");
  const rootRef = useRef<HTMLElement | null>(null);
  const demoRan = useRef(false);
  const demoTimer = useRef<number | null>(null);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    return () => {
      recRef.current?.stop();
      if (demoTimer.current) window.clearInterval(demoTimer.current);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || demoRan.current) return;
        demoRan.current = true;
        runDemo();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runDemo() {
    setDemo(true);
    setTyped(false);
    setKit(null);
    setDraft("");
    setPhase("hold");
    let i = 0;
    if (demoTimer.current) window.clearInterval(demoTimer.current);
    demoTimer.current = window.setInterval(() => {
      i += 1;
      setDraft(DEMO_LINE.slice(0, i));
      if (i >= DEMO_LINE.length) {
        if (demoTimer.current) window.clearInterval(demoTimer.current);
        demoTimer.current = null;
        window.setTimeout(() => {
          setPhase("print");
          window.setTimeout(() => {
            setKit(DEMO_KIT);
            setPhase("done");
          }, 700);
        }, 280);
      }
    }, 28);
  }

  function startListen() {
    if (!SpeechRecognition) {
      setTyped(true);
      return;
    }
    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-IN";
      rec.interimResults = true;
      rec.continuous = true;
      rec.onresult = (ev) => {
        let out = "";
        for (let i = 0; i < ev.results.length; i++) {
          out += ev.results[i][0].transcript + " ";
        }
        const next = out.trim();
        draftRef.current = next;
        setDraft(next);
      };
      rec.onerror = () => setTyped(true);
      rec.start();
      recRef.current = rec;
    } catch {
      setTyped(true);
    }
  }

  function stopListen() {
    recRef.current?.stop();
    recRef.current = null;
  }

  async function printFrom(text: string) {
    const raw = text.trim();
    if (raw.length < 8) return;
    setDemo(false);
    setPhase("print");
    try {
      navigator.vibrate?.(40);
    } catch {
      /* ignore */
    }
    const next = await polishKit(raw);
    setKit(next);
    window.setTimeout(() => {
      setPhase("done");
      try {
        navigator.vibrate?.([12, 30, 24]);
      } catch {
        /* ignore */
      }
    }, 700);
  }

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    demoRan.current = true;
    holdRef.current = true;
    setDemo(false);
    setKit(null);
    setPhase("hold");
    setDraft("");
    draftRef.current = "";
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    startListen();
  }

  function onPointerUp() {
    if (!holdRef.current) return;
    holdRef.current = false;
    stopListen();
    const text = draftRef.current;
    if (text.trim().length < 8) {
      setTyped(true);
      setPhase("idle");
      return;
    }
    void printFrom(text);
  }

  function reset() {
    stopListen();
    setPhase("idle");
    setKit(null);
    setDraft("");
    setTyped(false);
    setDemo(false);
  }

  const showReceipt = phase === "done" && kit;

  return (
    <section
      id="try"
      ref={rootRef}
      className="border-t border-border bg-[#2a221d] text-[#f4eee4] py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="lg:pt-6">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8a090]">
              A trailer, on this phone
            </p>
            <h2 className="font-serif text-[1.85rem] sm:text-4xl lg:text-[2.7rem] font-semibold tracking-tight leading-[1.1] text-balance">
              Talk once.{" "}
              <span className="italic text-[#e8a090]">Watch a week start to print.</span>
            </h2>
            <p className="mt-5 text-[16px] sm:text-lg leading-relaxed text-[#f4eee4]/75 max-w-md">
              This is Sunday, shrunk to a pocket. Hold the button. Say what you
              actually do, the messy version. A receipt prints out of the phone.
              That is the trick you learn in Salt Lake.
            </p>
            <p className="mt-4 text-sm text-[#f4eee4]/55 max-w-md">
              No account. The words stay on this phone unless you share the
              slip. On 27 September you get a week of this, and the recipe to
              run it on Tuesday.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem]">
            <div className="phone-shell">
              <div className="phone-notch" />
              <div className={cn("phone-screen", showReceipt && "phone-screen-short")}>
                <div className="flex items-center justify-between px-5 pt-6 text-[10px] uppercase tracking-[0.14em] text-[#2a221d]/45">
                  <span>Salt Lake</span>
                  <span>11:00</span>
                </div>

                {!showReceipt && (
                  <div className="flex min-h-[24rem] flex-col items-center justify-between px-5 pb-6 pt-4">
                    <div className="text-center">
                      <LogoMark className="mx-auto h-10 w-10" />
                      <p className="mt-3 font-serif text-lg text-[#2a221d]">The gasp</p>
                      <p className="mt-1 text-xs text-[#2a221d]/55">
                        {phase === "hold"
                          ? demo
                            ? "A Salt Lake clinic, speaking."
                            : "Listening. Keep talking."
                          : "Hold to talk, or type."}
                      </p>
                    </div>

                    {typed ? (
                      <form
                        className="w-full"
                        onSubmit={(e) => {
                          e.preventDefault();
                          void printFrom(draft);
                        }}
                      >
                        <textarea
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          rows={4}
                          autoFocus
                          placeholder="I run a clinic in Salt Lake. Patients WhatsApp me all evening..."
                          className="w-full resize-none rounded-xl border border-[#2a221d]/15 bg-white/80 p-3 text-sm text-[#2a221d] placeholder:text-[#2a221d]/35"
                        />
                        <button
                          type="submit"
                          disabled={draft.trim().length < 8}
                          className="pressable mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#c8553d] text-sm font-bold text-white disabled:opacity-40"
                        >
                          Print the receipt
                        </button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className={cn(
                          "gasp-mic pressable",
                          phase === "hold" && "gasp-mic-hot",
                          phase === "print" && "opacity-60"
                        )}
                        aria-label="Hold to talk"
                      >
                        <span className="gasp-mic-ring" />
                        <span className="gasp-wave" aria-hidden>
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="relative z-10 text-white font-serif italic">
                          {phase === "print" ? "…" : phase === "hold" ? "go" : "hold"}
                        </span>
                      </button>
                    )}

                    <div className="min-h-[3.5rem] w-full text-center">
                      {phase === "hold" && draft && (
                        <p className="text-[13px] leading-snug text-[#2a221d]/70">{draft}</p>
                      )}
                      {phase === "print" && (
                        <p className="text-[13px] text-[#c8553d]">Printing…</p>
                      )}
                      {!typed && phase !== "hold" && phase !== "print" && (
                        <button
                          type="button"
                          className="text-xs text-[#2a221d]/50 underline underline-offset-2"
                          onClick={() => {
                            demoRan.current = true;
                            setTyped(true);
                            setPhase("idle");
                          }}
                        >
                          Prefer to type?
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {showReceipt && (
                  <div className="flex min-h-[8rem] flex-col items-center justify-center px-5 py-8 text-center">
                    <p className="font-serif text-lg text-[#2a221d]">Printed.</p>
                    <p className="mt-1 text-xs text-[#2a221d]/55">
                      Tear the slip. That is the Sunday in miniature.
                    </p>
                  </div>
                )}
              </div>
              <div className="phone-slot" aria-hidden />
            </div>

            {showReceipt && kit && (
              <div className="receipt-hang" role="status">
                <div className="flex items-start justify-between gap-3">
                  <LogoMark className="h-8 w-8" />
                  <p className="text-right text-[10px] uppercase tracking-[0.14em] text-[#2a221d]/50">
                    Salt Lake
                    <br />
                    27 Sept 2026
                  </p>
                </div>
                <p className="mt-4 font-serif text-xl leading-tight text-[#2a221d]">{kit.offer}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#2a221d]/75">{kit.bio}</p>
                <div className="mt-4 space-y-2 border-t border-dashed border-[#2a221d]/20 pt-3">
                  {kit.posts.map((p, i) => (
                    <p key={i} className="text-[12px] leading-snug text-[#2a221d]/80">
                      <span className="font-semibold text-[#c8553d]">W{i + 1}. </span>
                      {p}
                    </p>
                  ))}
                </div>
                <p className="mt-4 font-hand text-lg text-[#c8553d] -rotate-1">
                  {demo ? "a Salt Lake example" : "a trailer, not the Sunday"}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#2a221d]/40">
                  {WORKSHOP_TITLE} · {inr(PRICE)} · {WORKSHOP_DATE_LABEL}
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2">
              {showReceipt ? (
                <>
                  <a
                    href="/book"
                    className="pressable inline-flex min-h-12 items-center justify-center rounded-full bg-[#c8553d] px-6 text-sm font-bold text-white"
                  >
                    Reserve 27 September
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(kitShareText(kit))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable inline-flex min-h-12 items-center justify-center rounded-full border border-[#f4eee4]/20 px-6 text-sm font-medium text-[#f4eee4]"
                  >
                    Forward this slip
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="pressable inline-flex min-h-12 items-center justify-center rounded-full border border-[#f4eee4]/20 px-6 text-sm font-medium text-[#f4eee4]"
                  >
                    Try your own sentence
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    demoRan.current = true;
                    runDemo();
                  }}
                  className="inline-flex min-h-11 items-center justify-center text-sm text-[#f4eee4]/55 hover:text-[#f4eee4]"
                >
                  Replay the Salt Lake example
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
