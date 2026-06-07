# Server Actions

Actions in `src/lib/actions/` follow this return shape:
```ts
{ data: T; error: null } | { data: null; error: string }
```

Always validate with Zod before touching the database. Use `revalidatePath` after mutations.
