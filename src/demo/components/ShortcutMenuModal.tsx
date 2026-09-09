import React from 'react';
import { useShortcut, Show, For } from 'ureact';
import {
  Keyboard,
  X,
  Undo2,
  Redo2,
  Sparkles,
  FileText,
  Zap,
  Layers,
  History,
  CornerDownLeft,
  Database
} from 'lucide-react';

export interface ShortcutMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function ShortcutMenuModal({
  isOpen,
  onClose,
  onSelectTab,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: ShortcutMenuModalProps) {
  // Close on Escape
  useShortcut('escape', () => {
    if (isOpen) onClose();
  }, { enabled: isOpen });

  const shortcutItems = [
    {
      id: 'cmd-k',
      title: 'Open / Close Shortcuts Menu',
      keys: ['Ctrl', 'K'],
      category: 'General',
      action: () => onClose()
    },
    {
      id: 'undo',
      title: 'Undo Last Mutation (Time-Travel)',
      keys: ['Ctrl', 'Z'],
      category: 'Time-Travel',
      disabled: !canUndo,
      action: () => {
        onUndo?.();
      }
    },
    {
      id: 'redo',
      title: 'Redo Mutation (Time-Travel)',
      keys: ['Ctrl', 'Y'],
      category: 'Time-Travel',
      disabled: !canRedo,
      action: () => {
        onRedo?.();
      }
    },
    {
      id: 'tab-state',
      title: 'Jump to Reactive State (Store)',
      icon: <Sparkles size={15} style={{ color: 'var(--accent-cyan)' }} />,
      keys: ['1'],
      category: 'Navigation',
      action: () => {
        onSelectTab('state');
        onClose();
      }
    },
    {
      id: 'tab-form',
      title: 'Jump to Two-Way Forms (useForm)',
      icon: <FileText size={15} style={{ color: 'var(--accent-indigo)' }} />,
      keys: ['2'],
      category: 'Navigation',
      action: () => {
        onSelectTab('form');
        onClose();
      }
    },
    {
      id: 'tab-async',
      title: 'Jump to Async & Await (useAsync)',
      icon: <Zap size={15} style={{ color: 'var(--accent-amber)' }} />,
      keys: ['3'],
      category: 'Navigation',
      action: () => {
        onSelectTab('async');
        onClose();
      }
    },
    {
      id: 'tab-flow',
      title: 'Jump to Control Flow (<Show>, <For>)',
      icon: <Layers size={15} style={{ color: 'var(--accent-purple)' }} />,
      keys: ['4'],
      category: 'Navigation',
      action: () => {
        onSelectTab('flow');
        onClose();
      }
    },
    {
      id: 'tab-history',
      title: 'Jump to Time-Travel & Shortcuts',
      icon: <History size={15} style={{ color: 'var(--accent-rose)' }} />,
      keys: ['5'],
      category: 'Navigation',
      action: () => {
        onSelectTab('history');
        onClose();
      }
    },
    {
      id: 'tab-query',
      title: 'Jump to Global Query & SWR Cache',
      icon: <Database size={15} style={{ color: 'var(--accent-emerald)' }} />,
      keys: ['6'],
      category: 'Navigation',
      action: () => {
        onSelectTab('query');
        onClose();
      }
    },
    {
      id: 'tab-react19',
      title: 'Jump to React 19 Evolution',
      icon: <Zap size={15} style={{ color: 'var(--accent-cyan)' }} />,
      keys: ['7'],
      category: 'Navigation',
      action: () => {
        onSelectTab('react19');
        onClose();
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#0d121d',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Keyboard size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Shortcuts &amp; Command Palette</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Press key combinations or click actions below
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="chip-btn"
            style={{ padding: '6px', borderRadius: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Shortcuts List */}
        <div style={{ padding: '12px 14px', maxHeight: '420px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <For each={shortcutItems}>
              {(item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!item.disabled) {
                      item.action();
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.45 : 1,
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {item.icon || <CornerDownLeft size={14} style={{ color: 'var(--text-dim)' }} />}
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{item.title}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <For each={item.keys}>
                      {(k) => (
                        <kbd
                          key={k}
                          style={{
                            padding: '3px 7px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '5px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-cyan)'
                          }}
                        >
                          {k}
                        </kbd>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-dim)'
          }}
        >
          <span>Tip: Press <kbd style={{ padding: '1px 5px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>Esc</kbd> anytime to dismiss</span>
          <span>Powered by <strong>uReact useShortcut</strong></span>
        </div>
      </div>
    </div>
  );
}
