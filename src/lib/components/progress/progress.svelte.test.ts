// @vitest-environment jsdom
import { flushSync, mount, unmount, type Component } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';

import CircularProgress from './CircularProgress.svelte';
import LinearProgress from './LinearProgress.svelte';
import WavyLinearProgress from './WavyLinearProgress.svelte';

window.matchMedia = ((query: string) => ({ matches: true, media: query })) as never;

describe.each([
  ['LinearProgress', LinearProgress],
  ['CircularProgress', CircularProgress],
  ['WavyLinearProgress', WavyLinearProgress]
] as [string, Component<Record<string, unknown>>][])('%s accessible name', (_, Progress) => {
  afterEach(() => (document.body.innerHTML = ''));

  it('forwards aria-label and aria-labelledby to the progressbar', () => {
    const app = mount(Progress, {
      target: document.body,
      props: { percent: 50, 'aria-label': 'Reading comprehension', 'aria-labelledby': 'lbl' }
    });
    flushSync();
    const bar = document.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-label')).toBe('Reading comprehension');
    expect(bar.getAttribute('aria-labelledby')).toBe('lbl');
    unmount(app);
  });
});
