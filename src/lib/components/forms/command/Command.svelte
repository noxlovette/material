<script lang="ts">
  import { Command } from 'bits-ui';
  import clsx from 'clsx';
  import { command } from './theme.js';
  import type { CommandProps } from './types.js';

  let { children, class: className, value = $bindable(), ...restProps }: CommandProps = $props();

  const { base } = command();
</script>

<Command.Root {...restProps} bind:value class={base({ class: clsx(className) })}>
  {@render children()}
</Command.Root>
