<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Body from './Body.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Body',
    tags: ['autodocs'],
    component: Body,
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

<Story name="Playground">Body text used for longer passages of content.</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-col">
    <Body size="small">Body small</Body>
    <Body size="medium">Body medium</Body>
    <Body size="large">Body large</Body>
  </div>
</Story>
