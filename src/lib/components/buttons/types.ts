import type { AnchorButtonAttributes, IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { Responsive } from '../containers/pane/theme.js';
import type { ButtonSize, FABColor } from './theme.js';

export type HTMLButtonOrAnchorAttributes = HTMLButtonAttributes & HTMLAnchorAttributes;

export type ButtonProps = AnchorButtonAttributes & {
  /**
   * Colour style, from most to least emphasis:
   * - `filled`: final or unblocking actions, such as Save or Confirm.
   * - `tonal`: important actions that sit a step below filled.
   * - `elevated`: only when the button must stand apart from a patterned background.
   * - `outlined`: actions that need attention but aren't primary, and ways out of a flow.
   * - `text`: optional actions, such as Learn more.
   * @default 'filled'
   */
  variant?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
  /**
   * Height 32, 40, 56, 96 or 136dp. XS and S keep a 48dp target area.
   * @default 'sm'
   */
  size?: ButtonSize;
  /**
   * Resting corner shape. Both morph to the same smaller radius while pressed.
   * @default 'round'
   */
  shape?: 'round' | 'square';
  /** The label. */
  children?: Snippet;
  /** A leading icon, sized for the button. */
  iconProps?: IconProps;
  /** Renders an `<a>` instead of a `<button>`. */
  href?: string;
  /** The `formaction` attribute, for a submit button. */
  formaction?: string;
  /** Disables the button. On a link, removes it from the tab order and sets `aria-disabled`. */
  disabled?: boolean;
  /** Replaces the icon (or the label, with no icon) with a loading indicator. */
  loading?: boolean;
};

/** @deprecated Use `ButtonProps`. */
export type ButtonMDProps = ButtonProps;

export type ToggleProps = HTMLButtonAttributes & {
  /**
   * Colour style. Unselected and selected colours differ per style; there is no text toggle.
   * @default 'filled'
   */
  variant?: 'elevated' | 'filled' | 'tonal' | 'outlined';
  /** @default 'sm' */
  size?: ButtonSize;
  /**
   * Resting shape while unselected. Selecting swaps it: round becomes square, square becomes
   * round.
   * @default 'round'
   */
  shape?: 'round' | 'square';
  /** Whether the toggle is selected. Bindable. */
  pressed?: boolean;
  /** Called when the selected state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** The label. */
  children?: Snippet;
  /** A leading icon, sized for the button. */
  iconProps?: IconProps;
  /** Disables the toggle. */
  disabled?: boolean;
  /** Replaces the icon (or the label, with no icon) with a loading indicator. */
  loading?: boolean;
};

/** @deprecated Use `ToggleProps`. */
export type ToggleMDProps = ToggleProps;

export type ButtonIconProps = AnchorButtonAttributes & {
  /**
   * Colour style. `standard` has no container until hovered, focused or pressed; use it for
   * icon buttons in app bars, fields and other dense places.
   * @default 'filled'
   */
  variant?: 'filled' | 'tonal' | 'outlined' | 'standard';
  /**
   * Height 32, 40, 56, 96 or 136dp. XS and S keep a 48dp target area.
   * @default 'sm'
   */
  size?: ButtonSize;
  /**
   * Container width around the icon. Use `narrow` and `wide` to fit a layout, for example in a
   * button group.
   * @default 'default'
   */
  width?: 'narrow' | 'default' | 'wide';
  /**
   * Resting corner shape. A selected toggle swaps it.
   * @default 'round'
   */
  shape?: 'round' | 'square';
  /**
   * `toggle` makes a two-state icon button with `aria-pressed`. Its icon fills while selected.
   * @default 'default'
   */
  variation?: 'default' | 'toggle';
  /** Toggle only: whether it is selected. Bindable. */
  pressed?: boolean;
  /** Toggle only: called when the selected state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** The icon. */
  iconProps: IconProps;
  /**
   * Tooltip text, shown on hover and focus. Also the accessible name when no `aria-label` is
   * given, so an icon button should have one or the other.
   */
  tooltipContent?: string;
  /** Classes for the tooltip trigger. */
  triggerClass?: string;
  /** Tooltip side. @default 'top' */
  triggerSide?: 'top' | 'right' | 'bottom' | 'left';
  /** Tooltip alignment. @default 'center' */
  triggerAlign?: 'start' | 'center' | 'end';
  /** Renders an `<a>` instead of a `<button>` (not for toggles). */
  href?: string;
  /** The `formaction` attribute, for a submit button. */
  formaction?: string;
  /** Disables the button. */
  disabled?: boolean;
  /** Replaces the icon with a loading indicator. */
  loading?: boolean;
};

export type FABProps = AnchorButtonAttributes & {
  /**
   * Container and icon colours. `primary-container` is the default; `primary`, `secondary` and
   * `tertiary` are the stronger Expressive styles. With `withMenu`, the colour family also picks
   * the menu's colour set.
   * @default 'primary-container'
   */
  color?: FABColor;
  /**
   * 56dp `regular`, 80dp `medium` or 96dp `large`. `small` (40dp) is the baseline small FAB,
   * which M3 no longer recommends; it has no extended form.
   * @default 'regular'
   */
  size?: 'small' | 'regular' | 'medium' | 'large';
  /**
   * Shows `label` beside the icon: the extended FAB. The two transform into each other with the
   * space available, so this is responsive; the label slides open and closed. Inside a `Rail` it
   * follows the rail: a FAB while collapsed, an extended FAB while expanded. Pass `false` to keep
   * a FAB, or toggle it yourself, for example to collapse while the page scrolls.
   * @default { small: false, medium: true } (outside a rail)
   */
  expanded?: Responsive<boolean>;
  /** The extended FAB's label. Also names the collapsed FAB for assistive technology. */
  label?: string;
  /** Opens a FAB menu of `FABMenuItem` children. The FAB turns into its close button. */
  withMenu?: boolean;
  /** The icon. */
  iconProps: IconProps;
  /** Replaces the icon with a loading indicator. */
  loading?: boolean;
  /** Renders an `<a>` instead of a `<button>` (not with `withMenu`). */
  href?: string;
  /** The `formaction` attribute, for a submit button. */
  formaction?: string;
  /** Disables the FAB. */
  disabled?: boolean;
  /** With `withMenu`: up to six `FABMenuItem`s. */
  children?: Snippet;
  /**
   * A surface the FAB opens into with a container transform: the FAB's container grows into it
   * from the FAB's corner, and shrinks back on Escape, an outside click, or `close()`. Keep the
   * FAB's icon in it (for example on its main row) so the icon persists through the transform.
   * Not with `withMenu` or `href`.
   */
  surface?: Snippet<[{ close: () => void }]>;
  /** Whether the `surface` is open. Bindable. */
  surfaceOpen?: boolean;
};

export type FABMenuProps = HTMLAttributes<HTMLDivElement> & {
  /** The menu items. Use `FABMenuItem` components. */
  children: Snippet;
};

export type FABMenuItemProps = AnchorButtonAttributes & {
  /** Disables the item; keyboard navigation skips it. */
  disabled?: boolean;
  /** Replaces the icon with a loading indicator. */
  loading?: boolean;
  /** The label. */
  children: Snippet;
  /** The leading icon. */
  iconProps: IconProps;
  /** Renders an `<a>` instead of a `<button>`. */
  href?: string;
  /** The `formaction` attribute, for a submit button. */
  formaction?: string;
};
