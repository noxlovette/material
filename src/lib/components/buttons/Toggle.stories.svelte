<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toggle from './Toggle.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Toggle',
    component: Toggle,
    argTypes: {
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      shape: {
        control: 'select',
        options: ['round', 'square']
      },
      pressed: { control: 'boolean' },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      size: 'md',
      shape: 'round',
      pressed: false,
      disabled: false,
      loading: false
    }
  });
</script>

<Story name="Playground">Toggle</Story>

<Story name="With Icon" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Toggle iconProps={{ name: 'format_bold' }}>Bold</Toggle>
    <Toggle iconProps={{ name: 'format_italic' }} pressed>Italic</Toggle>
  </div>
</Story>

<Story name="States" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Toggle>Unpressed</Toggle>
    <Toggle pressed>Pressed</Toggle>
    <Toggle disabled>Disabled</Toggle>
  </div>
</Story>
