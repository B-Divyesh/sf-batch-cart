# Batch Cart review 2 handoff

Work order: `batch-cart-review-2`
Role: reviewer
Reviewed candidate: `8dd2157bc23f4cfd5bbbd7f5738a60f01183e5c1`

## Result

`.factory/review-2.md` records an adversarial **FAIL** with 13 findings. Product code was not modified.

The live first-read questions, one-click sample flow, isolated demo storage, Reset, Start for real, preservation of pre-existing real data, offline reload, route behavior, metadata, links, visual identity, and live accessibility checks passed. Every one of the 20 registered claim commands passed independently from a clean clone.

Release remains blocked because the exact `npm test` gate is intermittent, and live/README statements remain outside the mandatory claims registry. The report also records below-fold first-screen support copy, an incomplete static-404 skeleton, and two copy issues.

## Verification performed

- Clean clone: `/tmp/batch-cart-review2-K99Syy`
- `npm ci`: passed with 0 vulnerabilities.
- Every exact `.factory/claims.json` command: 20/20 passed independently.
- `npm test`: failed with 11 unit tests passing and 43/44 browser tests passing. The mobile skip-link focus test failed again once across five serial repeats.
- `npm run build`: passed and produced `dist/index.html`.
- Build size: JS 30,000 bytes raw / 10.33 kB gzip; CSS 19,645 bytes raw / 5.19 kB gzip.
- Live `index.html`, JS, and CSS matched the clean build by SHA-256.
- Live Playwright checks covered cold 390px and desktop first reads, demo data/reset/isolation, offline reload, route metadata, history focus, link status, reduced motion, and five axe scans.
- `/opt/fleet/lib/verify-url.sh 'https://batch-cart.sociobot.in/?demo=1'`: passed after creating its evidence directory.
- `git diff --check`: passed.

## Files changed

- `.factory/review-2.md`: full verdict, findings, copy audit, claim evidence, history recheck, and perfection criteria.
- `.factory/handoff.md`: this review handoff.

## Product changes left to the repair round

Address F-2-1 through F-2-13 in `.factory/review-2.md`, then repeat the complete review. In particular, a single successful rerun is not sufficient evidence for F-2-1; the keyboard test must stop racing the asynchronous initial render.
