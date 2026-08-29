# Batch Cart polish 6 handoff — PASS

Work order: `batch-cart-polish-6`
Repair commit: `036c7f97a0951683e51e78d8fc43e40f67e33db5`
Base reviewed: `6aa2291f8b05ad81794dbdab587e1130328c1d5c` / review `f3429e2e597d119af0407cd88740ad21004e8ebc`
Live URL: <https://batch-cart.sociobot.in>

## What changed

- Demo storage is now deleted before every same-site transition out of demo, on Back/Forward exits, and by a fresh non-demo load after a hard exit. The deletion waits for queued writes so an edit cannot recreate the namespace after deletion.
- The desktop demo keeps its product-specific intro but removes the redundant workspace heading. A named recipe and shopping-list inputs now appear in the first 1440 × 900 viewport; the phone cart-first view remains intact.
- `data-export`, `data-import`, and `free-core` now assert the complete visitor-facing claims, including pantry/override data and every named free action after a ten-year clock jump.
- First-screen and action copy now uses bounded, plain wording. Demo storage, README, the copy audit, catalog description, PWA release marker, and service-worker cache were updated together.

See [polish-6.md](polish-6.md) for the complete finding-by-finding mapping.

## Verification

- Clean remote clone: `/tmp/batch-cart-round6-clean-0rbch8/repo` at `036c7f97a0951683e51e78d8fc43e40f67e33db5`; `npm ci` completed with 0 vulnerabilities.
- Every exact command in [.factory/claims.json](claims.json) passed independently: 24/24. Full log: `/tmp/batch-cart-round6-clean-claims.log`.
- Clean clone quality gates: `npm test` passed 13 unit and 50 Chromium tests; `npm run build` produced `dist/index.html`; `git diff --check` passed.
- Workspace quality gates: `npm test` passed 13 unit and 50 Chromium tests; `npm run build` passed. The built application JavaScript is 31.04 kB raw / 10.48 kB gzip and CSS is 20.33 kB raw / 5.34 kB gzip.
- Live full suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot` passed 50/50. This includes Playwright Axe scans, offline reload, request privacy checks, metadata/routing/404 checks, keyboard/focus checks, and every claim path.
- Factory cold URL verifier passed `/` and `/?demo=1` with `lang=en`, one h1, one main, complete image alt text, labeled buttons, and no console or page errors. Evidence: `/work/.evidence/batch-cart-polish-6/verify-home/` and `/work/.evidence/batch-cart-polish-6/verify-demo/`.
- Cold live first-view check: at 1440 × 900 the first recipe input is y=641–693 and the first cart quantity/name inputs are y=616–660; at 390 × 844 the first two cart rows are y=521–755. Screenshots: [`live-demo-desktop-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-desktop-first-viewport.png), [`live-demo-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-mobile-first-viewport.png), and [`live-home-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-home-mobile-first-viewport.png).
- Live Lighthouse mobile: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1.63 s, CLS 0.004, TBT 75 ms, transfer 114.7 kB. Report: [`live-lighthouse-mobile.json`](/work/.evidence/batch-cart-polish-6/live-lighthouse-mobile.json).
- Deployment: Static Web App deployment `bd6c208c-0b8a-4483-b390-c9b6ebceace8` succeeded. Live `/`, `/demo`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` return 200; `/missing-page` returns 404. The live headers include CSP with response-header `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy, and `nosniff`.

## Known gaps

None. All findings in reviews 1–6, including minor items and reopened earlier items, have a matching implementation and passing local plus live evidence.
