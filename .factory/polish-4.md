# Batch Cart polish 4

Repair target: `f905004d23ad4f1d243844cce4bf566b97a6bed8`

Review source: `.factory/review-4.md` at `9f8070dd8df390ff2358772731b77f48a69dd9be`, plus every earlier review and polish record.

Product repairs: `04d077f`, `caeeb05`, and `8c3b4df`

Release: <https://batch-cart.sociobot.in> (`v1.0.7`)

Evidence root: `/work/.evidence/batch-cart-polish-4/`

| Finding | Change made or preserved | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved direct `/?demo=1` isolation, the persistent sample banner, Reset demo, Start for real, and a cart-first phone layout. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; `screenshots/live-demo-mobile.png`; live rows y=521–755 at 390×844. |
| F-1-2 | Preserved the 7/5 desktop workspace with recipe panes and shopping list in the same grid row. | `desktop demo keeps the calculated list beside the source recipes`; `screenshots/live-demo-desktop.png`; live column-top offset 62 px. |
| F-1-3 | Kept returned-license storage registered and tested; unsupported repository-secret and build-composition copy remains absent. | `@claim:returned-license-storage`; claim/tag parity 24/24; live browser suite 49/49. |
| F-1-4 | Preserved route-specific titles, descriptions, canonicals, Open Graph/Twitter fields, and complete static-404 metadata. | `each route updates its sharing metadata`; static-404 unit test; live `/missing-page` returned 404 with `Page not found — Batch Cart`; `screenshots/live-404.png`. |
| F-1-5 | Preserved the reviewed plain recipe, workspace, Plus, and payment wording. Updated the catalog line to a 62-character verb-first sentence. | `.factory/copy-audit.md`; `.factory/catalog-description.txt`; `screenshots/live-home-mobile.png`. |
| F-2-1 | Moved the skip link, header, main landmark, footer, live region, and toast into `index.html`, before the module script. Async data loads now replace only main content, so the skip link and main node never disappear. Activating the skip link focuses main. IndexedDB writes are ordered and the active recipe field survives recalculation renders. | `ships the keyboard shell before JavaScript starts`; `the skip link reaches the main content by keyboard`; 30 local stress passes and 40/40 cold live immediate-Tab/Enter passes; live suite 49/49. |
| F-2-2 | Kept the unbounded word “accurate” out of product, manifest, catalog, and README copy. | Source/copy audit; live first screen at `/`. |
| F-2-3 | Preserved the exact three-recipe seed and Reset demo behavior in one registered claim. | `@claim:demo-seed-reset`; live `/?demo=1`; `screenshots/live-demo-mobile.png`. |
| F-2-4 | Preserved editable quantity, unit, and ingredient-name overrides, including persistence and export. | `@claim:editable-totals`; clean claim run and live suite pass. |
| F-2-5 | Kept unsupported receipt wording removed and the bounded checkout statement. | `@claim:hosted-checkout`; live Plus link reaches the Sociobot checkout flow. |
| F-2-6 | Preserved revoked-license handling while keeping the free cart and its data available. | `@claim:license-revocation`; clean claim run and live suite pass. |
| F-2-7 | Kept unsupported third-party refund-policy wording removed; product-owned terms and support remain. | `/terms` route test, live title/metadata/axe checks, and `screenshots/live-terms.png`. |
| F-2-8 | Preserved pantry use in the no-time-limit free-core claim. | `@claim:free-core`; clean claim run and live suite pass. |
| F-2-9 | Preserved the confirmed Delete local data action for both databases, plans, and license keys. | `@claim:local-data-deletion`; live `/privacy`; `screenshots/live-privacy.png`. |
| F-2-10 | Preserved the compact product-specific hero. The explanation and all three facts remain in the first phone and desktop screen. | `the first screen includes the action explanation and all three facts`; live phone support bottom y=591 of 844; `screenshots/live-home-mobile.png`. |
| F-2-11 | Preserved the static 404’s shared header, full footer, return action, metadata, and real HTTP 404 response. | Static release unit test; live `/missing-page` = 404; `screenshots/live-404.png`. |
| F-2-12 | Kept “It converts units using fixed standard measures.” | `@claim:fixed-measures`; 15 repeated parallel passes after rapid-edit hardening. |
| F-2-13 | Kept the standalone README headings “What Batch Cart does” and “Free cart and Batch Cart Plus.” | README source audit and clean build. |
| F-3-1 | Preserved route h1 focus and polite title announcement while the shared shell remains mounted. | `client-side routes focus the heading and announce the opened page`; live `/` → `/privacy` focused “Your recipes stay with you” and announced `Privacy — Batch Cart`. |

## Acceptance evidence

- `.factory/claims.json` has 24 unique IDs and the browser sources have exactly 24 unique matching `@claim:` tags.
- Every exact claim command passed independently from a fresh clone. The full log is `acceptance-clean-claims.log`.
- `npm test` passed locally with 13 unit and 49 Chromium tests. The public-origin suite also passed 49/49 with one worker.
- `npm run build` produced `dist/index.html`. Initial application JavaScript is 30.52 kB raw / 10.36 kB gzip; CSS is 20.35 kB raw / 5.35 kB gzip.
- The factory URL verifier passed `/` and `/?demo=1`: one h1, `lang=en`, main landmark, complete alt text and button names, and no console errors.
- Live Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.4 s, CLS 0.001, TBT 40 ms, total transfer 116 KiB. Report: `lighthouse-live.json`.
- Live `index.html`, hashed JS/CSS, service worker, and manifest SHA-256 values matched the final local build.
- Cold live checks returned 200 for `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and the manifest; `/missing-page` returned 404.
- The live one-click demo used only the app origin, showed the isolated banner and three seeded recipes, and passed offline reload in the public browser suite.

No review finding remains open.
