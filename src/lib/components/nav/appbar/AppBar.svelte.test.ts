// @vitest-environment jsdom
import { createRawSnippet, flushSync, mount, unmount } from 'svelte';
import { describe, expect, it } from 'vitest';

import CollapseFixture from './appbar.collapse.fixture.test.svelte';
import Fixture from './appbar.fixture.test.svelte';
import AppBar from './AppBar.svelte';

// jsdom has no matchMedia (Layer) or ResizeObserver (AppBar's height tracking).
window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as never;

const button = (label: string) => document.querySelector(`[aria-label="${label}"]`)!;

describe('AppBar icon buttons', () => {
  it('default to standard inside and outside the bar while preserving an explicit variant', () => {
    const app = mount(Fixture, { target: document.body });
    flushSync();
    expect(button('Inherited').className).not.toContain('bg-md-sys-color-primary');
    expect(button('Inherited').className).toContain('text-md-sys-color-on-surface-variant');
    expect(button('Explicit').className).toContain('bg-md-sys-color-primary');
    expect(button('Outside').className).not.toContain('bg-md-sys-color-primary');
    expect(button('Outside').className).toContain('text-md-sys-color-on-surface-variant');
    unmount(app);
  });
});

describe('search AppBar', () => {
  const press = (target: EventTarget, key: string) =>
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));

  it('searches on Enter in the field, and jumps to it on /', () => {
    const searched: string[] = [];
    const props = $state({ search: 'Find', query: '', onsearch: (q: string) => searched.push(q) });
    const app = mount(AppBar, { target: document.body, props });
    flushSync();
    const field = document.querySelector<HTMLInputElement>('nav input[type="search"]')!;
    expect(field.getAttribute('aria-keyshortcuts')).toBe('/');
    press(document.body, '/');
    expect(document.activeElement).toBe(field);
    press(field, 'Enter');
    expect(searched).toEqual([]); // empty query
    props.query = 'mouse';
    flushSync();
    press(field, 'Enter');
    expect(searched).toEqual(['mouse']);
    unmount(app);
  });
});

describe('AppBar collapse', () => {
  const scrollTo = (y: number) => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    flushSync();
  };
  const title = () => document.querySelector('nav h1')!;

  it('snaps to small past 48px, and back only below 8px', () => {
    scrollTo(0);
    const app = mount(AppBar, {
      target: document.body,
      props: { title: 'Inbox', subtitle: 'Sub', size: 'large', collapse: true }
    });
    flushSync();
    expect(title().className).toContain('display-small');
    expect(document.querySelector('nav p')).not.toBeNull();
    scrollTo(60);
    expect(title().className).toContain('title-large');
    expect(title().className).not.toContain('display-small');
    expect(document.querySelector('nav p')).toBeNull();
    scrollTo(20);
    expect(title().className).toContain('title-large');
    scrollTo(0);
    expect(title().className).toContain('display-small');
    unmount(app);
  });

  it('does nothing without collapse', () => {
    const app = mount(AppBar, {
      target: document.body,
      props: { title: 'Inbox', size: 'large' }
    });
    flushSync();
    scrollTo(100);
    expect(title().className).toContain('display-small');
    unmount(app);
  });
});

describe('AppBar collapse with a children row', () => {
  it('shows the children in place of the title only while collapsed', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    const app = mount(CollapseFixture, { target: document.body });
    flushSync();
    const crumbs = () => document.querySelector('[data-testid="crumbs"]')!;
    const title = () => document.querySelector('nav h1')!;
    expect(title().className).not.toContain('sr-only');
    expect(crumbs().parentElement!.className).toContain('pb-spacing-100'); // the row below

    Object.defineProperty(window, 'scrollY', { value: 60, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    flushSync();
    expect(title().className).toContain('sr-only');
    expect(document.querySelectorAll('[data-testid="crumbs"]')).toHaveLength(1);
    expect(crumbs().parentElement!.className).not.toContain('pb-spacing-100');
    unmount(app);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });
});

describe('AppBar title', () => {
  it('renders a string or a snippet inside the h1', () => {
    const rich = createRawSnippet(() => ({ render: () => '<em data-testid="rich">Rich</em>' }));
    const app = mount(AppBar, { target: document.body, props: { title: rich } });
    flushSync();
    expect(document.querySelector('nav h1 [data-testid="rich"]')).not.toBeNull();
    unmount(app);
    const plain = mount(AppBar, { target: document.body, props: { title: 'Plain' } });
    flushSync();
    expect(document.querySelector('nav h1')!.textContent!.trim()).toBe('Plain');
    unmount(plain);
  });
});
