# Batch Cart polish 2

Repair target: `8dd2157bc23f4cfd5bbbd7f5738a60f01183e5c1`
Review sources: `.factory/review-1.md` and `.factory/review-2.md`
Repair: `2bd8707a`
Live evidence root: `/work/.evidence/batch-cart-polish-2/`

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved direct `?demo=1` sample mode and made two populated list rows visible without scrolling on a phone. | `the direct sample URL shows two calculated shopping-list rows without scrolling on mobile`; [demo mobile](/work/.evidence/batch-cart-polish-2/screenshots/demo-mobile.png); live `/?demo=1` rows at y=520.9–754.9. |
| F-1-2 | Kept recipe panes and the illuminated shopping-list plane in the same desktop grid row. | `desktop demo keeps the calculated list beside the source recipes`; [demo desktop](/work/.evidence/batch-cart-polish-2/screenshots/demo-desktop.png); live full suite passed. |
| F-1-3 | Registered returned-license storage; removed unsupported repository/build-composition statements. | `@claim:returned-license-storage`; all 24 clean-clone claim commands passed. |
| F-1-4 | Route changes update title, description, canonical, Open Graph, and Twitter values; static 404 includes the same metadata baseline. | `each route updates its sharing metadata`; live full suite passed. |
| F-1-5 | Replaced product/legal/technical jargon with the documented plain wording and refreshed the copy audit. | `.factory/copy-audit.md`; [home mobile](/work/.evidence/batch-cart-polish-2/screenshots/home-mobile.png). |
| F-2-1 | Waited for the rendered skip link/main before keyboard interaction and removed the stale-locator viewport assertion. | Keyboard and first-screen checks repeated three times serially: 6/6 pass; clean-clone `npm test` passed. |
| F-2-2 | Removed “accurate” from README, catalog, and manifest copy. | README and `manifest.webmanifest`; clean-clone build passed. |
| F-2-3 | Rewrote the demo promise and added a one-to-one `demo-seed-reset` claim/test that edits then resets all three named recipes. | `@claim:demo-seed-reset`; live demo screenshot and 24/24 clean-clone claims pass. |
| F-2-4 | Added `editable-totals` claim coverage for saved quantity, unit, and ingredient edits, including export. | `@claim:editable-totals`; 24/24 clean-clone claims pass. |
| F-2-5 | Removed unsupported receipt wording; remaining hosted-checkout wording is covered. | `@claim:hosted-checkout`; live home check passed. |
| F-2-6 | Added `license-revocation` fixture coverage for Plus removal while sample/free cart data remains usable. | `@claim:license-revocation`; 24/24 clean-clone claims pass. |
| F-2-7 | Removed unsupported checkout-terms/refund-process assertion. | `/terms` live route passed metadata, axe, and link checks. |
| F-2-8 | Extended the free-core claim and long-horizon test to exercise pantry checks. | `@claim:free-core`; 24/24 clean-clone claims pass. |
| F-2-9 | Added a confirmed Delete local data action and claim test that removes both cart databases, saved plan storage, and all license keys. | `@claim:local-data-deletion`; live `/privacy` passed axe and route checks. |
| F-2-10 | Reduced first-screen height/spacing while preserving the product artwork; explanation plus all three facts now fit at both reviewed viewports. | `the first screen includes the action explanation and all three facts`; [home mobile](/work/.evidence/batch-cart-polish-2/screenshots/home-mobile.png); measured bottom y=590.9 at 390 × 844. |
| F-2-11 | Static 404 now has the standard header navigation and full footer. | Static release unit test; [404](/work/.evidence/batch-cart-polish-2/screenshots/not-found.png); live `/missing-page` returned HTTP 404. |
| F-2-12 | Replaced “set unit measures” with “It converts units using fixed standard measures.” | `.factory/copy-audit.md`; live home check passed. |
| F-2-13 | Renamed README headings to “What Batch Cart does” and “Free cart and Batch Cart Plus.” | README; clean-clone checks passed. |

Final live verification: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot` passed all 49 tests. `/opt/fleet/lib/verify-url.sh` passed for the live demo, and Lighthouse recorded 100 performance / 98 accessibility.
