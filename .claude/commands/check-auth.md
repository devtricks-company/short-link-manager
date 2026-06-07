# Auth Audit

Audit authentication and authorization for: $ARGUMENTS

Check the following for the specified file, route, or feature:

1. **Middleware coverage** — is the route matched by the `/dashboard/:path*` pattern in `src/middleware.ts`? If not and it should be protected, add it.
2. **Server Components / Actions** — do they call `auth.getSession()` and guard against a missing session?
3. **Client Components** — if they render sensitive data, are they gated behind a session check via `authClient.useSession()`?
4. **userId scoping** — do all DB queries filter by `userId` so users can't access each other's data?
5. **Server Actions** — do they re-validate the session server-side (not trust client-passed userId)?

Report findings as a checklist. Suggest fixes for any gaps found.
