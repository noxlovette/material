<!--
@component
A single item within a ConnectedButtonGroup. Selection is communicated through
shape (round collapsing toward square) and color, matching the M3 spec — not
through an overlaid check icon.
-->
<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { connectedButtonGroupItem } from './theme.js';
  import type { ConnectedButtonGroupCtx, ConnectedButtonGroupItemProps } from './types.js';

  let {
    value,
    label,
    iconProps,
    disabled = false,
    class: className
  }: ConnectedButtonGroupItemProps = $props();

  const ctx = getContext<ConnectedButtonGroupCtx | undefined>('connectedButtonGroup');
  const size = $derived(ctx?.size ?? 'sm');
  const shape = $derived(ctx?.shape ?? 'round');
  const { base, icon } = $derived(connectedButtonGroupItem({ size, shape }));
</script>

<ToggleGroup.Item {value} {disabled} class={base({ class: clsx(className) })}>
  {#if iconProps}
    <Icon {...iconProps} class={icon()} />
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
  <Layer />
</ToggleGroup.Item>
