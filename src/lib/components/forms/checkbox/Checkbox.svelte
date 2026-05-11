<!--
@component
Checkboxes let users select one or more items from a list, or turn an item on or off.

@see https://m3.material.io/components/checkbox/overview
-->
<script lang="ts">
  import clsx from "clsx";
  import { checkbox } from "./theme.js";
  import type { CheckboxProps } from "./types.js";
  import { Layer } from "$lib/utils/index.js";
  import { Checkbox } from "bits-ui";

  let {
    label,
    supportingText,
    indeterminate = $bindable(false),
    checked = $bindable(false),
    disabled = false,
    error = false,
    align = "start",
    class: className,
    ...restProps
  }: CheckboxProps = $props();

  const state = $derived(
    indeterminate ? "indeterminate" : checked ? "checked" : "unchecked",
  );
  const cls = $derived(checkbox({ state, error, align, disabled }));
</script>

<Checkbox.Root
  bind:checked
  bind:indeterminate
  {disabled}
  class={cls.root({ class: clsx(className) })}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div class={cls.container()}>
      <div class={cls.control()}>
        <Layer />
        <div class={cls.box()}></div>
      </div>
      <span class={cls.indeterminateIcon()}></span>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class={cls.checkIcon()}
      >
        <path
          d="M 4.83 13.41 L 9 17.585 L 19.59 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    {#if label || supportingText}
      <div class="flex flex-col gap-1 text-left">
        {#if label}
          <span class={cls.label()}>{label}</span>
        {/if}
        {#if supportingText}
          <span class={cls.supporting()}>{supportingText}</span>
        {/if}
      </div>
    {/if}
  {/snippet}
</Checkbox.Root>
