import type { Snippet } from 'svelte';
import type {
  HTMLAttributes,
  HTMLTableAttributes,
  HTMLTdAttributes,
  HTMLThAttributes
} from 'svelte/elements';
import type { TableVariants } from './theme.js';

export type TableProps = HTMLTableAttributes & {
  children: Snippet;
  /** Render with rounded corners and a ring border. */
  rounded?: boolean;
};

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement> & {
  children: Snippet;
  /** Stick the header to the top of a scrollable container. */
  sticky?: boolean;
};

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
  children: Snippet;
  /**
   * Make rows keyboard-navigable: roving tabindex so Tab/Shift+Tab stop on the table
   * once, and ArrowUp/ArrowDown (or k/j) move focus between rows. Default `true`.
   */
  navigable?: boolean;
  /** Loop focus from the last row back to the first (and vice versa). Default `false`. */
  loop?: boolean;
};

export type TableFootProps = HTMLAttributes<HTMLTableSectionElement> & {
  children: Snippet;
};

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  children: Snippet;
  /** Highlight the row with the secondary-container color. */
  selected?: boolean;
  /** Show a hover background on the row. */
  hoverable?: boolean;
};

export type TableCellProps = HTMLTdAttributes & {
  children?: Snippet;
  /** Right-align with tabular numerals. */
  numeric?: boolean;
  align?: TableVariants['align'];
};

export type TableHeaderProps = HTMLThAttributes & {
  children?: Snippet;
  /** Right-align with tabular numerals. */
  numeric?: boolean;
  align?: TableVariants['align'];
  /** Show a sort indicator icon. */
  sortable?: boolean;
  /** Whether this column is the active sort column. */
  sorted?: boolean;
  /** Sort direction indicator shown when `sorted` is true. */
  sortDirection?: 'asc' | 'desc';
};
