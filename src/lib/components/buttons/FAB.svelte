<!--
@component
Floating action buttons (FABs) help people take primary actions.

- Regular: Standard size
- Small: For secondary actions
- Large: For prominent actions
- Extended: Includes a text label

@see https://m3.material.io/components/floating-action-button/overview
-->
<script lang="ts">
  import clsx from 'clsx';
  import { fab } from './theme.js';
  import type { FABProps } from './types.js';
  import FABMenu from './FABMenu.svelte';
  import { Layer, Icon, LoadingIndicator } from '$lib/utils/index.js';
  import { Button, DropdownMenu, type ButtonRootProps } from 'bits-ui';

  let {
    children,
    disabled,
    formaction,
    size = 'regular',
    config = 'primary',
    iconProps,
    label,
    loading,
    expanded = false,
    class: className,
    withMenu,
    onclick,
    ...restProps
  }: FABProps = $props();

  const { base, icon, label: labelClass } = $derived(fab({ size, config, expanded }));

  let showMenu = $state(false);

  const btnCls = $derived(
    base({
      class: clsx(
        className,
        'transition-[border-radius] duration-300',
        withMenu && showMenu && '!rounded-full'
      )
    })
  );

  function handleClick(e: MouseEvent, triggerClick?: unknown) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    (onclick as ((e: MouseEvent) => void) | null | undefined)?.(e);
    if (typeof triggerClick === 'function') triggerClick(e);
  }
</script>

{#snippet fabButton(triggerProps: Record<string, unknown>)}
  <Button.Root
    {disabled}
    {formaction}
    data-cy="m3-fab"
    {...restProps as ButtonRootProps}
    {...triggerProps}
    class={btnCls}
    onclick={(e: MouseEvent) => handleClick(e, triggerProps.onclick)}
  >
    {#if loading}
      <LoadingIndicator />
    {:else}
      <Icon {...withMenu && showMenu ? { name: 'close' } : iconProps} class={icon()} />
      <Layer />
    {/if}
    {#if expanded && !(withMenu && showMenu)}
      <p class={labelClass()}>
        {label}
      </p>
    {/if}
  </Button.Root>
{/snippet}

{#if withMenu}
  <DropdownMenu.Root bind:open={showMenu}>
    <DropdownMenu.Trigger disabled={disabled || loading}>
      {#snippet child({ props })}
        {@render fabButton(props)}
      {/snippet}
    </DropdownMenu.Trigger>
    <FABMenu>
      {@render children?.()}
    </FABMenu>
  </DropdownMenu.Root>
{:else}
  {@render fabButton({})}
{/if}
