# Batch Cart polish 9 handoff

## Outcome

Round 9 is repaired, deployed, and verified at <https://batch-cart.sociobot.in>.
No review finding remains open.

## What changed

- The `scaled-aggregation` claim test now performs the promised serving change: tomatoes move from `1.2 kg` to `1.45 kg` when the first Cook for value changes from 6 to 8. It also asserts both contributing recipe sources.
- Both footers now say “One shopping list from your recipes.”
- The landing section label now says “Three steps.” Initial sharing metadata no longer uses the same subjective adjective.
- The claim sandbox description, copy audit, catalog description, release version, manifest start URL, and service-worker cache version were updated.
- Added release regressions for the cumulative removed copy and the round-9 replacements.

## Exact verification

- Product commit: `9572ce4acf99c9206290f12aa91862d3bdb10b96`.
- Static deployment: `30139068-a2f8-4e87-a43c-e14385b6b830`.
- Clean clone: `/tmp/batch-cart-polish9-clean-fBQDi4/repo`.
- Clean `npm ci`: 0 vulnerabilities.
- Every exact command in `.factory/claims.json`: 24/24 passed independently.
- Clean `npm test`: 14 unit and 51 Chromium tests passed.
- Clean `npm run build`: passed; `dist/index.html` exists. Initial JS is 31.11 kB raw / 10.49 kB gzip; CSS is 20.33 kB raw / 5.34 kB gzip.
- Live Playwright/Axe: 51/51 passed, including zero Axe violations on home, demo, Privacy, Terms, and 404.
- Factory verifier: home and direct demo passed with no console/page errors, one h1, one main, `lang=en`, complete alt text, and labelled buttons.
- Live route check: `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, robots, sitemap, and manifest return 200; `/missing-page` returns the designed 404.
- Live cold demo: isolated `demo:batch-cart`; same-origin requests only; `1.2 kg → 1.45 kg` with both recipe sources; offline reload retains all three recipes.
- Deployed `index.html`, hashed JS, and hashed CSS match the local build by SHA-256.
- Lighthouse mobile: 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.2 s, CLS 0.001, TBT 0 ms, 114 KiB transfer.

Evidence is under `/work/.evidence/batch-cart-polish-9/`. The cumulative finding map is in `.factory/polish-9.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Run one registered claim with its exact command, for example:

```sh
npm run test:e2e -- --grep @claim:scaled-aggregation
```

## Known gaps

None.
