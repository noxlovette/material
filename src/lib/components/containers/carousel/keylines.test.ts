import { describe, expect, it } from 'vitest';
import { GAP, keylines, maxSteps, place } from './keylines.js';

const fill = (k: ReturnType<typeof keylines>, count: number, f: number) => {
  const shown = place(k, count, f).filter((p) => p !== null);
  const last = shown[shown.length - 1]!;
  return last.x + last.size;
};

describe('carousel keylines', () => {
  it('multi-browse fits large items, one medium and one small into the container', () => {
    const k = keylines('multiBrowse', 380, 186);
    expect(k.small).toBe(56);
    const total = k.focal.reduce((a, b) => a + b, 0) + (k.focal.length - 1) * GAP;
    expect(total).toBeCloseTo(380);
    expect(k.focal.at(-1)).toBe(56);
    expect(k.focal.at(-2)).toBeCloseTo((k.large + 56) / 2);
  });

  it('small items stay within 40–56dp', () => {
    expect(keylines('hero', 300).small).toBe(40);
    expect(keylines('hero', 800).small).toBe(56);
  });

  it('fills the container exactly at every resting position', () => {
    for (const layout of ['multiBrowse', 'hero', 'centeredHero'] as const) {
      const k = keylines(layout, 600);
      for (let f = 0; f <= maxSteps(k, 10); f++) expect(fill(k, 10, f)).toBeCloseTo(600);
    }
  });

  it('starts with the first item large and ends with the last item large', () => {
    for (const layout of ['multiBrowse', 'hero'] as const) {
      const k = keylines(layout, 600);
      expect(place(k, 10, 0)[0]!.size).toBeCloseTo(k.large);
      expect(place(k, 10, maxSteps(k, 10))[9]!.size).toBeCloseTo(k.large);
    }
  });

  it('centered hero centres the large item mid-scroll', () => {
    const k = keylines('centeredHero', 600);
    const p = place(k, 10, 3);
    expect(p[3]!.size).toBeCloseTo(k.small);
    expect(p[4]!.size).toBeCloseTo(k.large);
    expect(p[4]!.x + p[4]!.size / 2).toBeCloseTo(300);
  });

  it('moves continuously between resting positions', () => {
    const k = keylines('multiBrowse', 600);
    const a = place(k, 10, 1.999)[3]!;
    const b = place(k, 10, 2)[3]!;
    expect(a.x).toBeCloseTo(b.x, 0);
    expect(a.size).toBeCloseTo(b.size, 0);
  });
});
