<!--
@component
A single button within a ButtonGroup.
Displays a leading check icon when selected, per M3 spec.
-->
<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { buttonGroupItem } from './theme.js';
  import type { ButtonGroupItemProps } from './types.js';

  let {
    value,
    label,
    iconProps,
    disabled = false,
    class: className
  }: ButtonGroupItemProps = $props();

  const buttonGroupCtx = getContext<{ orientation: 'horizontal' | 'vertical' } | undefined>(
    'buttonGroup'
  );
  const orientation = $derived(buttonGroupCtx?.orientation ?? 'horizontal');
  const { base, checkIcon, icon } = $derived(buttonGroupItem({ orientation }));
</script>

<ToggleGroup.Item {value} {disabled} class={base({ class: clsx(className) })}>
  {#snippet children({ pressed })}
    {#if pressed}
      <Icon name="check" class={checkIcon()} />
    {:else if iconProps}
      <Icon {...iconProps} class={icon()} />
    {/if}
    {#if label}
      <span>{label}</span>
    {/if}
    <Layer />
  {/snippet}
</ToggleGroup.Item>
