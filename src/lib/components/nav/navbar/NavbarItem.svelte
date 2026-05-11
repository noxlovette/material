<!--
@component
Material 3 Navigation Bar Item.

A single destination within a navigation bar.
-->
<script lang="ts">
  import { page } from '$app/state';
  import type { NavItemProps } from './types.js';
  import { navitem } from './theme.js';
  import { Icon, Layer } from '$lib/utils/index.js';
  import Badge from '../../badge/Badge.svelte';
  import { NavigationMenu } from 'bits-ui';
  import clsx from 'clsx';

  let {
    href = '/',
    label,
    badge = 0,
    class: className,
    iconProps,
    ...rest
  }: NavItemProps = $props();

  const isActive = $derived(
    page.url.pathname === href ||
      (href !== '/' && page.url.href.startsWith(href)) ||
      page.url.href == href
  );

  const {
    base,
    content,
    icon,
    iconContainer,
    label: labelClass
  } = $derived(navitem({ active: isActive }));

  const rootClass = $derived(base({ class: clsx(className) }));
</script>

<NavigationMenu.Item class="flex h-full flex-1 justify-center">
  <NavigationMenu.Link active={isActive} {href}>
    {#snippet child({ props })}
      <a {...props} {...rest} class={rootClass}>
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
          <span class={labelClass()}>
            {label}
          </span>
        </div>
      </a>
    {/snippet}
  </NavigationMenu.Link>
</NavigationMenu.Item>
