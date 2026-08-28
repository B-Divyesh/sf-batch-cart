# Batch Cart

Combine scaled recipes into one shopping list.

Batch Cart is for households and event cooks planning several dishes at once. Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store.

Live product: <https://batch-cart.sociobot.in>

One-click demo: <https://batch-cart.sociobot.in/?demo=1>

## What Batch Cart does

- Scales each recipe from its original serving count.
- Adds amounts when their units can be converted.
- Keeps incompatible units separate and marks them for review.
- Moves checked pantry items out of the shopping list.
- Prints, shares, imports, and exports the active cart.
- Works offline after the first connected visit.
- Keeps recipe data in this browser. It is not sent to a server.

The demo opens three recipes with a ready shopping list. Use **Reset demo** to restore them. Use **Start for real** to discard the sample and open an empty cart.

## Free cart and Batch Cart Plus

The active cart, serving controls, pantry checks, print, share, import, and export stay free. Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events.

Payment uses the Sociobot hosted checkout. Batch Cart stores a returned license in this browser and verifies a stored license at most once per day.

## Develop

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open <http://localhost:5173>. The demo is at <http://localhost:5173/?demo=1>.

## Test and build

```sh
npm test
npm run build
```

`npm test` runs parser unit tests and Chromium browser tests. Browser tests cover every claim in [.factory/claims.json](.factory/claims.json), offline reload, demo isolation, mobile layout, and serious accessibility findings.

`npm run build` writes the static site to `dist/`.

Run one claim by its ID:

```sh
npm run test:e2e -- --grep @claim:offline-reload
```

## Privacy and data ownership

The real cart and the sample cart are kept apart. Export JSON before clearing browser storage or moving devices. See `/privacy` and `/terms` in the app.

Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts.

## Deploy

Deploy the contents of `dist/` to a static host.

## License

MIT. See [LICENSE](LICENSE).
