import React, { useState, useEffect } from 'react';
import { X, Sparkles, Zap, Cpu, CheckCircle2, Rocket, ArrowRight, ExternalLink, GitBranch, Terminal } from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion?: string;
  onSelectVersion?: (version: string) => void;
}

export function RoadmapModal({
  isOpen,
  onClose,
  currentVersion = '2.2.0-next',
  onSelectVersion
}: RoadmapModalProps) {
  const [activeTab, setActiveTab] = useState<'v22' | 'v30' | 'changelog'>('v22');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(10px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'paletteFadeIn 0.18s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(88, 196, 220, 0.2), rgba(20, 158, 202, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  uReact Next Version Roadmap
                </h2>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'var(--accent-cyan-bg)',
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  v{currentVersion}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                Next-generation reactive runtime, Signals v2, and React 19 DX breakthroughs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer' }}
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            padding: '8px 20px',
            gap: '8px',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)'
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
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={15} />
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
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Rocket size={15} />
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
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <GitBranch size={15} />
            Full Changelog
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            lineHeight: 1.6
          }}
        >
          {activeTab === 'v22' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'var(--accent-cyan-bg)',
                  border: '1px solid rgba(88, 196, 220, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
                    🚀 v2.2.0-next Canary Build Available
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', opacity: 0.9 }}>
                    Install today via npm: <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>npm i ureact@next</code>
                  </div>
                </div>
                {onSelectVersion && (
                  <button
                    onClick={() => {
                      onSelectVersion('2.2.0-next');
                      onClose();
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '6px 12px', whiteSpace: 'nowrap' }}
                  >
                    Set as Active Version
                  </button>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 12px 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="var(--accent-cyan)" />
                  Key Upgrades in v2.2.0-next
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      1. Signals v2 Fine-Grained Primitives
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      Introduces <code>signal()</code>, <code>computed()</code>, and <code>createSignalEffect()</code> with automatic dependency tracking, lazy evaluation, and <code>useSignal()</code> / <code>useComputed()</code> hooks.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      2. Interactive In-Browser Live Playground
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      React.dev-style editable sandbox directly in the documentation. Test two-way bindings, signals, and control flow in real time without external tools.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      3. Command Palette v3.0 Search Hub
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      Raycast-style split preview pane, zero-allocation pre-indexed search, keyboard navigation, copy snippet shortcuts, and instant expression calculator.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                      4. React 19 Actions & Resource Preloading
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      Full integration with React 19 <code>useActionState</code>, <code>&lt;ActionForm&gt;</code>, promise unwrapping with <code>use()</code>, and <code>&lt;Head&gt;</code> resource preloading.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'v30' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Cpu size={18} color="var(--accent-cyan)" />
                  <span style={{ fontWeight: 700 }}>Ahead-of-Time Zero-Runtime Compiler</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>RFC Under Review</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-dim)' }}>
                  A Babel/Vite compile step that transforms direct property mutations into optimized atom updates at build time, reducing proxy overhead to zero.
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Terminal size={18} color="var(--accent-cyan)" />
                  <span style={{ fontWeight: 700 }}>Native React Server Component (RSC) Direct Store Sync</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>Planned</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-dim)' }}>
                  Stream store patches directly across the server/client boundary with zero hydration mismatch and optimistic rollbacks.
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Sparkles size={18} color="var(--accent-cyan)" />
                  <span style={{ fontWeight: 700 }}>Time-Travel State Inspector Browser Extension</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>In Prototyping</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-dim)' }}>
                  Visual dependency tree graph debugger with step-by-step state playback, memory footprint profiling, and mutation timeline logs.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'changelog' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>v2.2.0-next (Canary)</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-cyan-bg)', color: 'var(--accent-cyan)' }}>Active Next</span>
                </div>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                  <li>Added <code>signal()</code>, <code>computed()</code>, and <code>createSignalEffect()</code> reactive primitives.</li>
                  <li>Added <code>useSignal()</code> and <code>useComputed()</code> React hooks.</li>
                  <li>Added In-Browser Live Code Playground with instant preview and interactive presets.</li>
                  <li>Command Palette v3.0 with split preview, zero-allocation pre-indexing, and keyboard navigation.</li>
                  <li>React.dev-style Version Switcher in documentation header.</li>
                </ul>
              </div>

              <div style={{ borderLeft: '3px solid var(--border-subtle)', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>v2.1.0 (Stable)</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>Latest Production</span>
                </div>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                  <li>React 19 support: native Actions, <code>useActionState</code>, and <code>use(Promise)</code>.</li>
                  <li>Declarative Control Flow: <code>&lt;When&gt;</code>, <code>&lt;Show&gt;</code>, <code>&lt;For&gt;</code>, <code>&lt;Fetch&gt;</code>.</li>
                  <li>Global Query & SWR Cache with optimistic mutations.</li>
                  <li>Form <code>$bind</code> two-way proxy bindings.</li>
                </ul>
              </div>

              <div style={{ borderLeft: '3px solid var(--border-subtle)', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>v2.0.0 (LTS)</span>
                </div>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-dim)' }}>
                  <li>Initial release of <code>createStore</code> proxy-based reactive state.</li>
                  <li>Automatic dependency tracking with <code>view()</code> HOC.</li>
                  <li>Core hooks: <code>useMount</code>, <code>useUnmount</code>, <code>useWatch</code>.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            Press <kbd style={{ padding: '2px 5px', borderRadius: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>Esc</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
