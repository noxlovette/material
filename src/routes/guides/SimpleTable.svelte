<!-- A guide table from plain strings; `backticked` spans render as inline code. -->
<script lang="ts">
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/index.js';
  import Code from './Code.svelte';

  let { headers, rows }: { headers: string[]; rows: string[][] } = $props();

  const parts = (text: string) => text.split('`').map((t, i) => ({ t, code: i % 2 === 1 }));
</script>

{#snippet rich(text: string)}
  {#each parts(text) as part, i (i)}
    {#if part.code}<Code>{part.t}</Code>{:else}{part.t}{/if}
  {/each}
{/snippet}

<div class="overflow-x-auto">
  <Table rounded>
    <TableHead>
      <TableRow>
        {#each headers as header (header)}
          <TableHeader>{header}</TableHeader>
        {/each}
      </TableRow>
    </TableHead>
    <TableBody>
      {#each rows as row, r (r)}
        <TableRow>
          {#each row as cell, c (c)}
            <TableCell>{@render rich(cell)}</TableCell>
          {/each}
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>
