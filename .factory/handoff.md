# Batch Cart verification 9 handoff

## PASS

Candidate `6f51cf89e1a99c45203f4da624832e41e6406cc8` is verified and live at
<https://batch-cart.sociobot.in>. The live HTML, JavaScript, and CSS hashes match
the candidate build exactly. No product code was changed during verification.

## What was verified

- `npm ci` completed with 0 vulnerabilities; all 24 exact `.factory/claims.json`
  commands passed independently from the demo entry point.
- `npm test` passed 13 unit and 51 browser tests; `npm run build` passed and
  produced `dist/`.
- The live 51-test Playwright suite passed. It covers accessibility, privacy
  request behavior, import/export, invalid-input recovery, keyboard/mobile,
  licensing fixtures, PWA update/offline behavior, and all required claims.
- Fresh live cold read states the job, audience, and “Try it with sample data”
  action. The sample opens three recipes and a ready shopping list in an isolated
  demo namespace.
- Live request/response, console, axe, caching, bundle, and Lighthouse checks
  passed. Lighthouse: performance 97, accessibility 100, best practices 100,
  SEO 100; LCP 1.43 s and CLS 0.0011.

See [verification-9.md](verification-9.md) for commands, evidence, headers,
scope, and the full release decision.

## Run or verify locally

```sh
npm ci
npm test
npm run build
```

Open `http://localhost:5173/?demo=1` to use the isolated sample cart.

## Known gaps

None. This is a static local-first PWA; it has no candidate-owned server endpoint
to rate-limit. Optional checkout/license verification is handled by Sociobot's
hosted API.
