<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AppBar from './AppBar.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/App Bar',
    component: AppBar,
    parameters: {
      // AppBar is fixed across all screen sizes — preview it at a mobile viewport.
      viewport: { defaultViewport: 'mobile1' }
    },
    argTypes: {
      title: { control: 'text' },
      subtitle: { control: 'text' },
      size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
      align: { control: 'inline-radio', options: ['start', 'center'] },
      showBack: { control: 'boolean' },
      ghost: { control: 'boolean' }
    },
    args: {
      title: 'Inbox',
      size: 'small',
      align: 'start',
      showBack: false,
      ghost: true
    }
  });
</script>

<script lang="ts">
  let scroller = $state<HTMLElement | null>(null);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'search' }} />
        <ButtonIcon variant="standard" iconProps={{ name: 'more_vert' }} />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story
  name="With Back and Subtitle"
  args={{ title: 'Draft', subtitle: '3 recipients', showBack: true }}
>
  {#snippet template(args)}
    <AppBar {...args} />
  {/snippet}
</Story>

<Story name="Medium flexible" args={{ title: 'Travel plans', size: 'medium', showBack: true }}>
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'search' }} />
        <ButtonIcon variant="standard" iconProps={{ name: 'more_vert' }} />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story
  name="Large flexible"
  args={{ title: 'Travel plans', subtitle: '3 upcoming trips', size: 'large', showBack: true }}
>
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'more_vert' }} />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story name="Centered" args={{ title: 'Product', align: 'center' }}>
  {#snippet template(args)}
    <AppBar {...args}>
      {#snippet leading()}
        <ButtonIcon variant="standard" iconProps={{ name: 'menu' }} aria-label="Menu" />
      {/snippet}
      {#snippet trailing()}
        <ButtonIcon
          variant="standard"
          iconProps={{ name: 'account_circle' }}
          aria-label="Account"
        />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story
  name="Responsive size"
  args={{
    title: 'Travel plans',
    subtitle: 'Resize the viewport',
    size: { small: 'small', medium: 'medium', large: 'large' }
  }}
  parameters={{ viewport: { defaultViewport: 'responsive' } }}
>
  {#snippet template(args)}
    <AppBar {...args} showBack>
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'more_vert' }} aria-label="More" />
      {/snippet}
    </AppBar>
  {/snippet}
</Story>

<Story name="Search" asChild>
  <AppBar search="Search products" title="Products">
    {#snippet leading()}
      <ButtonIcon variant="standard" iconProps={{ name: 'menu' }} aria-label="Menu" />
    {/snippet}
    {#snippet searchTrailing()}
      <ButtonIcon variant="standard" iconProps={{ name: 'mic' }} aria-label="Voice search" />
    {/snippet}
    {#snippet trailing()}
      <ButtonIcon variant="standard" iconProps={{ name: 'account_circle' }} aria-label="Account" />
    {/snippet}
  </AppBar>
</Story>

<Story name="Scroll container" asChild>
  <div bind:this={scroller} class="h-[480px] overflow-y-auto">
    <AppBar title="Scroll this box" scrollContainer={scroller} ghost />
    {#each { length: 40 } as _, i (i)}
      <p class="md-sys-typescale-body-large text-md-sys-color-on-surface px-4 py-2">Row {i + 1}</p>
    {/each}
  </div>
</Story>
