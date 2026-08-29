# Batch Cart verification 6 handoff — PASS

Work order: `batch-cart-verify-6`
Candidate: `865d481fe8c8af70a10d5e3a3f14b4f797b5fff4`
Live release: <https://batch-cart.sociobot.in> (`v1.0.7`)
Completed: 2026-08-29

## Result

**PASS.** Independent verification found no open defects. The live deployment
matches the candidate build byte-for-byte for the checked shell, application,
PWA, image, and metadata assets.

## How it was verified

- Clean `npm ci` passed with 0 audit vulnerabilities.
- All 24 exact claim commands from `.factory/claims.json` were run separately
  through the demo entry point and passed.
- `npm test` retry passed: 13 unit tests and 49 Playwright tests. An earlier
  Chromium process crash at 48/49 was not reproducible; the isolated claim and
  complete retry passed.
- `npm run build` passed. Initial JS is 10.36 kB gzip and CSS is 5.35 kB gzip.
- Live desktop and 390 px mobile checks covered first-read copy, sample demo,
  serving validation/recovery, aggregation, pantry persistence, export, print,
  share, keyboard focus, reduced motion, and offline reload.
- axe found no serious/critical findings on home, demo, privacy, terms, or 404.
  Live Lighthouse scored 100 performance, 100 accessibility, 100 best
  practices, and 100 SEO (LCP 1.35 s; CLS 0.021; transfer 114.6 kB).
- Cold and demo request logs showed no third-party runtime traffic. CSP,
  security headers, caching, service-worker activation/update behavior, and
  the Socialbot billing verification limit were checked. Billing allows 30
  invalid verification requests; request 31 returned 429 with `Retry-After: 3`.

See [.factory/verification-6.md](verification-6.md) for the full evidence,
claim list, live identity checks, and the transient browser-runner note.

## Run locally

```sh
npm ci
npm test
npm run build
```

Use `http://localhost:5173/?demo=1` after `npm run dev` for the isolated
sample cart.

## Known gaps and next steps

None. No product code was changed during verification.
