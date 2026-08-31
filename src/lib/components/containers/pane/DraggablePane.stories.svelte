<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DraggablePane from './DraggablePane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/DraggablePane',
    component: DraggablePane,
    argTypes: {
      title: { control: 'text' },
      disableDrag: { control: 'boolean' }
    },
    args: {
      title: 'Inspector',
      disableDrag: false
    }
  });
</script>

<script lang="ts">
  let boundedEl: HTMLDivElement | undefined = $state();
  let boundedX: number | undefined = $state();
  let boundedY: number | undefined = $state();

  // DraggablePane positions with `position: fixed` (viewport coordinates), so
  // seed x/y from the container's own rect rather than an arbitrary offset —
  // `bounds` only clamps the drag, it doesn't reposition the panel into the box.
  $effect(() => {
    if (boundedEl && boundedX === undefined) {
      const rect = boundedEl.getBoundingClientRect();
      boundedX = rect.left + 16;
      boundedY = rect.top + 16;
    }
  });
</script>

<!--
  Bare `position: fixed` panel — drag the header around the Storybook canvas
  by pointer or, once focused, the arrow keys (shift for a bigger step).
-->
<Story name="Playground">
  {#snippet template(args)}
    <DraggablePane title={args.title} disableDrag={args.disableDrag} initialX={32} initialY={32}>
      <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
        Drag the header to move this panel. Its position is bindable via <code>x</code>/<code
          >y</code
        >.
      </p>
    </DraggablePane>
  {/snippet}
</Story>

<!-- A closable pane, and a second one demonstrating `persistKey` position persistence. -->
<Story name="Closable + Persisted" asChild>
  <DraggablePane title="Closable" initialX={32} initialY={32} onClose={() => {}}>
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
      Has a close button in its header.
    </p>
  </DraggablePane>
  <DraggablePane
    title="Remembers position"
    initialX={340}
    initialY={32}
    persistKey="storybook-draggable-pane-demo"
  >
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
      Drag me, then reload the story — <code>persistKey</code> saves the position to
      <code>localStorage</code>.
    </p>
  </DraggablePane>
</Story>

<!-- Custom header content via the `header` snippet instead of `title`/`onClose`. -->
<Story name="Custom Header" asChild>
  <DraggablePane initialX={32} initialY={32}>
    {#snippet header()}
      <span
        class="md-sys-typescale-label-large text-md-sys-color-on-surface flex-1 truncate px-1 py-1"
      >
        ⠿ Custom drag handle
      </span>
    {/snippet}
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
      The default grip/title/close row is fully replaceable.
    </p>
  </DraggablePane>
</Story>

<!--
  `bounds` clamps dragging to a given element's current rect instead of the
  viewport — here, the dashed container below.
-->
<Story name="Bounded To Container">
  {#snippet template()}
    <div
      bind:this={boundedEl}
      class="border-md-sys-color-outline relative h-[320px] w-full overflow-hidden rounded-lg border border-dashed"
    >
      {#if boundedEl && boundedX !== undefined && boundedY !== undefined}
        <DraggablePane title="Confined" bind:x={boundedX} bind:y={boundedY} bounds={boundedEl}>
          <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-48">
            Can't leave this box.
          </p>
        </DraggablePane>
      {/if}
    </div>
  {/snippet}
</Story>
