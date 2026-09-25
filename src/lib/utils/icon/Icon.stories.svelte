<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Body from '$lib/components/typography/body/Body.svelte';
  import Icon from './Icon.svelte';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const variants = ['rounded', 'outlined', 'sharp'] as const;

  const { Story } = defineMeta({
    title: 'Utils/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
      size: { control: 'select', options: ['inline', ...sizes] },
      variant: { control: 'inline-radio', options: variants },
      fill: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
      wght: { control: { type: 'range', min: 100, max: 700, step: 100 } },
      grad: { control: 'select', options: ['auto', -50, -25, 0, 100, 200] },
      opsz: { control: { type: 'range', min: 20, max: 48, step: 1 } }
    },
    args: { name: 'favorite', size: 'xl', variant: 'rounded', fill: 0, wght: 400, grad: 'auto' }
  });
</script>

<Story name="Playground" />

<Story name="Styles" asChild>
  <div class="gap-spacing-300 flex">
    {#each variants as variant (variant)}
      <Icon name="home" size="lg" {variant} />
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-300 flex items-end">
    {#each sizes as size (size)}
      <Icon name="settings" {size} />
    {/each}
  </div>
</Story>

<Story name="Fill for state" asChild>
  <div class="gap-spacing-300 flex">
    <Icon name="favorite" size="lg" fill={0} />
    <Icon name="favorite" size="lg" fill={1} />
  </div>
</Story>

<Story name="Weights" asChild>
  <div class="gap-spacing-200 flex">
    {#each [200, 300, 400, 500, 600, 700] as wght (wght)}
      <Icon name="search" size="lg" {wght} />
    {/each}
  </div>
</Story>

<Story name="Inline with text" asChild>
  <Body size="large">
    Saved to favorites <Icon name="favorite" size="inline" fill={1} />, shared <Icon
      name="share"
      size="inline"
    />
  </Body>
</Story>
