import { tv, type VariantProps } from '#lib/utils/tv.js';

import { buttonBase, buttonSizes } from '../theme.js';

export type SplitButtonVariants = VariantProps<typeof splitButton>;

/*
 * Split button, per https://m3.material.io/components/split-button/specs. Both halves take the
 * button's height, type and outline for their size. The leading button has its own padding, the
 * trailing button a fixed width around a larger menu icon, and they sit 2dp apart. The corner
 * rules are `.md-btn-split-*` in styles/component.css: inner corners --split-inner at rest,
 * --split-active while hovered, focused or pressed, and fully round on the trailing button while
 * the menu is open.
 */
export const splitButton = tv({
  slots: {
    root: 'inline-flex items-stretch gap-spacing-25',
    leading: [buttonBase, 'md-btn-split-leading'],
    leadingIcon: 'shrink-0',
    trailing: [buttonBase, 'md-btn-split-trailing px-spacing-0'],
    // Off centre toward the leading button while closed (it balances the round outer edge);
    // SplitButton.svelte springs it to centre and flips it while open.
    chevron: 'shrink-0'
  },
  variants: {
    size: {
      xs: {
        leading: [
          buttonSizes.xs.base,
          'ps-spacing-150 pe-spacing-125 [--split-active:var(--radius-sm)] [--split-inner:var(--radius-xs)]'
        ],
        leadingIcon: buttonSizes.xs.icon,
        trailing: [
          buttonSizes.xs.base,
          'w-spacing-600 [--split-active:var(--radius-sm)] [--split-inner:var(--radius-xs)]'
        ],
        chevron: 'size-(--text-icon-22) -translate-x-px text-icon-22'
      },
      sm: {
        leading: [
          buttonSizes.sm.base,
          'ps-spacing-200 pe-spacing-150 [--split-active:var(--radius-md)] [--split-inner:var(--radius-xs)]'
        ],
        leadingIcon: buttonSizes.sm.icon,
        trailing: [
          buttonSizes.sm.base,
          'w-spacing-600 [--split-active:var(--radius-md)] [--split-inner:var(--radius-xs)]'
        ],
        chevron: 'size-(--text-icon-22) -translate-x-px text-icon-22'
      },
      md: {
        leading: [
          buttonSizes.md.base,
          'px-spacing-300 [--split-active:var(--radius-md)] [--split-inner:var(--radius-xs)]'
        ],
        leadingIcon: buttonSizes.md.icon,
        trailing: [
          buttonSizes.md.base,
          'w-spacing-700 [--split-active:var(--radius-md)] [--split-inner:var(--radius-xs)]'
        ],
        chevron: 'size-(--text-icon-26) -translate-x-spacing-25 text-icon-26'
      },
      lg: {
        leading: [
          buttonSizes.lg.base,
          'px-spacing-600 [--split-active:var(--radius-lg-increased)] [--split-inner:var(--radius-sm)]'
        ],
        leadingIcon: buttonSizes.lg.icon,
        trailing: [
          buttonSizes.lg.base,
          'w-24 [--split-active:var(--radius-lg-increased)] [--split-inner:var(--radius-sm)]'
        ],
        chevron: 'size-(--text-icon-38) -translate-x-[3px] text-icon-38'
      },
      xl: {
        leading: [
          buttonSizes.xl.base,
          'px-spacing-800 [--split-active:var(--radius-lg-increased)] [--split-inner:var(--radius-md)]'
        ],
        leadingIcon: buttonSizes.xl.icon,
        trailing: [
          buttonSizes.xl.base,
          'w-34 [--split-active:var(--radius-lg-increased)] [--split-inner:var(--radius-md)]'
        ],
        chevron: 'size-(--text-icon-50) -translate-x-spacing-75 text-icon-50'
      }
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

/** The chevron's resting offset toward the leading button, in px (the `-translate-x-*` above). */
export const SPLIT_CHEVRON_OFFSET = { xs: 1, sm: 1, md: 2, lg: 3, xl: 6 } as const;
