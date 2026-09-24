<!--
@component
Side sheets show secondary content anchored to the side of the screen.

- **Modal** (default): a native `<dialog>` at the window's end edge above a scrim. It closes on
  its close button, Esc, or a scrim tap, and stays mounted until its exit animation finishes.
- **Standard**: part of the layout. Put it last in a full-height row; it opens by widening, so
  the content beside it reflows, and nothing else is blocked.

Visibility is controlled with `bind:open`.

@see https://m3.material.io/components/side-sheets/specs
-->
<script lang="ts">
  import type { Attachment } from 'svelte/attachments';
  import { untrack } from 'svelte';
  import clsx from 'clsx';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';
  import Divider from '../divider/Divider.svelte';
  import { enterExit, Presence } from '$lib/animation/index.js';
  import { sideSheet } from './theme.js';
  import type { SideSheetProps } from './types.js';

  const MAX_WIDTH = 400;

  let {
    headline,
    children,
    actions,
    variant = 'modal',
    open = $bindable(true),
    width = 256,
    detached = false,
    divider = true,
    onback,
    close,
    class: className
  }: SideSheetProps = $props();

  const id = $props.id();
  const sheet = new Presence(() => open && variant === 'modal');
  const cls = $derived(sideSheet({ variant, detached, divider, back: !!onback }));
  const sheetWidth = $derived(Math.min(width, MAX_WIDTH));
  // A detached standard sheet takes its 16dp margins with it.
  const slotWidth = $derived(open ? sheetWidth + (detached ? 32 : 0) : 0);

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

  const dismiss = () => {
    open = false;
    close?.();
  };
</script>

{#snippet surface()}
  <div class={cls.header()}>
    {#if onback}
      <ButtonIcon
        type="button"
        variant="text"
        class={cls.iconButton()}
        iconProps={{ name: 'arrow_back' }}
        aria-label="Back"
        onclick={onback}
      />
    {/if}
    <h2 id="{id}-headline" class={cls.headline()}>{headline}</h2>
    <ButtonIcon
      type="button"
      variant="text"
      class={cls.iconButton()}
      iconProps={{ name: 'close' }}
      aria-label="Close"
      onclick={dismiss}
    />
  </div>
  <div class={cls.body()}>
    {@render children()}
  </div>
  {#if actions}
    {#if divider}
      <Divider />
    {/if}
    <div class={cls.actions()}>
      {@render actions()}
    </div>
  {/if}
{/snippet}

{#if variant === 'modal'}
  {#if sheet.mounted}
    <dialog
      class={cls.base({ class: clsx(className) })}
      style:width="{sheetWidth}px"
      aria-labelledby="{id}-headline"
      data-state={open ? 'open' : 'closed'}
      {@attach showModal}
      {@attach sheet.attach(enterExit.sideSheet)}
      oncancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
      onmousedown={(e) => {
        // Only the ::backdrop targets the dialog itself.
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div class={cls.container()}>
        {@render surface()}
      </div>
    </dialog>
  {/if}
{:else}
  <aside
    class={cls.base({ class: clsx(className) })}
    style:width="{slotWidth}px"
    aria-labelledby="{id}-headline"
    aria-hidden={!open}
    inert={!open}
  >
    <div class={cls.container()} style:width="{sheetWidth}px">
      {@render surface()}
    </div>
  </aside>
{/if}
