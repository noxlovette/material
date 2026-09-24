<!--
@component
A connected button group, M3's replacement for the segmented button: toggle buttons 2dp apart
in one shared shape, for related options such as Walk, Bike, Drive. Selecting an item rounds it
out and gives it the selected colours; pressing tightens its inner corners. Neighbours never
change.

@see https://m3.material.io/components/button-groups/overview
-->
<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import clsx from 'clsx';
  import { setContext } from 'svelte';
  import { connectedButtonGroup } from './theme.js';
  import type { ConnectedButtonGroupCtx, ConnectedButtonGroupProps } from './types.js';

  let {
    type,
    value = $bindable(undefined),
    onValueChange,
    disabled = false,
    loop = true,
    orientation = 'horizontal',
    variant = 'filled',
    shape = 'round',
    size = 'sm',
    children,
    'aria-label': ariaLabel,
    class: className
  }: ConnectedButtonGroupProps = $props();

  const cls = $derived(connectedButtonGroup({ orientation }));

  setContext<ConnectedButtonGroupCtx>('connectedButtonGroup', {
    get size() {
      return size;
    },
    get shape() {
      return shape;
    },
    get variant() {
      return variant;
    },
    get type() {
      return type;
    },
    get value() {
      return value;
    }
  });
</script>

<ToggleGroup.Root
  {type}
  bind:value
  {onValueChange}
  {disabled}
  {loop}
  {orientation}
  aria-label={ariaLabel}
  class={cls.root({ class: clsx(className) })}
>
  {@render children?.()}
</ToggleGroup.Root>
