# Batch Cart polish 5 handoff — PASS

Work order: `batch-cart-polish-5`
Base candidate: `865d481fe8c8af70a10d5e3a3f14b4f797b5fff4`
Final product commit: `aa32dde7e39ccdb924372fff9e914726c57cfb0e`
Live release: <https://batch-cart.sociobot.in> (`v1.0.10`)
Deployed: 2026-08-29, Azure Static Web Apps deployment `2cc3fb6b-fec1-4f75-b318-93fda7ab312f`

## Result

**PASS.** All findings in review rounds 1–5 are resolved and rechecked. The final repair replaces metaphor/generic copy, keeps the real isolated demo and routing behavior intact, removes startup layout shift, and prevents a stale license check from overwriting the local-data deletion confirmation.

## What changed

- Replaced both 404 paths with the plain heading **Page not found** and removed the cart/pane metaphor.
- Replaced the generic privacy-section label with **Recipe and privacy limits**.
- Added direct browser/static regressions for the plain 404 wording.
- Kept first-screen sample demo, demo isolation/reset, claim registry, route metadata/focus/announcement, legal links, mobile workspace, offline PWA behavior, and product-specific glass-kitchen visual identity intact.
- Delayed the first application render until local state is ready, while retaining the synchronously rendered skip link and main landmark. This eliminates the empty-cart-to-sample layout shift.
- Made license verification cancellable by generation; deleting local data invalidates an in-flight check. `@claim:local-data-deletion` now exercises the delayed-response race.
- Bumped the PWA release marker to `v1.0.10` (`/?v=10`, `batch-cart-v13`) so installed clients receive the repaired shell.

## Verification

- Fresh final clone: `/tmp/batch-cart-polish5-final-clean-6ZOju4/repo` at `aa32dde`; `npm ci` passed with zero vulnerabilities.
- Every exact command in `.factory/claims.json` passed independently, 24/24. Log: `/tmp/batch-cart-polish5-final-clean-claims.log`.
- Fresh clone `npm test`: **13 unit + 50 Chromium tests passed**.
- Fresh clone `npm run build`: passed with `dist/index.html` at the deploy root. Final JS is 30.63 kB raw / 10.38 kB gzip; CSS is 20.35 kB raw / 5.35 kB gzip.
- Final public-origin suite: **50/50 passed** with `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1 --reporter=dot`, including axe serious/critical scans, offline reload, privacy request recording, claim flows, metadata, routing/focus, and mobile checks.
- `/opt/fleet/lib/verify-url.sh` passed for live `/` and `/?demo=1`: title, `lang=en`, one h1, main landmark, image alt coverage, button labels, and no console/page errors.
- Cold live checks: `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` returned 200. `/missing-page` returned the designed HTTP 404 with **Page not found** and its return link.
- Live mobile Lighthouse report: performance 98, accessibility 98, best practices 100, SEO 100; LCP 1.3 s, CLS 0.096, TBT 0 ms, 87 KiB transfer. The completed report is `/work/.evidence/batch-cart-polish-5/live-lighthouse-mobile-final.json`.

See [polish-5.md](polish-5.md) for the complete finding-ID → repair → evidence map, screenshots, and live URLs.

## Run and deploy

```sh
npm ci
npm test
npm run build
```

Deploy `dist/` as a static Azure Static Web App. The factory deployment utility was run successfully for this release.

## Known gaps

None.
