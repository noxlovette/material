<script lang="ts" generics="T">
  import { Layer } from '$lib/utils/index.js';
  import clsx from 'clsx';
  import { carousel } from './theme.js';
  import { keylines, maxSteps, place, type KeylineLayout } from './keylines.js';
  import type { CarouselProps } from './types.js';

  let {
    items,
    item,
    label,
    layout = 'multiBrowse',
    itemWidth,
    snap = layout !== 'uncontained',
    outlined = false,
    onitemclick,
    itemHref,
    itemLabel = (_, i) => `${i + 1} of ${items.length}`,
    itemDisabled,
    class: className,
    ...restProps
  }: CarouselProps<T> = $props();

  let scroller = $state<HTMLElement>();
  let width = $state(0);
  let scrollLeft = $state(0);

  const isKeyline = $derived(
    layout === 'multiBrowse' || layout === 'hero' || layout === 'centeredHero'
  );
  // Keyline layouts need the container width; until it's measured (and during SSR) they render
  // as a plain uncontained row.
  const k = $derived(
    isKeyline && width > 0
      ? keylines(
          layout as KeylineLayout,
          width - 32,
          typeof itemWidth === 'number' ? itemWidth : undefined
        )
      : null
  );
  /** Scroll position in steps (one step moves an item by one slot). */
  const f = $derived(k ? scrollLeft / k.step : 0);
  const steps = $derived(k ? maxSteps(k, items.length) : 0);
  const placements = $derived(k ? place(k, items.length, f) : []);
  const vertical = $derived(layout === 'fullScreen');

  const cls = $derived(
    carousel({
      layout: k || !isKeyline ? layout : 'uncontained',
      keyline: !!k,
      snap: snap && !vertical,
      outlined,
      interactive: !!onitemclick || !!itemHref
    })
  );

  const widthOf = (data: T, i: number) =>
    typeof itemWidth === 'function' ? itemWidth(data, i) : (itemWidth ?? (isKeyline ? 186 : 240));

  function itemStyle(data: T, i: number): string {
    if (vertical) return '';
    if (!k) return `width:${widthOf(data, i)}px`;
    const p = placements[i];
    // Items outside the container stay in the DOM, parked just past either edge, so Tab still
    // reaches them; focusing one scrolls it into a large slot.
    const firstShown = placements.findIndex((q) => q !== null);
    const x = p ? p.x : i < firstShown ? -(k.large + 64) : width;
    return `width:${p ? p.size : k.small}px;transform:translateX(${x}px)`;
  }

  const progressOf = (i: number) => {
    const p = placements[i];
    if (!k || !p) return k ? 0 : 1;
    return Math.min(1, Math.max(0, (p.size - k.small) / (k.large - k.small)));
  };

  function onscroll() {
    if (scroller) scrollLeft = scroller.scrollLeft;
  }

  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onfocusin(e: FocusEvent) {
    if (!k || !scroller) return;
    const el = (e.target as Element).closest<HTMLElement>('[data-index]');
    if (!el) return;
    const target = Math.min(steps, Math.max(0, Number(el.dataset.index) - k.focalIndex));
    if (Math.abs(target - f) < 0.01) return;
    scroller.scrollTo({ left: target * k.step, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  // Mouse drag to scroll: touch and trackpads scroll natively, a mouse wheel only scrolls
  // vertically. Snapping is paused while dragging and resumes (and settles) on release.
  let dragged = false;
  function onpointerdown(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !scroller) return;
    const el = scroller;
    const start = vertical ? e.clientY : e.clientX;
    const startScroll = vertical ? el.scrollTop : el.scrollLeft;
    dragged = false;

    const move = (ev: PointerEvent) => {
      const delta = (vertical ? ev.clientY : ev.clientX) - start;
      if (!dragged && Math.abs(delta) < 4) return;
      dragged = true;
      el.style.scrollSnapType = 'none';
      if (vertical) el.scrollTop = startScroll - delta;
      else el.scrollLeft = startScroll - delta;
    };
    const up = () => {
      el.style.scrollSnapType = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function onclickcapture(e: MouseEvent) {
    // A drag that ends over an item isn't a tap on it.
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }
  }
</script>

{#snippet itemEl(data: T, i: number)}
  {@const disabled = itemDisabled?.(data, i) ?? false}
  {@const href = itemHref?.(data, i)}
  {@const tag = href ? 'a' : onitemclick ? 'button' : 'div'}
  <svelte:element
    this={tag}
    class={cls.item({ disabled })}
    style={itemStyle(data, i)}
    data-index={i}
    href={href && !disabled ? href : undefined}
    type={tag === 'button' ? 'button' : undefined}
    disabled={tag === 'button' ? disabled : undefined}
    aria-disabled={tag !== 'button' && disabled ? true : undefined}
    role={tag === 'div' ? 'group' : undefined}
    aria-roledescription={tag === 'div' ? 'slide' : undefined}
    aria-label={itemLabel(data, i)}
    onclick={onitemclick && !disabled ? () => onitemclick(data, i) : undefined}
  >
    {#if tag !== 'div' && !disabled}
      <Layer />
    {/if}
    <div class={cls.content()} style={k ? `width:${k.large}px` : undefined}>
      {@render item(data, { index: i, progress: progressOf(i) })}
    </div>
  </svelte:element>
{/snippet}

<div
  class={cls.base({ class: clsx(className) })}
  role="region"
  aria-roledescription="carousel"
  aria-label={label}
  {...restProps}
>
  <!-- The scroller is a scroll container, focusable only when no item is (arrow keys scroll it). -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_static_element_interactions -->
  <div
    bind:this={scroller}
    bind:clientWidth={width}
    class={cls.scroller()}
    tabindex={onitemclick || itemHref ? undefined : 0}
    {onscroll}
    {onfocusin}
    {onpointerdown}
    {onclickcapture}
    ondragstart={(e) => e.preventDefault()}
  >
    {#if k}
      <div class={cls.track()} style="width:{width + steps * k.step}px">
        {#each { length: steps + 1 } as _, s (s)}
          <div class={cls.snapPoint()} style="left:{s * k.step}px"></div>
        {/each}
        <div class={cls.viewport()} style="width:{width}px">
          {#each items as data, i (i)}
            {@render itemEl(data, i)}
          {/each}
        </div>
      </div>
    {:else}
      {#each items as data, i (i)}
        {@render itemEl(data, i)}
      {/each}
    {/if}
  </div>
</div>
