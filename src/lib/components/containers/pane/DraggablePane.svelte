<!--
@component
A floating panel that can be dragged anywhere within `bounds` by its header,
resized from any edge/corner when `resizable`, and collapsed into a small
fixed-corner pill when `collapsible`. Unlike `Pane`/`PaneGrid`, which lay out
fixed regions in normal flow, a `DraggablePane` floats above content
(`position: fixed`, elevated surface) and is positioned by `x`/`y` rather than
participating in flex layout. With `persistKey`, its last dragged position and
size survive reloads via `localStorage`.

Even with `width`/`height` unset (content-sized), the panel always carries a
standing `max-width`/`max-height` — `maxWidth`/`maxHeight` capped by `bounds`
(see `sizeCaps()`) — so content taller/wider than that ceiling scrolls inside
the `content` slot instead of rendering off-screen with no way to reach it.

Note: with `bounds` set to an element, the clamp is computed from that
element's rect at drag/resize/nudge time; a `ResizeObserver` on `bounds`
plus a capturing window `scroll` listener keep it recomputed as that
element resizes or scrolls (itself or via any scrolling ancestor), since
the pane itself stays `position: fixed` and doesn't move with either.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { ButtonIcon } from '$lib/components/buttons/index.js';
  import { draggablePane, type ResizeEdge } from './theme.js';
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
    width = $bindable(undefined),
    height = $bindable(undefined),
    resizable = false,
    minWidth = 200,
    minHeight = 160,
    maxWidth,
    maxHeight,
    disableDrag = false,
    collapsible = false,
    collapsed = $bindable(false),
    minimizedTitle,
    minimizedCorner = 'bottom-left',
    minimizedClass,
    class: className,
    contentClass,
    ...rest
  }: DraggablePaneProps = $props();

  let panelEl: HTMLDivElement | undefined = $state();
  let dragging = $state(false);
  let resizeDir: ResizeEdge | null = $state(null);
  /**
   * The standing `max-width`/`max-height` ceiling (`sizeCaps()`, tracked
   * live) — applied via `style` regardless of whether `height`/`width` are
   * set, so a content-sized pane (the default — see `height`'s docs) can't
   * render taller/wider than `bounds` with no way to reach the rest of it.
   * Undefined only before the first `onMount`/`recomputeBounds` run.
   */
  let capWidth: number | undefined = $state();
  let capHeight: number | undefined = $state();

  const active = $derived(dragging || resizeDir !== null);

  const { base, headerBar, grip, headline, actions, content, miniBase, miniIcon, miniLabel } =
    $derived(draggablePane({ dragging: active, disableDrag, corner: minimizedCorner }));

  // Once resizable, min-width/min-height move from the base slot's static
  // `min-w-72` class to inline styles driven by the minWidth/minHeight props
  // — a class-based min-width would win over a smaller inline `width`
  // regardless of what those props say, silently overriding the safety-net
  // floor a consumer configured. A non-resizable pane keeps the plain
  // `min-w-72` class fallback (unaffected by minWidth/minHeight).
  const style = $derived(
    clsx(
      x !== undefined && `left: ${x}px;`,
      y !== undefined && `top: ${y}px;`,
      width !== undefined && `width: ${width}px;`,
      height !== undefined && `height: ${height}px;`,
      resizable && `min-width: ${minWidth}px;`,
      resizable && `min-height: ${minHeight}px;`,
      capWidth !== undefined && `max-width: ${capWidth}px;`,
      capHeight !== undefined && `max-height: ${capHeight}px;`
    )
  );

  function persist() {
    if (!persistKey) return;
    dragPositions.set(persistKey, { x: x ?? initialX, y: y ?? initialY, width, height });
  }

  function boundsRect() {
    if (bounds instanceof HTMLElement) {
      const rect = bounds.getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    }
    return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
  }

  function clamp(
    nextX: number,
    nextY: number,
    w = width ?? panelEl?.offsetWidth ?? 0,
    h = height ?? panelEl?.offsetHeight ?? 0
  ) {
    const rect = boundsRect();
    const minX = rect.left + boundsPadding;
    const maxX = Math.max(minX, rect.right - w - boundsPadding);
    const minY = rect.top + boundsPadding;
    const maxY = Math.max(minY, rect.bottom - h - boundsPadding);
    return {
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY)
    };
  }

  /** The effective width/height ceiling right now: `maxWidth`/`maxHeight` capped by `bounds`. */
  function sizeCaps() {
    const rect = boundsRect();
    const availW = rect.right - rect.left - boundsPadding * 2;
    const availH = rect.bottom - rect.top - boundsPadding * 2;
    return {
      width: Math.max(minWidth, Math.min(maxWidth ?? Infinity, availW)),
      height: Math.max(minHeight, Math.min(maxHeight ?? Infinity, availH))
    };
  }

  /** Refreshes `capWidth`/`capHeight` from `sizeCaps()` — call whenever `bounds`'s rect or the cap inputs may have changed. */
  function updateCaps() {
    const caps = sizeCaps();
    capWidth = caps.width;
    capHeight = caps.height;
  }

  /** Clamps a candidate size to `minWidth`/`minHeight` (a hard floor) and `maxWidth`/`maxHeight`/`bounds` (a ceiling). */
  function clampSize(w: number, h: number) {
    const caps = sizeCaps();
    return {
      width: Math.min(Math.max(w, minWidth), caps.width),
      height: Math.min(Math.max(h, minHeight), caps.height)
    };
  }

  function moveTo(nextX: number, nextY: number) {
    const next = clamp(nextX, nextY);
    x = next.x;
    y = next.y;
    persist();
  }

  /**
   * Grows/shrinks from `dir`'s edge(s), keeping the opposite edge(s) fixed —
   * pure math from an explicit (baseW, baseH, baseX, baseY) baseline plus a
   * (dx, dy) offset from it, so callers can pick their own baseline: the
   * pointer-drag start position (cumulative offset, recomputed fresh each
   * move so drift can't accumulate — see `moveResize`), or the current state
   * (a one-shot incremental nudge — see `resizeKeydown`).
   */
  function computeResize(
    dir: ResizeEdge,
    baseW: number,
    baseH: number,
    baseX: number,
    baseY: number,
    dx: number,
    dy: number
  ) {
    let w = baseW;
    let h = baseH;
    if (dir.includes('e')) w = baseW + dx;
    if (dir.includes('w')) w = baseW - dx;
    if (dir.includes('s')) h = baseH + dy;
    if (dir.includes('n')) h = baseH - dy;

    const clamped = clampSize(w, h);

    let nextX = baseX;
    let nextY = baseY;
    if (dir.includes('w')) nextX = baseX + (baseW - clamped.width);
    if (dir.includes('n')) nextY = baseY + (baseH - clamped.height);

    return {
      width: clamped.width,
      height: clamped.height,
      x: nextX,
      y: nextY,
      moved: dir.includes('w') || dir.includes('n')
    };
  }

  function applyResize(result: ReturnType<typeof computeResize>) {
    let w = result.width;
    let h = result.height;
    if (result.moved) {
      const posClamped = clamp(result.x, result.y, w, h);
      // A w/n resize keeps its opposite (anchor) edge fixed by construction
      // (see computeResize) — but if boundsPadding then clamps the position
      // further, the anchor would drift unless the size shrinks by the same
      // amount the position got held back.
      if (posClamped.x !== result.x) w = Math.max(minWidth, w - (posClamped.x - result.x));
      if (posClamped.y !== result.y) h = Math.max(minHeight, h - (posClamped.y - result.y));
      x = posClamped.x;
      y = posClamped.y;
    }
    width = w;
    height = h;
    persist();
  }

  /** One-shot incremental resize from the current state — for keyboard nudges. */
  function nudgeResize(dir: ResizeEdge, dx: number, dy: number) {
    applyResize(
      computeResize(
        dir,
        width ?? panelEl?.offsetWidth ?? minWidth,
        height ?? panelEl?.offsetHeight ?? minHeight,
        x ?? initialX,
        y ?? initialY,
        dx,
        dy
      )
    );
  }

  /** Re-clamps the current position/size, and the standing size cap, against `bounds`'s current rect — call whenever that rect may have changed. */
  function recomputeBounds() {
    updateCaps();
    moveTo(x ?? initialX, y ?? initialY);
    if (width !== undefined || height !== undefined) nudgeResize('se', 0, 0);
  }

  onMount(() => {
    const fallback = { x: x ?? initialX, y: y ?? initialY, width, height };
    const hydrated = persistKey ? dragPositions.hydrate(persistKey, fallback) : fallback;
    width = hydrated.width;
    height = hydrated.height;
    updateCaps();
    const clamped = clamp(
      hydrated.x,
      hydrated.y,
      hydrated.width ?? panelEl?.offsetWidth ?? 0,
      hydrated.height ?? panelEl?.offsetHeight ?? 0
    );
    x = clamped.x;
    y = clamped.y;
    persist();

    window.addEventListener('resize', recomputeBounds);
    return () => window.removeEventListener('resize', recomputeBounds);
  });

  // `bounds` can be an element that resizes or scrolls independently of the
  // window (e.g. via a scrolling ancestor) — a plain window `resize`
  // listener misses both, so its rect is tracked directly whenever it's an
  // element. Capturing `scroll` catches any scrolling ancestor, not just
  // `bounds` itself, since scroll events don't bubble. Reading
  // maxWidth/maxHeight/minWidth/minHeight up front (via updateCaps) also
  // makes this effect re-run — and the cap refresh — when those change.
  $effect(() => {
    updateCaps();
    if (!(bounds instanceof HTMLElement)) return;
    const target = bounds;
    const ro = new ResizeObserver(recomputeBounds);
    ro.observe(target);
    window.addEventListener('scroll', recomputeBounds, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', recomputeBounds, true);
    };
  });

  $effect(() => {
    if (!persistKey) return;
    const stored = dragPositions.get(persistKey);
    if (stored) {
      x = stored.x;
      y = stored.y;
    }
  });

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

  let resizeStartClientX = 0;
  let resizeStartClientY = 0;
  let resizeStartWidth = 0;
  let resizeStartHeight = 0;
  let resizeStartPosX = 0;
  let resizeStartPosY = 0;

  function startResize(dir: ResizeEdge) {
    return (event: PointerEvent) => {
      if (!resizable) return;
      event.stopPropagation();
      resizeDir = dir;
      resizeStartClientX = event.clientX;
      resizeStartClientY = event.clientY;
      resizeStartWidth = width ?? panelEl?.offsetWidth ?? minWidth;
      resizeStartHeight = height ?? panelEl?.offsetHeight ?? minHeight;
      resizeStartPosX = x ?? initialX;
      resizeStartPosY = y ?? initialY;
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    };
  }

  // Deliberately recomputed from the fixed (resizeStartClientX/Y) baseline on
  // every move rather than accumulated via `event.movementX`/`movementY` —
  // the latter isn't reliably populated across every input path (some
  // synthetic/automated drag sequences leave it 0), which would silently
  // drop the resize. Matches `moveDrag`'s baseline-delta approach.
  function moveResize(event: PointerEvent) {
    if (!resizeDir) return;
    applyResize(
      computeResize(
        resizeDir,
        resizeStartWidth,
        resizeStartHeight,
        resizeStartPosX,
        resizeStartPosY,
        event.clientX - resizeStartClientX,
        event.clientY - resizeStartClientY
      )
    );
  }

  function endResize() {
    resizeDir = null;
  }

  const edgeAxis: Record<'n' | 's' | 'e' | 'w', 'horizontal' | 'vertical'> = {
    n: 'horizontal',
    s: 'horizontal',
    e: 'vertical',
    w: 'vertical'
  };

  const edgeLabel: Record<'n' | 's' | 'e' | 'w', string> = {
    n: 'top edge',
    s: 'bottom edge',
    e: 'right edge',
    w: 'left edge'
  };

  function resizeKeydown(dir: 'n' | 's' | 'e' | 'w') {
    return (event: KeyboardEvent) => {
      if (!resizable) return;
      const step = event.shiftKey ? NUDGE * 4 : NUDGE;
      const deltas: Record<string, [number, number]> = {
        ArrowRight: [step, 0],
        ArrowLeft: [-step, 0],
        ArrowDown: [0, step],
        ArrowUp: [0, -step]
      };
      const delta = deltas[event.key];
      if (!delta) return;
      event.preventDefault();
      nudgeResize(dir, delta[0], delta[1]);
    };
  }

  const edges = ['n', 's', 'e', 'w'] as const;
  const corners = ['ne', 'nw', 'se', 'sw'] as const;
</script>

{#if collapsed}
  <button
    type="button"
    class={miniBase({ class: minimizedClass })}
    onclick={() => (collapsed = false)}
    aria-label={`Expand ${minimizedTitle ?? title ?? 'panel'}`}
  >
    <Icon name="open_in_full" size="sm" class={miniIcon()} />
    <span class={miniLabel()}>{minimizedTitle ?? title}</span>
  </button>
{:else}
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
        {#if collapsible || onClose}
          <div
            class={actions()}
            role="presentation"
            onpointerdown={(event) => event.stopPropagation()}
          >
            {#if collapsible}
              <ButtonIcon
                variant="text"
                size="sm"
                iconProps={{ name: 'minimize' }}
                aria-label="Minimize"
                onclick={() => (collapsed = true)}
              />
            {/if}
            {#if onClose}
              <ButtonIcon
                variant="text"
                size="sm"
                iconProps={{ name: 'close' }}
                aria-label="Close"
                onclick={onClose}
              />
            {/if}
          </div>
        {/if}
      {/if}
    </div>
    <div class={content({ class: clsx(contentClass) })}>
      {@render children()}
    </div>
    {#if resizable}
      {#each edges as dir (dir)}
        <div
          class={draggablePane({ edge: dir }).resizeHandle()}
          role="slider"
          aria-orientation={edgeAxis[dir]}
          aria-label={`Resize ${edgeLabel[dir]}`}
          aria-valuenow={dir === 'e' || dir === 'w'
            ? (width ?? panelEl?.offsetWidth)
            : (height ?? panelEl?.offsetHeight)}
          aria-valuemin={dir === 'e' || dir === 'w' ? minWidth : minHeight}
          aria-valuemax={dir === 'e' || dir === 'w' ? sizeCaps().width : sizeCaps().height}
          tabindex="0"
          onpointerdown={startResize(dir)}
          onpointermove={moveResize}
          onpointerup={endResize}
          onpointercancel={endResize}
          onkeydown={resizeKeydown(dir)}
        ></div>
      {/each}
      {#each corners as dir (dir)}
        <div
          class={draggablePane({ edge: dir }).resizeHandle()}
          role="presentation"
          onpointerdown={startResize(dir)}
          onpointermove={moveResize}
          onpointerup={endResize}
          onpointercancel={endResize}
        ></div>
      {/each}
    {/if}
  </div>
{/if}
