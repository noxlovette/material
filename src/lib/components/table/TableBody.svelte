<!--
@component
Wraps the data rows of a Table.
-->
<script lang="ts">
  import clsx from 'clsx';

  import { table } from './theme.js';
  import type { TableBodyProps } from './types.js';

  let { children, class: className, ...restProps }: TableBodyProps = $props();

  const { body } = table();
</script>

<tbody class={body({ class: clsx(className) })} {...restProps}>
  {@render children()}
</tbody>
