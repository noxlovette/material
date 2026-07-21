<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SupportingPane from './SupportingPane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Supporting Pane',
    component: SupportingPane,
    argTypes: {
      anchor: {
        control: 'select',
        options: ['viewport', 'parent']
      },
      position: {
        control: 'select',
        options: ['left', 'right']
      },
      centered: { control: 'boolean' },
      rounded: { control: 'boolean' },
      full: { control: 'boolean' },
      gap: {
        control: 'select',
        options: ['none', 'sm', 'md', 'lg']
      },
      collapsible: { control: 'boolean' },
      supportingWidth: { control: 'number' },
      mobileSheet: { control: 'boolean' }
    },
    args: {
      anchor: 'parent',
      position: 'right',
      centered: false,
      rounded: false,
      full: false,
      gap: 'md',
      collapsible: false,
      supportingWidth: 320,
      mobileSheet: false
    }
  });
</script>

<!--
  anchor="parent" demos meaningfully in a bounded box (classic sticky-while-
  scrolling-the-page behaviour). anchor="viewport" — used by the docs pages'
  own "On this page" TOC — fixes the supporting pane to the true browser edge,
  which only reads correctly on a real scrolling page, not inside Storybook's
  iframe canvas.
-->
<Story name="Playground">
  {#snippet template(args)}
    <SupportingPane {...args}>
      {#snippet main()}
        <div class="flex flex-col gap-4 p-4">
          {#each Array(6) as _, i}
            <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
              Main content block {i + 1}
            </div>
          {/each}
        </div>
      {/snippet}
      {#snippet supporting()}
        <div class="bg-md-sys-color-surface-container rounded-lg p-4">
          <p class="md-sys-typescale-title-small mb-2">Supporting content</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            Fixed-width side panel — e.g. a table of contents or contextual actions.
          </p>
        </div>
      {/snippet}
    </SupportingPane>
  {/snippet}
</Story>

<Story name="Collapsible" asChild>
  <SupportingPane anchor="parent" position="right" collapsible>
    {#snippet main()}
      <div class="flex flex-col gap-4 p-4">
        {#each Array(4) as _, i}
          <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
            Main content block {i + 1}
          </div>
        {/each}
      </div>
    {/snippet}
    {#snippet supporting()}
      <div class="bg-md-sys-color-surface-container rounded-lg p-4">
        <p class="md-sys-typescale-title-small mb-2">Collapsible panel</p>
        <p class="text-md-sys-color-on-surface-variant text-sm">
          A toggle button appears over the main pane to hide/show this panel (desktop only).
        </p>
      </div>
    {/snippet}
  </SupportingPane>
</Story>

<Story name="Position Left" asChild>
  <SupportingPane anchor="parent" position="left">
    {#snippet main()}
      <div class="flex flex-col gap-4 p-4">
        {#each Array(4) as _, i}
          <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
            Main content block {i + 1}
          </div>
        {/each}
      </div>
    {/snippet}
    {#snippet supporting()}
      <div class="bg-md-sys-color-surface-container rounded-lg p-4">
        <p class="md-sys-typescale-title-small mb-2">Supporting content</p>
        <p class="text-md-sys-color-on-surface-variant text-sm">Panel rendered on the left.</p>
      </div>
    {/snippet}
  </SupportingPane>
</Story>
