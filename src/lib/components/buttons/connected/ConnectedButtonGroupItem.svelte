<!--
@component
One item of a `ConnectedButtonGroup`: a toggle button. Selection shows through its colour and
shape (it rounds out), not a check mark.
-->
<script lang="ts">
  import { ToggleGroup } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { buttonColor, buttonElevation } from '../theme.js';
  import { connectedCorners, shapeMorph } from '../shapeMorph.js';
  import { connectedButtonGroupItem } from './theme.js';
  import type { ConnectedButtonGroupCtx, ConnectedButtonGroupItemProps } from './types.js';

  let {
    value,
    label,
    iconProps,
    disabled = false,
    'aria-label': ariaLabel,
    class: className
  }: ConnectedButtonGroupItemProps = $props();

  let ref = $state<HTMLElement | null>(null);
  $effect(() => (ref ? shapeMorph(ref, connectedCorners) : undefined));

  const ctx = getContext<ConnectedButtonGroupCtx | undefined>('connectedButtonGroup');
  const variant = $derived(ctx?.variant ?? 'filled');
  const selected = $derived(
    ctx?.type === 'multiple'
      ? Array.isArray(ctx.value) && ctx.value.includes(value)
      : ctx?.value === value
  );
  const cls = $derived(
    connectedButtonGroupItem({ size: ctx?.size ?? 'sm', shape: ctx?.shape ?? 'round' })
  );
</script>

<ToggleGroup.Item
  bind:ref
  {value}
  {disabled}
  aria-label={ariaLabel}
  class={cls.base({
    class: clsx(
      buttonColor({ variant, state: selected ? 'selected' : 'unselected' }),
      buttonElevation[variant],
      className
    )
  })}
>
  {#if iconProps}
    <Icon
      fill={selected ? 1 : 0}
      {...iconProps}
      class={cls.icon({ class: clsx(iconProps.class) })}
    />
  {/if}
  {#if label}
    <span>{label}</span>
  {/if}
  <Layer />
</ToggleGroup.Item>
