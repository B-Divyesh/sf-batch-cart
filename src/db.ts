import type { AppState } from './types';

const EMPTY: AppState = { recipes: [], pantry: [], overrides: {}, snapshots: [] };

function databaseName(demo: boolean) {
  return demo ? 'demo:batch-cart' : 'batch-cart';
}

function open(demo: boolean): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName(demo), 1);
    request.onupgradeneeded = () => request.result.createObjectStore('state');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadState(demo: boolean): Promise<AppState> {
  const db = await open(demo);
  return new Promise(resolve => {
    const request = db.transaction('state').objectStore('state').get('current');
    request.onsuccess = () => { const value = request.result ? structuredClone(request.result) : structuredClone(EMPTY); db.close(); resolve(value); };
    request.onerror = () => { db.close(); resolve(structuredClone(EMPTY)); };
  });
}

export async function saveState(state: AppState, demo: boolean): Promise<void> {
  const db = await open(demo);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('state', 'readwrite');
    transaction.objectStore('state').put(structuredClone(state), 'current');
    transaction.oncomplete = () => { db.close(); resolve(); };
    transaction.onerror = () => { db.close(); reject(transaction.error); };
  });
}

export async function clearDemo(): Promise<void> {
  return new Promise(resolve => {
    const request = indexedDB.deleteDatabase(databaseName(true));
    request.onsuccess = request.onerror = request.onblocked = () => resolve();
  });
}
