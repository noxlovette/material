// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { springTokens, springTransition } from './spring.js';

type Call = { keyframes: Record<string, unknown>; finish: () => void; stopped: boolean };
const calls: Call[] = [];

vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: (_node: Element, keyframes: Record<string, unknown>) => {
    let finish = () => {};
    const done = new Promise<void>((resolve) => (finish = resolve));
    const call: Call = { keyframes, finish: () => finish(), stopped: false };
    calls.push(call);
    return { then: (fn: () => void) => done.then(fn), stop: () => (call.stopped = true) };
  }
}));

const { default: Fixture } = await import('./presence.fixture.test.svelte');
const { enterExit } = await import('./enterExit.js');

const panel = () => document.querySelector('[data-testid="panel"]');
const settle = () => new Promise((resolve) => setTimeout(resolve));
let reduced = false;
globalThis.matchMedia = ((query: string) => ({
  matches: query.includes('reduced-motion') && reduced,
  media: query
})) as never;

describe('Presence', () => {
  beforeEach(() => (calls.length = 0));
  afterEach(() => {
    reduced = false;
    document.body.innerHTML = '';
  });

  it('does not mount or animate while initially closed', () => {
    const app = mount(Fixture, { target: document.body, props: { open: false } });
    flushSync();
    expect(panel()).toBeNull();
    expect(calls).toHaveLength(0);
    unmount(app);
  });

  it('enters from hidden, then stays mounted until the exit finishes', async () => {
    const props = $state({ open: true });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();
    expect(panel()).not.toBeNull();
    expect(calls[0].keyframes).toEqual({ opacity: [0, 1] });

    props.open = false;
    flushSync();
    expect(calls[1].keyframes).toEqual({ opacity: 0 });
    expect(panel()).not.toBeNull();

    calls[1].finish();
    await settle();
    flushSync();
    expect(panel()).toBeNull();
    unmount(app);
  });

  it('reopening mid-exit retargets from the current value and keeps the element', async () => {
    const props = $state({ open: true });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();

    props.open = false;
    flushSync();
    props.open = true;
    flushSync();
    // No fromTo keyframes on the retarget — Motion starts from wherever the exit left off.
    expect(calls[2].keyframes).toEqual({ opacity: 1 });

    // The superseded exit finishing late must not unmount the reopened element.
    calls[1].finish();
    await settle();
    flushSync();
    expect(panel()).not.toBeNull();
    unmount(app);
  });

  it('exits to `exited` and applies `origin` (MaterialFade: fade-only exit from the anchor)', () => {
    const props = $state({ open: true, transition: enterExit.scale });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();
    expect((panel() as HTMLElement).style.transformOrigin).toContain(
      '--bits-floating-transform-origin'
    );
    expect(calls[0].keyframes).toEqual({
      opacity: [0, 1],
      transform: ['scale(0.8)', 'scale(1)']
    });

    props.open = false;
    flushSync();
    expect(calls[1].keyframes).toEqual({ opacity: 0 });
    unmount(app);
  });

  it.each([
    ['sheet', enterExit.sideSheet, 'translateX(0%)'],
    ['snackbar', enterExit.slideUp, 'translateY(0%)']
  ] as const)('uses opacity only for a %s under reduced motion', (_name, transition, transform) => {
    reduced = true;
    const props = $state({ open: true, transition });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();
    expect(calls[0].keyframes).toEqual({ opacity: [0, 1] });
    expect((panel() as HTMLElement).style.transform).toBe(transform);

    props.open = false;
    flushSync();
    expect(calls[1].keyframes).toEqual({ opacity: 0 });
    unmount(app);
  });

  it('springs a snackbar back down and fades it before unmounting', async () => {
    const props = $state({ open: true, transition: enterExit.slideUp });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();
    expect(calls[0].keyframes).toEqual({
      opacity: [0, 1],
      transform: ['translateY(100%)', 'translateY(0%)']
    });

    props.open = false;
    flushSync();
    expect(calls[1].keyframes).toEqual({ opacity: 0, transform: 'translateY(100%)' });
    expect(enterExit.slideUp.exit).toEqual({
      ...springTransition(springTokens.fastSpatial),
      opacity: springTransition(springTokens.effects)
    });
    expect(panel()).not.toBeNull();

    calls[1].finish();
    await settle();
    flushSync();
    expect(panel()).toBeNull();
    unmount(app);
  });

  it('finishes animations left on the node once the exit has had its time (#53)', () => {
    vi.useFakeTimers();
    try {
      const props = $state({ open: true });
      const app = mount(Fixture, { target: document.body, props });
      flushSync();
      // A WAAPI animation whose `finished` would never settle: bits-ui would keep it mounted.
      const stuck = { playState: 'paused', finish: vi.fn(), cancel: vi.fn() };
      const done = { playState: 'finished', finish: vi.fn(), cancel: vi.fn() };
      (panel() as HTMLElement).getAnimations = () => [stuck, done] as unknown as Animation[];

      props.open = false;
      flushSync();
      vi.advanceTimersByTime(999);
      expect(stuck.finish).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(stuck.finish).toHaveBeenCalledOnce();
      expect(done.finish).not.toHaveBeenCalled();

      // Reopened before the deadline: nothing is cut short.
      stuck.finish.mockClear();
      props.open = true;
      flushSync();
      props.open = false;
      flushSync();
      props.open = true;
      flushSync();
      vi.advanceTimersByTime(5000);
      expect(stuck.finish).not.toHaveBeenCalled();
      unmount(app);
    } finally {
      vi.useRealTimers();
    }
  });
});
