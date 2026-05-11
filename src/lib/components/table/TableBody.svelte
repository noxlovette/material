<!--
@component
Wraps the data rows of a Table.
-->
<script lang="ts">
  import type { TableBodyProps } from "./types.js";
  import { table } from "./theme.js";
  import clsx from "clsx";

  let { children, class: className, ...restProps }: TableBodyProps = $props();

  const { body } = table();
</script>

<tbody class={body({ class: clsx(className) })} {...restProps}>
  {@render children()}
</tbody>
