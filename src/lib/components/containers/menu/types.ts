import type { IconProps } from '$lib/utils/icon/types.js';
import type { Snippet } from 'svelte';

/**
 * Props for the Menu component.
 *
 * Menu is the **shell** — it wires up open/close state and positions the
 * floating panel. It has no opinion about what goes inside; compose it with
 * `MenuItem` (and `Divider`, headings, etc.) as children.
 *
 * Contrast with `MenuItem`, which is an individual interactive row, and
 * `ContextMenu`, which is a right-click variant that stays data-driven
 * because its items are always contextual and uniform.
 */
export type MenuProps = {
  /**
   * Content rendered inside the floating panel.
   * Typically a list of `MenuItem` components, but any element is valid.
   */
  children: Snippet;
  /**
   * Custom trigger element. When omitted, a default filled `Button` labelled
   * by `label` is used. Receives the trigger's props — spread them onto the
   * rendered element/component so bits-ui doesn't wrap it in its own
   * `<button>` (which would nest buttons).
   */
  trigger?: Snippet<[Record<string, unknown>]>;
  /**
   * Label for the default button trigger. Ignored when `trigger` is provided.
   * @default 'Open menu'
   */
  label?: string;
  /**
   * Alignment of the floating panel relative to the trigger.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Controlled open state. Bind to this to drive the menu externally.
   */
  open?: boolean;
  /** Additional CSS classes applied to the floating content panel. */
  class?: string;
};

/**
 * Props for `MenuGroup`, which wraps related `MenuItem`s (or
 * `MenuCheckboxItem`/`MenuRadioItem`s) under an optional heading so screen
 * readers announce them as a labelled set.
 */
export type MenuGroupProps = {
  /** Optional label rendered above the group's items. */
  heading?: string;
  /** Items inside the group. */
  children: Snippet;
  /** Additional CSS classes applied to the group container. */
  class?: string;
};

/**
 * Props for `MenuRadioGroup`, which restricts its `MenuRadioItem` children
 * to a single selected value at a time.
 */
export type MenuRadioGroupProps = {
  /**
   * The value of the currently selected radio item.
   * Supports two-way binding with `bind:value`.
   */
  value?: string;
  /** Called when the selected value changes. */
  onValueChange?: (value: string) => void;
  /** `MenuRadioItem`s inside the group. */
  children: Snippet;
  /** Additional CSS classes applied to the group container. */
  class?: string;
};

/**
 * Props for a single option inside a `MenuRadioGroup`.
 */
export type MenuRadioItemProps = {
  /** The value this item represents within its `MenuRadioGroup`. */
  value: string;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
  /** Optional supporting text shown below the label. */
  helper?: string;
  /** The item's label. */
  children: Snippet;
  /**
   * Whether the menu closes when this item is selected.
   * @default true
   */
  closeOnSelect?: boolean;
  /** Additional CSS classes applied to the item row. */
  class?: string;
};

/**
 * Props for a toggleable option inside a `Menu`, independent of any other
 * item (unlike `MenuRadioItem`, any number of `MenuCheckboxItem`s can be
 * checked at once).
 */
export type MenuCheckboxItemProps = {
  /**
   * The checked state. Supports two-way binding with `bind:checked`.
   * @default false
   */
  checked?: boolean;
  /** Called when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
  /** Optional supporting text shown below the label. */
  helper?: string;
  /** The item's label. */
  children: Snippet;
  /**
   * Whether the menu closes when this item is selected.
   * @default true
   */
  closeOnSelect?: boolean;
  /** Additional CSS classes applied to the item row. */
  class?: string;
};

/**
 * Props for `MenuSub`, a `MenuItem`-like row that opens a nested submenu
 * panel on hover/click instead of firing a selection.
 */
export type MenuSubProps = {
  /** Props for the trigger row's leading icon. */
  iconProps?: IconProps;
  /**
   * Whether the submenu trigger is disabled.
   * @default false
   */
  disabled?: boolean;
  /** Optional supporting text shown below the trigger's label. */
  helper?: string;
  /** The trigger row's label. */
  children: Snippet;
  /** Items rendered inside the nested submenu panel. */
  submenu: Snippet;
  /** Controlled open state for the submenu. */
  open?: boolean;
  /** Additional CSS classes applied to the trigger row. */
  class?: string;
  /** Additional CSS classes applied to the submenu's floating panel. */
  submenuClass?: string;
};
