# Batch Cart independent verification 10

**Decision: PASS**

- Candidate commit: `34845b6463bf466161918eb82b811c8d75e8dffa`
- Live URL: <https://batch-cart.sociobot.in>
- Verified: 2026-08-29
- Scope: clean-checkout, deployed PWA, billing-edge, and accessibility QA. No product code was changed.

## Cold first read

A fresh live desktop context showed the headline “Combine recipes into one
shopping list,” followed by “For home cooks planning several dishes who need
one list when serving counts change.” The next primary action is **Try it with
sample data**, and its adjacent explanation says that it opens three recipes
with a ready shopping list. This plainly identifies the job, audience, and
first action. One click opens the isolated sample with the persistent “Demo —
sample data, nothing is saved” banner, Reset demo, Start for real, three named
recipes, and twelve calculated list rows.

## Required claim tests

`.factory/claims.json` exists. After `npm ci` (0 vulnerabilities), I invoked
every one of its 24 exact `test` commands independently, before other QA, using
the local Playwright demo entry point. All passed:

`scaled-aggregation`, `uncertain-conversions`, `fixed-measures`,
`pantry-exclusion`, `data-export`, `data-import`, `list-sharing`,
`list-printing`, `demo-isolation`, `demo-deletion`, `demo-seed-reset`,
`editable-totals`, `local-privacy`, `private-runtime`,
`license-verification-daily`, `license-token-only`, `license-revocation`,
`returned-license-storage`, `no-recipe-scraping`, `offline-reload`,
`plus-snapshots`, `free-core`, `local-data-deletion`, and `hosted-checkout`.

Each command was the declared `npm run test:e2e -- --grep @claim:<id>` form.
The later complete live suite independently reran these tagged behaviours.

## Local quality gates

- `npm test`: **PASS** — 13 Vitest unit tests and 51 Chromium tests.
- `npm run build`: **PASS** — TypeScript check and Vite build produced `dist/`.
- No lint script exists; the production build includes `tsc --noEmit`.
- First-load application JS: 31.12 kB raw / 10.49 kB gzip. CSS: 20.33 kB raw /
  5.34 kB gzip. Both are within the stated budgets.

## Deployed product evidence

- The fresh `dist/index.html`, `dist/sw.js`, and
  `dist/assets/index-CZSbTUwx.js` SHA-256 hashes exactly match the live origin.
  The candidate is what is deployed.
- `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e`:
  **PASS, 51/51**. The resulting `test-results/.last-run.json` says
  `{"status":"passed","failedTests":[]}`. Coverage includes normal and
  boundary serving changes, malformed fractions/import recovery, conversions,
  pantry persistence, editable totals, import/export, print/share, demo
  isolation/deletion/reset, license fixtures, route metadata, keyboard/mobile
  layout, privacy, and offline reload.
- Direct fresh demo observation: three recipes and 12 rows loaded; tomato total
  changed from `1.2` to `1.7` after changing a serving count to 10. The request
  log for the complete demo load and edit contained only
  `https://batch-cart.sociobot.in`; console and page-error logs were empty.
- `verify-url.sh` passed on live home and demo: HTTP 200, title, `lang=en`, one
  h1, main landmark, image alt coverage, named buttons, and no errors.
- Playwright Axe scans of `/`, `/demo`, `/privacy`, `/terms`, and the 404 route
  passed with zero violations (therefore zero serious/critical issues). The
  standalone Axe CLI could not locate a system Chrome in this container; the
  repository's `@axe-core/playwright` scan is the allowed equivalent and used
  the preinstalled Chromium successfully.
- Desktop and 390×844 mobile passed. Direct mobile evidence: 0 px horizontal
  overflow, skip link first in the Tab order, visible 3 px focus ring, and the
  first calculated row visible at y=521–638. In a reduced-motion context,
  button transition duration resolves to `0.01ms`.
- PWA: manifest, icons, offline page, service worker, robots, and sitemap return
  200. A fresh demo page obtained a service-worker controller; after
  `context.setOffline(true)`, reload still rendered “Plan dinner with sample
  recipes” and “Lemony tomato pasta.” The suite's service-worker update test
  passes, and the deployed client announces “An update is ready. Reload to use
  it.”
- Security/privacy headers include HSTS, CSP with `default-src 'self'` and only
  `https://api.sociobot.in` in `connect-src`, `X-Content-Type-Options: nosniff`,
  Referrer-Policy, and Permissions-Policy. Hashed JS/CSS and the compact mobile
  hero are cached for one year with `immutable`.
- Optional purchase flow: checkout returned HTTP 303 to a Dodo hosted-checkout
  URL. No sign-in is implemented or required.
- Product-unlock rate limit: a single-client burst of 40 invalid-token verify
  requests received **30 × 200** and then **10 × 429**, every 429 carrying
  `Retry-After: 4`. Observed burst allowance is 30 requests.

## Performance

Fresh Lighthouse mobile repeat: **99 performance, 100 accessibility, 100 best
practices, 100 SEO**; LCP 1.45 s, TBT 120 ms, CLS 0.0011. One preceding run on
the same container was an outlier (82 performance, 713.5 ms TBT, while LCP and
CLS still passed); its main-thread report was dominated by unattributable
style/layout work. The repeat passes the ≥90 gate and the shipped asset budgets
and response caching are compliant.

## Defects by severity

None found: release-blocking 0, high 0, medium 0, low 0.

