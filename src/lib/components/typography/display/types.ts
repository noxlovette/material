import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { DisplayVariants } from './theme.js';

/**
 * Props for the Display typography component.
 */
export type DisplayProps = DisplayVariants &
  HTMLAttributes<HTMLElement> & {
    /**
     * Display text content.
     */
    children: Snippet;
    /**
     * Use the M3 emphasized style (`md-sys-typescale-emphasized-display-*`): same size, heavier weight.
     * Use it for selected, active, or unread states, or for editorial emphasis.
     */
    emphasized?: boolean;
    /**
     * The size of the display text.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
