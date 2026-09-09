import React, { useState, Suspense } from 'react';
import { useAction, useActionStatus, usePromise, Head } from 'ureact';
import {
  Zap,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Globe,
  Radio,
  Clock
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  isOptimistic?: boolean;
}

// Child component testing React 19 useFormStatus
function ActionSubmitButton() {
  const status = useActionStatus();
  return (
    <button
      type="submit"
      disabled={status.pending}
      className="btn btn-primary"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {status.pending ? (
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

// Simulated promise for React 19 use(Promise) demo
function createDataPromise() {
  return new Promise<{ message: string; timestamp: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Resolved via React 19 use(Promise) inside a Suspense boundary!',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 1200);
  });
}

let activePromise = createDataPromise();

function SuspendedResource({ promise }: { promise: Promise<any> }) {
  const result = usePromise(promise);
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
  const [commentsList, setCommentsList] = useState<Comment[]>([
    { id: '1', author: 'Dan', text: 'React 19 Actions and useOptimistic are incredible.', timestamp: '10:14 AM' },
    { id: '2', author: 'Sophie', text: 'uReact makes the React 19 API 10x easier to write.', timestamp: '10:22 AM' }
  ]);

  const [authorInput, setAuthorInput] = useState('Alex');
  const [commentInput, setCommentInput] = useState('');
  const [pageTitle, setPageTitle] = useState('uReact v2.0 — Powered by React 19');
  const [resourcePromise, setResourcePromise] = useState(activePromise);

  // React 19 useAction with automatic useOptimistic
  const action = useAction<
    { author: string; text: string },
    Comment[]
  >(
    async (prev, input) => {
      // Simulate server network latency
      await new Promise((r) => setTimeout(r, 900));

      const newComment: Comment = {
        id: Math.random().toString(36).substring(7),
        author: input.author,
        text: input.text,
        timestamp: new Date().toLocaleTimeString()
      };

      const updated = [...prev, newComment];
      setCommentsList(updated);
      return updated;
    },
    commentsList,
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

  return (
    <div>
      {/* React 19 Native Document Metadata Hoisting */}
      <Head title={pageTitle} description="uReact v2.0 powered natively by React 19 engine" />

      <div className="panel-header">
        <div>
          <h3 className="panel-title">
            <Zap size={20} style={{ color: 'var(--accent-cyan)' }} />
            React 19 Native Evolution (Actions, <code>useOptimistic</code>, <code>use(Promise)</code>, Metadata)
          </h3>
          <p className="panel-subtitle">
            uReact v2.0 is built natively on top of <strong>React 19</strong>. Experience concurrent transitions, optimistic UI updates, zero-ceremony form actions, and native <code>&lt;head&gt;</code> document hoisting.
          </p>
        </div>
        <div className="pill" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
          React 19 Engine Active
        </div>
      </div>

      {/* Side by side code comparison */}
      <div className="comparison-grid">
        <div className="code-box standard">
          <div className="code-box-header">
            <span>Standard React 19 (Raw useActionState + useOptimistic)</span>
            <span className="code-box-badge badge-bad">Ceremony &amp; Boilerplate</span>
          </div>
          <pre className="code-content">
            <code>{`const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const text = formData.get('text');
    return await saveComment(text);
  },
  initialComments
);

const [optimistic, setOptimistic] = useOptimistic(
  state,
  (prev, update) => [...prev, update]
);

// Manual transition wrapping and FormData parsing`}</code>
          </pre>
        </div>

        <div className="code-box ureact">
          <div className="code-box-header">
            <span>uReact v2.0 (Unified useAction)</span>
            <span className="code-box-badge badge-good">One Clean Hook</span>
          </div>
          <pre className="code-content">
            <code>{`// Typed payload + built-in React 19 useOptimistic:
const action = useAction(
  saveComment, 
  initialComments,
  {
    optimisticUpdate: (prev, input) => [...prev, input]
  }
);

// In JSX:
<button onClick={() => action.run({ text })}>Post</button>`}</code>
          </pre>
        </div>
      </div>

      <div className="interactive-playground">
        {/* Left: React 19 Actions & useOptimistic */}
        <div className="widget-card">
          <h4 className="widget-title">
            <MessageSquare size={18} style={{ color: 'var(--accent-cyan)' }} />
            1. React 19 Actions &amp; Optimistic Comments
          </h4>

          <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
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
              <ActionSubmitButton />
            </div>
          </form>

          {/* Comment list with optimistic indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
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

        {/* Right: React 19 Document Metadata & use(Promise) */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Globe size={18} style={{ color: 'var(--accent-indigo)' }} />
            2. Native React 19 Metadata &amp; use(Promise)
          </h4>

          {/* Metadata Hoisting demo */}
          <div style={{ marginBottom: '20px' }}>
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
              Check your browser tab! React 19 hoists <code>&lt;title&gt;</code> directly to the document head.
            </p>
          </div>

          {/* React 19 use(Promise) Suspense demo */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="form-label" style={{ margin: 0 }}>
                React 19 <code>use(Promise)</code> with &lt;Suspense&gt;:
              </span>
              <button
                onClick={() => setResourcePromise(createDataPromise())}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              >
                Re-trigger Promise
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
                  <Loader2 size={16} className="animate-spin" style={{ marginBottom: '4px' }} />
                  <div>Suspended by React 19 use() hook... resolving promise</div>
                </div>
              }
            >
              <SuspendedResource promise={resourcePromise} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
