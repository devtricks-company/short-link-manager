# Add Database Query

Add a new Drizzle query function for: $ARGUMENTS

Follow the project conventions:

1. Add the function to the appropriate file in `src/lib/db/queries/`
2. Import the Drizzle client from `@/lib/db` and schema from `@/lib/db/schema`
3. Always scope queries by `userId` to prevent cross-user data access
4. Return plain objects — do not leak Drizzle internals to callers
5. For new query files, export a named function (not default)

Reference the existing schema in `src/lib/db/schema.ts`:
- `links`: id, userId, slug, longUrl, title, clickCount, createdAt
- `clickEvents`: id, linkId (FK → links), clickedAt

Read the schema file first, then write the query.
