<!--
@component
Snackbars provide brief messages about app processes at the bottom of the screen.

@see https://m3.material.io/components/snackbars/overview
-->
<script lang="ts">
  import { snackbar } from "./theme.js";
  import type { SnackBarProps } from "./types.js";
  import Icon from "../../utils/icon/Icon.svelte";
  import { Layer } from "$lib/utils/index.js";
  import { enterExit } from "$lib/animation/enterExit.js";
  import {
    easeEmphasizedDecel,
    easeEmphasizedAccel,
  } from "$lib/animation/easing.js";

  let {
    message,
    fixed = true,
    static: isStatic = false,
    label,
    callback,
    showClose = true,
    ...restProps
  }: SnackBarProps = $props();

  let dismissed = $state(false);

  $effect(() => {
    if (!message) return;
    if (isStatic) return;
    const t = setTimeout(() => {
      dismissed = true;
      message = "";
    }, 5000);
    return () => clearTimeout(t);
  });

  $effect(() => {
    if (!message) {
      dismissed = false;
      return;
    }
    dismissed = false;
  });

  const {
    base,
    icon,
    label: labelCls,
    supportingText,
    actionWrapper,
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
      mode: "slide-up",
    }}
    out:enterExit={{
      duration: 200,
      easing: easeEmphasizedAccel,
      mode: "slide-up",
    }}
  >
    {#if typeof message === "string"}
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
            message = "";
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
