import '@fontsource-variable/fraunces/wght.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import './style.css';
import { clearAllData, clearDemo, loadState, saveState } from './db';
import { aggregateRecipes, formatQuantity } from './ingredients';
import { isAppState, isBatchCartExport } from './state-schema';
import type { AppState, CartItem, Recipe } from './types';

const main = document.querySelector<HTMLElement>('#main')!;
const demoBannerRoot = document.querySelector<HTMLDivElement>('#demo-banner-root')!;
document.querySelector<HTMLAnchorElement>('.skip-link')?.addEventListener('click', event => {
  event.preventDefault();
  history.pushState({}, '', `${location.pathname}${location.search}#main`);
  main.focus({ preventScroll: true });
  main.scrollIntoView();
});
const sampleRecipes: Recipe[] = [
  { id: 'sample-pasta', name: 'Lemony tomato pasta', baseServings: 4, targetServings: 6, ingredients: '400 g spaghetti\n3 tbsp olive oil\n4 cloves garlic, sliced\n500 g cherry tomatoes\n2 lemons\n60 g parmesan' },
  { id: 'sample-salad', name: 'Herb market salad', baseServings: 4, targetServings: 6, ingredients: '300 g cherry tomatoes\n1 cucumber\n2 tbsp olive oil\n1 lemon\n1 bunch parsley\n150 g feta' },
  { id: 'sample-bread', name: 'Garlic bread', baseServings: 6, targetServings: 8, ingredients: '1 loaf sourdough bread\n3 cloves garlic\n120 g butter\n2 tbsp parsley' },
];
const emptyState = (): AppState => ({ recipes: [], pantry: [], overrides: {}, snapshots: [] });
let state: AppState = emptyState();
let demo = false;
let route = '/';
let statusMessage = '';
let validationMessage = '';
let licenseMessage = '';
let licenseValid = localStorage.getItem('sb_license_verdict:batch-cart') === 'valid';
let licenseCheckGeneration = 0;
let saveQueue: Promise<void> = Promise.resolve();

type ActiveRecipeField = {
  recipeId: string;
  field: string;
  value: string;
  selectionStart: number | null;
  selectionEnd: number | null;
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
const id = () => crypto.randomUUID();

function currentPath() {
  const path = location.pathname.replace(/\/$/, '') || '/';
  if (path === '/' && new URLSearchParams(location.search).get('demo') === '1') return '/demo';
  return ['/','/demo','/privacy','/terms'].includes(path) ? path : '/404';
}

function pathForLink(link: HTMLAnchorElement) {
  const path = link.pathname.replace(/\/$/, '') || '/';
  if (path === '/' && new URLSearchParams(link.search).get('demo') === '1') return '/demo';
  return ['/','/demo','/privacy','/terms'].includes(path) ? path : '/404';
}

function setMeta(title: string, description: string, path: string) {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = description;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href = `https://batch-cart.sociobot.in${path}`;
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')!.content = description;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')!.content = title;
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')!.content = description;
}

function demoBanner() {
  return demo ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span><button class="text-button" data-action="reset-demo">Reset demo</button><button class="text-button" data-action="start-real">Start for real</button></span></aside>` : '';
}

function hero() {
  return `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Scale recipes for a dinner or event</p>
        <h1 id="hero-title" tabindex="-1">Combine recipes into one shopping list</h1>
        <p class="lede">For home cooks planning several dishes who need one list when serving counts change.</p>
        <div class="hero-actions"><a class="button primary" href="/?demo=1" data-link>Try it with sample data</a><a class="button secondary" href="#workspace">Open your cart</a></div>
        <p class="after-action">The demo opens three recipes with a ready shopping list.</p>
        <ul class="plain-facts" aria-label="Product facts"><li>Works offline after your first visit</li><li>Recipes stay in this browser</li><li>Full cart free · Plus is US$12 once</li></ul>
      </div>
      <figure class="hero-art"><picture><source media="(max-width: 600px)" srcset="/hero-glass-600.webp" width="600" height="400"><img src="/hero-glass.webp" width="1200" height="800" alt="Glass recipe sheets and ingredients converge into one illuminated tray." fetchpriority="high" decoding="async"></picture><figcaption>Several recipes. One shopping list.</figcaption></figure>
    </section>`;
}

function recipeCard(recipe: Recipe, index: number) {
  return `<article class="recipe-pane" data-recipe="${recipe.id}">
      <div class="recipe-index" aria-hidden="true">0${index + 1}</div>
      <label>Recipe name<input data-field="name" value="${escapeHtml(recipe.name)}" autocomplete="off"></label>
      <div class="servings-grid">
        <label>Recipe serves<input data-field="baseServings" type="number" min="1" max="500" step="any" value="${recipe.baseServings}"></label>
        <span aria-hidden="true">→</span>
        <label>Cook for<input data-field="targetServings" type="number" min="1" max="500" step="any" value="${recipe.targetServings}"></label>
      </div>
      <label>Ingredients <span class="hint">one per line, starting with a quantity</span><textarea data-field="ingredients" rows="7" spellcheck="false">${escapeHtml(recipe.ingredients)}</textarea></label>
      <button class="text-button danger" data-action="remove-recipe" data-id="${recipe.id}">Remove ${escapeHtml(recipe.name || 'recipe')}</button>
    </article>`;
}

function cartRow(item: CartItem) {
  const override = state.overrides[item.key];
  const value = override || item;
  const pantry = state.pantry.includes(item.key);
  return `<li class="cart-row ${pantry ? 'is-pantry' : ''}" data-item="${escapeHtml(item.key)}">
      <label class="pantry-check"><input type="checkbox" data-action="toggle-pantry" data-key="${escapeHtml(item.key)}" ${pantry ? 'checked' : ''}><span aria-hidden="true"></span><span class="sr-only">Mark ${escapeHtml(value.name)} as already in the pantry</span></label>
      <label class="quantity-edit"><span class="sr-only">Quantity for ${escapeHtml(value.name)}</span><input type="number" min="0" step="any" value="${formatQuantity(value.quantity)}" data-override="quantity"></label>
      <label class="unit-edit"><span class="sr-only">Unit for ${escapeHtml(value.name)}</span><input value="${escapeHtml(value.unit)}" data-override="unit" aria-label="Unit for ${escapeHtml(value.name)}"></label>
      <label class="name-edit"><span class="sr-only">Ingredient name</span><input value="${escapeHtml(value.name)}" data-override="name" aria-label="Ingredient name"></label>
      ${item.uncertain ? `<details class="uncertain"><summary>Converted units — check</summary><p>${escapeHtml(item.note || '')}</p><ul>${item.sources.map(source => `<li>${escapeHtml(source)}</li>`).join('')}</ul></details>` : `<details><summary>${item.sources.length} recipe${item.sources.length === 1 ? '' : 's'}</summary><ul>${item.sources.map(source => `<li>${escapeHtml(source)}</li>`).join('')}</ul></details>`}
    </li>`;
}

function workspace(forDemo = false) {
  const { items, errors } = aggregateRecipes(state.recipes);
  const toBuy = items.filter(item => !state.pantry.includes(item.key));
  const pantry = items.filter(item => state.pantry.includes(item.key));
  return `<section id="workspace" class="workspace" ${forDemo ? 'aria-labelledby="demo-workspace-title"' : 'aria-labelledby="workspace-title"'}>
      ${forDemo ? '<h2 id="demo-workspace-title" class="sr-only">Sample shopping list and recipes</h2>' : '<div class="section-heading"><div><p class="eyebrow">Live calculation</p><h2 id="workspace-title">Add recipes and see one shopping list</h2></div><p>Change any serving count. Matching amounts combine.</p></div>'}
      <div class="workspace-grid">
        <section class="cart-plane" aria-labelledby="cart-title">
          <div class="cart-topline"><div><p class="eyebrow">Combined result</p><h3 id="cart-title">Shopping list <span>${toBuy.length}</span></h3></div><span class="signal" aria-hidden="true"></span></div>
          ${validationMessage ? `<div class="error-box" role="alert">${escapeHtml(validationMessage)}</div>` : ''}
          ${errors.length ? `<div class="error-box" role="alert"><strong>${errors.length} line${errors.length === 1 ? '' : 's'} need a quantity</strong><ul>${errors.map(error => `<li><b>${escapeHtml(error.recipe)}:</b> “${escapeHtml(error.line)}” — ${escapeHtml(error.message)}</li>`).join('')}</ul></div>` : ''}
          ${items.length ? `<p class="cart-help">Edit any total. Tick items you already have.</p><ol class="cart-list">${toBuy.map(cartRow).join('')}</ol>${pantry.length ? `<details class="pantry-group"><summary>In the pantry (${pantry.length})</summary><ol class="cart-list">${pantry.map(cartRow).join('')}</ol></details>` : ''}` : `<div class="cart-empty"><p>Combined ingredients will appear here.</p><span>Add a recipe to start the calculation.</span></div>`}
          <div class="cart-actions"><button class="button primary" data-action="print" ${!items.length ? 'disabled' : ''}>Print list</button><button class="button secondary" data-action="share" ${!items.length ? 'disabled' : ''}>Share list</button></div>
          <div class="data-actions"><button class="text-button" data-action="export">Export data</button><label class="text-button file-label">Import data<input type="file" data-action="import" accept="application/json"></label></div>
        </section>
        <div class="recipes-column">
          <div class="panel-heading"><h3>Recipes <span>${state.recipes.length}</span></h3><button class="button small secondary" data-action="add-recipe">Add recipe</button></div>
          ${state.recipes.length ? `<div class="recipe-stack">${state.recipes.map(recipeCard).join('')}</div>` : `<div class="empty-state"><div class="empty-rings" aria-hidden="true"></div><h3>Your recipes will stack here</h3><p>Add a recipe, then paste its ingredients one per line.</p><button class="button primary" data-action="add-recipe">Add your first recipe</button></div>`}
        </div>
      </div>
      <div class="snapshot-strip"><div><p class="eyebrow">Batch Cart Plus</p><h3>Keep plans for repeat events</h3><p>Save named copies of this cart and restore them later.</p></div>${licenseValid ? `<div class="snapshot-controls"><label>Plan name<input id="snapshot-name" value="${escapeHtml(state.recipes.map(recipe => recipe.name).slice(0, 2).join(' + ') || 'My event')}"></label><button class="button primary" data-action="save-snapshot">Save plan</button></div>` : `<a class="button secondary" href="/#plus" data-link>View Plus plans</a>`}</div>
      ${licenseValid && state.snapshots.length ? `<ul class="snapshots">${state.snapshots.map(snapshot => `<li><span><strong>${escapeHtml(snapshot.name)}</strong><small>Saved ${new Date(snapshot.savedAt).toLocaleDateString()}</small></span><button class="text-button" data-action="restore-snapshot" data-id="${snapshot.id}">Restore</button><button class="text-button danger" data-action="delete-snapshot" data-id="${snapshot.id}">Delete</button></li>`).join('')}</ul>` : ''}
    </section>`;
}

function marketingSections() {
  return `<section class="how" aria-labelledby="how-title"><p class="eyebrow">Three steps</p><h2 id="how-title">How Batch Cart builds the shopping list</h2><ol><li><span>1</span><div><h3>Paste each recipe</h3><p>Enter one ingredient per line with its quantity.</p></div></li><li><span>2</span><div><h3>Set every serving count</h3><p>Batch Cart scales each recipe from its original yield.</p></div></li><li><span>3</span><div><h3>Check one combined list</h3><p>Matching weights and volumes merge. Uncertain conversions stay visible.</p></div></li></ol></section>
    <section class="boundaries" aria-labelledby="boundaries-title"><div><p class="eyebrow">Recipe and privacy limits</p><h2 id="boundaries-title">A calculator, not a recipe service</h2></div><div><p>Batch Cart does not scrape recipe sites.</p><p>Your recipes stay in this browser. Export a copy whenever you want.</p><p>It converts units using fixed standard measures. Mixed units are marked for your review.</p></div></section>
    <section id="plus" class="plus" aria-labelledby="plus-title"><div><p class="eyebrow">Optional one-time license</p><h2 id="plus-title">Save repeat plans with Plus</h2><p class="price"><span>US$12</span> once</p><p>Keep named event plans and restore them for the next gathering. The full calculator, print, share, and export tools remain free.</p></div><div class="purchase-box"><a class="button primary" href="https://api.sociobot.in/api/v1/products/batch-cart/checkout">Buy Batch Cart Plus</a><p>Sociobot opens its hosted checkout.</p><details><summary>Have a license?</summary><form id="license-form"><label>License token<input name="license" autocomplete="off" required></label><button class="button secondary" type="submit" aria-label="Restore purchase">Restore purchase</button></form></details><p id="license-status">${licenseMessage || (licenseValid ? 'Plus is active on this device.' : 'The free cart has no time limit.')}</p></div></section>`;
}

function legalPage(kind: 'privacy' | 'terms') {
  const privacy = kind === 'privacy';
  setMeta(`${privacy ? 'Privacy' : 'Terms'} — Batch Cart`, privacy ? 'How Batch Cart stores recipes and license details.' : 'Terms for using Batch Cart.', `/${kind}`);
  return `<p class="eyebrow">Batch Cart</p><h1 tabindex="-1">${privacy ? 'Your recipes stay with you' : 'Terms for using Batch Cart'}</h1>${privacy ? `<p>Batch Cart stores recipes, pantry choices, and saved plans in your browser. We do not receive that data.</p><h2>What leaves your device</h2><p>No recipe data leaves your device. If you buy Plus, the Sociobot checkout handles payment. License verification sends only your license token to <code>api.sociobot.in</code>.</p><h2>Your choices</h2><p>Export your data from the cart at any time. Demo data is deleted when you leave the demo.</p><p><button class="button danger-button" data-action="delete-local-data">Delete local data</button></p><p class="choice-note">This removes the real cart, sample cart, saved plans, and license from this browser.</p><h2>Contact</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a> with privacy questions.</p>` : `<p>Batch Cart is a household planning calculator. Check quantities and allergy information before shopping or cooking.</p><h2>License</h2><p>The free features have no time limit. Batch Cart Plus costs US$12 once and adds saved plan snapshots. A license that is no longer active removes Plus features. Your free cart stays available.</p><h2>Purchases</h2><p>Sociobot opens its hosted checkout. Email <a href="mailto:support@sociobot.in">support@sociobot.in</a> with purchase questions.</p><h2>No warranty</h2><p>The software is provided as is under the MIT License. You remain responsible for ingredient choices and purchase amounts.</p><h2>Contact</h2><p>Email <a href="mailto:support@sociobot.in">support@sociobot.in</a> with terms questions.</p>`}`;
}

function demoPage() {
  setMeta('Demo — Batch Cart', 'Try Batch Cart with three sample recipes in a separate local sandbox.', '/demo');
  return `<section class="demo-intro"><p class="eyebrow">Ready-to-use sample</p><h1 tabindex="-1">Plan dinner with sample recipes</h1><p>Change a serving count and watch the shared ingredients combine.</p></section>${workspace(true)}<section class="demo-note"><h2>How demo data is stored</h2><p>This sample uses a separate browser database. Reset it or start your real cart at any time.</p></section>`;
}

function homePage() {
  setMeta('Batch Cart — combine recipes into one shopping list', 'Scale several recipes, combine matching ingredients, mark pantry items, and take one shopping list to the store.', '/');
  return `${hero()}${workspace()}${marketingSections()}`;
}

function notFound() {
  setMeta('Page not found — Batch Cart', 'Return to Batch Cart and make one shopping list from several recipes.', '/404');
  return `<div class="lost-pane" aria-hidden="true">404</div><h1 tabindex="-1">Page not found</h1><p>The address may be old or mistyped.</p><a class="button primary" href="/" data-link>Return to Batch Cart</a>`;
}

function render(moveFocus = false) {
  route = currentPath();
  demoBannerRoot.innerHTML = demoBanner();
  main.className = route === '/demo' ? 'demo-main' : route === '/privacy' || route === '/terms' ? 'legal' : route === '/404' ? 'not-found' : '';
  main.innerHTML = route === '/' ? homePage() : route === '/demo' ? demoPage() : route === '/privacy' ? legalPage('privacy') : route === '/terms' ? legalPage('terms') : notFound();
  main.removeAttribute('aria-busy');
  const region = document.querySelector<HTMLElement>('.live-region');
  if (region) region.textContent = statusMessage;
  bindEvents();
  if (moveFocus) requestAnimationFrame(() => document.querySelector<HTMLElement>('h1')?.focus());
}

function captureActiveRecipeField(): ActiveRecipeField | null {
  const input = document.activeElement;
  if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) || !input.dataset.field) return null;
  const recipeId = input.closest<HTMLElement>('[data-recipe]')?.dataset.recipe;
  if (!recipeId) return null;
  return {
    recipeId,
    field: input.dataset.field,
    value: input.value,
    selectionStart: input.selectionStart,
    selectionEnd: input.selectionEnd,
  };
}

function restoreActiveRecipeField(active: ActiveRecipeField | null) {
  if (!active) return;
  const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-recipe="${CSS.escape(active.recipeId)}"] [data-field="${CSS.escape(active.field)}"]`);
  if (!input) return;
  input.value = active.value;
  input.focus();
  if (active.selectionStart !== null && active.selectionEnd !== null) input.setSelectionRange(active.selectionStart, active.selectionEnd);
}

async function persist(message?: string) {
  const snapshot = structuredClone(state);
  const snapshotDemo = demo;
  saveQueue = saveQueue.then(() => saveState(snapshot, snapshotDemo));
  await saveQueue;
  if (message) announce(message);
}

function announce(message: string) {
  statusMessage = message;
  const region = document.querySelector<HTMLElement>('.live-region');
  if (region) region.textContent = message;
}

function listText() {
  const { items } = aggregateRecipes(state.recipes);
  return ['Batch Cart shopping list', ...items.filter(item => !state.pantry.includes(item.key)).map(item => {
    const value = state.overrides[item.key] || item;
    return `☐ ${formatQuantity(value.quantity)} ${value.unit} ${value.name}`.replace(/\s+/g, ' ');
  })].join('\n');
}

async function verifyLicense(token: string) {
  const checkGeneration = ++licenseCheckGeneration;
  localStorage.setItem('sb_license:batch-cart', token);
  localStorage.setItem('sb_license_checked:batch-cart', String(Date.now()));
  licenseMessage = 'Checking this license…';
  const status = document.querySelector('#license-status');
  if (status) status.textContent = licenseMessage;
  try {
    const response = await fetch(`https://api.sociobot.in/api/v1/products/batch-cart/verify?license=${encodeURIComponent(token)}`);
    const result = await response.json() as { valid?: boolean };
    if (checkGeneration !== licenseCheckGeneration || localStorage.getItem('sb_license:batch-cart') !== token) return;
    licenseValid = result.valid === true;
    localStorage.setItem('sb_license_verdict:batch-cart', licenseValid ? 'valid' : 'invalid');
    licenseMessage = licenseValid ? 'Plus is active on this device.' : 'This license is not active. Check the token and try again.';
    render();
    announce(licenseMessage);
  } catch {
    if (checkGeneration !== licenseCheckGeneration || localStorage.getItem('sb_license:batch-cart') !== token) return;
    licenseMessage = 'The license could not be checked. Connect to the internet and try again.';
    render();
    announce(licenseMessage);
  }
}

function bindEvents() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-link]').forEach(link => {
    if (link.dataset.bound === 'true') return;
    link.dataset.bound = 'true';
    link.addEventListener('click', async event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      if (demo && pathForLink(link) !== '/demo') await discardDemo();
      history.pushState({}, '', `${link.pathname}${link.search}${link.hash}`);
      await routeChanged(true);
    });
  });
  document.querySelectorAll<HTMLElement>('[data-action]').forEach(element => {
    const action = element.dataset.action;
    if (action === 'import') element.addEventListener('change', importData);
    else element.addEventListener('click', handleAction);
  });
  document.querySelectorAll<HTMLElement>('[data-recipe]').forEach(card => card.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-field]').forEach(input => input.addEventListener('change', async () => {
    const recipe = state.recipes.find(value => value.id === card.dataset.recipe);
    if (!recipe) return;
    const field = input.dataset.field as keyof Recipe;
    if (field === 'baseServings' || field === 'targetServings') {
      const number = Number(input.value);
      if (!Number.isFinite(number) || number < 1 || number > 500) {
        validationMessage = 'Serving counts must be between 1 and 500.';
        announce(validationMessage);
        render();
        return;
      }
      recipe[field] = number;
    } else recipe[field] = input.value;
    validationMessage = '';
    state.overrides = {};
    await persist('Cart recalculated.');
    const active = captureActiveRecipeField();
    render();
    restoreActiveRecipeField(active);
  })));
  document.querySelectorAll<HTMLElement>('[data-item]').forEach(row => row.querySelectorAll<HTMLInputElement>('[data-override]').forEach(input => input.addEventListener('change', async () => {
    const key = row.dataset.item!;
    const original = aggregateRecipes(state.recipes).items.find(item => item.key === key);
    if (!original) return;
    const current = state.overrides[key] || { name: original.name, quantity: original.quantity, unit: original.unit };
    const field = input.dataset.override as 'name' | 'quantity' | 'unit';
    if (field === 'quantity') current.quantity = Math.max(0, Number(input.value) || 0);
    else current[field] = input.value.trim();
    state.overrides[key] = current;
    await persist('Shopping list edit saved.');
  })));
  document.querySelector<HTMLFormElement>('#license-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    void verifyLicense(String(form.get('license') || '').trim());
  });
}

async function handleAction(event: Event) {
  const target = event.currentTarget as HTMLElement;
  const action = target.dataset.action;
  if (action === 'add-recipe') {
    state.recipes.push({ id: id(), name: 'New recipe', baseServings: 4, targetServings: 4, ingredients: '' });
    await persist('Recipe added.'); render();
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-recipe="${state.recipes.at(-1)!.id}"] input`)?.focus());
  }
  if (action === 'remove-recipe') {
    const recipe = state.recipes.find(value => value.id === target.dataset.id);
    if (recipe && confirm(`Remove “${recipe.name}” from this cart?`)) {
      state.recipes = state.recipes.filter(value => value.id !== recipe.id); state.overrides = {};
      await persist('Recipe removed.'); render();
    }
  }
  if (action === 'toggle-pantry') {
    const key = target.dataset.key!;
    state.pantry = (target as HTMLInputElement).checked ? [...new Set([...state.pantry, key])] : state.pantry.filter(value => value !== key);
    await persist((target as HTMLInputElement).checked ? 'Item moved to the pantry.' : 'Item returned to the shopping list.'); render();
  }
  if (action === 'print') window.print();
  if (action === 'share') {
    const text = listText();
    try {
      if (navigator.share) await navigator.share({ title: 'Batch Cart shopping list', text });
      else { await navigator.clipboard.writeText(text); announce('Shopping list copied.'); }
    } catch (error) { if ((error as DOMException).name !== 'AbortError') announce('The list could not be shared. Copy it from the printed view instead.'); }
  }
  if (action === 'export') {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), ...state }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'batch-cart-data.json'; link.click(); URL.revokeObjectURL(link.href); announce('Data export downloaded.');
  }
  if (action === 'reset-demo') { await saveState({ ...emptyState(), recipes: structuredClone(sampleRecipes) }, true); state = await loadState(true); render(); announce('Demo reset to the sample recipes.'); }
  if (action === 'start-real') { await discardDemo(); history.pushState({}, '', '/#workspace'); await routeChanged(true); }
  if (action === 'delete-local-data' && confirm('Delete the real cart, sample cart, saved plans, and license from this browser?')) {
    licenseCheckGeneration += 1;
    await clearAllData();
    ['sb_license:batch-cart', 'sb_license_checked:batch-cart', 'sb_license_verdict:batch-cart'].forEach(key => localStorage.removeItem(key));
    state = emptyState();
    licenseValid = false;
    licenseMessage = '';
    statusMessage = 'Local data deleted.';
    render();
  }
  if (action === 'save-snapshot' && licenseValid) {
    const name = document.querySelector<HTMLInputElement>('#snapshot-name')?.value.trim() || 'Saved plan';
    state.snapshots.unshift({ id: id(), name, savedAt: new Date().toISOString(), recipes: structuredClone(state.recipes), pantry: [...state.pantry], overrides: structuredClone(state.overrides) });
    await persist('Plan saved.'); render();
  }
  if (action === 'restore-snapshot') {
    const snapshot = state.snapshots.find(value => value.id === target.dataset.id);
    if (snapshot) { state.recipes = structuredClone(snapshot.recipes); state.pantry = [...snapshot.pantry]; state.overrides = structuredClone(snapshot.overrides); await persist('Saved plan restored.'); render(); }
  }
  if (action === 'delete-snapshot') {
    const snapshot = state.snapshots.find(value => value.id === target.dataset.id);
    if (snapshot && confirm(`Delete the saved plan “${snapshot.name}”?`)) { state.snapshots = state.snapshots.filter(value => value.id !== snapshot.id); await persist('Saved plan deleted.'); render(); }
  }
}

async function importData(event: Event) {
  const input = event.currentTarget as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    const incoming: unknown = JSON.parse(await file.text());
    if (!isBatchCartExport(incoming)) throw new Error('Invalid Batch Cart export');
    await saveState(incoming, demo);
    state = incoming;
    statusMessage = 'Data imported.';
    render();
  } catch {
    input.value = '';
    announce('This file is not a Batch Cart export. Choose a JSON file exported by Batch Cart.');
  }
}

async function discardDemo() {
  if (!demo) return;
  // Finish any queued demo write before deleting its whole namespace. Without
  // this wait, a blur event followed by an immediate route change can recreate
  // the database after the deletion finishes.
  await saveQueue.catch(() => undefined);
  await clearDemo();
  demo = false;
}

async function routeChanged(moveFocus = false) {
  if (moveFocus) statusMessage = '';
  demo = currentPath() === '/demo';
  state = await loadState(demo);
  if (!isAppState(state)) {
    state = emptyState();
    statusMessage = 'Saved cart data could not be read. An empty cart was opened.';
    await saveState(state, demo);
  }
  if (demo && !state.recipes.length) { state = { ...emptyState(), recipes: structuredClone(sampleRecipes) }; await saveState(state, true); }
  render(moveFocus);
  if (moveFocus) requestAnimationFrame(() => announce(document.title));
  if (location.hash) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView()); else scrollTo(0, 0);
}

async function init() {
  demo = currentPath() === '/demo';
  const params = new URLSearchParams(location.search);
  const returnedLicense = params.get('license');
  if (returnedLicense) {
    const cleanUrl = new URL(location.href);
    cleanUrl.searchParams.delete('license');
    history.replaceState({}, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  }
  window.addEventListener('popstate', () => {
    const leavingDemo = demo && currentPath() !== '/demo';
    void (leavingDemo ? discardDemo() : Promise.resolve()).then(() => routeChanged(true));
  });
  window.addEventListener('offline', () => showToast('You are offline. Your saved cart still works.'));
  window.addEventListener('online', () => showToast('You are back online.'));
  // A hard navigation cannot wait for the old page's IndexedDB cleanup. Clear
  // stale demo storage before rendering any ordinary route in the new page.
  if (!demo) await clearDemo();
  await routeChanged();
  if (returnedLicense) {
    await verifyLicense(returnedLicense);
  } else {
    const token = localStorage.getItem('sb_license:batch-cart');
    const checked = Number(localStorage.getItem('sb_license_checked:batch-cart') || 0);
    if (token && Date.now() - checked > 86_400_000 && navigator.onLine) void verifyLicense(token);
  }
  registerServiceWorker();
}

function showToast(message: string) {
  const toast = document.querySelector<HTMLElement>('#toast');
  if (!toast) return;
  toast.textContent = message; toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 5000);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  navigator.serviceWorker.register('/sw.js').then(registration => {
    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) showToast('An update is ready. Reload to use it.');
      });
    });
  }).catch(() => showToast('Offline setup did not finish. Reload while connected to try again.'));
}

void init();
