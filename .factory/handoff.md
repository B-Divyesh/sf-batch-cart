# Batch Cart verification 10 handoff

## Outcome: PASS

Candidate `34845b6463bf466161918eb82b811c8d75e8dffa` is accepted at
<https://batch-cart.sociobot.in>. The live HTML, service worker, and main
application JavaScript are byte-identical to this candidate's fresh build.
No product code was changed during verification.

## How verified

- Installed from the clean candidate with `npm ci`; all 24 declared claim tests
  were run individually before the broader suite and passed.
- `npm test` passed (13 unit + 51 browser tests); `npm run build` passed and
  produced `dist/`.
- Live-origin browser suite passed 51/51. Direct desktop/mobile demo checks
  confirmed aggregation, invalid-input recovery, privacy request boundaries,
  visible keyboard focus, reduced motion, service-worker control, and offline
  sample reload.
- Live Axe scans have zero violations; `verify-url.sh` passed home and demo with
  no console/page errors. Headers, CSP, immutable asset caching, PWA files,
  legal routes, 404, and hosted checkout were checked.
- Billing verification allows an observed burst of 30 invalid-token requests,
  then returns 429 with `Retry-After: 4`.
- Lighthouse mobile repeat: performance 99, accessibility 100, best practices
  100, SEO 100; LCP 1.45 s, TBT 120 ms, CLS 0.0011. Production JS/CSS are
  10.49 kB/5.34 kB gzip.

The complete evidence and the one low-performance outlier/repeat context are in
`.factory/verification-10.md`.

## Run

```sh
npm ci
npm test
npm run build
```

Try the isolated sample at <https://batch-cart.sociobot.in/?demo=1>.

## Known gaps

None. No release-blocking, high, medium, or low defects remain.
