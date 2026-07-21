<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Headline from './Headline.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Headline',
    component: Headline,
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

<Story name="Playground">Headline text</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-col gap-4 p-6">
    <Headline size="small">Headline small</Headline>
    <Headline size="medium">Headline medium</Headline>
    <Headline size="large">Headline large</Headline>
  </div>
</Story>
