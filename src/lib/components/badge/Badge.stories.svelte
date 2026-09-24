<!--
  Badge renders `absolute` by default, offset from its positioned ancestor's top-trailing corner
  per the M3 spec, so that ancestor must hug the 24dp icon (not a larger indicator container).
  NavbarItem/RailItem already wire this up internally via their `badge` prop; the stories below
  reproduce that same `relative inline-flex` wrapper by hand so Badge can be previewed in
  isolation. `standalone` renders it in normal flow instead (e.g. ListItem's trailing slot).
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Badge from './Badge.svelte';
  import Icon from '../../utils/icon/Icon.svelte';

  const { Story } = defineMeta({
    title: 'Feedback/Badge',
    component: Badge,
    argTypes: {
      size: {
        control: 'select',
        options: ['sm', 'lg']
      },
      number: { control: 'number' },
      max: { control: 'number' },
      standalone: { control: 'boolean' }
    },
    args: {
      size: 'lg',
      number: 5,
      max: 999,
      standalone: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <span class="relative inline-flex">
      <Icon name="mail" />
      <Badge size={args.size} number={args.number} max={args.max} standalone={args.standalone} />
    </span>
  {/snippet}
</Story>

<Story name="Dot (Small)" exportName="DotSmall" asChild>
  <span class="relative inline-flex">
    <Icon name="notifications" />
    <Badge size="sm" />
  </span>
</Story>

<Story name="Numbered (Large)" exportName="NumberedLarge" asChild>
  <span class="relative inline-flex">
    <Icon name="mail" />
    <Badge size="lg" number={7} />
  </span>
</Story>

<Story name="Two digits" asChild>
  <span class="relative inline-flex">
    <Icon name="mail" />
    <Badge size="lg" number={42} />
  </span>
</Story>

<Story name="Max character count (999+)" exportName="MaxCharacterCount" asChild>
  <span class="relative inline-flex">
    <Icon name="mail" />
    <Badge size="lg" number={1280} />
  </span>
</Story>

<Story name="Standalone" asChild>
  <span class="gap-spacing-100 inline-flex items-center">
    <Badge size="sm" standalone />
    <Badge size="lg" number={3} standalone />
  </span>
</Story>
