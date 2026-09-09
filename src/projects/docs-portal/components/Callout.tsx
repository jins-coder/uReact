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
    color: 'var(--accent-cyan, #38bdf8)',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
    defaultTitle: 'Note'
  },
  tip: {
    icon: CheckCircle2,
    color: 'var(--accent-emerald, #10b981)',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)',
    defaultTitle: 'Pro Tip'
  },
  important: {
    icon: AlertTriangle,
    color: 'var(--accent-indigo, #6366f1)',
    bg: 'rgba(99, 102, 241, 0.08)',
    border: 'rgba(99, 102, 241, 0.25)',
    defaultTitle: 'Important Concept'
  },
  pitfall: {
    icon: AlertOctagon,
    color: 'var(--accent-rose, #f43f5e)',
    bg: 'rgba(244, 63, 94, 0.08)',
    border: 'rgba(244, 63, 94, 0.25)',
    defaultTitle: 'Common Pitfall in Standard React'
  },
  react19: {
    icon: Zap,
    color: 'var(--accent-amber, #f59e0b)',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.25)',
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
        color: 'var(--text-main, #f8fafc)'
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
      <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: '#e2e8f0' }}>
        {children}
      </div>
    </div>
  );
}
