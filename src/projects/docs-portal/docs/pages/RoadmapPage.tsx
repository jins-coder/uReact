import React, { useState } from 'react';
import { Sparkles, Zap, Cpu, Terminal, GitBranch, Rocket, CheckCircle2, Package } from 'lucide-react';
import { Callout } from '../../components/Callout';

export function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'v22' | 'v30' | 'changelog'>('v22');

  return (
    <div className="doc-page-container">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '12px',
              background: 'var(--accent-cyan-bg)',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              border: '1px solid var(--border-subtle)'
            }}
          >
            v2.2.0-next Canary & v3.0 RFCs
          </span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)', margin: '0 0 12px 0' }}>
          uReact Next Version Roadmap & Releases
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
          Explore the latest architectural advancements in uReact, from fine-grained Signals v2 to React 19 native action forms and ahead-of-time compiler proposals.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <button
          onClick={() => setActiveTab('v22')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'v22' ? 'var(--accent-cyan-bg)' : 'transparent',
            color: activeTab === 'v22' ? 'var(--accent-cyan)' : 'var(--text-dim)',
            fontWeight: activeTab === 'v22' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CheckCircle2 size={16} />
          v2.2.0-next (Current Next)
        </button>

        <button
          onClick={() => setActiveTab('v30')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'v30' ? 'var(--accent-cyan-bg)' : 'transparent',
            color: activeTab === 'v30' ? 'var(--accent-cyan)' : 'var(--text-dim)',
            fontWeight: activeTab === 'v30' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Rocket size={16} />
          v3.0.0 Future RFCs
        </button>

        <button
          onClick={() => setActiveTab('changelog')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'changelog' ? 'var(--accent-cyan-bg)' : 'transparent',
            color: activeTab === 'changelog' ? 'var(--accent-cyan)' : 'var(--text-dim)',
            fontWeight: activeTab === 'changelog' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <GitBranch size={16} />
          Release Changelog
        </button>
      </div>

      {activeTab === 'v22' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Callout type="tip" title="v2.2.0-next Available on NPM">
            Run <code>npm install ureact@next</code> to test the latest Canary release in your local projects today.
          </Callout>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Zap size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  1. Signals v2 Fine-Grained Reactivity
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Full support for <code>signal()</code>, <code>computed()</code>, and <code>createSignalEffect()</code>. Automatic dependency tracking ensures only the smallest node rerenders when state mutates.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  2. Interactive In-Browser Live Playground
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                React.dev-style interactive sandbox right in the documentation with live state inspection, code presets, and instant execution.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Terminal size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  3. Command Palette v3.0 Hub
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Raycast split preview pane, zero-allocation pre-indexed search, keyboard shortcuts, version switcher, and instant expression calculator.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Package size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  4. React.dev Version Switcher
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Easily toggle between Canary (v2.2.0-next), Current Stable (v2.1.0), and LTS releases directly from the navigation bar.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'v30' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Cpu size={20} color="var(--accent-cyan)" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Ahead-of-Time Zero-Runtime Compiler
              </h3>
              <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>RFC</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              A compiler pass that analyzes reactive variable reads and converts them into direct atomic signals at build time, eliminating Proxy wrappers entirely in production bundles.
            </p>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Terminal size={20} color="var(--accent-cyan)" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                React Server Component (RSC) Direct Stream
              </h3>
              <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>Planned</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Transmit state store snapshots seamlessly over RSC flight streams with zero client initialization lag and instant hydration.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'changelog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>v2.2.0-next</h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-cyan-bg)', color: 'var(--accent-cyan)', fontWeight: 700 }}>Canary</span>
            </div>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              <li><strong>Signals v2:</strong> Added <code>signal()</code>, <code>computed()</code>, and <code>createSignalEffect()</code> with automatic dependency tracking.</li>
              <li><strong>React Hooks:</strong> Added <code>useSignal()</code> and <code>useComputed()</code> for direct JSX reactivity.</li>
              <li><strong>Live Playground:</strong> Interactive in-browser code runner and state inspector.</li>
              <li><strong>Command Palette v3.0:</strong> Raycast split preview, zero-allocation pre-indexed search, keyboard shortcuts cheatsheet, and live expression evaluator.</li>
              <li><strong>Header Version Switcher:</strong> React.dev-style dropdown selector.</li>
            </ul>
          </div>

          <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>v2.1.0</h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontWeight: 700 }}>Stable</span>
            </div>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              <li>React 19 native action integration: <code>&lt;ActionForm&gt;</code> and <code>useActionTransition</code>.</li>
              <li>Declarative Control Flow: <code>&lt;When&gt;</code>, <code>&lt;Show&gt;</code>, <code>&lt;For&gt;</code>, <code>&lt;Fetch&gt;</code>.</li>
              <li>Global Query & SWR Cache with optimistic mutations.</li>
              <li>Proxy <code>$bind</code> two-way form bindings.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
