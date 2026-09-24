import { tv, type VariantProps } from 'tailwind-variants';

export type ButtonGroupVariants = VariantProps<typeof buttonGroup>;

/*
 * Standard button group, per https://m3.material.io/components/button-groups/specs: an invisible
 * container that spaces its buttons so each keeps a 48dp target (18/12/8/8/8dp for XS–XL).
 * Pressing a button widens it by 15% and its neighbours give that width back (ButtonGroup.svelte).
 */
export const buttonGroup = tv({
  slots: {
    root: 'inline-flex w-max flex-nowrap'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row items-center' },
      vertical: { root: 'w-auto flex-col items-stretch' }
    },
    size: {
      xs: { root: 'gap-[1.125rem]' },
      sm: { root: 'gap-3' },
      md: { root: 'gap-2' },
      lg: { root: 'gap-2' },
      xl: { root: 'gap-2' }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm'
  }
});
