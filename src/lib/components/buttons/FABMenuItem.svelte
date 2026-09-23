<!--
@component
An individual action within a FAB menu. Wraps bits-ui's `DropdownMenu.Item`, so it gets the
`menuitem` role, arrow-key navigation, and closes the menu when selected. Must be rendered
inside a `FAB` with `withMenu`.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { fabMenuItem } from './theme.js';
  import type { FABMenuItemProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { Button, DropdownMenu, type DropdownMenuItemProps } from 'bits-ui';

  let {
    class: className,
    variant = 'secondary',
    loading,
    children,
    iconProps,
    formaction,
    disabled,
    ...restProps
  }: FABMenuItemProps = $props();

  const { base, icon } = $derived(fabMenuItem({ variant }));
  const btnCls = $derived(base({ class: clsx(className) }));
</script>

<!-- Spread onto the Item, not the button: bits-ui merges (and chains handlers of) these into `props`. -->
<DropdownMenu.Item {disabled} {...restProps as DropdownMenuItemProps}>
  {#snippet child({ props })}
    <Button.Root {formaction} {disabled} data-cy="m3-fab-menu-item" {...props} class={btnCls}>
      {#if iconProps}
        {#if loading}
          <LoadingIndicator />
        {:else}
          <Icon class={icon()} {...iconProps} />
        {/if}
      {:else if loading}
        <LoadingIndicator />
      {/if}
      {@render children?.()}
      <Layer />
    </Button.Root>
  {/snippet}
</DropdownMenu.Item>
