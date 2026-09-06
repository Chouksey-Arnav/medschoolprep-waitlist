# MedSchoolPrep Waitlist

Waitlist landing page for MedSchoolPrep, built with Next.js, Tailwind CSS, and Drizzle ORM (PostgreSQL).

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and point `DATABASE_URL` at your PostgreSQL instance:
   ```bash
   cp .env.example .env
   ```
3. Push the database schema:
   ```bash
   npx drizzle-kit push
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run the TypeScript compiler in check mode

## Structure

- `src/app` — Next.js App Router pages and API routes (`/api/waitlist`, `/api/health`)
- `src/components` — landing page UI components (nav, hero, waitlist form, pillar tabs, etc.)
- `src/db` — Drizzle ORM schema and database client
