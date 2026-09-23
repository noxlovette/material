<!--
@component
Side sheets are supplementary surfaces which are anchored to the edge of the screen.

Like BottomSheet, SideSheet owns its own overlay: it renders as a native `<dialog>` pinned to
the right edge of the screen, dims the rest of the app behind a backdrop, and slides in/out.
Visibility is controlled by `bind:open`; the sheet stays mounted until its exit animation
finishes. Conditionally rendering it ({#if open}<SideSheet close={…} />{/if}) still works, but
skips the exit animation.

@see https://m3.material.io/components/side-sheets/guidelines
-->
<script lang="ts">
  import type { SideSheetProps } from './types.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { enterExit, Presence } from '$lib/animation/index.js';

  let { headline, children, open = $bindable(true), close }: SideSheetProps = $props();

  const sheet = new Presence(() => open);

  const showModal = (node: HTMLDialogElement) => node.showModal();

  const dismiss = () => {
    open = false;
    close?.();
  };
</script>

{#if sheet.mounted}
  <dialog
    class="bg-md-sys-color-surface-container-low text-md-sys-color-on-surface fixed inset-y-0 right-0 left-auto m-0 h-full w-full max-w-sm rounded-l-md"
    data-state={open ? 'open' : 'closed'}
    {@attach showModal}
    {@attach sheet.attach(enterExit.sideSheet)}
    oncancel={(e) => {
      e.preventDefault();
      dismiss();
    }}
    onmousedown={(e) => {
      if (e.target != e.currentTarget) return;
      dismiss();
    }}
  >
    <div class="flex h-full flex-col">
      <div class="flex items-center justify-between p-6">
        <span class="md-sys-typescale-title-large text-md-sys-color-on-surface-variant"
          >{headline}</span
        >
        <ButtonIcon type="button" variant="text" iconProps={{ name: 'close' }} onclick={dismiss} />
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
