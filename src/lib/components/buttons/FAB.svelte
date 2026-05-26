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
  import { clickOutside } from '$lib/actions/index.js';
  import { Button, type ButtonRootProps } from 'bits-ui';

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
    ...restProps
  }: FABProps = $props();

  const { base, icon, label: labelClass } = $derived(fab({ size, config, expanded }));

  let showMenu = $state(false);
  let wrapperEl = $state<HTMLElement | null>(null);

  const btnCls = $derived(
    base({
      class: clsx(
        className,
        'transition-[border-radius] duration-300',
        withMenu && showMenu && '!rounded-full'
      )
    })
  );

  function handleClick(e: MouseEvent) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (withMenu) {
      e.preventDefault();
      showMenu = !showMenu;
    }
  }
</script>

<div class="contents" bind:this={wrapperEl} use:clickOutside={() => (showMenu = false)}>
  <Button.Root
    {disabled}
    {formaction}
    class={btnCls}
    onclick={handleClick}
    data-cy="m3-fab"
    {...restProps as ButtonRootProps}
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

  {#if withMenu && showMenu && wrapperEl?.firstElementChild}
    <FABMenu anchorEl={wrapperEl.firstElementChild as HTMLElement}>
      {@render children?.()}
    </FABMenu>
  {/if}
</div>
