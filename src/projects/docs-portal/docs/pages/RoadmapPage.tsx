import React, { useState } from 'react';
import { Sparkles, Zap, Cpu, Terminal, GitBranch, Rocket, CheckCircle2, Package, Shield, Code2, Globe, Flame, LifeBuoy } from 'lucide-react';
import { Callout } from '../../components/Callout';

export function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'v23' | 'v30' | 'changelog'>('v23');

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
            v2.3.0 Released &amp; v3.0 RFCs
          </span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)', margin: '0 0 12px 0' }}>
          uReact Roadmap, Releases &amp; RFC Specifications
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
          Explore the architecture of uReact v2.3.0 and the upcoming v3.0 Request for Comments (RFCs)—from AOT zero-runtime compilation to resumable islands and RSC stream synchronization.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setActiveTab('v23')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'v23' ? 'var(--accent-cyan-bg)' : 'transparent',
            color: activeTab === 'v23' ? 'var(--accent-cyan)' : 'var(--text-dim)',
            fontWeight: activeTab === 'v23' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CheckCircle2 size={16} />
          v2.3.0 (Current Release)
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
          v3.0.0 RFC Specifications (5)
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

      {/* Tab 1: v2.3.0 Release Highlights */}
      {activeTab === 'v23' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, var(--bg-secondary) 100%)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Sparkles size={24} color="var(--accent-cyan)" />
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                v2.3.0: Developer-Requested Capabilities Engine
              </h2>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontWeight: 700 }}>
                Stable Available Now
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              v2.3.0 delivers the most requested architectural additions in React history: native scoped styling without Tailwind bloat, high-performance form validation, universal state observation, built-in telemetry DevTools, and resilient component fault isolation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Shield size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  1. Built-in Scoped CSS (&lt;Scoped&gt;)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Component-isolated stylesheets without Tailwind class pollution or CSS-in-JS runtime bloat. Automatic <code>[data-scope]</code> injection and automatic ref-counted garbage collection in <code>&lt;head&gt;</code>.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={20} color="var(--accent-emerald)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  2. Reactive Form Store &amp; Rules
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Full-featured form validation (<code>rules.required</code>, <code>rules.email</code>, <code>rules.minLength</code>), dirty checking, touch tracking, and effortless 2-way <code>$bind</code> proxies without Formik or React Hook Form dependencies.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Zap size={20} color="var(--accent-purple)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  3. Universal State Watcher (watch)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Watch signals, proxy stores, or getter expressions with explicit <code>(newValue, oldValue)</code> callbacks. Operates cleanly inside and outside React components with zero <code>useEffect</code> stale-closure traps.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <LifeBuoy size={20} color="var(--accent-rose)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  4. Fault Isolation (&lt;Catch&gt; &amp; isolate)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                If a leaf component crashes, only that specific component displays a resilient fallback with a ↻ Retry button, while sibling and parent components continue running without interruption.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Terminal size={20} color="var(--accent-amber)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  5. Quantum DevTools HUD
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Embedded telemetry dashboard: live 60 FPS meter, 98.4% VDOM bypass gauge, state matrix tree, time-travel mutation timeline, and chaos latency simulator. Hotkey: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Code2 size={20} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  6. VS Code Developer Extension
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Official <code>vscode-ureact</code> extension with instant snippets (<code>ursignal</code>, <code>urstore</code>, <code>urcatch</code>), IntelliSense hover docs with React comparisons, and a 1-click status bar menu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: v3.0.0 Strategic RFCs */}
      {activeTab === 'v30' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Callout type="note" title="What is an RFC in uReact?">
            An <strong>RFC (Request for Comments)</strong> is a comprehensive architectural proposal published for community review before implementation. RFCs ensure that major framework changes undergo rigorous design, benchmark validation, and ergonomic testing.
          </Callout>

          {/* RFC-01 */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={22} color="var(--accent-cyan)" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  RFC-01: Ahead-of-Time Zero-Runtime Compiler (Babel/Vite/SWC)
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontWeight: 700 }}>
                RFC Under Review
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Problem:</strong> ES6 Proxies incur minor garbage collection overhead during high-frequency mutations (e.g., 60fps animations or 10,000+ item table updates).
            </p>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Solution:</strong> A build-time compiler transform that parses JavaScript AST and rewrites direct mutable assignments (<code>store.count++</code>) into pre-allocated atomic signal patches.
            </p>
            <div style={{ padding: '12px 16px', borderRadius: '8px', background: '#040711', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#38bdf8' }}>
              <div>{'// You write: store.user.name = "Alex";'}</div>
              <div style={{ color: '#a855f7' }}>{'// Compiler outputs: store.__patch(["user", "name"], () => "Alex");'}</div>
            </div>
          </div>

          {/* RFC-02 */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={22} color="var(--accent-purple)" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  RFC-02: RSC Flight Stream Store Synchronization
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontWeight: 700 }}>
                RFC Draft
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Problem:</strong> Hydrating React Server Component (RSC) data into client state requires manual <code>useEffect</code> synchronizers, leading to duplicate fetch waterfalls and layout flashes.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Solution:</strong> Native RSC stream protocol integration that pipes server-rendered store diffs directly into client proxy stores via React 19's Flight Protocol. Client components hydrate instantly with zero fetch latency.
            </p>
          </div>

          {/* RFC-03 */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={22} color="var(--accent-emerald)" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  RFC-03: Resumable Islands Architecture (&lt;Island client:visible&gt;)
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontWeight: 700 }}>
                RFC In Discussion
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Problem:</strong> Traditional React hydration ships 100% of component code to the client even if 90% of the page is purely static marketing content.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Solution:</strong> Ship 0KB of JavaScript for static layout elements, only hydrating interactive islands when scrolled into viewport or hovered by the user (<code>client:visible</code>, <code>client:idle</code>, <code>client:media</code>).
            </p>
          </div>

          {/* RFC-04 */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={22} color="var(--accent-rose)" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  RFC-04: Edge Mutators &amp; Streaming Action RPC
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', fontWeight: 700 }}>
                RFC Planned
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Problem:</strong> Standard REST/GraphQL endpoints require complex schema generation and client query hook ceremony.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Solution:</strong> Define edge server actions that directly mutate proxy state trees over a typed WebSocket/SSE tunnel with automated rollback on network failure.
            </p>
          </div>

          {/* RFC-05 */}
          <div style={{ padding: '24px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={22} color="var(--accent-indigo)" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  RFC-05: Official Chrome / Edge WebExtension DevTools
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 700 }}>
                RFC Planned
              </span>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Problem:</strong> The in-browser HUD is powerful, but developers inspecting complex enterprise applications benefit from dedicated browser devtools panels.
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              <strong>Solution:</strong> A standalone Chrome/Edge extension providing a live reactive dependency graph, memory flamecharts, time-travel history export, and automated performance audits.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Release Changelog */}
      {activeTab === 'changelog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* v2.3.0 */}
          <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>v2.3.0</h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontWeight: 700 }}>Latest Release</span>
            </div>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.8 }}>
              <li><strong>Component Scoped CSS:</strong> Implemented <code>&lt;Scoped&gt;</code> and <code>useScopedCSS</code> with automatic <code>[data-scope]</code> isolation and reference-counted cleanup.</li>
              <li><strong>Reactive Form Store &amp; Validation:</strong> Added <code>createFormStore</code>, declarative rules (<code>required</code>, <code>email</code>, <code>minLength</code>), dirty/touched tracking, and 2-way <code>$bind</code> proxies.</li>
              <li><strong>Universal State Watcher:</strong> Added <code>watch()</code> and <code>useWatchReactive()</code> for observing state changes with <code>(newVal, oldVal)</code> without <code>useEffect</code> stale closures.</li>
              <li><strong>Resilient Component Fault Isolation:</strong> Added <code>&lt;Catch&gt;</code>, <code>&lt;Isolated&gt;</code>, and <code>isolate()</code> HOC to prevent isolated leaf errors from crashing sibling components.</li>
              <li><strong>Quantum DevTools HUD:</strong> Embedded in-browser telemetry HUD with 60 FPS meter, 98.4% VDOM bypass gauge, state matrix, time-travel timeline, and chaos simulator.</li>
              <li><strong>VS Code Extension:</strong> Official <code>vscode-ureact</code> extension with instant snippets, hover tooltips, status bar menu, and standalone <code>.vsix</code> packaging.</li>
              <li><strong>Open State Architecture:</strong> Full interoperability guarantee with external state management (Zustand, Redux Toolkit, Jotai) and DevTools bridging via <code>registerDevTools()</code>.</li>
            </ul>
          </div>

          {/* v2.2.0 */}
          <div style={{ borderLeft: '3px solid var(--accent-purple)', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>v2.2.0</h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-purple-bg, rgba(168, 85, 247, 0.15))', color: 'var(--accent-purple)', fontWeight: 700 }}>Canary</span>
            </div>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              <li><strong>Signals v2:</strong> Added <code>signal()</code>, <code>computed()</code>, and <code>createSignalEffect()</code> with automatic dependency tracking.</li>
              <li><strong>React Hooks:</strong> Added <code>useSignal()</code> and <code>useComputed()</code> for direct JSX reactivity.</li>
              <li><strong>Live Playground:</strong> Interactive in-browser code runner and state inspector.</li>
              <li><strong>Command Palette v3.0:</strong> Raycast split preview, zero-allocation pre-indexed search, keyboard shortcuts cheatsheet, and live expression evaluator.</li>
            </ul>
          </div>

          {/* v2.1.0 */}
          <div style={{ borderLeft: '3px solid #64748b', paddingLeft: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>v2.1.0</h3>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(100, 116, 139, 0.15)', color: '#94a3b8', fontWeight: 700 }}>Stable</span>
            </div>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              <li>React 19 native action integration: <code>&lt;ActionForm&gt;</code> and <code>useActionTransition</code>.</li>
              <li>Declarative Control Flow: <code>&lt;When&gt;</code>, <code>&lt;Show&gt;</code>, <code>&lt;For&gt;</code>, <code>&lt;Fetch&gt;</code>.</li>
              <li>Global Query &amp; SWR Cache with optimistic mutations.</li>
              <li>Proxy <code>$bind</code> two-way form bindings.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
