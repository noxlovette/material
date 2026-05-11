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
     * Whether to use the emphasized weight for the headline text.
     */
    emphasized?: boolean;
    /**
     * The size of the headline text.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
