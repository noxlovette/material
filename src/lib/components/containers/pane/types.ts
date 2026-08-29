import type { DivAttrs } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { Breakpoint, PaneGridVariants, PaneVariants, Responsive, SpaceSize } from './theme.js';

export type { Breakpoint, Direction, Responsive, SpaceSize } from './theme.js';

/**
 * Props for the Pane component — a single content region. Used standalone as a
 * page-level wrapper, or as a child of PaneGrid to become one region of a
 * multi-pane layout (a sidebar, a detail column, a supporting panel, ...).
 */
export type PaneProps = PaneVariants &
  DivAttrs & {
    /** Pane content. */
    children: Snippet;
    /** Optional root class. */
    class?: string;
    /** Optional content container class. */
    contentClass?: string;
    /**
     * Fixed flex-basis in px. Omit for a flexible pane that grows to fill the
     * remaining space in its PaneGrid. Bindable — updated live while dragging
     * when `resizable` is set.
     * @default undefined (flexible)
     */
    width?: number;
    /**
     * Minimum width in px when `resizable`.
     * @default 200
     */
    min?: number;
    /**
     * Maximum width in px when `resizable`.
     * @default 640
     */
    max?: number;
    /**
     * Renders a drag handle on the trailing edge and lets the user resize this
     * pane. Requires `width` to be set.
     * @default false
     */
    resizable?: boolean;
    /**
     * localStorage key to persist the dragged width under. Omit to skip
     * persistence.
     */
    persistKey?: string;
    /**
     * Top offset in px for a `sticky` pane, e.g. to sit below a fixed app bar.
     * @default 0
     */
    stickyTop?: number;
    /**
     * Hide this pane below the given breakpoint (visible from this size up).
     * Mutually exclusive with `hiddenFrom`.
     */
    visibleFrom?: Breakpoint;
    /**
     * Hide this pane from the given breakpoint up (visible only below it).
     * Mutually exclusive with `visibleFrom`.
     */
    hiddenFrom?: Breakpoint;
  };

/**
 * Props for the PaneGrid component — arranges Pane children relative to one
 * another: direction, gap, and outer margin/padding, each independently
 * responsive across viewport tiers (small/medium/large/extraLarge).
 */
export type PaneGridProps = PaneGridVariants &
  DivAttrs & {
    /** Pane children. */
    children: Snippet;
    /** Optional root class. */
    class?: string;
    /**
     * Row (side by side) or column (stacked), per breakpoint.
     * @default 'row'
     */
    direction?: Responsive<'row' | 'column'>;
    /**
     * Space between panes, per breakpoint.
     * @default 'md'
     */
    gap?: Responsive<SpaceSize>;
    /**
     * Padding on the grid's own edge, per breakpoint.
     * @default 'none'
     */
    padding?: Responsive<SpaceSize>;
    /**
     * Margin around the grid, per breakpoint.
     * @default 'none'
     */
    margin?: Responsive<SpaceSize>;
  };
