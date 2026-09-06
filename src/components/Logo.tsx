export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#1c2a47" />
          <stop offset="100%" stopColor="#0a1020" />
        </linearGradient>
        <linearGradient id="lg-mark" x1="8" y1="8" x2="32" y2="32">
          <stop offset="0%" stopColor="#7ff5e0" />
          <stop offset="60%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill="url(#lg-bg)"
        stroke="rgba(255,255,255,0.12)"
      />
      {/* cloud silhouette */}
      <path
        d="M13.5 27.5h13.2a5.3 5.3 0 0 0 .9-10.5 7 7 0 0 0-13.3-1.6 5.6 5.6 0 0 0-.8 12.1Z"
        stroke="url(#lg-mark)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(45,212,191,0.08)"
      />
      {/* pulse line */}
      <path
        d="M11 21.5h4l1.6-3.2 2.2 6.2 2.4-8.4 2 5.4h5.8"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MedabrainMark({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mb-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7ff5e0" />
          <stop offset="55%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d6b74" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#mb-g)" />
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      {/* stylised brain / neural nodes */}
      <g stroke="#042b28" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 20c0-3.5 3-6 7-6s7 2.5 7 6c1.8 1 2.6 2.6 2.6 4.4 0 3.6-3.4 6.6-9.6 6.6s-9.6-3-9.6-6.6c0-1.8.8-3.4 2.6-4.4Z" />
        <path d="M24 14v17" opacity=".7" />
        <path d="M19.5 18.5c1.5 1 3 1 4.5 0M24 22c1.6-1 3.2-1 4.8 0M19 25.5c1.6 1 3.4 1 5 0" opacity=".75" />
      </g>
      <circle cx="30.5" cy="17" r="1.6" fill="#fff" />
      <circle cx="17.5" cy="24" r="1.4" fill="#fff" opacity=".9" />
      <circle cx="29" cy="27.5" r="1.2" fill="#fff" opacity=".8" />
    </svg>
  );
}
