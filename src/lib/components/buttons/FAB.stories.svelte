<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FAB from './FAB.svelte';
  import FABMenuItem from './FABMenuItem.svelte';
  import ListItem from '../containers/list/ListItem.svelte';
  import List from '../containers/list/List.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';

  const colors = [
    'primary-container',
    'secondary-container',
    'tertiary-container',
    'primary',
    'secondary',
    'tertiary'
  ] as const;

  const { Story } = defineMeta({
    title: 'Buttons/FAB',
    component: FAB,
    argTypes: {
      color: { control: 'select', options: colors },
      size: { control: 'select', options: ['small', 'regular', 'medium', 'large'] },
      expanded: { control: 'boolean' },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      color: 'primary-container',
      size: 'regular',
      expanded: false,
      label: 'Compose',
      disabled: false,
      loading: false,
      iconProps: { name: 'edit' }
    }
  });
</script>

<script lang="ts">
  let extended = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <FAB {...args} iconProps={{ name: 'edit' }} />
  {/snippet}
</Story>

<Story name="Sizes" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex items-end">
    <FAB size="regular" aria-label="Compose" iconProps={{ name: 'edit' }} />
    <FAB size="medium" aria-label="Compose" iconProps={{ name: 'edit' }} />
    <FAB size="large" aria-label="Compose" iconProps={{ name: 'edit' }} />
    <FAB size="small" aria-label="Compose (baseline small)" iconProps={{ name: 'edit' }} />
  </div>
</Story>

<Story name="Colours" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex flex-wrap">
    {#each colors as color (color)}
      <FAB {color} aria-label={color} iconProps={{ name: 'edit' }} />
    {/each}
  </div>
</Story>

<Story name="Extended" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex flex-col items-start">
    <FAB expanded label="Compose" iconProps={{ name: 'edit' }} />
    <FAB size="medium" expanded label="Compose" iconProps={{ name: 'edit' }} />
    <FAB size="large" expanded label="Compose" iconProps={{ name: 'edit' }} />
  </div>
</Story>

<Story name="Responsive" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex flex-col items-start">
    <label class="md-sys-typescale-body-medium gap-spacing-100 flex items-center">
      <input type="checkbox" bind:checked={extended} /> Extended
    </label>
    <FAB expanded={extended} label="Create" iconProps={{ name: 'add' }} />
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant max-w-md">
      By default a labelled FAB is a FAB on compact windows and extended from medium windows up;
      resize the preview to see it transform.
    </p>
    <FAB label="Create" iconProps={{ name: 'add' }} />
  </div>
</Story>

<Story
  name="FAB menu"
  exportName="FabMenu"
  parameters={{ docs: { story: { inline: false, height: '28rem' } } }}
>
  {#snippet template()}
    <div class="end-spacing-200 bottom-spacing-200 gap-spacing-200 fixed flex">
      <FAB
        withMenu
        size="medium"
        color="tertiary-container"
        aria-label="New"
        iconProps={{ name: 'add' }}
      >
        <FABMenuItem iconProps={{ name: 'chat' }}>Message</FABMenuItem>
        <FABMenuItem iconProps={{ name: 'folder' }}>Folder</FABMenuItem>
        <FABMenuItem iconProps={{ name: 'upload' }}>Upload</FABMenuItem>
      </FAB>
      <FAB withMenu aria-label="New" iconProps={{ name: 'add' }}>
        <FABMenuItem iconProps={{ name: 'chat' }}>Message</FABMenuItem>
        <FABMenuItem iconProps={{ name: 'folder' }}>Folder</FABMenuItem>
        <FABMenuItem iconProps={{ name: 'upload' }}>Upload</FABMenuItem>
      </FAB>
    </div>
  {/snippet}
</Story>

<Story
  name="Container transform"
  parameters={{ docs: { story: { inline: false, height: '32rem' } } }}
>
  {#snippet template()}
    <div class="end-spacing-200 bottom-spacing-200 fixed">
      <FAB label="Compose" iconProps={{ name: 'edit' }} expanded={false}>
        {#snippet surface({ close })}
          <List>
            {#each ['Lily MacDonald', 'So Duri', 'Ziad Aouad'] as name (name)}
              <ListItem headline={name} onclick={close}>
                {#snippet leading()}<Icon name="person" />{/snippet}
              </ListItem>
            {/each}
            <ListItem headline="Compose new" onclick={close}>
              {#snippet leading()}<Icon name="edit" />{/snippet}
            </ListItem>
          </List>
        {/snippet}
      </FAB>
    </div>
  {/snippet}
</Story>
