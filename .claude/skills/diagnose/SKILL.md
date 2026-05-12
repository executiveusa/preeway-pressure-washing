# Diagnose — Structured Debugging Loop

Source: mattpocock/skills — diagnose

## When to use
When a bug or performance issue needs systematic root-cause analysis before attempting a fix.

## Workflow

### Step 1 — Observe
Collect all available signals without touching code:
- Exact error message and stack trace
- Which route / component / function is affected
- When did it last work? What changed?
- Reproduce the failure in the smallest possible context

### Step 2 — Hypothesize
List 3 candidate root causes ranked by likelihood.
For each: what evidence would confirm or rule it out?

### Step 3 — Test hypotheses
Check evidence for each hypothesis, most likely first.
Use `console.log`, debugger, or targeted test cases.
Stop at the first confirmed hypothesis.

### Step 4 — Fix
Make the minimal change that resolves the confirmed root cause.
Do not refactor unrelated code during a bug fix.

### Step 5 — Verify
Reproduce the original failure scenario — confirm it no longer occurs.
Run `npm run build` and `npm run lint` to ensure no regressions.

### Step 6 — Document
One-line comment explaining the non-obvious fix (if applicable).
Update this diagnosis in the PR description.

## Rules
- Never guess and commit — confirm hypothesis first
- Never fix symptoms — fix root cause
- If hypothesis 1–3 are all wrong, start over with fresh observation
