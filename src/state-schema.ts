import type { AppState, CartOverride, Recipe, Snapshot } from './types';

type RecordValue = Record<string, unknown>;

const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isServingCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 500;

function isRecipe(value: unknown): value is Recipe {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && isServingCount(value.baseServings)
    && isServingCount(value.targetServings)
    && typeof value.ingredients === 'string';
}

function isOverride(value: unknown): value is CartOverride {
  return isRecord(value)
    && typeof value.name === 'string'
    && typeof value.unit === 'string'
    && typeof value.quantity === 'number'
    && Number.isFinite(value.quantity)
    && value.quantity >= 0;
}

function isOverrides(value: unknown): value is Record<string, CartOverride> {
  return isRecord(value) && Object.values(value).every(isOverride);
}

function isSnapshot(value: unknown): value is Snapshot {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.name === 'string'
    && typeof value.savedAt === 'string'
    && Array.isArray(value.recipes) && value.recipes.every(isRecipe)
    && Array.isArray(value.pantry) && value.pantry.every(item => typeof item === 'string')
    && isOverrides(value.overrides);
}

/** Checks the complete shape before state is rendered or written to IndexedDB. */
export function isAppState(value: unknown): value is AppState {
  return isRecord(value)
    && Array.isArray(value.recipes) && value.recipes.every(isRecipe)
    && Array.isArray(value.pantry) && value.pantry.every(item => typeof item === 'string')
    && isOverrides(value.overrides)
    && Array.isArray(value.snapshots) && value.snapshots.every(isSnapshot);
}

/** Batch Cart exports are versioned so an incompatible export is never imported partially. */
export function isBatchCartExport(value: unknown): value is AppState {
  return isRecord(value) && value.version === 1 && isAppState(value);
}
