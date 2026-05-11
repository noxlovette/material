<!--
@component
A toggle button that switches between pressed and unpressed states.
Uses Material 3 selection button styling.

@see https://m3.material.io/components/all-buttons
-->
<script lang="ts">
  import type { ToggleMDProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { button } from './theme.js';
  import clsx from 'clsx';
  import { Toggle, type ToggleRootProps } from 'bits-ui';

  let {
    children,
    iconProps,
    size = 'md',
    shape = 'round',
    disabled,
    loading,
    pressed = $bindable(false),
    onPressedChange,
    class: className,
    ...restProps
  }: ToggleMDProps = $props();

  const { base, icon } = $derived(
    button({
      variant: 'filled',
      color: 'default',
      usage: 'selection',
      shape,
      size,
      selected: pressed
    })
  );

  const btnCls = $derived(base({ class: clsx(className) }));
</script>

<Toggle.Root
  bind:pressed
  {onPressedChange}
  {disabled}
  class={btnCls}
  {...restProps as ToggleRootProps}
>
  {#if iconProps}
    {#if loading}
      <LoadingIndicator container class={icon()} />
    {:else}
      <Icon class={icon()} {...iconProps} />
      {@render children?.()}
    {/if}
  {:else if loading}
    <LoadingIndicator container />
  {:else}
    {@render children?.()}
  {/if}
  <Layer />
</Toggle.Root>
