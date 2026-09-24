/*
  Keyline layout for the M3 carousel (https://m3.material.io/components/carousel/specs), after
  Material Components' carousel (KeylineState / MultiBrowseCarouselStrategy).

  A layout is a row of slot sizes that fills the container, e.g. multi-browse [L, L, M, S]. Scrolling
  moves items through the slots one "step" (large width + gap) at a time; an item between two slots
  takes an interpolated size, and items stack edge to edge with the gap between them. An item
  leaving either end shrinks to the small size. The slot row itself also morphs: `start` at the
  beginning of the scroll, `focal` in the middle, `end` at the end, so the last items become large.
*/

export const GAP = 8;
export const SMALL_MIN = 40;
export const SMALL_MAX = 56;

export type KeylineLayout = 'multiBrowse' | 'hero' | 'centeredHero';

export type Keylines = {
  /** Large item width: the unmasked width of every item's content. */
  large: number;
  small: number;
  /** Scroll distance that moves an item by one slot. */
  step: number;
  start: number[];
  focal: number[];
  end: number[];
  /** Slot of the first large item in `focal`: where a focused item scrolls to. */
  focalIndex: number;
};

const repeat = (n: number, v: number) => Array.from({ length: n }, () => v);

/**
 * Fits the slots for `layout` into `available` px (container width minus its 16dp padding).
 * `preferredLarge` is the multi-browse large width to aim for.
 */
export function keylines(layout: KeylineLayout, available: number, preferredLarge = 186): Keylines {
  const small = available >= 360 ? SMALL_MAX : SMALL_MIN;
  const make = (
    large: number,
    start: number[],
    focal: number[],
    end: number[],
    focalIndex = 0
  ) => ({
    large,
    small,
    step: large + GAP,
    start,
    focal,
    end,
    focalIndex
  });

  if (layout === 'hero') {
    const L = Math.max(small, available - small - GAP);
    return make(L, [L, small], [L, small], [small, L]);
  }
  if (layout === 'centeredHero') {
    const L = Math.max(small, available - 2 * small - 2 * GAP);
    return make(L, [L, small, small], [small, L, small], [small, small, L], 1);
  }

  // Multi-browse: n large + one medium + one small; the medium sits halfway between the two.
  let best = { n: 1, L: 0, cost: Infinity };
  for (let n = 1; n <= 8; n++) {
    const L = (available - (n + 1) * GAP - small * 1.5) / (n + 0.5);
    if (L <= small * 1.5) break;
    const cost = Math.abs(L - preferredLarge);
    if (cost < best.cost) best = { n, L, cost };
  }
  if (!Number.isFinite(best.cost)) return keylines('hero', available);
  const { n, L } = best;
  const M = (L + small) / 2;
  const focal = [...repeat(n, L), M, small];
  return make(L, focal, focal, [small, M, ...repeat(n, L)]);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export type Placement = { x: number; size: number };

/**
 * Where each of `count` items sits at scroll position `f` (in steps). Items outside the container
 * get `null`. `x` is relative to the container's inner (padded) edge.
 */
export function place(k: Keylines, count: number, f: number): (Placement | null)[] {
  const V = k.focal.length;
  const maxF = Math.max(0, count - V);
  f = Math.min(maxF, Math.max(0, f));

  // How far the slots morph from `start` into `focal`, then from `focal` into `end`.
  const endSpan = Math.min(V - 1 - k.focal.lastIndexOf(k.large), maxF);
  const startSpan = Math.min(k.focal.indexOf(k.large), maxF - endSpan);
  const wStart = startSpan > 0 ? clamp01(f / startSpan) : 1;
  const wEnd = endSpan > 0 ? clamp01((f - (maxF - endSpan)) / endSpan) : 0;
  const slots = k.focal.map((s, i) => lerp(lerp(k.start[i], s, wStart), k.end[i], wEnd));

  const sizeAt = (r: number) => {
    if (r < 0) return lerp(slots[0], k.small, -r);
    const i = Math.floor(r);
    return lerp(slots[i], i + 1 < V ? slots[i + 1] : k.small, r - i);
  };

  const out: (Placement | null)[] = Array.from({ length: count }, () => null);
  const first = Math.floor(f);
  let x = (first - f) * (k.small + GAP);
  for (let i = first; i < count && i - f < V; i++) {
    const size = sizeAt(i - f);
    out[i] = { x, size };
    x += size + GAP;
  }
  return out;
}

/** Scroll positions (in steps) the carousel can come to rest at. */
export const maxSteps = (k: Keylines, count: number) => Math.max(0, count - k.focal.length);
