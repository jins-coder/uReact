import React from 'react';
import {
  Zap,
  Search,
  BookOpen,
  Code2,
  Package,
  Cpu,
  TrendingDown,
  Layers,
  Menu,
  X
} from 'lucide-react';

export interface DocHeaderProps {
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectPage: (id: string) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function DocHeader({
  onOpenSearch,
  activeCategory,
  onSelectPage,
  mobileMenuOpen,
  onToggleMobileMenu
}: DocHeaderProps) {
  return (
    <header
      className="doc-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(7, 9, 14, 0.85)',
        borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Left: Brand + Version */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleMobileMenu}
          className="mobile-toggle-btn btn btn-secondary"
          style={{ padding: '6px', display: 'none' }}
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div
          onClick={() => onSelectPage('quickstart')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent-cyan, #38bdf8), var(--accent-indigo, #6366f1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#030712'
            }}
          >
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#fff' }}>
              uReact
            </div>
          </div>
        </div>

        <span
          className="pill"
          style={{
            fontSize: '0.72rem',
            padding: '2px 8px',
            background: 'rgba(99, 102, 241, 0.15)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            color: '#c7d2fe'
          }}
        >
          v2.1.0 (React 19)
        </span>
      </div>

      {/* Middle: Global Search bar (like react.dev) */}
      <button
        onClick={onOpenSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '6px 16px',
          color: 'var(--text-muted, #94a3b8)',
          fontSize: '0.82rem',
          cursor: 'pointer',
          width: '280px',
          transition: 'all 0.2s ease'
        }}
        className="doc-search-trigger"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={14} />
          <span>Search docs &amp; APIs...</span>
        </div>
        <kbd
          style={{
            fontSize: '0.7rem',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--text-muted, #94a3b8)'
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      {/* Right: Section Links & GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <nav className="header-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => onSelectPage('quickstart')}
            className={`tab-btn-ghost ${activeCategory === 'quickstart' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            Learn
          </button>
          <button
            onClick={() => onSelectPage('reactive-state')}
            className={`tab-btn-ghost ${activeCategory === 'reactive-state' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            Reference
          </button>
          <button
            onClick={() => onSelectPage('react19-actions')}
            className={`tab-btn-ghost ${activeCategory === 'react19-actions' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            React 19
          </button>
          <button
            onClick={() => onSelectPage('code-reducer')}
            className={`tab-btn-ghost ${activeCategory === 'code-reducer' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px', color: 'var(--accent-emerald, #10b981)' }}
          >
            -89% Reducer
          </button>
        </nav>

        <a
          href="https://github.com/facebook/react"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-main, #f8fafc)',
            transition: 'all 0.2s ease'
          }}
          title="View React GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </a>
      </div>
    </header>
  );
}
