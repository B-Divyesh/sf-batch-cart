# Batch Cart demo

- URL: `https://batch-cart.sociobot.in/demo` (local: `http://localhost:5173/demo`)
- Sample: Lemony tomato pasta, herb market salad, and garlic bread. Each has a different serving target. Shared tomatoes, olive oil, garlic, and parsley demonstrate aggregation and mixed units.
- Reset: use **Reset demo** in the persistent banner.
- Leave: use **Start for real**. Demo data is discarded and the real cart opens.
- Storage: the demo uses the separate IndexedDB database `demo:batch-cart`. Real data uses `batch-cart`. The application never reads both within one mode.
- Offline check: visit `/demo` once, wait for the service worker, switch the browser offline, and reload.
