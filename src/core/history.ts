import { useSyncExternalStore } from 'react';
import { createStore } from './state';
import { Store, Unsubscribe, Listener } from './types';

export interface HistoryStore<T extends object> {
  state: T;
  undo: () => boolean;
  redo: () => boolean;
  canUndo: boolean;
  canRedo: boolean;
  history: T[];
  reset: () => void;
  subscribe: (listener: Listener) => Unsubscribe;
  getSnapshot: () => { canUndo: boolean; canRedo: boolean; length: number; pointer: number };
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Creates a reactive store with full Time-Travel (Undo / Redo) capabilities.
 */
export function createHistoryStore<T extends object>(
  initialState: T,
  options: { maxHistory?: number } = {}
): HistoryStore<T> {
  const { maxHistory = 50 } = options;
  const initialSnapshot = clone(initialState);
  let past: T[] = [clone(initialState)];
  let pointer = 0;
  let isInternalChange = false;

  const baseStore = createStore(initialState);
  const listeners = new Set<Listener>();

  function notify() {
    listeners.forEach((l) => l());
  }

  // Subscribe to base store mutations
  baseStore.subscribe(() => {
    if (isInternalChange) return;

    const current = clone(baseStore.getSnapshot());

    // Truncate redo stack when new action is taken
    past = past.slice(0, pointer + 1);
    past.push(current);

    if (past.length > maxHistory) {
      past.shift();
    } else {
      pointer++;
    }

    notify();
  });

  return {
    get state() {
      return baseStore.state;
    },
    undo(): boolean {
      if (pointer > 0) {
        pointer--;
        isInternalChange = true;
        const target = clone(past[pointer]);
        Object.assign(baseStore.state, target);
        isInternalChange = false;
        notify();
        return true;
      }
      return false;
    },
    redo(): boolean {
      if (pointer < past.length - 1) {
        pointer++;
        isInternalChange = true;
        const target = clone(past[pointer]);
        Object.assign(baseStore.state, target);
        isInternalChange = false;
        notify();
        return true;
      }
      return false;
    },
    get canUndo() {
      return pointer > 0;
    },
    get canRedo() {
      return pointer < past.length - 1;
    },
    get history() {
      return past;
    },
    reset() {
      pointer = 0;
      past = [clone(initialSnapshot)];
      isInternalChange = true;
      baseStore.reset();
      isInternalChange = false;
      notify();
    },
    subscribe(listener: Listener) {
      const unsub1 = baseStore.subscribe(listener);
      listeners.add(listener);
      return () => {
        unsub1();
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return {
        canUndo: pointer > 0,
        canRedo: pointer < past.length - 1,
        length: past.length,
        pointer
      };
    }
  };
}

/**
 * Hook to consume a time-travel history store
 */
export function useHistoryStore<T extends object>(historyStore: HistoryStore<T>) {
  useSyncExternalStore(
    historyStore.subscribe,
    historyStore.getSnapshot,
    historyStore.getSnapshot
  );

  return {
    state: historyStore.state,
    undo: historyStore.undo,
    redo: historyStore.redo,
    canUndo: historyStore.canUndo,
    canRedo: historyStore.canRedo,
    history: historyStore.history,
    reset: historyStore.reset
  };
}
