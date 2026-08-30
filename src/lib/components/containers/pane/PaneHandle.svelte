<!--
@component
A drag divider for a PaneGrid, placed as its own child between the `Pane` it
resizes and its neighbor. Unlike a handle absolutely-positioned inside a Pane
(clipped by that Pane's `overflow-clip`, cramped into its own border), this
sits in the grid's flex flow — a real sibling with room to breathe in the
gutter. Dragging it writes to the shared resize store; any `Pane` with a
matching `persistKey` picks the new width up reactively.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { paneHandle } from './theme.js';
  import { paneWidths } from './resizeStore.svelte.js';
  import type { PaneHandleProps } from './types.js';

  let {
    persistKey,
    min = 200,
    max = 640,
    snapPoints = [360, 412],
    snapThreshold = 16,
    class: className,
    ...rest
  }: PaneHandleProps = $props();

  let dragging = $state(false);
  let snapped = $state(false);

  const { base, grip } = $derived(paneHandle({ dragging, snapped }));

  const clampWidth = (next: number) => Math.min(max, Math.max(min, next));

  /** Nearest snap point within `snapThreshold` of `value`, if any. */
  const nearestSnap = (value: number): number | undefined => {
    let closest: number | undefined;
    let closestDist = snapThreshold;
    for (const point of snapPoints) {
      const dist = Math.abs(value - point);
      if (dist <= closestDist) {
        closest = point;
        closestDist = dist;
      }
    }
    return closest;
  };

  let dragStartX = 0;
  let dragStartWidth = 0;

  onMount(() => {
    paneWidths.hydrate(persistKey, min);
  });

  const startDrag = (event: PointerEvent) => {
    dragging = true;
    dragStartX = event.clientX;
    dragStartWidth = paneWidths.get(persistKey) ?? min;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent) => {
    if (!dragging) return;
    const raw = clampWidth(dragStartWidth + (event.clientX - dragStartX));
    const snap = nearestSnap(raw);
    snapped = snap !== undefined;
    paneWidths.set(persistKey, snap ?? raw);
  };

  const endDrag = () => {
    dragging = false;
    snapped = false;
  };
</script>

<div
  class={base({ class: clsx(className) })}
  role="separator"
  aria-orientation="vertical"
  aria-valuenow={paneWidths.get(persistKey)}
  aria-valuemin={min}
  aria-valuemax={max}
  onpointerdown={startDrag}
  onpointermove={moveDrag}
  onpointerup={endDrag}
  onpointercancel={endDrag}
  {...rest}
>
  <div class={grip()}></div>
</div>
