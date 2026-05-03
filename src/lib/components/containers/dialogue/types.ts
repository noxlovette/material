import type { Snippet } from 'svelte';
import type { DialogueVariants } from './theme.js';
import type { DivAttrs } from '$lib/utils/types.js';

/**
 * Props for the Dialogue component.
 * Dialogs provide important information or prompt users for a decision.
 */
export type DialogueProps = DialogueVariants &
	DivAttrs & {
		/** Toggle handler for closing the dialogue when not using history state. */
		toggle: () => void;
		/** When true, uses window.history.back() to close the dialogue. */
		withState?: boolean;
		/** The main descriptive text content of the dialogue. */
		supportingText: string;
		/** An optional headline for the dialogue. */
		headline?: string;
		/** The label for the confirmation button. */
		confirmText: string;
		/**
		 * Optional additional content to be rendered between the supporting text
		 * and the action buttons.
		 */
		children?: Snippet;
		/** Optional form action for the confirm button. */
		confirmAction?: string;
		/** Whether the confirm button should show a loading state. */
		loading?: boolean;
	};
