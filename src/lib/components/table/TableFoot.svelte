<!--
@component
Wraps the footer rows of a Table, separated from the body by a top border.
-->
<script lang="ts">
  import clsx from 'clsx';

  import { table } from './theme.js';
  import type { TableFootProps } from './types.js';

  let { children, class: className, ...restProps }: TableFootProps = $props();

  const { foot } = table();
</script>

<tfoot class={foot({ class: clsx(className) })} {...restProps}>
  {@render children()}
</tfoot>
