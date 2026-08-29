<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Breadcrumb from './Breadcrumb.svelte';
  import AppBar from '../appbar/AppBar.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    argTypes: {
      color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'surface'] }
    },
    args: {
      color: 'primary',
      items: [
        { label: 'Docs', href: '/docs' },
        { label: 'Navigation', href: '/docs' },
        { label: 'App Bar' }
      ]
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Breadcrumb {...args} />
  {/snippet}
</Story>

<Story name="Deep Trail" asChild>
  <Breadcrumb
    items={[
      { label: 'Home', href: '#' },
      { label: 'Library', href: '#' },
      { label: 'Data', href: '#' },
      { label: 'Sample Files' }
    ]}
  />
</Story>

<Story name="In App Bar" asChild>
  <AppBar title="Sample Files" ghost={false}>
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Sample Files' }
      ]}
    />
  </AppBar>
</Story>
