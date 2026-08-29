# Batch Cart polish 7 handoff

Repair commit deployed: `4418f73fb406fa48937328c5bd30a0774dd52477`
Deployment: `5c155fd7-fd60-4d1e-97e5-fb8c76528583`
Live URL: <https://batch-cart.sociobot.in>

## Outcome

All findings from reviews 1–7 are closed. Round 7 removes the untestable footer statement `Generated artwork` from the app shell and static 404. Artwork provenance remains recorded in [design.md](design.md), where it belongs rather than in visitor-facing claim copy. The catalog sentence is now verb-first: “Combine scaled recipes into one shopping list.”

## Verification

- Fresh clone `/tmp/batch-cart-polish7-clean-uSlN1B` at `4418f73`: `npm ci` reported 0 vulnerabilities; every one of the 24 exact commands in [claims.json](claims.json) passed independently; then `npm test` passed 13 unit and 51 browser tests, `npm run build` created `dist/index.html`, and `git diff --check` passed. Full log: `/work/.evidence/batch-cart-polish-7/clean-clone-claims-and-suite.log`.
- Public-origin browser suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e -- --workers=1 --reporter=dot` passed 51/51. It includes Playwright Axe scans, claims, route metadata, focus/announcement, keyboard, privacy-request, offline, and responsive checks. Log: `/work/.evidence/batch-cart-polish-7/live-playwright-axe.log`.
- Cold live checks passed for `/` and `/?demo=1` with no console/page errors, one `<h1>`, `<main>`, `lang=en`, complete image alternatives, and labelled buttons. Evidence: `/work/.evidence/batch-cart-polish-7/verify-home/` and `/work/.evidence/batch-cart-polish-7/verify-demo/`.
- Cold manual layout recheck confirmed the 390 px home support copy ends at y=590.9, direct-demo rows occupy y=520.9–754.9, and desktop recipe/cart inputs are visible at y=616–693. Evidence: [live-cold-layout.json](/work/.evidence/batch-cart-polish-7/live-cold-layout.json), [home](/work/.evidence/batch-cart-polish-7/live-home-mobile-cold.png), [mobile demo](/work/.evidence/batch-cart-polish-7/live-demo-mobile-cold.png), and [desktop demo](/work/.evidence/batch-cart-polish-7/live-demo-desktop-cold.png).
- Live `/missing-page` returned HTTP 404 with route metadata, `Page not found`, the shared legal links, and no artwork claim. Evidence: [404 headers](/work/.evidence/batch-cart-polish-7/live-404.headers), [404 HTML](/work/.evidence/batch-cart-polish-7/live-404.html), and [404 screenshot](/work/.evidence/batch-cart-polish-7/live-404-cold.png).
- Mobile Lighthouse on the deployed home: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.4 s and CLS 0.001. Report: [live-lighthouse-mobile-retry.json](/work/.evidence/batch-cart-polish-7/live-lighthouse-mobile-retry.json).

## Run locally

```sh
npm ci
npm test
npm run build
```

Use `http://localhost:5173/?demo=1` for the isolated sample cart. The demo has its own IndexedDB namespace, an always-visible banner, Reset demo, and Start for real.

## Known gaps

None. The product remains a Vite + TypeScript, local-first offline PWA with the documented luminous-glass visual identity.
