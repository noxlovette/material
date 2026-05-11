<!--
@component
Wraps the footer rows of a Table, separated from the body by a top border.
-->
<script lang="ts">
  import type { TableFootProps } from "./types.js";
  import { table } from "./theme.js";
  import clsx from "clsx";

  let { children, class: className, ...restProps }: TableFootProps = $props();

  const { foot } = table();
</script>

<tfoot class={foot({ class: clsx(className) })} {...restProps}>
  {@render children()}
</tfoot>
