# Add Server Action

Scaffold a new server action for: $ARGUMENTS

Follow the project conventions exactly:

1. Create the action file in `src/lib/actions/` named after the feature (e.g. `links.ts`)
2. Create a co-located Zod v4 validation schema in `src/lib/validations/` with the same name
3. The action must return `{ data: T; error: null } | { data: null; error: string }`
4. Always validate input with Zod before touching the database
5. Call `revalidatePath("/dashboard")` after any mutation
6. Read the session with `import { auth } from "@/lib/auth/server"` — reject if no session
7. Use the Drizzle client from `@/lib/db` and query functions from `@/lib/db/queries/`

Show me the complete file contents before writing them.
