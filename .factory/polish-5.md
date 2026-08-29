# Batch Cart polish 5

Repair target: `865d481fe8c8af70a10d5e3a3f14b4f797b5fff4`
Review source: `.factory/review-5.md` at `a4926427c5d03f3af41bab6831a7c8fbada7c91d`, plus every earlier `.factory/review-*.md` and `.factory/polish-*.md`.

Product repairs: `869bf95`, `0fa61a3`, and `aa32dde`
Release: <https://batch-cart.sociobot.in> (`v1.0.10`)
Evidence root: `/work/.evidence/batch-cart-polish-5/`

| Finding | Change made or preserved | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct `/?demo=1` isolated sample, persistent banner, Reset demo, Start for real, and cart-first phone layout. | Browser test `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; [`live-demo-mobile-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-demo-mobile-final.png); live `/?demo=1` had rows at y=520.9–754.9 in 390×844. |
| F-1-2 | Preserved the documented wide 7/5 workspace: recipes and the shopping list share grid row 1. | `desktop demo keeps the calculated list beside the source recipes`; [`live-demo-desktop-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-demo-desktop-final.png); live offset 62 px at 1440×900. |
| F-1-3 | Kept `returned-license-storage` registered with one matching test; unsupported secret/build-composition promises remain absent. | `@claim:returned-license-storage`; final clean-clone registry parity and 24/24 claims; live `/?demo=1`. |
| F-1-4 | Preserved route-specific title, description, canonical, Open Graph, and Twitter metadata, including static 404 metadata. | `each route updates its sharing metadata`; [`live-404-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-404-final.png); live `/missing-page` returned 404 with `Page not found — Batch Cart`. |
| F-1-5 | Preserved plain recipe, payment, workspace, and Plus wording; refreshed the verb-first catalog sentence. | [copy audit](copy-audit.md); [catalog description](catalog-description.txt); [`live-home-mobile-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-home-mobile-final.png); live `/`. |
| F-2-1 | Preserved the synchronous keyboard shell and permanent main landmark; the initial empty data render is no longer painted before saved/demo data loads. | `ships the keyboard shell before JavaScript starts`; `the skip link reaches the main content by keyboard`; final clean and live suites 50/50. |
| F-2-2 | Kept the unbounded word `accurate` out of visitor-facing product copy, manifest, README, and catalog. | Final product-copy source scan; [copy audit](copy-audit.md); live `/`. |
| F-2-3 | Preserved the exact three-recipe seed and Reset demo behavior. | `@claim:demo-seed-reset`; [`live-demo-mobile-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-demo-mobile-final.png); live `/?demo=1`. |
| F-2-4 | Preserved quantity, unit, and ingredient-name overrides with persistence and export coverage. | `@claim:editable-totals`; final clean-clone claim log; live `/?demo=1`. |
| F-2-5 | Kept unsupported receipt wording removed; retained the exact tested hosted-checkout statement. | `@claim:hosted-checkout`; live `/` checkout link check in the 50-test suite. |
| F-2-6 | Preserved revoked-license handling while the free cart remains available. | `@claim:license-revocation`; final clean-clone claim log; live `/?demo=1`. |
| F-2-7 | Kept unsupported third-party refund assertions removed; product-owned terms and legal links remain usable. | `page /terms has one main heading and no serious accessibility errors`; live `/terms` in the 50-test suite. |
| F-2-8 | Preserved pantry checks in the no-time-limit free-core path. | `@claim:free-core`; final clean-clone claim log; live `/?demo=1`. |
| F-2-9 | Preserved confirmed deletion of both data namespaces, saved plans, and license keys; stale license responses are now ignored after deletion. | `@claim:local-data-deletion` now holds and releases a verification response after deletion; final clean-clone and live suites pass. |
| F-2-10 | Preserved the compact first screen with action explanation and all three facts visible at phone and desktop sizes. | `the first screen includes the action explanation and all three facts`; [`live-home-mobile-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-home-mobile-final.png); live 390×844 support text remained in view. |
| F-2-11 | Preserved the shared static-404 header, footer, metadata, return link, and HTTP status. | `returns the designed static not-found page with an HTTP 404 status`; [`live-404-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-404-final.png); live `/missing-page` = 404. |
| F-2-12 | Kept the plain fixed-standard-measures sentence and exact conversion coverage. | `@claim:fixed-measures`; final clean-clone claim log; live `/`. |
| F-2-13 | Preserved standalone README headings for product capabilities and the paid tier. | [README](../README.md); final clean-clone build; live product wording remains consistent. |
| F-3-1 | Preserved client-side heading focus and polite route announcement. | `client-side routes focus the heading and announce the opened page`; final clean and live suites 50/50. |
| F-5-1 | Replaced both SPA and static-404 metaphor copy with the plain h1 `Page not found`; removed the metaphor eyebrow. | `unknown routes name the error plainly`; [`live-404-final.png`](/work/.evidence/batch-cart-polish-5/screenshots/live-404-final.png); live `/missing-page` returned the plain h1, no metaphor, and a return link. |
| F-5-2 | Replaced generic `You stay in charge` with factual `Recipe and privacy limits`. | [copy audit](copy-audit.md); [`live-review-final.json`](/work/.evidence/batch-cart-polish-5/live-review-final.json); live `/` contains the factual section label. |

## Extra reliability and performance repairs

- The initial keyboard shell remains available before data loads, but the application no longer paints an empty demo/cart before replacing it with data. This reduced final live mobile Lighthouse CLS to **0.096**.
- License verification now uses a generation token and ignores a delayed response after **Delete local data** removed its license. The regression is part of `@claim:local-data-deletion`.
- The PWA release marker is `v1.0.10`, manifest start URL is `/?v=10`, and service-worker cache is `batch-cart-v13` so installed clients receive the release.

## Acceptance evidence

- Fresh final clone: `/tmp/batch-cart-polish5-final-clean-6ZOju4/repo` at `aa32dde7e39ccdb924372fff9e914726c57cfb0e`; `npm ci` reported zero vulnerabilities.
- Every exact command in [claims.json](claims.json) passed independently: 24/24. Log: `/tmp/batch-cart-polish5-final-clean-claims.log`.
- Final clean clone: `npm test` passed with 13 unit and 50 Chromium tests; `npm run build` produced `dist/index.html`; `git diff --check` passed.
- Final live suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot` passed 50/50, including Playwright axe scans on home, demo, legal routes, and 404.
- `verify-url.sh` passed for live `/` and `/?demo=1` with `lang=en`, one h1, one main landmark, complete alt text, labeled buttons, and no console/page errors. Reports and screenshots are in `verify-home-final/` and `verify-demo-final/`.
- Live Lighthouse mobile report: performance 98, accessibility 98, best practices 100, SEO 100; LCP 1.3 s, CLS 0.096, TBT 0 ms, transfer 87 KiB. Report: [`live-lighthouse-mobile-final.json`](/work/.evidence/batch-cart-polish-5/live-lighthouse-mobile-final.json).
- Final deployment: Static Web App deployment `2cc3fb6b-fec1-4f75-b318-93fda7ab312f` completed and <https://batch-cart.sociobot.in> returned 200; live `/missing-page` returned 404.

No finding of any severity remains open.
