<!--
@component
A `MenuItem`-like row that opens a nested submenu panel on hover or press,
instead of firing a selection itself.

Wraps bits-ui's `DropdownMenu.Sub` + `SubTrigger` + `SubContent`. The
trigger row (`iconProps`/`helper`/`children` label) behaves like a
`MenuItem`; pass the nested rows — `MenuItem`, `MenuCheckboxItem`,
`MenuRadioItem`, `MenuGroup`, more `MenuSub`, etc. — as `submenu`.

@example
```svelte
<Menu label="File">
  <MenuItem iconProps={{ name: 'draft' }}>New</MenuItem>
  <MenuSub iconProps={{ name: 'ios_share' }}>
    Share
    {#snippet submenu()}
      <MenuItem>Email</MenuItem>
      <MenuItem>Link</MenuItem>
    {/snippet}
  </MenuSub>
</Menu>
```

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import clsx from 'clsx';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Layer from '$lib/utils/Layer.svelte';
  import { menu as menuCls } from './theme.js';
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedDecel } from '$lib/animation/easing.js';
  import type { MenuSubProps } from './types.js';

  let {
    iconProps,
    disabled = false,
    helper,
    children,
    submenu,
    open = $bindable(false),
    class: className,
    submenuClass
  }: MenuSubProps = $props();

  const cls = $derived(menuCls());
</script>

<DropdownMenu.Sub bind:open>
  <DropdownMenu.SubTrigger {disabled}>
    {#snippet child({ props })}
      <div {...props} class={cls.item({ class: className })}>
        {#if iconProps}
          <Icon class={cls.icon()} {...iconProps} />
        {/if}
        <div class={cls.itemContent()}>
          {@render children()}
          {#if helper}
            <span class={cls.helper()}>{helper}</span>
          {/if}
        </div>
        <Icon name="chevron_right" class={cls.rightSlot()} />
        <Layer />
      </div>
    {/snippet}
  </DropdownMenu.SubTrigger>

  <DropdownMenu.Portal>
    <DropdownMenu.SubContent forceMount sideOffset={4} class="z-100">
      {#snippet child({ wrapperProps, props, open: isOpen })}
        {#if isOpen}
          <div {...wrapperProps} class={wrapperProps.class as any}>
            <div
              {...props}
              class={clsx(cls.content(), props.class as any, submenuClass)}
              transition:enterExit={{
                duration: 200,
                easing: easeEmphasizedDecel,
                mode: 'scale'
              }}
            >
              {@render submenu()}
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.SubContent>
  </DropdownMenu.Portal>
</DropdownMenu.Sub>
