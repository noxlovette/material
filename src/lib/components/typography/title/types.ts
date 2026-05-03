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
		 * Whether to use the emphasized weight for the title text.
		 */
		emphasized?: boolean;
		/**
		 * The size of the title text.
		 * @default 'medium'
		 */
		size?: 'small' | 'medium' | 'large';
	};
