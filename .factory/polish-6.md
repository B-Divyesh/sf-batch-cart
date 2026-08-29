# Batch Cart polish 6 — cumulative finding closure

Repair commit: `036c7f97a0951683e51e78d8fc43e40f67e33db5`
Live URL checked cold: <https://batch-cart.sociobot.in>

Evidence shorthand: **clean claims** is the 24/24 exact-command log at `/tmp/batch-cart-round6-clean-claims.log`; **live suite** is the 50/50 public-origin Playwright/Axe run. The first-view screenshots are in `/work/.evidence/batch-cart-polish-6/`.

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the cart-first phone demo with banner, Reset demo, and Start for real. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; [`live-demo-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-mobile-first-viewport.png); live `/?demo=1`. |
| F-1-2 | Retained the documented 7/5 desktop workspace and added a stronger first-view regression. | `desktop demo keeps readable sample values beside the source recipes`; [`live-demo-desktop-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-desktop-first-viewport.png); live `/?demo=1`. |
| F-1-3 | Kept returned-license storage registered/tested and removed unsupported secret/build assertions. | `@claim:returned-license-storage`; clean claims; live suite. |
| F-1-4 | Retained route-specific title, description, canonical, Open Graph, Twitter, and static-404 metadata. | `each route updates its sharing metadata`; `returns the designed static not-found page with an HTTP 404 status`; live `/privacy`, `/terms`, and `/missing-page`. |
| F-1-5 | Retained plain recipe, payment, and Plus wording; refreshed the verb-first catalog sentence. | [copy audit](copy-audit.md); [catalog description](catalog-description.txt); live `/`. |
| F-2-1 | Kept the synchronous keyboard shell and permanent main landmark. | `ships the keyboard shell before JavaScript starts`; `the skip link reaches the main content by keyboard`; live suite. |
| F-2-2 | Kept the unbounded word `accurate` out of visitor-facing product copy. | [copy audit](copy-audit.md); live `/`. |
| F-2-3 | Retained the exact three-recipe seed and Reset demo behavior. | `@claim:demo-seed-reset`; clean claims; live `/?demo=1`. |
| F-2-4 | Retained saved quantity, unit, and name overrides with reload/export coverage. | `@claim:editable-totals`; clean claims; live suite. |
| F-2-5 | Retained only the exact tested hosted-checkout wording. | `@claim:hosted-checkout`; clean claims; live `/`. |
| F-2-6 | Retained revoked-license handling while the free cart remains usable. | `@claim:license-revocation`; clean claims; live suite. |
| F-2-7 | Retained product-owned terms and working legal links without unsupported refund promises. | `page /terms has one main heading and no serious accessibility errors`; live `/terms`. |
| F-2-8 | Expanded the free-core regression to operate every named free control after ten years. | `@claim:free-core`; clean claims; live suite. |
| F-2-9 | Retained confirmed deletion of both cart namespaces, plans, and license keys. | `@claim:local-data-deletion`; clean claims; live `/privacy`. |
| F-2-10 | Retained the compact mobile first screen with action explanation and three facts. | `the first screen includes the action explanation and all three facts`; [`live-home-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-home-mobile-first-viewport.png); live `/`. |
| F-2-11 | Retained the full static-404 skeleton, metadata, return link, and HTTP status. | `returns the designed static not-found page with an HTTP 404 status`; live `/missing-page` = 404. |
| F-2-12 | Retained the plain fixed-standard-measures wording and exact conversion check. | `@claim:fixed-measures`; clean claims; live `/`. |
| F-2-13 | Retained standalone README headings for product features and the paid tier. | [README](../README.md); clean build; live product terminology. |
| F-3-1 | Retained client-side h1 focus and polite route announcement. | `client-side routes focus the heading and announce the opened page`; live `/` → `/privacy` → Back in the live suite. |
| F-5-1 | Retained the plain static and SPA 404 heading `Page not found`. | `unknown routes name the error plainly`; live `/missing-page`. |
| F-5-2 | Retained the factual privacy-section label `Recipe and privacy limits`. | [copy audit](copy-audit.md); live `/`. |
| F-6-1 | Added `discardDemo()` before all same-site exits, on Back/Forward exit, and on fresh non-demo initialization; it waits for queued writes before deleting the demo namespace. | `@claim:demo-deletion` now edits, exits through Privacy, Cart, wordmark, Back, hard navigation, and Start for real; clean claims; live suite. |
| F-6-2 | Removed the redundant demo workspace heading while retaining the intro, moving readable recipe and cart fields into the desktop first viewport. | `desktop demo keeps readable sample values beside the source recipes`; desktop fields y=616–693; [`live-demo-desktop-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-desktop-first-viewport.png); live `/?demo=1`. |
| F-6-3 | Expanded export to assert pantry plus override JSON, import to restore them in the UI, and free-core to print/share/export/import after the future clock. | `@claim:data-export`, `@claim:data-import`, and `@claim:free-core`; all three in clean claims and live suite. |
| F-6-4 | Replaced “correct amounts after every serving change” with bounded list wording and removed “at once.” | [copy audit](copy-audit.md); [`live-home-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-home-mobile-first-viewport.png); live `/`. |
| F-6-5 | Renamed the landing secondary action to `Open your cart` and corrected the README to say Start for real returns to the existing cart. | [README](../README.md); [copy audit](copy-audit.md); live `/` and `/?demo=1`. |
| F-6-6 | Replaced vague headings with `How Batch Cart builds the shopping list` and `How demo data is stored`. | [copy audit](copy-audit.md); live `/` and `/?demo=1`. |

## Final production evidence

- Factory verifier: both `/` and `/?demo=1` passed with no console errors, one h1, main landmark, language, alt, and button-label checks.
- Live suite: 50/50, including Playwright Axe scans, route metadata/404, keyboard/focus, privacy request logs, and offline reload.
- Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; report at [`live-lighthouse-mobile.json`](/work/.evidence/batch-cart-polish-6/live-lighthouse-mobile.json).
- Static deployment `bd6c208c-0b8a-4483-b390-c9b6ebceace8` is live at <https://batch-cart.sociobot.in>.
