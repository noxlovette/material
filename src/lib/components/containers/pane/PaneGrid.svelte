<!--
@component
Arranges Pane children relative to one another: direction, gap, and outer
margin/padding, each independently responsive across viewport tiers
(small/medium/large/extraLarge). PaneGrid owns layout only — sizing, stickiness,
resizing, and breakpoint visibility are declared per-Pane.

With `full`, min-height is `100dvh` minus `--appbar-height` — see Pane.svelte's
doc comment for how that CSS custom property gets set.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { paneGrid, resolveResponsive, responsiveTables } from './theme.js';
  import type { PaneGridProps } from './types.js';

  const {
    children,
    direction = 'row',
    gap = 'md',
    padding = 'none',
    margin = 'none',
    full = false,
    rounded = false,
    wrap = false,
    class: className,
    ...rest
  }: PaneGridProps = $props();

  const { base } = $derived(paneGrid({ full, rounded, wrap }));

  const responsiveClass = $derived(
    clsx(
      resolveResponsive(direction, responsiveTables.direction),
      resolveResponsive(gap, responsiveTables.gap),
      resolveResponsive(padding, responsiveTables.padding),
      resolveResponsive(margin, responsiveTables.margin)
    )
  );
</script>

<div class={base({ class: clsx(responsiveClass, className) })} {...rest}>
  {@render children()}
</div>
