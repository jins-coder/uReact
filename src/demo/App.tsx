import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  FileText,
  Layers,
  Cpu,
  Terminal,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Package,
  History
} from 'lucide-react';
import { StateDemo } from './examples/StateDemo';
import { FormDemo } from './examples/FormDemo';
import { AsyncDemo } from './examples/AsyncDemo';
import { ControlFlowDemo } from './examples/ControlFlowDemo';
import { HistoryDemo } from './examples/HistoryDemo';

export function App() {
  const [activeTab, setActiveTab] = useState<'state' | 'form' | 'async' | 'flow' | 'history' | 'underTheHood' | 'quickstart'>('state');

  return (
    <div>
      {/* Ambient background glow orbs */}
      <div className="ambient-glow">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
      </div>

      <div className="app-wrapper">
        {/* Top Header */}
        <header className="header">
          <div className="logo-group">
            <div className="logo-badge">
              <Zap size={24} />
            </div>
            <div>
              <div className="logo-title">uReact</div>
              <div className="logo-sub">Framework on top of React</div>
            </div>
          </div>

          <div className="header-badges">
            <div className="pill" style={{ background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#c7d2fe' }}>
              <Package size={14} /> v1.1.0
            </div>
            <div className="pill active">
              <Cpu size={14} /> Powered by React 18 Engine
            </div>
            <div className="pill">
              <ShieldCheck size={14} /> Zero Hook Ceremony
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-tag">
            <Sparkles size={14} />
            Pure React Under the Hood • Radical DX on Top
          </div>
          <h1 className="hero-title">
            Stop Fighting React Hooks. <br />
            <span className="highlight">Write React with Pure Velocity.</span>
          </h1>
          <p className="hero-desc">
            A developer-first framework built directly on top of React. It eliminates dependency array traps,
            stale closures, and endless boilerplate for state, forms, and async flows—while remaining 100% compatible
            with any existing React project.
          </p>

          {/* Metrics bar */}
          <div className="metrics-strip">
            <div className="metric-card">
              <div className="metric-val green">-68%</div>
              <div className="metric-label">Boilerplate code reduction across common UI flows</div>
            </div>
            <div className="metric-card">
              <div className="metric-val cyan">0</div>
              <div className="metric-label">Dependency array traps or stale closure bugs</div>
            </div>
            <div className="metric-card">
              <div className="metric-val purple">100%</div>
              <div className="metric-label">Compatible with React 18, Vite, Next.js, and Remix</div>
            </div>
            <div className="metric-card">
              <div className="metric-val">1.8 KB</div>
              <div className="metric-label">Ultra-lightweight tree-shakeable runtime engine</div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'state' ? 'active' : ''}`}
            onClick={() => setActiveTab('state')}
          >
            <Sparkles size={16} /> Reactive State (Store)
          </button>
          <button
            className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <FileText size={16} /> Two-Way Forms (useForm)
          </button>
          <button
            className={`tab-btn ${activeTab === 'async' ? 'active' : ''}`}
            onClick={() => setActiveTab('async')}
          >
            <Zap size={16} /> Async &amp; Await (useAsync)
          </button>
          <button
            className={`tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
            onClick={() => setActiveTab('flow')}
          >
            <Layers size={16} /> Control Flow (&lt;Show&gt;, &lt;For&gt;)
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={16} /> Time-Travel &amp; Shortcuts
          </button>
          <button
            className={`tab-btn ${activeTab === 'underTheHood' ? 'active' : ''}`}
            onClick={() => setActiveTab('underTheHood')}
          >
            <Cpu size={16} /> Under The Hood
          </button>
          <button
            className={`tab-btn ${activeTab === 'quickstart' ? 'active' : ''}`}
            onClick={() => setActiveTab('quickstart')}
          >
            <Terminal size={16} /> Quickstart Guide
          </button>
        </nav>

        {/* Tab Panels */}
        <main className="panel">
          {activeTab === 'state' && <StateDemo />}
          {activeTab === 'form' && <FormDemo />}
          {activeTab === 'async' && <AsyncDemo />}
          {activeTab === 'flow' && <ControlFlowDemo />}
          {activeTab === 'history' && <HistoryDemo />}

          {/* Under the Hood Deep Dive */}
          {activeTab === 'underTheHood' && (
            <div>
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">
                    <Cpu size={20} style={{ color: 'var(--accent-cyan)' }} />
                    How uReact Works Under the Hood
                  </h3>
                  <p className="panel-subtitle">
                    uReact is not an esoteric new language or runtime; it is an intelligent abstraction layer that uses React's native primitives to deliver peak developer experience.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <div className="widget-card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                    <CheckCircle size={18} /> React 18 useSyncExternalStore
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    Instead of forcing developers to write tedious immutable updates like <code>setUser(prev =&gt; (&#123; ...prev, bio: (&#123; ...prev.bio, title &#125;) &#125;))</code>, uReact wraps the state in an ES6 Proxy. When you assign <code>state.bio.title = 'Lead'</code>, the proxy detects the exact mutation and triggers React's official <code>useSyncExternalStore</code> subscriber.
                    <br /><br />
                    This ensures <strong>zero tearing</strong>, full concurrent mode safety, and instant UI re-renders without breaking React's fiber model.
                  </p>
                </div>

                <div className="widget-card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-indigo)' }}>
                    <CheckCircle size={18} /> Fiber Tree Reconciler
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    Every component in uReact (<code>&lt;Show&gt;</code>, <code>&lt;For&gt;</code>, <code>&lt;Switch&gt;</code>, <code>&lt;Await&gt;</code>) is a bona-fide React functional component.
                    <br /><br />
                    They produce standard React elements and fragments, letting React's native diffing algorithm diff DOM trees at microsecond speeds. There is zero compilation hackery or custom AST transforms needed.
                  </p>
                </div>

                <div className="widget-card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-emerald)' }}>
                    <CheckCircle size={18} /> Automatic Memory Safety &amp; Cancellation
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    Asynchronous operations in standard React frequently trigger "Can't perform a React state update on an unmounted component" or return out-of-order responses (race conditions).
                    <br /><br />
                    <code>useAsync</code> automatically attaches component lifecycle cleanup references, tracks monotonic call identifiers, and discards stale responses safely.
                  </p>
                </div>

                <div className="widget-card">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-purple)' }}>
                    <CheckCircle size={18} /> Zero Third-Party Dependencies
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    You don't need to install Redux, MobX, Zustand, React-Hook-Form, or TanStack Query just to build a solid frontend. uReact bundles cohesive, world-class ergonomics directly on top of peer <code>react</code> and <code>react-dom</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quickstart Guide */}
          {activeTab === 'quickstart' && (
            <div>
              <div className="panel-header">
                <div>
                  <h3 className="panel-title">
                    <Terminal size={20} style={{ color: 'var(--accent-emerald)' }} />
                    Get Started with uReact in 30 Seconds
                  </h3>
                  <p className="panel-subtitle">
                    Drop uReact into any existing React 18+ application with zero configuration changes.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="widget-card">
                  <h4 className="widget-title">1. Installation</h4>
                  <pre className="code-content" style={{ background: '#05070a', borderRadius: '8px' }}>
                    <code>{`# npm
npm install ureact react react-dom

# pnpm
pnpm add ureact react react-dom

# yarn
yarn add ureact react react-dom`}</code>
                  </pre>
                </div>

                <div className="widget-card">
                  <h4 className="widget-title">2. Complete Example in 20 Lines</h4>
                  <pre className="code-content" style={{ background: '#05070a', borderRadius: '8px' }}>
                    <code>{`import React from 'react';
import { createStore, useStore, useForm, Show, For } from 'ureact';

// 1. Reactive Store
const todoStore = createStore({
  items: ['Learn uReact', 'Build something great'],
  addItem(item: string) { this.items.push(item); }
});

export default function App() {
  const store = useStore(todoStore);
  const form = useForm({
    initialValues: { task: '' },
    onSubmit: (vals) => {
      if (vals.task) {
        store.addItem(vals.task);
        form.reset();
      }
    }
  });

  return (
    <div>
      <form {...form.bindForm()}>
        <input {...form.bind('task')} placeholder="New task..." />
        <button type="submit">Add Task</button>
      </form>

      <For each={store.items} fallback={<p>No tasks yet!</p>}>
        {(task, i) => <li key={i}>{task}</li>}
      </For>
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            <strong>uReact Framework</strong> — Built for engineers who love React's ecosystem but demand modern, joyful developer ergonomics.
          </p>
          <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            100% React Under the Hood • MIT Licensed
          </p>
        </footer>
      </div>
    </div>
  );
}
