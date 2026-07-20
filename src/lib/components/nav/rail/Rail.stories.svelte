<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Rail from './Rail.svelte';
  import RailItem from './RailItem.svelte';
  import FAB from '../../buttons/FAB.svelte';
  import Avatar from '../../misc/Avatar.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/Rail',
    component: Rail,
    argTypes: {
      collapsed: { control: 'boolean' },
      expandable: { control: 'boolean' },
      rounded: { control: 'boolean' },
      anchor: {
        control: 'select',
        options: ['viewport', 'parent']
      },
      withNavbar: { control: 'boolean' }
    },
    args: {
      collapsed: true,
      expandable: true,
      rounded: false,
      anchor: 'parent',
      withNavbar: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl">
      <Rail
        anchor={args.anchor}
        collapsed={args.collapsed}
        expandable={args.expandable}
        rounded={args.rounded}
        withNavbar={args.withNavbar}
      >
        <RailItem label="Home" href="/" iconProps={{ name: 'house' }} selected />
        <RailItem label="Inbox" href="#" iconProps={{ name: 'mail' }} badge={4} />
        <RailItem label="Chat" href="#" iconProps={{ name: 'chat' }} badge={-1} />
        <RailItem label="Settings" href="#" iconProps={{ name: 'settings' }} />
        <RailItem label="Disabled" href="#" iconProps={{ name: 'block' }} disabled />
      </Rail>
    </div>
  {/snippet}
</Story>

<Story name="With FAB and Footer" args={{ withNavbar: false }}>
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl">
      <Rail
        anchor={args.anchor}
        collapsed={args.collapsed}
        expandable={args.expandable}
        rounded={args.rounded}
        withNavbar={args.withNavbar}
      >
        {#snippet fab()}
          <FAB size="small" iconProps={{ name: 'add' }} label="New" />
        {/snippet}
        {#snippet railFooter()}
          <Avatar seed="DV" />
        {/snippet}
        <RailItem label="Home" href="/" iconProps={{ name: 'house' }} selected />
        <RailItem label="Inbox" href="#" iconProps={{ name: 'mail' }} badge={4} />
        <RailItem label="Settings" href="#" iconProps={{ name: 'settings' }} />
      </Rail>
    </div>
  {/snippet}
</Story>
