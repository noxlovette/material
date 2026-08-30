import { SvelteMap } from 'svelte/reactivity';

/**
 * Shared, localStorage-backed width registry keyed by `persistKey`. A `Pane`
 * and a `PaneHandle` that share the same `persistKey` stay in sync through
 * this map without needing a direct parent/child relationship — the handle
 * writes on drag, the pane reads reactively.
 */
const widths = new SvelteMap<string, number>();

function get(key: string): number | undefined {
  return widths.get(key);
}

/** Seeds `key` from localStorage (or `fallback`) the first time it's read; a no-op after that. */
function hydrate(key: string, fallback: number): number {
  if (widths.has(key)) return widths.get(key)!;

  let initial = fallback;
  if (typeof localStorage !== 'undefined') {
    const stored = Number(localStorage.getItem(key));
    if (!Number.isNaN(stored) && stored > 0) initial = stored;
  }

  widths.set(key, initial);
  return initial;
}

function set(key: string, value: number): void {
  widths.set(key, value);
  if (typeof localStorage !== 'undefined') localStorage.setItem(key, String(value));
}

export const paneWidths = { get, hydrate, set };
