import type { IconProps } from "$lib/utils/index.js";
import type { TabVariants } from "./theme.js";

export type TabProps = {
  /** Props for the Icon component. Omit for secondary tabs. */
  iconProps?: IconProps;
  /** Text label for the tab. */
  name: string;
  /**
   * Unique value identifier — required for content-panel tabs (no href).
   * Omit for navigation tabs that use href for routing.
   */
  value?: string;
  /** Optional href for navigation tabs. Renders an <a> instead of <button>. */
  href?: string;
  /** Whether the tab is disabled. */
  disabled?: boolean;
  /** Tab style variant inherited from the parent TabHolder. */
  variant?: TabVariants["variant"];
  /** Additional CSS classes. */
  class?: string;
};

export type TabHolderProps = {
  /** The currently active tab value. Bindable. */
  value?: string;
  /** Callback when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Whether tabs activate on focus (automatic) or require Enter/Space (manual). */
  activationMode?: "automatic" | "manual";
  /** Primary tabs show icon + label; secondary tabs show label only. */
  variant?: TabVariants["variant"];
  /** Tab items to render. */
  items: TabProps[];
};

export type TabContentProps = {
  /** Must match the value of the corresponding Tab. */
  value: string;
  /** Additional CSS classes. */
  class?: string;
};
