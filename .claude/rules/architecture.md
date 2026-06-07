# Architecture

**Short link manager** — users create vanity slugs that redirect to long URLs, with click tracking.

## Stack

- **Framework**: Next.js App Router (see AGENTS.md warning about version differences)
- **Auth**: Neon Auth (`@neondatabase/auth/next`) — email-based, session via `auth.getSession()` server-side and `authClient.useSession()` client-side
- **Database**: PostgreSQL on Neon, accessed via `@neondatabase/serverless` HTTP client + Drizzle ORM
- **UI**: shadcn/ui (base-nova theme) + Tailwind CSS v4 + Sonner toasts + Lucide icons
- **Validation**: Zod v4

## Key directories

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
