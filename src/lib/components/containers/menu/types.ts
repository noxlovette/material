import type { Snippet } from "svelte";

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
   * by `label` is used.
   */
  trigger?: Snippet;
  /**
   * Label for the default button trigger. Ignored when `trigger` is provided.
   * @default 'Open menu'
   */
  label?: string;
  /**
   * Alignment of the floating panel relative to the trigger.
   * @default 'start'
   */
  align?: "start" | "center" | "end";
  /**
   * Controlled open state. Bind to this to drive the menu externally.
   */
  open?: boolean;
  /** Additional CSS classes applied to the floating content panel. */
  class?: string;
};
