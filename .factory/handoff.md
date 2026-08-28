# Batch Cart review 1 handoff

Work order: `batch-cart-review-1`
Role: reviewer
Live URL: <https://batch-cart.sociobot.in>

## Result

**FAIL.** No product code was changed. The committed report is `.factory/review-1.md`.

The release is blocked by the 390px demo first viewport: it shows the banner and intro but no sample cart row or recipe card. The review also records unregistered README claims, a wide workspace layout regression, incomplete per-route sharing metadata, and copy findings.

## Verification completed

- Fresh live Chrome contexts at 390 × 844 and 1440 × 900; no console/page errors on cold home load.
- Live one-click demo, reset, Start for real, storage namespace deletion, offline reload, and off-origin-request interception.
- All 19 exact `.factory/claims.json` commands from a clean temporary clone after `npm ci`: passed.
- Clean-clone `npm test`: passed (11 unit + 41 browser tests).
- Clean-clone `npm run build`: passed and produced `dist/index.html`.
- Route/title/metadata/link crawl, back-button focus check, static 404 response check, source review, and prior-handoff follow-up.

## Required next work

Address F-1-1 through F-1-5 in `.factory/review-1.md`, then repeat this review from a clean clone. Add a 390px no-scroll demo-content assertion, a desktop side-by-side workspace assertion, per-route OG/Twitter/404 metadata tests, and registered tests for any retained README claims.
