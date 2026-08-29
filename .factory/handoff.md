# Batch Cart review 7 handoff

Work order: `batch-cart-review-7`
Reviewed candidate: `520d6873681bc9e8bc4a8b332748edc68fc1e2d1`
Live URL: <https://batch-cart.sociobot.in>

## Outcome

Review 7 is **FAIL** with one blocking documentation/claims finding: `F-7-1` in [review-7.md](review-7.md). The live footer says “Generated artwork,” but no `.factory/claims.json` entry or observable sandbox test covers that provenance assertion. No product code was changed.

## Verification performed

- Fresh remote clone, `npm ci`: 0 vulnerabilities.
- Ran each of the 24 exact commands declared by `.factory/claims.json` independently: all passed.
- `npm test`: passed (13 unit tests and 51 Chromium tests).
- `npm run build`: passed and produced `dist/index.html`.
- `git diff --check`: passed.
- Cold live browser checks at 390 × 844 and 1440 × 900: no console/page errors; the first screen identifies the job, audience, and sample action.
- Live `/?demo=1`: sample banner, Reset, Start for real, realistic populated data, mobile/desktop first-view content, and same-origin-only cold requests confirmed.
- Live route, metadata, focus/back behavior, 404, headers, internal links, footer/legal links, and prior review findings checked.

## Required next step

Remove `· Generated artwork` from the footer in `index.html` and `public/404.html`; retain provenance in `.factory/design.md`. Then rerun the claimed checks. No other gap was found.
