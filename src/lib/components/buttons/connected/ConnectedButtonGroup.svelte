<!--
@component
A connected button group — the M3 replacement for the deprecated segmented
button. Items sit in a shared pill (or square) shape with a small gap between
them; selecting or pressing an item changes only that item's own shape and
color, never its neighbors'.

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
    shape = 'round',
    size = 'sm',
    children,
    class: className
  }: ConnectedButtonGroupProps = $props();

  const cls = $derived(connectedButtonGroup({ orientation }));

  setContext<ConnectedButtonGroupCtx>('connectedButtonGroup', {
    get size() {
      return size;
    },
    get shape() {
      return shape;
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
  class={cls.root({ class: clsx(className) })}
>
  {@render children?.()}
</ToggleGroup.Root>
