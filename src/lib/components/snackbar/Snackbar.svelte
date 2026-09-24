<!--
@component
Snackbars provide brief messages about app processes at the bottom of the screen.

@see https://m3.material.io/components/snackbars/overview
-->
<script lang="ts">
  import { snackbar } from './theme.js';
  import type { SnackBarProps } from './types.js';
  import Icon from '../../utils/icon/Icon.svelte';
  import { Layer } from '$lib/utils/index.js';
  import { enterExit, Presence } from '$lib/animation/index.js';

  let {
    message = $bindable(''),
    fixed = true,
    static: isStatic = false,
    label,
    callback,
    showClose = true,
    ...restProps
  }: SnackBarProps = $props();

  let dismissed = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    if (message) {
      dismissed = false;
      if (timeoutId) clearTimeout(timeoutId);

      if (!isStatic) {
        timeoutId = setTimeout(() => {
          dismissed = true;
          // Clear message if it's a string to allow re-triggering.
          // If it's a snippet, we just let it be dismissed.
          if (typeof message === 'string') {
            message = '';
          }
        }, 4000);
      }
    } else {
      dismissed = true;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  });

  const snack = new Presence(() => Boolean(message) && !dismissed);

  // Dismissing clears `message`; keep rendering the last one while the exit animation plays.
  let lastMessage: SnackBarProps['message'] = '';
  const shownMessage = $derived.by(() => (message ? (lastMessage = message) : lastMessage));

  const {
    base,
    icon,
    label: labelCls,
    supportingText,
    actionWrapper
  } = $derived(snackbar({ fixed }));
</script>

{#if snack.mounted}
  <div
    class={base()}
    data-cy="m3-snackbar"
    {...restProps}
    {@attach snack.attach(enterExit.slideUp)}
  >
    {#if typeof shownMessage === 'string'}
      <p class={supportingText()}>{shownMessage}</p>
    {:else if shownMessage}
      <p class={supportingText()}>
        {@render shownMessage()}
      </p>
    {/if}

    <div class={actionWrapper()}>
      {#if label}
        <button class={`${labelCls()} relative`} onclick={callback}>
          {label}
          <Layer />
        </button>
      {/if}

      {#if showClose}
        <button
          class="p-spacing-50 relative rounded-full"
          onclick={() => {
            dismissed = true;
            if (typeof message === 'string') {
              message = '';
            }
          }}
          aria-label="Dismiss snackbar"
          data-cy="m3-snackbar-dismiss"
        >
          <Icon class={icon()} name="close" />
          <Layer />
        </button>
      {/if}
    </div>
  </div>
{/if}
