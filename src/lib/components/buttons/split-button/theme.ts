import { tv, type VariantProps } from 'tailwind-variants';
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
    root: 'inline-flex items-stretch gap-0.5',
    leading: [buttonBase, 'md-btn-split-leading'],
    leadingIcon: 'shrink-0',
    trailing: [buttonBase, 'md-btn-split-trailing px-0'],
    // Off centre toward the leading button while closed (it balances the round outer edge);
    // SplitButton.svelte springs it to centre and flips it while open.
    chevron: 'shrink-0'
  },
  variants: {
    size: {
      xs: {
        leading: [
          buttonSizes.xs.base,
          'ps-3 pe-2.5 [--split-active:0.5rem] [--split-inner:0.25rem]'
        ],
        leadingIcon: buttonSizes.xs.icon,
        trailing: [buttonSizes.xs.base, 'w-12 [--split-active:0.5rem] [--split-inner:0.25rem]'],
        chevron: 'size-[22px] -translate-x-px text-[22px]'
      },
      sm: {
        leading: [
          buttonSizes.sm.base,
          'ps-4 pe-3 [--split-active:0.75rem] [--split-inner:0.25rem]'
        ],
        leadingIcon: buttonSizes.sm.icon,
        trailing: [buttonSizes.sm.base, 'w-12 [--split-active:0.75rem] [--split-inner:0.25rem]'],
        chevron: 'size-[22px] -translate-x-px text-[22px]'
      },
      md: {
        leading: [buttonSizes.md.base, 'px-6 [--split-active:0.75rem] [--split-inner:0.25rem]'],
        leadingIcon: buttonSizes.md.icon,
        trailing: [buttonSizes.md.base, 'w-14 [--split-active:0.75rem] [--split-inner:0.25rem]'],
        chevron: 'size-[26px] -translate-x-0.5 text-[26px]'
      },
      lg: {
        leading: [buttonSizes.lg.base, 'px-12 [--split-active:1.25rem] [--split-inner:0.5rem]'],
        leadingIcon: buttonSizes.lg.icon,
        trailing: [buttonSizes.lg.base, 'w-24 [--split-active:1.25rem] [--split-inner:0.5rem]'],
        chevron: 'size-[38px] -translate-x-[3px] text-[38px]'
      },
      xl: {
        leading: [buttonSizes.xl.base, 'px-16 [--split-active:1.25rem] [--split-inner:0.75rem]'],
        leadingIcon: buttonSizes.xl.icon,
        trailing: [buttonSizes.xl.base, 'w-34 [--split-active:1.25rem] [--split-inner:0.75rem]'],
        chevron: 'size-[50px] -translate-x-1.5 text-[50px]'
      }
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

/** The chevron's resting offset toward the leading button, in px (the `-translate-x-*` above). */
export const SPLIT_CHEVRON_OFFSET = { xs: 1, sm: 1, md: 2, lg: 3, xl: 6 } as const;
