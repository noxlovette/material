// @vitest-environment jsdom
import { animatableShapesSmall } from '$lib/animation/shapeMorph.svelte.js';
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Avatar from './Avatar.svelte';

/* The last number animation started (the spin), so a test can step it by hand. */
type Tween = {
  from: number;
  to: number;
  options: Record<string, unknown> & { onUpdate: (v: number) => void };
};
let tween: Tween | undefined;
const stop = vi.fn();
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: (from: unknown, to: number, options: Tween['options']) => {
    if (typeof from === 'number') tween = { from, to, options };
    return { stop };
  }
}));

const built: Record<string, unknown>[] = [];
vi.mock('./DicebearAvatarBuilder.js', () => ({
  DicebearAvatarBuilder: class {
    options: Record<string, unknown>;
    constructor(style: string) {
      this.options = { style };
      built.push(this.options);
    }
    seed = (v: string) => ((this.options.seed = v), this);
    size = (v: number) => ((this.options.size = v), this);
    background = () => this;
    tags = (v: string[]) => ((this.options.tags = v), this);
    toDataUri = () => new Promise<string>(() => {});
  }
}));

let reducedMotion = false;
window.matchMedia = ((query: string) => ({
  matches: query.includes('reduced-motion') ? reducedMotion : false,
  media: query
})) as never;

const clipPath = () => document.querySelector('clipPath path')!;
const root = () => document.querySelector<HTMLElement>('[data-cy="m3-avatar"]')!;

describe('Avatar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    tween = undefined;
    reducedMotion = false;
    built.length = 0;
    stop.mockClear();
  });

  it('defaults to an animated gaze avatar cut to a circle', () => {
    const app = mount(Avatar, { target: document.body });
    flushSync();
    expect(built[0]).toMatchObject({ style: 'gaze', tags: ['animation'] });
    expect(clipPath().getAttribute('d')).toBe(animatableShapesSmall.circle);
    const id = document.querySelector('clipPath')!.id;
    expect(root().getAttribute('style')).toContain(`#${id}`);
    expect(tween).toBeUndefined();
    unmount(app);
  });

  it('cuts to the chosen shape, fitted to the box', () => {
    const app = mount(Avatar, { target: document.body, props: { shape: 'sunny' } });
    flushSync();
    expect(clipPath().getAttribute('d')).toBe(animatableShapesSmall.sunny);
    expect(clipPath().getAttribute('transform')).toBe('scale(0.03125) translate(-8 -8)');
    expect(root().dataset.shape).toBe('sunny');
    unmount(app);
  });

  it('spins the outline linearly, forever, in the chosen direction', () => {
    const props = $state({ shape: 'sunny' as const, spin: 'counterclockwise' as const });
    const app = mount(Avatar, { target: document.body, props });
    flushSync();
    expect(tween).toMatchObject({ from: 0, to: 360 });
    expect(tween!.options).toMatchObject({ ease: 'linear', repeat: Infinity });
    tween!.options.onUpdate(90);
    expect(clipPath().getAttribute('transform')).toContain('rotate(-90 24 24)');

    (props as { spin: string }).spin = 'none';
    flushSync();
    expect(stop).toHaveBeenCalled();
    expect(clipPath().getAttribute('transform')).toBe('scale(0.03125) translate(-8 -8)');
    unmount(app);
  });

  it('keeps still under reduced motion', () => {
    reducedMotion = true;
    const app = mount(Avatar, {
      target: document.body,
      props: { shape: 'sunny', spin: 'clockwise' }
    });
    flushSync();
    expect(tween).toBeUndefined();
    unmount(app);
  });

  it('gives each avatar its own clip path', () => {
    const a = mount(Avatar, { target: document.body });
    const b = mount(Avatar, { target: document.body });
    flushSync();
    const ids = [...document.querySelectorAll('clipPath')].map((c) => c.id);
    expect(new Set(ids).size).toBe(2);
    unmount(a);
    unmount(b);
  });
});
