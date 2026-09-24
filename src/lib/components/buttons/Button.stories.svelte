<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const variants = ['elevated', 'filled', 'tonal', 'outlined', 'text'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const { Story } = defineMeta({
    title: 'Buttons/Button',
    component: Button,
    argTypes: {
      variant: { control: 'select', options: variants },
      size: { control: 'select', options: sizes },
      shape: { control: 'inline-radio', options: ['round', 'square'] },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      variant: 'filled',
      size: 'sm',
      shape: 'round',
      disabled: false,
      loading: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Button {...args}>Label</Button>
  {/snippet}
</Story>

<Story name="Colour styles" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    {#each variants as variant (variant)}
      <Button {variant}>{variant[0].toUpperCase() + variant.slice(1)}</Button>
    {/each}
  </div>
</Story>

<Story name="With icon" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    {#each variants as variant (variant)}
      <Button {variant} iconProps={{ name: 'add' }}>Create</Button>
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-col items-start gap-4 p-6">
    {#each sizes as size (size)}
      <div class="flex items-center gap-4">
        <Button {size} iconProps={{ name: 'send' }}>Send</Button>
        <Button {size} shape="square" variant="tonal" iconProps={{ name: 'send' }}>Send</Button>
        <Button {size} variant="outlined">Cancel</Button>
      </div>
    {/each}
  </div>
</Story>

<Story name="Round and square" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Button size="md">Round</Button>
    <Button size="md" shape="square">Square</Button>
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-full">
      Press and hold: both morph to the same smaller corner.
    </p>
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    {#each variants as variant (variant)}
      <Button {variant} disabled>{variant}</Button>
    {/each}
  </div>
</Story>

<Story name="Link" asChild>
  <div class="flex gap-4 p-6">
    <Button href="#" variant="text">Learn more</Button>
    <Button href="#" variant="outlined" disabled>Disabled link</Button>
  </div>
</Story>
