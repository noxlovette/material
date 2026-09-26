import { describe, expect, it } from 'vitest';
import { fab } from './theme.js';

describe('fab menu close button', () => {
  // #49: the open state's box comes from the classes, not only the spring's inline styles.
  it.each(['small', 'regular', 'medium', 'large'] as const)(
    'is 56dp round when a %s FAB opens its menu',
    (size) => {
      const base = fab({ size, menuOpen: true }).base().split(/\s+/);
      expect(base).toContain('size-spacing-700');
      expect(base).toContain('rounded-[1.75rem]');
      expect(base.filter((c) => /^(h|w)-/.test(c))).toEqual([]);
    }
  );
});
