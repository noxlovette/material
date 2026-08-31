<!--
@component
A floating panel that can be dragged anywhere within `bounds` by its header —
an inspector, a tool palette, a mini-player. Unlike `Pane`/`PaneGrid`, which
lay out fixed regions in normal flow, a `DraggablePane` floats above content
(`position: fixed`, elevated surface) and is positioned by `x`/`y` rather than
participating in flex layout. With `persistKey`, its last dragged position
survives reloads via `localStorage`.

Note: with `bounds` set to an element, the clamp is computed from that
element's rect at drag/nudge/resize time, but the pane itself stays
`position: fixed` — if `bounds` scrolls with the page (rather than the pane's
own fixed positioning context), the pane can end up visually outside it
between recomputations.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { ButtonIcon } from '$lib/components/buttons/index.js';
  import { draggablePane } from './theme.js';
  import { dragPositions } from './dragStore.svelte.js';
  import type { DraggablePaneProps } from './types.js';

  let {
    children,
    header,
    title,
    onClose,
    x = $bindable(undefined),
    y = $bindable(undefined),
    initialX = 24,
    initialY = 24,
    persistKey,
    bounds = 'viewport',
    boundsPadding = 8,
    width,
    disableDrag = false,
    class: className,
    contentClass,
    ...rest
  }: DraggablePaneProps = $props();

  let panelEl: HTMLDivElement | undefined = $state();
  let dragging = $state(false);

  const { base, headerBar, grip, headline, actions, content } = $derived(
    draggablePane({ dragging, disableDrag })
  );

  const style = $derived(
    clsx(
      x !== undefined && `left: ${x}px;`,
      y !== undefined && `top: ${y}px;`,
      width !== undefined && `width: ${typeof width === 'number' ? `${width}px` : width};`
    )
  );

  onMount(() => {
    const hydrated = persistKey
      ? dragPositions.hydrate(persistKey, { x: initialX, y: initialY })
      : { x: x ?? initialX, y: y ?? initialY };
    moveTo(hydrated.x, hydrated.y);

    const onResize = () => moveTo(x ?? initialX, y ?? initialY);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  $effect(() => {
    if (!persistKey) return;
    const stored = dragPositions.get(persistKey);
    if (stored) {
      x = stored.x;
      y = stored.y;
    }
  });

  function boundsRect() {
    if (bounds instanceof HTMLElement) {
      const rect = bounds.getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    }
    return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
  }

  function clamp(nextX: number, nextY: number) {
    const rect = boundsRect();
    const w = panelEl?.offsetWidth ?? 0;
    const h = panelEl?.offsetHeight ?? 0;
    const minX = rect.left + boundsPadding;
    const maxX = Math.max(minX, rect.right - w - boundsPadding);
    const minY = rect.top + boundsPadding;
    const maxY = Math.max(minY, rect.bottom - h - boundsPadding);
    return {
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY)
    };
  }

  function moveTo(nextX: number, nextY: number) {
    const next = clamp(nextX, nextY);
    x = next.x;
    y = next.y;
    if (persistKey) dragPositions.set(persistKey, next);
  }

  let dragStartX = 0;
  let dragStartY = 0;
  let originX = 0;
  let originY = 0;

  function startDrag(event: PointerEvent) {
    if (disableDrag) return;
    dragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    originX = x ?? initialX;
    originY = y ?? initialY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent) {
    if (!dragging) return;
    moveTo(originX + (event.clientX - dragStartX), originY + (event.clientY - dragStartY));
  }

  function endDrag() {
    dragging = false;
  }

  const NUDGE = 8;

  function onKeydown(event: KeyboardEvent) {
    if (disableDrag) return;
    const step = event.shiftKey ? NUDGE * 4 : NUDGE;
    const deltas: Record<string, [number, number]> = {
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0]
    };
    const delta = deltas[event.key];
    if (!delta) return;
    event.preventDefault();
    moveTo((x ?? initialX) + delta[0], (y ?? initialY) + delta[1]);
  }
</script>

<div
  bind:this={panelEl}
  class={base({ class: className })}
  {style}
  role="group"
  aria-label={title}
  {...rest}
>
  <div
    class={headerBar()}
    role="button"
    tabindex={disableDrag ? undefined : 0}
    aria-label={disableDrag ? undefined : title ? `Drag to move ${title}` : 'Drag to move'}
    aria-keyshortcuts={disableDrag ? undefined : 'ArrowUp ArrowDown ArrowLeft ArrowRight'}
    onpointerdown={disableDrag ? undefined : startDrag}
    onpointermove={disableDrag ? undefined : moveDrag}
    onpointerup={disableDrag ? undefined : endDrag}
    onpointercancel={disableDrag ? undefined : endDrag}
    onkeydown={disableDrag ? undefined : onKeydown}
  >
    {#if !disableDrag}
      <Layer />
    {/if}
    {#if header}
      {@render header()}
    {:else}
      {#if !disableDrag}
        <Icon name="drag_indicator" class={grip()} />
      {/if}
      {#if title}
        <span class={headline()}>{title}</span>
      {/if}
      {#if onClose}
        <div
          class={actions()}
          role="presentation"
          onpointerdown={(event) => event.stopPropagation()}
        >
          <ButtonIcon
            variant="text"
            size="sm"
            iconProps={{ name: 'close' }}
            aria-label="Close"
            onclick={onClose}
          />
        </div>
      {/if}
    {/if}
  </div>
  <div class={content({ class: clsx(contentClass) })}>
    {@render children()}
  </div>
</div>
