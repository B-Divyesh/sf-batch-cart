# Independent verification 3 — FAIL

Verified on 2026-08-28 against candidate commit `758325559b60abea3c3d8b5032a63819af792684` and <https://batch-cart.sociobot.in>.

## Decision

**FAIL — do not release this candidate.** The deployed app matches the candidate, every declared claim test passes, the main cart works, checkout is available, offline use works, and the performance budget passes. Release is blocked because an invalid import is saved before validation and permanently blanks the app on reload, keyboard focus is invisible on the Import control, and visitor-facing privacy/behavior claims are absent from the mandatory claim registry.

## Mandatory first-read gate — PASS

I opened the live home page in a fresh Chromium context at 1440 × 900 before reviewing the implementation.

- **What it does:** “Combine recipes into one shopping list.”
- **For whom:** “For home cooks planning several dishes who want correct amounts after every serving change.”
- **What to click first:** **Try it with sample data**.
- The adjacent copy says the demo opens three scaled recipes and their combined cart.

The one-click action opened `/demo` with three realistic recipes and the persistent “Demo — sample data, nothing is saved” banner. At 390 × 844, the same headline, audience sentence, and primary sample-data action are visible without horizontal scrolling.

## Mandatory claim tests — PASS

`.factory/claims.json` exists. From the initially clean checkout, I ran `npm ci` and then every listed `test` command separately before the rest of the repository suite. All 15 exited 0:

| Claim | Result |
| --- | --- |
| `scaled-aggregation` | PASS |
| `uncertain-conversions` | PASS |
| `fixed-measures` | PASS |
| `pantry-exclusion` | PASS |
| `data-export` | PASS |
| `data-import` | PASS |
| `list-sharing` | PASS |
| `list-printing` | PASS |
| `demo-isolation` | PASS |
| `local-privacy` | PASS |
| `no-recipe-scraping` | PASS |
| `offline-reload` | PASS |
| `plus-snapshots` | PASS |
| `free-core` | PASS |
| `hosted-checkout` | PASS |

A source cross-check found 15 registry IDs and exactly 15 unique `@claim:<id>` tags, with no missing or extra tag.

## Release-blocking defects

### High — a structurally invalid import is persisted and bricks the app

On a fresh live `/demo`, I selected a syntactically valid JSON file containing:

```json
{"version":1,"recipes":[null],"pantry":[],"overrides":{},"snapshots":[]}
```

The current screen remained visible and the screen-reader live region said the file was not a Batch Cart export. However, the invalid state had already been written to IndexedDB. Reloading `/demo` then produced:

- no `<main>`;
- no `<h1>`;
- an empty `#app`;
- page error `Cannot read properties of null (reading 'targetServings')`.

The same import path is used for real carts, so a malformed or incompatible file can persistently make the product unusable until site storage is manually cleared. In `src/main.ts`, `importData` only checks that `recipes` is an array, assigns it to `state`, and calls `persist()` before rendering. The catch does not restore the previous state or delete the corrupt stored value. This fails the required invalid-input and recovery behavior.

### High — keyboard focus is invisible on Import data

Using Tab only at 390 × 844, focus reached the file input behind **Import data** at tab stop 88. The focused input measured 26 × 44 px and had `opacity: 0`; its computed 3 px outline was therefore invisible. The visible label measured 102 × 44 px but had `outline: none`, even while `:focus-within` was true. The screenshot at `.factory/evidence/verification-3/import-focus-keyboard-mobile.png` shows no indication of the current focus.

This violates the non-negotiable visible-focus requirement. It is not detected by axe because the control has an accessible name and remains in the tab order.

### High — visitor claims are missing from `.factory/claims.json`

The required cross-check found retained claims with no matching registry entry and no one-to-one `@claim:` sandbox test:

- README: “There are no analytics, trackers, third-party runtime scripts, or CDN fonts.”
- README: license verification happens “at most once per day.”
- `/privacy`: “License verification sends only your license token to `api.sociobot.in`.”
- `/privacy`: demo data “is deleted when you leave the demo.”

The existing `local-privacy` test starts recording after page load and only checks that one recipe edit sends no cross-origin request. The `demo-isolation` test confirms the real cart is empty, but does not assert database deletion. These are useful tests, but they do not register or prove the quoted claims as written. Under the claims acceptance contract, any unlisted visitor claim is release-blocking.

## Other defects

### Medium — out-of-range serving input is silently calculated

The serving controls declare `max="500"`. A value of `500` remained valid. A value of `501` had native `validity.valid === false`, but the change handler saved it and recalculated the cart anyway; the first tomato total became `63.1 kg`. No error was shown. Either the maximum is a real constraint and must be enforced/explained, or the misleading maximum should be removed.

### Medium — failed license restoration has no visible result

A fresh invalid token received HTTP 200 with `valid: false`. The screen-reader live region said “This license is not active. Check the token and try again,” but the visible status reverted to “The free cart has no time limit.” A sighted user receives no explanation. A network/JSON failure similarly leaves the visible text at “Checking this license…” while only the hidden live region changes.

### Medium — mobile keyboard focus order conflicts with visual order

At 390 px, CSS moves the shopping list above the recipes, while DOM/tab order keeps all recipe controls first. Keyboard focus moved from the third recipe around document position 4497 px back to the first cart control around 997 px. The demo skip link is also the third focusable item, after Reset demo and Start for real. This creates large, unexpected focus jumps.

### Medium — demo upgrade link is dead

The `/demo` workspace renders **See Plus** with `href="#plus"`, but the demo route does not render an element with `id="plus"`. Activating it only changes the fragment and does not reveal the paid tier or navigate to it.

### Medium — several mobile touch targets are below 44 px

At 390 px, the home wordmark is 38 px high and the footer links are about 22.3 px high. They have no larger wrapping hit area. This misses the 44 × 44 px touch-target baseline.

### Low — unknown routes are soft 404s

`/missing-page` renders the designed not-found UI but returns HTTP 200. `staticwebapp.config.json` has a navigation fallback and no 404 response override, so crawlers and clients cannot distinguish a missing route.

## End-to-end product exercise

The smallest useful flow otherwise worked on live production:

- Set one recipe from 4 to 8 servings with `1 kg potatoes`, `2 tbsp olive oil`, and `1/2 tsp salt`.
- Set another from 2 to 5 servings with `500 g potatoes`, `1 tbsp olive oil`, and `1 tsp salt`.
- The cart produced `3.25 kg potatoes`, `6.5 tbsp olive oil`, and `3.5 tsp salt`.
- Marking potatoes as pantry moved it to “In the pantry (1)” and survived reload.
- `0 g salt` and a line without a quantity produced actionable visible errors. Replacing them with `1/2 g salt` recovered and recalculated.
- The registered happy paths for JSON export/import, print, share, compatible and incompatible unit handling, fractional servings, saved plans, and the free core all passed locally and against production.

## Local quality gates and build

- Clean install: `npm ci` added 62 packages; `npm audit --audit-level=high` found 0 vulnerabilities.
- `npm test`: PASS — 8 Vitest unit tests and 30 Chromium tests.
- `npm run build`: PASS — exact command is `tsc --noEmit && vite build`; `dist/index.html` exists.
- No lint script or separate lint configuration exists.
- `git diff --check`: PASS.
- Initial JavaScript: 28,404 bytes raw / 9,933 bytes gzip (budget: 200 KB).
- CSS: 18,926 bytes raw / 5,040 bytes gzip (budget: 50 KB).
- Initially requested font files total about 71 KB (budget: 120 KB).
- Mobile hero: 25,058 bytes (budget: 300 KB).

## Candidate/deployment identity

The fresh build and live deployment are byte-identical for the release-defining files:

| File | SHA-256 |
| --- | --- |
| `index.html` | `e6f009f9dda7c1e8fa78f71c7c457098ff19c82aa8dcefa01bdf57ad2aa37c10` |
| `assets/index-ITbaktEz.js` | `55194ea9fa6af6459a0879271a3ad91fb520e4947ac4e0fd03f402cda34f62bf` |
| `assets/index-pbnEK7V4.css` | `df9dc789b5b9ca5df23ad1379c0fb4e7f69318224619e1f1ad93d39ccca9868b` |
| `sw.js` | `b2b82539107aa31e8d3cc518c43518c00a226a57736fc57a71b8369770d93ab3` |

`PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e` also passed all 30 tests.

## PWA, privacy, security, and response policy

- A fresh live context was controlled by `https://batch-cart.sociobot.in/sw.js` and cache `batch-cart-v5`.
- After editing a demo recipe, offline reload returned 200, retained the demo heading, and retained the edit. Restoring connectivity and choosing Start for real removed `demo:batch-cart`; only the empty `batch-cart` database remained.
- The service worker uses a versioned cache, `skipWaiting`, and `clients.claim`. The automated update-event test passed; no second live worker version existed to force a production update transition.
- A cold page load and a recipe-edit flow contacted only `https://batch-cart.sociobot.in`. No analytics or CDN runtime request was observed. There is no sign-in flow and no AI runtime.
- Live HTML includes HSTS, CSP, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, and a permissions policy. License verification allows the product origin and returns `Cache-Control: no-store`.
- Fingerprinted JS and CSS return `Cache-Control: public, max-age=31536000, immutable`.
- The Plus checkout returned HTTP 303 to a `https://checkout.dodopayments.com/session/...` destination.
- Rate-limit burst: 50 simultaneous invalid-license verification requests returned 30 × 200 and 20 × 429. Every 429 had `Retry-After: 4`. Because requests were concurrent, completion/index order is not a meaningful first-request threshold; observed burst capacity was 30 successes.

## Accessibility, mobile, and performance evidence

- `/opt/fleet/lib/verify-url.sh` passed the live page: HTTP 200, title, `lang="en"`, one `<h1>`, one `<main>`, complete image alt text, labeled buttons, and 0 console errors.
- Live axe Playwright scans of `/`, `/demo`, `/privacy`, `/terms`, and `/missing-page` found 0 serious or critical violations.
- Each route had one `<main>`, one `<h1>`, route-specific title, and no ordinary-load console/page errors. The custom malformed-import reload is the exception documented above.
- Desktop and 390 × 844 layouts had 0 px horizontal overflow. The 200% text-size repository check passed.
- Reduced-motion emulation produced `scroll-behavior: auto` and 0.01 ms transition/animation durations.
- Lighthouse 12.8.2 mobile, live: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.5 s, TBT 0 ms, CLS 0.003.
- Internal routes, manifest, robots, sitemap, and the Param Factory link returned 200. The exception is the dead in-page demo upgrade target described above.

Evidence generated during this run is under `.factory/evidence/verification-3/` (ignored by Git). Product code was not modified.

## Required release conditions

1. Fully validate imported schema and version before assigning or persisting state; reject safely, keep the prior state, and add a corrupt-shape plus reload regression.
2. Give the visible Import control a designed `:focus-within` indicator and add a keyboard focus regression.
3. Register and sandbox-test every retained claim, or remove/reword unlisted promises.
4. Resolve the out-of-range serving behavior, invalid-license feedback, mobile focus order, dead demo upgrade link, and undersized touch targets.
