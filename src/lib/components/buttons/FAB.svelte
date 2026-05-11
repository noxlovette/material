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
  import ButtonIcon from './ButtonIcon.svelte';
  import { Layer, Icon } from '$lib/utils/index.js';
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
    expanded = false,
    class: className,
    withMenu,
    ...restProps
  }: FABProps = $props();

  const { base, icon, label: labelClass } = $derived(fab({ size, config, expanded }));
  const btnCls = $derived(base({ class: clsx(className) }));

  let showMenu = $state(false);

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (withMenu) {
      e.preventDefault();
      showMenu = true;
    }
  }
</script>

{#if withMenu && showMenu}
  <div class="relative z-50" use:clickOutside={() => (showMenu = false)}>
    <FABMenu>
      {@render children?.()}
    </FABMenu>
    <ButtonIcon
      variant="filled"
      class="shadow-elevation-3"
      iconProps={{ name: 'close' }}
      onclick={() => (showMenu = !showMenu)}
    />
  </div>
{:else}
  <Button.Root
    {disabled}
    {formaction}
    class={btnCls}
    onclick={handleClick}
    {...restProps as ButtonRootProps}
  >
    <Icon {...iconProps} class={icon()} />
    <Layer />
    {#if expanded}
      <p class={labelClass()}>
        {label}
      </p>
    {/if}
  </Button.Root>
{/if}
