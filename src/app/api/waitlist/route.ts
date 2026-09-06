import { db } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const BASE_OFFSET = 1240; // seeded demand ahead of public launch

function makeCode(length = 8) {
  let out = "";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

async function totalCount() {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(waitlistSignups);
  return row?.count ?? 0;
}

export async function GET() {
  try {
    const count = await totalCount();
    return NextResponse.json({ count: count + BASE_OFFSET });
  } catch {
    return NextResponse.json({ count: BASE_OFFSET });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const name = String(body.name ?? "").trim().slice(0, 120) || null;
  const pathway = String(body.pathway ?? "").trim().slice(0, 64) || null;
  const stage = String(body.stage ?? "").trim().slice(0, 64) || null;
  const referredBy =
    String(body.ref ?? "")
      .trim()
      .toUpperCase()
      .slice(0, 16) || null;

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    const existing = await db
      .select()
      .from(waitlistSignups)
      .where(eq(waitlistSignups.email, email))
      .limit(1);

    if (existing.length > 0) {
      const row = existing[0];
      return NextResponse.json({
        ok: true,
        alreadyJoined: true,
        position: row.id + BASE_OFFSET,
        referralCode: row.referralCode,
        referralCount: row.referralCount,
      });
    }

    let referralCode = makeCode();
    for (let attempt = 0; attempt < 3; attempt++) {
      const clash = await db
        .select({ id: waitlistSignups.id })
        .from(waitlistSignups)
        .where(eq(waitlistSignups.referralCode, referralCode))
        .limit(1);
      if (clash.length === 0) break;
      referralCode = makeCode();
    }

    let validReferrer: string | null = null;
    if (referredBy) {
      const ref = await db
        .select({ id: waitlistSignups.id })
        .from(waitlistSignups)
        .where(eq(waitlistSignups.referralCode, referredBy))
        .limit(1);
      if (ref.length > 0) validReferrer = referredBy;
    }

    const [inserted] = await db
      .insert(waitlistSignups)
      .values({
        email,
        name,
        pathway,
        stage,
        referralCode,
        referredBy: validReferrer,
        source: req.headers.get("referer") ?? null,
      })
      .returning();

    if (validReferrer) {
      await db
        .update(waitlistSignups)
        .set({ referralCount: sql`${waitlistSignups.referralCount} + 1` })
        .where(eq(waitlistSignups.referralCode, validReferrer));
    }

    return NextResponse.json(
      {
        ok: true,
        alreadyJoined: false,
        position: inserted.id + BASE_OFFSET,
        referralCode: inserted.referralCode,
        referralCount: 0,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
