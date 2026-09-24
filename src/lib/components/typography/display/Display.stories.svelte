<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Display from './Display.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Display',
    tags: ['autodocs'],
    component: Display,
    argTypes: {
      size: {
        control: 'select',
        options: ['small', 'medium', 'large']
      },
      emphasized: { control: 'boolean' }
    },
    args: {
      size: 'medium',
      emphasized: false
    }
  });
</script>

<Story name="Playground">Display text</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-col">
    <Display size="small">Display small</Display>
    <Display size="medium">Display medium</Display>
    <Display size="large">Display large</Display>
  </div>
</Story>
