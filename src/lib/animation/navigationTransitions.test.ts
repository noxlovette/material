// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

/* animateView's builder, recorded: which calls each helper makes, in order. */
type Call = [method: string, ...args: unknown[]];
let calls: Call[] = [];
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animateView: () => {
    calls = [];
    const builder: Record<string, (...args: unknown[]) => unknown> = {};
    for (const method of ['add', 'old', 'new', 'layout', 'crop', 'class']) {
      builder[method] = (...args: unknown[]) => {
        calls.push([method, ...args]);
        return builder;
      };
    }
    return builder;
  }
}));

const { fadeThrough, lateral, sharedAxis } = await import('./sharedAxisTransition.js');
const { containerTransform } = await import('./containerTransform.js');

let reduced = false;
globalThis.matchMedia = ((query: string) => ({
  matches: query.includes('reduced-motion') ? reduced : false,
  media: query
})) as never;

const keyframes = (method: 'old' | 'new') =>
  calls.find(([m]) => m === method)?.[1] as Record<string, unknown>;
const update = () => {};

describe('navigation transitions', () => {
  afterEach(() => {
    reduced = false;
  });

  it('fadeThrough scales the new page in, and its region swaps its box instantly', () => {
    fadeThrough(update, { target: 'main' });
    expect(calls).toContainEqual(['add', 'main']);
    expect(calls).toContainEqual(['layout', { duration: 0 }]);
    // Uncropped: a cropped snapshot is scaled to cover the new page's box mid-fade.
    expect(calls).toContainEqual(['crop', false]);
    expect(keyframes('new').transform).toEqual(['scale(0.92)', 'scale(1)']);
  });

  it('lateral slides along the axis its peers are laid out on', () => {
    lateral(update, { target: 'main' });
    expect(keyframes('new').transform).toEqual(['translateX(100%)', 'translateX(0%)']);
    lateral(update, { target: 'main', axis: 'y' });
    expect(keyframes('old').transform).toEqual(['translateY(0%)', 'translateY(-100%)']);
    expect(keyframes('new').transform).toEqual(['translateY(100%)', 'translateY(0%)']);
    lateral(update, { target: 'main', axis: 'y', direction: 'backward' });
    expect(keyframes('new').transform).toEqual(['translateY(-100%)', 'translateY(0%)']);
  });

  it('fadeThrough of the whole page has no region to hold still', () => {
    fadeThrough(update);
    expect(calls.some(([m]) => m === 'layout')).toBe(false);
  });

  it.each([
    ['fadeThrough', () => fadeThrough(update, { target: 'main' })],
    ['sharedAxis', () => sharedAxis(update, { target: 'main', axis: 'y' })],
    ['lateral', () => lateral(update, { target: 'main' })]
  ])('%s becomes a plain fade under reduced motion', (_, run) => {
    reduced = true;
    run();
    expect(keyframes('old')).toEqual({ opacity: [1, 0] });
    expect(keyframes('new')).toEqual({ opacity: [0, 1] });
    expect(calls).toContainEqual(['layout', { duration: 0 }]);
  });

  it('containerTransform crossfades in place under reduced motion', () => {
    containerTransform(update, { from: '.card', to: '.detail' });
    expect(calls.some(([m]) => m === 'layout')).toBe(false);
    reduced = true;
    containerTransform(update, { from: '.card', to: '.detail' });
    expect(calls).toContainEqual(['add', '.card', '.detail']);
    expect(calls).toContainEqual(['layout', { duration: 0 }]);
  });

  it('marks the root while a navigation runs, so app chrome gets a static layer', async () => {
    const root = document.documentElement;
    fadeThrough(update, { target: 'main' });
    expect(root.classList.contains('md-navigation-transition')).toBe(true);
    await new Promise((r) => setTimeout(r));
    expect(root.classList.contains('md-navigation-transition')).toBe(false);
    containerTransform(update, { from: '.card', to: '.detail' });
    expect(root.classList.contains('md-navigation-transition')).toBe(false);
  });
});
