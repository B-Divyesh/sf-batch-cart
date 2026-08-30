# Independent verification 12 — Batch Cart

## Verdict

**PASS** — candidate `bdd681e5029e1da2a473333280e196a534668fb3` is deployed at
`https://batch-cart.sociobot.in` and meets the researched brief's smallest
useful product contract.

Verified 2026-08-30 from the clean checkout at `/work/repo`. This is fresh
evidence; it does not rely on the previous deployment report.

## First read

A cold, unauthenticated desktop visit returned HTTP 200 with the title
`Batch Cart — combine recipes into one shopping list`. The first screen says
"Combine recipes into one shopping list," says it is for home cooks planning
several dishes whose serving counts change, and offers **Try it with sample
data**. Its adjacent explanation says the action opens three recipes with a
ready shopping list. The one-click demo is therefore clear, complete, and
usable without setup.

## Required claims gate

`.factory/claims.json` exists and declares 25 claims. I ran every exact
`test` command separately after `npm ci`; all passed. The passing IDs were:

`scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
`pantry-exclusion`, `data-export`, `data-import`, `list-sharing`,
`list-printing`, `demo-isolation`, `demo-deletion`, `demo-seed-reset`,
`editable-totals`, `local-privacy`, `private-runtime`,
`license-verification-daily`, `license-token-only`, `license-revocation`,
`returned-license-storage`, `no-recipe-scraping`, `offline-reload`,
`plus-snapshots`, `free-core`, `local-data-deletion`, and `hosted-checkout`.

No claim test was missing or failing.

## Local quality gates

- `npm ci`: pass; 0 reported vulnerabilities.
- `npm test`: pass — 14 Vitest unit tests and 51 Playwright tests.
- Independent repeat: `npm run test:e2e -- --reporter=list`: **51 passed**
  in 1.6 minutes.
- `npm run build`: pass. `tsc --noEmit` passed and Vite produced `dist/`.
  There is no separate lint script in `package.json`.
- Production entry bundle: 31.11 kB raw / 10.49 kB gzip; CSS: 20.33 kB raw
  / 5.34 kB gzip. Both meet the static-product budgets.

## Product and deployment checks

- Representative live demo flow passed: three sample recipes appeared with a
  persistent demo banner; changing the first recipe from 6 to 8 servings
  changed cherry tomatoes from 1.2 kg to **1.45 kg** and announced
  "Cart recalculated." Pantry exclusion persisted through reload.
- Boundary/error recovery passed: `1/0 g salt` produced the visible recovery
  message "Use a quantity greater than zero"; replacing it with `1 g salt`
  restored a calculated 2 g row. The automated suite also covered fractional
  servings, out-of-range servings, malformed imports, incompatible units,
  print/share, import/export, snapshots, and demo deletion/isolation.
- Desktop and 390 px mobile passed. Mobile `innerWidth`, document scroll width,
  and body scroll width were all 390 px. The demo banner and sample workspace
  remained visible.
- Keyboard test passed: the first Tab target was the skip link with a visible
  `rgb(255, 179, 138) solid 3px` outline. The full suite additionally passed
  keyboard order, route focus/announcement, 44 px targets, and 200% text.
- Live axe scan reported **0 serious or critical** findings. The full local
  axe suite passed for home, demo, privacy, terms, and 404.
- Live demo request log contained no cross-origin request during editing; its
  full cold-load request log contained only the product origin (document,
  local JS/CSS/fonts, and local hero image). There were no page errors or
  console errors. This confirms the local-first privacy claims in the actual
  deployment.
- `prefers-reduced-motion: reduce` yielded 0.00001 s hero transition and
  animation values and `scroll-behavior: auto`.
- PWA passed: after service-worker readiness, a live demo reload while offline
  kept the "Plan dinner with sample recipes" page and visible Lemony tomato
  pasta sample; the page remained service-worker controlled. The explicit
  automated service-worker update test also passed and verifies the
  "An update is ready. Reload to use it." announcement.
- `/`, `/demo`, `/privacy`, and `/terms` returned 200; an unknown route
  returned a real 404. The hosted checkout returned 303 to a Dodo checkout.
- Security headers on live HTML include CSP with `frame-ancestors 'none'`,
  `X-Content-Type-Options: nosniff`, HSTS, strict referrer policy, and a
  restrictive Permissions-Policy. Fingerprinted JS/CSS use
  `public, max-age=31536000, immutable`; HTML and `sw.js` revalidate in 30 s.
- Deployment identity matches the candidate: SHA-256 values for live
  `assets/index-DoVcBCJj.js`, `assets/index-CZFeCdHm.css`, and `sw.js` match
  the freshly built `dist/` files exactly.

## Backend/unlock boundary

The PWA has no product backend. Its Sociobot license-verification endpoint
was checked from one client with 40 fresh invalid tokens: requests 1–30
returned 200 invalid verdicts; requests 31–40 returned **429** with
`Retry-After: 4`. Observed allowance: **30 requests per client**. No sign-in
is used or required.

## Defects by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: none.

## Evidence retained during verification

Transient browser evidence is available in this verifier container at
`/tmp/batch-cart-live-cold.json`, `/tmp/batch-cart-live-qa.json`,
`/tmp/batch-cart-live-assets.json`, and the two desktop/mobile screenshots.
