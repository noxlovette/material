import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
import type { Responsive } from '../../containers/pane/theme.js';
import type { AppBarSize, AppbarVariants } from './theme.js';

type AppBarBaseProps = Pick<AppbarVariants, 'align'> &
  HTMLAttributes<HTMLElementTagNameMap['nav']> & {
    /** Extra content rendered in a full-width row below the title, e.g. a Breadcrumb trail. */
    children?: Snippet;
    /** An optional subtitle displayed below the title. */
    subtitle?: string;
    /** Additional props for the title `<h1>` element (e.g. `data-cy`). */
    titleProps?: HTMLAttributes<HTMLHeadingElement>;
    /** Additional props for the subtitle `<p>` element (e.g. `data-cy`). */
    subtitleProps?: HTMLAttributes<HTMLParagraphElement>;
    /** A snippet to be rendered on the left side (e.g., navigation icon). */
    leading?: Snippet;
    /** A snippet to be rendered on the right side (e.g., action icons). */
    trailing?: Snippet;
    /** Renders a back button in the leading section (ignored when `leading` is set). */
    showBack?: boolean;
    /** Called by the back button. Defaults to `history.back()`. */
    onback?: () => void;
    /**
     * The element whose scroll switches the bar to its on-scroll color. Defaults to the page
     * (`window`); pass a scrolling container, e.g. a `Pane`'s element, when content scrolls there.
     */
    scrollContainer?: HTMLElement | null;
    /** Renders an invisible same-height spacer after the fixed bar so page content isn't obscured. */
    ghost?: boolean;
    /** Additional classes passed onto the row element */
    rowClass?: string;
  };

/** A titled app bar: small, or the Expressive medium/large flexible bars. */
export type TitleAppBarProps = AppBarBaseProps & {
  /** The main title of the app bar. */
  title: string;
  /**
   * `small` (64dp, one line), `medium` or `large` (flexible, wrapping headline). Pass one per
   * breakpoint to adapt to the window, e.g. `{ small: 'small', large: 'large' }`; tiers you
   * leave out inherit from the one below, and below the first given tier the bar is `small`.
   */
  size?: Responsive<AppBarSize>;
  search?: never;
  query?: never;
  searchProps?: never;
  searchTrailing?: never;
};

/** A search app bar: a search field in place of the title, always 64dp. */
export type SearchAppBarProps = AppBarBaseProps & {
  /** Hint text in the search field. Setting it makes this a search app bar. */
  search: string;
  /** The search query. */
  query?: string;
  /** Screen title; rendered for assistive tech only. */
  title?: string;
  /** Props for the search `<input>`, e.g. `onfocus` to open a search view. */
  searchProps?: HTMLInputAttributes;
  /** An action inside the search field, e.g. a mic icon button. */
  searchTrailing?: Snippet;
  size?: never;
};

/**
 * Props for the AppBar component.
 */
export type AppBarProps = TitleAppBarProps | SearchAppBarProps;
