# Auth + Middleware

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
