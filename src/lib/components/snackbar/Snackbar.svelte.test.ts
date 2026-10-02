// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Snackbar from './Snackbar.svelte';

vi.mock('motion', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion')>()),
  animate: () => ({ then: () => {}, stop: () => {} })
}));

window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;

const buttons = () =>
  document.querySelectorAll<HTMLButtonElement>('[data-cy="m3-snackbar"] button');
const dismiss = () => document.querySelector('[data-cy="m3-snackbar-dismiss"]');

describe('Snackbar controls', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it.each([undefined, true, false])('renders only the action with showClose=%s', (showClose) => {
    const callback = vi.fn();
    const app = mount(Snackbar, {
      target: document.body,
      props: { message: 'Item archived.', static: true, label: 'Undo', callback, showClose }
    });
    flushSync();
    expect(buttons()).toHaveLength(1);
    expect(buttons()[0].textContent?.trim()).toBe('Undo');
    expect(dismiss()).toBeNull();
    buttons()[0].click();
    expect(callback).toHaveBeenCalledOnce();
    unmount(app);
  });

  it('shows the close icon by default when there is no action', () => {
    const props = $state({ message: 'Saved.', static: true });
    const app = mount(Snackbar, { target: document.body, props });
    flushSync();
    expect(buttons()).toHaveLength(1);
    expect(dismiss()).not.toBeNull();
    buttons()[0].click();
    flushSync();
    expect(props.message).toBe('');
    unmount(app);
  });

  it('renders neither control when there is no action and showClose is false', () => {
    const app = mount(Snackbar, {
      target: document.body,
      props: { message: 'Saved.', static: true, showClose: false }
    });
    flushSync();
    expect(buttons()).toHaveLength(0);
    unmount(app);
  });

  it('switches between the action and close icon when the label changes', () => {
    const props = $state({ message: 'Saved.', static: true, label: '' });
    const app = mount(Snackbar, { target: document.body, props });
    flushSync();
    expect(dismiss()).not.toBeNull();

    props.label = 'Undo';
    flushSync();
    expect(buttons()).toHaveLength(1);
    expect(buttons()[0].textContent?.trim()).toBe('Undo');
    expect(dismiss()).toBeNull();

    props.label = '';
    flushSync();
    expect(buttons()).toHaveLength(1);
    expect(dismiss()).not.toBeNull();
    unmount(app);
  });
});
