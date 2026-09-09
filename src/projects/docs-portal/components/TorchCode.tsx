import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface TorchCodeProps {
  code: string;
  title?: string;
  badge?: string;
  badgeType?: 'bad' | 'good' | 'emerald' | 'neutral';
  highlightLines?: number[];
  className?: string;
  style?: React.CSSProperties;
}

const TOKEN_REGEX = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z0-9_]+|[A-Za-z0-9_]+(?=\/?>))|(\b(?:const|let|var|function|return|export|import|from|default|if|else|async|await|new|type|interface)\b)|(\b(?:useState|useEffect|useActionState|useOptimistic|createStore|createListStore|view|bind|prevent|AutoForm|ActionForm|ActionSubmitButton|For|Show|Switch|Case|Default|Await|useCounter|useArray|useToggle|useQuery|useMutation|setTodos|setName|setRole|setNotif)\b)|(\b(?:true|false|null|undefined|\d+)\b)|(\b(?:onSubmit|onClick|onChange|checked|value|each|store|key|style|type|role|category|done|title|name|notif)\b)|(=>|\.\.\.|===|!==|==|!=|&&|\|\||[{}()[\]=;,<>])/g;

function tokenizeLine(lineText: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(lineText)) !== null) {
    if (match.index > lastIdx) {
      nodes.push(lineText.slice(lastIdx, match.index));
    }

    const [
      full,
      comment,
      str,
      tag,
      keyword,
      func,
      literal,
      prop,
      op
    ] = match;

    if (comment) {
      nodes.push(<span key={match.index} className="tok-comm">{comment}</span>);
    } else if (str) {
      nodes.push(<span key={match.index} className="tok-str">{str}</span>);
    } else if (tag) {
      nodes.push(<span key={match.index} className="tok-tag">{tag}</span>);
    } else if (keyword) {
      nodes.push(<span key={match.index} className="tok-kwd">{keyword}</span>);
    } else if (func) {
      nodes.push(<span key={match.index} className="tok-func">{func}</span>);
    } else if (literal) {
      nodes.push(<span key={match.index} className="tok-num">{literal}</span>);
    } else if (prop) {
      nodes.push(<span key={match.index} className="tok-prop">{prop}</span>);
    } else if (op) {
      nodes.push(<span key={match.index} className="tok-op">{op}</span>);
    } else {
      nodes.push(full);
    }

    lastIdx = TOKEN_REGEX.lastIndex;
  }

  if (lastIdx < lineText.length) {
    nodes.push(lineText.slice(lastIdx));
  }

  return nodes.length > 0 ? nodes : [' '];
}

export function TorchCode({
  code,
  title,
  badge,
  badgeType = 'neutral',
  highlightLines = [],
  className = '',
  style = {}
}: TorchCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
    bad: {
      bg: 'rgba(244, 63, 94, 0.12)',
      color: 'var(--accent-rose)',
      border: 'rgba(244, 63, 94, 0.25)'
    },
    good: {
      bg: 'rgba(2, 132, 199, 0.12)',
      color: 'var(--accent-cyan)',
      border: 'rgba(2, 132, 199, 0.25)'
    },
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      color: 'var(--accent-emerald)',
      border: 'rgba(16, 185, 129, 0.25)'
    },
    neutral: {
      bg: 'var(--bg-secondary)',
      color: 'var(--text-muted)',
      border: 'var(--border-subtle)'
    }
  };

  const currentBadge = badgeStyles[badgeType] || badgeStyles.neutral;

  return (
    <div className={`torch-box ${className}`} style={style}>
      {/* Torchlight Window Header */}
      <div className="torch-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Mac/Torchlight Window Dots */}
          <div className="torch-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          {title && <span className="torch-title">{title}</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {badge && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: currentBadge.bg,
                color: currentBadge.color,
                border: `1px solid ${currentBadge.border}`
              }}
            >
              {badge}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="torch-copy-btn"
            title="Copy code"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Body with Torchlight Highlights */}
      <pre className="torch-pre code-content">
        <code>
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightLines.includes(lineNum);
            return (
              <div
                key={idx}
                className={`torch-line ${isHighlighted ? 'highlighted' : ''}`}
              >
                <span className="torch-line-num">{lineNum}</span>
                <span className="torch-line-content">{tokenizeLine(line)}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
