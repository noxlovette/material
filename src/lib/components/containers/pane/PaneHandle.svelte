<!--
@component
A drag divider for a PaneGrid, placed as its own child between the `Pane` it
resizes and its neighbor. Unlike a handle absolutely-positioned inside a Pane
(clipped by that Pane's `overflow-clip`, cramped into its own border), this
sits in the grid's flex flow — a real sibling with room to breathe in the
gutter. Dragging it writes to the shared resize store; any `Pane` with a
matching `persistKey` picks the new width up reactively.

Motion matches Slider: the pane tracks the pointer 1:1 while dragged, and springs on the fast
spatial spring into and out of snap points and on keyboard steps (arrows ±16px, Shift ±64px,
Home/End to `min`/`max`).
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { springTokens } from '$lib/animation/spring.js';
  import { SpringValue } from '$lib/animation/springValue.svelte.js';
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

  /* Grip size in px, sprung: 4×32 at rest, 2×32 while dragged, 6×40 on a snap point. */
  const gripWidth = new SpringValue(
    () => (snapped ? 6 : dragging ? 2 : 4),
    springTokens.fastSpatial
  );
  const gripHeight = new SpringValue(() => (snapped ? 40 : 32), springTokens.fastSpatial);

  const KEY_STEP = 16;
  const KEY_STEP_LARGE = 64;

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
    /* Entering or leaving a snap point springs; everywhere else the pane tracks the pointer. */
    const snapChanged = (snap !== undefined) !== snapped;
    snapped = snap !== undefined;
    paneWidths.set(persistKey, snap ?? raw, { spring: snapChanged });
  };

  const endDrag = () => {
    dragging = false;
    snapped = false;
  };

  const onKeydown = (event: KeyboardEvent) => {
    const current = paneWidths.get(persistKey) ?? min;
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
    let next: number;
    switch (event.key) {
      case 'ArrowLeft':
        next = current - step;
        break;
      case 'ArrowRight':
        next = current + step;
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    paneWidths.set(persistKey, clampWidth(next), { spring: true });
  };
</script>

<!-- A focusable separator is the WAI-ARIA window splitter, an interactive widget. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={base({ class: clsx(className) })}
  role="separator"
  aria-orientation="vertical"
  aria-valuenow={paneWidths.get(persistKey)}
  aria-valuemin={min}
  aria-valuemax={max}
  tabindex="0"
  onkeydown={onKeydown}
  onpointerdown={startDrag}
  onpointermove={moveDrag}
  onpointerup={endDrag}
  onpointercancel={endDrag}
  {...rest}
>
  <div class={grip()} style="width: {gripWidth.current}px; height: {gripHeight.current}px"></div>
</div>
