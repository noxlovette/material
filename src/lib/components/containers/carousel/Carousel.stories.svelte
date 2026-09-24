<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Carousel from './Carousel.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Carousel',
    component: Carousel,
    argTypes: {
      layout: {
        control: 'select',
        options: ['multiBrowse', 'hero', 'centeredHero', 'uncontained', 'fullScreen']
      },
      itemWidth: { control: 'number' },
      snap: { control: 'boolean' },
      outlined: { control: 'boolean' }
    },
    args: { layout: 'multiBrowse', itemWidth: 186, outlined: false }
  });

  type Photo = { title: string; from: string; to: string; ratio: number };

  const tones = ['primary', 'secondary', 'tertiary'];
  const photos: Photo[] = [
    'Coast',
    'Harbour',
    'Dunes',
    'Forest',
    'Glacier',
    'Canyon',
    'Meadow',
    'Reef',
    'Summit',
    'Delta'
  ].map((title, i) => ({
    title,
    from: `var(--color-md-sys-color-${tones[i % 3]})`,
    to: `var(--color-md-sys-color-${tones[(i + 1) % 3]}-container)`,
    ratio: [16 / 9, 9 / 16, 1, 3 / 4][i % 4]
  }));
</script>

<script lang="ts">
  let opened = $state('');
</script>

{#snippet photo(p: Photo, { progress }: { index: number; progress: number })}
  <div
    class="flex h-full w-full items-end p-4"
    style="background: linear-gradient(135deg, {p.from}, {p.to})"
  >
    <span
      class="md-sys-typescale-title-medium text-md-sys-color-on-primary"
      style="opacity: {progress}">{p.title}</span
    >
  </div>
{/snippet}

<Story name="Playground">
  {#snippet template(args)}
    <div class="w-full max-w-xl">
      <Carousel
        items={photos}
        item={photo}
        label="Places"
        layout={args.layout}
        itemWidth={args.itemWidth}
        snap={args.snap}
        outlined={args.outlined}
        class={args.layout === 'fullScreen' ? 'h-[32rem]' : undefined}
      />
    </div>
  {/snippet}
</Story>

<Story name="Multi-browse" asChild>
  <div class="w-full max-w-xl">
    <Carousel items={photos} item={photo} label="Places" onitemclick={(p) => (opened = p.title)} />
    <p class="md-sys-typescale-body-medium mt-2 px-4">
      {opened ? `Opened ${opened}` : 'Tap an item. Drag with the mouse, or Tab through the items.'}
    </p>
  </div>
</Story>

<Story name="Hero" asChild>
  <div class="w-full max-w-xl">
    <Carousel items={photos} item={photo} label="Places" layout="hero" class="h-72" />
  </div>
</Story>

<Story name="Centered hero" asChild>
  <div class="w-full max-w-xl">
    <Carousel items={photos} item={photo} label="Places" layout="centeredHero" class="h-72" />
  </div>
</Story>

<Story name="Uncontained" asChild>
  <div class="w-full max-w-xl">
    <Carousel items={photos} item={photo} label="Places" layout="uncontained" />
  </div>
</Story>

<Story name="Uncontained multi-aspect" asChild>
  <div class="w-full max-w-xl">
    <Carousel
      items={photos}
      item={photo}
      label="Places"
      layout="uncontained"
      itemWidth={(p) => Math.round(208 * p.ratio)}
    />
  </div>
</Story>

<Story name="Full-screen" asChild>
  <div class="h-[36rem] w-80">
    <Carousel items={photos} item={photo} label="Places" layout="fullScreen" class="h-full" />
  </div>
</Story>

<Story name="Outlined and disabled" asChild>
  <div class="w-full max-w-xl">
    <Carousel
      items={photos}
      item={photo}
      label="Places"
      outlined
      itemHref={() => '#'}
      itemDisabled={(_, i) => i === 1}
    />
  </div>
</Story>
