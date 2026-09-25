<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Avatar from './Avatar.svelte';
  import { shapeNames } from '$lib/animation/shapeMorph.svelte.js';

  const { Story } = defineMeta({
    title: 'Misc/Avatar',
    tags: ['autodocs'],
    component: Avatar,
    argTypes: {
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
      seed: { control: 'text' },
      dicebearStyle: { control: 'text' },
      shape: { control: 'select', options: shapeNames },
      spin: { control: 'inline-radio', options: ['none', 'clockwise', 'counterclockwise'] }
    },
    args: {
      size: 'lg',
      seed: 'ogonek',
      shape: 'circle',
      spin: 'none'
    }
  });
</script>

<script lang="ts">
  const morphShapes = ['circle', 'sunny', 'fourSidedCookie', 'pentagon', 'flower'] as const;
  let morphIndex = $state(0);
  const morphShape = $derived(morphShapes[morphIndex % morphShapes.length]);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Avatar
      size={args.size}
      seed={args.seed}
      dicebearStyle={args.dicebearStyle}
      shape={args.shape}
      spin={args.spin}
    />
  {/snippet}
</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-200 flex items-end">
    <Avatar size="sm" seed="small" />
    <Avatar size="md" seed="medium" />
    <Avatar size="lg" seed="large" />
  </div>
</Story>

<Story name="Generated Fallback" asChild>
  <div class="gap-spacing-200 flex items-end">
    <Avatar seed="alice" />
    <Avatar seed="bob" />
    <Avatar seed="carol" />
  </div>
</Story>

<Story name="With Image" asChild>
  <div class="gap-spacing-200 flex items-end">
    <Avatar src="https://picsum.photos/seed/ogonek-1/200" alt="Sample user" />
    <Avatar
      src="https://this-url-does-not-resolve.example/broken.jpg"
      alt="Broken image"
      seed="fallback"
    />
  </div>
</Story>

<Story name="Clickable" asChild>
  <Avatar seed="clickable" onclick={() => console.log('Avatar clicked')} />
</Story>

<Story name="Styles" asChild>
  <!-- gaze with the animation tag is the default; ['!animation'] forces the still variant. -->
  <div class="gap-spacing-200 flex items-end">
    <Avatar seed="alice" />
    <Avatar seed="alice" tags={['!animation']} />
    <Avatar seed="bob" dicebearStyle="shapes" />
    <Avatar seed="carol" dicebearStyle="blobs" />
  </div>
</Story>

<Story name="Shapes" asChild>
  <div class="gap-spacing-200 grid grid-cols-5 sm:grid-cols-7">
    {#each shapeNames as name (name)}
      <Avatar size="md" seed={name} shape={name} title={name} />
    {/each}
  </div>
</Story>

<Story name="Shape morph" asChild>
  <div class="gap-spacing-200 flex items-center">
    <Avatar seed="morph" shape={morphShape} onclick={() => morphIndex++} />
    <span class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
      Click the avatar: {morphShape}
    </span>
  </div>
</Story>

<Story name="Spin" asChild>
  <div class="gap-spacing-200 flex items-end">
    <Avatar seed="clockwise" shape="sunny" spin="clockwise" />
    <Avatar seed="counter" shape="eightLeafClover" spin="counterclockwise" />
    <Avatar
      seed="burst"
      shape="softBurst"
      spin="clockwise"
      src="https://picsum.photos/seed/ogonek-2/200"
    />
  </div>
</Story>
