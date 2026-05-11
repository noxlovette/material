<!--
@component
A table row. Use `selected` to highlight with secondary-container color,
and `hoverable` to show a hover background (e.g. for clickable rows).
-->
<script lang="ts">
  import type { TableRowProps } from './types.js';
  import { table } from './theme.js';
  import clsx from 'clsx';

  let {
    children,
    selected = false,
    hoverable = false,
    class: className,
    ...restProps
  }: TableRowProps = $props();

  const { row } = $derived(table({ selected, hoverable }));
</script>

<tr class={row({ class: clsx(className) })} {...restProps}>
  {@render children()}
</tr>
