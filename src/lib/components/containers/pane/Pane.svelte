<!--
@component
A single content region. Used standalone as a page-level wrapper (centered column,
padding/gap, optional background), or as a child of PaneGrid to become one region
of a multi-pane layout — a sidebar, a detail column, a supporting panel — via
`width`/`resizable`/`sticky`/`visibleFrom`/`hiddenFrom`.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { pane, resolveResponsive, responsiveTables } from './theme.js';
  import type { PaneProps } from './types.js';

  let dragging = $state(false);

  let {
    children,
    centered = 'none',
    background = true,
    full = true,
    padding = 'md',
    gap = 'md',
    rounded = true,
    width = $bindable(undefined),
    min = 200,
    max = 640,
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

  const { base, content, handle, handleGrip } = $derived(
    pane({ padding, gap, centered, full, background, rounded, flexible, sticky, dragging })
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

  const clampWidth = (next: number) => Math.min(max, Math.max(min, next));

  let dragStartX = 0;
  let dragStartWidth = 0;

  const startDrag = (event: PointerEvent) => {
    dragging = true;
    dragStartX = event.clientX;
    dragStartWidth = width ?? min;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent) => {
    if (!dragging) return;
    width = clampWidth(dragStartWidth + (event.clientX - dragStartX));
  };

  const endDrag = () => {
    dragging = false;
  };

  onMount(() => {
    if (!resizable || !persistKey || typeof localStorage === 'undefined') return;
    const stored = Number(localStorage.getItem(persistKey));
    if (!Number.isNaN(stored) && stored > 0) {
      width = clampWidth(stored);
    }
  });

  $effect(() => {
    if (!resizable || !persistKey || width === undefined || typeof localStorage === 'undefined')
      return;
    localStorage.setItem(persistKey, String(width));
  });
</script>

<div class={base({ class: clsx(className, visibilityClass) })} {style} {...rest}>
  <div class={content({ class: clsx(contentClass) })}>
    {@render children()}
  </div>

  {#if resizable}
    <div
      class={handle()}
      role="separator"
      aria-orientation="vertical"
      aria-valuenow={width}
      aria-valuemin={min}
      aria-valuemax={max}
      onpointerdown={startDrag}
      onpointermove={moveDrag}
      onpointerup={endDrag}
      onpointercancel={endDrag}
    >
      <div class={handleGrip()}></div>
    </div>
  {/if}
</div>
