import { describe, expect, it } from 'vitest';
import { isCurrentRoute } from './currentRoute.js';

const at = (path: string) => new URL(path, 'http://localhost:5173');

describe('isCurrentRoute', () => {
  it('matches the page and its sub-pages, but the root only itself', () => {
    expect(isCurrentRoute('/', at('/'))).toBe(true);
    expect(isCurrentRoute('/', at('/guides'))).toBe(false);
    expect(isCurrentRoute('/guides', at('/guides/icons'))).toBe(true);
    expect(isCurrentRoute('/guides', at('/guidesx'))).toBe(false);
  });

  it('ignores trailing slashes and handles a base path', () => {
    expect(isCurrentRoute('/material/', at('/material'))).toBe(true);
    expect(isCurrentRoute('/material/guides/', at('/material/guides'))).toBe(true);
    // Served from /material, the app's root is /material, and it matches only itself.
    expect(isCurrentRoute('/material/', at('/material/guides'), '/material')).toBe(false);
    expect(isCurrentRoute('/material/guides', at('/material/guides/icons'), '/material')).toBe(
      true
    );
  });

  it('never matches another origin with the same path (Storybook on its own port)', () => {
    expect(isCurrentRoute('http://localhost:6006/', at('/'))).toBe(false);
    expect(isCurrentRoute('https://example.com/guides', at('/guides'))).toBe(false);
    expect(isCurrentRoute('http://localhost:5173/guides', at('/guides'))).toBe(true);
  });

  it('never treats an in-page anchor as a destination', () => {
    expect(isCurrentRoute('#inbox', at('/'))).toBe(false);
    expect(isCurrentRoute('', at('/'))).toBe(false);
  });
});
