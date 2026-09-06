import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { sql } from "drizzle-orm";
import CountUp from "@/components/CountUp";
import HeroMockup from "@/components/HeroMockup";
import Logo, { MedabrainMark } from "@/components/Logo";
import MedabrainChat from "@/components/MedabrainChat";
import Nav from "@/components/Nav";
import PillarTabs from "@/components/PillarTabs";
import RevealObserver from "@/components/RevealObserver";
import WaitlistForm from "@/components/WaitlistForm";

export const dynamic = "force-dynamic";

const BASE_OFFSET = 1240;

async function getWaitlistCount() {
  try {
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(waitlistSignups);
    return (row?.count ?? 0) + BASE_OFFSET;
  } catch {
    return BASE_OFFSET;
  }
}

type Surface = { name: string; state: "open" | "soon" | "locked" };
const SURFACE_GROUPS: { pillar: string; color: string; items: Surface[] }[] = [
  {
    pillar: "Prep",
    color: "#2dd4bf",
    items: [
      { name: "Pathway Finder", state: "open" },
      { name: "Curriculum", state: "open" },
      { name: "Quiz Library", state: "open" },
      { name: "Lesson Coach", state: "open" },
      { name: "Flashcards", state: "open" },
      { name: "Practice Exams", state: "soon" },
      { name: "Score Tracker", state: "soon" },
      { name: "Weak-spot Radar", state: "locked" },
      { name: "Study Groups", state: "locked" },
    ],
  },
  {
    pillar: "Portfolio",
    color: "#a78bfa",
    items: [
      { name: "Personal Statement", state: "open" },
      { name: "Activities", state: "open" },
      { name: "Résumé Scorer", state: "open" },
      { name: "College List", state: "open" },
      { name: "School Explorer", state: "open" },
      { name: "Financial Aid", state: "open" },
      { name: "Scholarships", state: "soon" },
      { name: "Letters of Rec", state: "soon" },
      { name: "Secondaries", state: "locked" },
      { name: "Transcript Review", state: "locked" },
    ],
  },
  {
    pillar: "Roadmap",
    color: "#38bdf8",
    items: [
      { name: "12-Month View", state: "open" },
      { name: "Milestones", state: "open" },
      { name: "Deadline Radar", state: "open" },
      { name: "Start Windows", state: "open" },
      { name: "Gap Year Planner", state: "soon" },
      { name: "Post-bacc Guide", state: "soon" },
      { name: "Reapplicant Mode", state: "locked" },
      { name: "Cycle Simulator", state: "locked" },
    ],
  },
  {
    pillar: "Plans",
    color: "#fcd34d",
    items: [
      { name: "Daily Schedule", state: "open" },
      { name: "Progress Log", state: "open" },
      { name: "Time Budget", state: "open" },
      { name: "Clinical Hours", state: "open" },
      { name: "Shadowing Log", state: "soon" },
      { name: "Research Tracker", state: "soon" },
      { name: "Interview Lab", state: "locked" },
      { name: "MMI Drills", state: "locked" },
      { name: "Casper Prep", state: "locked" },
      { name: "Match Insights", state: "locked" },
      { name: "Advisor Share", state: "locked" },
    ],
  },
];

const FAQ = [
  {
    q: "Is MedSchoolPrep.cloud really free?",
    a: "Yes. The platform is free during open beta and the core system — Prep, Portfolio, Roadmap, Plans and Medabrain — will stay free. We'd rather be the place every pre-med starts than another paywall between you and medicine.",
  },
  {
    q: "What is Medabrain, exactly?",
    a: "Medabrain is the AI coach woven through the whole platform. Unlike a generic chatbot, it has context: it reads your pathway scores, your résumé, your roadmap and your logged hours. That's why it can tell you your plan is unrealistic — and fix it — instead of giving generic advice.",
  },
  {
    q: "I'm not sure medicine is right for me. Is this still useful?",
    a: "That's exactly what the Prep module is for. It scores ten different health-career pathways against how you actually think, so you can choose with evidence rather than pressure. Plenty of students discover PA, dentistry or public health fits them better — and that's a win.",
  },
  {
    q: "What does \"surfaces unlock progressively\" mean?",
    a: "There are 38+ modules on the platform, but you'd be overwhelmed seeing all of them on day one. Surfaces appear when they become relevant to your stage — Interview Lab shows up once you're in a cycle, not while you're picking a major.",
  },
  {
    q: "When will I get access?",
    a: "We're onboarding the waitlist in weekly cohorts so Medabrain stays fast and every student gets a proper start. Sharing your referral link moves you up the queue.",
  },
  {
    q: "Is my data safe?",
    a: "Your essays, activities and plans are yours. They're never sold, never used to train third-party models, and you can export or delete everything at any time.",
  },
];

export default async function Page() {
  const count = await getWaitlistCount();
  const openCount = SURFACE_GROUPS.flatMap((g) => g.items).filter(
    (s) => s.state === "open",
  ).length;
  const totalSurfaces = SURFACE_GROUPS.flatMap((g) => g.items).length;

  return (
    <main id="top" className="relative overflow-x-clip">
      <RevealObserver />
      <Nav />

      {/* ============================ HERO ============================ */}
      <section className="noise relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
        {/* backdrop */}
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <div className="animate-aurora absolute -top-[30%] left-[10%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.28),transparent)] blur-3xl" />
          <div className="animate-aurora absolute top-[10%] right-[-10%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.22),transparent)] blur-3xl [animation-delay:-6s]" />
          <div className="animate-aurora absolute bottom-[-20%] left-[30%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent)] blur-3xl [animation-delay:-11s]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="max-w-2xl">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3.5 pl-1.5 text-[12.5px] text-ink-200 backdrop-blur">
              <span className="rounded-full bg-mint-400 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-ink-950 uppercase">
                Free
              </span>
              <span className="whitespace-nowrap">
                Open beta · <span className="hidden sm:inline">onboarding </span>weekly cohorts
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-500 sm:block" />
              <span className="hidden font-mono text-[11.5px] whitespace-nowrap text-mint-300 sm:inline">
                {totalSurfaces}+ surfaces
              </span>
            </div>

            <h1 className="font-display animate-fade-up mt-6 text-[2.65rem] leading-[1.02] font-bold tracking-[-0.035em] text-white [animation-delay:80ms] sm:text-6xl lg:text-[4.2rem]">
              Your entire path to
              <br />
              medical school,{" "}
              <span className="text-gradient">in one system.</span>
            </h1>

            <p className="animate-fade-up mt-6 max-w-xl text-[17px] leading-relaxed text-ink-300 [animation-delay:160ms] sm:text-lg">
              From{" "}
              <em className="font-serif text-[1.15em] text-ink-100 italic">
                “is medicine even for me?”
              </em>{" "}
              to a submitted application — MedSchoolPrep.cloud connects prep,
              portfolio, roadmap and daily plans, with an AI coach named{" "}
              <span className="font-medium text-white">Medabrain</span> who
              actually knows where you are.
            </p>

            <div className="animate-fade-up mt-8 max-w-xl [animation-delay:240ms]">
              <WaitlistForm id="join" />
            </div>

            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:320ms]">
              <div className="flex items-center">
                <div className="flex -space-x-2.5">
                  {["PK", "JM", "AR", "SO", "DL"].map((ini, i) => (
                    <span
                      key={ini}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-950 text-[10px] font-bold text-ink-950"
                      style={{
                        background: [
                          "linear-gradient(135deg,#7ff5e0,#14b8a6)",
                          "linear-gradient(135deg,#c4b5fd,#7c3aed)",
                          "linear-gradient(135deg,#7dd3fc,#0284c7)",
                          "linear-gradient(135deg,#fde68a,#f59e0b)",
                          "linear-gradient(135deg,#fda4af,#e11d48)",
                        ][i],
                      }}
                    >
                      {ini}
                    </span>
                  ))}
                </div>
                <p className="ml-3 text-[13.5px] text-ink-300">
                  <CountUp
                    to={count}
                    className="font-semibold text-white tabular-nums"
                  />{" "}
                  students on the waitlist
                </p>
              </div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-1.5 text-[13px] text-ink-300">
                <span className="flex text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 6 21l1.3-6.8-5-4.7 6.8-.8L12 2.5z" />
                    </svg>
                  ))}
                </span>
                Loved by beta testers across 40+ campuses
              </div>
            </div>
          </div>

          <div className="animate-fade-up relative [animation-delay:200ms] lg:pl-4">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ======================== PROOF STRIP ======================== */}
      <section className="relative border-y border-white/6 bg-ink-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/6 px-5 sm:px-8 md:grid-cols-4 md:divide-x">
          {[
            { v: 10, s: "", l: "Health pathways scored against how you think" },
            { v: totalSurfaces, s: "+", l: "Surfaces that unlock as you need them" },
            { v: 12, s: " mo", l: "Roadmap with start windows, not just deadlines" },
            { v: 0, s: "", l: "Dollars. Free during open beta — and after.", prefix: "$" },
          ].map((s, i) => (
            <div
              key={s.l}
              className="reveal px-2 py-7 md:px-8"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <CountUp to={s.v} prefix={s.prefix ?? ""} suffix={s.s} />
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-ink-400">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= MEDABRAIN ========================= */}
      <section id="medabrain" className="relative scroll-mt-24 py-24 sm:py-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.10),transparent)] blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="reveal order-2 lg:order-1">
              <MedabrainChat />
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>Meet Medabrain</Eyebrow>
              <h2 className="reveal font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.08]">
                An AI coach that has read your whole file —{" "}
                <span className="text-gradient-mint">not just your last message.</span>
              </h2>
              <p className="reveal mt-5 text-[16px] leading-relaxed text-ink-300">
                Most AI tools answer questions. Medabrain runs the system. It
                sits inside every lesson, reads your activities, watches your
                roadmap, and rebuilds your plan when life happens. And when your
                goals and calendar don&apos;t add up, it says so — kindly, but
                honestly.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    t: "Full context, every time",
                    d: "Pathway scores, résumé, deadlines, logged hours — Medabrain sees all of it before it answers.",
                    icon: "M12 3a9 9 0 1 0 9 9M12 7v5l3 3M17 3l4 4-4 4",
                  },
                  {
                    t: "Acts, not just advises",
                    d: "It can re-sequence your week, protect a study block or move a milestone — with your approval.",
                    icon: "M13 2 3 14h9l-1 8 10-12h-9l1-8Z",
                  },
                  {
                    t: "Honest about the math",
                    d: "If 14 hours a week won't get you there by June, you'll hear it in April, not the night before.",
                    icon: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
                  },
                ].map((f, i) => (
                  <li
                    key={f.t}
                    className="reveal flex gap-4"
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mint-400/25 bg-mint-400/10 text-mint-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d={f.icon} />
                      </svg>
                    </span>
                    <div>
                      <p className="font-display text-[15.5px] font-semibold text-white">{f.t}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-300">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== PILLARS ========================== */}
      <section id="pillars" className="relative scroll-mt-24 border-t border-white/6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Four pillars, one system</Eyebrow>
            <h2 className="reveal font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.08]">
              Everything you&apos;d normally juggle across{" "}
              <span className="font-serif font-normal italic text-ink-200">
                nine tabs and a spreadsheet.
              </span>
            </h2>
            <p className="reveal mt-5 text-[16px] leading-relaxed text-ink-300">
              Prep tells you where to go. Portfolio holds what you&apos;ve built.
              Roadmap shows you when. Plans gets you through today. Change one
              and the others notice.
            </p>
          </div>
          <div className="reveal mt-14">
            <PillarTabs />
          </div>
        </div>
      </section>

      {/* ========================== SURFACES ========================= */}
      <section id="surfaces" className="relative scroll-mt-24 overflow-hidden border-t border-white/6 py-24 sm:py-32">
        <div className="dot-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Eyebrow>{totalSurfaces}+ surfaces</Eyebrow>
              <h2 className="reveal font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.08]">
                Powerful on day 400.{" "}
                <span className="text-ink-400">Simple on day one.</span>
              </h2>
              <p className="reveal mt-5 text-[16px] leading-relaxed text-ink-300">
                Surfaces unlock progressively as your journey needs them. A
                sophomore choosing a pathway never sees Interview Lab; an
                applicant mid-cycle never digs for it.
              </p>
            </div>
            <div className="reveal flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-ink-300">
              <Legend dotClass="bg-mint-400" label={`${openCount} open now`} />
              <Legend dotClass="bg-amber-300" label="Unlocks with your stage" />
              <Legend dotClass="bg-ink-500" label="Later in your journey" />
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SURFACE_GROUPS.map((g, gi) => (
              <div
                key={g.pillar}
                className="glass card-hover reveal rounded-2xl p-5"
                style={{ ["--reveal-delay" as string]: `${gi * 90}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
                    <p className="font-display text-[15px] font-semibold text-white">{g.pillar}</p>
                  </div>
                  <span className="font-mono text-[11px] text-ink-400">
                    {g.items.filter((s) => s.state === "open").length}/{g.items.length}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s.name}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12.5px] transition ${
                        s.state === "open"
                          ? "border-white/10 bg-white/[0.05] text-ink-100"
                          : s.state === "soon"
                            ? "border-amber-300/20 bg-amber-300/[0.06] text-ink-200"
                            : "border-white/6 bg-transparent text-ink-400"
                      }`}
                    >
                      {s.state === "open" && (
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: g.color }} />
                      )}
                      {s.state === "soon" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      )}
                      {s.state === "locked" && (
                        <svg className="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                      )}
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================= */}
      <section id="how" className="relative scroll-mt-24 border-t border-white/6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>How it works</Eyebrow>
            <h2 className="reveal font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.6rem] sm:leading-[1.08]">
              Ten minutes to a plan you can actually follow.
            </h2>
          </div>

          <ol className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div className="pointer-events-none absolute top-10 right-[16%] left-[16%] hidden lg:block">
              <svg className="w-full" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 2" />
              </svg>
            </div>
            {[
              {
                n: "01",
                t: "Tell Medabrain where you are",
                d: "Two-minute intake: stage, goals, hours per week, what you've already done. No essay required.",
                c: "#2dd4bf",
              },
              {
                n: "02",
                t: "See your pathway fit & 12-month map",
                d: "Prep scores ten pathways against your thinking. Roadmap lays out the year with realistic start windows.",
                c: "#a78bfa",
              },
              {
                n: "03",
                t: "Follow today. Log it. Let it adapt.",
                d: "Plans gives you today's schedule. Log what you did; Medabrain re-flows the rest — and unlocks new surfaces as you go.",
                c: "#fcd34d",
              },
            ].map((s, i) => (
              <li
                key={s.n}
                className="glass card-hover reveal relative rounded-2xl p-6 sm:p-7"
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-display flex h-12 w-12 items-center justify-center rounded-xl text-[15px] font-bold text-ink-950"
                    style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}bb)` }}
                  >
                    {s.n}
                  </span>
                  <MedabrainMark className="h-6 w-6 opacity-70" />
                </div>
                <p className="font-display mt-5 text-[18px] font-semibold tracking-tight text-white">{s.t}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-300">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================== QUOTES =========================== */}
      <section className="relative overflow-hidden border-t border-white/6 py-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="flex w-max animate-marquee gap-4 pause-on-hover">
          {[...QUOTES, ...QUOTES].map((q, i) => (
            <figure key={i} className="glass-soft w-[340px] shrink-0 rounded-2xl p-5">
              <blockquote className="text-[14px] leading-relaxed text-ink-100">“{q.t}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[10.5px] font-bold text-ink-950"
                  style={{ background: q.g }}
                >
                  {q.i}
                </span>
                <div>
                  <p className="text-[13px] font-medium text-white">{q.n}</p>
                  <p className="text-[11.5px] text-ink-400">{q.r}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section id="faq" className="relative scroll-mt-24 border-t border-white/6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="reveal font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.4rem] sm:leading-[1.08]">
              Fair questions, straight answers.
            </h2>
            <p className="reveal mt-4 text-[15.5px] leading-relaxed text-ink-300">
              Anything else? Ask Medabrain once you&apos;re in — or email{" "}
              <a href="mailto:hello@medschoolprep.cloud" className="text-mint-300 underline-offset-4 hover:underline">
                hello@medschoolprep.cloud
              </a>
              .
            </p>
          </div>
          <div className="reveal divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02]">
            {FAQ.map((f, i) => (
              <details key={f.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left [&::-webkit-details-marker]:hidden sm:px-6">
                  <span className="font-display text-[15.5px] font-semibold text-white">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-transform duration-300 group-open:rotate-45 group-open:border-mint-400/40 group-open:text-mint-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-300 sm:px-6">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="relative px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="noise relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.35),transparent)] blur-3xl" />
            <div className="absolute -bottom-40 -right-20 h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.28),transparent)] blur-3xl" />
            <div className="grid-bg absolute inset-0 opacity-70" />
          </div>
          <div className="relative">
            <div className="reveal mx-auto flex h-16 w-16 items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-mint-400/40" />
                <MedabrainMark className="h-14 w-14" />
              </div>
            </div>
            <h2 className="reveal font-display mt-6 text-3xl font-bold tracking-[-0.03em] text-white sm:text-[2.8rem] sm:leading-[1.05]">
              Your seat in the next cohort is{" "}
              <span className="text-gradient">one email away.</span>
            </h2>
            <p className="reveal mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-ink-300">
              Join{" "}
              <span className="font-semibold text-white tabular-nums">{count.toLocaleString()}</span>{" "}
              future clinicians already on the list. Free forever. No credit
              card. Just a plan that finally fits.
            </p>
            <div className="reveal mx-auto mt-8 max-w-xl text-left">
              <WaitlistForm id="join-footer" variant="footer" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================== FOOTER ========================== */}
      <footer className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                MedSchoolPrep<span className="text-mint-400">.cloud</span>
              </span>
            </a>
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-400">
              A free, comprehensive platform guiding students through the entire
              process of preparing for and applying to medical school — coached
              by Medabrain.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[13.5px] sm:grid-cols-3">
            <div>
              <p className="font-semibold text-white">Platform</p>
              <ul className="mt-3 space-y-2 text-ink-400">
                <li><a className="hover:text-white" href="#pillars">Prep</a></li>
                <li><a className="hover:text-white" href="#pillars">Portfolio</a></li>
                <li><a className="hover:text-white" href="#pillars">Roadmap</a></li>
                <li><a className="hover:text-white" href="#pillars">Plans</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Company</p>
              <ul className="mt-3 space-y-2 text-ink-400">
                <li><a className="hover:text-white" href="#medabrain">Medabrain</a></li>
                <li><a className="hover:text-white" href="#surfaces">Surfaces</a></li>
                <li><a className="hover:text-white" href="#faq">FAQ</a></li>
                <li><a className="hover:text-white" href="mailto:hello@medschoolprep.cloud">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-semibold text-white">Status</p>
              <ul className="mt-3 space-y-2 text-ink-400">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                  Open beta
                </li>
                <li>Weekly cohorts</li>
                <li>{totalSurfaces}+ surfaces</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/6">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-[12.5px] text-ink-500 sm:flex-row sm:items-center sm:px-8">
            <p>© {new Date().getFullYear()} MedSchoolPrep.cloud. All rights reserved.</p>
            <p>
              Not affiliated with AAMC, AMCAS or any medical school. Made with care for future clinicians.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const QUOTES = [
  {
    t: "It told me my June MCAT plan was 5 hours a week short — in March. That one message probably saved my cycle.",
    n: "Priya K.",
    r: "Junior · MD pathway",
    i: "PK",
    g: "linear-gradient(135deg,#7ff5e0,#14b8a6)",
  },
  {
    t: "I came in certain about MD and left the Prep module seriously considering PA. Turns out that was the right call for me.",
    n: "Jordan M.",
    r: "Career changer",
    i: "JM",
    g: "linear-gradient(135deg,#c4b5fd,#7c3aed)",
  },
  {
    t: "The résumé scorer caught that every activity read like a job description. Medabrain rewrote one with me and I redid the rest.",
    n: "Aisha R.",
    r: "Senior · applying this cycle",
    i: "AR",
    g: "linear-gradient(135deg,#7dd3fc,#0284c7)",
  },
  {
    t: "Roadmap showing when to *start* asking for letters — not just when they're due — is the feature I didn't know I needed.",
    n: "Sam O.",
    r: "Post-bacc",
    i: "SO",
    g: "linear-gradient(135deg,#fde68a,#f59e0b)",
  },
  {
    t: "New modules just appear when I need them. It never felt like a bloated dashboard, even with 38 of them.",
    n: "Diego L.",
    r: "Sophomore · undecided",
    i: "DL",
    g: "linear-gradient(135deg,#fda4af,#e11d48)",
  },
  {
    t: "As a parent, the honesty is what won me over. It doesn't hype my kid up — it tells her what the calendar actually allows.",
    n: "Maria T.",
    r: "Parent",
    i: "MT",
    g: "linear-gradient(135deg,#a7f3d0,#059669)",
  },
];

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={`reveal inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-mint-300 uppercase ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-6 bg-mint-400/60" />
      {children}
    </p>
  );
}

function Legend({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}
