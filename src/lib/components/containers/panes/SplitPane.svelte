<!--
@component
SplitPane provides a resizable two-column layout.
-->
<script lang="ts">
  import type { SplitPaneProps } from './types.js';
  import { splitPane } from './theme.js';
  import { onDestroy, onMount } from 'svelte';
  import clsx from 'clsx';

  let dragging = $state(false);

  let {
    left,
    right,
    leftWidth = $bindable(396),
    full = true,
    rounded = true,
    minLeft = 280,
    maxLeft = 720,
    storageKey = 'splitpane:leftWidth',
    persist = true,
    onPaddingChange,
    anchor = 'viewport',
    class: className,
    leftClass,
    rightClass
  }: SplitPaneProps = $props();

  const {
    base,
    left: lCls,
    right: rCls,
    handle: hCls,
    handleGrip
  } = $derived(splitPane({ full, anchor, rounded }));

  const leftOffset = $derived(anchor === 'viewport' ? 'var(--splitpane-offset, 0px)' : '0px');
  const handleOffset = $derived(
    anchor === 'viewport'
      ? 'calc(var(--splitpane-left-width) + var(--splitpane-offset, 0px))'
      : 'var(--splitpane-left-width)'
  );

  const clampWidth = (next: number) => Math.min(maxLeft, Math.max(minLeft, next));

  const footerPaddingOffset = 80;

  let dragStartX = 0;
  let dragStartWidth = 0;
  let mounted = false;

  const startDrag = (event: PointerEvent) => {
    dragging = true;
    dragStartX = event.clientX;
    dragStartWidth = leftWidth;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent) => {
    if (!dragging) return;
    const delta = event.clientX - dragStartX;
    leftWidth = clampWidth(dragStartWidth + delta);
  };

  const endDrag = () => {
    dragging = false;
  };

  onMount(() => {
    mounted = true;

    if (persist && typeof localStorage !== 'undefined') {
      const stored = Number(localStorage.getItem(storageKey));
      if (!Number.isNaN(stored)) {
        leftWidth = clampWidth(stored);
      }
    }

    onPaddingChange?.(leftWidth + footerPaddingOffset);
  });

  onDestroy(() => {
    onPaddingChange?.(0);
  });

  $effect(() => {
    if (!mounted) return;
    onPaddingChange?.(leftWidth + footerPaddingOffset);
  });

  $effect(() => {
    if (!persist || typeof localStorage === 'undefined') return;
    localStorage.setItem(storageKey, String(leftWidth));
  });
</script>

<div class={base({ class: clsx(className) })} style={`--splitpane-left-width: ${leftWidth}px;`}>
  <!-- LEFT PANE -->
  <div
    class={lCls({ class: leftClass })}
    style={`width: var(--splitpane-left-width); left: ${leftOffset};`}
  >
    {@render left()}
  </div>

  <!-- DRAG HANDLE -->
  <div
    class={hCls()}
    role="separator"
    aria-orientation="vertical"
    aria-valuenow={leftWidth}
    aria-valuemin={minLeft}
    aria-valuemax={maxLeft}
    style={`left: ${handleOffset};`}
    onpointerdown={startDrag}
    onpointermove={moveDrag}
    onpointerup={endDrag}
    onpointercancel={endDrag}
  >
    <div
      class={handleGrip({
        class: clsx(dragging && 'w-0.5')
      })}
    ></div>
  </div>

  <!-- RIGHT PANE -->
  <div class={rCls({ class: rightClass })}>
    {@render right()}
  </div>
</div>
