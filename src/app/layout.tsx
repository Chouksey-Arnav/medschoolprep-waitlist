import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedSchoolPrep.cloud — Your entire path to medical school, in one system",
  description:
    "Join the waitlist for MedSchoolPrep.cloud: a free platform with Medabrain, your AI coach, guiding you from choosing a health career to submitting a standout application. Prep, Portfolio, Roadmap and Plans — 38+ surfaces that unlock as you need them.",
  keywords: [
    "medical school",
    "pre-med",
    "MCAT",
    "AI coach",
    "med school application",
    "Medabrain",
    "MedSchoolPrep",
  ],
  openGraph: {
    title: "MedSchoolPrep.cloud — Join the waitlist",
    description:
      "One free system for the whole journey to medicine. Coached by Medabrain.",
    type: "website",
    siteName: "MedSchoolPrep.cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedSchoolPrep.cloud — Join the waitlist",
    description:
      "One free system for the whole journey to medicine. Coached by Medabrain.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050a14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-950 text-ink-100 antialiased">
        {children}
      </body>
    </html>
  );
}
