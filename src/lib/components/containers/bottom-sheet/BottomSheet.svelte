<!--
@component
Bottom sheets show secondary content anchored to the bottom of the screen.

- **Modal** (default): a native `<dialog>` above a scrim. It dismisses on Esc, a scrim tap, a
  downward drag, or activating the drag handle.
- **Standard**: no scrim, the rest of the screen stays usable. Dragging or activating the handle
  switches between expanded and collapsed to `peekHeight`.

Visibility is controlled with `bind:open`; the sheet stays mounted until its exit animation
finishes. The content scrolls inside the sheet once it reaches its maximum height.

@see https://m3.material.io/components/bottom-sheets/specs
-->
<script lang="ts">
  import { animate, type AnimationPlaybackControls } from 'motion';
  import type { Attachment } from 'svelte/attachments';
  import { untrack } from 'svelte';
  import clsx from 'clsx';
  import { enterExit, Presence, springTokens, springTransition } from '$lib/animation/index.js';
  import { bottomSheet } from './theme.js';
  import type { BottomSheetCloseReason, BottomSheetProps } from './types.js';

  let {
    children,
    variant = 'modal',
    open = $bindable(true),
    expanded = $bindable(true),
    peekHeight = 112,
    label,
    hideHandle = false,
    close,
    class: className,
    'aria-labelledby': labelledby
  }: BottomSheetProps = $props();

  const sheet = new Presence(() => open);
  const modal = $derived(variant === 'modal');
  const cls = $derived(bottomSheet({ variant }));

  let height = $state(0);
  /** Where the sheet rests: 0 when expanded, lower when a standard sheet is collapsed. */
  const rest = $derived(!modal && !expanded ? Math.max(0, height - peekHeight) : 0);

  // The drag offset lives outside Svelte state: it changes every pointer move and is written
  // straight to the container's transform.
  let el: HTMLElement | undefined;
  let offset = 0;
  let velocity = 0;
  let controls: AnimationPlaybackControls | undefined;

  const set = (y: number) => {
    offset = y;
    if (el) el.style.transform = `translateY(${y}px)`;
  };

  /** Springs to `to`, carrying the velocity of the drag that let go. */
  const settle = (to: number) => {
    controls?.stop();
    controls = animate(offset, to, {
      ...springTransition(springTokens.spatial),
      velocity,
      onUpdate: set
    });
    velocity = 0;
  };

  const follow: Attachment<HTMLElement> = (node) => {
    el = node;
    height = node.offsetHeight;
    set(untrack(() => rest));
    $effect(() => {
      const to = rest;
      untrack(() => !drag && settle(to));
    });
    return () => {
      controls?.stop();
      el = undefined;
    };
  };

  // untrack: re-running this attachment would call showModal() on an open dialog. The dialog
  // unmounts after its exit instead of calling close(), so focus is returned to the opener here.
  const showModal: Attachment<HTMLDialogElement> = (node) =>
    untrack(() => {
      const opener = document.activeElement;
      node.showModal();
      return () => {
        if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
      };
    });

  const dismiss = (reason: BottomSheetCloseReason) => {
    open = false;
    close?.(reason);
  };

  function activateHandle() {
    if (dragged) return;
    if (modal) dismiss('handle');
    else expanded = !expanded;
  }

  // Dragging: window listeners, so a fast drag that leaves the 48dp handle area keeps tracking.
  let drag: { startY: number; start: number; lastY: number; lastT: number } | null = null;
  let dragged = false;

  function onpointerdown(e: PointerEvent) {
    if (e.button !== 0) return;
    controls?.stop();
    dragged = false;
    velocity = 0;
    drag = { startY: e.clientY, start: offset, lastY: e.clientY, lastT: e.timeStamp };
    window.addEventListener('pointermove', onpointermove);
    window.addEventListener('pointerup', onpointerup);
    window.addEventListener('pointercancel', onpointerup);
  }

  function onpointermove(e: PointerEvent) {
    if (!drag) return;
    const dy = e.clientY - drag.startY;
    if (!dragged && Math.abs(dy) < 4) return;
    dragged = true;
    const dt = e.timeStamp - drag.lastT;
    if (dt > 0) velocity = ((e.clientY - drag.lastY) / dt) * 1000;
    drag.lastY = e.clientY;
    drag.lastT = e.timeStamp;
    const next = drag.start + dy;
    const max = modal ? height : height - peekHeight;
    // Past the expanded position the sheet resists, at a quarter of the finger's travel.
    set(Math.min(max, next < 0 ? next / 4 : next));
  }

  function onpointerup() {
    window.removeEventListener('pointermove', onpointermove);
    window.removeEventListener('pointerup', onpointerup);
    window.removeEventListener('pointercancel', onpointerup);
    if (!drag) return;
    drag = null;
    if (!dragged) return;
    // Where a fling would carry the sheet in the next 150ms decides where it goes.
    const projected = offset + velocity * 0.15;
    if (modal) {
      if (projected > height / 2) dismiss('drag');
      else settle(0);
      return;
    }
    const collapse = projected > (height - peekHeight) / 2;
    if (collapse === !expanded) settle(rest);
    else expanded = !collapse;
  }
</script>

{#snippet surface()}
  <div class={cls.container()} bind:offsetHeight={height} {@attach follow}>
    {#if !hideHandle}
      <!-- Pointer drag target; the button inside is the keyboard/screen reader equivalent. -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class={cls.handleArea()} {onpointerdown}>
        <button
          type="button"
          class={cls.handle()}
          aria-label={modal ? 'Close sheet' : expanded ? 'Collapse sheet' : 'Expand sheet'}
          onclick={activateHandle}
        >
          <span class={cls.handleBar()}></span>
        </button>
      </div>
    {/if}
    <div class={cls.body()}>
      {@render children()}
    </div>
  </div>
{/snippet}

{#if sheet.mounted}
  {#if modal}
    <dialog
      class={cls.base({ class: clsx(className) })}
      aria-label={label}
      aria-labelledby={labelledby}
      data-state={open ? 'open' : 'closed'}
      {@attach showModal}
      {@attach sheet.attach(enterExit.bottomSheet)}
      oncancel={(e) => {
        e.preventDefault();
        dismiss('esc');
      }}
      onmousedown={(e) => {
        // Only the ::backdrop (or the gap a drag uncovers) targets the dialog itself.
        if (e.target === e.currentTarget) dismiss('scrim');
      }}
    >
      {@render surface()}
    </dialog>
  {:else}
    <div
      class={cls.base({ class: clsx(className) })}
      role="region"
      aria-label={label}
      aria-labelledby={labelledby}
      {@attach sheet.attach(enterExit.bottomSheet)}
    >
      {@render surface()}
    </div>
  {/if}
{/if}
