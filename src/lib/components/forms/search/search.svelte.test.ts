// @vitest-environment jsdom
import { flushSync, mount, tick, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Fixture from './search.fixture.test.svelte';
import { search, searchViewLayout } from './theme.js';

// jsdom has no matchMedia (Layer, reduced motion) and no View Transition API, so the container
// transform runs its update directly — exactly the path browsers without the API take.
window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;
Element.prototype.scrollIntoView ??= () => {};

const settle = async () => {
  for (let i = 0; i < 5; i++) {
    await tick();
    await new Promise((r) => setTimeout(r, 0));
  }
  flushSync();
};

const bar = () => document.querySelector<HTMLInputElement>('label input[type="search"]')!;
const view = () => document.querySelector<HTMLElement>('[data-search-view]');
const field = () => view()!.querySelector<HTMLInputElement>('input[role="combobox"]')!;
const key = (el: Element, k: string) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

describe('Search view', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('has no view without results, and stays closed until the bar is used', async () => {
    const app = mount(Fixture, { target: document.body });
    await settle();
    expect(view()).toBeNull();
    expect(bar().getAttribute('aria-expanded')).toBe('false');
    unmount(app);
  });

  it('opens on click, focuses its combobox and wires it to the listbox', async () => {
    const app = mount(Fixture, { target: document.body });
    bar().click();
    await settle();
    expect(view()).not.toBeNull();
    const input = field();
    const listbox = document.getElementById(input.getAttribute('aria-controls')!)!;
    expect(listbox.getAttribute('role')).toBe('listbox');
    expect(listbox.getAttribute('aria-label')).toBe('Search fruit');
    expect(listbox.querySelectorAll('[role="option"]')).toHaveLength(3);
    expect(document.activeElement).toBe(input);
    unmount(app);
  });

  it('opens on ↓ in the bar, but not on focus', async () => {
    const app = mount(Fixture, { target: document.body });
    bar().focus();
    await settle();
    expect(view()).toBeNull();
    key(bar(), 'ArrowDown');
    await settle();
    expect(view()).not.toBeNull();
    unmount(app);
  });

  it('moves through options with the arrow keys and picks one with Enter', async () => {
    const props = $state({ open: true, value: 'ap', picked: '' });
    const app = mount(Fixture, { target: document.body, props });
    await settle();
    const input = field();
    key(input, 'ArrowDown');
    flushSync();
    const first = document.getElementById(input.getAttribute('aria-activedescendant')!)!;
    expect(first.textContent).toContain('Apple');
    expect(first.hasAttribute('data-highlighted')).toBe(true);
    key(input, 'ArrowDown');
    key(input, 'ArrowDown'); // wraps
    flushSync();
    expect(document.getElementById(input.getAttribute('aria-activedescendant')!)).toBe(first);
    key(input, 'ArrowUp'); // wraps back to the last
    flushSync();
    key(input, 'Enter');
    await settle();
    expect(props.picked).toBe('Apricot');
    expect(view()).toBeNull();
    unmount(app);
  });

  it('closes from the back button and returns focus to the bar', async () => {
    const props = $state({ open: true });
    const app = mount(Fixture, { target: document.body, props });
    await settle();
    view()!.querySelector<HTMLButtonElement>('button[aria-label="Back"]')!.click();
    await settle();
    expect(props.open).toBe(false);
    expect(view()).toBeNull();
    expect(document.activeElement).toBe(bar());
    unmount(app);
  });

  it('clears the query from the view without closing it', async () => {
    const props = $state({ open: true, value: 'ban' });
    const app = mount(Fixture, { target: document.body, props });
    await settle();
    view()!.querySelector<HTMLButtonElement>('button[aria-label="Clear search"]')!.click();
    await settle();
    expect(props.value).toBe('');
    expect(view()).not.toBeNull();
    unmount(app);
  });
});

describe('searchViewLayout', () => {
  it('defaults the compact tier to full-screen and restates each tier', () => {
    const { base, results } = searchViewLayout({ medium: 'docked' });
    expect(base).toContain('h-dvh');
    expect(base).toContain('md:top-(--sv-top)');
    expect(base).toContain('md:h-auto');
    expect(results).toContain('md:rounded-md');
    expect(results).toContain('rounded-none');
  });

  it('takes a single value for every tier', () => {
    expect(searchViewLayout('docked').base).not.toContain('h-dvh');
  });
});

describe('search bar', () => {
  it('keeps its 56dp height in a column flex container', () => {
    // `grow` stretched the bar to fill a tall `flex-col` parent.
    expect(search().base().split(' ')).not.toContain('grow');
  });
});
