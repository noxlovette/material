<!--
  Menu owns its own open/close state internally (bits-ui DropdownMenu.Root bind:open, defaulting
  to closed) and renders a default filled Button trigger when no `trigger` snippet is supplied —
  so unlike Dialogue/Popover, no external open state is needed to demo it: clicking the default
  trigger is enough.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Menu from './Menu.svelte';
  import MenuItem from '../menu-item/MenuItem.svelte';
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
      {#snippet trigger()}
        <ButtonIcon iconProps={{ name: 'more_vert' }} variant="text" />
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
