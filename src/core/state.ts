import { useSyncExternalStore, useRef, useCallback, useEffect } from 'react';
import { Listener, Store, Signal, Unsubscribe } from './types';

// Track active batching
let isBatching = false;
let pendingBatchListeners = new Set<Listener>();

function notifyBatch() {
  if (isBatching) return;
  const toNotify = Array.from(pendingBatchListeners);
  pendingBatchListeners.clear();
  for (const listener of toNotify) {
    listener();
  }
}

/**
 * Deep clone for snapshotting
 */
function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;
  if (Array.isArray(obj)) {
    return obj.map(item => cloneDeep(item)) as any;
  }
  const copy: any = {};
  for (const key of Object.keys(obj)) {
    copy[key] = cloneDeep((obj as any)[key]);
  }
  return copy;
}

/**
 * Creates a reactive deep proxy store.
 * Updates happen via direct mutable assignments (e.g. `state.user.name = 'Bob'` or `state.items.push(x)`),
 * while React components subscribe cleanly via `useSyncExternalStore`.
 */
export function createStore<T extends object>(initialState: T): Store<T> {
  const initialClone = cloneDeep(initialState);
  let rawState: T = cloneDeep(initialState);
  let version = 0;
  let snapshot: T = rawState;
  const listeners = new Set<Listener>();

  function updateSnapshot() {
    version++;
    // Create a new reference for React's reconciliation
    snapshot = Array.isArray(rawState) ? ([...rawState] as any) : { ...rawState };
    if (isBatching) {
      listeners.forEach(l => pendingBatchListeners.add(l));
    } else {
      listeners.forEach(l => l());
    }
  }

  function createDeepProxy<O extends object>(target: O): O {
    const proxyMap = new WeakMap<object, object>();

    function wrap<V>(val: V): V {
      if (val !== null && typeof val === 'object') {
        if (proxyMap.has(val as object)) {
          return proxyMap.get(val as object) as V;
        }
        const p = new Proxy(val as object, handler);
        proxyMap.set(val as object, p);
        return p as V;
      }
      return val;
    }

    const handler: ProxyHandler<object> = {
      get(t: any, prop: string | symbol, receiver: any) {
        const val = Reflect.get(t, prop, receiver);
        // Bind functions (actions) to the proxy so 'this' refers to reactive state
        if (typeof val === 'function') {
          return val.bind(proxy);
        }
        return wrap(val);
      },
      set(t: any, prop: string | symbol, value: any, receiver: any) {
        const prev = Reflect.get(t, prop, receiver);
        if (prev !== value) {
          const result = Reflect.set(t, prop, value, receiver);
          updateSnapshot();
          return result;
        }
        return true;
      },
      deleteProperty(t: any, prop: string | symbol) {
        const had = Reflect.has(t, prop);
        const res = Reflect.deleteProperty(t, prop);
        if (had) {
          updateSnapshot();
        }
        return res;
      }
    };

    const proxy = new Proxy(target, handler) as O;
    return proxy;
  }

  const proxyState = createDeepProxy(rawState);

  function applyStateInPlace(target: any, source: any) {
    if (Array.isArray(target) && Array.isArray(source)) {
      target.length = 0;
      target.push(...cloneDeep(source));
    } else {
      for (const key of Object.keys(target)) {
        if (!(key in source)) {
          delete target[key];
        }
      }
      Object.assign(target, cloneDeep(source));
    }
  }

  return {
    get state() {
      return proxyState;
    },
    subscribe(listener: Listener): Unsubscribe {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return snapshot;
    },
    reset() {
      applyStateInPlace(rawState, initialClone);
      updateSnapshot();
    },
    replace(newState: T) {
      applyStateInPlace(rawState, newState);
      updateSnapshot();
    },
    batch(fn: () => void) {
      const wasBatching = isBatching;
      isBatching = true;
      try {
        fn();
      } finally {
        if (!wasBatching) {
          isBatching = false;
          notifyBatch();
        }
      }
    }
  };
}

/**
 * React hook to consume a `createStore` instance.
 * Automatically subscribes component to updates with zero stale closure bugs.
 */
export function useStore<T extends object>(store: Store<T>): T {
  useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  return store.state;
}

/**
 * Creates a component-local reactive store.
 * Perfect replacement for complex multi-useState setups.
 */
export function useLocalStore<T extends object>(initialState: T | (() => T)): T {
  const storeRef = useRef<Store<T> | null>(null);
  if (!storeRef.current) {
    const init = typeof initialState === 'function' ? (initialState as () => T)() : initialState;
    storeRef.current = createStore(init);
  }
  return useStore(storeRef.current);
}

/**
 * Lightweight primitive Signal for single reactive values
 */
export function signal<T>(initialValue: T): Signal<T> {
  let val = initialValue;
  const listeners = new Set<Listener>();

  return {
    get value() {
      return val;
    },
    set value(newVal: T) {
      if (val !== newVal) {
        val = newVal;
        listeners.forEach(l => l());
      }
    },
    get() {
      return val;
    },
    set(newVal: T | ((prev: T) => T)) {
      const next = typeof newVal === 'function' ? (newVal as (prev: T) => T)(val) : newVal;
      if (val !== next) {
        val = next;
        listeners.forEach(l => l());
      }
    },
    update(fn: (prev: T) => T) {
      this.set(fn);
    },
    subscribe(listener: Listener): Unsubscribe {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return val;
    }
  };
}

/**
 * Hook to subscribe to a Signal
 */
export function useSignal<T>(sig: Signal<T>): [T, (val: T | ((prev: T) => T)) => void, Signal<T>] {
  const val = useSyncExternalStore(
    sig.subscribe,
    sig.getSnapshot,
    sig.getSnapshot
  );

  const setter = useCallback((newVal: T | ((prev: T) => T)) => {
    sig.set(newVal);
  }, [sig]);

  return [val, setter, sig];
}

/**
 * Global batch function
 */
export function batch(fn: () => void) {
  const wasBatching = isBatching;
  isBatching = true;
  try {
    fn();
  } finally {
    if (!wasBatching) {
      isBatching = false;
      notifyBatch();
    }
  }
}
