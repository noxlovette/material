<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
  import { Button } from '../buttons/index.js';

  const { Story } = defineMeta({
    title: 'Cards/Card',
    component: Card,
    argTypes: {
      type: {
        control: 'select',
        options: ['elevated', 'filled', 'outlined']
      },
      padding: {
        control: 'select',
        options: ['none', 'sm', 'md', 'lg']
      },
      hoverable: { control: 'boolean' },
      href: { control: 'text' }
    },
    args: {
      type: 'filled',
      padding: 'md',
      hoverable: false,
      href: undefined
    }
  });

  const selectableItems = [
    { id: 1, title: 'Q3 roadmap', body: 'Planning doc for the next quarter.' },
    { id: 2, title: 'Design review', body: 'Notes from the Tuesday sync.' },
    { id: 3, title: 'Onboarding guide', body: 'Draft for new hires.' }
  ];
</script>

<script lang="ts">
  let items = $state(selectableItems);
  let selectedId = $state<number | null>(null);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Card
      type={args.type}
      padding={args.padding}
      hoverable={args.hoverable}
      href={args.href}
      class="max-w-sm"
    >
      <p class="md-sys-typescale-title-medium mb-spacing-50">Card title</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">
        Supporting text describing the card's content.
      </p>
    </Card>
  {/snippet}
</Story>

<Story name="Types" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-wrap">
    <Card type="elevated" class="w-56">
      <p class="md-sys-typescale-title-medium mb-spacing-50">Elevated</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">Shadow separates from background.</p>
    </Card>
    <Card type="filled" class="w-56">
      <p class="md-sys-typescale-title-medium mb-spacing-50">Filled</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">
        Solid background, subtle separation.
      </p>
    </Card>
    <Card type="outlined" class="w-56">
      <p class="md-sys-typescale-title-medium mb-spacing-50">Outlined</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">Boundary line, least separation.</p>
    </Card>
  </div>
</Story>

<Story name="Hoverable Link" asChild>
  <Card href="#" class="max-w-sm">
    <p class="md-sys-typescale-title-medium mb-spacing-50">Clickable card</p>
    <p class="text-md-sys-color-on-surface-variant text-sm">
      Rendered as an anchor when <code>href</code> is provided; hoverable defaults to true.
    </p>
  </Card>
</Story>

<Story name="Selectable" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-wrap">
    {#each items as item (item.id)}
      <Card
        type="outlined"
        class="w-56"
        selected={selectedId === item.id}
        onselect={() => (selectedId = item.id)}
        ondelete={() => {
          items = items.filter((i) => i.id !== item.id);
          if (selectedId === item.id) selectedId = null;
        }}
      >
        <p class="md-sys-typescale-title-medium mb-spacing-50">{item.title}</p>
        <p class="text-md-sys-color-on-surface-variant text-sm">{item.body}</p>
      </Card>
    {/each}
  </div>
</Story>

<Story name="Selectable With Nested Button" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-wrap">
    <Card
      type="outlined"
      class="w-64"
      onselect={() => console.log('card selected')}
      ondelete={() => console.log('card deleted')}
    >
      <p class="md-sys-typescale-title-medium mb-spacing-50">Card with an action</p>
      <p class="text-md-sys-color-on-surface-variant mb-spacing-150 text-sm">
        Clicking the card selects it. The button below calls
        <code>event.stopPropagation()</code> so it doesn't also trigger selection.
      </p>
      <Button
        variant="text"
        onclick={(event: MouseEvent) => {
          event.stopPropagation();
          console.log('button clicked, card not selected');
        }}
      >
        Open
      </Button>
    </Card>
  </div>
</Story>
