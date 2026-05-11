<!--
@component
Material 3 Switch.

Switches toggle the state of a single setting on or off.

@see https://m3.material.io/components/switch/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { Icon } from '$lib/utils/index.js';
  import { toggle } from './theme.js';
  import type { SwitchProps } from './types.js';
  import { Switch } from 'bits-ui';

  let {
    checked = $bindable(false),
    disabled = false,
    checkedIconProps = { name: 'check' },
    uncheckedIconProps = { name: 'close' },
    icons = 'checked',
    class: className,
    ...restProps
  }: SwitchProps = $props();

  let startX: number | undefined = $state();
  const handleMouseUp = (e: MouseEvent) => {
    if (!startX) return;
    const distance = e.clientX - startX;
    if (distance > 16 && !checked) checked = true;
    if (distance < -16 && checked) checked = false;
    startX = undefined;
  };

  const { root, handle, hover, icon, input, iconChecked, iconUnchecked } = $derived(
    toggle({ icons })
  );
  const rootClass = $derived(String(root({ class: className as any })));
</script>

<svelte:window onpointerup={handleMouseUp} />

<Switch.Root
  bind:checked
  {disabled}
  {...restProps}
  class={clsx(rootClass, 'group') as any}
  onpointerdown={(e) => {
    if (!disabled) startX = e.clientX;
  }}
  ondragstart={(e) => e.preventDefault()}
>
  {#snippet child({ props })}
    <button {...props} type="button" class={clsx(rootClass, 'group')}>
      <!-- Track (formerly the input) -->
      <div class={String(input())}></div>

      <!-- Thumb -->
      <div class={String(handle())}>
        {#if icons !== 'none'}
          <!-- checked icon -->
          <Icon class={clsx(icon(), iconChecked())} {...checkedIconProps} />
          {#if icons === 'both'}
            <!-- unchecked icon -->
            <Icon class={clsx(icon(), iconUnchecked())} {...uncheckedIconProps} />
          {/if}
        {/if}
      </div>

      <!-- State layer -->
      <div class={String(hover())}></div>
    </button>
  {/snippet}
</Switch.Root>
