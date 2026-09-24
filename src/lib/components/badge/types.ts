import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { badge } from './theme.js';

export type BadgeVariants = VariantProps<typeof badge>;
export type BadgeProps = BadgeVariants &
  HTMLAttributes<HTMLSpanElement> & {
    /**
     * The size of the badge.
     * - 'sm': Small badge (6dp dot), no number displayed.
     * - 'lg': Large badge (16dp tall), displays number.
     */
    size?: BadgeVariants['size'];
    /**
     * The number to display in the badge.
     * Values greater than `max` are displayed as `${max}+`.
     * If size is 'sm', the number is not displayed.
     */
    number?: number;
    /**
     * Largest count shown before collapsing to `${max}+`. M3 caps a large badge at four
     * characters including the "+" (16×34dp container), so the default is 999 → "999+".
     * @default 999
     */
    max?: number;
    /**
     * By default the badge is absolutely positioned on its nearest positioned ancestor's
     * top-trailing corner per the M3 offsets — that ancestor should hug the icon (e.g.
     * `<span class="relative inline-flex">` around a 24dp `Icon`). Set `standalone` to render it
     * in normal flow instead, e.g. in a list item's trailing slot.
     * @default false
     */
    standalone?: boolean;
  };
