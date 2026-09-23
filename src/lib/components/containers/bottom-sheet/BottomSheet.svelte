<!--
@component
Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen.

They provide access to supplementary content and actions, such as navigation or a menu,
while keeping the main screen content visible.

@see https://m3.material.io/components/bottom-sheets/overview
-->
<script lang="ts">
  import type { BottomSheetProps } from './types.js';
  import { untrack } from 'svelte';
  import { enterExit, Presence } from '$lib/animation/index.js';

  const DEFAULT_HEIGHT = 480;
  const DISMISS_HEIGHT = 48;

  let { children, open = $bindable(true), close }: BottomSheetProps = $props();

  let height = $state(DEFAULT_HEIGHT);
  let container: HTMLDivElement | undefined = $state();
  let isDragging = $state(false);
  let startY = $state(0);

  const sheet = new Presence(() => open);

  // untrack: re-running this attachment on every drag would call showModal() on an open dialog.
  const showModal = (node: HTMLDialogElement) => {
    untrack(() => node.clientHeight < height && (height = node.clientHeight));
    node.showModal();
  };

  const dismiss = (reason: 'esc' | 'click' | 'low') => {
    open = false;
    close?.(reason);
  };

  // A sheet dragged shut keeps its collapsed height through the exit; restore it on reopen.
  $effect.pre(() => {
    if (open) untrack(() => height < DISMISS_HEIGHT && (height = DEFAULT_HEIGHT));
  });

  const moveWheel = (e: WheelEvent) => {
    e.preventDefault();
    height += e.deltaY;
    if (container && container.clientHeight < height) height = container.clientHeight;
  };

  const moveMouse = (e: { clientY: number }) => {
    if (isDragging) {
      const distance = e.clientY - startY;
      height -= distance;
      startY = e.clientY;
    }
  };

  $effect(() => {
    if (height < DISMISS_HEIGHT && untrack(() => open)) dismiss('low');
  });
</script>

<svelte:window
  onmousemove={moveMouse}
  onmouseup={() => (isDragging = false)}
  ontouchmove={(e) => moveMouse(e.touches[0])}
  ontouchend={() => (isDragging = false)}
/>

{#if sheet.mounted}
  <dialog
    class="bg-md-sys-color-surface-container-low text-md-sys-color-on-surface mx-auto mt-auto w-full max-w-2xl overflow-hidden rounded-t-md"
    style:max-height="{height}px"
    data-state={open ? 'open' : 'closed'}
    {@attach showModal}
    {@attach sheet.attach(enterExit.bottomSheet)}
    oncancel={(e) => {
      e.preventDefault();
      dismiss('esc');
    }}
    onmousedown={(e) => {
      if (e.target != e.currentTarget) return;
      dismiss('click');
    }}
    onwheel={moveWheel}
  >
    <div class="px-4" bind:this={container}>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="flex h-12 w-full cursor-grab items-center justify-center"
        onmousedown={(e) => {
          e.preventDefault();
          isDragging = true;
          startY = e.clientY;
        }}
        ontouchstart={(e) => {
          isDragging = true;
          startY = e.touches[0].clientY;
        }}
      >
        <div class="bg-md-sys-color-on-surface-variant/40 h-1 w-8 rounded-full"></div>
      </div>
      {@render children()}
    </div>
  </dialog>
{/if}

<style>
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    animation: backdrop var(--md-sys-motion-duration-effects-spring)
      var(--md-sys-motion-timing-function-effects-spring);
  }
  dialog[data-state='closed'] {
    pointer-events: none;
  }
  dialog[data-state='closed']::backdrop {
    background-color: transparent;
    animation: backdropReverse var(--md-sys-motion-duration-fast-effects-spring)
      var(--md-sys-motion-timing-function-fast-effects-spring);
  }
  @keyframes backdrop {
    from {
      background-color: transparent;
    }
    to {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  @keyframes backdropReverse {
    from {
      background-color: rgba(0, 0, 0, 0.5);
    }
    to {
      background-color: transparent;
    }
  }
</style>
