"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

const PATHWAYS = [
  "Not sure yet — help me decide",
  "MD / DO (Physician)",
  "Physician Assistant",
  "Nursing / NP",
  "Dentistry",
  "Pharmacy",
  "Physical Therapy",
  "Optometry",
  "Veterinary",
  "Public Health",
  "Other health career",
];

const STAGES = [
  "High school",
  "Undergrad — year 1–2",
  "Undergrad — year 3–4",
  "Gap year / post-bacc",
  "Career changer",
  "Parent / advisor",
];

type Result = {
  position: number;
  referralCode: string;
  referralCount: number;
  alreadyJoined: boolean;
};

type Props = {
  variant?: "hero" | "footer";
  id?: string;
};

export default function WaitlistForm({ variant = "hero", id }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pathway, setPathway] = useState("");
  const [stage, setStage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("ref");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state from the URL, which isn't available during SSR
    if (r) setRef(r.toUpperCase());
  }, []);

  const referralUrl = useMemo(() => {
    if (!result) return "";
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.origin);
    url.searchParams.set("ref", result.referralCode);
    return url.toString();
  }, [result]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, pathway, stage, ref }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  if (status === "done" && result) {
    return (
      <div
        id={id}
        className="glass animate-scale-in relative overflow-hidden rounded-2xl p-5 sm:p-6"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-mint-400/20 blur-3xl" />
        <div className="flex items-start gap-4">
          <div className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint-400/15 text-mint-300 ring-1 ring-mint-400/40">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-mint-400/50" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold text-white">
              {result.alreadyJoined
                ? "You're already on the list."
                : "You're in. Welcome aboard."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-300">
              You&apos;re{" "}
              <span className="font-semibold text-white">
                #{result.position.toLocaleString()}
              </span>{" "}
              in line. We&apos;ll email you the moment your seat opens — and
              Medabrain will already know your pathway.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-ink-900/60 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                Skip the line — share your link
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-lg bg-black/30 px-3 py-2 font-mono text-[12.5px] text-mint-300">
                  {referralUrl}
                </code>
                <button
                  type="button"
                  onClick={copy}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-mint-400/40 hover:bg-mint-400/10"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-[12px] text-ink-400">
                Every friend who joins moves you up 5 spots.{" "}
                {result.referralCount > 0 && (
                  <span className="text-mint-300">
                    {result.referralCount} referred so far.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const compact = variant === "footer";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="relative"
      noValidate
      aria-label="Join the waitlist"
    >
      <div
        className={`glass relative flex flex-col gap-2 rounded-2xl p-2 transition-shadow duration-500 focus-within:ring-glow sm:flex-row sm:items-center ${
          compact ? "" : ""
        }`}
      >
        <label className="sr-only" htmlFor={`${id ?? "w"}-email`}>
          Email address
        </label>
        <div className="flex flex-1 items-center gap-2.5 px-3">
          <svg
            className="h-[18px] w-[18px] shrink-0 text-ink-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <input
            id={`${id ?? "w"}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full bg-transparent text-[15px] text-white placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[14.5px] font-semibold disabled:cursor-wait disabled:opacity-80"
        >
          {status === "loading" ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity=".25"
                  strokeWidth="3"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Reserving…
            </>
          ) : (
            <>
              Get early access
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Optional profile fields */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          expanded ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="glass-soft grid gap-2 rounded-2xl p-2 sm:grid-cols-3">
            <input
              type="text"
              autoComplete="given-name"
              placeholder="First name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 rounded-xl border border-white/8 bg-ink-900/60 px-3 text-sm text-white placeholder:text-ink-400 focus:border-mint-400/40 focus:outline-none"
            />
            <div className="relative">
              <select
                value={pathway}
                onChange={(e) => setPathway(e.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-white/8 bg-ink-900/60 px-3 pr-8 text-sm text-white focus:border-mint-400/40 focus:outline-none"
              >
                <option value="" className="bg-ink-900">
                  Pathway I&apos;m considering
                </option>
                {PATHWAYS.map((p) => (
                  <option key={p} value={p} className="bg-ink-900">
                    {p}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            <div className="relative">
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-white/8 bg-ink-900/60 px-3 pr-8 text-sm text-white focus:border-mint-400/40 focus:outline-none"
              >
                <option value="" className="bg-ink-900">
                  Where I am right now
                </option>
                {STAGES.map((s) => (
                  <option key={s} value={s} className="bg-ink-900">
                    {s}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-1">
        <p className="text-[12.5px] text-ink-400">
          {error ? (
            <span className="text-coral-400">{error}</span>
          ) : (
            <>
              Free forever. No spam. Unsubscribe anytime.
              {ref && (
                <span className="ml-2 rounded-md bg-mint-400/10 px-1.5 py-0.5 font-mono text-[11px] text-mint-300">
                  ref {ref}
                </span>
              )}
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[12.5px] font-medium text-ink-300 underline-offset-4 transition hover:text-mint-300 hover:underline"
        >
          {expanded ? "Hide details" : "Tell Medabrain about you →"}
        </button>
      </div>
    </form>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
