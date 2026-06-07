# PR Preparation

Prepare the current branch for a pull request.

Run these steps in order and fix any issues before reporting done:

1. **Lint** — run `npm run lint` and fix all ESLint errors (warnings are OK)
2. **Build** — run `npm run build` and fix any TypeScript or build errors
3. **Diff review** — run `git diff main...HEAD` and check for:
   - Hardcoded secrets or credentials
   - Debug `console.log` statements left in
   - Commented-out code blocks
   - TODO comments that should be resolved before merging
4. **Summary** — output a short PR title and bullet-point description based on the diff

Report each step's result. Do not create the PR unless I explicitly ask.
