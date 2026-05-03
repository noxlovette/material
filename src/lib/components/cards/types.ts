import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { card } from './theme.js';

export type CardVariants = VariantProps<typeof card>;

/**
 * Props for the Card component.
 * Supports both div (default) and anchor (when href is provided) elements.
 */
export type CardProps = CardVariants &
	HTMLAttributes<HTMLDivElement> &
	HTMLAnchorAttributes & {
		/** The content to be rendered inside the card. */
		children: Snippet;
		/**
		 * An optional URL that the card should link to.
		 * If provided, the card will be rendered as an `<a>` element.
		 */
		href?: string;
		/**
		 * The visual style of the card.
		 * - 'elevated': Cards with a shadow, used for separating content from the background.
		 * - 'filled': Cards with a solid background color, providing subtle separation.
		 * - 'outlined': Cards with a visual boundary, providing the least amount of separation.
		 * @default 'filled'
		 */
		type?: CardVariants['type'];
		/**
		 * Whether the card should show a state layer on hover.
		 * Defaults to true if `href` is provided.
		 */
		hoverable?: boolean;
	};
