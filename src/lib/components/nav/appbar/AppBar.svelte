<!--
@component
Material 3 App Bar.

Top app bars provide content and actions related to the current screen.
They’re used for branding, screen titles, navigation, and actions.

Publishes its measured height as `--appbar-height` on the document root, so any
`Pane`/`PaneGrid` on the page (`full`, the default) shrinks its `min-height` by
that amount with no props or wiring on either side — see Pane.svelte's doc
comment.

@see https://m3.material.io/components/top-app-bar/overview
-->
<script lang="ts">
  import { appbar } from './theme.js';
  import type { AppBarProps } from './types.js';
  import clsx from 'clsx';

  let {
    children,
    title,
    subtitle,
    titleProps,
    subtitleProps,
    trailing,
    leading,
    class: className,
    rowClass,
    showBack,
    ghost = false,
    ...rest
  }: AppBarProps = $props();

  let scrollY = $state(0);
  let scrolled = $derived(scrollY > 10);
  let barHeight = $state(64);

  const noTrailing = $derived(!trailing);
  const noLeading = $derived(!leading || !showBack);

  const {
    base,
    row,
    childrenRow,
    ghost: ghostCls,
    title: titleCLs,
    textContainer,
    subtitle: subtitleCls,
    leading: leadingCls,
    trailing: trailingCls
  } = $derived(appbar({ scrolled, noLeading, noTrailing }));
  const navClass = $derived(base({ class: clsx(className) }));
  const rowFull = $derived(row({ class: clsx(rowClass) }));

  function trackHeight(node: HTMLElement) {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      barHeight = entry?.contentRect.height ?? barHeight;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }

  $effect(() => {
    document.documentElement.style.setProperty('--appbar-height', `${barHeight}px`);
    return () => document.documentElement.style.removeProperty('--appbar-height');
  });
</script>

<svelte:window bind:scrollY />

<nav {...rest} class={navClass} {@attach trackHeight}>
  <div class={rowFull}>
    <div class={leadingCls()}>
      {@render leading?.()}
    </div>
    <div class={textContainer()}>
      <h1 class={titleCLs({ class: clsx(titleProps?.class) })} {...titleProps}>
        {title}
      </h1>
      {#if subtitle}
        <p class={subtitleCls({ class: clsx(subtitleProps?.class) })} {...subtitleProps}>
          {subtitle}
        </p>
      {/if}
    </div>
    <div class={trailingCls()}>
      {@render trailing?.()}
    </div>
  </div>
  {#if children}
    <div class={childrenRow()}>
      {@render children()}
    </div>
  {/if}
</nav>
{#if ghost}
  <div class={ghostCls()} style="height: {barHeight}px" aria-hidden="true"></div>
{/if}
