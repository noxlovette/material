<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { tick } from 'svelte';
  import DraggablePane from './DraggablePane.svelte';
  import { containerTransform } from '#lib/animation/containerTransform.js';
  import { Button } from '#lib/components/buttons/index.js';
  import { Card } from '#lib/components/cards/index.js';
  import { DateField } from '#lib/components/date/index.js';
  import { TimeField } from '#lib/components/time/index.js';
  import { Body, Title } from '#lib/components/typography/index.js';

  const { Story } = defineMeta({
    title: 'Containers/DraggablePane',
    tags: ['autodocs'],
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
  // "Opened From A Card": which event's pane is open, if any.
  const days = [
    { day: 21, events: [] },
    { day: 22, events: [{ id: 'math', time: '16:00', title: 'Math' }] },
    { day: 23, events: [] },
    { day: 24, events: [{ id: 'physics', time: '17:00', title: 'Physics' }] },
    { day: 25, events: [] }
  ];
  const eventsById = Object.fromEntries(days.flatMap((d) => d.events.map((e) => [e.id, e])));
  let openEvent: string | undefined = $state();

  const eventCard = (id: string) => `[data-story-event="${id}"]`;
  const EVENT_PANE = '[data-story-event-pane]';

  // As the calendar does it: the clicked card grows into the pane, and closing
  // shrinks the pane back into the card it came from.
  function openFrom(id: string) {
    if (openEvent) {
      openEvent = id;
      return;
    }
    containerTransform(
      async () => {
        openEvent = id;
        await tick();
      },
      { from: eventCard(id), to: EVENT_PANE }
    );
  }

  function closePane() {
    const id = openEvent;
    if (!id) return;
    containerTransform(
      async () => {
        openEvent = undefined;
        await tick();
      },
      { from: EVENT_PANE, to: eventCard(id) }
    );
  }

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

<!--
  `onClickOutside` fires on any click landing outside the panel — wired to
  `onClose` here, so clicking the surrounding canvas dismisses it.
-->
<Story name="Close On Outside Click" asChild>
  <DraggablePane
    title="Click outside to close"
    initialX={32}
    initialY={32}
    onClose={() => console.log('DraggablePane closed')}
    onClickOutside={() => console.log('DraggablePane: click outside')}
  >
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
      Click anywhere outside this panel (or the close button) to dismiss it.
    </p>
  </DraggablePane>
</Story>

<!-- Custom header content via the `header` snippet instead of `title`/`onClose`. -->
<Story name="Custom Header" asChild>
  <DraggablePane initialX={32} initialY={32}>
    {#snippet header()}
      <span
        class="md-sys-typescale-label-large text-md-sys-color-on-surface px-spacing-50 py-spacing-50 flex-1 truncate"
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

<!--
  `resizable` adds edge/corner handles (pointer drag, or arrow keys once an
  edge handle is focused). `minWidth`/`minHeight` are the safety net that
  keeps a resize from shrinking the panel into uselessness; `maxWidth`/
  `maxHeight` cap the other direction (both are also implicitly capped by
  `bounds`, the viewport here).
-->
<Story name="Resizable" asChild>
  <DraggablePane
    title="Resizable"
    initialX={32}
    initialY={32}
    resizable
    minWidth={220}
    minHeight={140}
    maxWidth={520}
    maxHeight={420}
  >
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
      Drag any edge or corner to resize. Can't go below 220×140, or above 520×420.
    </p>
  </DraggablePane>
</Story>

<!--
  Content-sized (no `height`) is the default — but content taller than the
  viewport still carries a standing `max-height` (`bounds` minus
  `boundsPadding`, see the component doc comment), so it scrolls internally
  instead of rendering off-screen with the bottom of the panel unreachable.
-->
<Story name="Content Overflow (Unbounded)" asChild>
  <DraggablePane title="Long Form">
    <div
      class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant gap-spacing-150 flex w-56 flex-col"
    >
      {#each Array(30) as _, i (i)}
        <p>
          Field {i + 1} — this panel never sets `height`, yet can't render taller than the viewport.
        </p>
      {/each}
    </div>
  </DraggablePane>
</Story>

<!--
  A fixed `height` turns the content area into an internal scroll region
  instead of letting the panel grow past its bound — the `content` slot needs
  `min-h-spacing-0` alongside `flex-1 overflow-auto`, otherwise a flex child's default
  `min-height: auto` lets it grow past its flex-basis and overflow the fixed-
  height panel instead of scrolling internally.
-->
<Story name="Scrollable Content" asChild>
  <DraggablePane title="Long List" initialX={32} initialY={32} height={240} width={280}>
    <ul class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
      {#each Array(40) as _, i (i)}
        <li>Item {i + 1}</li>
      {/each}
    </ul>
  </DraggablePane>
</Story>

<!--
  `collapsible` adds a minimize button that docks the pane into a small pill
  at `minimizedCorner` (default bottom-left) showing `minimizedTitle` (falls
  back to `title`); clicking the pill restores it at its previous position.
-->
<Story name="Collapsible" asChild>
  <DraggablePane title="Mini Player" initialX={32} initialY={32} collapsible resizable>
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant w-56">
      Click the minimize icon in the header to collapse this into a pill in the bottom-left corner.
    </p>
  </DraggablePane>
</Story>

<!--
  The calendar's case: an event card grows into the edit pane (container
  transform) and the pane's close button shrinks it back into that card. The
  date field sits near the pane's right edge, so its picker spills out over
  the page — it must stack above the pane (`z-layer-popup` over
  `z-layer-pane`), never under it.
-->
<Story
  name="Opened From A Card"
  asChild
  parameters={{ docs: { story: { inline: false, height: '720px' } } }}
>
  <!-- Both lower and higher layers overlap the pane's flight path. During the morph the
       rail must remain below it, and the popup above it, just as in the live layout. -->
  <div
    class="md-vt-persist z-layer-rail bg-md-sys-color-surface-container p-spacing-200 inset-y-spacing-0 left-spacing-0 w-spacing-900 fixed"
  >
    <Body size="small">Rail — below pane</Body>
  </div>
  <div
    class="md-vt-persist z-layer-popup bg-md-sys-color-inverse-surface text-md-sys-color-inverse-on-surface p-spacing-150 top-spacing-500 left-spacing-900 fixed rounded-md"
  >
    Popup layer — always above pane
  </div>
  <div class="gap-spacing-100 p-spacing-300 ml-spacing-900 grid grid-cols-5">
    {#each days as { day, events } (day)}
      <Card type="outlined" padding="sm" class="gap-spacing-100 flex min-h-40 flex-col">
        <Title size="small">{day}</Title>
        {#each events as event (event.id)}
          <Card
            type="filled"
            padding="sm"
            data-story-event={event.id}
            selected={openEvent === event.id}
            onselect={() => openFrom(event.id)}
          >
            <Body size="small">{event.time}</Body>
            <Title size="small">{event.title}</Title>
          </Card>
        {/each}
      </Card>
    {/each}
  </div>

  {#if openEvent}
    <DraggablePane
      data-story-event-pane
      title={`Edit ${eventsById[openEvent].title}`}
      initialX={32}
      initialY={96}
      resizable
      onClose={closePane}
    >
      <div class="gap-spacing-200 flex w-80 flex-col">
        <DateField label="Date" variant="outlined" />
        <TimeField label="Start" value={eventsById[openEvent].time} />
        <Button onclick={closePane}>Save</Button>
      </div>
    </DraggablePane>
  {/if}
</Story>
