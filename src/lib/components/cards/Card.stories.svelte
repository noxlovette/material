<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';

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
      <p class="md-sys-typescale-title-medium mb-1">Card title</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">
        Supporting text describing the card's content.
      </p>
    </Card>
  {/snippet}
</Story>

<Story name="Types" asChild>
  <div class="flex flex-wrap gap-4 p-6">
    <Card type="elevated" class="w-56">
      <p class="md-sys-typescale-title-medium mb-1">Elevated</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">Shadow separates from background.</p>
    </Card>
    <Card type="filled" class="w-56">
      <p class="md-sys-typescale-title-medium mb-1">Filled</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">
        Solid background, subtle separation.
      </p>
    </Card>
    <Card type="outlined" class="w-56">
      <p class="md-sys-typescale-title-medium mb-1">Outlined</p>
      <p class="text-md-sys-color-on-surface-variant text-sm">Boundary line, least separation.</p>
    </Card>
  </div>
</Story>

<Story name="Hoverable Link" asChild>
  <Card href="#" class="max-w-sm">
    <p class="md-sys-typescale-title-medium mb-1">Clickable card</p>
    <p class="text-md-sys-color-on-surface-variant text-sm">
      Rendered as an anchor when <code>href</code> is provided; hoverable defaults to true.
    </p>
  </Card>
</Story>
