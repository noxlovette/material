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
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class={cls.checkIcon()}
            fill="currentColor"
          >
            <path d="M9.55 18 3.85 12.3 5.275 10.875 9.55 15.15 18.725 5.975 20.15 7.4Z" />
          </svg>
        {/if}
      </div>
    {/snippet}
  </Checkbox.Root>
  <Label.Root for={id} ref={labelRef} class={cls.label()}>{labelText}</Label.Root>
</div>
