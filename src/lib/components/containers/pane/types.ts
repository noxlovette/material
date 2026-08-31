import type { DivAttrs } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type {
  Breakpoint,
  DraggablePaneVariants,
  PaneGridVariants,
  PaneVariants,
  Responsive,
  SpaceSize
} from './theme.js';

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
     * remaining space in its PaneGrid. Bindable — with `resizable` and
     * `persistKey` set, tracks live updates from a `PaneHandle` sharing the
     * same `persistKey` instead of managing its own drag state.
     * @default undefined (flexible)
     */
    width?: number;
    /**
     * Marks this pane as driven by a `PaneHandle` sharing the same
     * `persistKey` — the pane no longer owns a handle itself, it just mirrors
     * whatever width the handle drags it to.
     * @default false
     */
    resizable?: boolean;
    /**
     * Key shared with a `PaneHandle` to sync this pane's width through the
     * localStorage-backed resize store. Required when `resizable` is set;
     * omit to skip persistence for a plain fixed-width pane.
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

/**
 * Props for the PaneHandle component — a drag divider placed directly inside
 * a `PaneGrid`, between the `Pane` it resizes and its neighbor. Drags that
 * pane's width by writing to the shared, localStorage-backed resize store;
 * the `Pane` reads it back via a matching `persistKey`.
 */
export type PaneHandleProps = DivAttrs & {
  /** Optional root class. */
  class?: string;
  /** Key shared with the `Pane` this handle resizes. */
  persistKey: string;
  /**
   * Minimum width in px the paired pane can be dragged to.
   * @default 200
   */
  min?: number;
  /**
   * Maximum width in px the paired pane can be dragged to.
   * @default 640
   */
  max?: number;
  /**
   * Widths in px the drag magnetically snaps to when within `snapThreshold`.
   * Defaults to M3's recommended custom two-pane widths (360dp/412dp) for
   * `expanded`/`large`/`extraLarge` layouts.
   * @default [360, 412]
   */
  snapPoints?: number[];
  /**
   * Distance in px from a snap point at which the drag locks onto it.
   * @default 16
   */
  snapThreshold?: number;
};

/**
 * Props for the DraggablePane component — a floating panel positioned by
 * `x`/`y` and dragged into place by its header, rather than a `Pane`
 * participating in a `PaneGrid`'s flex layout.
 */
export type DraggablePaneProps = DraggablePaneVariants &
  DivAttrs & {
    /** Panel content. */
    children: Snippet;
    /** Optional custom header content, replacing the default grip/title/close row. */
    header?: Snippet;
    /** Title shown in the default header. Ignored when `header` is given. */
    title?: string;
    /** Shows a close button in the default header when given; called on click. */
    onClose?: () => void;
    /**
     * Current horizontal position in px, relative to `bounds`. Bindable —
     * updates live while dragging. Omit to let the pane manage its own
     * position starting from `initialX`.
     */
    x?: number;
    /**
     * Current vertical position in px, relative to `bounds`. Bindable —
     * updates live while dragging. Omit to let the pane manage its own
     * position starting from `initialY`.
     */
    y?: number;
    /**
     * Starting horizontal position in px, used when `x` is unset and (with
     * `persistKey`) nothing is stored yet.
     * @default 24
     */
    initialX?: number;
    /**
     * Starting vertical position in px, used when `y` is unset and (with
     * `persistKey`) nothing is stored yet.
     * @default 24
     */
    initialY?: number;
    /**
     * Key to persist this pane's dragged position to `localStorage` across
     * reloads. Omit to keep the position in memory only.
     */
    persistKey?: string;
    /**
     * Clamp the drag to the viewport, or to a given element's current
     * bounding rect.
     * @default 'viewport'
     */
    bounds?: 'viewport' | HTMLElement;
    /**
     * Minimum distance in px kept between the pane and the edge of `bounds`.
     * @default 8
     */
    boundsPadding?: number;
    /** Fixed width — a number is treated as px, a string is used as-is. Omit for the default min-width. */
    width?: number | string;
    /**
     * Disables dragging, e.g. to pin the pane in place on small viewports.
     * @default false
     */
    disableDrag?: boolean;
    /** Optional root class. */
    class?: string;
    /** Optional content container class. */
    contentClass?: string;
  };
