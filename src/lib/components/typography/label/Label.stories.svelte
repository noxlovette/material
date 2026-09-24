<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Label from './Label.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Label',
    tags: ['autodocs'],
    component: Label,
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

<Story name="Playground">Label text</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-col">
    <Label size="small">Label small</Label>
    <Label size="medium">Label medium</Label>
    <Label size="large">Label large</Label>
  </div>
</Story>
