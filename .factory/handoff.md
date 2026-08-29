# Batch Cart polish 4 handoff — PASS

Work order: `batch-cart-polish-4`

Completed: 2026-08-29

Release: <https://batch-cart.sociobot.in> (`v1.0.7`)

## Result

All findings from reviews 1–4 are resolved. The round-4 keyboard race is fixed structurally: the skip link and main landmark ship in `index.html` before JavaScript, remain mounted during IndexedDB loading, and the skip action focuses main. A rapid-edit save race found during acceptance was also fixed by ordering local writes and preserving the active recipe field across recalculation.

The aubergine glass-pane visual system, generated culinary artwork, deterministic unit calculation, static deployment class, separate demo database, and offline PWA behavior are unchanged.

## Changes

- Added a persistent pre-JavaScript application shell with the skip link, navigation, main landmark, footer, live region, and toast.
- Changed route rendering to replace main content without removing the focused shell.
- Made skip-link activation move focus into main.
- Serialized browser-database writes and preserved in-progress recipe input during recalculation renders.
- Reserved the loading work surface to prevent startup layout shift.
- Bumped the product to `v1.0.7`, the service-worker cache to `batch-cart-v10`, and the manifest start URL to `?v=7`.
- Updated the catalog description to: “Combine recipes into one shopping list for dinner or an event.”
- Added the static-shell regression and strengthened the skip-link test to assert destination focus.

Product repair commits: `04d077f`, `caeeb05`, `8c3b4df`.

The complete finding map is in `.factory/polish-4.md`.

## Verification

- Clean install: `npm ci` — passed; audit found 0 vulnerabilities.
- Claim registry: 24 unique entries and 24 unique matching tags.
- Every registry command run independently from a fresh clone — 24/24 passed.
- `npm test` — 13 unit tests and 49 Chromium tests passed.
- `npm run build` — passed; `dist/index.html` is at the deploy root.
- Build size: JS 30.52 kB raw / 10.36 kB gzip; CSS 20.35 kB raw / 5.35 kB gzip.
- Keyboard stress: 30 local immediate-load checks and 40 cold live checks passed; Tab focused the skip link and Enter focused main.
- Rapid-edit stress: the fixed-measures and skip-link cases passed 30/30 together with two workers.
- Public browser suite: 49/49 passed at the release URL.
- Factory URL checks passed on `/` and `/?demo=1` with no console errors.
- Live Lighthouse: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.4 s, CLS 0.001, TBT 40 ms, transfer 116 KiB.
- Live route checks: all product/legal/PWA routes returned 200; the designed missing route returned 404.
- Deployment identity: local and live SHA-256 matched for `index.html`, hashed JS, hashed CSS, `sw.js`, and `manifest.webmanifest`.

Evidence is under `/work/.evidence/batch-cart-polish-4/`. Key screenshots are in `screenshots/`; command logs include `acceptance-clean-claims.log`, `live-browser-suite.log`, and the Lighthouse JSON reports.

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh batch-cart dist
```

## Known gaps and next steps

None found. No finding or deferred product task remains.
