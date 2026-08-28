export interface Recipe {
  id: string;
  name: string;
  baseServings: number;
  targetServings: number;
  ingredients: string;
}

export interface CartOverride {
  name: string;
  quantity: number;
  unit: string;
}

export interface Snapshot {
  id: string;
  name: string;
  savedAt: string;
  recipes: Recipe[];
  pantry: string[];
  overrides: Record<string, CartOverride>;
}

export interface AppState {
  recipes: Recipe[];
  pantry: string[];
  overrides: Record<string, CartOverride>;
  snapshots: Snapshot[];
}

export interface ParsedIngredient {
  source: string;
  quantity: number;
  unit: string;
  unitLabel: string;
  dimension: 'mass' | 'volume' | 'count';
  baseQuantity: number;
  name: string;
  key: string;
  error?: string;
}

export interface CartItem {
  key: string;
  name: string;
  quantity: number;
  unit: string;
  dimension: ParsedIngredient['dimension'];
  sources: string[];
  uncertain: boolean;
  note?: string;
}
