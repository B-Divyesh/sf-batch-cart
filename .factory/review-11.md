# Adversarial first-read review 11 — PASS

Reviewed 2026-08-30 against <https://batch-cart.sociobot.in> and clean
checkout `cf0a6d29b8cd01050e31d9d6a75cb926b1884884`.

## Verdict

**PASS.** There are zero findings. The cold first read, one-click sample
workspace, storage isolation, every registered claim, privacy/offline behavior,
copy, routes, metadata, accessibility, links, and previous repairs verify.

## Cold first read before scrolling

I opened `/` in separate new Chromium contexts at 390 × 844 and 1440 × 900.
There was no prior storage, interaction, or scrolling. Both returned 200, had
`scrollY = 0`, and produced no page or console errors.

| Question | Answer a new visitor can give | Exact first-screen evidence |
| --- | --- | --- |
| What does this do? | It combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks planning several dishes when serving counts change. | “For home cooks planning several dishes who need one list when serving counts change.” |
| What should I click first? | **Try it with sample data**. | The result-naming action is visible with “The demo opens three recipes with a ready shopping list.” |

The 390px primary action is y=407–457, its explanation ends at y=525, and the
three facts end at y=591 of an 844px viewport. The desktop action and facts are
also entirely above its 900px fold. The first-read gate passes.

## Copy audit

Counts use whitespace-separated words; hyphenated terms, URLs, prices, and
version strings each count as one word. This includes all visitor-facing
landing text in the initial empty-cart state, including headings, controls,
alternatives, labels, and the footer. No sentence is over 22 words. There is
no banned marketing wording, jargon needing product knowledge, inconsistent
term, empty slogan, or non-result-naming action.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Loading Batch Cart… | 3 | pass |
| Skip to main content | 4 | pass |
| Batch Cart | 2 | pass |
| Demo | 1 | pass |
| Cart | 1 | pass |
| Privacy | 1 | pass |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who need one list when serving counts change. | 14 | pass |
| Try it with sample data | 5 | pass — names the result |
| Open your cart | 3 | pass — names the result |
| The demo opens three recipes with a ready shopping list. | 10 | pass |
| Works offline after your first visit | 6 | pass |
| Recipes stay in this browser | 5 | pass |
| Full cart free · Plus is US$12 once | 8 | pass |
| Glass recipe sheets and ingredients converge into one illuminated tray. | 10 | pass — useful image alternative |
| Several recipes. | 2 | pass |
| One shopping list. | 3 | pass |
| Live calculation | 2 | pass |
| Add recipes and see one shopping list | 7 | pass |
| Change any serving count. | 4 | pass |
| Matching amounts combine. | 3 | pass |
| Combined result | 2 | pass |
| Shopping list 0 | 3 | pass — dynamic count |
| Combined ingredients will appear here. | 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list | 2 | pass — names the result |
| Share list | 2 | pass — names the result |
| Export data | 2 | pass — names the result |
| Import data | 2 | pass — names the result |
| Recipes 0 | 2 | pass — dynamic count |
| Add recipe | 2 | pass — names the result |
| Your recipes will stack here | 5 | pass |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass — names the result |
| Batch Cart Plus | 3 | pass |
| Keep plans for repeat events | 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass |
| View Plus plans | 3 | pass — names the result |
| Three steps | 2 | pass |
| How Batch Cart builds the shopping list | 7 | pass |
| Paste each recipe | 3 | pass |
| Enter one ingredient per line with its quantity. | 8 | pass |
| Set every serving count | 4 | pass |
| Batch Cart scales each recipe from its original yield. | 9 | pass |
| Check one combined list | 5 | pass |
| Matching weights and volumes merge. | 5 | pass |
| Uncertain conversions stay visible. | 4 | pass |
| Recipe and privacy limits | 4 | pass |
| A calculator, not a recipe service | 6 | pass — a concrete product boundary |
| Batch Cart does not scrape recipe sites. | 7 | pass |
| Your recipes stay in this browser. | 5 | pass |
| Export a copy whenever you want. | 6 | pass |
| It converts units using fixed standard measures. | 7 | pass |
| Mixed units are marked for your review. | 7 | pass |
| Optional one-time license | 3 | pass |
| Save repeat plans with Plus | 5 | pass |
| US$12 once | 2 | pass |
| Keep named event plans and restore them for the next gathering. | 11 | pass |
| The full calculator, print, share, and export tools remain free. | 10 | pass |
| Buy Batch Cart Plus | 4 | pass — names the result |
| Sociobot opens its hosted checkout. | 5 | pass |
| Have a license? | 3 | pass |
| License token | 2 | pass |
| Restore purchase | 2 | pass — names the result |
| The free cart has no time limit. | 7 | pass |
| One shopping list from your recipes. | 6 | pass |
| Terms | 1 | pass |
| Built by Param Factory | 4 | pass |
| (opens in a new tab) | 5 | pass |
| v1.0.14 | 1 | pass |

The populated workspace additionally says “Edit any total.” (3) and “Tick
items you already have.” (5); these map to `editable-totals` and
`pantry-exclusion`.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Batch Cart | 2 | pass |
| Combine scaled recipes into one shopping list. | 7 | pass |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set each recipe’s original and target servings, and use one combined shopping list at the store. | 18 | pass |
| Live product | 2 | pass |
| One-click demo | 2 | pass |
| What Batch Cart does | 4 | pass |
| Scales each recipe from its original serving count. | 8 | pass |
| Adds amounts when their units can be converted. | 8 | pass |
| Keeps incompatible units separate and marks them for review. | 9 | pass |
| Moves checked pantry items out of the shopping list. | 9 | pass |
| Prints, shares, imports, and exports the active cart. | 8 | pass |
| Works offline after the first connected visit. | 7 | pass |
| Keeps recipe data in this browser. | 6 | pass |
| It is not sent to a server. | 7 | pass |
| The demo opens three recipes with a ready shopping list. | 10 | pass |
| Use Reset demo to restore them. | 6 | pass |
| Use Start for real to discard the sample and return to your cart. | 13 | pass |
| Free cart and Batch Cart Plus | 6 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | pass |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass |
| Payment uses the Sociobot hosted checkout. | 6 | pass |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass |
| Develop | 1 | pass |
| Requires Node.js 20 or newer. | 5 | pass |
| Open http://localhost:5173. | 2 | pass |
| The demo is at http://localhost:5173/?demo=1. | 5 | pass |
| Test and build | 3 | pass |
| npm test runs parser unit tests and Chromium browser tests. | 10 | pass — verified |
| Browser tests cover every registered claim, mobile layout, and accessibility violations. | 11 | pass — verified |
| npm run build writes the static site to dist/. | 9 | pass — verified |
| Run one claim by its ID. | 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. | 10 | pass |
| Export JSON before clearing browser storage or moving devices. | 9 | pass |
| See /privacy and /terms in the app. | 7 | pass |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass |
| Deploy | 1 | pass |
| Deploy the contents of dist/ to a static host. | 9 | pass |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

Terminology is consistent: a source dish is a **recipe**; the calculated
purchase output is a **shopping list**; all working data is a **cart**; an
owned ingredient is a **pantry item**; and the paid saved copy is a **saved
plan**. This confirms F-10-1 is fixed.

## Demo, sandbox, privacy, and offline checks

- The visible home action opens `/?demo=1` in one click.
- Fresh 390px and desktop demo loads show the persistent “Demo — sample data,
  nothing is saved” banner, **Reset demo**, **Start for real**, the three
  named recipes, and a 12-row calculated shopping list. At 390px the first two
  full calculated rows are y=521–638 and y=638–755; on desktop the first two
  rows are y=606–723 and y=723–840, beside source recipes.
- In a fresh browser, the demo namespace is only `demo:batch-cart`. After an
  edit, Reset restores “Lemony tomato pasta”; Start for real opens an empty
  real cart and leaves only `batch-cart`. Eight repeated immediate and
  fully-rendered Reset attempts all restored the shipped recipe.
- Demo editing generated no off-origin request. A fresh service-worker context
  loaded the sample once, went offline, reloaded, and retained the demo h1 and
  three recipes.

The demo is useful on its first screen and its sandbox is separate from real
storage. No demo weakness remains.

## Claims

I cloned the public repository into
`/tmp/batch-cart-review11-4J3wZs/repo`, ran `npm ci`, and ran every exact
command from `.factory/claims.json` individually from that clone. All 24
passed. The clean clone also passed `npm test` (14 unit + 51 Chromium tests)
and `npm run build`, which produced `dist/index.html`.

| Claim ID | Result | Observable result checked |
| --- | --- | --- |
| `scaled-aggregation` | PASS | 1.2 kg → serving edit → 1.45 kg and both sources |
| `uncertain-conversions` | PASS | converted and incompatible source units stay visible |
| `fixed-measures` | PASS | cup plus tablespoon produces the fixed converted total |
| `pantry-exclusion` | PASS | check moves an item out of the purchase list and survives reload |
| `data-export` | PASS | JSON contains recipes, pantry choice, and override |
| `data-import` | PASS | fixture restores a recipe, pantry choice, and override |
| `list-sharing` | PASS | share payload contains calculated ingredient text |
| `list-printing` | PASS | print path opens |
| `demo-isolation` | PASS | demo edit is absent from real data |
| `demo-deletion` | PASS | all ordinary demo exits clear demo storage |
| `demo-seed-reset` | PASS | three recipes and ready list return on Reset |
| `editable-totals` | PASS | quantity, unit, and name persist and export |
| `local-privacy` | PASS | recipe edit sends no off-origin request |
| `private-runtime` | PASS | initial runtime has no analytics, tracker, third-party script, or CDN-font request |
| `license-verification-daily` | PASS | two loads on one day make one check |
| `license-token-only` | PASS | only the license token is sent, with no body |
| `license-revocation` | PASS | Plus disappears while the free cart remains usable |
| `returned-license-storage` | PASS | returned token is stored after URL cleanup |
| `no-recipe-scraping` | PASS | a recipe URL is local text and is not fetched |
| `offline-reload` | PASS | populated demo reloads offline after first visit |
| `plus-snapshots` | PASS | named plan saves and restores |
| `free-core` | PASS | named free controls work after a future clock change |
| `local-data-deletion` | PASS | both databases, plans, and license data are deleted |
| `hosted-checkout` | PASS | US$12, Sociobot 303, and Dodo destination verify |

The 24 registry IDs match 24 `@claim:` tags. Every visitor-facing product or
privacy claim on the landing page and README maps to the registry; the README
test/build statements are verified developer instructions, not product
promises. There is no unlisted product claim.

## Earlier findings

I read every earlier `review-*.md`, `polish-*.md`, and the handoff, then
checked each finding against the deployed app and current code. All are fixed:

| Earlier ID | Current confirmation |
| --- | --- |
| F-1-1 | Mobile demo shows banner, controls, and populated rows before scrolling. |
| F-1-2 | Desktop recipe sources and calculated rows share the first workspace view. |
| F-1-3 | Returned-license behavior is registered/tested; removed unsupported claims remain absent. |
| F-1-4 | Every route and static 404 has route-specific metadata. |
| F-1-5 | Prior jargon and ambiguous actions remain absent. |
| F-2-1 | The synchronous keyboard shell and stable clean-clone suite pass. |
| F-2-2 | “accurate” remains absent from visitor copy. |
| F-2-3 | The three-recipe seed and Reset have exact coverage. |
| F-2-4 | Edited totals survive reload and export. |
| F-2-5 | Unsupported receipt wording remains absent. |
| F-2-6 | Revocation removes Plus while preserving the free cart. |
| F-2-7 | Unsupported refund/third-party-terms claims remain absent. |
| F-2-8 | The future-clock free-core test exercises pantry checks. |
| F-2-9 | Confirmed data deletion removes both stores, plans, and license keys. |
| F-2-10 | Hero action explanation and facts fit both required first views. |
| F-2-11 | Static 404 has shared header/footer, metadata, and a return action. |
| F-2-12 | Fixed-standard-measure wording and exact conversion proof remain. |
| F-2-13 | README capability and paid-tier headings stand alone. |
| F-3-1 | Forward and Back focus the destination h1 and announce its title. |
| F-5-1 | Static and SPA not-found headings say “Page not found.” |
| F-5-2 | Limits section uses the factual “Recipe and privacy limits” label. |
| F-6-1 | Privacy, Cart, home, Back, hard exit, and Start for real clear the demo. |
| F-6-2 | Desktop first demo view has readable source and calculated values. |
| F-6-3 | Import/export/free behavior tests assert outcomes, not control presence. |
| F-6-4 | Earlier correctness and timing absolutes remain absent. |
| F-6-5 | “Open your cart” and Start-for-real wording describe the result. |
| F-6-6 | Shopping-list and demo-storage headings name their subjects. |
| F-7-1 | “Generated artwork” remains absent from visitor footers. |
| F-8-1 | Shopping list is a labelled section, not a nested complementary landmark. |
| F-9-1 | Aggregation test changes 6 to 8 and proves 1.2 kg → 1.45 kg. |
| F-9-2 | Both footers say “One shopping list from your recipes.” |
| F-9-3 | The label is factual “Three steps.” |
| F-10-1 | README now says “one combined shopping list,” not cart. |

## Structure, accessibility, links, and identity

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` return 200;
  `/missing-page` returns the designed HTTP 404. `robots.txt` and `sitemap.xml`
  return 200.
- Every route has one h1 and one main landmark; `lang=en`, description,
  canonical, Open Graph, Twitter metadata, favicon, and Apple-touch icon are
  present. Titles are route-specific: home uses “Batch Cart — combine recipes
  into one shopping list”; demo, legal, and not-found routes use the required
  route patterns.
- Privacy navigation focuses the Privacy h1 and announces “Privacy — Batch
  Cart.” Back focuses the home h1 and announces its title.
- The crawl found no dead internal or external link. Legal mail links are
  explicit. Hosted checkout returns 303 to Dodo.
- Headers contain CSP with `frame-ancestors 'none'`, nosniff, strict referrer
  policy, and permissions policy. The initial live demo request log contains
  only the product origin.
- The aubergine field, acid-lime output plane, clipped glass recipe panes,
  Fraunces/Atkinson pairing, and culinary-measurement art match the documented
  original visual direction and are distinct from a generic SaaS template.
- The deterministic recipe calculator does not imply an AI step. The obvious
  adjacent value—offline operation, import/export, pantry exclusion, print,
  share, and recurring-plan snapshots—is present. No decorative AI or provider
  key was found.

## What would make this perfect

Maintain the present quality bar: keep every new promise in the claims
registry, retain the instant sample workspace, and rerun the clean-clone suite
after deployment changes. No current product change is required.
