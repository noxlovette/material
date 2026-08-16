<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from './ContextMenu.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Context Menu',
    component: ContextMenu
  });
</script>

<Story name="Playground" asChild>
  <ContextMenu
    items={[
      { label: 'Edit', value: 'edit', iconProps: { name: 'edit' } },
      { label: 'Duplicate', value: 'duplicate', iconProps: { name: 'content_copy' } },
      { separator: true },
      { label: 'Delete', value: 'delete', iconProps: { name: 'delete' } }
    ]}
    onselect={(value) => console.log('selected', value)}
  >
    <div
      class="border-md-sys-color-outline text-md-sys-color-on-surface-variant flex size-40 items-center justify-center rounded-lg border border-dashed"
    >
      Right click me
    </div>
  </ContextMenu>
</Story>

<Story name="With Submenu" asChild>
  <ContextMenu
    items={[
      { label: 'Edit', value: 'edit', iconProps: { name: 'edit' } },
      { separator: true },
      {
        label: 'Share',
        value: 'share',
        iconProps: { name: 'share' },
        items: [
          { label: 'Email', value: 'email' },
          { label: 'Link', value: 'link' }
        ]
      },
      { separator: true },
      { label: 'Delete', value: 'delete', iconProps: { name: 'delete' } }
    ]}
    onselect={(value) => console.log('selected', value)}
  >
    <div
      class="border-md-sys-color-outline text-md-sys-color-on-surface-variant flex size-40 items-center justify-center rounded-lg border border-dashed"
    >
      Right click me
    </div>
  </ContextMenu>
</Story>

<Story name="With Selected Item" asChild>
  <ContextMenu
    selected="name"
    items={[
      { label: 'Name', value: 'name' },
      { label: 'Date modified', value: 'date' },
      { label: 'Size', value: 'size' }
    ]}
  >
    <div
      class="border-md-sys-color-outline text-md-sys-color-on-surface-variant flex size-40 items-center justify-center rounded-lg border border-dashed"
    >
      Right click me
    </div>
  </ContextMenu>
</Story>
