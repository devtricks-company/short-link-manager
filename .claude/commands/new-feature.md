# New Feature

Plan and implement the feature: $ARGUMENTS

Follow the project architecture strictly:

1. **Read** the relevant rules in `.claude/rules/` before writing any code
2. **Plan** — list the files you will create or modify, and what each does. Wait for my approval before writing code.
3. **Implementation order**:
   a. Zod schema in `src/lib/validations/`
   b. DB query in `src/lib/db/queries/`
   c. Server Action in `src/lib/actions/`
   d. View component in `src/views/`
   e. Wire into `src/app/` page
4. **Auth** — all mutations must validate the session server-side and scope DB queries by `userId`
5. **UI** — use shadcn/ui components, Tailwind v4, Lucide icons, and Sonner toasts for feedback
6. **After implementation** — run `npm run lint` and `npm run build` and fix any errors

Do not skip the planning step.
