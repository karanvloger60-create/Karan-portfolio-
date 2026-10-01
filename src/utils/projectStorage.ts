import { Project } from '../types';

const DB_NAME = 'karan_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'projects_store';
const STORAGE_KEY = 'karan_custom_projects';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save projects safely to both LocalStorage (with catch for quota limits)
 * and IndexedDB (unlimited quota).
 */
export async function saveProjectsSafely(projects: Project[]): Promise<void> {
  // 1. Try LocalStorage
  try {
    const serialized = JSON.stringify(projects);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (storageError) {
    console.warn('LocalStorage quota limit reached. Falling back exclusively to IndexedDB:', storageError);
  }

  // 2. Persist to IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(projects, 'projects_data');
  } catch (idbError) {
    console.warn('IndexedDB write notice:', idbError);
  }
}

/**
 * Load projects safely from LocalStorage, with IndexedDB fallback.
 */
export async function loadProjectsSafely(fallbackDefaults: Project[]): Promise<Project[]> {
  // 1. Try LocalStorage first (instant)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }

  // 2. Try IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('projects_data');
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          resolve(fallbackDefaults);
        }
      };
      req.onerror = () => resolve(fallbackDefaults);
    });
  } catch (err) {
    return fallbackDefaults;
  }
}
