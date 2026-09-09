import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';
import { YouWillLearn } from '../../components/YouWillLearn';
import { ReactDevChallenge } from '../../components/ReactDevChallenge';
import { StateDemo } from '../../examples/StateDemo';
import { Sparkles, Layers, RefreshCw, Cpu } from 'lucide-react';

export function ReactiveStatePage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">
        <span>LEARN REACT</span>
        <span>&gt;</span>
        <span style={{ color: 'var(--text-main)' }}>MANAGING STATE</span>
      </div>

      <h1 className="doc-title">createStore &amp; view()</h1>
      <p className="doc-lead">
        State in React shouldn't require complex immutable update rituals. With <code>createStore</code>, you define your state as a regular JavaScript object and mutate it directly (e.g. <code>state.count++</code> or <code>state.items.push(x)</code>). When wrapped with <code>view()</code>, components automatically re-render with <strong>zero hook calls</strong>.
      </p>

      {/* react.dev "You will learn" Summary */}
      <YouWillLearn
        items={[
          'How createStore wraps objects in ES6 Proxies to detect deep mutations',
          'How view() tracks accessed properties during render without useStore() calls',
          'How batch() coalesces multiple synchronous mutations into a single re-render',
          'Common pitfalls when destructuring state properties outside of view()'
        ]}
      />

      <h2 id="overview">1. How createStore Works</h2>
      <p>
        <code>createStore</code> takes an initial state object or array and wraps it in a deep ES6 Proxy. Whenever a property is accessed or modified, the store tracks the operation and coordinates with React's reconciler.
      </p>

      <CodeBlock
        code={`import { createStore, view } from 'ureact';

// 1. Create a reactive store with state and actions
export const counterStore = createStore({
  count: 0,
  inc() {
    this.count++;
  },
  dec() {
    this.count--;
  }
});

// 2. Wrap the component with view()
export const Counter = view(() => (
  <div>
    <span>Count: {counterStore.state.count}</span>
    <button onClick={() => counterStore.state.inc()}>+1</button>
  </div>
));`}
        language="tsx"
        title="counterStore.ts"
        showLineNumbers
        highlightLines={[4, 7, 8, 14, 17, 18]}
      />

      {/* react.dev Deep Dive Card */}
      <Callout type="deep-dive" title="How does view() subscribe to stores without calling hooks?">
        When a component wrapped in <code>view()</code> begins its render cycle, uReact sets an internal active subscriber context. As JSX reads properties like <code>store.state.count</code>, proxy <code>get</code> traps record the store reference. Upon render completion, uReact registers a listener using React 18/19's <code>useSyncExternalStore</code>. You never need to write manual dependency arrays or call <code>useStore(store)</code>!
      </Callout>

      <h2 id="batching">2. Automatic &amp; Manual Batching</h2>
      <p>
        Multiple property assignments within the same event loop tick are automatically batched. For synchronous loops or multi-store transitions, you can also use <code>batch()</code>:
      </p>

      <CodeBlock
        code={`import { batch } from 'ureact';

batch(() => {
  userStore.state.name = 'Elena';
  userStore.state.role = 'Architect';
  cartStore.state.items.push(newItem);
}); // Triggers only ONE React re-render!`}
        language="tsx"
        title="Batching Example"
        showLineNumbers
      />

      {/* react.dev Pitfall Card */}
      <Callout type="pitfall" title="Do not destructure state outside of view() render phase">
        If you write <code>{'const { count } = store.state;'}</code> in module scope or before an asynchronous event, you will capture a static snapshot value rather than a reactive reference. Always read <code>store.state.property</code> directly inside your <code>view()</code> component render function!
      </Callout>

      <h2 id="live-demo">3. Interactive Live Playground</h2>
      <p style={{ marginBottom: '16px' }}>
        Test direct mutations, shopping cart additions, and local state below:
      </p>

      {/* Embedded Live Interactive Widget */}
      <StateDemo />

      {/* react.dev Challenges */}
      <h2 id="challenges" style={{ marginTop: '48px' }}>
        Try Out Some Challenges
      </h2>

      <ReactDevChallenge
        number={1}
        total={1}
        title="Create a reactive shopping cart store"
        description={
          <div>
            <p>
              Create a store named <code>cartStore</code> with an <code>items</code> array and a <code>total</code> getter method that computes the sum of item prices.
            </p>
          </div>
        }
        solution={
          <div>
            <p>Define the store with array methods:</p>
            <CodeBlock
              code={`import { createStore, view } from 'ureact';

export const cartStore = createStore({
  items: [
    { id: 1, name: 'Mechanical Keyboard', price: 129 },
    { id: 2, name: 'USB-C Cable', price: 19 }
  ],
  addItem(item) {
    this.items.push(item);
  },
  get total() {
    return this.items.reduce((sum, i) => sum + i.price, 0);
  }
});`}
              language="tsx"
            />
          </div>
        }
      />
    </article>
  );
}
