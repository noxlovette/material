<!--
  SideSheet is controlled with `bind:open`. A modal sheet closes itself (close button, Esc,
  scrim tap). A standard sheet sits in the layout: put it last in a full-height row and the
  content beside it reflows as it opens and closes.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SideSheet from './SideSheet.svelte';
  import Button from '../../buttons/Button.svelte';
  import Checkbox from '../../forms/checkbox/Checkbox.svelte';
  import List from '../list/List.svelte';
  import ListItem from '../list/ListItem.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Side Sheet',
    component: SideSheet,
    argTypes: {
      headline: { control: 'text' },
      width: { control: { type: 'range', min: 256, max: 400, step: 8 } },
      detached: { control: 'boolean' },
      divider: { control: 'boolean' }
    },
    args: { headline: 'Filters', width: 256, detached: false, divider: true }
  });

  const filters = ['In stock', 'Free delivery', 'On sale', 'Recycled materials', 'Local sellers'];
</script>

<script lang="ts">
  let playgroundOpen = $state(false);
  let detailOpen = $state(false);
  let detailPage = $state<'list' | 'item'>('list');
  let standardOpen = $state(true);
  let detachedOpen = $state(true);
</script>

{#snippet filterList()}
  <div class="flex flex-col gap-4">
    {#each filters as f (f)}
      <Checkbox labelText={f} />
    {/each}
  </div>
{/snippet}

{#snippet saveCancel(close: () => void)}
  <Button onclick={close}>Save</Button>
  <Button variant="outlined" onclick={close}>Cancel</Button>
{/snippet}

<Story name="Modal">
  {#snippet template(args)}
    <div class="p-6">
      <Button onclick={() => (playgroundOpen = true)}>Show filters</Button>
      <SideSheet
        headline={args.headline}
        width={args.width}
        detached={args.detached}
        divider={args.divider}
        bind:open={playgroundOpen}
      >
        {@render filterList()}
        {#snippet actions()}
          {@render saveCancel(() => (playgroundOpen = false))}
        {/snippet}
      </SideSheet>
    </div>
  {/snippet}
</Story>

<Story name="Modal with back button" asChild>
  <div class="p-6">
    <Button
      onclick={() => {
        detailPage = 'list';
        detailOpen = true;
      }}>Show orders</Button
    >
    <SideSheet
      headline={detailPage === 'list' ? 'Orders' : 'Order 1042'}
      width={360}
      bind:open={detailOpen}
      onback={detailPage === 'item' ? () => (detailPage = 'list') : undefined}
    >
      {#if detailPage === 'list'}
        <List class="-mx-6">
          {#each [1042, 1041, 1040] as n (n)}
            <ListItem
              headline="Order {n}"
              supporting="3 items · delivered"
              onclick={() => (detailPage = 'item')}
            />
          {/each}
        </List>
      {:else}
        <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
          The back button appears when the sheet navigates within itself, and the header's start
          padding drops from 24dp to 16dp.
        </p>
      {/if}
    </SideSheet>
  </div>
</Story>

<Story name="Standard" asChild>
  <div class="bg-md-sys-color-surface flex h-[36rem] w-full">
    <main class="flex min-w-0 flex-1 flex-col items-start gap-4 p-6">
      <p class="md-sys-typescale-body-large max-w-md">
        The standard sheet is part of the layout: this column reflows as it opens and closes, and
        stays usable while it's open.
      </p>
      <Button variant="tonal" onclick={() => (standardOpen = !standardOpen)}>
        {standardOpen ? 'Hide filters' : 'Show filters'}
      </Button>
    </main>
    <SideSheet variant="standard" headline="Filters" width={320} bind:open={standardOpen}>
      {@render filterList()}
      {#snippet actions()}
        {@render saveCancel(() => (standardOpen = false))}
      {/snippet}
    </SideSheet>
  </div>
</Story>

<Story name="Standard detached" asChild>
  <div class="bg-md-sys-color-surface-container flex h-[36rem] w-full">
    <main class="flex min-w-0 flex-1 flex-col items-start gap-4 p-6">
      <Button variant="tonal" onclick={() => (detachedOpen = !detachedOpen)}>
        {detachedOpen ? 'Hide details' : 'Show details'}
      </Button>
    </main>
    <SideSheet variant="standard" detached headline="Details" width={320} bind:open={detachedOpen}>
      <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
        Detached sheets float 16dp from the window edges with 16dp corners.
      </p>
    </SideSheet>
  </div>
</Story>
