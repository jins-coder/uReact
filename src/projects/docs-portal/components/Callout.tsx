import React, { ReactNode } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, Zap } from 'lucide-react';

export interface CalloutProps {
  type?: 'note' | 'tip' | 'important' | 'pitfall' | 'react19';
  title?: string;
  children: ReactNode;
}

const CALLOUT_CONFIG = {
  note: {
    icon: Info,
    color: 'var(--accent-cyan)',
    bg: 'var(--callout-note-bg, rgba(2, 132, 199, 0.08))',
    border: 'var(--callout-note-border, rgba(2, 132, 199, 0.28))',
    defaultTitle: 'Note'
  },
  tip: {
    icon: CheckCircle2,
    color: 'var(--accent-emerald)',
    bg: 'var(--callout-tip-bg, rgba(5, 150, 105, 0.08))',
    border: 'var(--callout-tip-border, rgba(5, 150, 105, 0.28))',
    defaultTitle: 'Pro Tip'
  },
  important: {
    icon: AlertTriangle,
    color: 'var(--accent-indigo)',
    bg: 'var(--callout-important-bg, rgba(79, 70, 229, 0.08))',
    border: 'var(--callout-important-border, rgba(79, 70, 229, 0.28))',
    defaultTitle: 'Important Concept'
  },
  pitfall: {
    icon: AlertOctagon,
    color: 'var(--accent-rose)',
    bg: 'var(--callout-pitfall-bg, rgba(225, 29, 72, 0.08))',
    border: 'var(--callout-pitfall-border, rgba(225, 29, 72, 0.28))',
    defaultTitle: 'Common Pitfall in Standard React'
  },
  react19: {
    icon: Zap,
    color: 'var(--accent-amber)',
    bg: 'var(--callout-react19-bg, rgba(217, 119, 6, 0.08))',
    border: 'var(--callout-react19-border, rgba(217, 119, 6, 0.28))',
    defaultTitle: 'React 19 Native Feature'
  }
};

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const config = CALLOUT_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      style={{
        margin: '18px 0',
        padding: '16px 20px',
        borderRadius: '10px',
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderLeftWidth: '4px',
        borderLeftColor: config.color,
        color: 'var(--text-main)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          color: config.color,
          fontSize: '0.88rem',
          marginBottom: '8px'
        }}
      >
        <Icon size={16} strokeWidth={2.5} />
        <span>{title || config.defaultTitle}</span>
      </div>
      <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
        {children}
      </div>
    </div>
  );
}
