<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PaneGrid from './PaneGrid.svelte';
  import Pane from './Pane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Pane Grid',
    component: PaneGrid
  });
</script>

<!--
  Resizable two-column split — replaces the old SplitPane. The left Pane owns
  its own width/resizable/persistKey; PaneGrid just lays the two out in a row.
-->
<Story name="Resizable Split" asChild>
  <div
    class="relative h-[420px] overflow-hidden rounded-lg border border-md-sys-color-outline-variant"
  >
    <PaneGrid full>
      <Pane width={320} min={240} max={560} resizable rounded={false} background={false}>
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Left pane</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            Drag the handle to resize. Persisted to localStorage when persistKey is set.
          </p>
        </div>
      </Pane>
      <Pane rounded={false}>
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Right pane</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">Main content area.</p>
        </div>
      </Pane>
    </PaneGrid>
  </div>
</Story>

<!--
  Sticky nav — a static (non-resizable) sidebar that sticks to the top of its
  scroll container as the main content scrolls past it. Replaces
  SplitPane anchor="sticky". Works inside any scrolling ancestor, not just the
  true browser viewport, which is what lets this demo meaningfully inside
  Storybook's bounded canvas.
-->
<Story name="Sticky Sidebar" asChild>
  <div class="h-[420px] overflow-y-auto rounded-lg border border-md-sys-color-outline-variant">
    <PaneGrid rounded>
      <Pane width={240} sticky rounded={false}>
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Sticky nav</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            Stays pinned to the top of the scroll container while the right pane scrolls past it.
          </p>
        </div>
      </Pane>
      <Pane rounded={false}>
        <div class="flex flex-col gap-4 p-4">
          {#each Array(12) as _, i}
            <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
              Scrollable content block {i + 1}
            </div>
          {/each}
        </div>
      </Pane>
    </PaneGrid>
  </div>
</Story>

<!--
  Main + supporting panel that stacks on small viewports and moves to a row
  from `large` up — replaces SupportingPane. The panel is sticky once it's
  in the row layout, so it stays visible while the main column scrolls.
-->
<Story name="Main + Supporting" asChild>
  <div class="h-[420px] overflow-y-auto rounded-lg border border-md-sys-color-outline-variant">
    <PaneGrid direction={{ small: 'column', large: 'row' }} gap="lg" padding="md">
      <Pane background={false} padding="none">
        <div class="flex flex-col gap-4">
          {#each Array(6) as _, i}
            <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
              Main content block {i + 1}
            </div>
          {/each}
        </div>
      </Pane>
      <Pane width={280} sticky background={false} padding="none">
        <div class="bg-md-sys-color-surface-container rounded-lg p-4">
          <p class="md-sys-typescale-title-small mb-2">Supporting content</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            Fixed-width panel — e.g. a table of contents or contextual actions.
          </p>
        </div>
      </Pane>
    </PaneGrid>
  </div>
</Story>

<!--
  List-detail: the detail pane only appears from `medium` up via `visibleFrom`;
  below that, the list pane fills the screen alone. Toggle Storybook's viewport
  controls to see the detail pane drop out.
-->
<Story name="List-Detail (detail hidden on small)" asChild>
  <div
    class="relative h-[320px] overflow-hidden rounded-lg border border-md-sys-color-outline-variant"
  >
    <PaneGrid full>
      <Pane width={320} rounded={false} background={false}>
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">List</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">Always visible.</p>
        </div>
      </Pane>
      <Pane visibleFrom="medium" rounded={false}>
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Detail</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">Visible from `medium` up only.</p>
        </div>
      </Pane>
    </PaneGrid>
  </div>
</Story>
