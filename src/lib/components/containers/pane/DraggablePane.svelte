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

`onClickOutside` fires on any pointer click landing outside the panel (header,
content, and resize handles all count as inside) while expanded — pass
`onClose` there to dismiss on outside click, or drive `collapsed` for a
minimize-on-outside-click panel.

Note: with `bounds` set to an element, the clamp is computed from that
element's rect at drag/resize/nudge time; a `ResizeObserver` on `bounds`
plus a capturing window `scroll` listener keep it recomputed as that
element resizes or scrolls (itself or via any scrolling ancestor), since
the pane itself stays `position: fixed` and doesn't move with either.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { onMount, tick } from 'svelte';
  import { animate, motionValue } from 'motion';
  import { springTokens, springTransition } from '#lib/animation/spring.js';
  import { containerTransform } from '#lib/animation/containerTransform.js';
  import { prefersReducedMotion } from '#lib/animation/reducedMotion.js';
  import { Icon, Layer } from '#lib/utils/index.js';
  import { ButtonIcon } from '#lib/components/buttons/index.js';
  import { clickOutside, drag, project, resist, resistSlope } from '#lib/attachments/index.js';
  import { draggablePane, type ResizeEdge } from './theme.js';
  import { dragPositions } from './dragStore.svelte.js';
  import type { DraggablePaneProps } from './types.js';

  let {
    children,
    header,
    title,
    onClose,
    onClickOutside,
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
   * Undefined only before the first `onMount`/`recomputeBounds` run — which
   * includes SSR, since both only run client-side. Also read directly for
   * the resize handles' `aria-valuemax` instead of calling `sizeCaps()`
   * fresh in the template: that call site runs during SSR too (it's a plain
   * expression producing HTML), and `sizeCaps()` → `boundsRect()` touches
   * `window`/`HTMLElement`, which don't exist there.
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
  //
  // These are `style:` directives, not a `style` string: Svelte sets directives one property at a
  // time, whereas a changed `style` string replaces the whole inline style and would wipe the
  // `translate` that `renderOffset` writes outside Svelte.
  const px = (value: number | undefined, when = true) =>
    when && value !== undefined ? `${value}px` : undefined;

  function persist() {
    if (!persistKey) return;
    const next = { x: x ?? initialX, y: y ?? initialY, width, height };
    const stored = dragPositions.get(persistKey);
    // Bounds re-clamps run on every scroll/resize event; only real changes reach localStorage.
    if (
      stored?.x === next.x &&
      stored.y === next.y &&
      stored.width === next.width &&
      stored.height === next.height
    )
      return;
    dragPositions.set(persistKey, next);
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
    // A drag settles against the fresh bounds on release; a running spring is retargeted
    // rather than having its resting position yanked out from under it.
    if (dragging) return;
    if (settling()) settleTo(x ?? initialX, y ?? initialY);
    else moveTo(x ?? initialX, y ?? initialY);
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
    return () => {
      window.removeEventListener('resize', recomputeBounds);
      offRenderX();
      offRenderY();
      offsetX.destroy();
      offsetY.destroy();
    };
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

  /*
    Expressive drag: the pane tracks the pointer 1:1 (direct manipulation never lags behind a
    spring), rubber-bands past `bounds` instead of hitting a wall, and on release is thrown: it
    springs, on the fast spatial spring and at the speed it was really moving, to where the throw
    would coast to, clamped inside `bounds`. Keyboard nudges glide on the same spring. Grabbing the
    pane mid-spring stops it where it is.

    `x`/`y` (left/top) are where the pane rests, and change only when it comes to rest somewhere
    new. The motion in between is a translate offset from there, written straight to the element
    (`renderOffset`), so a frame of drag or spring never lays the page out, re-renders the
    component, or hands a parent bound to `x`/`y` a new value.
  */
  const SETTLE_SPRING = springTransition(springTokens.fastSpatial);

  const offsetX = motionValue(0);
  const offsetY = motionValue(0);

  function renderOffset() {
    if (!panelEl) return;
    const ox = offsetX.get();
    const oy = offsetY.get();
    panelEl.style.translate = ox || oy ? `${ox}px ${oy}px` : '';
  }
  const offRenderX = offsetX.on('change', renderOffset);
  const offRenderY = offsetY.on('change', renderOffset);

  const settling = () => offsetX.isAnimating() || offsetY.isAnimating();

  function stopSettle() {
    offsetX.stop();
    offsetY.stop();
  }

  /** Makes where the pane is on screen right now its resting position, with no offset. */
  function settleInPlace() {
    stopSettle();
    const ox = offsetX.get();
    const oy = offsetY.get();
    if (!ox && !oy) return;
    offsetX.jump(0);
    offsetY.jump(0);
    moveTo((x ?? initialX) + ox, (y ?? initialY) + oy);
  }

  /**
   * Springs the pane to `target` (clamped) from wherever it is on screen, starting at `velocity`
   * px/s — by default the velocity it's already moving at, so a retarget mid-flight is seamless.
   */
  function settleTo(
    targetX: number,
    targetY: number,
    velocity = { x: offsetX.getVelocity(), y: offsetY.getVelocity() }
  ) {
    const fromX = (x ?? initialX) + offsetX.get();
    const fromY = (y ?? initialY) + offsetY.get();
    const next = clamp(targetX, targetY);
    // The target becomes the resting position straight away and the offset takes up the
    // difference, so the pane doesn't move this frame; the spring then runs the offset to 0.
    x = next.x;
    y = next.y;
    persist();
    offsetX.jump(fromX - next.x);
    offsetY.jump(fromY - next.y);
    // Under reduced motion there is no spatial travel: the pane is simply where it lands.
    if (prefersReducedMotion()) {
      offsetX.jump(0);
      offsetY.jump(0);
      return;
    }
    animate(offsetX, 0, { ...SETTLE_SPRING, velocity: velocity.x });
    animate(offsetY, 0, { ...SETTLE_SPRING, velocity: velocity.y });
  }

  // Captured once per drag, so a pointer move reads no layout.
  let restX = 0;
  let restY = 0;
  let originX = 0;
  let originY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let range = { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };

  // Pointer plumbing (capture, release velocity) and the rubber-band come from the shared drag
  // attachment; this only positions the pane.
  const dragPane = drag(() => ({
    disabled: disableDrag,
    onStart: () => {
      stopSettle();
      dragging = true;
      restX = x ?? initialX;
      restY = y ?? initialY;
      originX = pointerX = restX + offsetX.get();
      originY = pointerY = restY + offsetY.get();
      const rect = boundsRect();
      const min = clamp(-Infinity, -Infinity);
      const max = clamp(Infinity, Infinity);
      range = {
        minX: min.x,
        maxX: max.x,
        minY: min.y,
        maxY: max.y,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    },
    onMove: (offset) => {
      pointerX = originX + offset.x;
      pointerY = originY + offset.y;
      offsetX.set(resist(pointerX, range.minX, range.maxX, range.width) - restX);
      offsetY.set(resist(pointerY, range.minY, range.maxY, range.height) - restY);
    },
    onEnd: (velocity) => {
      dragging = false;
      // Past an edge the pane only moved at the rubber-banded share of the pointer's speed.
      const vx = velocity.x * resistSlope(pointerX, range.minX, range.maxX, range.width);
      const vy = velocity.y * resistSlope(pointerY, range.minY, range.maxY, range.height);
      const atX = restX + offsetX.get();
      const atY = restY + offsetY.get();
      settleTo(atX + project(vx), atY + project(vy), { x: vx, y: vy });
    }
  }));

  /*
    Minimising and restoring are an M3 container transform: the pane's surface morphs into the
    pill and back. Only the pane's own buttons animate it; a consumer driving the bound
    `collapsed` directly swaps the two instantly, since the transition has to snapshot the old
    state before the change.
  */
  const uid = $props.id();
  let pillEl: HTMLButtonElement | undefined = $state();

  function setCollapsed(next: boolean) {
    settleInPlace();
    const from = next ? panelEl : pillEl;
    if (!from || typeof document === 'undefined') {
      collapsed = next;
      return;
    }
    containerTransform(
      async () => {
        collapsed = next;
        await tick();
      },
      {
        from,
        to: next ? `[data-draggable-pane-pill="${uid}"]` : `[data-draggable-pane="${uid}"]`
      }
    ).then(
      () => {},
      () => (collapsed = next)
    );
  }

  // The pane unmounts while collapsed; it comes back at its resting position, with no offset.
  $effect(() => {
    if (!collapsed) return;
    stopSettle();
    offsetX.jump(0);
    offsetY.jump(0);
  });

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
    // Steps from the resting position, which a running spring is already headed for, so a held
    // arrow key retargets it and glides instead of stepping.
    settleTo((x ?? initialX) + delta[0], (y ?? initialY) + delta[1]);
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
      settleInPlace();
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
  // drop the resize. The drag attachment works from a fixed baseline the same way.
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
      settleInPlace();
      nudgeResize(dir, delta[0], delta[1]);
    };
  }

  const edges = ['n', 's', 'e', 'w'] as const;
  const corners = ['ne', 'nw', 'se', 'sw'] as const;
</script>

{#if collapsed}
  <button
    bind:this={pillEl}
    type="button"
    class={miniBase({ class: minimizedClass })}
    data-draggable-pane-pill={uid}
    onclick={() => setCollapsed(false)}
    aria-label={`Expand ${minimizedTitle ?? title ?? 'panel'}`}
  >
    <Icon name="open_in_full" size="sm" class={miniIcon()} />
    <span class={miniLabel()}>{minimizedTitle ?? title}</span>
  </button>
{:else}
  <div
    bind:this={panelEl}
    class={base({ class: className })}
    data-draggable-pane={uid}
    style:left={px(x)}
    style:top={px(y)}
    style:width={px(width)}
    style:height={px(height)}
    style:min-width={px(minWidth, resizable)}
    style:min-height={px(minHeight, resizable)}
    style:max-width={px(capWidth)}
    style:max-height={px(capHeight)}
    role="group"
    aria-label={title}
    {@attach onClickOutside && clickOutside(onClickOutside)}
    {...rest}
  >
    <div
      class={headerBar()}
      role="button"
      tabindex={disableDrag ? undefined : 0}
      aria-label={disableDrag ? undefined : title ? `Drag to move ${title}` : 'Drag to move'}
      aria-keyshortcuts={disableDrag ? undefined : 'ArrowUp ArrowDown ArrowLeft ArrowRight'}
      {@attach dragPane}
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
                variant="standard"
                size="sm"
                iconProps={{ name: 'collapse_all' }}
                aria-label="Minimize"
                onclick={() => setCollapsed(true)}
              />
            {/if}
            {#if onClose}
              <ButtonIcon
                variant="standard"
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
          aria-valuemax={dir === 'e' || dir === 'w' ? capWidth : capHeight}
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
