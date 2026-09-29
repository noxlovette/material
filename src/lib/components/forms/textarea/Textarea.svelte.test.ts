// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Textarea from './Textarea.svelte';

window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;

const field = () => document.querySelector('textarea')!;

describe('Textarea', () => {
  afterEach(() => (document.body.innerHTML = ''));

  it('ties the label to the textarea and sizes it in lines', () => {
    const app = mount(Textarea, {
      target: document.body,
      props: { label: 'Message', id: 'msg', rows: 2, maxRows: 6 }
    });
    flushSync();
    expect(document.querySelector('label')!.htmlFor).toBe('msg');
    expect(field().id).toBe('msg');
    expect(field().getAttribute('style')).toContain('min-height: 2lh');
    expect(field().getAttribute('style')).toContain('max-height: 6lh');
    unmount(app);
  });

  it('shows the counter, links it, and turns invalid over the limit', () => {
    const app = mount(Textarea, {
      target: document.body,
      props: { label: 'Bio', id: 'bio', characterLimit: 3, value: 'abcd', 'aria-describedby': 'x' }
    });
    flushSync();
    expect(document.getElementById('bio-counter')!.textContent).toBe('4 / 3');
    expect(field().getAttribute('aria-describedby')).toBe('x bio-counter');
    expect(field().getAttribute('aria-invalid')).toBe('true');
    unmount(app);
  });

  it('stays valid under the limit and has no counter without one', () => {
    const app = mount(Textarea, { target: document.body, props: { label: 'Notes', value: 'hi' } });
    flushSync();
    expect(field().getAttribute('aria-invalid')).toBe('false');
    expect(field().hasAttribute('aria-describedby')).toBe(false);
    expect(field().value).toBe('hi');
    unmount(app);
  });
});
