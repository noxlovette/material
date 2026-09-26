// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMaterialAvatarPalette } from './materialAvatarPalette.js';

/** Stubs the resolved custom properties `getMaterialAvatarPalette` reads off `:root`. */
function stubTokens(values: Record<string, string>) {
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: (token: string) => values[token] ?? ''
  } as CSSStyleDeclaration);
}

describe('getMaterialAvatarPalette', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reads rgb() tokens as served in dev', () => {
    stubTokens({
      '--color-md-sys-color-primary-container': 'rgb(194 232 255)',
      '--color-md-sys-color-secondary-container': 'rgb(209, 229, 243)'
    });
    expect(getMaterialAvatarPalette()).toEqual(['c2e8ff', 'd1e5f3']);
  });

  it('reads the hex tokens a minified production build serves', () => {
    stubTokens({
      '--color-md-sys-color-primary-container': '#c2e8ff',
      // Its digit runs (1, 5, 3) used to parse as rgb(1 5 3), i.e. black.
      '--color-md-sys-color-secondary-container': '#d1e5f3',
      '--color-md-sys-color-tertiary-container': '#e5deff',
      '--color-md-sys-color-error-container': '#fff'
    });
    expect(getMaterialAvatarPalette()).toEqual(['c2e8ff', 'd1e5f3', 'e5deff', 'ffffff']);
  });

  it('falls back to the neutral palette when no token resolves', () => {
    stubTokens({});
    expect(getMaterialAvatarPalette()).toHaveLength(5);
  });
});
