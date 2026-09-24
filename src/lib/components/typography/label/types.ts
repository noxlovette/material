import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { label } from './theme.js';

export type LabelVariants = VariantProps<typeof label>;

/**
 * Props for the Label typography component.
 */
export type LabelProps = LabelVariants &
  HTMLAttributes<HTMLElement> & {
    /**
     * Label text content.
     */
    children: Snippet;
    /**
     * Use the M3 emphasized style (`md-sys-typescale-emphasized-label-*`): same size, heavier weight.
     * Use it for selected, active, or unread states, or for editorial emphasis.
     */
    emphasized?: boolean;
    /**
     * The size of the label text.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
