<!--
@component
Icon buttons help people take minor actions with one tap.

- Filled: high emphasis (default, except inside an `AppBar`, where it's standard)
- Tonal: medium-high emphasis
- Outlined: medium emphasis
- Standard: low emphasis, no container at rest; for app bars, fields and dense layouts

`variation="toggle"` makes a two-state icon button.

@see https://m3.material.io/components/icon-buttons/specs
-->
<script lang="ts">
  import type { ButtonIconProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { buttonColor, buttonIcon } from './theme.js';
  import clsx from 'clsx';
  import { buttonCorners, shapeMorph } from './shapeMorph.js';
  import { getButtonIconVariant } from './context.js';
  import Tooltip from '$lib/components/forms/tooltip/Tooltip.svelte';
  import { Button, Toggle, type ButtonRootProps, type ToggleRootProps } from 'bits-ui';

  // A container like AppBar can lower the default emphasis; an explicit `variant` still wins.
  const inheritedVariant = getButtonIconVariant();

  let {
    iconProps,
    variant = inheritedVariant ?? 'filled',
    size = 'sm',
    shape = 'round',
    width = 'default',
    variation = 'default',
    triggerClass = '',
    triggerSide = 'top',
    triggerAlign = 'center',
    disabled,
    formaction,
    tooltipContent,
    loading,
    pressed = $bindable(false),
    onPressedChange,
    class: className,
    ...restProps
  }: ButtonIconProps = $props();

  let ref = $state<HTMLElement | null>(null);
  $effect(() => (ref ? shapeMorph(ref, buttonCorners) : undefined));

  const toggle = $derived(variation === 'toggle');
  const cls = $derived(buttonIcon({ variant, size, width, shape, selected: toggle && pressed }));
  const colorCls = $derived(
    buttonColor({
      variant,
      state: toggle ? (pressed ? 'selected' : 'unselected') : 'default'
    })
  );
  const label = $derived(restProps['aria-label'] ?? tooltipContent);
</script>

{#snippet content()}
  {#if loading}
    <LoadingIndicator center={false} class={cls.icon({ class: 'text-current' })} />
  {:else}
    <Icon
      fill={toggle && pressed ? 1 : 0}
      {...iconProps}
      class={cls.icon({ class: clsx(iconProps.class) })}
    />
  {/if}
  <Layer />
{/snippet}

<Tooltip
  {triggerClass}
  supportingText={tooltipContent}
  contentProps={{ side: triggerSide, align: triggerAlign }}
>
  {#snippet trigger({
    class: tooltipTriggerClass,
    type: _tooltipType,
    onclick: _tooltipOnclick,
    ...triggerAttrs
  })}
    {@const btnCls = cls.base({
      class: clsx(colorCls, className, tooltipTriggerClass as string)
    })}
    {#if toggle}
      <Toggle.Root
        bind:ref
        bind:pressed
        {onPressedChange}
        {disabled}
        class={btnCls}
        aria-busy={loading || undefined}
        data-cy="m3-button-icon"
        {...restProps as ToggleRootProps}
        {...triggerAttrs}
        aria-label={label}
      >
        {@render content()}
      </Toggle.Root>
    {:else}
      <Button.Root
        bind:ref
        {disabled}
        {formaction}
        class={btnCls}
        aria-busy={loading || undefined}
        data-cy="m3-button-icon"
        {...restProps as ButtonRootProps}
        {...triggerAttrs}
        aria-label={label}
      >
        {@render content()}
      </Button.Root>
    {/if}
  {/snippet}
</Tooltip>
