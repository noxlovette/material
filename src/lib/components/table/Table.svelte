<!--
@component
Primitive root element for building MD3-styled data tables.
Compose with TableHead, TableBody, TableFoot, TableRow, TableCell, and TableHeader.
-->
<script lang="ts">
  import type { TableProps } from './types.js';
  import { table } from './theme.js';
  import clsx from 'clsx';

  let { children, rounded = false, class: className, ...restProps }: TableProps = $props();

  const { root } = table();
</script>

{#if rounded}
  <div class="ring-md-sys-color-outline-variant overflow-hidden rounded-xl ring-1">
    <table class={root({ class: clsx(className) })} {...restProps}>
      {@render children()}
    </table>
  </div>
{:else}
  <table class={root({ class: clsx(className) })} {...restProps}>
    {@render children()}
  </table>
{/if}
