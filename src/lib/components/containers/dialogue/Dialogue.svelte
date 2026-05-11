<!--
@component
Dialogs provide important information or prompt users for a decision.

A dialog is a type of modal window that appears in front of app content
to provide critical information or ask for a decision.
Dialogs disable all app functionality when they appear, and remain
on screen until confirmed, dismissed, or a required action has been taken.

@see https://m3.material.io/components/dialogs/overview
-->
<script lang="ts">
  import { dialogue } from './theme.js';
  import type { DialogueProps } from './types.js';
  import { Dialog } from 'bits-ui';
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasized, easeEmphasizedDecel } from '$lib/animation/easing.js';
  import { Button } from '$lib/components/buttons/index.js';

  let {
    open = $bindable(false),
    enhance,
    headline,
    supportingText,
    confirmText,
    cancelText = 'Отмена',
    confirmAction,
    loading = false,
    portalDisabled = false,
    minWidth = '280px',
    maxWidth = '560px',
    children,
    disabled = false,
    class: className,
    contentProps,
    ...rootRest
  }: DialogueProps = $props();

  const { base, inner, headlineContainer, buttonContainer, supportingTextContainer } =
    $derived(dialogue());
</script>

<Dialog.Root bind:open {...rootRest}>
  <Dialog.Portal disabled={portalDisabled}>
    <Dialog.Overlay forceMount>
      {#snippet child({ props, open })}
        {#if open}
          <div
            {...props}
            class={base()}
            transition:enterExit={{
              duration: 500,
              easing: easeEmphasizedDecel
            }}
          ></div>
        {/if}
      {/snippet}
    </Dialog.Overlay>
    <Dialog.Content forceMount>
      {#snippet child({ props, open: isOpen })}
        {#if isOpen}
          <form
            method="POST"
            action={confirmAction}
            use:enhance
            {...props}
            class={inner({ class: className })}
            style:min-width={minWidth}
            style:max-width={maxWidth}
            transition:enterExit={{
              duration: 500,
              easing: easeEmphasized,
              mode: 'dialog-m3'
            }}
          >
            {#if headline}
              <Dialog.Title class={headlineContainer()}>
                {headline}
              </Dialog.Title>
            {/if}
            {#if supportingText}
              <Dialog.Description class={supportingTextContainer()}>
                {supportingText}
              </Dialog.Description>
            {/if}

            {#if children}
              <div class="flex w-full flex-col gap-4">
                {@render children()}
              </div>
            {/if}

            <div class={buttonContainer()}>
              <Button
                type="button"
                variant="text"
                data-cy="dialogue-cancel"
                onclick={() => (open = false)}
              >
                {cancelText}
              </Button>

              <Dialog.Close>
                <Button type="submit" {disabled} {loading} data-cy="dialogue-confirm">
                  {confirmText}
                </Button>
              </Dialog.Close>
            </div>
          </form>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
