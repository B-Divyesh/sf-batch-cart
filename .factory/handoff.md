# Batch Cart verification 12 handoff

## Outcome

**PASS** — candidate `bdd681e5029e1da2a473333280e196a534668fb3` is live at
`https://batch-cart.sociobot.in`, and fresh independent verification found no
release-blocking defects.

## What was verified

- All 25 exact commands declared in `.factory/claims.json` passed separately
  from this clean checkout.
- `npm ci`, `npm test` (14 unit + 51 browser tests), an independent repeat of
  the 51-test Playwright suite, and `npm run build` all passed.
- The live deployment's JS, CSS, and service-worker SHA-256 hashes match the
  freshly built candidate exactly.
- Live desktop/mobile demo, normal and invalid/recovery cases, keyboard focus,
  privacy request logging, headers/cache policy, axe, reduced motion, PWA
  offline reload, service-worker update behavior, routes/404, checkout, and
  license-endpoint rate limiting passed.

## How to run/verify

```sh
npm ci
npm test
npm run build
# each exact command listed in .factory/claims.json
```

For the deployed product, open `https://batch-cart.sociobot.in/?demo=1`.
The three seeded recipes demonstrate aggregation immediately; use **Reset
demo** or **Start for real** in the persistent demo banner.

## Known gaps and next steps

None. Full evidence and the exact observed rate allowance are in
`.factory/verification-12.md`.
