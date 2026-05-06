import type { Snippet } from 'svelte';
import type { LinkPreviewVariants } from './theme.js';
import type { LinkPreview } from 'bits-ui';

export interface LinkPreviewProps extends LinkPreviewVariants {
	/** Snippet rendered as the trigger element (typically an anchor tag or a link). */
	trigger: Snippet;
	/** The preview content. */
	children: Snippet;
	/** Controlled open state. */
	open?: boolean;
	/** Positioning side relative to the trigger. */
	side?: LinkPreview.ContentProps['side'];
	/** Alignment along the side axis. */
	align?: LinkPreview.ContentProps['align'];
	/** Gap between trigger and panel in px. */
	sideOffset?: number;
	/** Delay in ms before the preview opens. */
	openDelay?: number;
	/** Delay in ms before the preview closes. */
	closeDelay?: number;
	class?: string;
}
