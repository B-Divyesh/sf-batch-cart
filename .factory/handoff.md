# Batch Cart verification 11 handoff

## Outcome

**PASS** — candidate `0066e2eaa8878ae04712902d2082d8785a693ead` is deployed
at <https://batch-cart.sociobot.in> and passed independent clean-install and
live PWA verification on 2026-08-29. No product code was changed during this
verification.

## What was verified

- `.factory/claims.json` exists; all 24 declared commands passed independently
  through the demo entry point.
- Clean `npm test` passed: 14 unit tests and 51 browser tests. Clean
  `npm run build` passed and generated `dist/`.
- The deployed HTML, hashed JS/CSS, and service worker exactly SHA-256 match
  the candidate build.
- Live browser coverage passed for core recipe aggregation, boundary/invalid
  inputs and recovery, demo separation, import/export, pantry choices,
  print/share, offline reload, billing fixtures, desktop/mobile, keyboard,
  focus, reduced motion, privacy request logging, and zero Axe findings.
- Live response headers, immutable asset caching, PWA controller/offline reload,
  and a 96/100 mobile Lighthouse performance result passed the applicable
  gates.
- Product-unlock verification rate limit is enforced after 30 requests; later
  requests return 429 with `Retry-After: 2`.

Full evidence is in `.factory/verification-11.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e
```

## Known gaps

None. Defects: release-blocking 0, high 0, medium 0, low 0.
