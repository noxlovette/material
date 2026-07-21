<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Title from './Title.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Title',
    component: Title,
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

<Story name="Playground">Title text</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-col gap-4 p-6">
    <Title size="small">Title small</Title>
    <Title size="medium">Title medium</Title>
    <Title size="large">Title large</Title>
  </div>
</Story>
