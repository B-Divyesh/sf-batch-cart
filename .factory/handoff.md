# Batch Cart independent verification 8 — PASS

Verified candidate: `aadd43dff8eace67070f2887626be410b30afa2f`
Live URL: <https://batch-cart.sociobot.in>

**PASS.** The deployment is byte-identical to the candidate's fresh
production build. All 24 declared claim commands, `npm test` (13 unit + 51
browser tests), `npm run build`, and the 51-test live suite passed. No product
defects were found. See [verification-8.md](verification-8.md) for exact
evidence, privacy/network/header checks, PWA/offline verification, rate-limit
allowance, and the one non-product limitation (the fresh Lighthouse CLI could
not attach to Chromium in this container).

Run locally with `npm ci && npm test && npm run build`; open `/?demo=1` for
the isolated sample data. No product-code follow-up is required.

---

# Batch Cart polish 6 handoff — historical PASS

Work order: `batch-cart-polish-6`
Repair commits: `036c7f97a0951683e51e78d8fc43e40f67e33db5`, `30b83c194cc0ae7ca003a094bb149af9b3ca16be`
Base reviewed: `6aa2291f8b05ad81794dbdab587e1130328c1d5c` / review `f3429e2e597d119af0407cd88740ad21004e8ebc`
Live URL: <https://batch-cart.sociobot.in>

## What changed

- Demo storage is now deleted before every same-site transition out of demo, on Back/Forward exits, and by a fresh non-demo load after a hard exit. The deletion waits for queued writes so an edit cannot recreate the namespace after deletion.
- The desktop demo keeps its product-specific intro while compacting the visual workspace label. A screen-reader-only h2 preserves the heading outline before shopping-list controls. A named recipe and shopping-list inputs appear in the first 1440 × 900 viewport; the phone cart-first view remains intact.
- `data-export`, `data-import`, and `free-core` now assert the complete visitor-facing claims, including pantry/override data and every named free action after a ten-year clock jump.
- First-screen and action copy now uses bounded, plain wording. Demo storage, README, the copy audit, catalog description, PWA release marker, and service-worker cache were updated together.

See [polish-6.md](polish-6.md) for the complete finding-by-finding mapping.

## Verification

- Clean remote clone: `/tmp/batch-cart-round6-final-clean-RC31GI/repo` at `30b83c194cc0ae7ca003a094bb149af9b3ca16be`; `npm ci` completed with 0 vulnerabilities.
- Every exact command in [.factory/claims.json](claims.json) passed independently: 24/24. Full log: `/tmp/batch-cart-round6-final-clean-claims.log`.
- Clean clone quality gates: `npm test` passed 13 unit and 51 Chromium tests; `npm run build` produced `dist/index.html`; `git diff --check` passed.
- Workspace quality gates: `npm test` passed 13 unit and 51 Chromium tests; `npm run build` passed. The built application JavaScript is 31.11 kB raw / 10.49 kB gzip and CSS is 20.33 kB raw / 5.34 kB gzip.
- Live full suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot` passed 51/51. This includes Playwright Axe scans, offline reload, request privacy checks, metadata/routing/404 checks, keyboard/focus checks, the demo heading outline, and every claim path.
- Factory cold URL verifier passed `/` and `/?demo=1` with `lang=en`, one h1, one main, complete image alt text, labeled buttons, and no console or page errors. Evidence: `/work/.evidence/batch-cart-polish-6/verify-home-v12/` and `/work/.evidence/batch-cart-polish-6/verify-demo-v12/`.
- Cold live first-view check: at 1440 × 900 the first recipe input is y=641–693 and the first cart quantity/name inputs are y=616–660; at 390 × 844 the first two cart rows are y=521–755. Screenshots: [`live-demo-desktop-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-desktop-first-viewport.png), [`live-demo-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-demo-mobile-first-viewport.png), and [`live-home-mobile-first-viewport.png`](/work/.evidence/batch-cart-polish-6/live-home-mobile-first-viewport.png).
- Live Lighthouse mobile: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1.56 s, CLS 0.004, TBT 47 ms, transfer 114.8 kB. Report: [`live-lighthouse-mobile-v12.json`](/work/.evidence/batch-cart-polish-6/live-lighthouse-mobile-v12.json).
- Deployment: Static Web App deployment `f598fed0-132f-49c0-bb53-1f870d868670` succeeded. Live `/`, `/demo`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` return 200; `/missing-page` returns 404. The live headers include CSP with response-header `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy, and `nosniff`.

## Known gaps

None. All findings in reviews 1–6, including minor items and reopened earlier items, have a matching implementation and passing local plus live evidence.
