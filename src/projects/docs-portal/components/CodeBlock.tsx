import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div
      style={{
        borderRadius: '10px',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
        background: 'rgba(10, 15, 26, 0.85)',
        overflow: 'hidden',
        margin: '16px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          fontSize: '0.78rem',
          color: 'var(--text-muted, #94a3b8)'
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text-main, #f8fafc)', fontFamily: 'var(--font-mono)' }}>
          {title || language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: copied ? 'var(--accent-emerald, #10b981)' : 'var(--text-muted, #94a3b8)',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            transition: 'all 0.2s ease'
          }}
          title="Copy code to clipboard"
        >
          {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: '16px',
          overflowX: 'auto',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.85rem',
          lineHeight: '1.65',
          color: '#e2e8f0'
        }}
      >
        <code>
          {showLineNumbers
            ? lines.map((line, idx) => (
                <div key={idx} style={{ display: 'flex' }}>
                  <span
                    style={{
                      userSelect: 'none',
                      color: 'rgba(255, 255, 255, 0.2)',
                      width: '32px',
                      flexShrink: 0,
                      textAlign: 'right',
                      paddingRight: '16px'
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            : code.trim()}
        </code>
      </pre>
    </div>
  );
}
