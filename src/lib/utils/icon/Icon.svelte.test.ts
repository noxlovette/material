// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Icon from './Icon.svelte';
import type { IconProps } from './types.js';

/* Every Motion animation, with a way to finish it by hand. */
type Call = { node: Element; keyframes: Record<string, unknown>; finish: () => void };
let calls: Call[] = [];
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: (node: Element, keyframes: Record<string, unknown>) => {
    const done: (() => void)[] = [];
    calls.push({ node, keyframes, finish: () => done.forEach((fn) => fn()) });
    return { stop: () => {}, then: (fn: () => void) => done.push(fn) };
  }
}));

let reducedMotion = false;
window.matchMedia = ((query: string) => ({
  matches: query.includes('reduced-motion') ? reducedMotion : false,
  media: query
})) as never;

const glyphs = () => [...document.querySelectorAll('[translate="no"]')].map((el) => el.textContent);
const exitOf = (name: string) => calls.filter((c) => c.node.textContent === name).at(-1)!;

function setup(initial: Partial<IconProps> = {}) {
  const props = $state<IconProps>({ name: 'menu', ...initial });
  const app = mount(Icon, { target: document.body, props });
  flushSync();
  return { props, app };
}

describe('Icon transitions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    calls = [];
    reducedMotion = false;
  });

  it('swaps the glyph at once without a transition', () => {
    const { props, app } = setup();
    props.name = 'menu_open';
    flushSync();
    expect(glyphs()).toEqual(['menu_open']);
    expect(calls).toHaveLength(0);
    unmount(app);
  });

  it('crossfades: both glyphs stack until the old one has left', () => {
    const { props, app } = setup({ transition: 'rotate' });
    expect(glyphs()).toEqual(['menu']);
    props.name = 'menu_open';
    flushSync();
    expect(glyphs()).toEqual(['menu', 'menu_open']);

    exitOf('menu').finish();
    flushSync();
    expect(glyphs()).toEqual(['menu_open']);
    unmount(app);
  });

  it('turns the old glyph out the same way the new one turns in', () => {
    const { props, app } = setup({ transition: 'rotate' });
    props.name = 'menu_open';
    flushSync();
    const enter = calls.find((c) => c.node.textContent === 'menu_open')!;
    expect(enter.keyframes.rotate).toEqual([-90, 0]);
    expect(exitOf('menu').keyframes.rotate).toBe(90);
    unmount(app);
  });

  it('brings a leaving glyph back instead of stacking a third', () => {
    const { props, app } = setup({ transition: 'fade' });
    props.name = 'menu_open';
    flushSync();
    props.name = 'menu';
    flushSync();
    expect(glyphs()).toEqual(['menu', 'menu_open']);

    // The old exit for `menu` was superseded, so finishing it removes nothing.
    calls.filter((c) => c.node.textContent === 'menu').forEach((c) => c.finish());
    flushSync();
    expect(glyphs()).toContain('menu');

    exitOf('menu_open').finish();
    flushSync();
    expect(glyphs()).toEqual(['menu']);
    unmount(app);
  });

  it('only fades under reduced motion', () => {
    reducedMotion = true;
    const { props, app } = setup({ transition: 'rotate' });
    props.name = 'menu_open';
    flushSync();
    const enter = calls.find((c) => c.node.textContent === 'menu_open')!;
    expect(Object.keys(enter.keyframes)).toEqual(['opacity']);
    unmount(app);
  });
});
