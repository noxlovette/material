<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SplitPane from './SplitPane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Split Pane',
    component: SplitPane,
    argTypes: {
      anchor: {
        control: 'select',
        options: ['viewport', 'parent', 'sticky']
      },
      resizable: { control: 'boolean' },
      leftWidth: { control: 'number' },
      minLeft: { control: 'number' },
      maxLeft: { control: 'number' },
      full: { control: 'boolean' },
      rounded: { control: 'boolean' },
      mobilePane: {
        control: 'select',
        options: ['left', 'right']
      }
    },
    args: {
      anchor: 'parent',
      resizable: true,
      leftWidth: 320,
      minLeft: 240,
      maxLeft: 560,
      full: false,
      rounded: true,
      mobilePane: 'right'
    }
  });
</script>

<!--
  Playground uses anchor="parent" (bounded/relative container) since it's the
  only mode that demos meaningfully inside Storybook's iframe canvas — "viewport"
  fixes to the true browser edge and "sticky" needs a real scrolling page.
-->
<Story name="Playground">
  {#snippet template(args)}
    <div
      class="relative h-[420px] overflow-hidden rounded-lg border border-md-sys-color-outline-variant"
    >
      <SplitPane {...args}>
        {#snippet left()}
          <div class="p-4">
            <p class="md-sys-typescale-title-small mb-2">Left pane</p>
            <p class="text-md-sys-color-on-surface-variant text-sm">
              Drag the handle to resize. Persisted to localStorage when resizable.
            </p>
          </div>
        {/snippet}
        {#snippet right()}
          <div class="p-4">
            <p class="md-sys-typescale-title-small mb-2">Right pane</p>
            <p class="text-md-sys-color-on-surface-variant text-sm">Main content area.</p>
          </div>
        {/snippet}
      </SplitPane>
    </div>
  {/snippet}
</Story>

<!--
  anchor="viewport" — left pane fixes to the true browser edge. Meant for a
  full-page app layout where SplitPane is the outermost positioned element
  (e.g. the root Rail). Shown here at a reduced height so the fixed left pane
  is still visible inside the story canvas.
-->
<Story name="Anchor Viewport" asChild>
  <div
    class="relative h-[420px] overflow-hidden rounded-lg border border-md-sys-color-outline-variant"
  >
    <SplitPane anchor="viewport" resizable={false} leftWidth={280}>
      {#snippet left()}
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Fixed to viewport edge</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            In a real page this pane is position: fixed to the true left edge of the browser.
          </p>
        </div>
      {/snippet}
      {#snippet right()}
        <div class="p-4">
          <p class="text-md-sys-color-on-surface-variant text-sm">Right / main content.</p>
        </div>
      {/snippet}
    </SplitPane>
  </div>
</Story>

<!--
  anchor="sticky" — left/right sit in normal flex flow and the left pane
  sticks (position: sticky) as the page scrolls. Used for a sidebar nested
  inside other already-offset content, e.g. the docs secondary nav. Paired
  with resizable={false} for a static, non-draggable sidebar. Needs a tall
  scrollable right pane to demonstrate the sticky behaviour.
-->
<Story name="Anchor Sticky" asChild>
  <div class="h-[420px] overflow-y-auto rounded-lg border border-md-sys-color-outline-variant">
    <SplitPane anchor="sticky" resizable={false} leftWidth={240} rounded={false}>
      {#snippet left()}
        <div class="p-4">
          <p class="md-sys-typescale-title-small mb-2">Sticky nav</p>
          <p class="text-md-sys-color-on-surface-variant text-sm">
            Stays pinned to the top of the viewport while the right pane scrolls past it.
          </p>
        </div>
      {/snippet}
      {#snippet right()}
        <div class="flex flex-col gap-4 p-4">
          {#each Array(12) as _, i}
            <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">
              Scrollable content block {i + 1}
            </div>
          {/each}
        </div>
      {/snippet}
    </SplitPane>
  </div>
</Story>
