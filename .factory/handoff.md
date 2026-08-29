# Batch Cart review 9 handoff

## Outcome: FAIL

The live product and commit
`ef5da26f05ad3c5a871db0538551cb89d84af8d5` match byte-for-byte and work end
to end, but `.factory/review-9.md` records two blocking findings and one minor
copy finding. No product code was changed.

## What was done

- Audited the live home and demo cold at 390 × 844 and 1440 × 900.
- Read the brief, design, claims, README, all eight earlier reviews, all eight
  polish reports, and the prior handoff.
- Ran all 24 declared claim commands independently from a fresh clone; all
  exited zero.
- Ran the clean `npm test` (13 unit + 51 browser tests) and `npm run build`.
- Ran the complete suite against production (51/51), the factory URL verifier,
  link/metadata crawl, Axe checks, offline reload, request logging, Reset, demo
  deletion, and pre-existing-real-data isolation checks.

## Findings left

- F-9-1: the tagged aggregation test asserts seeded output but never changes a
  serving control.
- F-9-2: “One list from every recipe” is an unlisted absolute footer claim.
- F-9-3: “Three clear steps” uses subjective marketing copy.

## Verify

```sh
npm ci
npm test
npm run build
```

After repair, also run each command in `.factory/claims.json` separately and
repeat the production-origin suite with
`PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npx playwright test --workers=1`.
