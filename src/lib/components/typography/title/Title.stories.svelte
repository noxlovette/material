<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Title from './Title.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Title',
    tags: ['autodocs'],
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
  <div class="gap-spacing-200 p-spacing-300 flex flex-col">
    <Title size="small">Title small</Title>
    <Title size="medium">Title medium</Title>
    <Title size="large">Title large</Title>
  </div>
</Story>
