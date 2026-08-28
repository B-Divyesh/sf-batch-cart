# Adversarial first-read review 1 — FAIL

Reviewed 2026-08-28 against <https://batch-cart.sociobot.in> and commit `50f7ee8d6bdacd568aa5985b83c25f7b3790290a`.

## Verdict

**FAIL.** The cart works and the declared claims pass, but the mobile demo fails the required first-screen demo gate. There are also unregistered README claims, incomplete route metadata, a wide-layout regression, and copy issues. `PASS` requires zero findings.

## First read

Fresh Chromium contexts loaded the live home page at 390 × 844 and 1440 × 900 before scrolling.

| Question | Cold-read answer | Evidence |
| --- | --- | --- |
| What does it do? | It combines several recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks planning several dishes who need quantities to update when servings change. | “For home cooks planning several dishes who want correct amounts after every serving change.” |
| What should I click first? | **Try it with sample data**. | It is visible at 765–813px on the 390px viewport, with “The demo opens three scaled recipes and their combined cart.” |

This gate passes. There were no page or console errors on either cold load.

## Findings

### F-1-1 — BLOCKING — mobile demo does not show the product in use on its first screen

**Location/quote:** live `/demo` at 390 × 844. The screen shows “Plan dinner with sample recipes” and “Change a serving count and watch the shared ingredients combine.” The first actual product surface, `.cart-plane`, starts at **y=838px**; its rows are below the viewport. The first recipe card starts at y=2638px.

**Why this fails:** The one-click demo must show realistic sample data being used on the first screen. At phone size this is an intro, not a demonstration: no ingredient, quantity, recipe card, or editable control is visible. A visitor must scroll before seeing the promised value.

**Concrete fix:** On mobile, reduce/remove the separate demo intro and place the populated shopping list, with at least two visible ingredient totals, within the initial viewport. Retain the banner. Add a 390px regression that asserts a sample cart row is visible without scrolling.

### F-1-2 — MAJOR — wide workspace is vertically stacked instead of the documented two-column work surface

**Location/quote:** live `/demo` at 1440 × 900. The “Shopping list” plane begins at y=754px; the first recipe card begins at y=2569px. The design contract says, “At wide sizes, recipe panes and cart form an asymmetric 7/5 column workspace.”

**Why this misleads:** The calculated list and source recipes are separated by about 1,800px. A cook cannot compare serving changes with the result together despite the promise “Change any serving count. Matching units combine at once.”

**Concrete fix:** Keep both workspace columns on grid row 1 at wide breakpoints (for example, add `grid-row: 1` to the existing column rules). Add a desktop regression asserting the first recipe card and cart plane overlap vertically.

### F-1-3 — BLOCKING — README makes claims with no claims registry entry or tagged test

**Location/quote:** `README.md`:

- “The application stores a returned license token in the browser and verifies a stored license at most once per day.”
- “No product ID or payment-provider secret is stored in this repository.”
- “The generated hero art and self-hosted font files ship with the static build.”

**Why this fails:** The 19 registry entries cover daily verification, token-only transmission, and no third-party runtime requests, but none claims or tests returned-token browser storage, repository-secret absence, generated-art provenance, or self-hosted artifact presence. Existing tests cannot prove the quoted sentences as written.

**Concrete fix:** Add a registered `returned-license-storage` claim and sandbox test. Replace/remove the repository-secret assertion. Either register tests inspecting the built asset/font provenance or remove the build-composition sentence.

### F-1-4 — MEDIUM — route sharing metadata remains the home page’s metadata

**Location/quote:** live `/demo`, `/privacy`, and `/terms` have correct dynamic title, description, and canonical, but retain `og:title` = “Batch Cart — combine recipes into one shopping list” and `og:description` = “Scale several recipes and combine their ingredients into one clear shopping list.” The direct static `404.html` has no canonical, Open Graph, Twitter-card, or Apple-touch metadata.

**Why this matters:** Sharing `/privacy` or `/demo` describes the home page. The real 404 response misses the required route metadata baseline.

**Concrete fix:** Update Open Graph/Twitter values in `setMeta` for each SPA route; add canonical, OG, Twitter, and Apple-touch metadata to `public/404.html`; add a route-metadata test.

### F-1-5 — MINOR — copy audit flags jargon and an ambiguous action

**Location/quote:** “Recipe math for a full table”; “Build your batch cart”; “See Plus”; “Sociobot is the merchant of record”; README “Combines compatible mass, volume, and count units with a fixed conversion table.”

**Why this weakens a first read:** “Recipe math,” “batch cart,” “merchant of record,” and “fixed conversion table” add product/legal/technical language. “See Plus” does not name its result.

**Concrete fix:** Use “Scale recipes for a dinner or event,” “Add recipes and see one shopping list,” “View Plus plans,” “Sociobot handles payment and your receipt,” and “Adds amounts when their units can be converted.”

## Copy audit

Word counts treat a hyphenated term and `US$12` as one word. No sentence exceeds 22 words and no banned marketing adjective appears. Headings and controls are included because visitors and screen readers encounter them independently. Entries marked `flag` are F-1-5 unless marked F-1-3.

### Landing page

| Text | Words | Result |
| --- | ---: | --- |
| Batch Cart; Demo; Cart; Privacy | 2; 1; 1; 1 | pass |
| Recipe math for a full table | 6 | flag: jargon |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | pass |
| Try it with sample data; Start with an empty cart | 5; 5 | pass |
| The demo opens three scaled recipes and their combined cart. | 10 | pass |
| Works offline after your first visit; Recipes stay in this browser; Full cart free · Plus is US$12 once | 6; 5; 7 | pass |
| Many recipe panes. One clear cart. | 3; 3 | flag: “panes” jargon |
| Live calculation; Build your batch cart | 2; 4 | second is flag: product jargon |
| Change any serving count. Matching units combine at once. | 4; 5 | pass |
| Combined result; Shopping list; Combined ingredients will appear here. | 2; 2; 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list; Share list; Export data; Import data; Recipes; Add recipe | 2; 2; 2; 2; 1; 2 | pass |
| Your recipes will stack here; Add a recipe, then paste its ingredients one per line.; Add your first recipe | 5; 9; 4 | pass |
| Batch Cart Plus; Keep plans for repeat events; Save named copies of this cart and restore them later. | 3; 5; 10 | pass |
| See Plus | 2 | flag: ambiguous action |
| Three clear steps; How the list comes together | 3; 5 | pass |
| Paste each recipe; Enter one ingredient per line with its quantity. | 3; 8 | pass |
| Set every serving count; Batch Cart scales each recipe from its original yield. | 4; 8 | pass |
| Check one combined list; Matching weights and volumes merge.; Uncertain conversions stay visible. | 5; 5; 4 | pass |
| You stay in charge; A calculator, not a recipe service | 4; 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass |
| Your recipes stay in this browser. Export a copy whenever you want. | 5; 6 | pass |
| Unit conversions use fixed published measures. Mixed units are marked for your review. | 6; 7 | pass |
| Optional one-time license; Save repeat plans with Plus; US$12 once | 3; 5; 2 | pass |
| Keep named event plans and restore them for the next gathering. | 11 | pass |
| The full calculator, print, share, and export tools remain free. | 10 | pass |
| Buy Batch Cart Plus | 4 | pass |
| Sociobot is the merchant of record. | 6 | flag: legal jargon |
| Payment happens on its hosted checkout. Have a license? The free cart has no time limit. | 6; 3; 7 | pass |
| One list from every recipe. Privacy. Terms. Built by Param Factory. (opens in a new tab). v1.0.3 · Generated artwork | 5; 1; 1; 4; 5; 3 | pass |

### README

| Text | Words | Result |
| --- | ---: | --- |
| Batch Cart; Combine scaled recipes into one accurate shopping list. | 2; 7 | pass |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 18 | pass |
| Live product; One-click demo; What it does | 2; 2; 3 | pass |
| Scales each recipe from its original serving count. | 8 | pass |
| Combines compatible mass, volume, and count units with a fixed conversion table. | 12 | flag: technical jargon |
| Keeps incompatible units separate and marks them for review. | 9 | pass |
| Moves checked pantry items out of the shopping list. | 9 | pass |
| Prints, shares, imports, and exports the active cart. | 8 | pass |
| Works offline after the first connected visit. | 7 | pass |
| Stores recipes in local IndexedDB. Recipe data is not sent to a server. | 5; 8 | pass for technical documentation |
| The demo contains three dinner recipes in an isolated `demo:batch-cart` database. | 10 | flag: implementation jargon |
| Use Reset demo to restore them. | 6 | pass |
| Use Start for real to discard the sample and open the separate real database. | 14 | flag: implementation jargon |
| Free and Plus | 3 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass |
| Payment uses the Sociobot hosted checkout. | 6 | pass |
| The application stores a returned license token in the browser and verifies a stored license at most once per day. | 19 | flag: F-1-3 |
| No product ID or payment-provider secret is stored in this repository. | 11 | flag: F-1-3 |
| Develop; Requires Node.js 20 or newer. | 1; 6 | pass |
| Open localhost:5173. The demo is at localhost:5173/demo. | 2; 5 | pass |
| Test and build; npm test runs parser unit tests and Chromium browser tests. | 3; 9 | pass |
| Browser tests cover every claim in `.factory/claims.json`, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 15 | pass for technical documentation |
| The exact production build command is npm run build. | 9 | pass |
| It writes the static site to dist/, with dist/index.html at the deploy root. | 13 | flag: deployment jargon; use code only |
| Run one claim by its ID. | 7 | pass |
| Privacy and data ownership | 4 | pass |
| Real data uses the `batch-cart` IndexedDB database. Demo data uses `demo:batch-cart`. | 7; 4 | flag: implementation jargon |
| Export JSON from the cart before clearing browser storage or moving devices. | 11 | pass |
| See /privacy and /terms in the app. | 7 | pass |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 11 | pass |
| The generated hero art and self-hosted font files ship with the static build. | 12 | flag: F-1-3 |
| Deploy; Deploy the contents of dist/ to a static host. | 1; 9 | pass |
| staticwebapp.config.json supplies history fallback, content types, and security headers for Azure Static Web Apps. | 12 | flag: implementation jargon |
| The factory manages DNS, billing registration, and production deployment. | 9 | flag: move to internal docs |
| License; MIT. See LICENSE. | 1; 1; 2 | pass |

## Demo, sandbox, and privacy checks

- Home → **Try it with sample data** opened `/demo` directly.
- The sample seeded Lemony tomato pasta, Herb market salad, Garlic bread, and 12 calculated rows.
- “Demo — sample data, nothing is saved,” **Reset demo**, and **Start for real** were persistent and usable.
- I edited “Only demo,” reset it to “Lemony tomato pasta,” then started for real. The app opened `/#workspace` with zero recipes; `demo:batch-cart` was absent and only the empty real `batch-cart` database remained.
- After service-worker control, offline `/demo` reload showed the sample heading and recipe. Recording a demo recipe edit observed no off-origin request.

The sandbox mechanics pass; F-1-1 is the first-screen presentation failure.

## Claims and quality gates

I cloned the repository to a fresh temporary directory, ran `npm ci`, then ran every exact `.factory/claims.json` command individually. All 19 passed: `scaled-aggregation`, `uncertain-conversions`, `fixed-measures`, `pantry-exclusion`, `data-export`, `data-import`, `list-sharing`, `list-printing`, `demo-isolation`, `demo-deletion`, `local-privacy`, `private-runtime`, `license-verification-daily`, `license-token-only`, `no-recipe-scraping`, `offline-reload`, `plus-snapshots`, `free-core`, and `hosted-checkout`.

The clean clone also passed `npm test` (11 unit and 41 Chromium tests), `npm run build` (producing `dist/index.html`), and `git diff --check`.

## Earlier findings and structural checks

No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists. I read the prior verification reports and handoff. Their import validation, visible Import focus ring, 1–500 serving validation, visible license errors, mobile focus order, demo Plus route, 44px target, real 404, and 19-claim repairs are confirmed in live source/behavior.

`/`, `/demo`, `/privacy`, and `/terms` have one `h1`, title, description, canonical after load, favicon, and back-navigation heading focus. The static unknown-route response is HTTP 404 with a way home, subject to F-1-4. Product/legal links returned 200; checkout returned HTTP 303 to Dodo; `mailto:` links were explicit. The dark aubergine/lime/apricot palette, clipped panes, hero art, and paper cart are distinct rather than a generic SaaS template. The deterministic cooking calculator does not imply an AI feature; import/export, pantry, share, print, offline, and snapshots are present. No provider key or decorative AI was found.

## What would make this perfect

Put populated demo data on the first mobile demo screen, restore the intended desktop input/result workspace, register or remove every remaining README claim, complete metadata on every route including the static 404, and replace the flagged technical/product language. Re-run the full clean-clone claims, mobile first-viewport, desktop layout, and route-metadata checks.
