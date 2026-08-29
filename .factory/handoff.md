# Batch Cart review 8 handoff

## Review outcome: FAIL

No product code was changed. The reviewer added `.factory/review-8.md` and
updated this handoff only.

The live product is clear on first read, its one-click sample sandbox works,
and all declared claim and quality commands pass. One minor accessibility issue
remains: the primary shopping-list work surface is an `aside` nested in `main`,
which Axe reports as `landmark-complementary-is-top-level` on home and demo.

## Verification performed

- Fresh production contexts at 390 × 844 and 1440 × 900: clear task/audience/
  action, no normal-load console or page errors.
- Direct `/?demo=1`: realistic populated cart in the first phone view; banner,
  Reset demo, Start for real, and isolated `demo:batch-cart` behavior checked.
- A clean clone at `/tmp/batch-cart-review-8-xMaFKf/repo`: all 24 exact
  `.factory/claims.json` commands passed independently; `npm test` passed
  13 unit and 51 browser tests; `npm run build` produced `dist/`.
- Live routes, metadata, 404, headers, links, deep navigation/Back focus,
  request origins, and separate Axe scans were checked.

## How to verify

```sh
npm ci
npm test
npm run build
```

Open `http://localhost:5173/?demo=1` for the isolated sample cart. Run an Axe
scan on `/` and `/?demo=1` to reproduce the remaining landmark violation.

## Known gap / next step

Replace the nested `aside.cart-plane` in `src/main.ts` with a labelled `section`
(including its closing tag), then add an Axe regression requiring zero
violations on home and demo. Re-run the commands above and the 24 claim commands.
