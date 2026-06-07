# Database

Two tables defined in [src/lib/db/schema.ts](src/lib/db/schema.ts):
- `links`: `id`, `userId`, `slug` (nanoid), `longUrl`, `title`, `clickCount`, `createdAt`
- `clickEvents`: `id`, `linkId` (FK → links), `clickedAt`

After changing the schema, run `db:push` (dev) or `db:generate` + apply migration (prod).
