# Batch Cart polish 7 — cumulative closure

Repair commit deployed: `4418f73fb406fa48937328c5bd30a0774dd52477`
Deployment: `5c155fd7-fd60-4d1e-97e5-fb8c76528583`
Live URL rechecked cold: <https://batch-cart.sociobot.in>

Shared evidence: all 24 exact claim commands plus the clean 13-unit/51-browser/build suite are in `/work/.evidence/batch-cart-polish-7/clean-clone-claims-and-suite.log`; the deployed-origin 51/51 Playwright/Axe run is in `/work/.evidence/batch-cart-polish-7/live-playwright-axe.log`.

| Finding ID | Change made or confirmed | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved the one-click `?demo=1` sandbox, banner, Reset demo, Start for real, and cart-first phone layout. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; [cold mobile demo](/work/.evidence/batch-cart-polish-7/live-demo-mobile-cold.png); live `/?demo=1`. |
| F-1-2 | Preserved the wide 7/5 recipe/cart workspace. | `desktop demo keeps readable sample values beside the source recipes`; [cold desktop demo](/work/.evidence/batch-cart-polish-7/live-demo-desktop-cold.png); live `/?demo=1`. |
| F-1-3 | Preserved registered returned-license storage and removed unsupported repository/build assertions. | `@claim:returned-license-storage`; clean 24/24 claim log. |
| F-1-4 | Preserved route-specific title, description, canonical, Open Graph, Twitter, and static-404 metadata. | `each route updates its sharing metadata`; [live 404 HTML](/work/.evidence/batch-cart-polish-7/live-404.html). |
| F-1-5 | Kept plain recipe/payment/Plus wording and refreshed the catalog sentence. | [copy audit](copy-audit.md); [catalog description](catalog-description.txt); live `/`. |
| F-2-1 | Kept the synchronous skip-link/main shell and keyboard regression. | `ships the keyboard shell before JavaScript starts`; `the skip link reaches the main content by keyboard`; live 51/51 suite. |
| F-2-2 | Kept the unbounded word `accurate` out of visitor-facing copy. | [copy audit](copy-audit.md); live home screenshot. |
| F-2-3 | Kept the exact three-recipe demo seed and Reset behavior. | `@claim:demo-seed-reset`; clean claim log; live `/?demo=1`. |
| F-2-4 | Kept quantity, unit, and ingredient-name overrides through reload/export. | `@claim:editable-totals`; clean claim log. |
| F-2-5 | Kept only the exact tested Sociobot-hosted checkout wording. | `@claim:hosted-checkout`; clean claim log. |
| F-2-6 | Kept revoked-license handling while preserving the free cart. | `@claim:license-revocation`; clean claim log. |
| F-2-7 | Kept product-owned terms, support links, and no unsupported refund promise. | `page /terms has one main heading and no serious accessibility errors`; live `/terms`. |
| F-2-8 | Kept every named free control in the future-clock free-core regression. | `@claim:free-core`; clean claim log. |
| F-2-9 | Kept confirmed local-data deletion for both carts, plans, and license keys. | `@claim:local-data-deletion`; clean claim log; live `/privacy`. |
| F-2-10 | Kept the compact first screen with action explanation and three facts. | `the first screen includes the action explanation and all three facts`; [cold home](/work/.evidence/batch-cart-polish-7/live-home-mobile-cold.png); live `/`. |
| F-2-11 | Kept shared static-404 chrome, metadata, return link, and HTTP status. | Static release unit test; [live 404 headers](/work/.evidence/batch-cart-polish-7/live-404.headers); live `/missing-page` = 404. |
| F-2-12 | Kept the plain fixed-standard-measures wording and exact conversion check. | `@claim:fixed-measures`; clean claim log. |
| F-2-13 | Kept standalone README headings for features and the paid tier. | [README](../README.md); clean build. |
| F-3-1 | Kept route h1 focus and polite title announcement. | `client-side routes focus the heading and announce the opened page`; live 51/51 suite. |
| F-5-1 | Kept the plain static and SPA 404 heading `Page not found`. | `unknown routes name the error plainly`; [cold 404](/work/.evidence/batch-cart-polish-7/live-404-cold.png). |
| F-5-2 | Kept the factual `Recipe and privacy limits` section label. | [copy audit](copy-audit.md); live `/`. |
| F-6-1 | Kept demo deletion for links, Back/Forward, hard navigation, and Start for real. | `@claim:demo-deletion`; clean claim log. |
| F-6-2 | Kept readable recipe and ingredient controls in the desktop demo’s first view. | `desktop demo keeps readable sample values beside the source recipes`; [cold desktop demo](/work/.evidence/batch-cart-polish-7/live-demo-desktop-cold.png). |
| F-6-3 | Kept pantry/override export/import coverage and full free-control coverage. | `@claim:data-export`, `@claim:data-import`, and `@claim:free-core`; clean claim log. |
| F-6-4 | Kept bounded shopping-list wording without unsupported correctness/timing promises. | [copy audit](copy-audit.md); live home screenshot. |
| F-6-5 | Kept `Open your cart` and README’s accurate Start-for-real outcome. | [README](../README.md); [copy audit](copy-audit.md); live `/` and `/?demo=1`. |
| F-6-6 | Kept concrete headings for shopping-list construction and demo storage. | [copy audit](copy-audit.md); live `/?demo=1`. |
| F-7-1 | Removed `Generated artwork` from both the SPA and static-404 footers; provenance remains in `design.md`, which is not visitor claim copy. Added a regression preventing it from returning. | `static release caching > returns the designed static not-found page with an HTTP 404 status`; [cold home response](/work/.evidence/batch-cart-polish-7/verify-home/index.html); [cold 404 response](/work/.evidence/batch-cart-polish-7/live-404.html); live `/` and `/missing-page`. |

## Final live evidence

- Cold `/` and `/?demo=1` passed the factory verifier: title, language, one h1, main landmark, alt text, labels, and zero console/page errors. Evidence: `/work/.evidence/batch-cart-polish-7/verify-home/` and `/work/.evidence/batch-cart-polish-7/verify-demo/`.
- The live public suite passed 51/51, including Axe scans, route/focus metadata, privacy, demo isolation, and offline reload.
- The mobile Lighthouse report is 100 performance, 100 accessibility, 100 best practices, and 100 SEO; LCP is 1.4 s and CLS 0.001. Evidence: [report](/work/.evidence/batch-cart-polish-7/live-lighthouse-mobile-retry.json).
- Visual cold checks: home support copy ends y=590.9/844, demo rows occupy y=520.9–754.9/844, and desktop source/cart fields occupy y=616–693/900. Evidence: [measurements](/work/.evidence/batch-cart-polish-7/live-cold-layout.json).
