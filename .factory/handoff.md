# Batch Cart polish 3 handoff

Work order: `batch-cart-polish-3`

Role: repair

Release: `v1.0.6` at <https://batch-cart.sociobot.in>

Product repair: `1cc31fc`; final test hardening: `62d7982`

## Result

All findings from reviews 1–3 are closed. The only open product defect, F-3-1, now has a real polite SPA route announcement after focus moves to the new h1. Initial page loads do not announce a duplicate title.

The earlier first-screen, isolated demo, claims, metadata, routing, focus, 404, legal, mobile, copy, privacy, offline, and product-specific repairs remain intact. The aubergine glass-pane visual system and original generated art were preserved.

During final verification, production latency exposed two test timing assumptions. The converted-source test now waits for each visible recalculation, and the editable-total test waits for the IndexedDB transaction before reload. These are assertion hardening changes, not reduced coverage.

## What changed

- Added route-title announcements such as “Privacy — Batch Cart” after client-side links and browser Back/Forward navigation.
- Extended the route regression to assert silent initial load, h1 focus, forward announcement, and Back announcement.
- Hardened conversion and editable-total claim tests around their observable recalculation/persistence boundaries.
- Bumped the visible release to `v1.0.6`, manifest start version to 6, and service-worker cache to `batch-cart-v9`.
- Updated the 69-character verb-first catalog description: “Combine scaled recipes into one shopping list for dinner or an event.”
- Recorded all 19 cumulative finding mappings in `.factory/polish-3.md`.

## Exact verification

Definitive clean clone: `/tmp/batch-cart-polish3-acceptance-WOS4Wq/repo`, cloned from pushed commit `62d7982`.

- `npm ci`: passed; 0 vulnerabilities.
- Every exact `.factory/claims.json` command: 24/24 passed independently. Evidence: `/work/.evidence/batch-cart-polish-3/acceptance-clean-claims.log`.
- Claim parity: 24 registry IDs, 24 unique `@claim:` tags, no missing or extra tags.
- `npm test`: passed, 12 unit tests and 49 Chromium browser tests.
- `npm run build`: passed; `dist/index.html` exists.
- Build size: 30.54 KB JS (10.42 KB gzip) and 20.30 KB CSS (5.33 KB gzip).
- `git diff --check`: passed.
- Prior flaky keyboard test plus new route test: 10/10 serial repeats passed.
- Converted-source claim: 5/5 local and 3/3 live repeats passed after observable waits.
- Editable-total claim: 10/10 two-worker repeats passed after the persistence wait.

The browser suite covers all five routes with axe, keyboard/focus, 390 px layout, 200% text, metadata, demo isolation/reset/deletion, same-origin privacy, import/export, print/share, paid-license fixtures, service-worker update feedback, and offline reload.

## Deployment and live verification

- Built with the work-order command: `npm ci && npm test && npm run build`.
- Deployed `dist/` through `/opt/fleet/lib/deploy-static.sh batch-cart dist`.
- Azure deployment ID: `6cd1cc7e-739a-430c-9e9f-1cbafd724ee2`; production custom domain returned 200 after upload.
- The live JS and CSS SHA-256 hashes matched the release build.
- Final public-origin suite passed 49/49 with `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot`.
- `/opt/fleet/lib/verify-url.sh` passed cold for `/` and `/?demo=1`: correct titles, `lang=en`, one h1/main, complete image alt and button names, and no console/page errors.
- Cold mobile demo showed the first two real rows at y=520.9–754.9 in 390×844. Cold desktop demo kept recipe/cart tops within 62 px.
- Live navigation `/` → `/privacy` focused “Your recipes stay with you” and set the polite region to “Privacy — Batch Cart.”
- `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` returned 200. `/missing-page` returned the designed 404.
- Mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.1 s, CLS 0.021, total blocking time 0 ms.

Evidence and screenshots are under `/work/.evidence/batch-cart-polish-3/`. The full finding-by-finding index is `.factory/polish-3.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Run an individual claim with its exact command from `.factory/claims.json`, for example:

```sh
npm run test:e2e -- --grep @claim:offline-reload
```

## Known gaps and next steps

None. No review finding or acceptance failure remains.
