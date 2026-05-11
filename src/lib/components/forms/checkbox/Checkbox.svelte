<!--
@component
Checkboxes let users select one or more items from a list, or turn an item on or off.

@see https://m3.material.io/components/checkbox/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { checkbox } from './theme.js';
  import type { CheckboxProps } from './types.js';
  import { Layer } from '$lib/utils/index.js';
  import { Checkbox, Label, useId } from 'bits-ui';

  let {
    labelText,
    labelRef,
    id = useId(),
    ref,
    indeterminate = $bindable(false),
    checked = $bindable(false),
    disabled = false,
    error = false,
    class: className,
    ...restProps
  }: CheckboxProps = $props();

  const state = $derived(indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked');
  const cls = $derived(checkbox({ state, error, disabled }));
</script>

<div class="flex cursor-pointer items-center space-x-3">
  <Checkbox.Root
    bind:checked
    bind:indeterminate
    {ref}
    {disabled}
    {id}
    class={cls.root({ class: clsx(className) })}
    {...restProps}
  >
    {#snippet children({ checked, indeterminate })}
      <div class={cls.container()}>
        <div class={cls.control()}>
          <Layer />
          <div class={cls.box()}></div>
        </div>
        {#if indeterminate}
          <span class={cls.indeterminateIcon()}></span>
        {:else if checked}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class={cls.checkIcon()}>
            <path
              d="M 4.83 13.41 L 9 17.585 L 19.59 7"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {/if}
      </div>
    {/snippet}
  </Checkbox.Root>
  <Label.Root for={id} ref={labelRef} class={cls.label()}>{labelText}</Label.Root>
</div>
