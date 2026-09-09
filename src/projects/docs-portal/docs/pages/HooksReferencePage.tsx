import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

const HOOKS_CATALOG = [
  {
    name: 'useStore(store)',
    category: 'Core Reactive State',
    returns: 'T',
    description: 'Subscribes a component to an external createStore using useSyncExternalStore.'
  },
  {
    name: 'useLocalStore(initialState)',
    category: 'Core Reactive State',
    returns: 'T',
    description: 'Creates a component-scoped deep proxy store. Replaces multi-useState setups.'
  },
  {
    name: 'useSignal(signal)',
    category: 'Core Reactive State',
    returns: '[value, setter, signal]',
    description: 'Lightweight reactive scalar primitive with direct get/set.'
  },
  {
    name: 'useAction(actionFn, initial, options)',
    category: 'React 19 Actions',
    returns: '{ data, isPending, error, run, formAction, reset }',
    description: 'Wraps React 19 useActionState + useOptimistic with typed payloads.'
  },
  {
    name: 'useActionStatus()',
    category: 'React 19 Actions',
    returns: '{ pending, data, method, action }',
    description: 'Safe wrapper around react-dom useFormStatus with fallback outside forms.'
  },
  {
    name: 'useFormReset()',
    category: 'React 19 Actions',
    returns: '(formElement) => void',
    description: 'Native form reset function using React 19 requestFormReset.'
  },
  {
    name: 'useActionTransition()',
    category: 'React 19 Concurrency',
    returns: '{ isPending, run, error, startTransition }',
    description: 'React 19 async transition runner with automatic error capture.'
  },
  {
    name: 'useDeferred(value, initialValue)',
    category: 'React 19 Concurrency',
    returns: 'T',
    description: 'React 19 useDeferredValue with support for initial fallback values.'
  },
  {
    name: 'usePromise(promise)',
    category: 'React 19 Suspense',
    returns: 'T',
    description: 'React 19 use(Promise) wrapper with automatic promise status tracking.'
  },
  {
    name: 'useMount(fn)',
    category: 'Lifecycles',
    returns: 'void',
    description: 'Executes once when component mounts. Zero empty dependency array boilerplate.'
  },
  {
    name: 'useUnmount(fn)',
    category: 'Lifecycles',
    returns: 'void',
    description: 'Clean unmount callback without return statements inside useEffect.'
  },
  {
    name: 'useWatch(fn, deps, options)',
    category: 'Lifecycles',
    returns: 'void',
    description: 'Smart watcher providing previous and next dependency values.'
  },
  {
    name: 'useQuery(key, fetcher, options)',
    category: 'Data Fetching',
    returns: '{ data, loading, error, refetch }',
    description: 'Global SWR cache, request deduplication, and window focus revalidation.'
  },
  {
    name: 'useMutation(mutationFn, options)',
    category: 'Data Fetching',
    returns: '{ mutate, loading, error, data }',
    description: 'Optimistic mutation with automatic context rollback on server errors.'
  },
  {
    name: 'useShortcut(keys, handler, options)',
    category: 'Browser & DOM',
    returns: 'void',
    description: 'Declarative keyboard hotkeys (e.g. "mod+k", "ctrl+z", "escape").'
  },
  {
    name: 'useInView(options)',
    category: 'Browser & DOM',
    returns: '{ ref, inView, entry }',
    description: 'Intersection Observer hook for viewport detection and lazy animations.'
  },
  {
    name: 'useQueryParam(key, defaultValue)',
    category: 'Browser & DOM',
    returns: '[value, setValue]',
    description: 'Two-way reactive URL search parameter synchronization.'
  },
  {
    name: 'useCounter(initialValue)',
    category: '1-Line Primitives',
    returns: '{ value, inc, dec, reset, set }',
    description: '1-line reactive counter state.'
  },
  {
    name: 'useArray(initialItems)',
    category: '1-Line Primitives',
    returns: '{ items, push, remove, clear, reset, set }',
    description: '1-line array state manager with built-in push/remove.'
  }
];

const OFFICIAL_REACT_HOOKS = [
  {
    name: 'useState',
    version: 'React 16.8+',
    purpose: 'Local component state management.',
    signature: 'const [state, setState] = useState(initialState)',
    ureactEquivalent: 'createStore / useLocalStore / signal',
    whyBetter: 'Direct proxy mutations (user.name = "Alex"), 0 setter boilerplate, automated input 2-way binding with store.$bind.'
  },
  {
    name: 'useReducer',
    version: 'React 16.8+',
    purpose: 'Complex state updates with action dispatches & reducers.',
    signature: 'const [state, dispatch] = useReducer(reducer, initialArg, init)',
    ureactEquivalent: 'createStore with direct methods',
    whyBetter: 'Eliminates switch/case action ceremony. Call store.increment() or state mutations directly.'
  },
  {
    name: 'useRef',
    version: 'React 16.8+',
    purpose: 'Mutable container that persists without triggering re-renders; DOM element references.',
    signature: 'const ref = useRef(initialValue)',
    ureactEquivalent: 'Native useRef + signal (for reactive refs)',
    whyBetter: 'Fully compatible. Pair with signals for fine-grained scalar tracking without re-renders.'
  },
  {
    name: 'useImperativeHandle',
    version: 'React 16.8+',
    purpose: 'Customizes the ref handle exposed by forwardRef to parent components.',
    signature: 'useImperativeHandle(ref, createHandle, [deps])',
    ureactEquivalent: 'Native useImperativeHandle',
    whyBetter: 'Fully compatible. In React 19, forwardRef is optional (ref is a direct prop).'
  },
  {
    name: 'useEffect',
    version: 'React 16.8+',
    purpose: 'Side-effects after render (DOM mutations, data fetching, subscriptions).',
    signature: 'useEffect(() => { ... return cleanup }, [deps])',
    ureactEquivalent: 'useMount / useUnmount / useWatch',
    whyBetter: 'Separates lifecycles into explicit hooks. Zero empty [] array traps or stale closure bugs.'
  },
  {
    name: 'useLayoutEffect',
    version: 'React 16.8+',
    purpose: 'Synchronous execution after DOM mutations before browser paints (measurements/layout shifts).',
    signature: 'useLayoutEffect(() => { ... }, [deps])',
    ureactEquivalent: 'Native useLayoutEffect + useWatch({ flush: "sync" })',
    whyBetter: 'Prevents visual layout flashes and layout thrashing.'
  },
  {
    name: 'useInsertionEffect',
    version: 'React 18+',
    purpose: 'Synchronous execution before DOM mutations for CSS-in-JS library rule injections.',
    signature: 'useInsertionEffect(() => { ... }, [deps])',
    ureactEquivalent: 'Native useInsertionEffect',
    whyBetter: 'Specialized for CSS-in-JS style sheet tag insertion.'
  },
  {
    name: 'useMemo',
    version: 'React 16.8+',
    purpose: 'Caches the calculated result of expensive computations between re-renders.',
    signature: 'const cachedValue = useMemo(calculateValue, [deps])',
    ureactEquivalent: 'computed(fn) / view() auto-memoization',
    whyBetter: 'uReact proxy stores compute derived state on-demand without manual dependency arrays.'
  },
  {
    name: 'useCallback',
    version: 'React 16.8+',
    purpose: 'Caches a function definition between re-renders to prevent child component re-renders.',
    signature: 'const cachedFn = useCallback(fn, [deps])',
    ureactEquivalent: 'store actions / event modifiers (prevent, stop)',
    whyBetter: 'Store action methods are permanently stable references that never recreate.'
  },
  {
    name: 'useContext',
    version: 'React 16.8+',
    purpose: 'Reads and subscribes to a React context value.',
    signature: 'const value = useContext(MyContext)',
    ureactEquivalent: 'use(MyContext) / global createStore',
    whyBetter: 'Global createStore() replaces context boilerplate without Provider wrapper nesting.'
  },
  {
    name: 'use(Resource)',
    version: 'React 19',
    purpose: 'Unwraps promises or reads context conditionally inside loops and if-branches.',
    signature: 'const data = use(Promise | Context)',
    ureactEquivalent: 'usePromise / useResource / <Await for={...}>',
    whyBetter: 'Works inside conditionals; paired with <Await> for declarative promise resolution in JSX.'
  },
  {
    name: 'useActionState',
    version: 'React 19',
    purpose: 'Handles async form actions with automatic pending status, errors, and returned state.',
    signature: 'const [state, formAction, isPending] = useActionState(fn, initial)',
    ureactEquivalent: 'useAction(fn, initial) / <ActionForm>',
    whyBetter: 'uReact adds typed payloads, auto error capture, reset helpers, and optimistic rollback.'
  },
  {
    name: 'useOptimistic',
    version: 'React 19',
    purpose: 'Displays immediate optimistic UI updates while background async actions execute.',
    signature: 'const [optimistic, setOptimistic] = useOptimistic(state, updateFn)',
    ureactEquivalent: 'useOptimisticAction / useMutation',
    whyBetter: 'Automates rollback on server failure; integrates with reactive proxy stores.'
  },
  {
    name: 'useFormStatus',
    version: 'React 19 (react-dom)',
    purpose: 'Reads parent form pending status, form action URL, and submitted FormData.',
    signature: 'const { pending, data, method, action } = useFormStatus()',
    ureactEquivalent: 'useActionStatus / <ActionSubmitButton>',
    whyBetter: 'Safe execution outside <form> boundaries without throwing unexpected runtime errors.'
  },
  {
    name: 'useTransition',
    version: 'React 18+',
    purpose: 'Marks state updates as non-blocking transitions, preserving main thread responsiveness.',
    signature: 'const [isPending, startTransition] = useTransition()',
    ureactEquivalent: 'useActionTransition / batch(fn)',
    whyBetter: 'React 19 async transition support with automatic error boundary capture.'
  },
  {
    name: 'useDeferredValue',
    version: 'React 18 / 19',
    purpose: 'Defers updating a secondary part of the UI while user typing is active.',
    signature: 'const deferredValue = useDeferredValue(value, initialValue?)',
    ureactEquivalent: 'useDeferred / useDebounce',
    whyBetter: 'React 19 initialValue fallback support + debounced scalar timing.'
  },
  {
    name: 'useSyncExternalStore',
    version: 'React 18+',
    purpose: 'Subscribes to external state stores with tearing-free concurrent rendering guarantees.',
    signature: 'useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)',
    ureactEquivalent: 'Core engine of uReact createStore()',
    whyBetter: 'uReact wraps this internally so developers never have to write low-level snapshot getters.'
  },
  {
    name: 'useId',
    version: 'React 18+',
    purpose: 'Generates unique IDs accessible for ARIA accessibility attributes and form associations.',
    signature: 'const id = useId()',
    ureactEquivalent: 'Native useId / auto-generated in <AutoForm>',
    whyBetter: 'Built directly into uReact <AutoForm> inputs for zero-configuration WCAG compliance.'
  },
  {
    name: 'useDebugValue',
    version: 'React 16.8+',
    purpose: 'Displays a custom label for custom hooks in React DevTools.',
    signature: 'useDebugValue(value, formatFn?)',
    ureactEquivalent: 'Native useDebugValue',
    whyBetter: 'Integrated into uReact core hooks for clear inspection in React DevTools.'
  }
];

export function HooksReferencePage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">Reference &gt; Complete Hooks &amp; "use" API Reference</div>

      <h1 className="doc-title">Complete Hooks &amp; "use" API Reference</h1>
      <p className="doc-lead">
        Exhaustive reference of <strong>every official React hook and "use" function</strong> (from React 16.8 up to React 19) alongside the <strong>uReact</strong> developer-first equivalents.
      </p>

      {/* Section 1: Official React Hooks Matrix */}
      <h2 id="all-react-hooks" style={{ marginTop: '36px', marginBottom: '16px' }}>
        1. Every Official React Hook (React 16.8 → React 19)
      </h2>
      <p>
        The table below catalogs all 19 official React hooks, their version introduction, their native signature, and their corresponding uReact ergonomic replacement:
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }} className="table-container">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left', background: 'var(--bg-secondary)' }}>
              <th style={{ padding: '12px', color: 'var(--accent-cyan)' }}>React Hook</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Version</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Purpose &amp; Signature</th>
              <th style={{ padding: '12px', color: 'var(--accent-emerald)' }}>uReact Equivalent</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Developer Advantage</th>
            </tr>
          </thead>
          <tbody>
            {OFFICIAL_REACT_HOOKS.map((hook, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  background: i % 2 === 0 ? 'var(--bg-card-hover)' : 'transparent'
                }}
              >
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {hook.name}()
                </td>
                <td style={{ padding: '12px', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  {hook.version}
                </td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{hook.purpose}</div>
                  <code style={{ fontSize: '0.76rem', color: 'var(--accent-indigo)' }}>{hook.signature}</code>
                </td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                  {hook.ureactEquivalent}
                </td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {hook.whyBetter}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: uReact Specialized Hooks Catalog */}
      <h2 id="ureact-hooks-catalog" style={{ marginTop: '48px', marginBottom: '16px' }}>
        2. uReact Specialized Ergonomic Hooks
      </h2>
      <p>
        In addition to streamlining native React hooks, uReact includes high-productivity hooks for async tasks, collections, hotkeys, and SWR caching:
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }} className="table-container">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left', background: 'var(--bg-secondary)' }}>
              <th style={{ padding: '12px', color: 'var(--accent-cyan)' }}>uReact Hook</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Category</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Return Type</th>
              <th style={{ padding: '12px', color: 'var(--text-main)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {HOOKS_CATALOG.map((hook, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  background: i % 2 === 0 ? 'var(--bg-card-hover)' : 'transparent'
                }}
              >
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  {hook.name}
                </td>
                <td style={{ padding: '12px', color: 'var(--accent-indigo)' }}>
                  {hook.category}
                </td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                  {hook.returns}
                </td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                  {hook.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

