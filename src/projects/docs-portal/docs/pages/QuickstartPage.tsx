import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';
import { Sparkles, Terminal, Package, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export function QuickstartPage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">Getting Started &gt; Quickstart &amp; Architecture</div>

      <h1 className="doc-title">Quickstart &amp; Architecture</h1>
      <p className="doc-lead">
        <strong>uReact</strong> is an ergonomic, developer-first framework built directly on top of <strong>React 19</strong>. It eliminates hook dependency arrays, stale closure bugs, and repetitive ceremony across state, forms, async tasks, and control flow—while remaining 100% compatible with native React.
      </p>

      <Callout type="tip" title="Pure React Under The Hood">
        uReact does not invent a proprietary virtual DOM or incompatible runtime. Every uReact component is a genuine React functional component, and every reactive store uses React's official <code>useSyncExternalStore</code> and React 19 Fiber reconciler.
      </Callout>

      <h2 id="installation">1. Installation</h2>
      <p>Install uReact using your preferred package manager alongside React 19:</p>

      <CodeBlock
        code={`npm install ureact react@^19.0.0 react-dom@^19.0.0`}
        language="bash"
        title="Terminal"
      />

      <h2 id="first-component">2. Your First uReact Component</h2>
      <p>
        In standard React, creating a reactive form with state requires importing <code>useState</code>, writing repetitive <code>onChange</code> handlers, calling <code>e.preventDefault()</code>, and managing re-render subscriptions.
      </p>
      <p>
        With uReact, simply create a reactive store, wrap your component in <code>view()</code>, and two-way bind inputs directly in one attribute with <code>store.$bind</code>:
      </p>

      <CodeBlock
        code={`import { createStore, view, prevent } from 'ureact';

// 1. Define a reactive deep proxy store
export const userStore = createStore({
  name: 'Alex Chen',
  role: 'Engineer',
  newsletter: true
});

// 2. view() automatically subscribes to all store properties read during render
export const UserProfile = view(() => (
  <form onSubmit={prevent(() => alert('Saved: ' + userStore.state.name))}>
    <h3>Welcome, {userStore.state.name}!</h3>

    {/* Direct two-way binding: zero value/onChange ceremony */}
    <input {...userStore.$bind.name} placeholder="Name" />
    <input {...userStore.$bind.role} placeholder="Role" />
    
    <label>
      <input type="checkbox" {...userStore.$bind.newsletter} />
      Subscribe to weekly updates
    </label>

    <button type="submit">Save Profile</button>
  </form>
));`}
        language="tsx"
        title="UserProfile.tsx"
        showLineNumbers
      />

      <h2 id="architecture">3. Architectural Deep Dive</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', margin: '20px 0' }}>
        <div className="widget-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
            <Zap size={18} /> ES6 Deep Proxy Engine
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Stores use deep nested JavaScript Proxies. Mutations like <code>store.state.cart.items.push(item)</code> are intercepted at the property level and cleanly dispatched to React's concurrent rendering loop.
          </p>
        </div>

        <div className="widget-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo)' }}>
            <CheckCircle2 size={18} /> React 18/19 useSyncExternalStore
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Subscriptions are established via React's official synchronization hook. This provides guaranteed tearing-free rendering, time-slicing compatibility, and zero stale closures.
          </p>
        </div>

        <div className="widget-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)' }}>
            <Sparkles size={18} /> React 19 Native Integration
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Native support for React 19 Actions (<code>useAction</code>), 0ms optimistic UI (<code>useOptimistic</code>), resource preloading (<code>preload</code>, <code>preconnect</code>), and document metadata hoisting.
          </p>
        </div>
      </div>

      <Callout type="note" title="Zero Dependencies">
        uReact has <strong>zero external dependencies</strong> outside of peer <code>react</code> and <code>react-dom</code>. It compiles into clean, tree-shakeable ESM (<code>39 kB</code>) and CommonJS distributions.
      </Callout>
    </article>
  );
}
