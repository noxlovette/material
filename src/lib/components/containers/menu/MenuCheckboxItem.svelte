<!--
@component
A toggleable option inside a `Menu`.

Wraps bits-ui's `DropdownMenu.CheckboxItem`. Unlike `MenuRadioItem`, its
checked state is independent of any sibling item, so any number of
`MenuCheckboxItem`s can be checked at once. Renders a leading checkbox
indicator that fills in when checked.

@example
```svelte
<script>
  let showHidden = $state(false);
</script>

<Menu label="View">
  <MenuCheckboxItem bind:checked={showHidden}>Show hidden files</MenuCheckboxItem>
</Menu>
```

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import { menu as menuCls } from './theme.js';
  import type { MenuCheckboxItemProps } from './types.js';

  let {
    checked = $bindable(false),
    onCheckedChange,
    disabled = false,
    closeOnSelect = true,
    helper,
    children,
    class: className
  }: MenuCheckboxItemProps = $props();
</script>

<DropdownMenu.CheckboxItem bind:checked {onCheckedChange} {disabled} {closeOnSelect}>
  {#snippet child({ props, checked })}
    {@const cls = menuCls({ checked })}
    <div {...props} class={cls.item({ class: className })}>
      <Icon name={checked ? 'check_box' : 'check_box_outline_blank'} class={cls.indicator()} />
      <div class={cls.itemContent()}>
        {@render children()}
        {#if helper}
          <span class={cls.helper()}>{helper}</span>
        {/if}
      </div>
      <Layer />
    </div>
  {/snippet}
</DropdownMenu.CheckboxItem>
