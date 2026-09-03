<!--
@component
A single interactive row inside a `Menu`.

`MenuItem` is the leaf node of the menu system. It wraps bits-ui's
`DropdownMenu.Item` so each row automatically gets keyboard navigation,
focus management, and the ARIA `menuitem` role.

Pass `onclick` (or `onSelect`) for the action; use `iconProps` for a
leading icon and `helper` for a supporting line below the label.

Contrast with `Menu`, which is just the shell (open state + floating panel),
and `ContextMenu`, which owns its own item list and is right-click triggered.

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import type { MenuItemProps } from './types.js';
  import type { DropdownMenuItemProps } from 'bits-ui';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import { DropdownMenu } from 'bits-ui';
  import { menu as menuCls } from '../theme.js';

  let {
    iconProps,
    disabled = false,
    onclick,
    onSelect,
    isGap,
    selected,
    helper,
    children,
    class: className,
    ...restProps
  }: MenuItemProps & DropdownMenuItemProps = $props();

  // bits-ui fires onSelect at the Item level; avoid wiring onclick to the
  // native button as well or it would fire twice on every click.
  const handleSelect = $derived(onSelect ?? (onclick ? () => onclick() : undefined));

  const cls = $derived(menuCls({ selected }));
</script>

{#if !isGap}
  <DropdownMenu.Item
    {...restProps}
    {disabled}
    onSelect={handleSelect}
    class={cls.item({ class: className as string })}
  >
    {#if iconProps}
      <Icon class={cls.icon()} {...iconProps} />
    {/if}

    <div class={cls.itemContent()}>
      {@render children()}
      {#if helper}
        <span class={cls.helper()}>
          {helper}
        </span>
      {/if}
    </div>
    <Layer />
  </DropdownMenu.Item>
{:else}
  <!-- Render as a gap -->
  <DropdownMenu.Item>
    <hr class="h-1" />
  </DropdownMenu.Item>
{/if}
