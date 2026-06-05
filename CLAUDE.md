# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint

npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:push      # Push schema to database (no migration files)
npm run db:studio    # Open Drizzle Studio UI
```

Environment variables are in `.env.local` (not committed). Required: `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`.

## Architecture

**Short link manager** — users create vanity slugs that redirect to long URLs, with click tracking.

### Stack

- **Framework**: Next.js App Router (see AGENTS.md warning about version differences)
- **Auth**: Neon Auth (`@neondatabase/auth/next`) — email-based, session via `auth.getSession()` server-side and `authClient.useSession()` client-side
- **Database**: PostgreSQL on Neon, accessed via `@neondatabase/serverless` HTTP client + Drizzle ORM
- **UI**: shadcn/ui (base-nova theme) + Tailwind CSS v4 + Sonner toasts + Lucide icons
- **Validation**: Zod v4

### Key directories

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── (auth)/             # sign-in and sign-up pages (unauthenticated)
│   ├── api/auth/[...path]/ # Neon auth handler — do not modify
│   └── dashboard/          # Protected main app page
├── lib/
│   ├── auth/{client,server}.ts  # Auth singletons — import, don't recreate
│   ├── db/{index,schema}.ts     # Drizzle client and table definitions
│   ├── db/queries/              # Database query functions
│   ├── actions/                 # Next.js Server Actions
│   └── validations/             # Zod schemas (co-located with actions)
└── views/                  # Page-level React components (imported by app/ pages)
```

Path alias: `@/*` maps to `src/*`.

### Database schema

Two tables defined in [src/lib/db/schema.ts](src/lib/db/schema.ts):
- `links`: `id`, `userId`, `slug` (nanoid), `longUrl`, `title`, `clickCount`, `createdAt`
- `clickEvents`: `id`, `linkId` (FK → links), `clickedAt`

After changing the schema, run `db:push` (dev) or `db:generate` + apply migration (prod).

### Server Actions pattern

Actions in `src/lib/actions/` follow this return shape:
```ts
{ data: T; error: null } | { data: null; error: string }
```

Always validate with Zod before touching the database. Use `revalidatePath` after mutations.

### Auth + Middleware

[src/middleware.ts](src/middleware.ts) protects `/dashboard/:path*`. It bypasses auth checks when the `next-action` header is present (server action requests). When adding new protected routes, extend the matcher in middleware — do not add per-page session checks instead.

To read the session in a Server Component or Action:
```ts
import { auth } from "@/lib/auth/server";
const session = await auth.getSession();
```

To read it client-side:
```ts
import { authClient } from "@/lib/auth/client";
const { data: session } = authClient.useSession();
```
