import type { Shortcut } from '$lib/utils/index.js';
import type { Command } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { CommandVariants } from './theme.js';

export interface CommandProps extends Command.RootProps, CommandVariants {
  class?: string;
  children: Snippet;
}

export interface CommandInputProps extends Command.InputProps {
  class?: string;
  showIcon?: boolean;
}

export interface CommandListProps extends Command.ListProps {
  class?: string;
  children: Snippet;
}

export interface CommandItemProps extends Omit<Command.ItemProps, 'child' | 'children'> {
  class?: string;
  /** The headline. */
  children: Snippet;
  /** A leading icon, e.g. `<Icon name="settings" />`. */
  leading?: Snippet;
  /** A second line under the headline. */
  supporting?: string;
  /** Trailing label, e.g. a count. `shortcut` replaces it. */
  trailingText?: string;
  /**
   * A keyboard shortcut to show at the end, written like `'Mod+,'` and labelled for the platform
   * (`⌘,` on a Mac, `Ctrl+,` elsewhere). Only shown: bind the key yourself.
   */
  shortcut?: Shortcut;
}

export interface CommandGroupProps extends Command.GroupProps {
  class?: string;
  children: Snippet;
  heading?: string;
}

export interface CommandEmptyProps extends Command.EmptyProps {
  class?: string;
  children: Snippet;
}

export interface CommandSeparatorProps extends Command.SeparatorProps {
  class?: string;
}

export interface CommandDialogProps extends CommandProps {
  /** Whether the palette is open. */
  open?: boolean;

  /**
   * Page-wide keys that open and close the palette. `Mod` is ⌘ on Apple platforms, Ctrl
   * elsewhere. Fires inside text fields too, but not while another modal dialog is open. `null`
   * turns it off.
   * @default 'Mod+K'
   */
  shortcut?: Shortcut | null;

  /** Accessible name of the dialog. */
  label?: string;
}
