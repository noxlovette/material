<!--
@component
Side sheets are supplementary surfaces which are anchored to the edge of the screen.

Like BottomSheet, SideSheet owns its own overlay: it renders as a native `<dialog>` pinned to
the right edge of the screen, dims the rest of the app behind a backdrop, and slides in/out.
Mounting it calls `showModal()` immediately, so visibility is controlled by conditionally
rendering the component ({#if open}<SideSheet ...>{/if}).

@see https://m3.material.io/components/side-sheets/guidelines
-->
<script lang="ts">
  import type { SideSheetProps } from './types.js';
  import type { TransitionConfig } from 'svelte/transition';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/animation/easing.js';
  import { outroClass } from '$lib/animation/outroClass.js';

  let { headline, children, close }: SideSheetProps = $props();

  const open = (node: HTMLDialogElement) => node.showModal();

  const slideAnim = (
    node: HTMLDialogElement,
    options: { duration: number; easing: typeof easeEmphasizedDecel }
  ): TransitionConfig => {
    const width = node.getBoundingClientRect().width;
    return {
      duration: options.duration,
      easing: options.easing,
      css: (t) => `transform: translateX(${(1 - t) * width}px)`
    };
  };
</script>

<dialog
  class="bg-md-sys-color-surface-container-low fixed inset-y-0 right-0 left-auto m-0 h-full w-full max-w-sm rounded-l-md"
  use:open
  use:outroClass
  oncancel={(e) => {
    e.preventDefault();
    close();
  }}
  onmousedown={(e) => {
    if (e.target != e.currentTarget) return;
    close();
  }}
  in:slideAnim={{ easing: easeEmphasizedDecel, duration: 400 }}
  out:slideAnim={{ easing: easeEmphasizedAccel, duration: 300 }}
>
  <div class="flex h-full flex-col">
    <div class="flex items-center justify-between p-6">
      <span class="md-sys-typescale-title-large text-md-sys-color-on-surface-variant"
        >{headline}</span
      >
      <ButtonIcon type="button" variant="text" iconProps={{ name: 'close' }} onclick={close} />
    </div>
    {@render children()}
  </div>
</dialog>

<style>
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    animation: backdrop 400ms;
  }
  dialog:global(.leaving)::backdrop {
    background-color: transparent;
    animation: backdropReverse 400ms;
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
