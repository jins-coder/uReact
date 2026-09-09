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

export function HooksReferencePage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">Reference &gt; Complete Hooks Reference</div>

      <h1 className="doc-title">Complete Hooks Reference</h1>
      <p className="doc-lead">
        Comprehensive API reference for all hooks included in <code>ureact</code>, covering state, React 19 actions, lifecycles, SWR queries, and browser integrations.
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px', color: 'var(--accent-cyan)' }}>Hook Name</th>
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
                  background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent'
                }}
              >
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  {hook.name}
                </td>
                <td style={{ padding: '12px', color: 'var(--accent-indigo)' }}>
                  {hook.category}
                </td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
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
