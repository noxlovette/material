import type { Snippet } from 'svelte';

/**
 * Props for the BottomSheet component.
 */
export interface BottomSheetProps {
	/**
	 * The content to be rendered inside the bottom sheet.
	 * Typically includes a list of actions or supplementary information.
	 */
	children: Snippet;
	/**
	 * Callback function to close the bottom sheet.
	 * @param reason The reason for closing ('esc' key, 'click' outside, or 'low' drag height).
	 */
	close: (reason: 'esc' | 'click' | 'low') => void;
}
