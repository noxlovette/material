<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Button',
    component: Button,
    argTypes: {
      variant: {
        control: 'select',
        options: ['elevated', 'filled', 'tonal', 'outlined', 'text', 'bare']
      },
      color: {
        control: 'select',
        options: ['default', 'primary', 'secondary', 'tertiary', 'error']
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      shape: {
        control: 'select',
        options: ['round', 'square']
      },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      variant: 'filled',
      color: 'primary',
      size: 'md',
      shape: 'round',
      disabled: false,
      loading: false
    }
  });
</script>

<Story name="Playground">Label</Story>

<Story name="Variants" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Button variant="elevated" color="primary">Elevated</Button>
    <Button variant="filled" color="primary">Filled</Button>
    <Button variant="tonal" color="primary">Tonal</Button>
    <Button variant="outlined" color="primary">Outlined</Button>
    <Button variant="text" color="primary">Text</Button>
    <Button variant="bare" color="primary">Bare</Button>
  </div>
</Story>
