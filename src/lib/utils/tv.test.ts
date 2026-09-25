import { describe, expect, it } from 'vitest';
import { twMerge } from './tv.js';

describe('twMerge', () => {
  it('lets a caller replace a spacing-token class', () => {
    expect(twMerge('size-spacing-250 p-spacing-200', 'size-[18px] p-4')).toBe('size-[18px] p-4');
  });

  it('keeps a narrower override of a spacing-token class', () => {
    expect(twMerge('px-spacing-200', 'pl-spacing-100')).toBe('px-spacing-200 pl-spacing-100');
  });

  it('lets a caller replace a z-layer', () => {
    expect(twMerge('z-layer-bar', 'z-40')).toBe('z-40');
  });
});
