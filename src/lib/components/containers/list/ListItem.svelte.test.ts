// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { listItem } from './theme.js';

type Ride = { el: Element; keyframes: Record<string, string[]>; stop: () => void };
const rides: Ride[] = [];

// Element animations are recorded, not run; the tests check where the fill starts from.
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: (el: Element, keyframes: Record<string, string[]>) => {
    const stop = vi.fn();
    rides.push({ el, keyframes, stop });
    return { stop, then: () => Promise.resolve() };
  }
}));

const { default: Fixture } = await import('./listSelection.fixture.test.svelte');

/*
  jsdom does no layout, so fake one: the list at the origin, 300 wide, each item a 56dp row.
  A fill takes its item's box, shifted by any inline top/bottom a ride left on it.
*/
const ROW = 56;
const rowOf = (el: Element) => {
  const li = el.closest('li');
  return li ? [...li.parentElement!.children].indexOf(li) : -1;
};
const px = (v: string) => (v ? parseFloat(v) : 0);
let reducedMotion = false;
const original = Element.prototype.getBoundingClientRect;

beforeAll(() => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('reduced-motion') ? reducedMotion : false,
    media: query
  })) as never;
  Element.prototype.getBoundingClientRect = function (this: HTMLElement) {
    const row = rowOf(this);
    if (row < 0) return { top: 0, bottom: ROW * 4, left: 0, right: 300 } as DOMRect;
    const top = row * ROW + px(this.style.top);
    const bottom = (row + 1) * ROW - px(this.style.bottom);
    return { top, bottom, left: 0, right: 300 } as DOMRect;
  };
});

afterAll(() => {
  Element.prototype.getBoundingClientRect = original;
});

const fills = () => [...document.querySelectorAll<HTMLElement>('li [aria-hidden="true"].absolute')];
const fillRow = () => fills().map(rowOf);

function setup(selected: number[]) {
  const props = $state({ selected });
  const app = mount(Fixture, { target: document.body, props });
  flushSync();
  return { app, props };
}

describe('ListItem selection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    rides.length = 0;
    reducedMotion = false;
  });

  it('draws the selected fill as its own element, not the item background', () => {
    const { app } = setup([0]);
    expect(fillRow()).toEqual([0]);
    expect(listItem({ selected: true }).base()).not.toContain(
      'bg-md-sys-color-secondary-container'
    );
    expect(listItem().selection()).toContain('bg-md-sys-color-secondary-container');
    expect(rides).toHaveLength(0);
    unmount(app);
  });

  it('springs the fill over from the item that lost the selection', () => {
    const { app, props } = setup([0]);
    props.selected = [2];
    flushSync();
    expect(fillRow()).toEqual([2]);
    expect(rides).toHaveLength(1);
    // From row 0 to row 2: starts 112dp up, eases to its own box.
    expect(rides[0].el).toBe(fills()[0]);
    expect(rides[0].keyframes.top).toEqual(['-112px', '0px']);
    expect(rides[0].keyframes.bottom).toEqual(['112px', '0px']);
    // It passes over the items between, so it's lifted above them while it rides.
    expect(fills()[0].parentElement!.className).toContain('z-10');
    unmount(app);
  });

  it('travels upward too, and picks up mid-ride from where the fill is drawn', () => {
    const { app, props } = setup([3]);
    props.selected = [1];
    flushSync();
    expect(rides[0].keyframes.top).toEqual(['112px', '0px']);

    // Halfway up (drawn 56dp below row 1), the selection moves on to row 0.
    fills()[0].style.top = '56px';
    fills()[0].style.bottom = '-56px';
    props.selected = [0];
    flushSync();
    expect(rides[0].stop).toHaveBeenCalled();
    expect(rides[1].keyframes.top).toEqual(['112px', '0px']);
    unmount(app);
  });

  it('just appears when nothing was deselected, or under reduced motion', async () => {
    const { app, props } = setup([]);
    props.selected = [1];
    flushSync();
    expect(rides).toHaveLength(0);

    // A deselect on its own leaves nothing for a later select to travel from.
    props.selected = [];
    flushSync();
    await Promise.resolve();
    props.selected = [3];
    flushSync();
    expect(rides).toHaveLength(0);

    reducedMotion = true;
    props.selected = [0];
    flushSync();
    expect(fillRow()).toEqual([0]);
    expect(rides).toHaveLength(0);
    unmount(app);
  });
});
