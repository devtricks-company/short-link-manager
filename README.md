# Short Link Manager

A full-stack vanity URL shortener built with Next.js, Neon Auth, and PostgreSQL. Users sign up, create short slugs that redirect to long URLs, and track click counts over time.

## Live Demo

[https://short-link-manager-v0.vercel.app](https://short-link-manager-v0.vercel.app)

---

## Local Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A [Neon](https://neon.tech) project with Auth enabled

### 1. Clone and install

```bash
git clone https://github.com/devtricks-company/short-link-manager-v0.git
cd short-link-manager-v0
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Neon database connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Neon Auth settings — found in your Neon project dashboard under "Auth"
NEON_AUTH_BASE_URL=https://<your-neon-auth-domain>
NEON_AUTH_COOKIE_SECRET=<random-32-char-secret>
```

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | Neon dashboard → your project → Connection string |
| `NEON_AUTH_BASE_URL` | Neon dashboard → Auth tab → Base URL |
| `NEON_AUTH_COOKIE_SECRET` | Generate with `openssl rand -base64 32` |

### 3. Push the database schema

```bash
pnpm db:push
```

This creates the `links` and `clickEvents` tables in your Neon database. No migration files are generated — the schema in `src/lib/db/schema.ts` is pushed directly.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account, then go to `/dashboard` to start creating short links.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm db:push` | Push schema to database (dev) |
| `pnpm db:generate` | Generate migration files (prod) |
| `pnpm db:studio` | Open Drizzle Studio UI |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: Neon Auth — email/password, session-based
- **Database**: PostgreSQL on Neon via `@neondatabase/serverless` + Drizzle ORM
- **UI**: shadcn/ui (base-nova theme) + Tailwind CSS v4 + Sonner toasts + Lucide icons
- **Validation**: Zod v4
- **Charts**: Recharts

---

## How I Used AI Tools

I used **Claude Code** (Anthropic's CLI agent, running as a VSCode extension) throughout the development of this project. The split between what I wrote and what was generated was roughly 30/70 in favor of AI, but that ratio flattered me less than it sounds — I had to direct, correct, and review every generated output.

**What worked well:** Scaffolding was the clearest win. The initial Server Actions pattern (Zod validation → DB query → `revalidatePath` → typed return shape) was repetitive and error-prone to write by hand. Claude generated consistent, correctly-typed action files from a single example. Similarly, Drizzle query functions and the middleware matcher were produced correctly on the first try. The AI also caught a subtle issue where I was re-creating auth singletons per request rather than importing shared instances — something easy to overlook in a code review.

**What didn't work:** Next.js 16 (App Router) is new enough that the model's training data was stale. Claude initially generated `getServerSideProps` patterns and old `pages/` conventions before I pointed it to the right docs. I had to repeatedly remind it to use `async` Server Components and `auth.getSession()` from the Neon Auth package rather than the patterns it defaulted to. Tailwind v4 syntax also caused friction — the model kept writing v3 utility classes and `@apply` directives that don't exist in v4.

**Where it tripped me up:** The most expensive mistake was the middleware. Claude generated a per-page session check inside the dashboard layout rather than a proper middleware matcher, which meant unauthenticated users saw a flash of the protected UI before being redirected. I caught it during manual testing, but it cost time to unwind. The lesson: AI-generated auth and routing code needs extra scrutiny because the failure modes are silent until you test the unhappy path.

Overall, AI tooling saved meaningful time on boilerplate and kept me consistent, but the quality ceiling was set by how clearly I could describe what I wanted and how quickly I caught the edge cases it missed.
