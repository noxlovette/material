<!--
  Badge renders `absolute` (top/right offsets baked into its `size` variant), so it always needs a
  `position: relative` ancestor to anchor against — it's an overlay primitive, not a
  standalone/inline element. NavbarItem/RailItem already wire this up internally via their
  `badge` prop; the stories below reproduce that same relative-wrapper pattern by hand so Badge
  can be previewed in isolation.
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
      number: { control: 'number' }
    },
    args: {
      size: 'lg',
      number: 5
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="relative inline-flex size-10 items-center justify-center">
      <Icon name="mail" />
      <Badge size={args.size} number={args.number} />
    </div>
  {/snippet}
</Story>

<Story name="Dot (Small)" asChild>
  <div class="relative inline-flex size-10 items-center justify-center">
    <Icon name="notifications" />
    <Badge size="sm" />
  </div>
</Story>

<Story name="Numbered (Large)" asChild>
  <div class="relative inline-flex size-10 items-center justify-center">
    <Icon name="mail" />
    <Badge size="lg" number={7} />
  </div>
</Story>

<Story name="Overflow (99+)" asChild>
  <div class="relative inline-flex size-10 items-center justify-center">
    <Icon name="mail" />
    <Badge size="lg" number={128} />
  </div>
</Story>
