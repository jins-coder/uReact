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
        backgroundColor: 'rgba(3, 7, 18, 0.8)',
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
          backgroundColor: '#0d121d',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Search */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: 'var(--accent-cyan, #38bdf8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Keyboard size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main, #f8fafc)' }}>
                  React.dev Search &amp; Palette
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #94a3b8)' }}>
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
                color: 'var(--text-muted, #94a3b8)',
                cursor: 'pointer'
              }}
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
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-dim, #64748b)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search React 19 Actions, useOptimistic, Suspense, SWR, store.$bind..."
              autoFocus
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '10px',
                color: 'var(--text-main, #f8fafc)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Action / Doc Items List */}
        <div style={{ padding: '12px 14px', maxHeight: '420px', overflowY: 'auto' }}>
          {/* Docs Section */}
          <div style={{ marginBottom: '14px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--text-dim, #64748b)',
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
                    padding: '9px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen size={15} style={{ color: 'var(--accent-cyan, #38bdf8)' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main, #f8fafc)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted, #94a3b8)' }}>
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        background:
                          item.badgeType === 'react19'
                            ? 'rgba(245, 158, 11, 0.2)'
                            : item.badgeType === 'reduction'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : 'rgba(56, 189, 248, 0.15)',
                        color:
                          item.badgeType === 'react19'
                            ? '#fbbf24'
                            : item.badgeType === 'reduction'
                            ? '#34d399'
                            : '#38bdf8'
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
                  color: 'var(--text-dim, #64748b)',
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
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      cursor: action.disabled ? 'not-allowed' : 'pointer',
                      opacity: action.disabled ? 0.4 : 1
                    }}
                  >
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-main, #f8fafc)' }}>
                      {action.title}
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {action.keys.map((k) => (
                        <kbd
                          key={k}
                          style={{
                            padding: '2px 6px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--accent-cyan, #38bdf8)'
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
            borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-dim, #64748b)'
          }}
        >
          <span>Tip: Press <kbd style={{ padding: '1px 5px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>Esc</kbd> anytime to dismiss</span>
          <span>Powered by <strong>uReact useShortcut</strong></span>
        </div>
      </div>
    </div>
  );
}
