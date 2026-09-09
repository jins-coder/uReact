import React from 'react';
import { createHistoryStore, useHistoryStore, useShortcut } from 'ureact';
import { Undo2, Redo2, History, RotateCcw, Palette, Keyboard } from 'lucide-react';

const canvasStore = createHistoryStore({
  color: '#38bdf8',
  radius: 24,
  text: 'uReact v1.1.0 Time Travel',
  elements: ['Box 1', 'Box 2']
});

export function HistoryDemo() {
  const { state, undo, redo, canUndo, canRedo, history, reset } = useHistoryStore(canvasStore);

  // Bind keyboard shortcuts
  useShortcut(['mod+z', 'ctrl+z'], () => undo(), { preventDefault: true });
  useShortcut(['mod+y', 'ctrl+y', 'mod+shift+z'], () => redo(), { preventDefault: true });

  const colors = ['#38bdf8', '#818cf8', '#34d399', '#f43f5e', '#fbbf24', '#e879f9'];

  return (
    <div>
      <div className="panel-header">
        <div>
          <h3 className="panel-title">
            <History size={20} style={{ color: 'var(--accent-purple)' }} />
            Time-Travel State &amp; Shortcuts (<code>createHistoryStore</code> &amp; <code>useShortcut</code>)
          </h3>
          <p className="panel-subtitle">
            Zero-overhead Undo/Redo state management with keyboard shortcuts (<code>Cmd/Ctrl+Z</code>, <code>Cmd/Ctrl+Y</code>). Step backward and forward through your application state effortlessly.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => reset()} className="btn btn-secondary">
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      <div className="interactive-playground">
        {/* Controls */}
        <div className="widget-card">
          <h4 className="widget-title">
            <Palette size={18} style={{ color: 'var(--accent-cyan)' }} />
            Interactive Canvas Editor
          </h4>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            <button
              onClick={() => undo()}
              disabled={!canUndo}
              className="btn btn-secondary"
              style={{ flex: 1, opacity: canUndo ? 1 : 0.4 }}
            >
              <Undo2 size={16} /> Undo (Ctrl+Z)
            </button>
            <button
              onClick={() => redo()}
              disabled={!canRedo}
              className="btn btn-secondary"
              style={{ flex: 1, opacity: canRedo ? 1 : 0.4 }}
            >
              <Redo2 size={16} /> Redo (Ctrl+Y)
            </button>
          </div>

          {/* Color Palette */}
          <div className="form-group">
            <label className="form-label">Pick Color (triggers new history snapshot)</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => { state.color = c; }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: state.color === c ? '3px solid #fff' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: state.color === c ? `0 0 12px ${c}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="form-group">
            <label className="form-label">Badge Text</label>
            <input
              type="text"
              className="input-field"
              value={state.text}
              onChange={(e) => { state.text = e.target.value; }}
            />
          </div>

          {/* Border Radius */}
          <div className="form-group">
            <label className="form-label">Border Radius: {state.radius}px</label>
            <input
              type="range"
              min="0"
              max="50"
              className="input-field"
              value={state.radius}
              onChange={(e) => { state.radius = Number(e.target.value); }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '12px' }}>
            <Keyboard size={14} /> Shortcuts active: Press <code>Ctrl+Z</code> or <code>Cmd+Z</code> to undo, <code>Ctrl+Y</code> to redo.
          </div>
        </div>

        {/* Live Canvas & Timeline */}
        <div className="widget-card">
          <h4 className="widget-title">Live Render Preview &amp; History Stack</h4>

          {/* Render Preview */}
          <div
            style={{
              padding: '30px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '16px 28px',
                backgroundColor: state.color,
                color: '#030712',
                fontWeight: 800,
                fontSize: '1.1rem',
                borderRadius: `${state.radius}px`,
                boxShadow: `0 8px 30px ${state.color}55`,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {state.text || 'Preview'}
            </div>
          </div>

          {/* History Stack Inspector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="form-label">History Stack ({history.length} snapshots)</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>
                canUndo: {canUndo ? 'true' : 'false'} | canRedo: {canRedo ? 'true' : 'false'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
              {history.map((snap, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: snap.color }}></span>
                    <span>Snapshot #{idx + 1}: "{snap.text}"</span>
                  </div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>r: {snap.radius}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
