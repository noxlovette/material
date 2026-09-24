<!--
  Shell for one guide: a header, the article, and an "On this page" pane that sticks beside it
  on extra-large windows (the canonical supporting-pane layout, built from PaneGrid + Pane).
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Body, Divider, Headline, Pane, PaneGrid } from '$lib/index.js';
  import TableOfContents from '../TableOfContents.svelte';

  let {
    title,
    lede,
    toc,
    children
  }: {
    title: string;
    lede: string;
    toc: { id: string; label: string }[];
    children: Snippet;
  } = $props();
</script>

<svelte:head>
  <title>{title} · Material for Svelte</title>
</svelte:head>

<PaneGrid direction={{ small: 'column', extraLarge: 'row' }} gap="lg">
  <Pane rounded={false} background={false}>
    <article class="gap-spacing-600 flex max-w-3xl flex-col">
      <header class="gap-spacing-150 flex flex-col">
        <Headline size="large">{title}</Headline>
        <Body size="large" class="text-md-sys-color-on-surface-variant">{lede}</Body>
      </header>
      <Divider />
      {@render children()}
    </article>
  </Pane>

  <Pane width={240} sticky visibleFrom="extraLarge" rounded={false} background={false}>
    <TableOfContents sections={toc} />
  </Pane>
</PaneGrid>
