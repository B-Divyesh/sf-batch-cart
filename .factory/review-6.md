# Adversarial first-read review 6 — FAIL

Reviewed 2026-08-29 against <https://batch-cart.sociobot.in> and commit
`6aa2291f8b05ad81794dbdab587e1130328c1d5c`. The local production build's
`index.html`, JavaScript, CSS, and service worker byte-match the live files.

## Verdict

**FAIL.** The cold landing page is clear, the phone demo is populated, and all
24 registered commands exit successfully. However, a registered privacy claim
is false on an ordinary demo exit, the desktop demo does not show readable
sample data before scrolling, and several claim tests do not exercise all of
their claim text. There are also unlisted absolute/timing claims and smaller
copy defects. PASS requires zero findings and no untested claim.

## First read before scrolling

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900 with no stored
state. Both remained at `scrollY = 0`.

| Question | Cold-read answer | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | It combines recipes into one shopping list. | “Combine recipes into one shopping list” |
| For whom? | Home cooks planning several dishes and changing serving counts. | “For home cooks planning several dishes who want correct amounts after every serving change.” |
| What should I click first? | **Try it with sample data**. | The primary action and “The demo opens three recipes with a ready shopping list.” are visible without scrolling. |

The explanation and all three facts end above y=591 on the phone. The same
content is visible on desktop. There was one h1, one main landmark, no
horizontal overflow, and no console or page error. The mandatory landing-page
first-read gate passes, subject to the claim wording in F-6-4.

## Findings

### F-6-1 — BLOCKING — demo data survives ordinary exits despite the deletion claim

**Location/quote:** `/privacy` says, “Demo data is deleted when you leave the
demo.” `.factory/claims.json` repeats that as `demo-deletion`. The demo banner
says, “Demo — sample data, nothing is saved.”

**Live evidence:** In a fresh 390 × 844 context, I opened `/demo`, renamed the
first recipe to `Persisted through privacy`, and clicked the shared header's
**Privacy** link. The demo banner disappeared and `/privacy` opened, but
`indexedDB.databases()` still included `demo:batch-cart`. Returning to `/demo`
showed `Persisted through privacy`. The same code path is used by the wordmark
and browser Back. The header's **Cart** link performs a hard navigation and also
has no deletion hook.

**Code/test evidence:** `src/main.ts:327` calls `clearDemo()` only for
`start-real`. Normal data-link navigation at `src/main.ts:239-248` and
`popstate` at `src/main.ts:394` call `routeChanged()`, which switches databases
without deleting the demo. The tagged test at `tests/e2e/claims.spec.ts:124-129`
checks only **Start for real**, so it passes while the registered claim fails.

**Why this fails:** The visitor is explicitly told that leaving deletes the
sample. An ordinary, visible way to leave does not. This is both a sandbox
contract failure and a failing registered claim.

**Concrete fix:** Make every transition from demo to a non-demo route clear
`demo:batch-cart`, including Privacy, Cart, the wordmark, Back/Forward, and a
fresh non-demo load after a hard exit. Extend `@claim:demo-deletion` to edit the
sample, leave through each route mechanism, assert the database is absent, and
reopen `/demo` to confirm the edit is gone.

### F-6-2 — BLOCKING — desktop demo's first screen contains no readable sample value

**Location/quote:** The landing action promises, “The demo opens three recipes
with a ready shopping list.” After one click at 1440 × 900, the first viewport
shows “Recipes 3” and “Shopping list 12,” but no recipe name, ingredient, or
quantity.

**Measured evidence:** The cart begins at y=734. Its first sample row runs from
y=892 to y=1009, with the first quantity control beginning at y=902. The first
recipe card begins at y=796, but its name control begins at y=927. Thus only an
eight-pixel strip of the first cart row enters the 900px viewport and none of
the realistic data is readable. The 390 × 844 version passes with two full rows
visible at y=521–755.

**Why this fails:** Counts and empty-looking panel chrome do not demonstrate
the product with realistic sample data. The required first screen after the
one-click action must already show the sample being used.

**Concrete fix:** Reduce or combine the desktop demo intro/workspace headings,
or raise the populated workspace so at least one complete named recipe and one
ingredient total are readable at 1440 × 900. Add a desktop regression asserting
the first recipe-name control and first quantity/name row are fully inside the
initial viewport.

### F-6-3 — BLOCKING — three registered claims are only partially tested

**Location/quote:**

- `data-export`: “Exports recipes and cart choices as JSON.” The tagged test at
  `tests/e2e/claims.spec.ts:68-79` checks only `version` and recipe count; it
  never creates or asserts a pantry choice.
- `data-import`: “Imports recipes and cart choices from Batch Cart JSON.” The
  fixture at lines 86–92 supplies empty `pantry` and `overrides`, then checks
  only the imported recipe and total.
- `free-core`: “The active cart, serving controls, pantry checks, print, share,
  import, and export have no time limit without a license.” The tagged test at
  lines 287–302 never checks Import at all. It checks Print, Share, and Export
  only before advancing the clock ten years, not after.

**Why this fails:** Each command exits zero, but the asserted behavior is
narrower than the visitor-facing claim. A regression that drops pantry choices
from import/export, gates Import, or time-gates several controls would pass.
This leaves claim text untested.

**Concrete fix:** Export a non-empty pantry selection and override, then assert
both fields in the downloaded JSON. Import a fixture with non-empty pantry and
override state and verify the restored UI. In `free-core`, move the clock first
and then operate every named control, including an actual import, print/share
spies, and export download.

### F-6-4 — BLOCKING — the landing page adds unlisted absolute and timing claims

**Location/quote:** “For home cooks planning several dishes who want **correct
amounts after every serving change**.” “Matching amounts combine **at once**.”

**Why this fails:** `scaled-aggregation` promises only that changing servings
scales and combines matching amounts. Its tagged test loads one already-scaled
sample and checks one tomato total. It does not establish correctness after
every possible serving change, and no registered test measures “at once.”
These are broader claim-like statements with no matching claim/test.

**Concrete fix:** Prefer bounded copy: “For home cooks planning several dishes
who need one list when serving counts change.” and “Change a serving count.
Matching amounts combine.” Otherwise register the stronger claims and add
property/range and measured-response tests.

### F-6-5 — MAJOR — two empty-cart actions do not describe the result for returning users

**Location/quote:** Landing action “Start with an empty cart”; README: “Use
Start for real to discard the sample and open an empty cart.”

**Why this fails:** Batch Cart is local-first. If real recipes already exist,
the landing link opens that existing cart, and **Start for real** correctly
returns to it. I confirmed this by creating `Private birthday stew`, entering
and resetting the demo, then choosing **Start for real**; the existing recipe
was still present. The wording implies a blank cart or deletion that does not
occur.

**Concrete fix:** Rename the landing action to **Open your cart**. Rewrite the
README sentence as: “Use **Start for real** to discard the sample and return to
your cart.” Empty-state text already explains how a new user adds a recipe.

### F-6-6 — MINOR — two headings are vague when read out of context

**Location/quote:** Landing h2 “How the list comes together”; demo h2 “Safe to
change.”

**Why this fails:** A headings list does not identify which list or what is
safe. The second is also a reassurance slogan rather than the subject of its
section.

**Concrete fix:** Use “How Batch Cart builds the shopping list” and “How demo
data is stored.”

## Copy audit

Counts treat hyphenated terms, URLs, code tokens, and `US$12` as one word.
There are no sentences over 22 words and no banned marketing terms. Every
landing-page text unit and README sentence/heading is listed below. `flag`
points to the finding and includes the proposed replacement.

### Landing page

| Text | Words | Result |
| --- | ---: | --- |
| Loading Batch Cart… | 3 | pass |
| Skip to main content | 4 | pass |
| Batch Cart | 2 | pass |
| Demo | 1 | pass: navigation label |
| Cart | 1 | pass: navigation label |
| Privacy | 1 | pass: navigation label |
| Scale recipes for a dinner or event | 7 | pass |
| Combine recipes into one shopping list | 6 | pass |
| For home cooks planning several dishes who want correct amounts after every serving change. | 14 | **flag F-6-4** → “For home cooks planning several dishes who need one list when serving counts change.” |
| Try it with sample data | 5 | pass |
| Start with an empty cart | 5 | **flag F-6-5** → “Open your cart” |
| The demo opens three recipes with a ready shopping list. | 10 | pass; desktop presentation fails F-6-2 |
| Works offline after your first visit | 6 | pass: `offline-reload` |
| Recipes stay in this browser | 5 | pass: `local-privacy` |
| Full cart free · Plus is US$12 once | 8 | pass: `free-core`, `hosted-checkout` |
| Several recipes. | 2 | pass with the following caption sentence |
| One shopping list. | 3 | pass with the preceding caption sentence |
| Live calculation | 2 | pass |
| Add recipes and see one shopping list | 7 | pass |
| Change any serving count. | 4 | pass: `scaled-aggregation` |
| Matching amounts combine at once. | 5 | **flag F-6-4** → “Matching amounts combine.” |
| Combined result | 2 | pass |
| Shopping list 0 | 3 | pass; count is dynamic |
| Combined ingredients will appear here. | 5 | pass |
| Add a recipe to start the calculation. | 7 | pass |
| Print list | 2 | pass: result-naming action |
| Share list | 2 | pass: result-naming action |
| Export data | 2 | pass: result-naming action; test scope fails F-6-3 |
| Import data | 2 | pass: result-naming action; test scope fails F-6-3 |
| Recipes 0 | 2 | pass; count is dynamic |
| Add recipe | 2 | pass: result-naming action |
| Your recipes will stack here | 5 | pass |
| Add a recipe, then paste its ingredients one per line. | 10 | pass |
| Add your first recipe | 4 | pass: result-naming action |
| Batch Cart Plus | 3 | pass |
| Keep plans for repeat events | 5 | pass |
| Save named copies of this cart and restore them later. | 10 | pass: `plus-snapshots` |
| View Plus plans | 3 | pass: result-naming action |
| Three clear steps | 3 | pass |
| How the list comes together | 5 | **flag F-6-6** → “How Batch Cart builds the shopping list” |
| Paste each recipe | 3 | pass |
| Enter one ingredient per line with its quantity. | 8 | pass |
| Set every serving count | 4 | pass |
| Batch Cart scales each recipe from its original yield. | 9 | pass: `scaled-aggregation` |
| Check one combined list | 4 | pass |
| Matching weights and volumes merge. | 5 | pass: `scaled-aggregation` |
| Uncertain conversions stay visible. | 4 | pass: `uncertain-conversions` |
| Recipe and privacy limits | 4 | pass |
| A calculator, not a recipe service | 6 | pass |
| Batch Cart does not scrape recipe sites. | 7 | pass: `no-recipe-scraping` |
| Your recipes stay in this browser. | 6 | pass: `local-privacy` |
| Export a copy whenever you want. | 6 | pass: `data-export` |
| It converts units using fixed standard measures. | 7 | pass: `fixed-measures` |
| Mixed units are marked for your review. | 7 | pass: `uncertain-conversions` |
| Optional one-time license | 3 | pass |
| Save repeat plans with Plus | 5 | pass |
| US$12 once | 2 | pass: `hosted-checkout` |
| Keep named event plans and restore them for the next gathering. | 11 | pass: `plus-snapshots` |
| The full calculator, print, share, and export tools remain free. | 10 | pass: `free-core`; test scope fails F-6-3 |
| Buy Batch Cart Plus | 4 | pass: result-naming action |
| Sociobot opens its hosted checkout. | 5 | pass: `hosted-checkout` |
| Have a license? | 3 | pass: disclosure label |
| License token | 2 | pass: form label |
| Restore purchase | 2 | pass: result-naming action |
| The free cart has no time limit. | 7 | pass: `free-core`; test scope fails F-6-3 |
| One list from every recipe. | 5 | pass |
| Terms | 1 | pass: navigation label |
| Built by Param Factory | 4 | pass: external-link label |
| (opens in a new tab) | 5 | pass: accessibility notice |
| v1.0.10 · Generated artwork | 4 | pass: version/provenance |

### README

| Text | Words | Result |
| --- | ---: | --- |
| Batch Cart | 2 | pass |
| Combine scaled recipes into one shopping list. | 7 | pass |
| Batch Cart is for households and event cooks planning several dishes at once. | 13 | pass |
| Paste ingredients, set the original and target servings for each recipe, and use one combined cart at the store. | 19 | pass |
| Live product | 2 | pass |
| One-click demo | 2 | pass |
| What Batch Cart does | 4 | pass |
| Scales each recipe from its original serving count. | 8 | pass: `scaled-aggregation` |
| Adds amounts when their units can be converted. | 8 | pass: `scaled-aggregation`, `fixed-measures` |
| Keeps incompatible units separate and marks them for review. | 9 | pass: `uncertain-conversions` |
| Moves checked pantry items out of the shopping list. | 9 | pass: `pantry-exclusion` |
| Prints, shares, imports, and exports the active cart. | 8 | pass: registered feature claims; import/export scope fails F-6-3 |
| Works offline after the first connected visit. | 7 | pass: `offline-reload` |
| Keeps recipe data in this browser. | 6 | pass: `local-privacy` |
| It is not sent to a server. | 7 | pass: `local-privacy` |
| The demo opens three recipes with a ready shopping list. | 10 | pass: `demo-seed-reset`; desktop presentation fails F-6-2 |
| Use Reset demo to restore them. | 6 | pass: `demo-seed-reset` |
| Use Start for real to discard the sample and open an empty cart. | 13 | **flag F-6-5** → “Use Start for real to discard the sample and return to your cart.” |
| Free cart and Batch Cart Plus | 6 | pass |
| The active cart, serving controls, pantry checks, print, share, import, and export stay free. | 14 | **flag F-6-3**: test every named control after the future clock change |
| Batch Cart Plus is US$12 once and adds named plan snapshots for repeat events. | 14 | pass: `hosted-checkout`, `plus-snapshots` |
| Payment uses the Sociobot hosted checkout. | 6 | pass: `hosted-checkout` |
| Batch Cart stores a returned license in this browser and verifies a stored license at most once per day. | 19 | pass: `returned-license-storage`, `license-verification-daily` |
| Develop | 1 | pass |
| Requires Node.js 20 or newer. | 5 | pass |
| Open http://localhost:5173. | 2 | pass |
| The demo is at http://localhost:5173/?demo=1. | 5 | pass |
| Test and build | 3 | pass |
| npm test runs parser unit tests and Chromium browser tests. | 10 | pass: command verified |
| Browser tests cover every claim in .factory/claims.json, offline reload, demo isolation, mobile layout, and serious accessibility findings. | 17 | **flag F-6-1/F-6-3** → “Browser tests cover the registered claim paths, mobile layout, and serious accessibility findings.” until coverage is complete |
| npm run build writes the static site to dist/. | 9 | pass: command verified |
| Run one claim by its ID. | 6 | pass |
| Privacy and data ownership | 4 | pass |
| The real cart and the sample cart are kept apart. | 10 | pass: manually verified with pre-existing real data |
| Export JSON before clearing browser storage or moving devices. | 9 | pass |
| See /privacy and /terms in the app. | 7 | pass: both links return 200 |
| Batch Cart uses no analytics, trackers, third-party runtime scripts, or CDN fonts. | 12 | pass: `private-runtime` and live request log |
| Deploy | 1 | pass |
| Deploy the contents of dist/ to a static host. | 9 | pass |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

Terminology is otherwise consistent: `recipe`, `shopping list`, `cart`, `pantry
item`, `Recipe serves`, `Cook for`, `saved plan`, `Batch Cart Plus`, `demo`, and
`license` each retain one meaning.

## Demo, sandbox, offline, and privacy

- One landing click opens `/?demo=1`, shows the persistent demo banner, three
  named recipes, and 12 calculated rows.
- At 390 × 844, two complete sample rows are visible without scrolling.
- Reset restored Lemony tomato pasta, Herb market salad, and Garlic bread.
- A pre-existing real recipe (`Private birthday stew`) survived demo edits,
  Reset, and **Start for real** unchanged. Demo and real writes therefore use
  separate namespaces.
- **Start for real** removed `demo:batch-cart`; ordinary navigation did not
  (F-6-1).
- The complete demo flow issued only same-origin requests. No analytics,
  tracker, CDN font, or other runtime request appeared.
- After a connected load and service-worker readiness, a live offline reload of
  `/demo` retained its h1 and all three recipes with no console error.

## Claims verification

I cloned the candidate into `/tmp/batch-cart-review6-clean-op22Mt/repo`, ran
`npm ci`, and invoked every command from `.factory/claims.json` individually.
All 24 commands exited zero. This command result is not acceptance where the
test is narrower than its claim or a live counterexample exists.

| Claim ID | Command result | Independent assessment |
| --- | --- | --- |
| scaled-aggregation | PASS | Registered behavior passes; stronger landing wording is unlisted (F-6-4). |
| uncertain-conversions | PASS | Covered. |
| fixed-measures | PASS | Covered. |
| pantry-exclusion | PASS | Covered. |
| data-export | PASS | Cart-choice coverage incomplete (F-6-3). |
| data-import | PASS | Cart-choice coverage incomplete (F-6-3). |
| list-sharing | PASS | Covered. |
| list-printing | PASS | Covered. |
| demo-isolation | PASS | Manual pre-existing-real-data check also passed. |
| demo-deletion | PASS | Claim fails through Privacy/navigation despite the narrow test (F-6-1). |
| demo-seed-reset | PASS | Covered. |
| editable-totals | PASS | Covered. |
| local-privacy | PASS | Covered; live request log also passed. |
| private-runtime | PASS | Covered; live request log also passed. |
| license-verification-daily | PASS | Covered. |
| license-token-only | PASS | Covered. |
| license-revocation | PASS | Covered. |
| returned-license-storage | PASS | Covered. |
| no-recipe-scraping | PASS | Covered. |
| offline-reload | PASS | Covered; repeated against live. |
| plus-snapshots | PASS | Covered. |
| free-core | PASS | Named controls/time horizon only partially covered (F-6-3). |
| local-data-deletion | PASS | Covered. |
| hosted-checkout | PASS | US$12 copy, 303, and Dodo destination covered. |

Registry/tag parity is 24 unique IDs to 24 unique `@claim:` tags.

## Earlier findings rechecked live and in code

I read reviews 1–5, polish reports 1–5, and the prior handoff. Each earlier
finding was checked rather than accepted from its status label.

| Earlier finding | Current result |
| --- | --- |
| F-1-1 mobile demo first view | **Fixed:** two full populated rows are visible at 390 × 844. |
| F-1-2 desktop two-column workspace | **Fixed:** recipe and cart tops differ by 62px and share the first grid row. F-6-2 is a separate above-fold-content problem. |
| F-1-3 unregistered README claims | **Fixed as originally scoped:** returned-license storage is registered; the repository-secret/artifact assertions remain absent. New claim issues are F-6-3/F-6-4. |
| F-1-4 route sharing metadata | **Fixed:** every route updates title, description, canonical, OG, and Twitter values; static 404 metadata is complete. |
| F-1-5 jargon/ambiguous actions | **Fixed as originally scoped:** the flagged wording remains removed. F-6-5/F-6-6 cover different current text. |
| F-2-1 flaky immediate keyboard startup; reopened in review 4 | **Fixed:** the shell precedes JavaScript; the live keyboard test and 26-test accessibility file pass. |
| F-2-2 unbounded “accurate” | **Fixed:** absent from product, README, manifest, and catalog. “Correct/every” is a separate current overclaim (F-6-4). |
| F-2-3 unregistered demo seed/reset | **Fixed:** registered test and manual Reset pass. |
| F-2-4 unregistered editable totals | **Fixed:** quantity, unit, name, reload, and export test passes. |
| F-2-5 unsupported receipt claim | **Fixed:** receipt wording remains absent; hosted checkout is registered. |
| F-2-6 unregistered revoked-license behavior | **Fixed:** registered fixture test passes and leaves free controls available. |
| F-2-7 unsupported refund/checkout terms | **Fixed:** unsupported refund text remains absent; product terms and support remain. |
| F-2-8 pantry omitted from free-core | **Fixed as originally scoped:** pantry is exercised after the future clock. Other controls remain under-tested (F-6-3). |
| F-2-9 unregistered local-data deletion | **Fixed:** registered test removes both databases, plans, and license keys, including the delayed-verification race. |
| F-2-10 first-screen support copy below fold | **Fixed:** action explanation and three facts fit at both required sizes. |
| F-2-11 incomplete static 404 skeleton | **Fixed:** live HTTP 404 has shared header/footer, return link, metadata, and product styling. |
| F-2-12 technical conversion wording | **Fixed:** current sentence uses “fixed standard measures.” |
| F-2-13 weak README headings | **Fixed:** “What Batch Cart does” and “Free cart and Batch Cart Plus” remain. |
| F-3-1 route changes not announced | **Fixed:** Privacy navigation focuses its h1 and announces `Privacy — Batch Cart`; Back does the same after the tested wait. |
| F-5-1 metaphor 404 | **Fixed:** both 404 paths use “Page not found” and “The address may be old or mistyped.” |
| F-5-2 generic privacy mood heading | **Fixed:** “Recipe and privacy limits” remains. |

## Structure, links, accessibility, and quality gates

- `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` return 200;
  `/missing-page` returns the designed 404. Robots, sitemap, manifest, social
  card, favicon, and the external factory link return 200. Checkout returns the
  tested 303 to a Dodo hosted session. `mailto:` links are explicit.
- Every checked route has `lang=en`, one h1, one main, route-specific title,
  description, canonical, OG/Twitter metadata, favicon, Apple touch icon,
  consistent header/footer, Privacy, and Terms.
- Client navigation and Back focus/announce the new h1. The skip link and
  visible focus treatment pass. The live Playwright/Axe file passes 26/26,
  including zero serious/critical violations on all routes, 200% text, 44px
  targets, and 390px overflow.
- Response headers include CSP, `frame-ancestors 'none'`, Referrer-Policy,
  Permissions-Policy, and nosniff. No CSP/console error was observed.
- Clean `npm test`: 13 unit and 50 Chromium tests passed. Clean `npm run build`
  produced `dist/`; application JavaScript is 30.63 kB raw / 10.38 kB gzip.
  `git diff --check` passed.
- `/opt/fleet/lib/verify-url.sh` passed live `/` and `/?demo=1` with no console
  errors, missing alt text, or unlabeled button.
- The aubergine, lime, apricot, clipped-glass recipe panes, illustrated kitchen
  calculation art, and bright paper cart follow `.factory/design.md` and are
  recognisably product-specific rather than a generic SaaS template.

## Missed leverage

No additional AI feature is implied. Scaling and unit aggregation are
deterministic tasks, and a model would weaken trust. The expected adjacent
capabilities—import/export, print/share, pantry exclusion, offline use, and
optional repeat-plan snapshots—already exist. No provider key or decorative AI
feature is present.

## What would make this perfect

Delete the demo namespace on every exit path and expand that claim test; place
readable recipe and ingredient sample values inside the initial desktop demo
viewport; fully exercise cart choices and every free control in the registered
claim tests; remove the unbounded correctness/timing words; rename the two
empty-cart actions for returning users; and replace the two vague headings.
Then rerun all 24 claim commands, the full clean suite/build, the live route and
request crawl, offline reload, both first-view measurements, and the prior-ID
audit.
