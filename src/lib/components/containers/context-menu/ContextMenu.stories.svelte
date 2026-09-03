<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContextMenu from './ContextMenu.svelte';
  import Table from '../../table/Table.svelte';
  import TableHead from '../../table/TableHead.svelte';
  import TableBody from '../../table/TableBody.svelte';
  import TableRow from '../../table/TableRow.svelte';
  import TableHeader from '../../table/TableHeader.svelte';
  import TableCell from '../../table/TableCell.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Context Menu',
    component: ContextMenu
  });

  const rows = [
    { name: 'Frozen yogurt', calories: 159 },
    { name: 'Ice cream sandwich', calories: 237 },
    { name: 'Eclair', calories: 262 }
  ];
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

<Story name="In Table Row">
  {#snippet template()}
    <Table rounded>
      <TableHead>
        <TableRow>
          <TableHeader>Dessert</TableHeader>
          <TableHeader numeric>Calories</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {#each rows as row (row.name)}
          <ContextMenu
            items={[
              { label: 'Edit', value: 'edit', iconProps: { name: 'edit' } },
              { separator: true },
              { label: 'Delete', value: 'delete', iconProps: { name: 'delete' } }
            ]}
            onselect={(value) => console.log('selected', value, 'for', row.name)}
          >
            {#snippet trigger(props)}
              <TableRow {...props} hoverable>
                <TableCell>{row.name}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
              </TableRow>
            {/snippet}
          </ContextMenu>
        {/each}
      </TableBody>
    </Table>
  {/snippet}
</Story>
