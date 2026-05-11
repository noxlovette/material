<!--
@component
Wraps the header rows of a Table. Use `sticky` to pin the header when the
table is inside a scrollable container.
-->
<script lang="ts">
  import type { TableHeadProps } from "./types.js";
  import { table } from "./theme.js";
  import clsx from "clsx";

  let {
    children,
    sticky = false,
    class: className,
    ...restProps
  }: TableHeadProps = $props();

  const { head } = $derived(table({ sticky }));
</script>

<thead class={head({ class: clsx(className) })} {...restProps}>
  {@render children()}
</thead>
