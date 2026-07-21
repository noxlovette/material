<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Display from './Display.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Display',
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
  <div class="flex flex-col gap-4 p-6">
    <Display size="small">Display small</Display>
    <Display size="medium">Display medium</Display>
    <Display size="large">Display large</Display>
  </div>
</Story>
