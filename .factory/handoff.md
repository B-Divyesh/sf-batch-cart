# Batch Cart review 3 handoff

Work order: `batch-cart-review-3`
Role: reviewer
Review commit: this handoff and review are committed together

## Result

Wrote the independent adversarial review in `.factory/review-3.md`. Product code was not modified.

The review is **FAIL** with one MAJOR finding: client-side navigation focuses the new h1 but leaves its polite live region empty, so it does not announce the page change to screen-reader users.

## Verification performed

- Cold live loads at 390 x 844 and 1440 x 900 answered the job, audience, and first-action questions before scrolling, without console errors.
- Direct demo entry showed seeded rows in the initial mobile viewport. Reset restored the sample; Start for real removed `demo:batch-cart` and opened an empty real `batch-cart` namespace. Demo requests were same-origin only.
- In a fresh clone at `/tmp/batch-cart-review3-85JjnB`, `npm ci`, every one of the 24 exact claim commands, `npm test` (12 unit + 49 browser tests), `npm run build`, and `git diff --check` passed.
- Checked claims/tag parity (24 IDs, 24 unique matching tags), routes, links, metadata, static 404, headers, privacy/offline coverage, earlier review repairs, and brief-implied leverage.

## Next step

Implement an explicit polite route announcement after SPA navigation, add a regression test for it, then re-run the checks above. No other product gaps were found.
