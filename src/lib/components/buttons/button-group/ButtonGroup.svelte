<!--
@component
A group of connected buttons for filtering or mode selection.

Replaces the deprecated ToggleGroup / segmented-buttons pattern.

@see https://m3.material.io/components/button-groups/overview
-->
<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import clsx from 'clsx';
  import { setContext } from 'svelte';
  import { buttonGroup } from './theme.js';
  import type { ButtonGroupProps } from './types.js';

  let {
    type,
    value = $bindable(undefined),
    onValueChange,
    disabled = false,
    loop = true,
    orientation = 'horizontal',
    shape = 'round',
    size = 'sm',
    children,
    class: className
  }: ButtonGroupProps = $props();

  const cls = $derived(buttonGroup({ orientation, shape, size }));

  const buttonGroupCtx = {
    get orientation() {
      return orientation;
    }
  };
  setContext('buttonGroup', buttonGroupCtx);
</script>

<ToggleGroup.Root
  {type}
  bind:value
  {onValueChange}
  {disabled}
  {loop}
  {orientation}
  class={cls.root({ class: clsx(className) })}
>
  {@render children?.()}
</ToggleGroup.Root>
