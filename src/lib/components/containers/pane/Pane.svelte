<!--
@component
A single content region. Used standalone as a page-level wrapper (centered column,
padding/gap, optional background), or as a child of PaneGrid to become one region
of a multi-pane layout — a sidebar, a detail column, a supporting panel — via
`width`/`resizable`/`sticky`/`visibleFrom`/`hiddenFrom`. A `resizable` pane doesn't
own a drag handle itself — place a `PaneHandle` with a matching `persistKey`
alongside it in the PaneGrid; this pane just mirrors the width it drags to.

With `full` (the default), the pane's min-height is `100dvh` minus
`--appbar-height`, a CSS custom property `AppBar` publishes on the document root
while mounted (0px otherwise) — automatic, no props needed here. A hand-rolled
fixed top bar instead of `AppBar` won't set it, so set `--appbar-height: <px>` on
the document root yourself to get the same behavior.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { pane, responsiveTables } from './theme.js';
  import { paneWidths } from './resizeStore.svelte.js';
  import type { PaneProps } from './types.js';

  let {
    children,
    background = true,
    full = true,
    padding = 'md',
    gap = 'md',
    rounded = true,
    width = $bindable(undefined),
    resizable = false,
    persistKey,
    sticky = false,
    stickyTop = 0,
    visibleFrom,
    hiddenFrom,
    class: className,
    contentClass,
    ...rest
  }: PaneProps = $props();

  const flexible = $derived(width === undefined);

  const { base, content } = $derived(
    pane({ padding, gap, full, background, rounded, flexible, sticky })
  );

  const visibilityClass = $derived(
    clsx(
      visibleFrom && responsiveTables.visibleFrom[visibleFrom],
      hiddenFrom && responsiveTables.hiddenFrom[hiddenFrom]
    )
  );

  const style = $derived(
    clsx(
      !flexible && `width: ${width}px; flex-basis: ${width}px;`,
      sticky && `--pane-sticky-top: ${stickyTop}px;`
    )
  );

  onMount(() => {
    if (!resizable || !persistKey) return;
    width = paneWidths.hydrate(persistKey, width ?? 200);
  });

  $effect(() => {
    if (!resizable || !persistKey) return;
    const stored = paneWidths.get(persistKey);
    if (stored !== undefined) width = stored;
  });
</script>

<div class={base({ class: clsx(className, visibilityClass) })} {style} {...rest}>
  <div class={content({ class: clsx(contentClass) })}>
    {@render children()}
  </div>
</div>
