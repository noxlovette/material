// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Fixture from './chip.fixture.test.svelte';

// jsdom has no matchMedia; Layer's keyboard ripple asks it about reduced motion.
window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;

const action = () => document.querySelector<HTMLButtonElement>('[data-chip-action]')!;
const press = (key: string) =>
  action().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));

describe('input Chip', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('renders the primary action and the remove button as sibling buttons', () => {
    const app = mount(Fixture, { target: document.body, props: { onRemove: () => {} } });
    flushSync();
    const remove = document.querySelector('button[aria-label="Remove Ada"]');
    expect(action().tagName).toBe('BUTTON');
    expect(remove).not.toBeNull();
    expect(action().contains(remove)).toBe(false);
    unmount(app);
  });

  it('calls onRemove on Backspace and Delete, not on other keys', () => {
    const onRemove = vi.fn();
    const app = mount(Fixture, { target: document.body, props: { onRemove } });
    flushSync();
    press('Backspace');
    press('Delete');
    press('Enter');
    expect(onRemove).toHaveBeenCalledTimes(2);
    unmount(app);
  });

  it('ignores removal keys while disabled', () => {
    const onRemove = vi.fn();
    const app = mount(Fixture, { target: document.body, props: { onRemove, disabled: true } });
    flushSync();
    press('Backspace');
    expect(onRemove).not.toHaveBeenCalled();
    unmount(app);
  });
});
