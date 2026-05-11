<!--
@component
Headlines are best-suited for short, high-emphasis text on smaller screens.
Follows Material 3 Headline typography styles.

@see https://m3.material.io/styles/typography/overview#073998f4-6e19-4847-987a-397f3729e16d
-->
<script lang="ts">
  import clsx from "clsx";

  import { headline } from "./theme.js";
  import type { HeadlineProps } from "./types.js";

  let {
    children,
    size = "medium",
    emphasized,
    class: className,
    ...restProps
  }: HeadlineProps = $props();

  let headlineCls = $derived(
    headline({ class: clsx(className), emphasized, size }),
  );
</script>

<h2 {...restProps} class={headlineCls}>
  {@render children()}
</h2>
