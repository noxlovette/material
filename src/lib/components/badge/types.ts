import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { badge } from './theme.js';

export type BadgeVariants = VariantProps<typeof badge>;
export type BadgeProps = BadgeVariants &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * The size of the badge.
     * - 'sm': Small badge, no number displayed.
     * - 'lg': Large badge, displays number.
     */
    size?: BadgeVariants['size'];
    /**
     * The number to display in the badge.
     * Values greater than 99 will be displayed as "99+".
     * If size is 'sm', the number is not displayed.
     */
    number?: number;
  };
