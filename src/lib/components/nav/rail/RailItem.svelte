<!--
@component
Material 3 Navigation Rail Item.

A single destination within a navigation rail. Collapsed, the label sits under the icon;
expanded, beside it inside the active indicator, and it moves between the two as the rail
springs. The active icon fills, per M3's icon guidance.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import type { RailItemProps } from './types.js';
  import { railElement } from './theme.js';
  import { Icon } from '$lib/utils/index.js';
  import Badge from '../../badge/Badge.svelte';
  import { NavigationMenu } from 'bits-ui';
  import clsx from 'clsx';

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

  const railCtx = getContext<{ collapsed: boolean; progress: number } | undefined>('rail');
  /* The rail's expand progress (0–1); a `collapsed` prop pins this item to an end state. */
  const progress = $derived(
    collapsedProp !== undefined ? (collapsedProp ? 0 : 1) : (railCtx?.progress ?? 0)
  );
  const layout = $derived(progress < 0.5 ? 'top' : 'start');

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
  const styles = $derived(railElement({ active: isActive, layout, disabled: isDisabled }));

  function handleClick(event: MouseEvent) {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
</script>

<NavigationMenu.Item class="flex w-full">
  <NavigationMenu.Link active={isActive} href={hrefValue}>
    {#snippet child({ props })}
      <a
        {...props}
        {...rest}
        href={hrefValue}
        {target}
        {rel}
        aria-disabled={ariaDisabled}
        tabindex={tabIndex}
        onclick={handleClick}
        class={styles.base({ class: clsx(className) })}
        data-layout={layout}
        style:--rail-p={collapsedProp !== undefined ? progress : undefined}
      >
        <span class={styles.sizer()}>
          <span class={styles.measure()} aria-hidden="true">{label}</span>
          <span class={styles.indicator()}></span>
          <!-- Badge offsets are measured from the icon's corner, not the indicator's. -->
          <span class={styles.icon()}>
            <Icon {...iconProps} fill={isActive ? 1 : 0} />
            {#if badge}
              <Badge size={badge === -1 ? 'sm' : 'lg'} number={badge} />
            {/if}
          </span>
          <span class={styles.label()}>{label}</span>
        </span>
      </a>
    {/snippet}
  </NavigationMenu.Link>
</NavigationMenu.Item>

<style>
  /*
    Geometry, interpolated on --rail-p (the rail's expand progress, 0 collapsed to 1 expanded)
    after Compose's AnimatedNavigationItem. The indicator stays anchored 20dp in and the icon
    keeps its x, so nothing moves sideways; only the label changes sides, while invisible.
    Coordinates are inside the sizer, which starts 20dp in and is as wide as the expanded pill.
  */
  .rail-item {
    /* 64dp (6 + 32 + 4 + 16 label + 6) → 56dp */
    height: calc(var(--spacing-spacing-800) - var(--spacing-spacing-100) * var(--rail-p, 0));
  }

  .rail-indicator {
    /* 56×32, 6dp down → the full pill, 56dp tall */
    top: calc(var(--spacing-spacing-75) * (1 - var(--rail-p, 0)));
    width: calc(
      var(--spacing-spacing-700) + (100% - var(--spacing-spacing-700)) * var(--rail-p, 0)
    );
    height: calc(var(--spacing-spacing-400) + var(--spacing-spacing-300) * var(--rail-p, 0));
  }

  .rail-icon {
    /* 4dp into the indicator → centred in the 56dp pill */
    top: calc(var(--spacing-spacing-125) + var(--spacing-spacing-75) * var(--rail-p, 0));
  }

  .rail-label {
    /* Fades out to nothing at the halfway point and back in: 4(p − ½)². */
    opacity: calc(4 * (var(--rail-p, 0) - 0.5) * (var(--rail-p, 0) - 0.5));
  }

  /* Under the indicator, centred on it. */
  .rail-item[data-layout='top'] .rail-label {
    top: calc(var(--spacing-spacing-75) + var(--spacing-spacing-400) + var(--spacing-spacing-50));
    left: calc(var(--spacing-spacing-700) / 2);
    translate: -50% 0;
  }

  /* Beside the icon, 8dp after it, sliding in from the left as it fades back. */
  .rail-item[data-layout='start'] .rail-label {
    top: 50%;
    left: calc(
      (var(--spacing-spacing-600) + var(--spacing-spacing-250)) * var(--rail-p, 0) -
        var(--spacing-spacing-250)
    );
    translate: 0 -50%;
  }
</style>
