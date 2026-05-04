import type { DivAttrs } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { SinglePaneVariants, SplitPaneVariants, SupportingPaneVariants } from './theme.js';

/**
 * Props for the SplitPane component.
 */
export type SplitPaneProps = SplitPaneVariants &
	DivAttrs & {
		/** Left pane content. */
		left: Snippet;
		/** Right pane content. */
		right: Snippet;
		/**
		 * Initial left pane width in px.
		 * @default 396
		 */
		leftWidth?: number;
		/**
		 * Minimum left pane width in px.
		 * @default 280
		 */
		minLeft?: number;
		/**
		 * Maximum left pane width in px.
		 * @default 720
		 */
		maxLeft?: number;
		/**
		 * LocalStorage key used to persist the split width.
		 * @default 'splitpane:leftWidth'
		 */
		storageKey?: string;
		/**
		 * Whether to persist split width.
		 * @default true
		 */
		persist?: boolean;
		/** Called when the component wants to update external footer padding. */
		onPaddingChange?: (padding: number) => void;
		/** The anchor mode for the panes. */
		anchor?: SplitPaneVariants['anchor'];
		/** Optional class for the left pane. */
		leftClass?: string;
		/** Optional class for the right pane. */
		rightClass?: string;
	};

/**
 * Props for the SupportingPane component.
 */
export type SupportingPaneProps = SupportingPaneVariants &
	DivAttrs & {
		/** Main pane content. */
		main: Snippet;
		/** Supporting pane content. */
		supporting: Snippet;
		/** Optional class for the main pane. */
		mainClass?: string;
		/** Optional class for the supporting pane. */
		supportingClass?: string;
		/** Whether the supporting pane can be collapsed. */
		collapsible?: boolean;
		/**
		 * Width of the supporting pane in px (viewport anchor mode).
		 * @default 320
		 */
		supportingWidth?: number;
		/**
		 * Top offset of the fixed supporting pane in px (viewport anchor mode).
		 * @default 0
		 */
		supportingTop?: number;
	};

/**
 * Props for the SinglePane component.
 */
export type SinglePaneProps = SinglePaneVariants &
	DivAttrs & {
		/** Pane content. */
		children: Snippet;
		/** Optional root class. */
		class?: string;
		/** Optional content container class. */
		contentClass?: string;
	};
