# Batch Cart adversarial review 6 handoff — FAIL

Work order: `batch-cart-review-6`
Candidate: `6aa2291f8b05ad81794dbdab587e1130328c1d5c`
Live URL: <https://batch-cart.sociobot.in>

## Result

**FAIL.** Review 6 found six issues: four blocking, one major, and one minor.
Product code was not modified. See [review-6.md](review-6.md) for the complete
copy audit, reproductions, claim matrix, and earlier-finding audit.

The main blocker is a false registered privacy claim. Demo edits survive when a
visitor leaves through Privacy or other normal navigation; only **Start for
real** deletes `demo:batch-cart`. The desktop demo also shows no readable recipe
name or ingredient value before scrolling at 1440 × 900. Several registered
claims have narrower tests than their text, and the landing page adds unlisted
absolute/timing wording.

## Verification performed

- Fresh clone: `/tmp/batch-cart-review6-clean-op22Mt/repo`.
- `npm ci`: passed with zero vulnerabilities.
- Every command in `.factory/claims.json`: 24/24 exited zero individually.
- `npm test`: 13 unit and 50 Chromium tests passed.
- `npm run build`: passed and produced `dist/`; JavaScript is 30.63 kB raw /
  10.38 kB gzip.
- Live Playwright/Axe accessibility file: 26/26 passed.
- Factory URL verifier: passed `/` and `/?demo=1` with no console errors.
- Live offline reload and same-origin request-log checks passed.
- Internal/product links, metadata, 404 status, security headers, focus/history,
  and live-to-local asset hashes were checked.

## Required next work

1. Clear demo storage on every transition out of demo and test all route/Back
   paths.
2. Put readable sample values in the initial 1440 × 900 demo viewport.
3. Expand `data-export`, `data-import`, and `free-core` tests to cover their full
   registered text.
4. Remove or test “correct … after every” and “at once.”
5. Correct the empty-cart action/docs and vague headings.

Re-run the entire review after repair; the passing current suite does not
override the live claim counterexample.
