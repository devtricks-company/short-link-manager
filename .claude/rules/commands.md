# Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint

npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:push      # Push schema to database (no migration files)
npm run db:studio    # Open Drizzle Studio UI
```

Environment variables are in `.env.local` (not committed). Required: `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`.
