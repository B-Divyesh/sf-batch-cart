# Batch Cart demo

- URL: `https://batch-cart.sociobot.in/?demo=1` (local: `http://localhost:5173/?demo=1`). `/demo` remains a supported shareable alias.
- Sample: Lemony tomato pasta, herb market salad, and garlic bread. Each has a different serving target. Shared tomatoes, olive oil, garlic, and parsley demonstrate aggregation and mixed units.
- Reset: use **Reset demo** in the persistent banner.
- Leave: use **Start for real** to discard the sample and return to your cart. Moving from demo to Cart, Privacy, Terms, or home also discards it. A fresh non-demo load clears any stale demo data left by a hard navigation.
- Storage: the demo uses the separate IndexedDB database `demo:batch-cart`. Real data uses `batch-cart`. The application never reads both within one mode.
- Offline check: visit `/?demo=1` once, wait for the service worker, switch the browser offline, and reload.
