import { tv } from 'tailwind-variants';

/**
 * M3 badge (https://m3.material.io/components/badges/specs).
 *
 * Anchored offsets are measured from the positioned ancestor's top-trailing corner, so that
 * ancestor must hug the icon (24dp box), not the larger active-indicator container:
 * - small: 6dp, its bottom-leading corner 6dp down / 6dp in from the icon's top-trailing corner,
 *   i.e. flush with that corner (`top-0 right-0`).
 * - large: 16dp tall, bottom-leading corner 14dp down / 12dp in from the icon's top-trailing
 *   corner, i.e. top = 14 − 16 = −2dp, left = 100% − 12dp. Anchored by its leading edge so a
 *   wider count grows away from the icon.
 */
export const badge = tv({
  base: 'bg-md-sys-color-error text-md-sys-color-on-error rounded-full inline-flex shrink-0 items-center justify-center',
  variants: {
    size: {
      sm: 'size-1.5',
      lg: 'h-4 min-w-4 px-1 md-sys-typescale-label-small whitespace-nowrap tabular-nums'
    },
    standalone: {
      true: 'relative',
      false: 'absolute pointer-events-none'
    }
  },
  compoundVariants: [
    { standalone: false, size: 'sm', class: 'top-0 right-0' },
    { standalone: false, size: 'lg', class: '-top-0.5 left-[calc(100%-12px)]' }
  ],
  defaultVariants: { size: 'lg', standalone: false }
});
