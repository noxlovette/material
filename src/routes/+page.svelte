<script lang="ts">
  import { Body, Card, Display, Icon, Pane, Title } from '$lib/index.js';
  import { storybookHref } from './storybook.js';
  import { guides, guideHref } from './guides/nav.js';

  const cta = [
    {
      title: 'Components',
      description:
        'Every component and variant, live, with its props and usage rules, in Storybook.',
      href: storybookHref(),
      icon: 'widgets' as const,
      external: true
    },
    {
      title: 'Get started',
      description:
        'Install, import the CSS, wrap your app. Then theming, tokens, layout and motion.',
      href: guideHref('get-started'),
      icon: 'rocket_launch' as const,
      external: false
    }
  ];
</script>

<svelte:head>
  <title>Material for Svelte</title>
</svelte:head>

<Pane padding="lg" contentClass="mx-auto max-w-6xl">
  <div class="gap-spacing-600 py-spacing-600 flex flex-col">
    <header class="gap-spacing-200 flex flex-col">
      <Display size="large">Material for Svelte</Display>
      <Body size="large" class="text-md-sys-color-on-surface-variant max-w-2xl">
        Material Design 3 Expressive components for Svelte 5 and Tailwind CSS 4, built on Bits UI:
        dynamic color, the full type scale and spacing tokens, and spring motion throughout.
      </Body>
    </header>

    <div class="gap-spacing-300 grid grid-cols-1 md:grid-cols-2">
      {#each cta as item (item.title)}
        <Card
          type="elevated"
          padding="lg"
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          class="gap-spacing-200 flex flex-col"
        >
          <div class="gap-spacing-150 flex items-center">
            <Icon name={item.icon} class="text-md-sys-color-primary" />
            <Title size="large">{item.title}</Title>
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{item.description}</Body>
        </Card>
      {/each}
    </div>

    <section class="gap-spacing-200 flex flex-col">
      <Title size="large">Guides</Title>
      <div class="gap-spacing-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {#each guides as guide (guide.slug)}
          <Card
            type="outlined"
            padding="md"
            href={guideHref(guide.slug)}
            class="gap-spacing-100 flex flex-col"
          >
            <div class="gap-spacing-150 flex items-center">
              <Icon name={guide.icon} size="sm" class="text-md-sys-color-primary" />
              <Title size="medium">{guide.title}</Title>
            </div>
            <Body size="small" class="text-md-sys-color-on-surface-variant">{guide.summary}</Body>
          </Card>
        {/each}
      </div>
    </section>
  </div>
</Pane>
