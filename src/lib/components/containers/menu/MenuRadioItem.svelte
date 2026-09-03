<!--
@component
A single selectable option inside a `MenuRadioGroup`.

Wraps bits-ui's `DropdownMenu.RadioItem`. Only one radio item within the
same `MenuRadioGroup` can be checked at a time; selecting one unchecks any
previously-checked sibling. Renders a leading radio indicator that fills
in when selected.

Contrast with `MenuCheckboxItem`, whose checked state is independent of any
sibling item.

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import { menu as menuCls } from './theme.js';
  import type { MenuRadioItemProps } from './types.js';

  let {
    value,
    disabled = false,
    closeOnSelect = true,
    helper,
    children,
    class: className
  }: MenuRadioItemProps = $props();
</script>

<DropdownMenu.RadioItem {value} {disabled} {closeOnSelect}>
  {#snippet child({ props, checked })}
    {@const cls = menuCls({ checked })}
    <div {...props} class={cls.item({ class: className })}>
      <Icon
        name={checked ? 'radio_button_checked' : 'radio_button_unchecked'}
        class={cls.indicator()}
      />
      <div class={cls.itemContent()}>
        {@render children()}
        {#if helper}
          <span class={cls.helper()}>{helper}</span>
        {/if}
      </div>
      <Layer />
    </div>
  {/snippet}
</DropdownMenu.RadioItem>
