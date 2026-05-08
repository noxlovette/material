import type { Snippet } from 'svelte';
import type { DialogueVariants } from './theme.js';
import type { DivAttrs } from '$lib/utils/types.js';
import type { Dialog } from 'bits-ui';

/**
 * Props for the Dialogue component.
 * Dialogs provide important information or prompt users for a decision.
 */
export type DialogueProps = DialogueVariants &
	Dialog.RootProps & {
		/** Toggle handler for closing the dialogue when not using history state. */
		toggle: () => void;
		/** Whether the dialogue is open. */
		open: boolean;
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
		/** Additional props */
		contentProps?: Dialog.ContentProps;
		/** Class for the inner content */
		class?: string;
	};
