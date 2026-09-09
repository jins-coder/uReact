import React from 'react';
import { DOC_CATEGORIES, DocItem } from '../docs/docsData';
import { Link } from 'ureact';

export interface DocSidebarProps {
  activePageId: string;
  onSelectPage: (id: string) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export function DocSidebar({
  activePageId,
  onSelectPage,
  mobileMenuOpen,
  onCloseMobileMenu
}: DocSidebarProps) {
  const handleItemClick = (id: string) => {
    onSelectPage(id);
    onCloseMobileMenu();
  };

  return (
    <aside
      className={`doc-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}
      style={{
        width: '280px',
        flexShrink: 0,
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: 'auto',
        padding: '24px 16px 40px',
        borderRight: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        background: 'var(--bg-sidebar)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {DOC_CATEGORIES.map((cat, idx) => (
          <div key={idx}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--text-dim, #64748b)',
                padding: '0 12px 8px',
                textTransform: 'uppercase'
              }}
            >
              {cat.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {cat.items.map((item) => {
                const isActive = item.id === activePageId;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => handleItemClick(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                      color: isActive ? 'var(--accent-cyan, #38bdf8)' : 'var(--text-muted, #94a3b8)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </span>

                    {item.badge && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginLeft: '8px',
                          background:
                            item.badgeType === 'react19'
                              ? 'rgba(245, 158, 11, 0.15)'
                              : item.badgeType === 'reduction'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : item.badgeType === 'new'
                              ? 'rgba(168, 85, 247, 0.15)'
                              : 'rgba(255, 255, 255, 0.08)',
                          color:
                            item.badgeType === 'react19'
                              ? '#fbbf24'
                              : item.badgeType === 'reduction'
                              ? '#34d399'
                              : item.badgeType === 'new'
                              ? '#c084fc'
                              : 'var(--text-muted, #94a3b8)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
