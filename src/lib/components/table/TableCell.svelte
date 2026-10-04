<!--
@component
A data cell (`<td>`). Use `numeric` for right-aligned tabular numbers,
or `align` for explicit alignment control.
-->
<script lang="ts">
  import clsx from 'clsx';

  import { table } from './theme.js';
  import type { TableCellProps } from './types.js';

  let {
    children,
    numeric = false,
    align,
    class: className,
    ...restProps
  }: TableCellProps = $props();

  const { cell } = $derived(table({ numeric, align }));
</script>

<td class={cell({ class: clsx(className) })} {...restProps}>
  {@render children?.()}
</td>
