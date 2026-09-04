<!--
@component
Wraps the data rows of a Table. Rows are keyboard-navigable by default: Tab/Shift+Tab
stop on the table once (roving tabindex), and ArrowUp/ArrowDown or k/j move focus
between rows. Set `navigable={false}` to opt a purely presentational table out.
-->
<script lang="ts">
  import type { TableBodyProps } from './types.js';
  import { table } from './theme.js';
  import { rovingFocusGroup } from '$lib/actions/index.js';
  import clsx from 'clsx';

  let {
    children,
    navigable = true,
    loop = false,
    class: className,
    ...restProps
  }: TableBodyProps = $props();

  const { body } = table();
</script>

<tbody
  class={body({ class: clsx(className) })}
  use:rovingFocusGroup={{ candidateSelector: '[data-table-row]', loop, enabled: navigable }}
  {...restProps}
>
  {@render children()}
</tbody>
