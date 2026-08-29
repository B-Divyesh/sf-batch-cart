# Batch Cart polish 9 — cumulative closure

Product repair commit deployed: `9572ce4acf99c9206290f12aa91862d3bdb10b96`

Static deployment: `30139068-a2f8-4e87-a43c-e14385b6b830`

Live release checked cold: <https://batch-cart.sociobot.in> (`v1.0.14`)

Evidence root: `/work/.evidence/batch-cart-polish-9/`

| Finding ID | Change made or confirmed | Evidence: test · screenshot · live URL check |
| --- | --- | --- |
| F-1-1 | Preserved one-click `?demo=1`, the isolated sample namespace, persistent banner, Reset demo, Start for real, and populated phone first view. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile` · `verify-demo/screenshot-mobile.png` · live `/?demo=1` has 12 calculated rows. |
| F-1-2 | Preserved the asymmetric desktop recipe/result workspace with readable source and result fields together. | `desktop demo keeps readable sample values beside the source recipes` · `verify-demo/screenshot-desktop.png` · live `/?demo=1`. |
| F-1-3 | Kept returned-license storage registered and removed the unsupported repository/build claims. | `@claim:returned-license-storage` · `verify-home/screenshot-desktop.png` · live fixture path on `/?demo=1&license=test-token` passed. |
| F-1-4 | Preserved route-specific titles, descriptions, canonicals, Open Graph/Twitter metadata, and complete static-404 metadata. | `each route updates its sharing metadata` · `live-not-found-mobile.png` · `/`, demo, `/privacy`, `/terms` return 200 and `/missing-page` returns 404 with its own title. |
| F-1-5 | Kept the reviewed plain recipe, workspace, payment, and Plus wording; catalog copy is verb-first and 65 characters. | `keeps reviewed copy out of visitor-facing sources` · `live-home-mobile.png` · live `/`. |
| F-2-1 | Preserved the synchronous skip-link/main shell and deterministic immediate keyboard path. | `ships the keyboard shell before JavaScript starts`; `the skip link reaches the main content by keyboard` · `live-home-mobile.png` · live `/`. |
| F-2-2 | Kept the unbounded “accurate shopping list” wording absent. | `keeps reviewed copy out of visitor-facing sources` · `live-home-mobile.png` · live `/` and README source. |
| F-2-3 | Preserved the exact three-recipe seed and observable Reset behavior. | `@claim:demo-seed-reset` · `verify-demo/screenshot-mobile.png` · live `/?demo=1`. |
| F-2-4 | Preserved editable quantity, unit, and ingredient-name totals through reload and export. | `@claim:editable-totals` · `verify-demo/screenshot-desktop.png` · live `/?demo=1`. |
| F-2-5 | Kept unsupported receipt wording absent and retained only the tested hosted-checkout statement. | `@claim:hosted-checkout` · `verify-home/screenshot-desktop.png` · live `/` checkout returned the tested Sociobot/Dodo route. |
| F-2-6 | Preserved license revocation while the cart data and free controls remain available. | `@claim:license-revocation` · `verify-demo/screenshot-desktop.png` · live fixture path passed. |
| F-2-7 | Kept product-owned terms and support copy without the unsupported refund-policy assertion. | `page /terms has one main heading and zero accessibility violations` · `live-terms-mobile.png` · live `/terms` = 200. |
| F-2-8 | Preserved pantry behavior with every other named free control after the ten-year clock change. | `@claim:free-core` · `verify-demo/screenshot-mobile.png` · live `/?demo=1` claim path passed. |
| F-2-9 | Preserved confirmed deletion of real/sample carts, saved plans, and license keys. | `@claim:local-data-deletion` · `live-privacy-mobile.png` · live `/privacy` = 200. |
| F-2-10 | Kept the action explanation and three facts inside both required first screens. | `the first screen includes the action explanation and all three facts` · `live-home-mobile.png` · live 390×844 last fact ends at y=590.91. |
| F-2-11 | Preserved the designed static 404 with shared navigation/footer, metadata, return action, and HTTP 404. | `returns the designed static not-found page with an HTTP 404 status` · `live-not-found-mobile.png` · live `/missing-page` = 404. |
| F-2-12 | Kept the plain fixed-standard-measures wording and exact conversion coverage. | `@claim:fixed-measures` · `verify-home/screenshot-desktop.png` · live `/`. |
| F-2-13 | Preserved the standalone README headings for capabilities and the paid tier. | `keeps reviewed copy out of visitor-facing sources` · `live-home-mobile.png` · README and live terminology agree. |
| F-3-1 | Preserved h1 focus and polite route-title announcement on client navigation and Back. | `client-side routes focus the heading and announce the opened page` · `live-privacy-mobile.png` · live `/` → `/privacy` → Back. |
| F-5-1 | Kept both static and SPA not-found pages on the plain heading “Page not found.” | `unknown routes name the error plainly` · `live-not-found-mobile.png` · live `/missing-page`. |
| F-5-2 | Kept the factual “Recipe and privacy limits” section label. | `keeps reviewed copy out of visitor-facing sources` · `verify-home/screenshot-desktop.png` · live `/`. |
| F-6-1 | Preserved demo deletion through Privacy, Cart, wordmark, Back, hard exit, and Start for real. | `@claim:demo-deletion` · `verify-demo/screenshot-mobile.png` · live demo exit paths passed. |
| F-6-2 | Kept readable recipe and calculated values in the first desktop demo view. | `desktop demo keeps readable sample values beside the source recipes` · `verify-demo/screenshot-desktop.png` · live `/?demo=1`. |
| F-6-3 | Preserved pantry/override export and import assertions plus all future-clock free controls. | `@claim:data-export`; `@claim:data-import`; `@claim:free-core` · `verify-demo/screenshot-desktop.png` · all three live paths passed. |
| F-6-4 | Kept unsupported correctness/timing absolutes out of the first screen. | `keeps reviewed copy out of visitor-facing sources` · `live-home-mobile.png` · live `/`. |
| F-6-5 | Kept “Open your cart” and the accurate returning-user description for Start for real. | `@claim:demo-isolation` · `live-home-mobile.png` · live `/` and `/?demo=1`. |
| F-6-6 | Kept concrete headings for shopping-list construction and demo storage. | `demo heading outline introduces the shopping workspace before its controls`; `keeps reviewed copy out of visitor-facing sources` · `verify-demo/screenshot-mobile.png` · live `/?demo=1`. |
| F-7-1 | Kept the untestable “Generated artwork” visitor claim out of both footers; provenance stays in `design.md`. | `returns the designed static not-found page with an HTTP 404 status`; `keeps reviewed copy out of visitor-facing sources` · `live-footer.png` · live `/` and `/missing-page`. |
| F-8-1 | Kept the shopping-list work surface as a labelled `section`; Axe now requires zero violations on all routes. | `page /demo has one main heading and zero accessibility violations` · `verify-demo/screenshot-desktop.png` · live `/`, demo, Privacy, Terms, and 404 all passed Axe. |
| F-9-1 | Expanded the exact tagged claim: it records `1.2 kg`, changes the first Cook for value from 6 to 8, asserts `1.45 kg`, then asserts both scaled recipe sources. The registry sandbox now describes that exact interaction. | `@claim:scaled-aggregation scales servings and combines matching ingredients` · `live-scaled-aggregation.png` · cold live `/?demo=1` reproduced `1.2 kg → 1.45 kg`, `1000 g` pasta + `450 g` salad. |
| F-9-2 | Replaced the unbounded footer sentence on the SPA and static 404 with “One shopping list from your recipes.” | `keeps reviewed copy out of visitor-facing sources`; static 404 release test · `live-footer.png` · live `/` and `/missing-page`. |
| F-9-3 | Replaced “Three clear steps” with the factual “Three steps” and removed the same subjective adjective from initial sharing metadata. | `keeps reviewed copy out of visitor-facing sources` · `live-three-steps.png` · live `/`. |

## Final evidence

- Clean clone `/tmp/batch-cart-polish9-clean-fBQDi4/repo` at `9572ce4`: `npm ci` found zero vulnerabilities; all 24 exact claim commands passed independently; `npm test` passed 14 unit and 51 Chromium tests; `npm run build` produced `dist/index.html`. Log: `clean-clone-claims-suite-build.log`.
- Deployed-origin Playwright/Axe: 51/51 passed with zero Axe violations on all five routes. Log: `live-playwright-axe.log`.
- Factory URL verifier passed home and direct demo with one h1, one main, `lang=en`, complete alt/button names, and no console/page errors. Reports: `verify-home/verify.json` and `verify-demo/verify.json`.
- Independent cold check used fresh contexts and a separate offline context. It verified route status/title/h1, same-origin demo requests, only `demo:batch-cart`, first-screen geometry, the serving change and sources, and a three-recipe offline reload. Report: `live-cold-checks.json`.
- Local and deployed `index.html`, hashed JavaScript, and hashed CSS match byte-for-byte by SHA-256. Log: `live-build-identity.log`.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.2 s, CLS 0.001, TBT 0 ms, transfer 114 KiB. Report: `lighthouse-mobile.json`.

No finding of any severity remains open.
