"use client";

import { useEffect, useState } from "react";
import { MedabrainMark } from "./Logo";

type Pillar = {
  key: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  accent: string;
  icon: React.ReactNode;
};

const PILLARS: Pillar[] = [
  {
    key: "prep",
    label: "Prep",
    eyebrow: "01 — Discover & learn",
    title: "Find the health career that actually fits how you think.",
    body: "Prep scores ten different pathways against your thinking style — not just your GPA. Then it hands you a full curriculum and quiz library, with Medabrain inside every lesson.",
    bullets: [
      "10 pathways scored against your reasoning, values and tolerance for risk",
      "Full curriculum, structured by pathway, with a growing quiz library",
      "Medabrain sits inside every lesson to explain, quiz and re-teach",
    ],
    accent: "#2dd4bf",
    icon: (
      <path d="M4 19V6a2 2 0 0 1 2-2h7l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Zm9-15v5h5M8 13h8M8 17h5" />
    ),
  },
  {
    key: "portfolio",
    label: "Portfolio",
    eyebrow: "02 — Build your application",
    title: "Your entire application, in one place — and it grades itself.",
    body: "Essays, college list, financial aid, scholarships, and a résumé that scores itself. Medabrain reads your activities and offers advice that's specific to you, not a template.",
    bullets: [
      "Personal statement & secondaries with version history",
      "College list with fit signals, deadlines and cost-of-attendance",
      "Self-scoring résumé — Medabrain flags weak entries before a reviewer does",
    ],
    accent: "#a78bfa",
    icon: (
      <path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm5 6h8M8 11h4" />
    ),
  },
  {
    key: "roadmap",
    label: "Roadmap",
    eyebrow: "03 — See the year ahead",
    title: "Not just deadlines — when you need to start.",
    body: "Roadmap visualizes your next twelve months and shows the realistic working window for every milestone. Drag a deadline, and everything upstream of it adjusts.",
    bullets: [
      "12-month view with start windows, not just due dates",
      "Realistic durations based on what students actually take",
      "Adjust one milestone and the plan re-flows dynamically",
    ],
    accent: "#38bdf8",
    icon: (
      <path d="M4 6h16M4 12h10M4 18h6M17 15l3 3-3 3M14 9l3-3-3-3" />
    ),
  },
  {
    key: "plans",
    label: "Plans",
    eyebrow: "04 — Execute daily",
    title: "A day-by-day schedule that tells you the truth.",
    body: "Plans builds a daily schedule from your pathway, goals, and real available time. Log progress and it adapts — and it will honestly tell you when your goals and calendar don't match.",
    bullets: [
      "Built from your pathway, goals and hours you actually have",
      "Adapts every time you log a session — no manual re-planning",
      "Misalignment alerts: it says so when the math doesn't work",
    ],
    accent: "#fcd34d",
    icon: (
      <path d="M8 3v3M16 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 9 2 2 4-4" />
    ),
  },
];

export default function PillarTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PILLARS.length), 7000);
    return () => clearInterval(t);
  }, [paused, active]);

  const p = PILLARS[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
    >
      {/* left: tab list */}
      <div className="flex flex-col gap-2">
        {PILLARS.map((pl, i) => {
          const isActive = i === active;
          return (
            <button
              key={pl.key}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              aria-pressed={isActive}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 sm:p-5 ${
                isActive
                  ? "glass border-white/12"
                  : "border-transparent hover:border-white/8 hover:bg-white/[0.02]"
              }`}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-0 h-full w-[3px] rounded-r"
                  style={{ background: pl.accent }}
                />
              )}
              <div className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-colors"
                  style={{
                    background: isActive ? `${pl.accent}1f` : "rgba(255,255,255,0.03)",
                    color: isActive ? pl.accent : "#98a4bd",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {pl.icon}
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                    {pl.eyebrow}
                  </p>
                  <p
                    className={`font-display mt-0.5 text-[15.5px] font-semibold tracking-tight ${
                      isActive ? "text-white" : "text-ink-200"
                    }`}
                  >
                    {pl.title}
                  </p>
                  <div
                    className={`grid transition-all duration-500 ${
                      isActive
                        ? "mt-2 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[13.5px] leading-relaxed text-ink-300">
                        {pl.body}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {pl.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[13px] text-ink-200"
                          >
                            <svg
                              className="mt-[3px] h-3.5 w-3.5 shrink-0"
                              style={{ color: pl.accent }}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* progress bar for auto-advance */}
              {isActive && !paused && (
                <span
                  key={active}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                  style={{
                    background: pl.accent,
                    opacity: 0.5,
                    animation: "grow 7s linear forwards",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* right: mockup */}
      <div className="relative min-h-[420px]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] blur-3xl transition-colors duration-700"
          style={{ background: `${p.accent}14` }}
        />
        <div key={p.key} className="animate-scale-in h-full">
          {p.key === "prep" && <PrepMock accent={p.accent} />}
          {p.key === "portfolio" && <PortfolioMock accent={p.accent} />}
          {p.key === "roadmap" && <RoadmapMock accent={p.accent} />}
          {p.key === "plans" && <PlansMock accent={p.accent} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Mockups ---------------------------- */

function Frame({
  title,
  crumbs,
  children,
}: {
  title: string;
  crumbs: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-2 text-[12px] text-ink-400">
          {crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink-600">/</span>}
              <span className={i === crumbs.length - 1 ? "text-ink-200" : ""}>
                {c}
              </span>
            </span>
          ))}
        </div>
        <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10.5px] text-ink-400">
          {title}
        </span>
      </div>
      <div className="flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

function PrepMock({ accent }: { accent: string }) {
  const pathways = [
    { name: "Physician (MD/DO)", score: 92 },
    { name: "Physician Assistant", score: 81 },
    { name: "Emergency Medicine track", score: 77 },
    { name: "Dentistry", score: 64 },
    { name: "Pharmacy", score: 52 },
    { name: "Public Health", score: 48 },
  ];
  return (
    <Frame title="prep.pathfinder" crumbs={["Prep", "Pathway fit"]}>
      <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Your fit across 10 pathways
          </p>
          <div className="mt-3 space-y-2.5">
            {pathways.map((p, i) => (
              <div key={p.name}>
                <div className="mb-1 flex items-center justify-between text-[12.5px]">
                  <span className={i === 0 ? "font-medium text-white" : "text-ink-200"}>
                    {p.name}
                  </span>
                  <span className="font-mono text-ink-300">{p.score}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                  <div
                    className="h-full origin-left rounded-full animate-grow"
                    style={{
                      width: `${p.score}%`,
                      background:
                        i === 0
                          ? `linear-gradient(90deg, ${accent}, #7ff5e0)`
                          : "rgba(255,255,255,0.28)",
                      animationDelay: `${i * 90}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/8 bg-ink-900/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              Lesson 4.2
            </p>
            <p className="mt-1 text-[13px] font-medium text-white">
              Renal physiology: filtration &amp; clearance
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-white/8">
                <div className="h-full w-2/3 rounded-full" style={{ background: accent }} />
              </div>
              <span className="font-mono text-[10.5px] text-ink-400">66%</span>
            </div>
          </div>
          <div className="rounded-xl border border-mint-400/20 bg-mint-400/6 p-3">
            <div className="flex items-center gap-2">
              <MedabrainMark className="h-5 w-5" />
              <span className="text-[11px] font-semibold text-mint-300">
                Medabrain · in-lesson
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-200">
              You missed two GFR questions in a row. Want a 3-minute re-teach
              with a clinical case instead of formulas?
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md bg-mint-400 px-2 py-1 text-[11px] font-semibold text-ink-950">
                Yes, re-teach
              </span>
              <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-ink-300">
                Quiz me again
              </span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function PortfolioMock({ accent }: { accent: string }) {
  const score = 84;
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <Frame title="portfolio.resume" crumbs={["Portfolio", "Résumé"]}>
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/8 bg-ink-900/60 p-4">
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="7" fill="none" />
              <circle
                cx="40"
                cy="40"
                r={r}
                stroke={accent}
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - score / 100)}
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-white">{score}</span>
              <span className="text-[10px] uppercase tracking-wider text-ink-400">score</span>
            </div>
          </div>
          <p className="mt-2 text-center text-[11.5px] text-ink-300">
            Self-scored · +9 this week
          </p>
        </div>
        <div className="space-y-2.5">
          {[
            { k: "Personal statement", v: "Draft 3 · 4,912 / 5,300 chars", s: "ok" },
            { k: "College list", v: "18 schools · 6 reach · 9 target · 3 safety", s: "ok" },
            { k: "Scholarships", v: "4 matched · 1 due in 9 days", s: "warn" },
            { k: "Financial aid", v: "FAFSA complete · CSS in progress", s: "ok" },
          ].map((row) => (
            <div
              key={row.k}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
            >
              <div>
                <p className="text-[12.5px] font-medium text-white">{row.k}</p>
                <p className="text-[11.5px] text-ink-400">{row.v}</p>
              </div>
              <span
                className={`h-2 w-2 rounded-full ${
                  row.s === "warn" ? "bg-amber-300" : "bg-mint-400"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-xl border p-3" style={{ borderColor: `${accent}40`, background: `${accent}0f` }}>
        <div className="flex items-center gap-2">
          <MedabrainMark className="h-5 w-5" />
          <span className="text-[11px] font-semibold" style={{ color: accent }}>
            Medabrain read your activities
          </span>
        </div>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-200">
          Entry #3 “Volunteer, Free Clinic” lists duties but no outcome. You
          logged 210 hours and trained 4 new volunteers — lead with that.
        </p>
      </div>
    </Frame>
  );
}

function RoadmapMock({ accent }: { accent: string }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const items = [
    { label: "MCAT prep → exam", start: 0, len: 5.5, due: 5.5, color: accent },
    { label: "Letters of rec (ask early)", start: 1.5, len: 3, due: 4.5, color: "#a78bfa" },
    { label: "Personal statement", start: 2, len: 3.5, due: 5.5, color: "#2dd4bf" },
    { label: "AMCAS primary", start: 4.5, len: 1.5, due: 6, color: "#fcd34d" },
    { label: "Secondaries", start: 6, len: 2.5, due: 8.5, color: "#fb7185" },
    { label: "Interviews", start: 8.5, len: 3.5, due: 12, color: "#38bdf8" },
  ];
  const nowMonth = 3.4;
  return (
    <Frame title="roadmap.12mo" crumbs={["Roadmap", "Next 12 months"]}>
      <div className="mb-2 grid grid-cols-12 text-[10px] font-medium uppercase tracking-wider text-ink-400">
        {months.map((m) => (
          <span key={m} className="text-center">{m}</span>
        ))}
      </div>
      <div className="relative space-y-2">
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-white/60"
          style={{ left: `${(nowMonth / 12) * 100}%` }}
        >
          <span className="absolute -top-1 -left-[3px] h-[7px] w-[7px] rounded-full bg-white" />
          <span className="absolute -bottom-5 -translate-x-1/2 rounded bg-white px-1.5 py-0.5 text-[9px] font-semibold text-ink-950">
            today
          </span>
        </div>
        {items.map((it, i) => (
          <div key={it.label} className="relative h-9 rounded-lg bg-white/[0.03]">
            {/* start window (dashed) */}
            <div
              className="absolute top-1/2 h-6 -translate-y-1/2 rounded-md border border-dashed"
              style={{
                left: `${(it.start / 12) * 100}%`,
                width: `${(it.len / 12) * 100}%`,
                borderColor: `${it.color}80`,
                background: `${it.color}14`,
                animation: `fade-up 0.6s ${i * 80}ms both`,
              }}
            >
              <span className="absolute top-1/2 left-2 -translate-y-1/2 truncate text-[11px] font-medium text-white" style={{ maxWidth: "calc(100% - 12px)" }}>
                {it.label}
              </span>
            </div>
            {/* due marker */}
            <span
              className="absolute top-1/2 h-4 w-[3px] -translate-y-1/2 rounded"
              style={{ left: `calc(${(it.due / 12) * 100}% - 2px)`, background: it.color }}
            />
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded border border-dashed border-ink-300/60" /> start working
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-[3px] rounded bg-ink-200" /> deadline
        </span>
        <span className="ml-auto text-ink-300">Drag a deadline → upstream windows re-flow</span>
      </div>
    </Frame>
  );
}

function PlansMock({ accent }: { accent: string }) {
  const days = [
    { d: "Mon", items: ["CARS · 50m", "Bio ch. 7 · 40m"], done: 2 },
    { d: "Tue", items: ["Full-length review · 90m"], done: 1 },
    { d: "Wed", items: ["Chem/Phys · 60m", "Essay edit · 30m"], done: 1 },
    { d: "Thu", items: ["Rest day"], done: 0, rest: true },
    { d: "Fri", items: ["Biochem · 50m", "Anki · 25m"], done: 0 },
    { d: "Sat", items: ["Practice test · 6h"], done: 0 },
    { d: "Sun", items: ["Review · 90m", "Weekly log"], done: 0 },
  ];
  return (
    <Frame title="plans.week" crumbs={["Plans", "Week 14 of 22"]}>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, i) => (
          <div
            key={day.d}
            className={`rounded-xl border p-2 ${
              i === 2 ? "border-white/20 bg-white/[0.06]" : "border-white/8 bg-white/[0.02]"
            }`}
            style={{ animation: `fade-up 0.5s ${i * 60}ms both` }}
          >
            <p className={`text-[10.5px] font-semibold uppercase tracking-wider ${i === 2 ? "text-white" : "text-ink-400"}`}>
              {day.d}
            </p>
            <div className="mt-1.5 space-y-1">
              {day.items.map((it, j) => (
                <div
                  key={it}
                  className={`rounded-md px-1.5 py-1 text-[9.5px] leading-tight sm:text-[10.5px] ${
                    day.rest
                      ? "bg-white/5 text-ink-400"
                      : j < day.done
                        ? "text-ink-950"
                        : "bg-white/6 text-ink-200"
                  }`}
                  style={j < day.done && !day.rest ? { background: accent } : undefined}
                >
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border border-white/8 bg-ink-900/60 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">This week</p>
          <div className="mt-2 flex items-end gap-1.5">
            <span className="font-display text-2xl font-bold text-white">11.5</span>
            <span className="mb-1 text-[12px] text-ink-400">/ 14 hrs logged</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/8">
            <div className="h-full w-[82%] rounded-full" style={{ background: accent }} />
          </div>
        </div>
        <div className="rounded-xl border border-coral-400/30 bg-coral-400/8 p-3">
          <div className="flex items-center gap-2">
            <MedabrainMark className="h-5 w-5" />
            <span className="text-[11px] font-semibold text-coral-400">Misalignment detected</span>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-200">
            At your current pace you&apos;ll finish content review 11 days
            after your exam. I rebuilt the next 3 weeks — or we can move the
            date.
          </p>
        </div>
      </div>
    </Frame>
  );
}
