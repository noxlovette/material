<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Display, Headline, Title, Body, Label, Kbd, SupportingPane } from '$lib/index.js';
  import TableOfContents from '../TableOfContents.svelte';

  const toc = [
    { id: 'display', label: 'Display' },
    { id: 'headline', label: 'Headline' },
    { id: 'title', label: 'Title' },
    { id: 'body', label: 'Body' },
    { id: 'label', label: 'Label' },
    { id: 'kbd', label: 'Kbd' },
    { id: 'scale', label: 'Full Scale' }
  ];
</script>

<svelte:head>
  <title>Typography | Ogonëk M3</title>
</svelte:head>

<SupportingPane>
  {#snippet main()}
    <SinglePane contentClass="p-12 gap-12">
      <!-- DISPLAY -->
      <section id="display" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Display</Display>
        <Body>The largest text on screen. Reserved for short, high-impact text or numerals.</Body>
        <div class="flex flex-col gap-4">
          <Display size="large">Display Large</Display>
          <Display size="medium">Display Medium</Display>
          <Display size="small">Display Small</Display>
        </div>
        <Headline size="small">Emphasized</Headline>
        <div class="flex flex-col gap-4">
          <Display size="large" emphasized>Display Large Emphasized</Display>
          <Display size="medium" emphasized>Display Medium Emphasized</Display>
          <Display size="small" emphasized>Display Small Emphasized</Display>
        </div>
      </section>

      <!-- HEADLINE -->
      <section id="headline" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Headline</Display>
        <Body>Smaller than Display. Best for short, high-emphasis text on smaller screens.</Body>
        <div class="flex flex-col gap-4">
          <Headline size="large">Headline Large</Headline>
          <Headline size="medium">Headline Medium</Headline>
          <Headline size="small">Headline Small</Headline>
        </div>
        <Headline size="small">Emphasized</Headline>
        <div class="flex flex-col gap-4">
          <Headline size="large" emphasized>Headline Large Emphasized</Headline>
          <Headline size="medium" emphasized>Headline Medium Emphasized</Headline>
          <Headline size="small" emphasized>Headline Small Emphasized</Headline>
        </div>
      </section>

      <!-- TITLE -->
      <section id="title" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Title</Display>
        <Body>Medium-emphasis text. Used for app bars, list items, and card headers.</Body>
        <div class="flex flex-col gap-4">
          <Title size="large">Title Large</Title>
          <Title size="medium">Title Medium</Title>
          <Title size="small">Title Small</Title>
        </div>
        <Headline size="small">Emphasized</Headline>
        <div class="flex flex-col gap-4">
          <Title size="large" emphasized>Title Large Emphasized</Title>
          <Title size="medium" emphasized>Title Medium Emphasized</Title>
          <Title size="small" emphasized>Title Small Emphasized</Title>
        </div>
      </section>

      <!-- BODY -->
      <section id="body" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Body</Display>
        <Body>The default for long-form text. Used in paragraphs and supporting copy.</Body>
        <div class="flex flex-col gap-4">
          <Body size="large">Body Large — The quick brown fox jumps over the lazy dog.</Body>
          <Body size="medium">Body Medium — The quick brown fox jumps over the lazy dog.</Body>
          <Body size="small">Body Small — The quick brown fox jumps over the lazy dog.</Body>
        </div>
        <Headline size="small">Emphasized</Headline>
        <div class="flex flex-col gap-4">
          <Body size="large" emphasized>Body Large Emphasized</Body>
          <Body size="medium" emphasized>Body Medium Emphasized</Body>
          <Body size="small" emphasized>Body Small Emphasized</Body>
        </div>
      </section>

      <!-- LABEL -->
      <section id="label" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Label</Display>
        <Body>The smallest functional text. Used for captions, chips, and button labels.</Body>
        <div class="flex flex-col gap-4">
          <Label size="large">Label Large</Label>
          <Label size="medium">Label Medium</Label>
          <Label size="small">Label Small</Label>
        </div>
        <Headline size="small">Emphasized</Headline>
        <div class="flex flex-col gap-4">
          <Label size="large" emphasized>Label Large Emphasized</Label>
          <Label size="medium" emphasized>Label Medium Emphasized</Label>
          <Label size="small" emphasized>Label Small Emphasized</Label>
        </div>
      </section>

      <!-- KBD -->
      <section id="kbd" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Kbd</Display>
        <Body
          >Renders keyboard shortcuts. Use <code>position="relative"</code> for inline placement.</Body
        >
        <div class="flex flex-wrap items-center gap-4">
          <Kbd position="relative">⌘K</Kbd>
          <Kbd position="relative">Ctrl+S</Kbd>
          <Kbd position="relative">Escape</Kbd>
          <Kbd position="relative">⇧⌘P</Kbd>
        </div>
        <Headline size="small">In context</Headline>
        <div
          class="border-outline relative inline-flex max-w-xs items-center rounded border px-4 py-3"
        >
          <Body>Search…</Body>
          <Kbd>⌘K</Kbd>
        </div>
      </section>

      <!-- FULL SCALE -->
      <section id="scale" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Full Scale</Display>
        <Body>All 15 MD3 typescale roles in one view — largest to smallest.</Body>
        <div class="flex flex-col gap-3">
          <Display size="large">Display Large</Display>
          <Display size="medium">Display Medium</Display>
          <Display size="small">Display Small</Display>
          <Headline size="large">Headline Large</Headline>
          <Headline size="medium">Headline Medium</Headline>
          <Headline size="small">Headline Small</Headline>
          <Title size="large">Title Large</Title>
          <Title size="medium">Title Medium</Title>
          <Title size="small">Title Small</Title>
          <Body size="large">Body Large</Body>
          <Body size="medium">Body Medium</Body>
          <Body size="small">Body Small</Body>
          <Label size="large">Label Large</Label>
          <Label size="medium">Label Medium</Label>
          <Label size="small">Label Small</Label>
        </div>
      </section>
    </SinglePane>
  {/snippet}

  {#snippet supporting()}
    <TableOfContents sections={toc} />
  {/snippet}
</SupportingPane>
