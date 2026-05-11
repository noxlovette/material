<script lang="ts">
  import { Command } from 'bits-ui';
  import clsx from 'clsx';
  import { command } from './theme.js';
  import type { CommandListProps } from './types.js';

  let { children, class: className, ...restProps }: CommandListProps = $props();

  const { list } = command();
</script>

<Command.List {...restProps} class={list({ class: clsx(className) })}>
  {@render children()}
</Command.List>
