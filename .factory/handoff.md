# Batch Cart polish 8 handoff

## Outcome

Round 8 is complete and deployed at <https://batch-cart.sociobot.in> as
`v1.0.13`. The remaining accessibility defect is fixed: the primary shopping
list is a labelled section instead of a nested complementary landmark. Axe now
must report zero violations on every public route.

The repair preserves the aubergine, lime, apricot, clipped-glass visual system,
the PWA/offline deployment class, the isolated one-click sample cart, and all
earlier functional repairs. The catalog sentence is now: “Combine recipes into
one shopping list as serving counts change.”

Product repair commit: `7332592ee0a45849dc6497e8776ddcafd8f79760`

Static deployment: `81739424-17b1-4340-ba19-f280e64fca18`

## Verification evidence

- Fresh remote clone: all 24 exact `.factory/claims.json` commands passed
  separately. The same clone then passed 13 unit tests, 51 Chromium tests, and
  `npm run build`; `dist/index.html` exists. Evidence:
  `/work/.evidence/batch-cart-polish-8/clean-clone-claims-and-suite.log`.
- Work-order build command (`npm ci && npm test && npm run build`) passed before
  deployment. Evidence: `work-order-build.log` under the evidence root.
- Live public-origin Playwright run: 51/51 passed. It covers zero-violation Axe
  scans, keyboard/focus, route metadata, real 404, legal routes, mobile layout,
  request-origin privacy, demo isolation/deletion/reset, import/export, billing
  fixtures, and offline reload. Evidence: `live-playwright-axe.log`.
- Cold live DOM checks: home and demo return 200 with one h1 and one main; the
  shopping list reports `SECTION`; mobile home facts end at y=591/844; mobile
  demo has 12 rows with its first row at y=521–638; desktop source and result
  controls are visible together. Evidence: `live-cold-checks.json` and the
  `live-*-first-view.png` screenshots.
- Factory verifier passed live `/` and `/?demo=1` with correct title, `lang=en`,
  one h1, main landmark, alt text, button names, and no console/page errors.
  Evidence: `verify-home/` and `verify-demo/`.
- Live route/status crawl: all public routes and PWA files return 200; the
  designed missing page returns 404. Security headers include CSP,
  `frame-ancestors 'none'`, nosniff, Referrer-Policy, and Permissions-Policy.
- Live Lighthouse mobile: 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO; LCP 1.4 s, CLS 0.001, TBT 40 ms. Evidence:
  `/work/.evidence/batch-cart-polish-8/live-lighthouse-mobile.json`.
- Production budgets: application JavaScript 31.12 kB raw / 10.49 kB gzip;
  CSS 20.33 kB raw / 5.34 kB gzip; mobile hero 25.06 kB.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Open <http://localhost:5173/?demo=1> during development. Run any registered
claim using its exact `test` command in `.factory/claims.json`.

## Known gaps and next steps

None. No review finding, test failure, claim gap, accessibility violation, or
known live-site defect remains.
