# Independent verification 2 — FAIL

Verified on 2026-08-28 against candidate commit `df63de134f84a042b0062b04c5159a0ff73dea0a` and <https://batch-cart.sociobot.in>.

## Decision

**FAIL — do not release.** The deployed application matches this candidate and the free, local-first cart works, but its advertised paid checkout is broken: the required Sociobot checkout URL returns HTTP 404. The landing page also contains an unlisted visitor claim, which is release-blocking under the claims contract.

## Release-blocking defects

### High — the advertised Plus checkout is unavailable

The live **Buy Batch Cart Plus** link is exactly `https://api.sociobot.in/api/v1/products/batch-cart/checkout`, as required by the client test. A fresh direct `GET` returned **HTTP 404**, `content-type: application/json`, rather than a hosted-checkout redirect or page. This prevents the advertised US$12 one-time license from being bought. Register/configure the `batch-cart` billing product and verify that this URL redirects successfully before release.

### High — unlisted landing-page claim

The live landing page says, “Batch Cart does not scrape recipe sites or suggest nutrition advice.” Neither this statement nor an observable test for it appears in `.factory/claims.json`; its 14 claim tests cover aggregation, conversions, pantry, data transfer, sharing/printing, demo/privacy/offline, free core, snapshots, and checkout copy only. The claims policy requires this promise to be listed with one sandbox test, or removed. The existing local-privacy test is useful evidence of no outbound recipe-data request during its exercised flow, but is not a tagged test for this claim and does not test the nutrition assertion.

## First-read gate — PASS

Cold live desktop page, with no existing browser state:

- **What it does:** “Combine recipes into one shopping list.”
- **For whom:** “For home cooks planning several dishes who want correct amounts after every serving change.”
- **What to click first:** visible **Try it with sample data**, followed by “The demo opens three scaled recipes and their combined cart.”

The home page therefore answers all three in plain words and the one-click demo opens correctly.

## Required claims — PASS

From the clean checkout, after `npm ci`, I ran every `test` command in `.factory/claims.json` individually. Each ran through the Playwright `/demo` entry point and passed. A source cross-check found 14 listed IDs, 14 `@claim:` tags, exactly one tag per ID, and no extra tags.

| Claim IDs | Result |
| --- | --- |
| `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`, `pantry-exclusion` | PASS |
| `data-export`, `data-import`, `list-sharing`, `list-printing` | PASS |
| `demo-isolation`, `local-privacy`, `offline-reload` | PASS |
| `plus-snapshots`, `free-core`, `hosted-checkout` | PASS |

The checkout claim tests the displayed price and `href`; it does not follow that external URL, which is why the production 404 escaped it.

## Local gates — PASS

- `npm ci`: completed (62 packages); `npm audit --audit-level=high`: 0 vulnerabilities.
- `npm test`: passed — 8 Vitest unit tests and 27 Playwright tests. `test-results/.last-run.json` records `status: "passed"` and no failed tests.
- No separate lint script exists. `npm run build` passed (`tsc --noEmit && vite build`) and produced `dist/index.html`.
- Built initial app JS: 28.43 kB raw / 9.91 kB gzip; CSS: 18.93 kB raw / 5.05 kB gzip. Both are within budget. The selected 390px hero is 25,058 bytes.

## Product, privacy, and PWA exercise — PASS except checkout

- Live `/demo` opened three realistic recipes and one persistent “Demo — sample data, nothing is saved” banner. Its only IndexedDB database was `demo:batch-cart`; **Start for real** discarded sample recipes and opened an empty real cart.
- Normal cart aggregation, pantry exclusion, JSON import/export, share, print, fixed conversion, uncertain-unit review, snapshots, and free-core behavior passed their claim sandboxes.
- Invalid `1/0 g salt` showed the actionable alert “Use a quantity greater than zero.”, created no salt cart row, and recovered to `1.5` after correction with `1 g salt`. Inputs of `0` or negative servings were clamped to `1`, preventing non-finite cart results.
- A decimal serving value such as `2.5` is applied even though the integer-step input reports native `stepMismatch` validity. This is a **medium** usability/accessibility defect: either allow fractional servings (`step="any"`) or reject/announce them consistently.
- While editing live demo recipe data, all observed requests were same-origin `https://batch-cart.sociobot.in`; no analytics, third-party scripts, or CDN fonts were observed. The only configured cross-origin connection is the optional Sociobot license verification endpoint. There is no sign-in flow.
- A fresh controlled live browser installed `sw.js`, was controlled by cache `batch-cart-v4`, and reloaded `/demo` offline with HTTP 200, the sample heading, and Lemony tomato pasta visible. The deployed worker matches the candidate and contains versioned caching, `skipWaiting`, `clients.claim`, and the application’s update-available toast path. A second production worker version was not available to force an actual update transition.

## Live deployment and browser quality — PASS except checkout

- Freshly built candidate `index.html`, `assets/index-Bkkts9rB.js`, `assets/index-pbnEK7V4.css`, and `sw.js` SHA-256 hashes each matched the live files byte-for-byte.
- Cold desktop and 390 × 844 live pages had no console/page errors; mobile horizontal overflow was 0px. Reduced-motion media was active and reduced transition duration to `0.00001s`.
- Live axe Playwright scans of `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` found 0 serious or critical violations. Each route had `lang="en"`, exactly one `main`, exactly one `h1`, and correct titles. Keyboard Tab reaches the skip link first, with a visible `3px solid rgb(255, 179, 138)` focus ring.
- Mobile Lighthouse 12.8.2 (fresh live audit): Performance **97**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.8 s, LCP 2.3 s, TBT 0 ms, CLS 0.003.
- Live HTML has HSTS, CSP, `X-Content-Type-Options: nosniff`, strict-origin Referrer-Policy, and Permissions-Policy. Fingerprinted JS/CSS and the mobile hero return `Cache-Control: public, max-age=31536000, immutable`.
- Internal app, legal, manifest, robots, sitemap, and 404 routes returned 200. The only broken crawled link was the external checkout endpoint above.
- Billing verification rate limit: 40 concurrent invalid-license requests produced 30 × 200 and 10 × 429. 429 responses had `Retry-After: 4`; completion order makes an exact ordinal threshold non-deterministic, but observed initial capacity was 30 requests.

## Evidence retained locally

`.factory/verification-evidence/` contains the cold/live screenshots, live response headers, downloaded live files used for hash comparison, and Lighthouse JSON.

## Release conditions

1. Register or repair the Sociobot `batch-cart` checkout so its advertised URL redirects to the hosted checkout; rerun the link and purchase-flow check.
2. Add one `claims.json` entry and one `@claim:` sandbox test for the retained no-scraping/no-nutrition promise, or remove that copy.
3. Resolve the fractional-serving validity mismatch, then add a regression test for the chosen behavior.
