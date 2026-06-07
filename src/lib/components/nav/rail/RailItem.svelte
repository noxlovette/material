<!--
@component
Material 3 Navigation Rail Item.

A single destination within a navigation rail.
In mobile (navbar) mode the same item renders as a bottom-bar tab.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { RailItemProps } from './types.js';
  import { railElement } from './theme.js';
  import { Icon, Layer } from '$lib/utils/index.js';
  import Badge from '../../badge/Badge.svelte';
  import { NavigationMenu } from 'bits-ui';

  let {
    href = '/',
    label,
    external = false,
    badge = 0,
    class: className,
    selected,
    disabled,
    collapsed: collapsedProp,
    iconProps,
    ...rest
  }: RailItemProps = $props();

  const railCtx = getContext<{ collapsed: boolean } | undefined>('rail');
  const railModeCtx = getContext<{ mobile: boolean } | undefined>('railMode');
  const isMobile = $derived(railModeCtx?.mobile ?? false);

  // Mobile items always render in collapsed (icon+label stacked) layout
  const collapsed = $derived(isMobile ? true : (collapsedProp ?? railCtx?.collapsed ?? true));

  const isDisabled = $derived(!!disabled);
  const target = $derived(!isDisabled && external ? '_blank' : undefined);
  const rel = $derived(!isDisabled && external ? 'noopener noreferrer' : undefined);
  const hrefValue = $derived(isDisabled ? undefined : href);
  const ariaDisabled = $derived(isDisabled ? true : undefined);
  const tabIndex = $derived(isDisabled ? -1 : undefined);
  const hrefPathname = $derived.by(() => {
    try {
      return new URL(href).pathname;
    } catch {
      return href;
    }
  });
  const isActive = $derived(
    selected ||
      page.url.pathname === hrefPathname ||
      (hrefPathname !== '/' && page.url.pathname.startsWith(hrefPathname + '/'))
  );
  const {
    base,
    content,
    icon,
    iconContainer,
    label: labelClass
  } = $derived(
    railElement({
      active: isActive,
      expanded: !collapsed,
      disabled: isDisabled,
      mobile: isMobile
    })
  );
  const rootClass = $derived([base(), className].filter(Boolean).join(' '));

  const itemClass = $derived(
    isMobile
      ? 'flex h-full flex-1 justify-center'
      : ['flex w-full items-center', collapsed && 'justify-center'].filter(Boolean).join(' ')
  );

  function handleClick(event: MouseEvent) {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
</script>

<NavigationMenu.Item class={itemClass}>
  <NavigationMenu.Link active={isActive} href={hrefValue}>
    {#snippet child({ props })}
      <a
        {...props}
        {...rest}
        {target}
        {rel}
        aria-disabled={ariaDisabled}
        tabindex={tabIndex}
        onclick={handleClick}
        class={rootClass}
      >
        <div class={content()}>
          <div class={iconContainer()}>
            <Layer />
            <Icon
              {...iconProps}
              class={icon()}
              wght={isActive ? 600 : 400}
              fill={isActive ? 1 : 0}
            />
            {#if badge}
              <Badge size={badge === -1 ? 'sm' : 'lg'} number={badge}></Badge>
            {/if}
          </div>
          <p class={labelClass()}>
            {label}
          </p>
        </div>
      </a>
    {/snippet}
  </NavigationMenu.Link>
</NavigationMenu.Item>
