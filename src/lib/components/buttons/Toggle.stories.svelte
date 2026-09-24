<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toggle from './Toggle.svelte';

  const variants = ['elevated', 'filled', 'tonal', 'outlined'] as const;

  const { Story } = defineMeta({
    title: 'Buttons/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    argTypes: {
      variant: { control: 'select', options: variants },
      size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      shape: { control: 'inline-radio', options: ['round', 'square'] },
      pressed: { control: 'boolean' },
      disabled: { control: 'boolean' }
    },
    args: {
      variant: 'filled',
      size: 'sm',
      shape: 'round',
      pressed: false,
      disabled: false
    }
  });
</script>

<script lang="ts">
  let selected = $state<Record<string, boolean>>({ tonal: true, outlined: true });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Toggle {...args} iconProps={{ name: 'bookmark' }}>Save</Toggle>
  {/snippet}
</Story>

<Story name="Colour styles" asChild>
  <div class="grid grid-cols-[auto_auto] items-center justify-start gap-4 p-6">
    {#each variants as variant (variant)}
      <Toggle {variant} iconProps={{ name: 'favorite' }}>{variant}</Toggle>
      <Toggle {variant} pressed iconProps={{ name: 'favorite' }}>{variant}</Toggle>
    {/each}
  </div>
</Story>

<Story name="Shape swap" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Toggle size="md" bind:pressed={selected.tonal} variant="tonal">Round → square</Toggle>
    <Toggle size="md" bind:pressed={selected.outlined} variant="outlined" shape="square">
      Square → round
    </Toggle>
  </div>
</Story>
