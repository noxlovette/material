// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

const animations: { stop: ReturnType<typeof vi.fn> }[] = [];
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: () => {
    const controls = { stop: vi.fn() };
    animations.push(controls);
    return controls;
  }
}));

const { skeleton } = await import('./skeleton.js');

let reduced = false;
const listeners = new Set<() => void>();
globalThis.matchMedia = (() => ({
  get matches() {
    return reduced;
  },
  addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
  removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener)
})) as never;

describe('skeleton reduced motion', () => {
  afterEach(() => {
    reduced = false;
    listeners.clear();
    animations.length = 0;
  });

  it('stays static and responds when the OS preference changes', () => {
    reduced = true;
    const node = document.createElement('div');
    node.style.opacity = '0.8';
    const cleanup = skeleton(node) as () => void;
    expect(animations).toHaveLength(0);
    expect(node.style.opacity).toBe('0.8');

    reduced = false;
    listeners.forEach((listener) => listener());
    expect(animations).toHaveLength(1);

    reduced = true;
    listeners.forEach((listener) => listener());
    expect(animations[0].stop).toHaveBeenCalledOnce();
    expect(node.style.opacity).toBe('0.8');
    cleanup();
    expect(listeners.size).toBe(0);
  });
});
