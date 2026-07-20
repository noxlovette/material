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
    /**
     * The anchor mode for the panes.
     * - `viewport` — left pane fixes to the true browser edge (full-page app layouts).
     * - `parent` — left pane is absolutely positioned within a `relative` ancestor
     *   (embedded/contained demos, does not stick while scrolling).
     * - `sticky` — left/right sit in normal flex flow and the left pane sticks as
     *   the page scrolls. Use for a sidebar nested inside other offset content
     *   (e.g. a secondary docs nav inside an already Rail-offset column), where
     *   `viewport` would fix to the wrong edge and `parent` would lose sticky
     *   behaviour. Typically paired with `resizable={false}`.
     */
    anchor?: SplitPaneVariants['anchor'];
    /**
     * Whether the split is user-draggable. Set to `false` for a static sidebar —
     * hides the drag handle and skips width persistence.
     * @default true
     */
    resizable?: boolean;
    /**
     * Which pane to show on mobile. On desktop both panes are always visible.
     * @default 'right'
     */
    mobilePane?: 'left' | 'right';
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
    /** Whether the supporting pane can be collapsed (desktop). */
    collapsible?: boolean;
    /** Show a bottom sheet on mobile instead of inline stacking. @default false */
    mobileSheet?: boolean;
    /** Material symbol name for the mobile sheet trigger button. @default 'info' */
    mobileSheetIcon?: string;
    /** Extra class for the mobile trigger button (use to position above navbars). */
    mobileTriggerClass?: string;
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
