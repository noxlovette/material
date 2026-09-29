// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Slider from './Slider.svelte';

window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;
// jsdom has no ResizeObserver; bind:clientWidth and bits-ui's slider both ask for one.
window.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as never;

describe('Slider accessible name', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('puts aria-label and aria-labelledby on the role="slider" thumb, not the root', () => {
    const app = mount(Slider, {
      target: document.body,
      props: { value: 0, max: 100, 'aria-label': 'Seek', 'aria-labelledby': 'seek-label' }
    });
    flushSync();
    const thumb = document.querySelector('[role="slider"]')!;
    expect(thumb.getAttribute('aria-label')).toBe('Seek');
    expect(thumb.getAttribute('aria-labelledby')).toBe('seek-label');
    expect(document.querySelectorAll('[aria-label="Seek"]')).toHaveLength(1);
    unmount(app);
  });

  it('announces the formatted value', () => {
    const app = mount(Slider, {
      target: document.body,
      props: { value: 40, 'aria-label': 'Volume', format: (n: number) => `${n}%` }
    });
    flushSync();
    expect(document.querySelector('[role="slider"]')!.getAttribute('aria-valuetext')).toBe('40%');
    unmount(app);
  });
});
