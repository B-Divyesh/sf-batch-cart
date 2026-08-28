import type { CartItem, ParsedIngredient, Recipe } from './types';

type Unit = { unit: string; label: string; dimension: ParsedIngredient['dimension']; factor: number };

const UNITS: Record<string, Unit> = {
  g: { unit: 'g', label: 'g', dimension: 'mass', factor: 1 }, gram: { unit: 'g', label: 'g', dimension: 'mass', factor: 1 }, grams: { unit: 'g', label: 'g', dimension: 'mass', factor: 1 },
  kg: { unit: 'kg', label: 'kg', dimension: 'mass', factor: 1000 }, kilogram: { unit: 'kg', label: 'kg', dimension: 'mass', factor: 1000 }, kilograms: { unit: 'kg', label: 'kg', dimension: 'mass', factor: 1000 },
  oz: { unit: 'oz', label: 'oz', dimension: 'mass', factor: 28.3495 }, ounce: { unit: 'oz', label: 'oz', dimension: 'mass', factor: 28.3495 }, ounces: { unit: 'oz', label: 'oz', dimension: 'mass', factor: 28.3495 },
  lb: { unit: 'lb', label: 'lb', dimension: 'mass', factor: 453.592 }, lbs: { unit: 'lb', label: 'lb', dimension: 'mass', factor: 453.592 }, pound: { unit: 'lb', label: 'lb', dimension: 'mass', factor: 453.592 }, pounds: { unit: 'lb', label: 'lb', dimension: 'mass', factor: 453.592 },
  ml: { unit: 'ml', label: 'ml', dimension: 'volume', factor: 1 }, milliliter: { unit: 'ml', label: 'ml', dimension: 'volume', factor: 1 }, milliliters: { unit: 'ml', label: 'ml', dimension: 'volume', factor: 1 },
  l: { unit: 'l', label: 'l', dimension: 'volume', factor: 1000 }, liter: { unit: 'l', label: 'l', dimension: 'volume', factor: 1000 }, liters: { unit: 'l', label: 'l', dimension: 'volume', factor: 1000 }, litre: { unit: 'l', label: 'l', dimension: 'volume', factor: 1000 }, litres: { unit: 'l', label: 'l', dimension: 'volume', factor: 1000 },
  tsp: { unit: 'tsp', label: 'tsp', dimension: 'volume', factor: 4.92892 }, teaspoon: { unit: 'tsp', label: 'tsp', dimension: 'volume', factor: 4.92892 }, teaspoons: { unit: 'tsp', label: 'tsp', dimension: 'volume', factor: 4.92892 },
  tbsp: { unit: 'tbsp', label: 'tbsp', dimension: 'volume', factor: 14.7868 }, tablespoon: { unit: 'tbsp', label: 'tbsp', dimension: 'volume', factor: 14.7868 }, tablespoons: { unit: 'tbsp', label: 'tbsp', dimension: 'volume', factor: 14.7868 },
  cup: { unit: 'cup', label: 'cup', dimension: 'volume', factor: 236.588 }, cups: { unit: 'cup', label: 'cup', dimension: 'volume', factor: 236.588 },
  'fl oz': { unit: 'fl oz', label: 'fl oz', dimension: 'volume', factor: 29.5735 },
};

const FRACTIONS: Record<string, number> = { '¼': .25, '½': .5, '¾': .75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': .125, '⅜': .375, '⅝': .625, '⅞': .875 };
const COUNT_UNITS = new Set(['clove', 'cloves', 'can', 'cans', 'tin', 'tins', 'bunch', 'bunches', 'packet', 'packets', 'package', 'packages', 'slice', 'slices', 'piece', 'pieces', 'loaf', 'loaves', 'jar', 'jars', 'bottle', 'bottles', 'whole']);

export function parseNumber(value: string): number | null {
  const text = value.trim();
  if (!text) return null;
  if (FRACTIONS[text] !== undefined) return FRACTIONS[text];
  const unicode = text.match(/^(\d+)\s*([¼½¾⅓⅔⅛⅜⅝⅞])$/);
  if (unicode) return Number(unicode[1]) + FRACTIONS[unicode[2]];
  const mixed = text.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const fraction = text.match(/^(\d+)\/(\d+)$/);
  if (fraction) return Number(fraction[1]) / Number(fraction[2]);
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function cleanName(value: string): string {
  return value.split(',')[0].replace(/^of\s+/i, '').replace(/\s+/g, ' ').trim();
}

function canonicalName(value: string): string {
  const words = value.toLowerCase().split(' ');
  const last = words.at(-1) || '';
  if (last.endsWith('tomatoes')) words[words.length - 1] = last.replace(/tomatoes$/, 'tomato');
  else if (last.endsWith('potatoes')) words[words.length - 1] = last.replace(/potatoes$/, 'potato');
  else if (last.endsWith('ies') && last.length > 4) words[words.length - 1] = `${last.slice(0, -3)}y`;
  else if (last.endsWith('s') && !last.endsWith('ss') && !last.endsWith('us')) words[words.length - 1] = last.slice(0, -1);
  return words.join(' ');
}

export function parseIngredient(source: string): ParsedIngredient {
  const line = source.trim().replace(/^[-•]\s*/, '');
  const quantityMatch = line.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?\s*[¼½¾⅓⅔⅛⅜⅝⅞]?|[¼½¾⅓⅔⅛⅜⅝⅞])\s+(.+)$/);
  if (!quantityMatch) {
    return { source, quantity: 0, unit: '', unitLabel: '', dimension: 'count', baseQuantity: 0, name: line || 'Empty line', key: line.toLowerCase(), error: 'Start this line with a quantity, such as “2” or “1/2”.' };
  }
  const quantity = parseNumber(quantityMatch[1]);
  if (quantity === null || quantity <= 0) {
    return { source, quantity: 0, unit: '', unitLabel: '', dimension: 'count', baseQuantity: 0, name: line, key: line.toLowerCase(), error: 'Use a quantity greater than zero.' };
  }
  let rest = quantityMatch[2].trim();
  const words = rest.toLowerCase().split(/\s+/);
  const twoWord = words.slice(0, 2).join(' ');
  const known = UNITS[twoWord] || UNITS[words[0]];
  let unit: Unit;
  if (known) {
    unit = known;
    rest = rest.split(/\s+/).slice(known === UNITS[twoWord] ? 2 : 1).join(' ');
  } else if (COUNT_UNITS.has(words[0])) {
    const normalized = words[0].replace(/s$/, '').replace('bunche', 'bunch').replace('loave', 'loaf');
    unit = { unit: normalized, label: normalized, dimension: 'count', factor: 1 };
    rest = rest.split(/\s+/).slice(1).join(' ');
  } else {
    unit = { unit: '', label: '', dimension: 'count', factor: 1 };
  }
  const name = cleanName(rest);
  if (!name) return { source, quantity, unit: unit.unit, unitLabel: unit.label, dimension: unit.dimension, baseQuantity: quantity * unit.factor, name: line, key: line.toLowerCase(), error: 'Add an ingredient name after the quantity.' };
  return { source, quantity, unit: unit.unit, unitLabel: unit.label, dimension: unit.dimension, baseQuantity: quantity * unit.factor, name, key: `${canonicalName(name)}|${unit.dimension}` };
}

function displayUnit(dimension: ParsedIngredient['dimension'], base: number, preferred: string): [number, string] {
  if (dimension === 'mass') {
    if (preferred === 'kg' || base >= 1000) return [base / 1000, 'kg'];
    if (preferred === 'lb') return [base / 453.592, 'lb'];
    if (preferred === 'oz') return [base / 28.3495, 'oz'];
    return [base, 'g'];
  }
  if (dimension === 'volume') {
    if (preferred === 'l' || base >= 1000) return [base / 1000, 'l'];
    const found = Object.values(UNITS).find(value => value.unit === preferred && value.dimension === 'volume');
    return found ? [base / found.factor, preferred] : [base, 'ml'];
  }
  return [base, preferred];
}

export function aggregateRecipes(recipes: Recipe[]): { items: CartItem[]; errors: { recipe: string; line: string; message: string }[] } {
  const groups = new Map<string, { name: string; dimension: ParsedIngredient['dimension']; base: number; preferred: string; units: Set<string>; sources: string[] }>();
  const errors: { recipe: string; line: string; message: string }[] = [];
  for (const recipe of recipes) {
    const scale = recipe.targetServings / recipe.baseServings;
    recipe.ingredients.split('\n').filter(line => line.trim()).forEach(line => {
      const parsed = parseIngredient(line);
      if (parsed.error) {
        errors.push({ recipe: recipe.name, line, message: parsed.error });
        return;
      }
      const existing = groups.get(parsed.key) || { name: parsed.name, dimension: parsed.dimension, base: 0, preferred: parsed.unit, units: new Set(), sources: [] };
      existing.base += parsed.baseQuantity * scale;
      existing.units.add(parsed.unit);
      existing.sources.push(`${recipe.name}: ${formatQuantity(parsed.quantity * scale)} ${parsed.unitLabel} ${parsed.name}`.replace(/\s+/g, ' '));
      groups.set(parsed.key, existing);
    });
  }
  const items = [...groups.entries()].map(([key, group]) => {
    const [quantity, unit] = displayUnit(group.dimension, group.base, group.preferred);
    const uncertain = group.units.size > 1;
    return { key, name: group.name, quantity, unit, dimension: group.dimension, sources: group.sources, uncertain, note: uncertain ? 'Converted compatible units. Check before buying.' : undefined };
  }).sort((a, b) => a.name.localeCompare(b.name));
  const dimensionsByName = new Map<string, Set<string>>();
  items.forEach(item => {
    const dimensions = dimensionsByName.get(item.name.toLowerCase()) || new Set<string>();
    dimensions.add(item.dimension);
    dimensionsByName.set(item.name.toLowerCase(), dimensions);
  });
  items.forEach(item => {
    if ((dimensionsByName.get(item.name.toLowerCase())?.size || 0) > 1) {
      item.uncertain = true;
      item.note = 'These units measure different things, so they stay separate.';
    }
  });
  return { items, errors };
}

export function formatQuantity(value: number): string {
  if (Math.abs(value - Math.round(value)) < .001) return String(Math.round(value));
  return String(Number(value.toFixed(value < 10 ? 2 : 1)));
}
