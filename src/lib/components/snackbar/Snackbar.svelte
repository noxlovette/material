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
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedDecel, easeEmphasizedAccel } from '$lib/animation/easing.js';

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

  const {
    base,
    icon,
    label: labelCls,
    supportingText,
    actionWrapper
  } = $derived(snackbar({ fixed }));
</script>

{#if message && !dismissed}
  <div
    class={base()}
    data-cy="notification-snackbar"
    {...restProps}
    in:enterExit={{
      duration: 400,
      easing: easeEmphasizedDecel,
      mode: 'slide-up'
    }}
    out:enterExit={{
      duration: 200,
      easing: easeEmphasizedAccel,
      mode: 'slide-up'
    }}
  >
    {#if typeof message === 'string'}
      <p class={supportingText()}>{message}</p>
    {:else}
      <p class={supportingText()}>
        {@render message()}
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
          class="relative rounded-full p-1"
          onclick={() => {
            dismissed = true;
            if (typeof message === 'string') {
              message = '';
            }
          }}
          aria-label="Dismiss snackbar"
          data-cy="notification-dismiss"
        >
          <Icon class={icon()} name="close" />
          <Layer />
        </button>
      {/if}
    </div>
  </div>
{/if}
