<!--
@component
Breadcrumb trail: `label-large` text links separated by chevron icons, wayfinding for
where the current screen sits in a hierarchy. Designed to sit inside `AppBar`, via its
`children` snippet, below the title row.

M3 doesn't define a breadcrumb pattern, so this follows the repo's own typescale/color-role
conventions instead of a spec page. The last item is always rendered as static text with
`aria-current="page"`, regardless of whether it has an `href`.
-->
<script lang="ts">
  import { Icon, Layer } from '$lib/utils/index.js';
  import clsx from 'clsx';
  import { breadcrumb } from './theme.js';
  import type { BreadcrumbProps } from './types.js';

  let { items, color = 'primary', class: className, ...rest }: BreadcrumbProps = $props();

  const { base, list, item, link, text, current, separator } = $derived(breadcrumb({ color }));
  const navCls = $derived(base({ class: clsx(className) }));
</script>

<nav aria-label="Breadcrumb" {...rest} class={navCls}>
  <ol class={list()}>
    {#each items as crumb, i (crumb.label + i)}
      {@const isLast = i === items.length - 1}
      <li class={item()}>
        {#if isLast}
          <span class={current()} aria-current="page">{crumb.label}</span>
        {:else if crumb.href}
          <a href={crumb.href} class={link()}>
            <Layer />
            {crumb.label}
          </a>
        {:else}
          <span class={text()}>{crumb.label}</span>
        {/if}
        {#if !isLast}
          <span class={separator()} aria-hidden="true">
            <Icon name="chevron_right" size="sm" />
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
