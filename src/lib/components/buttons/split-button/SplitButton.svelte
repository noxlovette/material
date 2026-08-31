<!--
@component
A leading action button fused to a trailing chevron trigger that opens a menu
of related actions — e.g. "Reply" with a dropdown for "Reply all" / "Forward".

The two segments render as one connected shape: pill on the outer edges,
squared on the corners where they touch (see `SPLIT_BUTTON_INNER_RADIUS`).
Compose the dropdown from `MenuItem` (and `Divider`, headings, etc.), the
same way you would with `Menu`.

Contrast with `Menu` (a single trigger that only ever opens a menu — no
separate primary action) and `ConnectedButtonGroup` (multiple equal,
selectable items, no menu).

@see https://m3.material.io/components/buttons/guidelines#834f5f31-e363-4d0f-bc4d-abac128f5f0e
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import clsx from 'clsx';
  import { easeEmphasizedDecel } from '$lib/animation/easing.js';
  import { enterExit } from '$lib/animation/enterExit.js';
  import Button from '../Button.svelte';
  import ButtonIcon from '../ButtonIcon.svelte';
  import { buttonIcon } from '../theme.js';
  import { SPLIT_BUTTON_INNER_RADIUS, splitButton } from './theme.js';
  import type { SplitButtonProps } from './types.js';

  let {
    children,
    menuChildren,
    onclick,
    iconProps,
    variant = 'filled',
    color = 'default',
    size = 'md',
    disabled = false,
    open = $bindable(false),
    align = 'end',
    menuLabel = 'More options',
    class: className
  }: SplitButtonProps = $props();

  const cls = $derived(splitButton({ open }));
  // Reuse ButtonIcon's own icon-size classes so the chevron matches exactly
  // what ButtonIcon would render — `iconProps.class` fully replaces its
  // internal size classes (see ButtonIcon.svelte), so we recompute them here.
  const chevronCls = $derived(
    clsx(buttonIcon({ variant, color, size, width: 'narrow' }).icon(), cls.icon())
  );

  const innerRadius = $derived(SPLIT_BUTTON_INNER_RADIUS[size ?? 'md']);
  const leadingStyle = $derived(
    `border-start-end-radius:${innerRadius};border-end-end-radius:${innerRadius}`
  );
  const trailingStyle = $derived(
    `border-start-start-radius:${innerRadius};border-end-start-radius:${innerRadius}`
  );
</script>

<div class={cls.root({ class: clsx(className) })}>
  <Button {variant} {color} {size} {disabled} {iconProps} {onclick} style={leadingStyle}>
    {@render children()}
  </Button>

  <DropdownMenu.Root bind:open>
    <DropdownMenu.Trigger {disabled}>
      <ButtonIcon
        {variant}
        {color}
        {size}
        {disabled}
        width="narrow"
        style={trailingStyle}
        tooltipContent={menuLabel}
        iconProps={{ name: 'arrow_drop_down', class: chevronCls }}
      />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content forceMount {align} sideOffset={4} class="z-100">
        {#snippet child({ wrapperProps, props, open: isOpen })}
          {#if isOpen}
            <div {...wrapperProps} class={wrapperProps.class as any}>
              <div
                {...props}
                class="bg-md-sys-color-surface-container-high shadow-elevation-3 ring-md-sys-color-outline/10 max-w-sm min-w-48 gap-1 overflow-y-auto rounded-lg px-2 py-1"
                transition:enterExit={{
                  duration: 200,
                  easing: easeEmphasizedDecel,
                  mode: 'scale'
                }}
              >
                {@render menuChildren()}
              </div>
            </div>
          {/if}
        {/snippet}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</div>
