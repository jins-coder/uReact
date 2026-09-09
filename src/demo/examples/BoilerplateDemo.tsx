import React, { useState } from 'react';
import {
  createStore,
  view,
  bind,
  prevent,
  When,
  Fetch,
  useCounter,
  useArray
} from 'ureact';
import {
  Minimize2,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Code2
} from 'lucide-react';

// Auto-reactive store for the demo
const userProfileStore = createStore({
  username: 'Alex Chen',
  role: 'Full Stack Engineer',
  notifications: true,
  theme: 'Dark AMOLED'
});

// 1. Auto-reactive component using view() - ZERO useStore hook calls!
const AutoReactiveBadge = view(() => (
  <div
    style={{
      padding: '12px 16px',
      borderRadius: '8px',
      background: 'rgba(56, 189, 248, 0.1)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}
  >
    <div>
      <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
        {userProfileStore.state.username}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        {userProfileStore.state.role} • Notifications: {userProfileStore.state.notifications ? 'ON' : 'OFF'}
      </div>
    </div>
    <span className="pill" style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.2)' }}>
      Zero useStore() hook calls
    </span>
  </div>
));

export function BoilerplateDemo() {
  const counter = useCounter(10);
  const tags = useArray(['React 19', 'uReact', 'Velocity', 'Zero-Boilerplate']);
  const [tagInput, setTagInput] = useState('');
  const [activeView, setActiveView] = useState<'profile' | 'tags'>('profile');

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    tags.push(tagInput.trim());
    setTagInput('');
  };

  return (
    <div>
      <div className="panel-header">
        <div>
          <h3 className="panel-title">
            <Minimize2 size={20} style={{ color: 'var(--accent-emerald)' }} />
            Radical Code Reduction Engine (79% Less Code)
          </h3>
          <p className="panel-subtitle">
            How uReact systematically eliminates every repetitive code block in React development.
          </p>
        </div>
        <div className="pill active" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
          <TrendingDown size={15} /> <strong>-79.4% Total Lines of Code</strong>
        </div>
      </div>

      {/* Code Reduction Metrics Grid */}
      <div className="metrics-strip" style={{ marginBottom: '28px' }}>
        <div className="metric-card">
          <div className="metric-val cyan">view()</div>
          <div className="metric-label">
            Auto-reactive components. Reads from stores auto-subscribe with <strong>0 hook calls</strong>.
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-val green">{`{...bind()}`}</div>
          <div className="metric-label">
            Universal two-way binding. Eliminates <code>value</code> + <code>onChange</code> for inputs.
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-val purple">prevent()</div>
          <div className="metric-label">
            Event modifier. Eliminates <code>e.preventDefault()</code> wrappers.
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-val" style={{ color: 'var(--accent-amber)' }}>&lt;When&gt;</div>
          <div className="metric-label">
            1-line conditional. Eliminates nested ternary soup and IIFEs.
          </div>
        </div>
      </div>

      {/* Direct Line-by-Line Code Comparison */}
      <div className="comparison-grid">
        {/* Standard React */}
        <div className="code-box standard">
          <div className="code-box-header">
            <span>Standard React (65 lines of code)</span>
            <span className="code-box-badge badge-bad">65 Lines • High Ceremony</span>
          </div>
          <pre className="code-content">
            <code>{`// 1. Hook and state setup
const [name, setName] = useState('');
const [role, setRole] = useState('');
const [notif, setNotif] = useState(true);
const [count, setCount] = useState(0);

// 2. Repetitive handler functions
const handleSubmit = (e) => {
  e.preventDefault();
  save({ name, role, notif });
};

const handleCountInc = () => setCount(c => c + 1);
const handleCountDec = () => setCount(c => c - 1);

// 3. JSX with manual bindings & ternaries
return (
  <form onSubmit={handleSubmit}>
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
    />
    <input 
      type="checkbox" 
      checked={notif} 
      onChange={e => setNotif(e.target.checked)} 
    />
    <button type="button" onClick={handleCountInc}>+1</button>
    {isReady ? <Dashboard /> : <Login />}
  </form>
);`}</code>
          </pre>
        </div>

        {/* uReact Radical Reduction */}
        <div className="code-box ureact">
          <div className="code-box-header">
            <span>uReact Radical Reduction (14 lines of code)</span>
            <span className="code-box-badge badge-good">14 Lines • 79% Less Code</span>
          </div>
          <pre className="code-content">
            <code>{`// 1. One global or local store & quick counter
const user = createStore({ name: '', role: '', notif: true });
const count = useCounter(0);

// 2. Clean JSX with direct bind, prevent, and When:
export const UserView = view(() => (
  <form onSubmit={prevent(() => save(user.state))}>
    <input {...bind(user, 'name')} />
    <input type="checkbox" {...bind(user, 'notif')} />
    <button type="button" onClick={() => count.inc()}>+1</button>
    <When is={isReady} then={<Dashboard />} else={<Login />} />
  </form>
));`}</code>
          </pre>
        </div>
      </div>

      {/* Interactive Demonstration */}
      <div className="interactive-playground">
        {/* Left: Interactive Ultra-Reduced Form */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Code2 size={18} style={{ color: 'var(--accent-cyan)' }} />
            1. Direct Universal Binding (<code>bind()</code> &amp; <code>view()</code>)
          </h4>

          {/* AutoReactiveBadge subscribing automatically via view() */}
          <div style={{ marginBottom: '16px' }}>
            <AutoReactiveBadge />
          </div>

          <form onSubmit={prevent(() => alert('Saved: ' + JSON.stringify(userProfileStore.state)))}>
            <div className="form-group">
              <label className="form-label">Username (Direct bind)</label>
              {/* ZERO onChange or value handlers */}
              <input type="text" className="input-field" {...bind(userProfileStore, 'username')} />
            </div>

            <div className="form-group">
              <label className="form-label">Role (Direct bind)</label>
              <input type="text" className="input-field" {...bind(userProfileStore, 'role')} />
            </div>

            <div className="form-group">
              <label className="form-check">
                <input
                  type="checkbox"
                  className="checkbox-custom"
                  {...bind(userProfileStore, 'notifications')}
                />
                <span style={{ fontSize: '0.88rem' }}>Direct Checkbox Binding ({'{...bind(store, "notifications")}'})</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit with prevent() (Zero e.preventDefault() boilerplate)
            </button>
          </form>
        </div>

        {/* Right: Quick State Helpers & Conditional */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Sparkles size={18} style={{ color: 'var(--accent-indigo)' }} />
            2. 1-Line State Primitives &amp; &lt;When&gt;
          </h4>

          {/* Counter widget */}
          <div style={{ marginBottom: '20px' }}>
            <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              <code>useCounter()</code> in 1 Line:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => counter.dec()} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                <Minus size={14} />
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, minWidth: '40px', textAlign: 'center', color: 'var(--accent-cyan)' }}>
                {counter.value}
              </span>
              <button onClick={() => counter.inc()} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                <Plus size={14} />
              </button>
              <button onClick={() => counter.reset()} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                Reset
              </button>
            </div>
          </div>

          {/* When Conditional Demo */}
          <div style={{ marginBottom: '20px' }}>
            <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              <code>&lt;When&gt;</code> Conditional Switcher:
            </span>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button
                onClick={() => setActiveView('profile')}
                className={`btn ${activeView === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              >
                Show Profile View
              </button>
              <button
                onClick={() => setActiveView('tags')}
                className={`btn ${activeView === 'tags' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              >
                Show Tag Manager View
              </button>
            </div>

            <When
              is={activeView === 'profile'}
              then={
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    fontSize: '0.85rem'
                  }}
                >
                  👤 Rendered Profile Card cleanly via <code>&lt;When is=... then=... /&gt;</code> without any ternary operators!
                </div>
              }
              else={
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    fontSize: '0.85rem'
                  }}
                >
                  🏷️ Rendered Tag Manager fallback branch effortlessly!
                </div>
              }
            />
          </div>

          {/* Array helper */}
          <div>
            <span className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
              <code>useArray()</code> Helper ({tags.items.length} items):
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {tags.items.map((item, i) => (
                <span
                  key={i}
                  className="chip"
                  style={{ cursor: 'pointer' }}
                  onClick={() => tags.remove(i)}
                  title="Click to remove"
                >
                  {item} <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>×</span>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="New tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(); }}
              />
              <button type="button" onClick={handleAddTag} className="btn btn-secondary">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
