import type { Popover } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { PopoverVariants } from './theme.js';

export interface PopoverProps extends PopoverVariants {
  /**
   * Snippet rendered as the trigger element (typically a Button or ButtonIcon).
   * Receives the trigger's props — spread them onto the rendered element/component
   * so bits-ui doesn't wrap it in its own `<button>` (which would nest buttons).
   */
  trigger: Snippet<[Record<string, unknown>]>;
  /** The popover panel content. */
  children: Snippet;
  /** Optional heading displayed at the top of the panel. */
  title?: string;
  /** Show a close (×) button inside the panel. Defaults to true. */
  showClose?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Positioning side relative to the trigger. */
  side?: Popover.ContentProps['side'];
  /** Alignment along the side axis. */
  align?: Popover.ContentProps['align'];
  /** Gap between trigger and panel in px. */
  sideOffset?: number;
  class?: string;
}
