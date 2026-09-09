import React, { useState, useMemo } from 'react';
import { useShortcut, For } from 'ureact';
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
  Database,
  Minimize2,
  Search,
  BookOpen,
  Cpu,
  Package
} from 'lucide-react';
import { ALL_DOC_PAGES, DocItem } from '../docs/docsData';

export interface ShortcutMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (id: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function ShortcutMenuModal({
  isOpen,
  onClose,
  onSelectPage,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: ShortcutMenuModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Close on Escape
  useShortcut('escape', () => {
    if (isOpen) onClose();
  }, { enabled: isOpen });

  const staticActions = [
    {
      id: 'cmd-k',
      title: 'Open / Close Search & Shortcuts',
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
    }
  ];

  const filteredDocs = useMemo(() => {
    if (!searchTerm.trim()) {
      return ALL_DOC_PAGES;
    }
    const q = searchTerm.toLowerCase();
    return ALL_DOC_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
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
          maxWidth: '580px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25), 0 0 30px var(--accent-cyan-bg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Search */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--accent-cyan-bg)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Keyboard size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                  React.dev Search &amp; Palette
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Search 100% of React &amp; uReact documentation, or run commands
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="chip-btn"
              style={{
                padding: '6px',
                borderRadius: '6px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search React 19 Actions, useOptimistic, Suspense, SWR, store.$bind..."
              autoFocus
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                background: 'var(--bg-primary)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '10px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-cyan)';
                e.target.style.boxShadow = '0 0 0 3px var(--accent-cyan-bg)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Action / Doc Items List */}
        <div style={{ padding: '12px 14px', maxHeight: '420px', overflowY: 'auto', background: 'var(--bg-card)' }}>
          {/* Docs Section */}
          <div style={{ marginBottom: '14px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--text-dim)',
                letterSpacing: '0.05em',
                padding: '4px 8px 8px',
                textTransform: 'uppercase'
              }}
            >
              Documentation Pages ({filteredDocs.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredDocs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectPage(item.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-cyan-bg)';
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOpen size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        background:
                          item.badgeType === 'react19'
                            ? 'var(--callout-react19-bg)'
                            : item.badgeType === 'reduction'
                            ? 'var(--callout-tip-bg)'
                            : 'var(--accent-cyan-bg)',
                        color:
                          item.badgeType === 'react19'
                            ? 'var(--accent-amber)'
                            : item.badgeType === 'reduction'
                            ? 'var(--accent-emerald)'
                            : 'var(--accent-cyan)',
                        border:
                          item.badgeType === 'react19'
                            ? '1px solid rgba(217, 119, 6, 0.3)'
                            : item.badgeType === 'reduction'
                            ? '1px solid rgba(5, 150, 105, 0.3)'
                            : '1px solid var(--border-subtle)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Travel Commands */}
          {!searchTerm && (
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-dim)',
                  letterSpacing: '0.05em',
                  padding: '4px 8px 8px',
                  textTransform: 'uppercase'
                }}
              >
                Time-Travel &amp; Keybindings
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {staticActions.map((action) => (
                  <div
                    key={action.id}
                    onClick={() => {
                      if (!action.disabled) {
                        action.action();
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      cursor: action.disabled ? 'not-allowed' : 'pointer',
                      opacity: action.disabled ? 0.45 : 1,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!action.disabled) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!action.disabled) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: 500 }}>
                      {action.title}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {action.keys.map((k) => (
                        <kbd
                          key={k}
                          style={{
                            padding: '2px 7px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-cyan)',
                            fontWeight: 600
                          }}
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>Tip: Press <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>Esc</kbd> anytime to dismiss</span>
          <span>Powered by <strong style={{ color: 'var(--text-main)' }}>uReact useShortcut</strong></span>
        </div>
      </div>
    </div>
  );
}
