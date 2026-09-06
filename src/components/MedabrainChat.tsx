"use client";

import { useEffect, useRef, useState } from "react";
import { MedabrainMark } from "./Logo";

type Msg = { role: "user" | "medabrain"; text: string; chips?: string[] };

const SCRIPT: Msg[] = [
  {
    role: "user",
    text: "I have 14 hrs/week and my MCAT is in June. Is my plan realistic?",
  },
  {
    role: "medabrain",
    text: "Honestly? Not quite. Your plan needs ~19 hrs/week to cover CARS and Bio/Biochem before June 14. Two options: move the test to July 26, or drop the shadowing block until after the exam. I'd take option two — your clinical hours are already strong.",
    chips: ["Shift MCAT to Jul 26", "Pause shadowing", "Show the math"],
  },
  {
    role: "user",
    text: "Pause shadowing. Also — can you look at my activities section?",
  },
  {
    role: "medabrain",
    text: "Done — Plans rebuilt, Roadmap updated. On your activities: your research entry describes tasks, not impact. Lead with the 40% reduction in sample-prep time you mentioned in your résumé. Want me to draft a stronger 700-character version?",
    chips: ["Draft it", "Open Portfolio"],
  },
];

export default function MedabrainChat() {
  const [shown, setShown] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [partial, setPartial] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timers: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const t = window.setTimeout(r, ms);
        timers.push(t);
      });

    async function play() {
      while (!cancelled) {
        setShown([]);
        setPartial("");
        await wait(600);
        for (const msg of SCRIPT) {
          if (cancelled) return;
          if (msg.role === "user") {
            await wait(500);
            setShown((s) => [...s, msg]);
          } else {
            setTyping(true);
            await wait(1100);
            setTyping(false);
            // stream text
            const words = msg.text.split(" ");
            let acc = "";
            for (const w of words) {
              if (cancelled) return;
              acc += (acc ? " " : "") + w;
              setPartial(acc);
              await wait(26 + Math.random() * 30);
            }
            setPartial("");
            setShown((s) => [...s, msg]);
            await wait(1400);
          }
        }
        await wait(5200);
      }
    }
    play();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
      timers = [];
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, partial, typing]);

  return (
    <div className="glass relative flex h-[460px] flex-col overflow-hidden rounded-2xl sm:h-[500px]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MedabrainMark className="h-9 w-9" />
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-mint-400" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Medabrain
            </p>
            <p className="text-[11px] text-ink-400">
              Reads your Plans · Roadmap · Portfolio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ink-300">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
          Context: 3 modules
        </div>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="scrollbar-none flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {shown.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <MedabrainMark className="h-6 w-6 shrink-0" />
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-mint-300"
                  style={{ animationDelay: `${d * 0.16}s` }}
                />
              ))}
            </div>
          </div>
        )}
        {partial && (
          <Bubble msg={{ role: "medabrain", text: partial }} streaming />
        )}
      </div>

      {/* composer */}
      <div className="border-t border-white/8 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-ink-900/70 px-3 py-2.5">
          <span className="flex-1 text-[13px] text-ink-400">
            Ask Medabrain anything about your journey…
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-mint-400 text-ink-950">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg, streaming }: { msg: Msg; streaming?: boolean }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-br from-mint-500 to-mint-600 px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-[0_8px_24px_-8px_rgba(20,184,166,0.6)]">
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <MedabrainMark className="h-6 w-6 shrink-0" />
      <div className="max-w-[86%]">
        <div className="rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-100">
          {msg.text}
          {streaming && (
            <span className="ml-0.5 inline-block h-[13px] w-[2px] translate-y-[2px] animate-blink bg-mint-300" />
          )}
        </div>
        {msg.chips && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {msg.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-mint-400/30 bg-mint-400/10 px-2.5 py-1 text-[11.5px] font-medium text-mint-300"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
