<!--
@component
HStack is a horizontal flex container.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { stack } from './theme.js';
  import type { StackProps } from './types.js';

  let {
    children,
    type = 'hstack',
    size = 'w',
    class: className,
    gap = 'md'
  }: StackProps = $props();

  const styling = $derived(stack({ type, size, gap }));
</script>

<div class={clsx(styling, className)}>
  {@render children()}
</div>
