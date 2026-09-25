<!--
@component
A set of chips, 8dp apart, wrapping onto new lines. With `reorderable`, people can reorder them:
drag a chip (on touch, press and hold first) or focus one and press Alt+Arrow. The dragged chip
takes M3's dragged state and follows the pointer; the others spring aside to make room, and it
springs into its slot on release, carrying the pointer's speed.

@see https://m3.material.io/components/chips/specs
-->
<script lang="ts" generics="T">
  import { flushSync } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { animate, type AnimationPlaybackControls } from 'motion';
  import { nanoid } from 'nanoid';
  import clsx from 'clsx';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { drag, resist, type DragPoint } from '$lib/attachments/index.js';
  import { chipGroup } from './theme.js';
  import type { ChipGroupProps } from './types.js';

  let {
    items = $bindable(),
    key,
    chip,
    reorderable = false,
    onReorder,
    itemLabel,
    'aria-label': ariaLabel,
    class: className
  }: ChipGroupProps<T> = $props();

  const styles = $derived(chipGroup({ reorderable }));
  const hintId = `chip-group-hint-${nanoid(6)}`;

  /*
    Motion: chips are small components moved by direct manipulation, so everything springs on
    fastSpatial, like DraggablePane. Under reduced motion neighbours jump to their new slots.
  */
  const SPRING = springTransition(springTokens.fastSpatial);
  /* Movement before a press turns into a drag, so a tap still presses the chip. */
  const DRAG_THRESHOLD = 4;
  /* How long a finger rests on a chip before it lifts; moving sooner scrolls the page. */
  const TOUCH_DELAY = 400;

  const reducedMotion = () =>
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Each item's slot element, and the visual offset from its layout position it's drawn at. */
  const slots = new Map<string, HTMLElement>();
  const offsets = new Map<
    string,
    { x: number; y: number; controls: AnimationPlaybackControls[] }
  >();

  let draggedKey = $state<string | null>(null);
  let announcement = $state('');

  const register =
    (k: string): Attachment<HTMLElement> =>
    (el) => {
      slots.set(k, el);
      return () => {
        if (slots.get(k) === el) slots.delete(k);
        stop(k);
        offsets.delete(k);
      };
    };

  function stop(k: string) {
    for (const c of offsets.get(k)?.controls ?? []) c.stop();
  }

  function setOffset(k: string, x: number, y: number) {
    stop(k);
    offsets.set(k, { x, y, controls: [] });
    const el = slots.get(k);
    if (el) el.style.translate = x || y ? `${x}px ${y}px` : '';
  }

  /** Springs a slot from its current offset back to its layout position. */
  function settle(k: string, velocity: DragPoint = { x: 0, y: 0 }) {
    const from = offsets.get(k);
    if (!from || reducedMotion()) return setOffset(k, 0, 0);
    stop(k);
    const state = { x: from.x, y: from.y, controls: [] as AnimationPlaybackControls[] };
    offsets.set(k, state);
    const el = slots.get(k);
    const paint = () => el && (el.style.translate = `${state.x}px ${state.y}px`);
    state.controls = [
      animate(from.x, 0, {
        ...SPRING,
        velocity: velocity.x,
        onUpdate: (v) => ((state.x = v), paint())
      }),
      animate(from.y, 0, {
        ...SPRING,
        velocity: velocity.y,
        onUpdate: (v) => ((state.y = v), paint())
      })
    ];
  }

  const layoutOf = (el: HTMLElement) => ({ left: el.offsetLeft, top: el.offsetTop });

  /**
   * Moves the item at `from` to `to`, then plays FLIP on the slots: each one is drawn at its old
   * position and springs to its new one. The dragged slot is skipped; it stays under the pointer.
   */
  function move(from: number, to: number) {
    if (from === to || to < 0 || to >= items.length) return;
    const before = new Map([...slots].map(([k, el]) => [k, layoutOf(el)]));
    const next = [...items];
    next.splice(to, 0, ...next.splice(from, 1));
    items = next;
    flushSync();
    for (const [k, el] of slots) {
      const was = before.get(k);
      if (!was || k === draggedKey) continue;
      const now = layoutOf(el);
      const current = offsets.get(k) ?? { x: 0, y: 0 };
      setOffset(k, current.x + was.left - now.left, current.y + was.top - now.top);
      settle(k);
    }
  }

  function announce(item: T, index: number) {
    const name = itemLabel?.(item) ?? key(item);
    announcement = `${name}, moved to ${index + 1} of ${items.length}`;
  }

  /* The pointer drag in progress: where the dragged slot's layout box was when it started. */
  let start = { left: 0, top: 0, width: 0, height: 0 };
  let startOrder: string[] = [];

  function dragSlot(k: string) {
    return drag(() => ({
      threshold: DRAG_THRESHOLD,
      touchDelay: TOUCH_DELAY,
      onStart: () => {
        const el = slots.get(k)!;
        const current = offsets.get(k) ?? { x: 0, y: 0 };
        // Picked up mid-spring: carry on from where it's drawn, not from its slot.
        start = {
          left: el.offsetLeft + current.x,
          top: el.offsetTop + current.y,
          width: el.offsetWidth,
          height: el.offsetHeight
        };
        startOrder = items.map(key);
        draggedKey = k;
      },
      onMove: (offset) => {
        const el = slots.get(k);
        const group = el?.parentElement;
        if (!el || !group) return;
        // Where the chip is drawn, in the group's coordinates, rubber-banded inside it.
        const maxLeft = group.clientWidth - start.width;
        const maxTop = group.clientHeight - start.height;
        const left = resist(start.left + offset.x, 0, Math.max(0, maxLeft), group.clientWidth);
        const top = resist(start.top + offset.y, 0, Math.max(0, maxTop), group.clientHeight);

        // Take the slot whose centre is nearest the chip's, its own included, so it only moves
        // once another slot is closer than the one it has, and still reaches the ends when the
        // pointer is past the last chip or between rows.
        const cx = left + start.width / 2;
        const cy = top + start.height / 2;
        const from = items.findIndex((item) => key(item) === k);
        let to = from;
        let nearest = Infinity;
        items.forEach((item, index) => {
          const other = slots.get(key(item));
          if (!other) return;
          const distance = Math.hypot(
            other.offsetLeft + other.offsetWidth / 2 - cx,
            other.offsetTop + other.offsetHeight / 2 - cy
          );
          if (distance < nearest) {
            nearest = distance;
            to = index;
          }
        });
        move(from, to);

        setOffset(k, left - el.offsetLeft, top - el.offsetTop);
      },
      onEnd: (velocity) => {
        settle(k, velocity);
        draggedKey = null;
        const order = items.map(key);
        if (order.join('\n') === startOrder.join('\n')) return;
        const index = order.indexOf(k);
        announce(items[index], index);
        onReorder?.(items);
      }
    }));
  }

  function onKeydown(event: KeyboardEvent, k: string) {
    if (!reorderable || !event.altKey) return;
    const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const from = items.findIndex((item) => key(item) === k);
    const to = from + step;
    if (to < 0 || to >= items.length) return;
    const focused = document.activeElement as HTMLElement | null;
    move(from, to);
    // Moving a keyed node can drop its focus; put it back on the chip that moved.
    if (focused && document.activeElement !== focused) focused.focus();
    announce(items[to], to);
    onReorder?.(items);
  }
</script>

<div
  role="list"
  aria-label={ariaLabel}
  aria-describedby={reorderable ? hintId : undefined}
  class={styles.base({ class: clsx(className) })}
>
  {#each items as item, index (key(item))}
    {@const k = key(item)}
    <!-- The keydown is delegated: Alt+Arrow arrives from the focused chip inside, which is the
         interactive element. The slot itself is only a list item. -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      role="listitem"
      class={styles.item()}
      data-dragged={draggedKey === k ? true : undefined}
      onkeydown={(event) => onKeydown(event, k)}
      {@attach register(k)}
      {@attach reorderable && dragSlot(k)}
    >
      {@render chip(item, index)}
    </div>
  {/each}
</div>

{#if reorderable}
  <span id={hintId} class={styles.hint()}>Drag, or press Alt and an arrow key, to reorder.</span>
  <span class={styles.live()} aria-live="assertive">{announcement}</span>
{/if}
