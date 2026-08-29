# Batch Cart polish 8 — cumulative finding closure

Product repair commit: `7332592ee0a45849dc6497e8776ddcafd8f79760`

Static deployment: `81739424-17b1-4340-ba19-f280e64fca18`

Live release checked cold: <https://batch-cart.sociobot.in> (`v1.0.13`)

Evidence root: `/work/.evidence/batch-cart-polish-8/`

| Finding ID | Change made or confirmed | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved the direct `/?demo=1` sandbox, persistent banner, Reset demo, Start for real, and cart-first phone layout. | Test `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; [mobile demo](/work/.evidence/batch-cart-polish-8/live-demo-mobile-first-view.png); live `/?demo=1` has 12 rows and its first row is y=521–638. |
| F-1-2 | Preserved the asymmetric desktop recipe/result work surface with readable values in both columns. | Test `desktop demo keeps readable sample values beside the source recipes`; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); live recipe and cart controls are y=641–693 and y=606–723. |
| F-1-3 | Kept returned-license storage registered and tested; unsupported repository-secret and build-composition claims remain absent. | `@claim:returned-license-storage`; clean 24/24 claim log; [live home](/work/.evidence/batch-cart-polish-8/verify-home/screenshot-desktop.png); live `/`. |
| F-1-4 | Kept route-specific title, description, canonical, Open Graph, Twitter, favicon, and Apple-touch metadata on product routes and the static 404. | Tests `each route updates its sharing metadata` and `returns the designed static not-found page with an HTTP 404 status`; [404](/work/.evidence/batch-cart-polish-8/live-not-found-first-view.png); live `/privacy`, `/terms`, and `/missing-page`. |
| F-1-5 | Preserved the reviewed plain recipe, workspace, Plus, and payment wording; changed the catalog line to a 64-character verb-first sentence. | [copy audit](copy-audit.md); [catalog description](catalog-description.txt); [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live `/`. |
| F-2-1 (including review 4) | Kept the synchronous keyboard shell and permanent main landmark before asynchronous data loads. | Tests `ships the keyboard shell before JavaScript starts` and `the skip link reaches the main content by keyboard`; [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live 51/51 suite. |
| F-2-2 | Kept the unbounded word `accurate` out of visitor-facing product, README, manifest, and catalog copy. | [copy audit](copy-audit.md); clean source scan; [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live `/`. |
| F-2-3 | Kept the exact three-recipe sample seed and Reset behavior. | `@claim:demo-seed-reset`; clean claim log; [mobile demo](/work/.evidence/batch-cart-polish-8/live-demo-mobile-first-view.png); live `/?demo=1`. |
| F-2-4 | Kept editable quantity, unit, and ingredient-name totals through reload and export. | `@claim:editable-totals`; clean claim log; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); live `/?demo=1`. |
| F-2-5 | Kept unsupported receipt language absent and only the tested Sociobot hosted-checkout statement. | `@claim:hosted-checkout`; clean claim log; [live home](/work/.evidence/batch-cart-polish-8/verify-home/screenshot-desktop.png); live `/`. |
| F-2-6 | Kept license-revocation handling while retaining cart data and every free control. | `@claim:license-revocation`; clean claim log; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); live 51/51 suite. |
| F-2-7 | Kept product-owned legal and support wording with no unsupported refund promise. | Test `page /terms has one main heading and zero accessibility violations`; [Terms](/work/.evidence/batch-cart-polish-8/live-terms-mobile.png); live `/terms` = 200. |
| F-2-8 | Kept pantry behavior inside the future-clock free-core path with all named controls. | `@claim:free-core`; clean claim log; [mobile demo](/work/.evidence/batch-cart-polish-8/live-demo-mobile-first-view.png); live 51/51 suite. |
| F-2-9 | Kept confirmed deletion of real and sample carts, saved plans, and license keys. | `@claim:local-data-deletion`; clean claim log; [Privacy](/work/.evidence/batch-cart-polish-8/live-privacy-mobile.png); live `/privacy` = 200. |
| F-2-10 | Kept the action explanation and all three offline/privacy/price facts in the first phone and desktop screens. | Test `the first screen includes the action explanation and all three facts`; [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live last fact ends at y=591/844. |
| F-2-11 | Kept the designed static 404 with shared navigation/footer, complete metadata, return action, and HTTP 404. | Static release test; [404](/work/.evidence/batch-cart-polish-8/live-not-found-first-view.png); live `/missing-page` = 404. |
| F-2-12 | Kept the plain fixed-standard-measures wording and exact conversion test. | `@claim:fixed-measures`; clean claim log; [live home](/work/.evidence/batch-cart-polish-8/verify-home/screenshot-desktop.png); live `/`. |
| F-2-13 | Kept the standalone README headings `What Batch Cart does` and `Free cart and Batch Cart Plus`. | README source audit and clean build; [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live terminology check. |
| F-3-1 | Kept SPA navigation focus on the new h1 and its polite route-title announcement, including Back. | Test `client-side routes focus the heading and announce the opened page`; [Privacy](/work/.evidence/batch-cart-polish-8/live-privacy-mobile.png); live `/` → `/privacy` → Back. |
| F-5-1 | Kept both static and SPA not-found headings as the plain `Page not found`. | Test `unknown routes name the error plainly`; [404](/work/.evidence/batch-cart-polish-8/live-not-found-first-view.png); live `/missing-page`. |
| F-5-2 | Kept the factual `Recipe and privacy limits` section label. | [copy audit](copy-audit.md); [live home](/work/.evidence/batch-cart-polish-8/verify-home/screenshot-desktop.png); live `/`. |
| F-6-1 | Kept sample data deletion on Privacy, Cart, wordmark, Back, hard navigation, and Start for real exits. | `@claim:demo-deletion`; clean claim log; [mobile demo](/work/.evidence/batch-cart-polish-8/live-demo-mobile-first-view.png); live 51/51 suite. |
| F-6-2 | Kept source recipe and calculated shopping-list values readable together in the first desktop demo screen. | Test `desktop demo keeps readable sample values beside the source recipes`; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); live measurements in `live-cold-checks.json`. |
| F-6-3 | Kept observable pantry and override coverage in export/import and operated every named free control after the future clock. | `@claim:data-export`, `@claim:data-import`, and `@claim:free-core`; clean claim log; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); live 51/51 suite. |
| F-6-4 | Kept bounded first-screen wording without absolute correctness or timing promises. | [copy audit](copy-audit.md); test `the first screen includes the action explanation and all three facts`; [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live `/`. |
| F-6-5 | Kept `Open your cart` and the accurate README statement that Start for real returns to the existing cart. | `@claim:demo-isolation`; [copy audit](copy-audit.md); [mobile home](/work/.evidence/batch-cart-polish-8/live-home-mobile-first-view.png); live `/` and `/?demo=1`. |
| F-6-6 | Kept the concrete headings `How Batch Cart builds the shopping list` and `How demo data is stored`. | Test `demo heading outline introduces the shopping workspace before its controls`; [full demo](/work/.evidence/batch-cart-polish-8/verify-demo/screenshot-desktop.png); live `/?demo=1`. |
| F-7-1 | Kept the untestable `Generated artwork` visitor claim out of both footers while retaining provenance in `design.md`. | Static release test asserts the phrase is absent; [404](/work/.evidence/batch-cart-polish-8/live-not-found-first-view.png); live `/` and `/missing-page` show only `v1.0.13`. |
| F-8-1 | Replaced the nested complementary `<aside>` with a labelled `<section>` for the primary shopping list. Strengthened Axe checks from serious/critical filtering to zero violations on all five routes. | Tests `page / has one main heading and zero accessibility violations` and `page /demo has one main heading and zero accessibility violations`; [desktop demo](/work/.evidence/batch-cart-polish-8/live-demo-desktop-first-view.png); cold live DOM reports `cartElement: SECTION`. |

## Final evidence

- Fresh remote clone at `7332592ee0a45849dc6497e8776ddcafd8f79760`: all 24 exact claim commands passed separately, then 13 unit and 51 Chromium tests passed and `npm run build` produced `dist/index.html`. Log: `/work/.evidence/batch-cart-polish-8/clean-clone-claims-and-suite.log`.
- The work-order build command passed again before deployment. Initial application JavaScript is 31.12 kB raw / 10.49 kB gzip; CSS is 20.33 kB raw / 5.34 kB gzip.
- The deployed-origin suite passed 51/51 with zero Axe violations on home, demo, Privacy, Terms, and 404. Log: `/work/.evidence/batch-cart-polish-8/live-playwright-axe.log`.
- Factory URL verification passed `/` and `/?demo=1`: 200, correct title and language, one h1, one main, complete image alternatives, labelled buttons, and no console/page errors. Evidence: `verify-home/` and `verify-demo/` under the evidence root.
- Cold route checks returned 200 for `/`, both demo entries, Privacy, Terms, robots, sitemap, and manifest; `/missing-page` returned 404. Response headers include CSP with `frame-ancestors 'none'`, nosniff, Referrer-Policy, and Permissions-Policy.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.4 s, CLS 0.001, TBT 40 ms. Report: `/work/.evidence/batch-cart-polish-8/live-lighthouse-mobile.json`.

No finding of any severity remains open.
