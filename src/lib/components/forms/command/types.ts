import type { Command } from "bits-ui";
import type { Snippet } from "svelte";
import type { CommandVariants } from "./theme.js";

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

export interface CommandItemProps extends Command.ItemProps {
  class?: string;
  children: Snippet;
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
