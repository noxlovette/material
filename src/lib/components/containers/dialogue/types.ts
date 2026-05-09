import type { Snippet } from 'svelte';
import type { DialogueVariants } from './theme.js';
import type { Dialog } from 'bits-ui';

/**
 * Props for the Dialogue component.
 * Dialogs provide important information or prompt users for a decision.
 */
export type DialogueProps = DialogueVariants &
	Dialog.RootProps & {
		/** Required form enhancement from superForms or SvelteKit. */
		enhance: any;
		/** Toggle handler for closing the dialogue when not using history state. */
		toggle?: () => void;
		/** Whether the dialogue is open. */
		open?: boolean;
		/** Whether to use history state. */
		withState?: boolean;
		/** The main descriptive text content of the dialogue. */
		supportingText?: string;
		/** An optional headline for the dialogue. */
		headline?: string;
		/** The label for the confirmation button. */
		confirmText: string;
		/** The label for the cancel button. Defaults to 'Отмена'. */
		cancelText?: string;
		/**
		 * Optional additional content to be rendered between the supporting text
		 * and the action buttons.
		 */
		children?: Snippet;
		/** Optional form action for the confirm button. */
		confirmAction?: string;
		/** Whether the confirm button should show a loading state. */
		loading?: boolean;
		/** Whether to disable the portal (useful if the dialogue is inside a form). */
		portalDisabled?: boolean;
		/** Minimum width for the dialogue. */
		minWidth?: string;
		/** Maximum width for the dialogue. */
		maxWidth?: string;
		/** Additional props */
		contentProps?: Dialog.ContentProps;
		/** Class for the inner content */
		class?: string;
	};
