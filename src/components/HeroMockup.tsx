import { MedabrainMark } from "./Logo";

export default function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(45,212,191,0.22),transparent_70%)] blur-2xl" />

      {/* main window */}
      <div className="glass animate-float relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] [animation-duration:9s]">
        {/* titlebar */}
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="mx-auto flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 font-mono text-[10.5px] text-ink-400">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            medschoolprep.cloud/home
          </div>
        </div>

        <div className="grid grid-cols-[56px_1fr] sm:grid-cols-[168px_1fr]">
          {/* sidebar */}
          <aside className="border-r border-white/8 p-2.5 sm:p-3">
            <div className="mb-3 hidden items-center gap-2 px-1.5 sm:flex">
              <MedabrainMark className="h-5 w-5" />
              <span className="text-[11.5px] font-semibold text-white">Medabrain</span>
            </div>
            {[
              { l: "Home", on: true },
              { l: "Prep" },
              { l: "Portfolio" },
              { l: "Roadmap" },
              { l: "Plans" },
              { l: "Quiz library" },
              { l: "Scholarships" },
              { l: "Interview lab", lock: true },
              { l: "Match insights", lock: true },
            ].map((it) => (
              <div
                key={it.l}
                className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] ${
                  it.on ? "bg-white/8 text-white" : "text-ink-300"
                } ${it.lock ? "opacity-45" : ""}`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    it.on ? "bg-mint-400" : "bg-ink-500/60"
                  }`}
                />
                <span className="hidden truncate sm:inline">{it.l}</span>
                {it.lock && (
                  <svg className="ml-auto hidden h-3 w-3 sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                )}
              </div>
            ))}
          </aside>

          {/* main */}
          <div className="p-3.5 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10.5px] text-ink-400">Wednesday · 214 days to AMCAS</p>
                <p className="font-display text-[15px] font-semibold text-white">
                  Good morning, Priya
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-mint-400/25 bg-mint-400/10 px-2 py-1 text-[10.5px] font-medium text-mint-300">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                On track
              </div>
            </div>

            {/* stat row */}
            <div className="mb-3 grid grid-cols-3 gap-2">
              {[
                { k: "Pathway fit", v: "MD 92", c: "#2dd4bf" },
                { k: "Résumé score", v: "84", c: "#a78bfa" },
                { k: "This week", v: "11.5h", c: "#fcd34d" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                  <p className="text-[9.5px] uppercase tracking-wider text-ink-400">{s.k}</p>
                  <p className="font-display mt-0.5 text-[15px] font-bold text-white">
                    {s.v}
                  </p>
                  <div className="mt-1.5 h-1 rounded-full bg-white/8">
                    <div className="h-full w-4/5 rounded-full" style={{ background: s.c }} />
                  </div>
                </div>
              ))}
            </div>

            {/* medabrain card */}
            <div className="mb-3 rounded-xl border border-mint-400/25 bg-gradient-to-br from-mint-400/12 to-transparent p-3">
              <div className="flex items-center gap-2">
                <MedabrainMark className="h-5 w-5" />
                <span className="text-[11px] font-semibold text-mint-300">Medabrain · today</span>
                <span className="ml-auto font-mono text-[9.5px] text-ink-400">just now</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-100">
                Your Chem/Phys practice average dipped to 124. I moved
                Friday&apos;s Anki block to a targeted physics set and asked
                Roadmap to protect your Saturday full-length.
              </p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-md bg-mint-400 px-2 py-1 text-[10.5px] font-semibold text-ink-950">
                  Looks good
                </span>
                <span className="rounded-md border border-white/10 px-2 py-1 text-[10.5px] text-ink-300">
                  Explain
                </span>
              </div>
            </div>

            {/* today & roadmap mini */}
            <div className="grid gap-2 sm:grid-cols-[1fr_1fr]">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                <p className="mb-1.5 text-[9.5px] uppercase tracking-wider text-ink-400">Today&apos;s plan</p>
                {[
                  { t: "CARS passage set", m: "50m", done: true },
                  { t: "Bio ch. 7 — renal", m: "40m", done: true },
                  { t: "Essay: draft 3 edits", m: "30m" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-2 py-1 text-[11px]">
                    <span
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border ${
                        r.done ? "border-mint-400 bg-mint-400 text-ink-950" : "border-white/20"
                      }`}
                    >
                      {r.done && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                    <span className={r.done ? "text-ink-400 line-through" : "text-ink-100"}>
                      {r.t}
                    </span>
                    <span className="ml-auto font-mono text-[9.5px] text-ink-400">{r.m}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
                <p className="mb-1.5 text-[9.5px] uppercase tracking-wider text-ink-400">Roadmap · next up</p>
                {[
                  { t: "Ask Dr. Osei for LOR", w: "start this week", c: "#a78bfa" },
                  { t: "MCAT · Jun 14", w: "in 61 days", c: "#38bdf8" },
                  { t: "AMCAS opens", w: "May 1", c: "#fcd34d" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-2 py-1 text-[11px]">
                    <span className="h-3 w-[3px] rounded" style={{ background: r.c }} />
                    <span className="truncate text-ink-100">{r.t}</span>
                    <span className="ml-auto shrink-0 text-[9.5px] text-ink-400">{r.w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating card: résumé score */}
      <div className="animate-float absolute top-[30%] -left-8 hidden w-[168px] rounded-xl border border-white/12 bg-ink-850/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl [animation-delay:-3s] [animation-duration:8s] lg:block xl:-left-16">
        <p className="text-[10px] uppercase tracking-wider text-ink-400">Résumé · self-score</p>
        <div className="mt-1 flex items-end gap-1.5">
          <span className="font-display text-2xl font-bold text-white">84</span>
          <span className="mb-1 rounded bg-mint-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-mint-300">
            +9
          </span>
        </div>
        <div className="mt-2 flex gap-[3px]">
          {[40, 55, 48, 62, 70, 66, 75, 84].map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm bg-violet-400/70"
              style={{ height: `${h / 3}px`, opacity: 0.4 + i * 0.08 }}
            />
          ))}
        </div>
      </div>

      {/* floating card: unlock */}
      <div className="animate-float absolute -right-6 bottom-[10%] hidden w-[204px] rounded-xl border border-white/12 bg-ink-850/95 p-3 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl [animation-delay:-5s] [animation-duration:10s] lg:block xl:-right-14">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-300/15 text-amber-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 7.5-2" />
            </svg>
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-white">New surface unlocked</p>
            <p className="text-[10.5px] text-ink-400">Interview Lab · MMI drills</p>
          </div>
        </div>
      </div>
    </div>
  );
}
