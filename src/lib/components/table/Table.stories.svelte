<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Table from './Table.svelte';
  import TableHead from './TableHead.svelte';
  import TableBody from './TableBody.svelte';
  import TableFoot from './TableFoot.svelte';
  import TableRow from './TableRow.svelte';
  import TableHeader from './TableHeader.svelte';
  import TableCell from './TableCell.svelte';

  const { Story } = defineMeta({
    title: 'Table/Table',
    component: Table,
    argTypes: {
      rounded: { control: 'boolean' }
    },
    args: {
      rounded: false
    }
  });

  const rows = [
    { name: 'Frozen yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 }
  ];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Table rounded={args.rounded}>
      <TableHead>
        <TableRow>
          <TableHeader>Dessert</TableHeader>
          <TableHeader numeric>Calories</TableHeader>
          <TableHeader numeric>Fat (g)</TableHeader>
          <TableHeader numeric>Carbs (g)</TableHeader>
          <TableHeader numeric>Protein (g)</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {#each rows as row (row.name)}
          <TableRow hoverable>
            <TableCell>{row.name}</TableCell>
            <TableCell numeric>{row.calories}</TableCell>
            <TableCell numeric>{row.fat}</TableCell>
            <TableCell numeric>{row.carbs}</TableCell>
            <TableCell numeric>{row.protein}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  {/snippet}
</Story>

<Story name="Rounded" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader>Dessert</TableHeader>
        <TableHeader numeric>Calories</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row (row.name)}
        <TableRow>
          <TableCell>{row.name}</TableCell>
          <TableCell numeric>{row.calories}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</Story>

<Story name="Sortable Header" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader sortable sorted sortDirection="asc">Dessert</TableHeader>
        <TableHeader numeric sortable sortDirection="desc">Calories</TableHeader>
        <TableHeader numeric sortable>Fat (g)</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row (row.name)}
        <TableRow hoverable>
          <TableCell>{row.name}</TableCell>
          <TableCell numeric>{row.calories}</TableCell>
          <TableCell numeric>{row.fat}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</Story>

<Story name="Selected Row" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader>Dessert</TableHeader>
        <TableHeader numeric>Calories</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row, i (row.name)}
        <TableRow hoverable selected={i === 1}>
          <TableCell>{row.name}</TableCell>
          <TableCell numeric>{row.calories}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</Story>

<Story name="With Footer" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader>Dessert</TableHeader>
        <TableHeader numeric>Calories</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row (row.name)}
        <TableRow>
          <TableCell>{row.name}</TableCell>
          <TableCell numeric>{row.calories}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
    <TableFoot>
      <TableRow>
        <TableCell>Total</TableCell>
        <TableCell numeric>{rows.reduce((sum, r) => sum + r.calories, 0)}</TableCell>
      </TableRow>
    </TableFoot>
  </Table>
</Story>

<Story name="Sticky Header (Scroll Container)" asChild>
  <div class="ring-md-sys-color-outline-variant h-64 w-full overflow-auto rounded-md ring-1">
    <Table>
      <TableHead sticky>
        <TableRow>
          <TableHeader>Dessert</TableHeader>
          <TableHeader numeric>Calories</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {#each Array(30) as _, i (i)}
          <TableRow hoverable>
            <TableCell>Row {i + 1}</TableCell>
            <TableCell numeric>{100 + i}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
</Story>

<Story name="Extreme: Long Cell Content" asChild>
  <div class="w-[420px]">
    <Table rounded>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Description</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell
            >This is an unusually long piece of supporting text that will wrap across multiple lines
            inside a fixed-width table cell to check padding, line-height, and vertical alignment
            under wrapping conditions.</TableCell
          >
        </TableRow>
        <TableRow>
          <TableCell
            >SupercalifragilisticexpialidociousItemNameWithNoSpacesWhatsoeverToTestOverflow</TableCell
          >
          <TableCell>Short</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</Story>

<Story name="Extreme: Many Columns (Horizontal Scroll)" asChild>
  <div class="w-full max-w-[600px] overflow-x-auto">
    <Table rounded>
      <TableHead>
        <TableRow>
          {#each Array(12) as _, i (i)}
            <TableHeader numeric>Col {i + 1}</TableHeader>
          {/each}
        </TableRow>
      </TableHead>
      <TableBody>
        {#each Array(3) as _, r (r)}
          <TableRow>
            {#each Array(12) as _, c (c)}
              <TableCell numeric>{r * 12 + c}</TableCell>
            {/each}
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </div>
</Story>

<Story name="Extreme: Single Row" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader>Dessert</TableHeader>
        <TableHeader numeric>Calories</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Frozen yogurt</TableCell>
        <TableCell numeric>159</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story name="Extreme: Empty State" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader>Dessert</TableHeader>
        <TableHeader numeric>Calories</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell class="text-md-sys-color-on-surface-variant text-center" colspan={2}
          >No results found</TableCell
        >
      </TableRow>
    </TableBody>
  </Table>
</Story>

<Story name="Mixed Alignment" asChild>
  <Table rounded>
    <TableHead>
      <TableRow>
        <TableHeader align="left">Left</TableHeader>
        <TableHeader align="center">Center</TableHeader>
        <TableHeader align="right">Right</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell align="left">L</TableCell>
        <TableCell align="center">C</TableCell>
        <TableCell align="right">R</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Story>
