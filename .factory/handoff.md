# Batch Cart independent verification 3 — FAIL

Work order: `batch-cart-verify-3`

Candidate: `758325559b60abea3c3d8b5032a63819af792684`

Live URL: <https://batch-cart.sociobot.in>

Verified: 2026-08-28

## Verdict

**FAIL — do not release.** Production is deployed and byte-identical to the candidate. All declared claims, the complete local/live browser suites, the exact production build, checkout, rate limiting, offline reload, axe, and performance gates pass. Three release blockers remain:

1. A structurally invalid JSON import is persisted before validation and leaves the app blank on every reload.
2. Keyboard focus on **Import data** is invisible because the focused file input is transparent and its visible label has no focus style.
3. README and `/privacy` retain visitor promises not represented by one-to-one entries and sandbox tests in `.factory/claims.json`.

See `.factory/verification-3.md` for reproduction steps, exact evidence, severity, hashes, and all passing checks.

## Verification summary

- All 15 commands in `.factory/claims.json`: PASS individually.
- `npm ci`: PASS; 62 packages installed.
- `npm audit --audit-level=high`: PASS; 0 vulnerabilities.
- `npm test`: PASS; 8 unit and 30 Chromium tests.
- `npm run build`: PASS; TypeScript check included; `dist/` produced.
- Live suite: `PLAYWRIGHT_BASE_URL=https://batch-cart.sociobot.in npm run test:e2e`: PASS; 30 tests.
- Live/candidate identity: matching SHA-256 for HTML, JS, CSS, and service worker.
- Live PWA: controlled by `sw.js`, cache `batch-cart-v5`; edited demo reloaded offline; demo database deleted on exit.
- Live checkout: HTTP 303 to Dodo hosted checkout.
- API rate limit: 50 concurrent invalid verifies yielded 30 × 200 and 20 × 429; every 429 included `Retry-After: 4`.
- Live axe: 0 serious/critical findings on home, demo, privacy, terms, and not-found UI.
- Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.5 s, TBT 0 ms, CLS 0.003.
- No lint script is present. No sign-in is present, so Entra tenant verification is not applicable.

## Additional defects

- Medium: serving input above declared maximum is invalid but still saved and calculated.
- Medium: invalid/offline license restoration gives no visible failure message.
- Medium: mobile keyboard order jumps from recipes below the cart back to the visually earlier cart.
- Medium: `/demo#plus` has no target.
- Medium: wordmark/footer touch targets are below 44 px.
- Low: unknown routes render a custom 404 with HTTP 200.

## How to reproduce the primary blocker

1. Open `/demo` in a fresh context.
2. Import `{"version":1,"recipes":[null],"pantry":[],"overrides":{},"snapshots":[]}` as a JSON file.
3. Reload.
4. Observe an empty `#app`, no `<main>` or `<h1>`, and `Cannot read properties of null (reading 'targetServings')`.

Product code was not modified. Verification artifacts are under the ignored `.factory/evidence/verification-3/` directory.
