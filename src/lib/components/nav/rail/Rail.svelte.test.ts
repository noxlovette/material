// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Fixture from './rail.fixture.test.svelte';
import Viewport from './railViewport.fixture.test.svelte';
import { rail, railElement } from './theme.js';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/home') } }));

/* The last spring the rail started, so a test can step it by hand. */
type Spring = { from: number; to: number; onUpdate: (v: number) => void; onComplete: () => void };
let spring: Spring | undefined;
vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  // Only the rail's number spring is recorded; element animations (the menu icon's swap) no-op.
  animate: (from: unknown, to: number, options: Omit<Spring, 'from' | 'to'>) => {
    if (typeof from === 'number') spring = { from, to, ...options };
    return { stop: () => {}, then: (fn: () => void) => Promise.resolve().then(fn) };
  }
}));

// jsdom has no matchMedia; the spring asks it about reduced motion.
let reducedMotion = true;
window.matchMedia = ((query: string) => ({
  matches: query.includes('reduced-motion') ? reducedMotion : false,
  media: query
})) as never;

const railEl = () => document.querySelector<HTMLElement>('[data-expanded]')!;
const railP = () => railEl().style.getPropertyValue('--rail-p');

const state = () => document.querySelector('[data-testid="state"]')!.textContent;
const toggle = () => document.querySelector<HTMLButtonElement>('button[aria-expanded]')!;
const link = (name: string) =>
  [...document.querySelectorAll('a')].find((a) => a.textContent?.includes(name))!;

function setup(collapsed = true) {
  const app = mount(Fixture, { target: document.body, props: { collapsed } });
  flushSync();
  return app;
}

describe('Rail', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    reducedMotion = true;
    spring = undefined;
  });

  it('jumps straight to the end state under reduced motion', () => {
    const app = setup();
    expect(railP()).toBe('0');
    expect(link('Home').dataset.layout).toBe('top');
    toggle().click();
    flushSync();
    expect(spring).toBeUndefined();
    expect(railP()).toBe('1');
    expect(link('Home').dataset.layout).toBe('start');
    unmount(app);
  });

  it('springs one progress value, and the label switches sides only past halfway', () => {
    reducedMotion = false;
    const app = setup();
    toggle().click();
    flushSync();
    expect(spring).toMatchObject({ from: 0, to: 1 });

    spring!.onUpdate(0.3);
    flushSync();
    expect(railP()).toBe('0.3');
    expect(link('Home').dataset.layout).toBe('top');

    spring!.onUpdate(0.7);
    flushSync();
    expect(link('Home').dataset.layout).toBe('start');
    // The label style swaps with the side, while it is faded out.
    expect(link('Home').querySelector('.rail-label')!.className).toContain('label-large');

    spring!.onComplete();
    flushSync();
    expect(railP()).toBe('1');
    expect(railEl().style.width).toBe('');
    unmount(app);
  });

  it('reverses from where an interrupted spring had got to', () => {
    reducedMotion = false;
    const app = setup();
    toggle().click();
    flushSync();
    spring!.onUpdate(0.6);
    flushSync();
    toggle().click();
    flushSync();
    expect(spring).toMatchObject({ from: 0.6, to: 0 });
    unmount(app);
  });

  it('toggles from the menu button, which reports its state', () => {
    const app = setup();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    toggle().click();
    flushSync();
    expect(state()).toBe('expanded');
    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    unmount(app);
  });

  // jsdom applies no Tailwind, so the scrim counts as displayed: these are the modal behaviours.
  it('closes the modal rail on Escape, a scrim click, and picking a destination', () => {
    const app = setup(false);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    flushSync();
    expect(state()).toBe('collapsed');

    toggle().click();
    flushSync();
    document.querySelector<HTMLElement>('[role="presentation"]')!.click();
    flushSync();
    expect(state()).toBe('collapsed');

    toggle().click();
    flushSync();
    link('Inbox').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    flushSync();
    expect(state()).toBe('collapsed');
    unmount(app);
  });

  it('leaves the rail alone on Escape while collapsed', () => {
    const app = setup();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    flushSync();
    expect(state()).toBe('collapsed');
    unmount(app);
  });

  it('publishes its width for the page to clear while mounted (parent anchor: a ghost instead)', async () => {
    const observed: (() => void)[] = [];
    window.ResizeObserver = class {
      constructor(cb: () => void) {
        observed.push(cb);
      }
      observe() {}
      disconnect() {}
    } as never;
    const root = document.documentElement.style;
    const app = mount(Viewport, { target: document.body });
    flushSync();
    observed.forEach((cb) => cb());
    expect(root.getPropertyValue('--md-rail-width')).toBe('0px');
    expect(root.getPropertyValue('--md-rail-rest')).toContain('collapsed-container-width');
    unmount(app);
    flushSync();
    expect(root.getPropertyValue('--md-rail-width')).toBe('');
    expect(root.getPropertyValue('--md-rail-rest')).toBe('');
    // @ts-expect-error jsdom has none; restore that
    delete window.ResizeObserver;
  });

  it('marks the current route and fills its icon', () => {
    const app = setup();
    expect(link('Home').getAttribute('aria-current')).toBe('page');
    expect(link('Inbox').hasAttribute('aria-current')).toBe(false);
    const fillOf = (a: HTMLAnchorElement) =>
      a.querySelector<HTMLElement>('.material-symbols-rounded')!.style.fontVariationSettings;
    expect(fillOf(link('Home'))).toContain("'FILL' 1");
    expect(fillOf(link('Inbox'))).toContain("'FILL' 0");
    unmount(app);
  });

  it('grows the selected fill from the centre on a spring', () => {
    reducedMotion = false;
    const props = $state({ collapsed: true, inboxSelected: false });
    const app = mount(Fixture, { target: document.body, props });
    flushSync();
    const sel = (name: string) => link(name).style.getPropertyValue('--rail-sel');
    expect(sel('Home')).toBe('1');
    expect(sel('Inbox')).toBe('0');
    expect(spring).toBeUndefined();

    props.inboxSelected = true;
    flushSync();
    expect(spring).toMatchObject({ from: 0, to: 1 });
    spring!.onUpdate(0.4);
    flushSync();
    expect(sel('Inbox')).toBe('0.4');
    // The fill sits inside the indicator, which keeps the state layer on top of it.
    expect(link('Inbox').querySelector('.rail-indicator > .rail-fill')).not.toBeNull();
    unmount(app);
  });
});

describe('rail spec values', () => {
  it('sizes the container from the component tokens', () => {
    expect(rail({ expanded: false }).base()).toContain(
      'w-(--md-comp-nav-rail-collapsed-container-width)'
    );
    const expanded = rail({ expanded: true }).base();
    expect(expanded).toContain('min-w-(--md-comp-nav-rail-expanded-container-width-minimum)');
    expect(expanded).toContain('max-w-(--md-comp-nav-rail-expanded-container-width-maximum)');
    // Modal on medium windows, standard from lg.
    expect(expanded).toContain('shadow-elevation-3');
    expect(expanded).toContain('lg:shadow-elevation-0');
  });

  it('spaces destinations 4dp→0 on the progress, 40dp below a header', () => {
    expect(rail().items()).toContain(
      'gap-[calc(var(--spacing-spacing-50)_*_(1_-_var(--rail-p,0)))]'
    );
    expect(rail({ header: true }).nav()).toContain('mt-spacing-500');
    expect(rail({ header: false }).nav()).not.toContain('mt-spacing-500');
  });

  it('switches the label typescale and active colour with the layout', () => {
    const top = railElement({ active: true, layout: 'top' });
    expect(top.label()).toContain('md-sys-typescale-label-medium');
    expect(top.label()).toContain('text-md-sys-color-secondary');
    expect(top.fill()).toContain('bg-md-sys-color-secondary-container');

    const start = railElement({ active: true, layout: 'start' });
    expect(start.label()).toContain('md-sys-typescale-label-large');
    expect(start.label()).toContain('text-md-sys-color-on-secondary-container');
  });

  it('puts no state layer on disabled destinations', () => {
    expect(railElement({ disabled: true }).indicator()).not.toContain('group-hover');
    expect(railElement({ disabled: false }).indicator()).toContain('group-hover');
  });
});
