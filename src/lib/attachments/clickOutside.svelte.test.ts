// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Fixture from './clickOutside.fixture.test.svelte';

describe('clickOutside as a conditional {@attach}', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('closes on an outside click, then detaches while closed', () => {
    const props = $state({ open: true });
    const app = mount(Fixture, { target: document.body, props });
    const outside = document.querySelector<HTMLElement>('[data-testid="outside"]')!;
    const panel = document.querySelector<HTMLElement>('[data-testid="panel"]')!;

    panel.click();
    flushSync();
    expect(props.open).toBe(true);

    outside.click();
    flushSync();
    expect(props.open).toBe(false);

    // Reopen: the attachment re-runs and listens again.
    props.open = true;
    flushSync();
    outside.click();
    flushSync();
    expect(props.open).toBe(false);

    unmount(app);
  });

  it('removes its document listener on unmount', () => {
    const props = $state({ open: true });
    const app = mount(Fixture, { target: document.body, props });
    unmount(app);
    const stray = document.createElement('button');
    document.body.append(stray);
    stray.click();
    expect(props.open).toBe(true);
  });
});
