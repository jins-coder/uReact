import React, { useState, Suspense, startTransition } from 'react';
import {
  useAction,
  useActionStatus,
  usePromise,
  useDeferred,
  useActionTransition,
  resetForm,
  preload,
  preconnect,
  prefetchDNS,
  Head,
  ActionButton
} from 'ureact';
import {
  Zap,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Globe,
  Radio,
  Clock,
  RotateCcw,
  Network,
  Search,
  Check,
  RefreshCw
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  isOptimistic?: boolean;
}

// Child component testing React 19 useFormStatus safely
function ActionSubmitButton({ isActionPending }: { isActionPending?: boolean }) {
  const status = useActionStatus();
  const pending = status?.pending || isActionPending;

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Saving with React 19...
        </>
      ) : (
        <>
          <Send size={16} /> Post Comment (React 19 Action)
        </>
      )}
    </button>
  );
}

// Simulated promise generator for React 19 use(Promise) demo
function createDataPromise() {
  const promise = new Promise<{ message: string; timestamp: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Resolved via React 19 use(Promise) inside a Suspense boundary!',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 800);
  });

  const p: any = promise;
  p.status = 'pending';
  p.then(
    (res: any) => {
      p.status = 'fulfilled';
      p.value = res;
    },
    (err: any) => {
      p.status = 'rejected';
      p.reason = err;
    }
  );
  return p as Promise<{ message: string; timestamp: string }>;
}

function SuspendedResource({ promise }: { promise: Promise<any> }) {
  const result = usePromise(promise);
  if (!result) return null;

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        color: 'var(--accent-cyan)'
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{result.message}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        Rendered at: {result.timestamp} • No useEffect or useState needed!
      </div>
    </div>
  );
}

export function React19Demo() {
  const [authorInput, setAuthorInput] = useState('Alex');
  const [commentInput, setCommentInput] = useState('');
  const [pageTitle, setPageTitle] = useState('uReact v2.1 — Powered by React 19');
  const [resourcePromise, setResourcePromise] = useState(() => createDataPromise());

  // React 19 Resource Preloading Feedback
  const [preloadStatus, setPreloadStatus] = useState<string | null>(null);

  // React 19 Enhanced useDeferred with initialValue
  const [queryInput, setQueryInput] = useState('React 19 Server Actions');
  const deferredQuery = useDeferred(queryInput, 'Initial Query');

  // React 19 Async useActionTransition
  const asyncTransition = useActionTransition();
  const [transitionResult, setTransitionResult] = useState<string | null>(null);

  // React 19 useAction with automatic useOptimistic
  const action = useAction<
    { author: string; text: string },
    Comment[]
  >(
    async (prev, input) => {
      // Simulate server network latency
      await new Promise((r) => setTimeout(r, 800));

      const newComment: Comment = {
        id: Math.random().toString(36).substring(7),
        author: input.author,
        text: input.text,
        timestamp: new Date().toLocaleTimeString()
      };

      return [...prev, newComment];
    },
    [
      { id: '1', author: 'Dan', text: 'React 19 Actions and useOptimistic are incredible.', timestamp: '10:14 AM' },
      { id: '2', author: 'Sophie', text: 'uReact makes the React 19 API 10x easier to write.', timestamp: '10:22 AM' }
    ],
    {
      // React 19 useOptimistic handler: instant UI feedback!
      optimisticUpdate: (prev, input) => [
        ...prev,
        {
          id: 'optimistic-temp',
          author: input.author,
          text: input.text,
          timestamp: 'Sending now...',
          isOptimistic: true
        }
      ]
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    action.run({ author: authorInput, text: commentInput });
    setCommentInput('');
  };

  const handleRetriggerPromise = () => {
    startTransition(() => {
      setResourcePromise(createDataPromise());
    });
  };

  const handlePreloadFont = () => {
    preload('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans&display=swap', { as: 'style' });
    setPreloadStatus('✓ preload("https://fonts.googleapis.com/...", { as: "style" }) triggered');
    setTimeout(() => setPreloadStatus(null), 3500);
  };

  const handlePreconnectAPI = () => {
    preconnect('https://api.github.com', { crossOrigin: 'anonymous' });
    prefetchDNS('https://cdn.jsdelivr.net');
    setPreloadStatus('✓ preconnect("https://api.github.com") and prefetchDNS("https://cdn.jsdelivr.net") dispatched');
    setTimeout(() => setPreloadStatus(null), 3500);
  };

  const handleRunAsyncTransition = () => {
    asyncTransition.run(async () => {
      setTransitionResult('⏳ Transition running in background concurrent lane...');
      await new Promise((r) => setTimeout(r, 1000));
      setTransitionResult(`✓ Async transition completed at ${new Date().toLocaleTimeString()}`);
    });
  };

  return (
    <div>
      {/* React 19 Native Document Metadata Hoisting */}
      <Head title={pageTitle} description="uReact v2.1 powered natively by React 19 engine" />

      <div className="panel-header">
        <div>
          <h3 className="panel-title">
            <Zap size={20} style={{ color: 'var(--accent-cyan)' }} />
            React 19 Native Helpers Suite (Actions, <code>useOptimistic</code>, <code>use(Promise)</code>, Preloads, <code>useDeferred</code>)
          </h3>
          <p className="panel-subtitle">
            All React 19 native primitives implemented with first-class ergonomic helpers in uReact.
          </p>
        </div>
        <div className="pill" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
          React 19 Engine Active
        </div>
      </div>

      {/* Grid of 4 Interactive React 19 Playgrounds */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        
        {/* Widget 1: React 19 Actions & useOptimistic */}
        <div className="widget-card">
          <h4 className="widget-title">
            <MessageSquare size={18} style={{ color: 'var(--accent-cyan)' }} />
            1. React 19 Actions &amp; <code>useOptimistic</code>
          </h4>

          <form
            action={async () => {
              if (!commentInput.trim()) return;
              await action.run({ author: authorInput, text: commentInput });
              setCommentInput('');
            }}
            onSubmit={handleSubmit}
            style={{ marginBottom: '16px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Author"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {action.isPending ? '⚡ React 19 Action Transitioning...' : 'Ready'}
              </span>
              <ActionSubmitButton isActionPending={action.isPending} />
            </div>
          </form>

          {/* Comment list with optimistic indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {action.data.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: c.isOptimistic ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: c.isOptimistic ? '1px dashed var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{c.author}</span>
                    {c.isOptimistic && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'var(--accent-cyan)',
                          color: '#031327'
                        }}
                      >
                        OPTIMISTIC (Instant)
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '2px' }}>{c.text}</div>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{c.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: React 19 Document Metadata & use(Promise) */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Globe size={18} style={{ color: 'var(--accent-indigo)' }} />
            2. Native React 19 Metadata &amp; <code>use(Promise)</code>
          </h4>

          {/* Metadata Hoisting demo */}
          <div style={{ marginBottom: '18px' }}>
            <span className="form-label" style={{ marginBottom: '6px', display: 'block' }}>
              Native React 19 &lt;Head&gt; Document Hoisting:
            </span>
            <input
              type="text"
              className="input-field"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Edit page title..."
            />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Inspect document head or browser tab! Updates synchronously.
            </p>
          </div>

          {/* React 19 use(Promise) Suspense demo */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="form-label" style={{ margin: 0 }}>
                React 19 <code>use(Promise)</code> with &lt;Suspense&gt;:
              </span>
              <button
                onClick={handleRetriggerPromise}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <RotateCcw size={12} /> Re-trigger Promise
              </button>
            </div>

            <Suspense
              fallback={
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px dashed var(--border-subtle)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}
                >
                  <Loader2 size={16} className="animate-spin" style={{ marginBottom: '4px', margin: '0 auto 4px' }} />
                  <div>Suspended by React 19 use() hook... resolving promise</div>
                </div>
              }
            >
              <SuspendedResource promise={resourcePromise} />
            </Suspense>
          </div>
        </div>

        {/* Widget 3: React 19 Resource Preloading (preload, preconnect, prefetchDNS) */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Network size={18} style={{ color: 'var(--accent-emerald)' }} />
            3. React 19 Resource Preloading Helpers
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Built-in React 19 DOM helpers to warm up connections, prefetch DNS, and preload critical assets before navigation:
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button
              onClick={handlePreloadFont}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <code>preload('font/css', 'style')</code>
            </button>
            <button
              onClick={handlePreconnectAPI}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <code>preconnect()</code> &amp; <code>prefetchDNS()</code>
            </button>
          </div>

          {preloadStatus && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: 'var(--accent-emerald)',
                fontSize: '0.82rem'
              }}
            >
              {preloadStatus}
            </div>
          )}

          <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            ✓ Compatible with SSR streaming, link tags hoisting, and modulepreload.
          </div>
        </div>

        {/* Widget 4: Async Transition & Enhanced useDeferred */}
        <div className="widget-card">
          <h4 className="widget-title">
            <RefreshCw size={18} style={{ color: 'var(--accent-amber)' }} />
            4. Async <code>useActionTransition</code> &amp; <code>useDeferred</code>
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            React 19 supports async functions directly in transitions, and <code>useDeferred</code> with initial fallbacks:
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ marginBottom: '4px', display: 'block' }}>
              Enhanced <code>useDeferred(val, initial)</code>:
            </label>
            <input
              type="text"
              className="input-field"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Type search query..."
            />
            <div style={{ marginTop: '6px', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
              Deferred value: <strong>"{deferredQuery}"</strong>
            </div>
          </div>

          <div>
            <button
              onClick={handleRunAsyncTransition}
              disabled={asyncTransition.isPending}
              className="btn btn-primary"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
                color: '#000',
                fontWeight: 700
              }}
            >
              {asyncTransition.isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Running Async Transition...
                </>
              ) : (
                'Trigger React 19 Async Transition'
              )}
            </button>

            {transitionResult && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: 'var(--accent-amber)',
                  fontSize: '0.82rem'
                }}
              >
                {transitionResult}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
