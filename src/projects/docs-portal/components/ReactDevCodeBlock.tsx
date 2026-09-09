import React, { useState, useEffect } from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';

export interface ReactDevCodeProps {
  code: string;
  language?: string;
  title?: string;
  badge?: string;
  badgeType?: 'bad' | 'good' | 'emerald' | 'neutral';
  highlightLines?: number[];
  showLineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * The authentic react.dev Prism syntax theme for Light Mode
 */
export const reactDevLightTheme: PrismTheme = {
  plain: {
    color: '#24292f',
    backgroundColor: '#ffffff'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6e7781',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#0a3069'
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: '#24292f'
      }
    },
    {
      types: ['operator'],
      style: {
        color: '#cf222e'
      }
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property'],
      style: {
        color: '#0550ae'
      }
    },
    {
      types: ['atrule', 'keyword'],
      style: {
        color: '#cf222e',
        fontWeight: '600'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: '#953800'
      }
    },
    {
      types: ['function', 'function-variable', 'class-name'],
      style: {
        color: '#8250df',
        fontWeight: '600'
      }
    },
    {
      types: ['tag'],
      style: {
        color: '#116329',
        fontWeight: '600'
      }
    },
    {
      types: ['inserted'],
      style: {
        color: '#116329',
        backgroundColor: 'rgba(17, 99, 41, 0.08)'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: '#cf222e',
        backgroundColor: 'rgba(207, 34, 46, 0.08)'
      }
    }
  ]
};

/**
 * The authentic react.dev Prism syntax theme for Dark Mode
 */
export const reactDevDarkTheme: PrismTheme = {
  plain: {
    color: '#e6edf3',
    backgroundColor: '#16181d'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#8b949e',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#a5d6ff'
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: '#e6edf3'
      }
    },
    {
      types: ['operator'],
      style: {
        color: '#ff7b72'
      }
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property'],
      style: {
        color: '#79c0ff'
      }
    },
    {
      types: ['atrule', 'keyword'],
      style: {
        color: '#ff7b72',
        fontWeight: '600'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: '#ffa657'
      }
    },
    {
      types: ['function', 'function-variable', 'class-name'],
      style: {
        color: '#d2a8ff',
        fontWeight: '600'
      }
    },
    {
      types: ['tag'],
      style: {
        color: '#7ee787',
        fontWeight: '600'
      }
    },
    {
      types: ['inserted'],
      style: {
        color: '#7ee787',
        backgroundColor: 'rgba(126, 231, 135, 0.12)'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: '#ff7b72',
        backgroundColor: 'rgba(255, 123, 114, 0.12)'
      }
    }
  ]
};

/**
 * Hook to reactively observe document theme changes
 */
function usePortalTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const update = () => {
      const cur = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
      setTheme(cur);
    };

    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return theme;
}

/**
 * react.dev Authentic Code Block Component powered by prism-react-renderer
 */
export function ReactDevCodeBlock({
  code,
  language = 'tsx',
  title,
  badge,
  badgeType = 'neutral',
  highlightLines = [],
  showLineNumbers = false,
  className = '',
  style = {}
}: ReactDevCodeProps) {
  const themeMode = usePortalTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activePrismTheme = themeMode === 'dark' ? reactDevDarkTheme : reactDevLightTheme;

  const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
    bad: {
      bg: 'rgba(244, 63, 94, 0.12)',
      color: 'var(--accent-rose, #e11d48)',
      border: 'rgba(244, 63, 94, 0.25)'
    },
    good: {
      bg: 'rgba(2, 132, 199, 0.12)',
      color: 'var(--accent-cyan, #0284c7)',
      border: 'rgba(2, 132, 199, 0.25)'
    },
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      color: 'var(--accent-emerald, #059669)',
      border: 'rgba(16, 185, 129, 0.25)'
    },
    neutral: {
      bg: 'var(--bg-secondary)',
      color: 'var(--text-muted)',
      border: 'var(--border-subtle)'
    }
  };

  const badgeStyle = badgeStyles[badgeType] || badgeStyles.neutral;

  // Normalize language for Prism
  const cleanLang = language.toLowerCase() === 'typescript' || language.toLowerCase() === 'ts'
    ? 'tsx'
    : language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js'
    ? 'jsx'
    : language.toLowerCase() === 'shell' || language.toLowerCase() === 'terminal'
    ? 'bash'
    : language.toLowerCase();

  return (
    <div
      className={`react-dev-code-box ${className}`}
      style={{
        margin: '16px 0',
        borderRadius: '12px',
        border: '1px solid var(--code-border, #e5e7eb)',
        background: activePrismTheme.plain.backgroundColor,
        overflow: 'hidden',
        boxShadow: themeMode === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.05)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
        transition: 'all 0.2s ease',
        ...style
      }}
    >
      {/* Header Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: themeMode === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid var(--code-border, #e5e7eb)',
          fontSize: '0.8rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* react.dev Window Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              marginLeft: '4px'
            }}
          >
            {title || cleanLang.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {badge && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: badgeStyle.bg,
                color: badgeStyle.color,
                border: `1px solid ${badgeStyle.border}`
              }}
            >
              {badge}
            </span>
          )}

          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 9px',
              borderRadius: '6px',
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontSize: '0.72rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Copy code to clipboard"
          >
            {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Body via prism-react-renderer */}
      <Highlight
        theme={activePrismTheme}
        code={code.trim()}
        language={cleanLang as any}
      >
        {({ className: prismClass, style: prismStyle, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`code-content ${prismClass}`}
            style={{
              ...prismStyle,
              margin: 0,
              padding: '14px 0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              lineHeight: '1.7',
              overflowX: 'auto',
              background: 'transparent'
            }}
          >
            <code>
              {tokens.map((line, idx) => {
                const lineNum = idx + 1;
                const isHighlighted = highlightLines.includes(lineNum);
                const lineProps = getLineProps({ line, key: idx });

                return (
                  <div
                    {...lineProps}
                    key={idx}
                    style={{
                      display: 'flex',
                      padding: '0 16px',
                      background: isHighlighted
                        ? themeMode === 'light'
                          ? 'rgba(2, 132, 199, 0.08)'
                          : 'rgba(56, 189, 248, 0.12)'
                        : 'transparent',
                      borderLeft: isHighlighted
                        ? `3px solid ${themeMode === 'light' ? '#0284c7' : '#38bdf8'}`
                        : '3px solid transparent',
                      paddingLeft: isHighlighted ? '13px' : '16px',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    {showLineNumbers && (
                      <span
                        style={{
                          width: '26px',
                          flexShrink: 0,
                          textAlign: 'right',
                          marginRight: '16px',
                          color: themeMode === 'light' ? '#94a3b8' : '#64748b',
                          userSelect: 'none',
                          fontSize: '0.75rem',
                          opacity: 0.6
                        }}
                      >
                        {lineNum}
                      </span>
                    )}
                    <span style={{ flex: 1, whiteSpace: 'pre' }}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} key={key} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
