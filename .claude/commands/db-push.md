# Push Database Schema

Push the current Drizzle schema to the Neon database (development only).

1. Show the current schema from `src/lib/db/schema.ts`
2. Ask me to confirm before running anything destructive
3. Run `npm run db:push`
4. Report the output

If there are migration conflicts or errors, diagnose and suggest a fix — do not blindly retry.

> Warning: `db:push` does not generate migration files. For production changes, use `db:generate` + apply the migration file instead.
