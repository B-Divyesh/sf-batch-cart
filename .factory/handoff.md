# Batch Cart polish 2 handoff

Work order: `batch-cart-polish-2`
Role: repair
Repair commit: `2bd8707a` (`fix: complete polish review repairs`)
Deployed URL: <https://batch-cart.sociobot.in>

## Result

All findings in `.factory/review-1.md` and `.factory/review-2.md` are repaired. The released PWA keeps its dark aubergine, luminous-glass cooking workspace and remains a local-first static deployment. There are no known product gaps.

## What changed

- Made the sample path direct at `/?demo=1`, isolated it in `demo:batch-cart`, and retained the persistent demo banner, Reset demo, and Start for real controls.
- Put populated sample rows into the phone demo’s first view and restored the desktop two-column workspace.
- Made the first-screen action explanation and all three plain facts visible at 390 × 844 and 1440 × 900.
- Added six registry-backed claims: demo seed/reset, editable totals, license revocation, pantry checks in free core, and local-data deletion; the registry now has 24 one-to-one tagged browser tests.
- Added a confirmed in-product **Delete local data** action that removes both IndexedDB databases and all local license keys.
- Rewrote the flagged copy, removed unsupported purchase/refund wording, refreshed the catalog description and copy audit, and removed the unsupported “accurate” promise from README and the manifest.
- Completed the static 404’s shared header/footer and metadata; route titles, canonical URLs, Open Graph, and Twitter metadata remain route-specific.

## Verification

- Clean clone: `/tmp/batch-cart-polish2-rLZzPx`
  - `npm ci`: passed, 0 vulnerabilities.
  - Every exact command in `.factory/claims.json`: 24/24 passed individually from a clean clone.
  - `npm test`: passed (12 unit tests, 49 Chromium tests).
  - `npm run build`: passed; `dist/index.html` exists.
- Working tree: `npm test`, `npm run build`, and `git diff --check` passed. The formerly timing-sensitive mobile keyboard and first-screen checks passed three serial repeats (6/6).
- Build output: JavaScript 30.48 kB raw / 10.40 kB gzip; CSS 20.30 kB raw / 5.33 kB gzip; mobile hero 25.06 kB.
- Production deployment used `/opt/fleet/lib/deploy-static.sh batch-cart dist`.
- Cold live checks:
  - `/` and `/?demo=1`: HTTP 200; `/missing-page`: HTTP 404.
  - `/opt/fleet/lib/verify-url.sh 'https://batch-cart.sociobot.in/?demo=1' /work/.evidence/batch-cart-polish-2/verify-demo`: passed (title, `lang`, one `h1`, `main`, image alt text, named buttons, no page or console errors).
  - `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot`: passed (49/49), including project Playwright axe scans on `/`, `/demo`, `/privacy`, `/terms`, and the static 404.
  - Lighthouse on the cold demo: performance 100, accessibility 98, LCP 1.1 s, CLS 0.01. Report: `/work/.evidence/batch-cart-polish-2/lighthouse-demo`.
  - Screenshots and live measurements: `/work/.evidence/batch-cart-polish-2/screenshots/` and `/work/.evidence/batch-cart-polish-2/live-check.json`.

The standalone `@axe-core/cli` browser launcher was unavailable in this container; the project’s equivalent `@axe-core/playwright` integration ran successfully against the deployed pages.

## Run locally

```sh
npm ci
npm test
npm run build
npm run dev
```

Open `http://localhost:5173/?demo=1` for the one-click sample cart.
