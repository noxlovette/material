<!--
  Menu owns its own open/close state internally (bits-ui DropdownMenu.Root bind:open, defaulting
  to closed) and renders a default filled Button trigger when no `trigger` snippet is supplied —
  so unlike Dialogue/Popover, no external open state is needed to demo it: clicking the default
  trigger is enough.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Menu from './Menu.svelte';
  import MenuItem from './menu-item/MenuItem.svelte';
  import MenuGroup from './MenuGroup.svelte';
  import MenuRadioGroup from './MenuRadioGroup.svelte';
  import MenuRadioItem from './MenuRadioItem.svelte';
  import MenuCheckboxItem from './MenuCheckboxItem.svelte';
  import MenuSub from './MenuSub.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import { Divider } from '$lib/index.js';

  const { Story } = defineMeta({
    title: 'Containers/Menu',
    component: Menu,
    argTypes: {
      label: { control: 'text' },
      align: { control: 'select', options: ['start', 'center', 'end'] }
    },
    args: {
      label: 'Open menu',
      align: 'start'
    }
  });
</script>

<script lang="ts">
  let sortBy = $state('name');
  let showHidden = $state(true);
  let showExtensions = $state(false);
  let kitchenSinkSort = $state('date');
  let kitchenSinkWordWrap = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-6">
      <Menu label={args.label} align={args.align}>
        <MenuItem iconProps={{ name: 'content_cut' }}>Cut</MenuItem>
        <MenuItem iconProps={{ name: 'content_copy' }}>Copy</MenuItem>
        <MenuItem iconProps={{ name: 'content_paste' }}>Paste</MenuItem>
      </Menu>
    </div>
  {/snippet}
</Story>

<Story name="With Custom Trigger" asChild>
  <div class="p-6">
    <Menu align="end">
      {#snippet trigger(triggerProps)}
        <ButtonIcon iconProps={{ name: 'more_vert' }} variant="text" {...triggerProps} />
      {/snippet}
      <MenuItem iconProps={{ name: 'edit' }}>Edit</MenuItem>
      <MenuItem iconProps={{ name: 'archive' }} helper="Move to archive folder">Archive</MenuItem>
      <Divider class="my-2" />
      <MenuItem iconProps={{ name: 'delete' }} disabled>Delete</MenuItem>
    </Menu>
  </div>
</Story>

<Story name="With Selected Item" asChild>
  <div class="p-6">
    <Menu label="Sort by">
      <MenuItem selected>Name</MenuItem>
      <MenuItem>Date modified</MenuItem>
      <MenuItem>Size</MenuItem>
    </Menu>
  </div>
</Story>

<Story name="With Groups" asChild>
  <div class="p-6">
    <Menu label="Sort by">
      <MenuGroup heading="Name">
        <MenuItem>A to Z</MenuItem>
        <MenuItem>Z to A</MenuItem>
      </MenuGroup>
      <Divider class="my-1" />
      <MenuGroup heading="Date">
        <MenuItem>Newest first</MenuItem>
        <MenuItem>Oldest first</MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</Story>

<Story name="With Checkboxes" asChild>
  <div class="p-6">
    <Menu label="View">
      <MenuCheckboxItem bind:checked={showHidden}>Show hidden files</MenuCheckboxItem>
      <MenuCheckboxItem bind:checked={showExtensions}>Show file extensions</MenuCheckboxItem>
      <MenuCheckboxItem disabled>Show system files</MenuCheckboxItem>
    </Menu>
  </div>
</Story>

<Story name="With Radio Group" asChild>
  <div class="p-6">
    <Menu label="Sort by">
      <MenuRadioGroup bind:value={sortBy}>
        <MenuRadioItem value="name">Name</MenuRadioItem>
        <MenuRadioItem value="date">Date modified</MenuRadioItem>
        <MenuRadioItem value="size">Size</MenuRadioItem>
      </MenuRadioGroup>
    </Menu>
  </div>
</Story>

<Story name="With Submenu" asChild>
  <div class="p-6">
    <Menu label="File">
      <MenuItem iconProps={{ name: 'draft' }}>New</MenuItem>
      <MenuItem iconProps={{ name: 'folder' }}>Open</MenuItem>
      <MenuSub iconProps={{ name: 'ios_share' }}>
        Share
        {#snippet submenu()}
          <MenuItem iconProps={{ name: 'mail' }}>Email</MenuItem>
          <MenuItem iconProps={{ name: 'link' }}>Copy link</MenuItem>
          <MenuSub iconProps={{ name: 'chat' }}>
            Message
            {#snippet submenu()}
              <MenuItem>SMS</MenuItem>
              <MenuItem>Direct message</MenuItem>
            {/snippet}
          </MenuSub>
        {/snippet}
      </MenuSub>
      <Divider class="my-1" />
      <MenuItem iconProps={{ name: 'delete' }}>Delete</MenuItem>
    </Menu>
  </div>
</Story>

<Story name="Kitchen Sink" asChild>
  <div class="p-6">
    <Menu label="Document">
      <MenuGroup heading="Sort by">
        <MenuRadioGroup bind:value={kitchenSinkSort}>
          <MenuRadioItem value="name">Name</MenuRadioItem>
          <MenuRadioItem value="date">Date modified</MenuRadioItem>
        </MenuRadioGroup>
      </MenuGroup>
      <Divider class="my-1" />
      <MenuGroup heading="View">
        <MenuCheckboxItem bind:checked={kitchenSinkWordWrap}>Word wrap</MenuCheckboxItem>
      </MenuGroup>
      <Divider class="my-1" />
      <MenuSub iconProps={{ name: 'ios_share' }}>
        Share
        {#snippet submenu()}
          <MenuItem iconProps={{ name: 'mail' }}>Email</MenuItem>
          <MenuItem iconProps={{ name: 'link' }}>Copy link</MenuItem>
        {/snippet}
      </MenuSub>
      <MenuItem iconProps={{ name: 'delete' }} disabled>Delete</MenuItem>
    </Menu>
  </div>
</Story>
