// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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

describe('Presence', () => {
  beforeEach(() => (calls.length = 0));
  afterEach(() => (document.body.innerHTML = ''));

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
});
