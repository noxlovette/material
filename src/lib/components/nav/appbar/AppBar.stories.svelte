<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AppBar from './AppBar.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/App Bar',
    component: AppBar,
    parameters: {
      // AppBar is the mobile top bar (md:hidden) — preview it at a mobile viewport.
      viewport: { defaultViewport: 'mobile1' }
    },
    argTypes: {
      title: { control: 'text' },
      subtitle: { control: 'text' },
      showBack: { control: 'boolean' },
      ghost: { control: 'boolean' }
    },
    args: {
      title: 'Inbox',
      showBack: false,
      ghost: true
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet trailing()}
        <ButtonIcon variant="text" iconProps={{ name: 'search' }} />
        <ButtonIcon variant="text" iconProps={{ name: 'more_vert' }} />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story
  name="With Back and Subtitle"
  args={{ title: 'Draft', subtitle: '3 recipients', showBack: true }}
>
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet leading()}
        <ButtonIcon variant="text" iconProps={{ name: 'arrow_back' }} />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>
