# Batch Cart polish 10 — cumulative closure

Repair commit: `b79225e945a3d9d4f7c8e2e7a7b9cc0d23b2f42f`  
Deployment: `e38e65f2-c5f8-4df6-b305-eb02b6ee837a`  
Live URL rechecked cold: <https://batch-cart.sociobot.in>

Evidence root: `/work/.evidence/batch-cart-polish-10/`. The repair preserves
the PWA's aubergine, lime, apricot, glass-pane identity and changes only the
remaining terminology defect plus its regression coverage.

| Finding ID | Change made or preserved | Evidence: test · screenshot · live URL check |
| --- | --- | --- |
| F-1-1 | Preserved direct isolated `?demo=1`, the banner, Reset demo, Start for real, and populated phone view. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile` · `screenshots/live-demo-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-1-2 | Preserved the readable, side-by-side desktop recipe and shopping-list work surface. | `desktop demo keeps readable sample values beside the source recipes` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-1-3 | Preserved returned-license storage coverage and kept unsupported repository/build claims out of visitor copy. | `@claim:returned-license-storage` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/?demo=1&license=test-token> |
| F-1-4 | Preserved route-specific titles, descriptions, canonicals, sharing metadata, and complete static-404 metadata. | `each route updates its sharing metadata` · `screenshots/live-404-mobile.png` · <https://batch-cart.sociobot.in/missing-page> |
| F-1-5 | Preserved plain recipe, workspace, payment, and Plus wording; catalog text is verb-first. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-2-1 | Preserved the synchronous skip-link/main shell and deterministic keyboard path. | `the skip link reaches the main content by keyboard` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/> |
| F-2-2 | Kept the unbounded “accurate” promise out of visitor-facing copy. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-2-3 | Preserved the three-recipe demo seed and observable reset behavior. | `@claim:demo-seed-reset` · `screenshots/live-demo-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-2-4 | Preserved quantity, unit, and ingredient-name overrides through reload and export. | `@claim:editable-totals` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-2-5 | Kept unsupported receipt copy absent and retained the tested hosted-checkout statement. | `@claim:hosted-checkout` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/> |
| F-2-6 | Preserved license revocation while the cart and free controls remain usable. | `@claim:license-revocation` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-2-7 | Preserved product-owned terms/support copy without an unsupported refund-policy promise. | `page /terms has one main heading and zero accessibility violations` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/terms> |
| F-2-8 | Preserved every named free control after the ten-year clock change. | `@claim:free-core` · `screenshots/live-demo-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-2-9 | Preserved confirmed deletion of real/sample carts, plans, and license keys. | `@claim:local-data-deletion` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/privacy> |
| F-2-10 | Preserved the action explanation and all three facts in the first phone and desktop screens. | `the first screen includes the action explanation and all three facts` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-2-11 | Preserved designed static 404 chrome, metadata, return action, and HTTP 404. | `returns the designed static not-found page with an HTTP 404 status` · `screenshots/live-404-mobile.png` · <https://batch-cart.sociobot.in/missing-page> |
| F-2-12 | Preserved the plain fixed-standard-measures wording and exact conversion coverage. | `@claim:fixed-measures` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-2-13 | Preserved standalone README headings for capabilities and the paid tier. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-3-1 | Preserved h1 focus and a polite route-title announcement on client navigation and Back. | `client-side routes focus the heading and announce the opened page` · `verify-home/screenshot-desktop.png` · <https://batch-cart.sociobot.in/privacy> |
| F-5-1 | Preserved plain static and SPA not-found headings. | `unknown routes name the error plainly` · `screenshots/live-404-mobile.png` · <https://batch-cart.sociobot.in/missing-page> |
| F-5-2 | Preserved the factual “Recipe and privacy limits” label. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-6-1 | Preserved demo deletion on Privacy, Cart, wordmark, Back, hard exit, and Start for real. | `@claim:demo-deletion` · `screenshots/live-demo-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-6-2 | Preserved source recipe and calculated values in the first desktop demo view. | `desktop demo keeps readable sample values beside the source recipes` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-6-3 | Preserved pantry/override import/export assertions and all future-clock free controls. | `@claim:data-export`, `@claim:data-import`, `@claim:free-core` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-6-4 | Kept unsupported correctness and timing absolutes out of first-screen copy. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-6-5 | Preserved “Open your cart” and the correct returning-user Start-for-real outcome. | `@claim:demo-isolation` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-6-6 | Preserved concrete shopping-list construction and demo-storage headings. | `demo heading outline introduces the shopping workspace before its controls` · `screenshots/live-demo-mobile.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-7-1 | Kept the untestable generated-artwork claim out of visitor footers; provenance remains in `design.md`. | `returns the designed static not-found page with an HTTP 404 status` · `screenshots/live-404-mobile.png` · <https://batch-cart.sociobot.in/missing-page> |
| F-8-1 | Preserved the labelled shopping-list `section` and zero-violation Axe scans. | `page /demo has one main heading and zero accessibility violations` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-9-1 | Preserved the tagged servings interaction from `1.2 kg` to `1.45 kg` with both sources. | `@claim:scaled-aggregation` · `screenshots/live-demo-desktop.png` · <https://batch-cart.sociobot.in/?demo=1> |
| F-9-2 | Preserved the bounded footer sentence “One shopping list from your recipes.” | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-9-3 | Preserved factual “Three steps” wording. | `keeps reviewed copy out of visitor-facing sources` · `screenshots/live-home-mobile.png` · <https://batch-cart.sociobot.in/> |
| F-10-1 | Replaced the README’s inconsistent “one combined cart” sentence with “one combined shopping list” and added the exact positive/negative copy regression. | `keeps reviewed copy out of visitor-facing sources` · README is source-tested (no visual asset needed) · <https://batch-cart.sociobot.in/> uses the matching shopping-list terminology |

## Verification

- Fresh clone: `/tmp/batch-cart-polish10-clean-bsRNV4/repo` at
  `b79225e945a3d9d4f7c8e2e7a7b9cc0d23b2f42f`; `npm ci` reported zero
  vulnerabilities.
- Every exact command in `.factory/claims.json` passed separately: **24/24**.
- Clean `npm test` passed: **14 unit and 51 Chromium tests**. Clean
  `npm run build` produced `dist/index.html`; `git diff --check` passed.
- Deployed-origin `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run
  test:e2e -- --workers=1 --reporter=dot` passed **51/51**, including the
  zero-violation Playwright Axe scans, offline reload, keyboard/focus,
  metadata, routes, and privacy paths.
- `/opt/fleet/lib/verify-url.sh` passed home and direct demo. Its reports show
  zero console/page errors, `lang=en`, one h1/main, complete image
  alternatives, and labelled buttons: `verify-home/verify.json` and
  `verify-demo/verify.json`.
- Live mobile Lighthouse recorded **99 performance, 100 accessibility, 100
  best practices, and 100 SEO** (LCP 1.50 s, CLS 0.00047, TBT 128 ms):
  `lighthouse-mobile.json`.
- Cold live status checks returned 200 for `/`, `/?demo=1`, `/demo`,
  `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, and
  `/manifest.webmanifest`; `/missing-page` returned 404.

No finding of any severity remains open.
