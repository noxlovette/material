import { SvelteMap } from 'svelte/reactivity';

export type DragPosition = { x: number; y: number; width?: number; height?: number };

/**
 * Shared, localStorage-backed position/size registry keyed by `persistKey`. A
 * `DraggablePane` reads/writes its own entry here so its last dragged
 * position and (once resized) size survive reloads without the consumer
 * having to manage it.
 */
const positions = new SvelteMap<string, DragPosition>();

function get(key: string): DragPosition | undefined {
  return positions.get(key);
}

/** Seeds `key` from localStorage (or `fallback`) the first time it's read; a no-op after that. */
function hydrate(key: string, fallback: DragPosition): DragPosition {
  if (positions.has(key)) return positions.get(key)!;

  let initial = fallback;
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') initial = parsed;
      } catch {
        // malformed stored value — fall back to `fallback`
      }
    }
  }

  positions.set(key, initial);
  return initial;
}

function set(key: string, value: DragPosition): void {
  positions.set(key, value);
  if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
}

export const dragPositions = { get, hydrate, set };
