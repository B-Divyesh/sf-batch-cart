# Independent verification — FAIL

Verified 2026-08-28 against candidate commit `85401729e6a7a09a522ed83ecb5ffd37eb00961d` and live URL <https://batch-cart.sociobot.in>.

## Decision

**FAIL — do not release this candidate.** The deployed site is healthy and byte-identical to the candidate, but it does not meet the product contract because malformed fraction input can silently produce an empty-quantity shopping-list item, advertised behavior lacks required claim tests, and the fresh mobile Lighthouse performance score is below the mandated 90.

## First read (cold live page)

The first screen says: “Combine recipes into one shopping list.” It says it is “For home cooks planning several dishes who want correct amounts after every serving change.” The first primary action is **Try it with sample data**, with the adjacent explanation “The demo opens three scaled recipes and their combined cart.” This plainly answers what it does, for whom, and what to click first. The one-click demo opened successfully.

## Required claim tests — PASS

Ran `npm ci` from the clean candidate, then every command in `.factory/claims.json` verbatim. All used `/demo` through the Playwright web server and each passed once.

| Claim ID | Result |
| --- | --- |
| `scaled-aggregation` | PASS |
| `pantry-exclusion` | PASS |
| `data-export` | PASS |
| `list-sharing` | PASS |
| `list-printing` | PASS |
| `demo-isolation` | PASS |
| `local-privacy` | PASS |
| `offline-reload` | PASS |
| `plus-snapshots` | PASS |
| `free-core` | PASS |
| `hosted-checkout` | PASS |

There is exactly one corresponding `@claim:` test for each listed ID.

## Local quality gates — PASS

- `npm ci`: completed; `npm audit --audit-level=high`: 0 vulnerabilities.
- `npm test`: 6 unit tests and 21 Chromium tests passed.
- `npm run build`: passed (`tsc --noEmit && vite build`) and produced `dist/`.
- No separate lint script is defined in `package.json`.
- Built initial application JavaScript: 28.21 kB raw / 9.89 kB gzip; CSS: 18.76 kB raw / 5.00 kB gzip. Both meet the static budget.

## Live deployment, privacy, PWA, accessibility — PASS

- Live `index.html`, `assets/index-5rZxVU0b.js`, `assets/index-ByodetCb.css`, and `sw.js` SHA-256 matched the freshly built candidate exactly.
- Cold desktop and 390 x 844 mobile checks loaded with no console or page errors; mobile overflow was 0 px.
- Live `/demo` has three realistic sample recipes, the persistent “Demo — sample data, nothing is saved” banner, Reset demo, and Start for real. Live IndexedDB contained only `demo:batch-cart` while in demo mode.
- A live controlled browser registered `https://batch-cart.sociobot.in/sw.js`, created cache `batch-cart-v3`, and reloaded `/demo` offline with HTTP 200, sample heading, and sample recipe visible. The service worker has versioned caches, `skipWaiting`, `clients.claim`, and an update toast path; no alternate live service-worker version was available to force an update transition.
- A live demo edit made six same-origin requests only; no third-party recipe-data request occurred. Source and CSP permit only the Sociobot billing origin for optional license verification. No sign-in is present.
- Live axe-core Playwright scans of `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` found 0 serious or critical violations. Keyboard tabbing reaches the skip link first and exposes a 3 px apricot focus ring; the repository test also verifies skip-link operation and route-heading focus. Reduced-motion CSS is present.
- Live headers include HSTS, CSP, `X-Content-Type-Options: nosniff`, Referrer-Policy, and Permissions-Policy. All same-origin application, legal, manifest, robots, sitemap, and 404 routes returned 200.
- Billing verification rate limit passed: 60 parallel invalid-token GETs returned 30 x 200 then 30 x 429, each 429 with `Retry-After: 2` or `3`. A follow-up burst after five seconds first hit 429 at request 6 because the previous bucket had not fully replenished. Observed initial burst capacity was 30 requests; exact steady-state window is not inferable from this shared production limiter.

`verify-url.sh` was not present in this repository, so its checks were covered by the live title/lang/main/alt/button/console examination and the axe/browser suite.

## Defects

### High — invalid fraction yields a silent unusable cart row

In live `/demo`, replacing the first recipe ingredients with `1/0 g salt` and blurring the field created a **salt** shopping-list row with an empty quantity input and no `[role=alert]`. It should be rejected like the neighboring invalid case `0 g salt`, which correctly reports “Use a quantity greater than zero.” Restoring `1 g salt` recovered and displayed `1.5`, proving the path is reproducible. The parser accepts `1/0` as `Infinity` (`parseNumber` in `src/ingredients.ts`), violating accurate calculation and invalid-input recovery.

### High — unlisted visitor claims (release-blocking under the claims contract)

The live landing page and README make claims without a matching entry in `.factory/claims.json` and an observable sandbox test. At minimum these are:

- “Uncertain conversions stay visible” / “Mixed units are marked for your review.”
- “Unit conversions use fixed published measures.”
- README claim that the cart “imports” data.
- “The free cart has no time limit.”

The existing aggregation, export, and free-core tests do not assert these outcomes. The claims policy requires each claim to be listed and tested, or removed.

### High — fresh live mobile Lighthouse performance is below the mandatory floor

Lighthouse 12.8.2 against the live URL (headless Chromium, mobile preset) measured: Performance **86**, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.7 s, CLS 0.012, TBT 520 ms. Performance is below the required >=90. The audit attributes the shortfall chiefly to total blocking time and reports responsive-image savings of about 54 kB.

### Medium — hashed deployment assets are not immutable-cached

The fingerprinted live JS and CSS both respond `Cache-Control: public, must-revalidate, max-age=30`, not a long-lived immutable policy. This misses the PWA performance/caching contract despite the service-worker cache functioning.

## Recommended release conditions

1. Reject non-finite fractions such as `1/0`, show the existing actionable error, and add regression coverage.
2. Add sandbox claim tests for every retained claim above, or remove the copy.
3. Address the live Lighthouse TBT/responsive-image finding and re-measure at >=90 performance.
4. Configure immutable caching for fingerprinted assets, then deploy and rerun this verification.
