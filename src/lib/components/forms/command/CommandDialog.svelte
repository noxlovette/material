<!--
@component
A command palette: a `Command` in a modal overlay, opened from anywhere with ⌘K (Ctrl+K off Apple
platforms). The same keys close it again, as do Esc and a click on the scrim.

Put `CommandInput`, `CommandList` and the rest inside it, as with `Command`, and close it from an
item's `onSelect` (`bind:open`).
-->
<script lang="ts">
  import { Dialog } from 'bits-ui';
  import clsx from 'clsx';
  import { enterExit, presence } from '$lib/animation/index.js';
  import { triggersShortcut } from '$lib/utils/index.js';
  import Command from './Command.svelte';
  import { commandDialog } from './theme.js';
  import type { CommandDialogProps } from './types.js';

  let {
    open = $bindable(false),
    value = $bindable(''),
    shortcut = 'Mod+K',
    label = 'Command palette',
    children,
    class: className,
    ...restProps
  }: CommandDialogProps = $props();

  const s = commandDialog();
  let content = $state<HTMLElement | null>(null);

  function onShortcut(e: KeyboardEvent) {
    if (!triggersShortcut(e, shortcut, open ? content : null)) return;
    e.preventDefault();
    open = !open;
  }
</script>

<svelte:window onkeydown={onShortcut} />

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay>
      {#snippet child({ props, open: isOpen })}
        <div {...props} class={s.scrim()} {@attach presence(() => isOpen, enterExit.fade)}></div>
      {/snippet}
    </Dialog.Overlay>
    <Dialog.Content bind:ref={content}>
      {#snippet child({ props, open: isOpen })}
        <div {...props} class={s.content()} {@attach presence(() => isOpen, enterExit.dialog)}>
          <Dialog.Title class="sr-only">{label}</Dialog.Title>
          <Command {...restProps} bind:value class={s.command({ class: clsx(className) })}>
            {@render children()}
          </Command>
        </div>
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
