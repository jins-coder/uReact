import { useEffect, useRef } from 'react';

export type KeyCombo = string;

/**
 * Declarative keyboard shortcut hook.
 * 
 * Examples:
 *   useShortcut('Control+k', () => openCommandPalette());
 *   useShortcut('Meta+k', () => openCommandPalette());
 *   useShortcut('Escape', () => closeModal());
 *   useShortcut(['Control+s', 'Meta+s'], (e) => { e.preventDefault(); save(); });
 */
export function useShortcut(
  combo: KeyCombo | KeyCombo[],
  handler: (event: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {}
) {
  const { enabled = true, preventDefault = false } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const combos = Array.isArray(combo) ? combo : [combo];

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const c of combos) {
        const parts = c.toLowerCase().split('+').map((p) => p.trim());
        const hasCtrl = parts.includes('ctrl') || parts.includes('control');
        const hasMeta = parts.includes('meta') || parts.includes('cmd') || parts.includes('command');
        const hasShift = parts.includes('shift');
        const hasAlt = parts.includes('alt');

        const keyPart = parts.find((p) => !['ctrl', 'control', 'meta', 'cmd', 'command', 'shift', 'alt'].includes(p));

        const ctrlMatch = hasCtrl ? event.ctrlKey : !event.ctrlKey;
        const metaMatch = hasMeta ? event.metaKey : !event.metaKey;
        const shiftMatch = hasShift ? event.shiftKey : !event.shiftKey;
        const altMatch = hasAlt ? event.altKey : !event.altKey;

        // Handle modifier combos like mod+k (matches either ctrl or meta)
        const isMod = parts.includes('mod');
        const modMatch = isMod ? (event.ctrlKey || event.metaKey) : true;

        const keyMatch = !keyPart || event.key.toLowerCase() === keyPart.toLowerCase();

        if (isMod) {
          if (modMatch && keyMatch) {
            if (preventDefault) event.preventDefault();
            handlerRef.current(event);
            return;
          }
        } else if (ctrlMatch && metaMatch && shiftMatch && altMatch && keyMatch) {
          if (preventDefault) event.preventDefault();
          handlerRef.current(event);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [combo, enabled, preventDefault]);
}
