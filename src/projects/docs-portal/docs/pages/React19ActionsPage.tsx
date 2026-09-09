import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';
import { Callout } from '../../components/Callout';
import { React19Demo } from '../../examples/React19Demo';
import { Zap, Sparkles, Send, RotateCcw } from 'lucide-react';

export function React19ActionsPage() {
  return (
    <article className="doc-content">
      <div className="doc-breadcrumb">React 19 Native Engine &gt; Actions &amp; useOptimistic</div>

      <h1 className="doc-title">React 19 Actions &amp; useOptimistic</h1>
      <p className="doc-lead">
        React 19 introduces native <strong>Actions</strong> and the <strong>useOptimistic</strong> hook. In uReact, the <code>useAction</code> hook unifies <code>useActionState</code> and <code>useOptimistic</code> into a single typed interface with zero ceremony.
      </p>

      <Callout type="react19" title="React 19 Native Feature">
        Actions in React 19 run inside concurrent transitions. They automatically handle pending states, optimistic updates, and form submissions without manual <code>isPending</code> flags or <code>e.preventDefault()</code>.
      </Callout>

      <h2 id="use-action">1. The useAction Hook</h2>
      <p>
        Compare standard React 19 boilerplate with uReact's unified <code>useAction</code>:
      </p>

      <CodeBlock
        code={`import { useAction } from 'ureact';

interface Comment {
  id: string;
  text: string;
}

export function CommentsSection() {
  const action = useAction<
    { text: string }, // Action payload type
    Comment[]         // State type
  >(
    async (prev, payload) => {
      // Async server call
      const saved = await api.postComment(payload.text);
      return [...prev, saved];
    },
    initialComments,
    {
      // Instant 0ms optimistic UI update before server responds:
      optimisticUpdate: (prev, payload) => [
        ...prev,
        { id: 'temp', text: payload.text, isOptimistic: true }
      ]
    }
  );

  return (
    <div>
      {/* action.data automatically reflects optimistic state */}
      {action.data.map(c => <div key={c.id}>{c.text}</div>)}

      {/* Direct execution with typed payload */}
      <button 
        disabled={action.isPending} 
        onClick={() => action.run({ text: 'Hello React 19!' })}
      >
        {action.isPending ? 'Sending...' : 'Post'}
      </button>
    </div>
  );
}`}
        language="tsx"
        title="useActionExample.tsx"
        showLineNumbers
      />

      <h2 id="form-status">2. Nested Status &amp; Reset</h2>
      <p>
        Use <code>useActionStatus</code> to check if a parent form action is executing from any deeply nested button or input, and <code>resetForm</code> to trigger native React 19 form resets:
      </p>

      <CodeBlock
        code={`import { useActionStatus, resetForm } from 'ureact';

export function SubmitButton() {
  const { pending } = useActionStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Submit'}</button>;
}`}
        language="tsx"
        title="useActionStatus.tsx"
      />

      <h2 id="live-demo">3. Interactive Live Playground</h2>
      <p style={{ marginBottom: '16px' }}>
        Experience instant optimistic UI updates and concurrent action transitions live:
      </p>

      <React19Demo />
    </article>
  );
}
