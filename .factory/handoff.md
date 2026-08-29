# Batch Cart review 4 handoff — FAIL

Work order: `batch-cart-review-4`
Reviewed: 2026-08-29
Repository commit reviewed: `2c394b8f920bdbd9c9da086b52459752c5aef95c`

No product code was changed. `.factory/review-4.md` contains the full independent review.

## Result

**FAIL.** Earlier finding **F-2-1** is reopened: on the public site, the skip link is inserted only after asynchronous initial state loading, so an immediate Tab after navigation intermittently has no focused element. One public 25-test accessibility run failed on this exact assertion; five serial reruns passed, confirming flakiness rather than a reliable fix.

## Verification completed

- Fresh desktop and 390px cold reads passed; the job, audience, sample action, explanation, and three facts are visible before scrolling.
- The direct one-click demo showed realistic recipes and a ready shopping list, the persistent demo banner, Reset demo, and Start for real. Direct demo storage used only `demo:batch-cart`; offline reload retained 3 recipes and 12 rows, with same-origin-only requests.
- In a fresh clone at `/tmp/batch-cart-review4-maBZga`, all 24 exact commands declared in `.factory/claims.json` completed independently and passed. Claim/tag parity is 24 unique IDs to 24 unique tags.
- Clean-clone `npm test` passed (12 unit and 49 browser tests), and `npm run build` produced `dist/`.
- Routes, metadata, 404, link crawl, route focus/announcement, privacy, service-worker behavior, visual identity, and prior findings were rechecked. Only F-2-1 remains open.

## Repair direction

Render the skip link, header, and main landmark before awaiting IndexedDB or other startup work. Retain an immediate-Tab test with no wait for the shell, repeat it against local and public builds, then rerun all claim, full-suite, build, and live accessibility checks.
