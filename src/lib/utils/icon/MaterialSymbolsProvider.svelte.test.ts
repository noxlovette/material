// @vitest-environment jsdom
import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import MaterialSymbolsProvider from './MaterialSymbolsProvider.svelte';
import type { MaterialSymbolsProviderProps } from './types.js';

const fontLinks = () => document.head.querySelectorAll('link[href*="fonts.googleapis.com"]');

function setup(props: MaterialSymbolsProviderProps = {}) {
  const app = mount(MaterialSymbolsProvider, { target: document.body, props });
  flushSync();
  return app;
}

describe('MaterialSymbolsProvider', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('injects the Google Fonts stylesheet by default', () => {
    const app = setup();
    expect(fontLinks()).toHaveLength(1);
    unmount(app);
  });

  it('renders no link when selfHosted', () => {
    const app = setup({ selfHosted: true });
    expect(fontLinks()).toHaveLength(0);
    expect(document.head.querySelectorAll('link')).toHaveLength(0);
    unmount(app);
  });
});
