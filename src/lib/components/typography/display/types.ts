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
		 * Whether to use the emphasized weight for the display text.
		 */
		emphasized?: boolean;
		/**
		 * The size of the display text.
		 * @default 'medium'
		 */
		size?: 'small' | 'medium' | 'large';
	};
