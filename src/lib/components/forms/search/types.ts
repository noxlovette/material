import type { IconProps, Shortcut } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { Responsive } from '../../containers/pane/theme.js';

/**
 * Where the search view puts its suggestions and results
 * (https://m3.material.io/components/search/guidelines).
 * - `fullScreen`: the view covers the window; for compact windows.
 * - `docked`: the bar widens in place and results open in a container below it.
 */
export type SearchLayout = 'fullScreen' | 'docked';

/**
 * Handed to the `results` snippet. Spread it onto the `List` that holds the suggestions, and give
 * each item `role="option"`, so the field can drive it as a combobox.
 *
 * ```svelte
 * {#snippet results(listbox)}
 *   <List {...listbox}>
 *     <ListItem role="option" asChild headline="Material" onclick={pick} />
 *   </List>
 * {/snippet}
 * ```
 */
export interface SearchResultsProps {
  id: string;
  role: 'listbox';
  'aria-label': string;
}

/** Props shared by the search view and the components that open it. */
export interface SearchViewOptions {
  /**
   * Suggestions and results, shown in the search view. Setting it gives the bar a search view,
   * opened by clicking or typing in the bar.
   */
  results?: Snippet<[SearchResultsProps]>;

  /**
   * The search view's layout, one value or one per window tier.
   * @default { small: 'fullScreen', medium: 'docked' }
   */
  layout?: Responsive<SearchLayout>;

  /** Accessible label for the back button that closes the search view. */
  backLabel?: string;

  /** Accessible name of the search view and its suggestion list. Defaults to the placeholder. */
  resultsLabel?: string;

  /**
   * Called with the query when it's submitted: Enter in the bar, or Enter in the search view
   * with no suggestion highlighted. Not called for an empty query. The view stays open; set
   * `open` to false to close it, e.g. when navigating to a results page.
   */
  onsearch?: (query: string) => void;
}

/**
 * Props for the SearchView component.
 */
export interface SearchViewProps extends Omit<SearchViewOptions, 'results'> {
  /** Whether the view is open. Opening and closing morph between `anchor` and the view. */
  open?: boolean;

  /** The search query, shared with the bar that opened the view. */
  value?: string | null;

  /**
   * The search bar the view opens from: the container transform starts there, the docked layout
   * is placed over it, and focus returns to its input on close.
   */
  anchor: HTMLElement | undefined;

  /** Suggestions and results. */
  results: Snippet<[SearchResultsProps]>;

  /** Hint text in the view's field. */
  placeholder?: string;

  /** Actions after the clear button in the view's bar, e.g. a mic icon button. */
  trailing?: Snippet;

  /** Accessible label for the clear button. */
  clearLabel?: string;

  /** Extra props for the view's `<input>`. */
  inputProps?: HTMLInputAttributes;

  /** Reference to the view's `<input>` while it is open. */
  inputRef?: HTMLInputElement;
}

/**
 * Props for the Search component.
 */
export interface SearchProps
  extends Omit<HTMLInputAttributes, 'size' | 'results'>, SearchViewOptions {
  /**
   * The current value of the search input.
   */
  value?: string | null;

  /**
   * Reference to the HTML input element.
   */
  elementRef?: HTMLInputElement;

  /**
   * Whether the search view is open. Only has an effect with `results`.
   */
  open?: boolean;

  /**
   * A leading action, e.g. a menu or back icon button. Replaces the leading icon.
   */
  leading?: Snippet;

  /**
   * Trailing actions and/or an avatar, e.g. a mic icon button. Rendered after the clear button,
   * in the bar and in the search view.
   */
  trailing?: Snippet;

  /**
   * Called by the clear button. Defaults to clearing the value and refocusing the input.
   */
  trailingClick?: () => void;

  /**
   * Props for the leading icon (a search icon by default); `null` removes it.
   */
  leadingIconProps?: IconProps | null;

  /**
   * Props for the clear button's icon, shown while there is a value; `null` removes the button.
   */
  trailingIconProps?: IconProps | null;

  /**
   * Accessible label for the clear button.
   */
  clearLabel?: string;

  /**
   * Page-wide key that focuses the bar, or opens its search view when it has `results`. A key
   * without ⌘/Ctrl/Alt doesn't fire while typing in a field. With several bars on a page, the
   * first one mounted takes it. `null` turns it off.
   * @default '/'
   */
  shortcut?: Shortcut | null;
}
