# Batch Cart polish 3

Repair target: `5e35f6ce7df2dadfc79ac597677ddf1cdb6d1f98`

Review sources: `.factory/review-1.md`, `.factory/review-2.md`, and `.factory/review-3.md` at `b3195f9c960603c82694aed1eba40490c6f8dabe`

Product repair: `1cc31fc`; final test hardening: `62d7982`

Live release: <https://batch-cart.sociobot.in> (`v1.0.6`)

Evidence root: `/work/.evidence/batch-cart-polish-3/`

Every earlier finding was rechecked. Existing fixes were preserved; F-3-1 was the only open product finding in the repair target.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct `/?demo=1` isolated sample entry, persistent demo banner, Reset demo, Start for real, and mobile-first populated list. | Test: `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-mobile.png`; live `/?demo=1`: first two rows measured y=520.9–754.9 in a 390×844 viewport. |
| F-1-2 | Preserved the wide 7/5 workspace with recipe panes and shopping list in the same grid row. | Test: `desktop demo keeps the calculated list beside the source recipes`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-desktop.png`; live `/?demo=1`: cart/recipe top offset was 62 px at 1440×900. |
| F-1-3 | Preserved the registered returned-license claim and the removal of unsupported repository/build assertions. | Test: `@claim:returned-license-storage`; screenshot: `/work/.evidence/batch-cart-polish-3/verify-home/screenshot-desktop.png`; live `/` passed the final 49-test suite. Registry parity is 24 IDs and 24 unique tags. |
| F-1-4 | Preserved per-route title, description, canonical, Open Graph, and Twitter metadata plus complete static-404 metadata. | Tests: `each route updates its sharing metadata` and `returns the designed static not-found page with an HTTP 404 status`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-404.png`; live `/missing-page` returned HTTP 404 with `Page not found — Batch Cart`. |
| F-1-5 | Kept the plain replacements for recipe, payment, workspace, and Plus copy; refreshed the copy audit and catalog line. | Check: `.factory/copy-audit.md` has no flag or sentence over 22 words; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-home-mobile.png`; live `/` uses the reviewed plain wording. |
| F-2-1 | Preserved the rendered-shell wait in the mobile keyboard test and added observable waits to two latency-sensitive claim edits found during live/parallel verification. | Tests: `mobile keyboard focus starts at the skip link, follows the visible cart, and exposes Import data` plus `client-side routes focus the heading and announce the opened page`; 10/10 serial repeats passed; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-mobile.png`; final live suite passed 49/49. |
| F-2-2 | Kept the unbounded word “accurate” out of the README, catalog, manifest, and product copy. | Check: final copy audit/source scan; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-home-mobile.png`; live `/` makes only the bounded aggregation claims registered in `.factory/claims.json`. |
| F-2-3 | Preserved the exact three-recipe promise and the reset behavior in one registered claim. | Test: `@claim:demo-seed-reset`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-mobile.png`; live `/?demo=1` opened all three samples and Reset demo restored them. |
| F-2-4 | Preserved saved quantity, unit, and ingredient-name overrides with export coverage; the test now waits for the IndexedDB transaction before reload. | Test: `@claim:editable-totals` (10/10 parallel repeats); screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-desktop.png`; live `/?demo=1` passed the claim in the final suite. |
| F-2-5 | Kept unsupported receipt wording removed; the remaining price/checkout statement is exact and tested. | Test: `@claim:hosted-checkout`; screenshot: `/work/.evidence/batch-cart-polish-3/verify-home/screenshot-desktop.png`; live checkout link returned 303 to the hosted Dodo destination. |
| F-2-6 | Preserved revoked-license handling: Plus closes while free cart data and controls remain. | Test: `@claim:license-revocation`; screenshot: `/work/.evidence/batch-cart-polish-3/verify-home/screenshot-desktop.png`; live `/` passed the fixture-based claim in the final suite. |
| F-2-7 | Kept unsupported third-party terms/refund wording removed and retained product-owned purchase terms and support contact. | Test: `page /terms has one main heading and no serious accessibility errors`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-route-announcement.png`; live `/terms` returned 200 with route-specific metadata and working legal links. |
| F-2-8 | Preserved pantry checks in the no-time-limit free-core claim and its future-clock exercise. | Test: `@claim:free-core`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-demo-desktop.png`; live `/?demo=1` passed pantry and free-control coverage. |
| F-2-9 | Preserved the confirmed Delete local data control for both databases, saved plans, and license keys. | Test: `@claim:local-data-deletion`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-route-announcement.png`; live `/privacy` returned 200 and passed the claim in the final suite. |
| F-2-10 | Preserved the compact responsive hero so the action explanation and all three facts stay above the fold. | Test: `the first screen includes the action explanation and all three facts`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-home-mobile.png`; live `/` passed at 390×844 and 1440×900. |
| F-2-11 | Preserved the shared header navigation, full footer, return action, metadata, and HTTP status on the static 404. | Test: `returns the designed static not-found page with an HTTP 404 status`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-404.png`; live `/missing-page` returned 404 with the `v1.0.6` footer. |
| F-2-12 | Kept “It converts units using fixed standard measures” in place of the former technical phrase. | Test: `@claim:fixed-measures`; screenshot: `/work/.evidence/batch-cart-polish-3/verify-home/screenshot-desktop.png`; live `/` shows the rewritten sentence and the exact conversion claim passes. |
| F-2-13 | Kept the standalone README headings “What Batch Cart does” and “Free cart and Batch Cart Plus.” | Check: clean-clone README/source audit; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-home-desktop.png`; live product naming matches those terms. |
| F-3-1 | Client-side navigation now clears stale status text, focuses the new h1, then updates the polite live region with the new route title. Initial loads remain silent. | Test: `client-side routes focus the heading and announce the opened page`; screenshot: `/work/.evidence/batch-cart-polish-3/screenshots/live-route-announcement.png`; live `/` → `/privacy` produced `Privacy — Batch Cart` while focusing “Your recipes stay with you,” and Back announced the home title. |

## Acceptance evidence

- Clean clone: `/tmp/batch-cart-polish3-acceptance-WOS4Wq/repo` from pushed commit `62d7982`.
- Every exact command in `.factory/claims.json`: 24/24 passed independently; log at `/work/.evidence/batch-cart-polish-3/acceptance-clean-claims.log`.
- Clean `npm test`: 12 unit tests and 49 Chromium tests passed. Clean `npm run build`: passed with `dist/index.html` at the root.
- Public-origin suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot` passed 49/49.
- `/opt/fleet/lib/verify-url.sh` passed for `/` and `/?demo=1`; reports and full-page screenshots are under the evidence root.
- Mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.1 s, CLS 0.021, total blocking time 0 ms. JSON: `/work/.evidence/batch-cart-polish-3/lighthouse-mobile.json`.
- Cold status checks: `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` returned 200; `/missing-page` returned 404.
- No finding of any severity remains open.
