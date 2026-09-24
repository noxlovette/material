<!--
@component
One action in a FAB menu: a 56dp pill in the FAB's colour set (primary, secondary or tertiary
container). Wraps bits-ui's `DropdownMenu.Item`, so it gets the `menuitem` role, arrow-key
navigation, and closes the menu when chosen. Render it inside a `FAB` with `withMenu`.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { fabMenuItem } from './theme.js';
  import type { FABMenuItemProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { Button, DropdownMenu, type DropdownMenuItemProps } from 'bits-ui';

  let {
    class: className,
    loading,
    children,
    iconProps,
    formaction,
    disabled,
    ...restProps
  }: FABMenuItemProps = $props();

  const menuSet = getContext<(() => 'primary' | 'secondary' | 'tertiary') | undefined>(
    'fabMenuSet'
  );
  const cls = $derived(fabMenuItem({ set: menuSet?.() ?? 'primary' }));
</script>

<!-- Spread onto the Item, not the button: bits-ui merges (and chains handlers of) these into `props`. -->
<DropdownMenu.Item {disabled} {...restProps as DropdownMenuItemProps}>
  {#snippet child({ props })}
    <Button.Root
      {formaction}
      {disabled}
      data-cy="m3-fab-menu-item"
      {...props}
      class={cls.base({ class: clsx(className) })}
    >
      {#if loading}
        <LoadingIndicator center={false} class={cls.icon({ class: 'text-current' })} />
      {:else}
        <Icon {...iconProps} class={cls.icon({ class: clsx(iconProps.class) })} />
      {/if}
      {@render children()}
      <Layer />
    </Button.Root>
  {/snippet}
</DropdownMenu.Item>
