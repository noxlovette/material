<!--
@component
A split button: a leading button for the main action and a trailing button that opens a menu of
related ones, such as Send with Schedule send. The two share one colour style and sit 2dp apart;
their inner corners tighten at rest and round out while hovered, pressed or open.

Compose the menu from `MenuItem`s (and `Divider`, headings), as with `Menu`. For one trigger that
only opens a menu, use `Menu`; for selectable options, `ConnectedButtonGroup`.

@see https://m3.material.io/components/split-button/specs
-->
<script lang="ts">
  import { enterExit, presence } from '$lib/animation/index.js';
  import { Icon, Layer } from '$lib/utils/index.js';
  import { Button, DropdownMenu } from 'bits-ui';
  import clsx from 'clsx';
  import { buttonColor, buttonElevation } from '../theme.js';
  import { menu } from '../../containers/menu/theme.js';
  import { SPLIT_CHEVRON_OFFSET, splitButton } from './theme.js';
  import { animate } from 'motion';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { shapeMorph, splitCorners } from '../shapeMorph.js';
  import type { SplitButtonProps } from './types.js';

  let {
    children,
    menuChildren,
    onclick,
    iconProps,
    variant = 'filled',
    size = 'sm',
    disabled = false,
    open = $bindable(false),
    align = 'end',
    menuLabel = 'More options',
    'aria-label': ariaLabel,
    class: className
  }: SplitButtonProps = $props();

  const cls = $derived(splitButton({ size }));

  let leadingEl = $state<HTMLElement | null>(null);
  let trailingEl = $state<HTMLElement | null>(null);
  $effect(() => (leadingEl ? shapeMorph(leadingEl, splitCorners('leading')) : undefined));
  $effect(() => (trailingEl ? shapeMorph(trailingEl, splitCorners('trailing')) : undefined));

  // Open: the menu icon springs to centre (cancelling its resting offset) and flips.
  let chevronEl = $state<HTMLElement | null>(null);
  $effect(() => {
    const el = chevronEl;
    if (!el) return;
    const target = { x: open ? SPLIT_CHEVRON_OFFSET[size] : 0, rotate: open ? 180 : 0 };
    const controls = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? animate(el, target, { duration: 0 })
      : animate(el, target, springTransition(springTokens.fastSpatial));
    return () => controls.stop();
  });
  const colorCls = $derived(
    clsx(buttonColor({ variant, state: 'default' }), buttonElevation[variant])
  );
</script>

<div class={cls.root({ class: clsx(className) })}>
  <Button.Root
    bind:ref={leadingEl}
    type="button"
    {disabled}
    {onclick}
    aria-label={ariaLabel}
    class={cls.leading({ class: colorCls })}
    data-cy="m3-split-button"
  >
    {#if iconProps}
      <Icon {...iconProps} class={cls.leadingIcon({ class: clsx(iconProps.class) })} />
    {/if}
    {@render children?.()}
    <Layer />
  </Button.Root>
  <DropdownMenu.Root bind:open>
    <DropdownMenu.Trigger {disabled}>
      {#snippet child({ props })}
        <Button.Root
          bind:ref={trailingEl}
          type="button"
          {...props}
          aria-label={menuLabel}
          class={cls.trailing({ class: colorCls })}
          data-cy="m3-split-button-menu"
        >
          <span bind:this={chevronEl} class="inline-flex">
            <Icon name="keyboard_arrow_down" class={cls.chevron()} />
          </span>
          <Layer />
        </Button.Root>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content {align} sideOffset={4} class="z-layer-popup">
        {#snippet child({ wrapperProps, props, open: isOpen })}
          <div {...wrapperProps}>
            <!-- Menu's own panel, so MenuItem rows look the same here. -->
            <div
              {...props}
              class={menu().content()}
              {@attach presence(() => isOpen, enterExit.scale)}
            >
              {@render menuChildren()}
            </div>
          </div>
        {/snippet}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</div>
