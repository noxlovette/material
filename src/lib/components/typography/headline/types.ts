import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { HeadlineVariants } from './theme.js';

/**
 * Props for the Headline typography component.
 */
export type HeadlineProps = HeadlineVariants &
  HTMLAttributes<HTMLElement> & {
    /**
     * Headline text content.
     */
    children: Snippet;
    /**
     * Use the M3 emphasized style (`md-sys-typescale-emphasized-headline-*`): same size, heavier weight.
     * Use it for selected, active, or unread states, or for editorial emphasis.
     */
    emphasized?: boolean;
    /**
     * The size of the headline text.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
