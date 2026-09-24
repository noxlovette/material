import { tv, type VariantProps } from 'tailwind-variants';
import { buttonBase, buttonSizes } from '../theme.js';

export type ConnectedButtonGroupVariants = VariantProps<typeof connectedButtonGroup>;
export type ConnectedButtonGroupItemVariants = VariantProps<typeof connectedButtonGroupItem>;

/*
 * Connected button group, per https://m3.material.io/components/button-groups/specs: toggle
 * buttons 2dp apart that share one outline shape. Items take the button's measurements for their
 * size. Corners (`.md-btn-connected` in styles/component.css): inner corners --cbg-inner, then
 * --cbg-pressed while pressed and fully round while selected; outer corners --cbg-outer, fully
 * round or, for the square shape, the inner size. XS and S items are at least 48dp wide.
 */
export const connectedButtonGroup = tv({
  slots: {
    root: 'flex w-full items-stretch gap-0.5'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'h-auto flex-col' }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export const connectedButtonGroupItem = tv({
  slots: {
    base: [buttonBase, 'md-btn-connected min-w-12 flex-1'],
    icon: 'shrink-0'
  },
  variants: {
    size: {
      xs: {
        base: [buttonSizes.xs.base, '[--cbg-inner:0.5rem] [--cbg-pressed:0.25rem]'],
        icon: buttonSizes.xs.icon
      },
      sm: {
        base: [buttonSizes.sm.base, '[--cbg-inner:0.5rem] [--cbg-pressed:0.25rem]'],
        icon: buttonSizes.sm.icon
      },
      md: {
        base: [buttonSizes.md.base, '[--cbg-inner:0.5rem] [--cbg-pressed:0.25rem]'],
        icon: buttonSizes.md.icon
      },
      lg: {
        base: [buttonSizes.lg.base, '[--cbg-inner:1rem] [--cbg-pressed:0.75rem]'],
        icon: buttonSizes.lg.icon
      },
      xl: {
        base: [buttonSizes.xl.base, '[--cbg-inner:1.25rem] [--cbg-pressed:1rem]'],
        icon: buttonSizes.xl.icon
      }
    },
    shape: {
      round: { base: '[--cbg-outer:var(--btn-round)]' },
      square: { base: '[--cbg-outer:var(--cbg-inner)]' }
    }
  },
  defaultVariants: {
    size: 'sm',
    shape: 'round'
  }
});
