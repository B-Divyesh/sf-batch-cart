import { describe, expect, it } from 'vitest';
import { aggregateRecipes, parseIngredient, parseNumber } from '../../src/ingredients';
import { isBatchCartExport } from '../../src/state-schema';

describe('ingredient parsing', () => {
  it('parses decimals, fractions, and unicode fractions', () => {
    expect(parseNumber('1 1/2')).toBe(1.5);
    expect(parseNumber('¾')).toBe(.75);
    expect(parseNumber('2½')).toBe(2.5);
  });

  it('rejects fractions with a zero denominator', () => {
    expect(parseNumber('1/0')).toBeNull();
    expect(parseNumber('1 1/0')).toBeNull();
    expect(parseIngredient('1/0 g salt').error).toBe('Use a quantity greater than zero.');
  });

  it('normalizes known units while preserving the source', () => {
    const parsed = parseIngredient('2 tablespoons olive oil');
    expect(parsed.unit).toBe('tbsp');
    expect(parsed.name).toBe('olive oil');
    expect(parsed.source).toBe('2 tablespoons olive oil');
  });

  it('reports lines without quantities', () => {
    expect(parseIngredient('salt to taste').error).toContain('Start this line');
  });

  it('matches simple singular and plural ingredient names', () => {
    expect(parseIngredient('2 lemons').key).toBe(parseIngredient('1 lemon').key);
  });
});

describe('recipe aggregation', () => {
  it('scales recipes and combines compatible units', () => {
    const result = aggregateRecipes([
      { id: '1', name: 'One', baseServings: 2, targetServings: 4, ingredients: '500 g tomatoes' },
      { id: '2', name: 'Two', baseServings: 4, targetServings: 4, ingredients: '1 kg tomatoes' },
    ]);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({ quantity: 2, unit: 'kg', uncertain: true });
  });

  it('keeps incompatible dimensions separate and marks both', () => {
    const result = aggregateRecipes([
      { id: '1', name: 'One', baseServings: 1, targetServings: 1, ingredients: '1 cup parsley\n1 bunch parsley' },
    ]);
    expect(result.items).toHaveLength(2);
    expect(result.items.every(item => item.uncertain)).toBe(true);
  });
});

describe('import schema', () => {
  const exportData = {
    version: 1,
    recipes: [{ id: 'dinner', name: 'Dinner', baseServings: 4, targetServings: 6, ingredients: '1 kg potatoes' }],
    pantry: [],
    overrides: {},
    snapshots: [],
  };

  it('accepts a complete current Batch Cart export', () => {
    expect(isBatchCartExport(exportData)).toBe(true);
  });

  it('rejects unknown versions and malformed nested state before it can be persisted', () => {
    expect(isBatchCartExport({ ...exportData, version: 2 })).toBe(false);
    expect(isBatchCartExport({ ...exportData, recipes: [null] })).toBe(false);
    expect(isBatchCartExport({ ...exportData, recipes: [{ ...exportData.recipes[0], targetServings: 501 }] })).toBe(false);
  });
});
