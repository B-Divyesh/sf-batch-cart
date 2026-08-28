# Batch Cart

Combine scaled recipes into one accurate shopping list.

Batch Cart is for households and event cooks planning several dishes at once. Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store.

Live product: <https://batch-cart.sociobot.in>

One-click demo: <https://batch-cart.sociobot.in/demo>

## What it does

- Scales each recipe from its original serving count.
- Combines compatible mass, volume, and count units with a fixed conversion table.
- Keeps incompatible units separate and marks them for review.
- Moves checked pantry items out of the shopping list.
- Prints, shares, imports, and exports the active cart.
- Works offline after the first connected visit.
- Stores recipes in local IndexedDB. Recipe data is not sent to a server.

The demo contains three dinner recipes in an isolated `demo:batch-cart` database. Use **Reset demo** to restore them. Use **Start for real** to discard the sample and open the separate real database.

## Free and Plus

The active cart, serving controls, pantry checks, print, share, import, and export stay free. Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events.

Payment uses the Sociobot hosted checkout. The application stores a returned license token in the browser and verifies it with the Sociobot billing API at most once per day. No product ID or payment-provider secret is stored in this repository.

## Develop

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open <http://localhost:5173>. The demo is at <http://localhost:5173/demo>.

## Test and build

```sh
npm test
npm run build
```

`npm test` runs parser unit tests and Chromium browser tests. Browser tests cover every claim in [.factory/claims.json](.factory/claims.json), offline reload, demo isolation, mobile layout, and serious accessibility findings.

The exact production build command is `npm run build`. It writes the static site to `dist/`, with `dist/index.html` at the deploy root.

Run one claim by its ID:

```sh
npm run test:e2e -- --grep @claim:offline-reload
```

## Privacy and data ownership

Real data uses the `batch-cart` IndexedDB database. Demo data uses `demo:batch-cart`. Export JSON from the cart before clearing browser storage or moving devices. See `/privacy` and `/terms` in the app.

There are no analytics, trackers, third-party runtime scripts, or CDN fonts. The generated hero art and self-hosted font files ship with the static build.

## Deploy

Deploy the contents of `dist/` to a static host. `staticwebapp.config.json` supplies history fallback, content types, and security headers for Azure Static Web Apps. The factory manages DNS, billing registration, and production deployment.

## License

MIT. See [LICENSE](LICENSE).
