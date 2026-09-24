import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { TitleVariants } from './theme.js';

/**
 * Props for the Title typography component.
 */
export type TitleProps = TitleVariants &
  HTMLAttributes<HTMLElement> & {
    /**
     * Title text content.
     */
    children: Snippet;
    /**
     * Use the M3 emphasized style (`md-sys-typescale-emphasized-title-*`): same size, heavier weight.
     * Use it for selected, active, or unread states, or for editorial emphasis.
     */
    emphasized?: boolean;
    /**
     * The size of the title text.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
