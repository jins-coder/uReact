import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';
import { StateDemo } from '../../examples/StateDemo';
import { Sparkles, Layers, RefreshCw, Cpu } from 'lucide-react';

export function ReactiveStatePage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">Reactive State &gt; createStore &amp; view()</div>

      <h1 className="doc-title">createStore &amp; view()</h1>
      <p className="doc-lead">
        State in React shouldn't require complex immutable update rituals. With <code>createStore</code>, you define your state as a regular JavaScript object and mutate it directly (e.g. <code>state.count++</code> or <code>state.items.push(x)</code>). When wrapped with <code>view()</code>, components automatically re-render with <strong>zero hook calls</strong>.
      </p>

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
      />

      <Callout type="tip" title="view() Eliminates useStore() Inside Components">
        When a component is wrapped with <code>view()</code>, any read of <code>store.state.foo</code> inside the render function is automatically tracked. You don't even need to call <code>useStore(store)</code>!
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
      />

      <h2 id="live-demo">3. Interactive Live Playground</h2>
      <p style={{ marginBottom: '16px' }}>
        Test direct mutations, shopping cart additions, and local state below:
      </p>

      {/* Embedded Live Interactive Widget */}
      <StateDemo />
    </article>
  );
}
