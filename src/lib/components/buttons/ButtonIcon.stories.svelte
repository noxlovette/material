<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonIcon from './ButtonIcon.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Button Icon',
    component: ButtonIcon,
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
      width: {
        control: 'select',
        options: ['default', 'narrow', 'wide']
      },
      shape: {
        control: 'select',
        options: ['round', 'square']
      },
      variation: {
        control: 'select',
        options: ['default', 'toggle']
      },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' },
      tooltipContent: { control: 'text' }
    },
    args: {
      variant: 'text',
      color: 'primary',
      size: 'md',
      width: 'default',
      shape: 'round',
      variation: 'default',
      disabled: false,
      loading: false,
      iconProps: { name: 'favorite' },
      tooltipContent: 'Favorite'
    }
  });
</script>

<Story name="Playground" />

<Story name="Variants" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <ButtonIcon variant="elevated" color="primary" iconProps={{ name: 'favorite' }} />
    <ButtonIcon variant="filled" color="primary" iconProps={{ name: 'favorite' }} />
    <ButtonIcon variant="tonal" color="primary" iconProps={{ name: 'favorite' }} />
    <ButtonIcon variant="outlined" color="primary" iconProps={{ name: 'favorite' }} />
    <ButtonIcon variant="text" color="primary" iconProps={{ name: 'favorite' }} />
    <ButtonIcon variant="bare" color="primary" iconProps={{ name: 'favorite' }} />
  </div>
</Story>

<Story name="Toggle" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <ButtonIcon
      variation="toggle"
      variant="tonal"
      iconProps={{ name: 'star' }}
      tooltipContent="Star"
    />
  </div>
</Story>
