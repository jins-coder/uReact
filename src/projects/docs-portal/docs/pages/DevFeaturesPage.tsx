import React, { useState } from 'react';
import { Scoped, useScopedCSS, createFormStore, rules, watch, useWatchReactive, signal, useSignal, DevTools } from 'ureact';
import { ReactDevCodeBlock } from '../../components/ReactDevCodeBlock';
import { Sparkles, ShieldCheck, Paintbrush, Activity, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';

// Create an interactive form store for the demo
const demoForm = createFormStore({
  initialValues: {
    username: '',
    email: '',
    terms: false,
  },
  rules: {
    username: [rules.required('Username is required'), rules.minLength(3, 'At least 3 characters')],
    email: [rules.required('Email is required'), rules.email('Must be a valid email address')],
    terms: [rules.required('You must accept the terms')],
  },
  onSubmit: async (vals) => {
    alert(`Form submitted successfully!\n${JSON.stringify(vals, null, 2)}`);
  },
});

export function DevFeaturesPage() {
  const [formValues, setFormValues] = useState(demoForm.values);
  const [formErrors, setFormErrors] = useState(demoForm.errors);
  const [formTouched, setFormTouched] = useState(demoForm.touched);
  const [formValid, setFormValid] = useState(demoForm.isValid);

  // Subscribe to demo form updates for live UI render
  React.useEffect(() => {
    return demoForm.subscribe(() => {
      setFormValues({ ...demoForm.values });
      setFormErrors({ ...demoForm.errors });
      setFormTouched({ ...demoForm.touched });
      setFormValid(demoForm.isValid);
    });
  }, []);

  // Live watcher demo state
  const watchSignalInstance = React.useMemo(() => signal(0), []);
  const [countVal] = useSignal(watchSignalInstance);
  const [watchLogs, setWatchLogs] = useState<string[]>([]);

  useWatchReactive(watchSignalInstance, (next, prev) => {
    setWatchLogs(l => [`Count changed: prev=${prev ?? 'initial'} ➔ next=${next}`, ...l.slice(0, 4)]);
  });


  return (
    <div className="doc-page-content" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '9999px',
              background: 'rgba(56,189,248,0.15)',
              color: '#38bdf8',
              fontSize: '11px',
              fontWeight: 700,
              border: '1px solid rgba(56,189,248,0.3)',
            }}
          >
            v2.3.0 Latest
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
            Missing React Features · Now Built-in
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          Scoped CSS, Form Store & DevTools HUD
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          The features developers consistently requested in React: native component-scoped CSS without runtime bloat,
          a first-class reactive form store with declarative validation rules, universal state watching, and an embeddable DevTools HUD.
        </p>
      </div>

      {/* Feature 1: Scoped CSS */}
      <section id="scoped-css" style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Paintbrush size={20} color="#38bdf8" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            1. Built-in Scoped CSS (&lt;Scoped&gt; & useScopedCSS)
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Stop wrestling with external CSS-in-JS runtimes (Emotion/styled-components) or massive utility class soup.
          <code>&lt;Scoped&gt;</code> automatically generates a unique data attribute scope (e.g. <code>[data-scope="us-xxx"]</code>),
          injects into <code>&lt;head&gt;</code> with ref-counted cleanup, and guarantees zero CSS bleeding.
        </p>

        <div style={{ margin: '20px 0' }}>
          <ReactDevCodeBlock
            title="ScopedButton.tsx"
            language="tsx"
            code={`import { Scoped } from 'ureact';

export function ScopedCard() {
  return (
    <Scoped css={\`
      .card {
        background: #1e293b;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #334155;
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .card:hover {
        transform: translateY(-2px);
        border-color: #38bdf8;
      }
      .heading {
        color: #38bdf8;
        font-weight: bold;
      }
    \`}>
      <div className="card">
        <h3 className="heading">Scoped Component</h3>
        <p>Styles inside never bleed to parent or child components.</p>
      </div>
    </Scoped>
  );
}`}
          />
        </div>

        {/* Live Scoped Demo */}
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'var(--bg-surface-elevated, #131d31)',
            border: '1px solid var(--border-subtle, #1e293b)',
            marginTop: '16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', marginBottom: '12px', textTransform: 'uppercase' }}>
            Live Interactive Scoped Preview
          </div>
          <Scoped
            css={`
              .interactive-box {
                background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(99,102,241,0.1));
                border: 1px dashed #38bdf8;
                padding: 16px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .btn-scope {
                background: #0ea5e9;
                color: #ffffff;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.15s ease;
              }
              .btn-scope:hover {
                transform: scale(1.04);
                background: #0284c7;
              }
            `}
          >
            <div className="interactive-box">
              <div>
                <strong>Scoped Container</strong>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Inspect in browser DevTools to see the <code>[data-scope="..."]</code> isolated style injection.
                </div>
              </div>
              <button className="btn-scope" onClick={() => alert('Scoped style button clicked!')}>
                Hover & Click Me
              </button>
            </div>
          </Scoped>
        </div>
      </section>

      {/* Feature 2: Form Store */}
      <section id="form-validation" style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShieldCheck size={20} color="#10b981" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            2. Reactive Form Store & Validation (createFormStore)
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Building forms in React usually requires <code>react-hook-form</code>, <code>zod</code>, and multiple controller wrappers.
          <code>createFormStore()</code> gives you built-in declarative rules, dirty tracking, touch state, error signals,
          and zero-boilerplate <code>{`{...form.$bind.field}`}</code>.
        </p>

        <div style={{ margin: '20px 0' }}>
          <ReactDevCodeBlock
            title="LoginForm.tsx"
            language="tsx"
            code={`import { createFormStore, rules } from 'ureact';

const form = createFormStore({
  initialValues: { email: '', password: '' },
  rules: {
    email: [rules.required('Email required'), rules.email('Invalid email address')],
    password: [rules.required('Password required'), rules.minLength(8, 'Min 8 chars')]
  },
  onSubmit: async (values) => {
    await loginUser(values);
  }
});

export function LoginForm() {
  return (
    <form onSubmit={form.handleSubmit()}>
      <input {...form.$bind.email} placeholder="Enter email" />
      {form.touched.email && form.errors.email && (
        <span className="error">{form.errors.email}</span>
      )}

      <input {...form.$bind.password} type="password" placeholder="Password" />
      {form.touched.password && form.errors.password && (
        <span className="error">{form.errors.password}</span>
      )}

      <button disabled={!form.isValid || form.isSubmitting}>
        {form.isSubmitting ? 'Submitting...' : 'Sign In'}
      </button>
    </form>
  );
}`}
          />
        </div>

        {/* Live Form Demo */}
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'var(--bg-surface-elevated, #131d31)',
            border: '1px solid var(--border-subtle, #1e293b)',
            marginTop: '16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', marginBottom: '14px', textTransform: 'uppercase' }}>
            Live Interactive Form Store Demo
          </div>

          <form onSubmit={demoForm.handleSubmit()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Username (min 3 chars):
              </label>
              <input
                {...demoForm.$bind.username}
                placeholder="e.g. alexander"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${formTouched.username && formErrors.username ? '#ef4444' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-code, #090d16)',
                  color: 'inherit',
                  outline: 'none',
                }}
              />
              {formTouched.username && formErrors.username && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  {formErrors.username}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                Email Address:
              </label>
              <input
                {...demoForm.$bind.email}
                placeholder="name@domain.com"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${formTouched.email && formErrors.email ? '#ef4444' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-code, #090d16)',
                  color: 'inherit',
                  outline: 'none',
                }}
              />
              {formTouched.email && formErrors.email && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  {formErrors.email}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="demo-terms"
                {...demoForm.$bind.terms}
              />
              <label htmlFor="demo-terms" style={{ fontSize: '12px', cursor: 'pointer' }}>
                I agree to the uReact terms and reactive philosophy
              </label>
            </div>
            {formTouched.terms && formErrors.terms && (
              <div style={{ color: '#ef4444', fontSize: '11px' }}>
                {formErrors.terms}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <button
                type="submit"
                disabled={!formValid}
                style={{
                  background: formValid ? '#10b981' : '#334155',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: formValid ? 'pointer' : 'not-allowed',
                  fontSize: '13px',
                }}
              >
                Submit Form
              </button>

              <button
                type="button"
                onClick={() => demoForm.reset()}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                Reset
              </button>

              <div style={{ fontSize: '12px', color: formValid ? '#10b981' : '#f59e0b', marginLeft: 'auto' }}>
                {formValid ? '✓ Form is Valid' : '⚠ Validation Pending'}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Feature 3: watch / useWatchReactive */}
      <section id="reactive-watcher" style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Activity size={20} color="#a855f7" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            3. Universal State Watcher (watch & useWatchReactive)
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Watching state changes in React with <code>useEffect</code> is infamous for missing dependency warnings,
          stale closures, and running on mount when you only want change events. <code>watch()</code> provides
          precise <code>(newValue, oldValue)</code> execution outside or inside React.
        </p>

        <div style={{ margin: '20px 0' }}>
          <ReactDevCodeBlock
            title="StateWatcher.ts"
            language="tsx"
            code={`import { signal, watch, useWatchReactive } from 'ureact';

const counter = signal(0);

// Watch outside React (e.g. telemetry, background services):
const unwatch = watch(counter, (newVal, oldVal) => {
  console.log(\`Count changed from \${oldVal} to \${newVal}\`);
});

// Or inside a React component:
export function CounterWatcher() {
  useWatchReactive(counter, (newVal, oldVal) => {
    alert(\`Transition: \${oldVal} ➔ \${newVal}\`);
  });

  return <button onClick={() => counter.value++}>Increment</button>;
}`}
          />
        </div>

        {/* Live Watcher Demo */}
        <div
          style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'var(--bg-surface-elevated, #131d31)',
            border: '1px solid var(--border-subtle, #1e293b)',
            marginTop: '16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#a855f7', marginBottom: '12px', textTransform: 'uppercase' }}>
            Live Reactive Watcher Demo
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <button
              onClick={() => watchSignalInstance.value++}
              style={{
                background: '#a855f7',
                color: '#ffffff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Increment Signal (Value: {countVal})
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Triggers <code>useWatchReactive(watchSignalInstance, (next, prev) =&gt; ...)</code>
            </span>
          </div>


          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              background: '#040711',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: '#38bdf8',
            }}
          >
            {watchLogs.length === 0 ? (
              <span style={{ color: '#64748b' }}>Click increment to observe state transitions...</span>
            ) : (
              watchLogs.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </div>
      </section>

      {/* Feature 4: Built-in DevTools HUD */}
      <section id="devtools-hud" style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Terminal size={20} color="#f59e0b" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            4. Built-in DevTools HUD & Time-Travel
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          No browser extension setup required. Simply import <code>&lt;DevTools /&gt;</code> anywhere in your application.
          Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> or click the floating pill in the bottom right corner of this screen
          to inspect active stores, signals, mutation timelines, and reactivity stats in real time.
        </p>

        <div style={{ margin: '20px 0' }}>
          <ReactDevCodeBlock
            title="App.tsx"
            language="tsx"
            code={`import { DevTools, registerDevTools, createStore } from 'ureact';

const userStore = createStore({ name: 'Alex', role: 'Engineer' });

// Register with DevTools HUD for live inspection:
registerDevTools('UserStore', 'store', userStore);

export function App() {
  return (
    <div>
      <MainContent />
      
      {/* Self-contained DevTools HUD: toggle with Ctrl+Shift+D */}
      <DevTools defaultOpen={false} position="bottom-right" />
    </div>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}
