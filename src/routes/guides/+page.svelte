<script lang="ts">
  import { Body, Card, Headline, Icon, Pane, Title } from '$lib/index.js';
  import { storybookHref } from '../storybook.js';
  import { guides, guideHref } from './nav.js';
</script>

<svelte:head>
  <title>Guides · Material for Svelte</title>
</svelte:head>

<Pane rounded={false} background={false}>
  <div class="gap-spacing-400 flex max-w-4xl flex-col">
    <header class="gap-spacing-150 flex flex-col">
      <Headline size="large">Guides</Headline>
      <Body size="large" class="text-md-sys-color-on-surface-variant">
        How the pieces fit together. For a single component's props, variants and live examples, see <a
          href={storybookHref()}
          class="text-md-sys-color-primary">Storybook</a
        >.
      </Body>
    </header>

    <div class="gap-spacing-200 grid grid-cols-1 md:grid-cols-2">
      {#each guides as guide (guide.slug)}
        <Card
          type="filled"
          padding="lg"
          href={guideHref(guide.slug)}
          class="gap-spacing-150 flex flex-col"
        >
          <div class="gap-spacing-150 flex items-center">
            <Icon name={guide.icon} class="text-md-sys-color-primary" />
            <Title>{guide.title}</Title>
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{guide.summary}</Body>
        </Card>
      {/each}
    </div>
  </div>
</Pane>
