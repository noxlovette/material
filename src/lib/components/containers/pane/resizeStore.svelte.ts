import { SvelteMap } from 'svelte/reactivity';

/**
 * Shared, localStorage-backed width registry keyed by `persistKey`. A `Pane`
 * and a `PaneHandle` that share the same `persistKey` stay in sync through
 * this map without needing a direct parent/child relationship — the handle
 * writes on drag, the pane reads reactively.
 */
const widths = new SvelteMap<string, number>();
/** Whether the last write to a key should spring (a snap, a keyboard step) rather than jump. */
const springs = new SvelteMap<string, boolean>();

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

/** Whether the pane should spring to `key`'s latest width instead of jumping to it. */
function shouldSpring(key: string): boolean {
  return springs.get(key) ?? false;
}

/**
 * Writes `key`'s width. `spring: true` asks the pane to spring there; otherwise it jumps (a drag
 * tracking the pointer 1:1), unless a spring is still in flight, which it retargets instead.
 */
function set(key: string, value: number, { spring = false }: { spring?: boolean } = {}): void {
  springs.set(key, spring);
  widths.set(key, value);
  if (typeof localStorage !== 'undefined') localStorage.setItem(key, String(value));
}

export const paneWidths = { get, hydrate, set, shouldSpring };
