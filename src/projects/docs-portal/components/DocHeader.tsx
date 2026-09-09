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
  X,
  Sun,
  Moon
} from 'lucide-react';

export interface DocHeaderProps {
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectPage: (id: string) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function DocHeader({
  onOpenSearch,
  activeCategory,
  onSelectPage,
  mobileMenuOpen,
  onToggleMobileMenu,
  theme = 'light',
  onToggleTheme
}: DocHeaderProps) {
  return (
    <header
      className="doc-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-subtle)',
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
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>uReact</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '12px',
                  background: 'var(--accent-cyan-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--accent-cyan)',
                  fontWeight: 700
                }}
              >
                react.dev docs
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
            paddingLeft: '12px',
            borderLeft: '1px solid var(--border-subtle)'
          }}
          className="header-version"
        >
          v2.1.0
        </div>
      </div>

      {/* Middle: Global Search Input Trigger */}
      <div
        style={{
          flex: '0 1 420px',
          margin: '0 20px'
        }}
        className="header-search-wrapper"
      >
        <button
          onClick={onOpenSearch}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '7px 14px',
            borderRadius: '10px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-dim)',
            fontSize: '0.84rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          className="search-trigger-btn"
          title="Press Ctrl+K or Cmd+K to search documentation"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={15} />
            <span>Search React &amp; uReact docs...</span>
          </div>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)'
            }}
          >
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Links + Theme Toggle + GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <nav className="header-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => onSelectPage('quickstart')}
            className={`tab-btn-ghost ${activeCategory === 'GETTING STARTED' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            Learn
          </button>
          <button
            onClick={() => onSelectPage('hooks-reference')}
            className={`tab-btn-ghost ${activeCategory === 'REFERENCE & TOOLS' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            Reference
          </button>
          <button
            onClick={() => onSelectPage('react19-actions')}
            className={`tab-btn-ghost ${activeCategory === 'REACT 19 NATIVE ENGINE' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
          >
            React 19
          </button>
          <button
            onClick={() => onSelectPage('code-reducer')}
            className={`tab-btn-ghost ${activeCategory === 'code-reducer' ? 'active' : ''}`}
            style={{ fontSize: '0.82rem', padding: '6px 12px', color: 'var(--accent-emerald)' }}
          >
            -89% Reducer
          </button>
        </nav>

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        )}

        <a
          href="https://github.com/facebook/react"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
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
