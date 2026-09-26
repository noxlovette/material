// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { describe, expect, it } from 'vitest';
import Fixture from './appbar.fixture.test.svelte';
import AppBar from './AppBar.svelte';

// jsdom has no matchMedia (Layer) or ResizeObserver (AppBar's height tracking).
window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;
window.ResizeObserver = class {
  observe() {}
  disconnect() {}
} as never;

const button = (label: string) => document.querySelector(`[aria-label="${label}"]`)!;

describe('AppBar icon buttons', () => {
  it('default to standard inside the bar, keep an explicit variant, and stay filled outside', () => {
    const app = mount(Fixture, { target: document.body });
    flushSync();
    expect(button('Inherited').className).not.toContain('bg-md-sys-color-primary');
    expect(button('Inherited').className).toContain('text-md-sys-color-on-surface-variant');
    expect(button('Explicit').className).toContain('bg-md-sys-color-primary');
    expect(button('Outside').className).toContain('bg-md-sys-color-primary');
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
