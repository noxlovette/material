<!--
@component
A toggle button: a button with a selected state, exposed as `aria-pressed`. Selecting changes its
colours and swaps its resting shape (round ↔ square).

@see https://m3.material.io/components/buttons/specs
-->
<script lang="ts">
  import type { ToggleProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { button, buttonColor } from './theme.js';
  import clsx from 'clsx';
  import { buttonCorners, shapeMorph } from './shapeMorph.js';
  import { Toggle, type ToggleRootProps } from 'bits-ui';

  let {
    children,
    iconProps,
    variant = 'filled',
    size = 'sm',
    shape = 'round',
    disabled,
    loading,
    pressed = $bindable(false),
    onPressedChange,
    class: className,
    ...restProps
  }: ToggleProps = $props();

  let ref = $state<HTMLElement | null>(null);
  $effect(() => (ref ? shapeMorph(ref, buttonCorners) : undefined));

  const cls = $derived(button({ variant, size, shape, selected: pressed }));
  const btnCls = $derived(
    cls.base({
      class: clsx(buttonColor({ variant, state: pressed ? 'selected' : 'unselected' }), className)
    })
  );
</script>

<Toggle.Root
  bind:ref
  bind:pressed
  {onPressedChange}
  {disabled}
  class={btnCls}
  aria-busy={loading || undefined}
  data-cy="m3-toggle"
  {...restProps as ToggleRootProps}
>
  {#if loading}
    <LoadingIndicator center={false} class={cls.icon({ class: 'text-current' })} />
  {:else if iconProps}
    <Icon
      fill={pressed ? 1 : 0}
      {...iconProps}
      class={cls.icon({ class: clsx(iconProps.class) })}
    />
  {/if}
  {#if !loading || iconProps}
    {@render children?.()}
  {/if}
  <Layer />
</Toggle.Root>
