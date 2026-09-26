// @vitest-environment jsdom
import { flushSync, mount, tick, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Fixture from './commandDialog.fixture.test.svelte';
import { commandItem } from './theme.js';

window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;
Element.prototype.scrollIntoView ??= () => {};

const settle = async () => {
  for (let i = 0; i < 5; i++) {
    await tick();
    await new Promise((r) => setTimeout(r, 0));
  }
  flushSync();
};

const dialog = () => document.querySelector('[role="dialog"]');
const press = (target: Element, init: KeyboardEventInit) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }));

describe('CommandDialog', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('opens on Ctrl+K (⌘K on Apple) from anywhere and closes on it again', async () => {
    const props = $state({ open: false });
    const app = mount(Fixture, { target: document.body, props });
    await settle();
    expect(dialog()).toBeNull();
    press(document.querySelector('button')!, { key: 'k', ctrlKey: true });
    await settle();
    expect(props.open).toBe(true);
    expect(dialog()).not.toBeNull();
    press(document.activeElement ?? document.body, { key: 'k', ctrlKey: true });
    await settle();
    expect(props.open).toBe(false);
    unmount(app);
  });

  it('leaves plain K alone', async () => {
    const props = $state({ open: false });
    const app = mount(Fixture, { target: document.body, props });
    press(document.body, { key: 'k' });
    await settle();
    expect(props.open).toBe(false);
    unmount(app);
  });
});

describe('command item', () => {
  it('styles the attributes bits-ui actually sets (data-selected="", not "true")', () => {
    const item = commandItem().base().split(' ');
    expect(item).toContain('data-selected:bg-md-sys-color-on-surface/10');
    expect(item.some((c) => c.includes('=true'))).toBe(false);
  });

  it('is an M3 list item on the palette colour', () => {
    const item = commandItem().base().split(' ');
    expect(item).toContain('min-h-spacing-700');
    expect(item).toContain('bg-transparent');
    expect(item).not.toContain('bg-md-sys-color-surface');
    expect(commandItem({ lines: 2 }).base()).toContain('min-h-spacing-900');
  });
});
