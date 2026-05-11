<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import {
    Table,
    TableHead,
    TableBody,
    TableFoot,
    TableRow,
    TableCell,
    TableHeader,
    Display,
    Headline,
    Body,
    SupportingPane
  } from '$lib/index.js';
  import TableOfContents from '../TableOfContents.svelte';

  // Basic demo data
  const fruits = [
    { name: 'Apple', calories: 95, fat: 0.3, sugar: 19 },
    { name: 'Banana', calories: 105, fat: 0.4, sugar: 14 },
    { name: 'Mango', calories: 201, fat: 0.6, sugar: 46 },
    { name: 'Blueberries', calories: 84, fat: 0.5, sugar: 15 },
    { name: 'Avocado', calories: 234, fat: 21, sugar: 0.4 }
  ];

  // Sortable demo
  type SortKey = 'name' | 'role' | 'status' | 'joined';
  type SortDir = 'asc' | 'desc';

  const people = [
    { name: 'Ada Lovelace', role: 'Engineer', status: 'Active', joined: 2019 },
    { name: 'Grace Hopper', role: 'Architect', status: 'Active', joined: 2021 },
    { name: 'Alan Turing', role: 'Researcher', status: 'Away', joined: 2020 },
    { name: 'Margaret Hamilton', role: 'Engineer', status: 'Active', joined: 2022 },
    { name: 'Donald Knuth', role: 'Consultant', status: 'Inactive', joined: 2018 }
  ];

  let sortKey = $state<SortKey>('name');
  let sortDir = $state<SortDir>('asc');

  function sort(key: SortKey) {
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDir = 'asc';
    }
  }

  const sorted = $derived(
    [...people].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === 'asc' ? cmp : -cmp;
    })
  );

  // Selectable demo
  let selected = $state<Set<string>>(new Set());

  function toggle(name: string) {
    const next = new Set(selected);
    next.has(name) ? next.delete(name) : next.add(name);
    selected = next;
  }

  const statusColor: Record<string, string> = {
    Active: 'text-md-sys-color-primary',
    Away: 'text-md-sys-color-tertiary',
    Inactive: 'text-md-sys-color-outline'
  };

  const toc = [
    { id: 'basic', label: 'Basic Table' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'sortable', label: 'Sortable' },
    { id: 'selectable', label: 'Selectable Rows' },
    { id: 'footer', label: 'With Footer' },
    { id: 'sticky', label: 'Sticky Header' }
  ];
</script>

<svelte:head>
  <title>Table | Ogonëk M3</title>
</svelte:head>

<SupportingPane anchor="parent" centered={false}>
  {#snippet main()}
    <SinglePane contentClass="gap-12 p-12">
      <!-- BASIC -->
      <section id="basic" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Table</Display>
        <Body class="max-w-2xl">
          Primitive table components following MD3 data table guidelines. Compose
          <code>Table</code>, <code>TableHead</code>, <code>TableBody</code>,
          <code>TableRow</code>, <code>TableHeader</code>, and <code>TableCell</code> freely.
        </Body>

        <Headline>Basic</Headline>
        <div class="outline-md-sys-color-outline-variant overflow-hidden rounded-lg outline">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Fruit</TableHeader>
                <TableHeader numeric>Calories</TableHeader>
                <TableHeader numeric>Fat (g)</TableHeader>
                <TableHeader numeric>Sugar (g)</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {#each fruits as row}
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell numeric>{row.calories}</TableCell>
                  <TableCell numeric>{row.fat}</TableCell>
                  <TableCell numeric>{row.sugar}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      </section>

      <!-- ROUNDED -->
      <section id="rounded" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Rounded</Headline>
        <Body
          >Pass <code>rounded</code> to give the table its own ring border and rounded corners. No wrapper
          div needed.</Body
        >
        <Table rounded>
          <TableHead>
            <TableRow>
              <TableHeader>Fruit</TableHeader>
              <TableHeader numeric>Calories</TableHeader>
              <TableHeader numeric>Fat (g)</TableHeader>
              <TableHeader numeric>Sugar (g)</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {#each fruits as row}
              <TableRow>
                <TableCell>{row.name}</TableCell>
                <TableCell numeric>{row.calories}</TableCell>
                <TableCell numeric>{row.fat}</TableCell>
                <TableCell numeric>{row.sugar}</TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </section>

      <!-- SORTABLE -->
      <section id="sortable" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Sortable</Headline>
        <Body>Click any column header to sort. Click again to reverse.</Body>
        <div
          class="outline-md-sys-color-outline-variant overflow-hidden rounded-lg outline outline-1"
        >
          <Table>
            <TableHead>
              <TableRow>
                {#each ['name', 'role', 'status', 'joined'] as SortKey[] as key}
                  <TableHeader
                    sortable
                    sorted={sortKey === key}
                    sortDirection={sortDir}
                    onclick={() => sort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableHeader>
                {/each}
              </TableRow>
            </TableHead>
            <TableBody>
              {#each sorted as row}
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <span class={statusColor[row.status]}>{row.status}</span>
                  </TableCell>
                  <TableCell numeric>{row.joined}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      </section>

      <!-- SELECTABLE -->
      <section id="selectable" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Selectable Rows</Headline>
        <Body
          >Click a row to toggle selection. Selected rows use the secondary-container token.</Body
        >
        <div
          class="outline-md-sys-color-outline-variant overflow-hidden rounded-lg outline outline-1"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader numeric>Joined</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {#each people as row}
                <TableRow
                  hoverable
                  selected={selected.has(row.name)}
                  onclick={() => toggle(row.name)}
                  role="button"
                  tabindex={0}
                  onkeydown={(e) => e.key === 'Enter' && toggle(row.name)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell numeric>{row.joined}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
        {#if selected.size > 0}
          <Body>{selected.size} row{selected.size > 1 ? 's' : ''} selected</Body>
        {/if}
      </section>

      <!-- FOOTER -->
      <section id="footer" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>With Footer</Headline>
        <div
          class="outline-md-sys-color-outline-variant overflow-hidden rounded-lg outline outline-1"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Fruit</TableHeader>
                <TableHeader numeric>Calories</TableHeader>
                <TableHeader numeric>Fat (g)</TableHeader>
                <TableHeader numeric>Sugar (g)</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {#each fruits as row}
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell numeric>{row.calories}</TableCell>
                  <TableCell numeric>{row.fat}</TableCell>
                  <TableCell numeric>{row.sugar}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableCell class="font-medium">Total</TableCell>
                <TableCell numeric class="font-medium">
                  {fruits.reduce((s, r) => s + r.calories, 0)}
                </TableCell>
                <TableCell numeric class="font-medium">
                  {fruits.reduce((s, r) => s + r.fat, 0).toFixed(1)}
                </TableCell>
                <TableCell numeric class="font-medium">
                  {fruits.reduce((s, r) => s + r.sugar, 0).toFixed(1)}
                </TableCell>
              </TableRow>
            </TableFoot>
          </Table>
        </div>
      </section>

      <!-- STICKY HEADER -->
      <section id="sticky" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Sticky Header</Headline>
        <Body>The header stays pinned when the table overflows its container.</Body>
        <div
          class="outline-md-sys-color-outline-variant max-h-56 overflow-auto rounded-lg outline outline-1"
        >
          <Table>
            <TableHead sticky>
              <TableRow>
                <TableHeader>Fruit</TableHeader>
                <TableHeader numeric>Calories</TableHeader>
                <TableHeader numeric>Fat (g)</TableHeader>
                <TableHeader numeric>Sugar (g)</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {#each [...fruits, ...fruits, ...fruits] as row, i}
                <TableRow>
                  <TableCell numeric>{row.calories}</TableCell>
                  <TableCell numeric>{row.fat}</TableCell>
                  <TableCell numeric>{row.sugar}</TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      </section>
    </SinglePane>
  {/snippet}

  {#snippet supporting()}
    <TableOfContents sections={toc} />
  {/snippet}
</SupportingPane>
