<!--
@component
Context menus appear on right-click and provide actions related to the clicked element.

@example
```svelte
<ContextMenu
  items={[
    { label: 'Edit', value: 'edit', iconProps: { name: 'edit' } },
    { separator: true },
    { label: 'Delete', value: 'delete', color: 'error' }
  ]}
  onselect={(value) => console.log(value)}
>
  <div class="p-10 bg-surface">Right click me</div>
</ContextMenu>
```

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { ContextMenu as BitsContextMenu } from 'bits-ui';
  import { contextMenu } from './theme.js';
  import type { ContextMenuProps, ContextMenuDataItem } from './types.js';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Divider from '../divider/Divider.svelte';
  import { enterExit } from '$lib/animation/enterExit.js';
  import { easeEmphasizedDecel } from '$lib/animation/easing.js';
  import clsx from 'clsx';

  let {
    items = [],
    selected,
    children,
    onselect,
    itemDataCyPrefix = 'context-menu-item',
    disabled = false
  }: ContextMenuProps = $props();

  const theme = $derived(contextMenu());

  const toDataCy = (value?: string) => (value ? value.replace(/[^a-zA-Z0-9-_]+/g, '-') : 'item');
</script>

{#snippet MenuItem(item: ContextMenuDataItem)}
  {#if item.separator}
    <Divider class="my-1" />
  {:else if item.items && item.items.length > 0}
    <BitsContextMenu.Sub>
      <BitsContextMenu.SubTrigger
        class={theme.subTrigger()}
        disabled={item.disabled}
        data-cy={`${itemDataCyPrefix}-${toDataCy(item.value)}`}
      >
        {#if item.iconProps}
          <Icon class={theme.icon()} {...item.iconProps} />
        {/if}
        <div class={theme.itemContent()}>
          <span class={theme.label()}>{item.label}</span>
          {#if item.helper}
            <span class={theme.helper()}>{item.helper}</span>
          {/if}
        </div>
        <Icon name="chevron_right" class={theme.rightSlot()} />
      </BitsContextMenu.SubTrigger>
      <BitsContextMenu.Portal>
        <BitsContextMenu.SubContent forceMount class={theme.content()}>
          {#snippet child({ wrapperProps, props, open })}
            {#if open}
              <div {...wrapperProps} class={wrapperProps.class as any}>
                <div
                  {...props}
                  class={props.class as any}
                  transition:enterExit={{
                    duration: 200,
                    easing: easeEmphasizedDecel,
                    mode: 'scale'
                  }}
                >
                  {#each item.items as subItem}
                    {@render MenuItem(subItem)}
                  {/each}
                </div>
              </div>
            {/if}
          {/snippet}
        </BitsContextMenu.SubContent>
      </BitsContextMenu.Portal>
    </BitsContextMenu.Sub>
  {:else}
    {@const isSelected = item.selected || (selected !== undefined && item.value === selected)}
    <BitsContextMenu.Item
      class={theme.item({ selected: isSelected })}
      disabled={item.disabled}
      onSelect={() => {
        if (item.value !== undefined) {
          item.onselect?.(item.value);
          onselect?.(item.value);
        }
      }}
      data-cy={`${itemDataCyPrefix}-${toDataCy(item.value)}`}
    >
      {#if item.iconProps}
        <Icon class={theme.icon()} {...item.iconProps} />
      {/if}
      <div class={theme.itemContent()}>
        <span class={theme.label()}>{item.label}</span>
        {#if item.helper}
          <span class={theme.helper()}>{item.helper}</span>
        {/if}
      </div>

      {#if isSelected}
        <Icon name="check" class={theme.rightSlot()} />
      {/if}
    </BitsContextMenu.Item>
  {/if}
{/snippet}

<BitsContextMenu.Root>
  <BitsContextMenu.Trigger {disabled}>
    {#snippet child({ props })}
      <div {...props}>
        {@render children()}
      </div>
    {/snippet}
  </BitsContextMenu.Trigger>

  <BitsContextMenu.Portal>
    <BitsContextMenu.Content forceMount class={theme.content()}>
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps} class={wrapperProps.class as any}>
            <div
              {...props}
              class={props.class as any}
              transition:enterExit={{
                duration: 200,
                easing: easeEmphasizedDecel,
                mode: 'scale'
              }}
            >
              {#each items as item}
                {@render MenuItem(item)}
              {/each}
            </div>
          </div>
        {/if}
      {/snippet}
    </BitsContextMenu.Content>
  </BitsContextMenu.Portal>
</BitsContextMenu.Root>
