import { describe, expect, it } from 'vitest';
import { pane } from './theme.js';

describe('pane end space', () => {
  it('ends a full pane 72dp above its bottom edge at every tier', () => {
    const content = pane({ full: true, padding: 'md' }).content().split(' ');
    expect(content).toEqual(
      expect.arrayContaining(['pb-spacing-900', 'md:pb-spacing-900', 'lg:pb-spacing-900'])
    );
    // The preset still sets the sides and the top.
    expect(content).toEqual(expect.arrayContaining(['px-spacing-200', 'lg:px-spacing-400']));
  });

  it('leaves padding="none" and non-full panes alone', () => {
    expect(pane({ full: true, padding: 'none' }).content()).not.toContain('pb-spacing-900');
    expect(pane({ full: false, padding: 'md' }).content()).not.toContain('pb-spacing-900');
  });
});
