<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Rail from './Rail.svelte';
  import RailItem from './RailItem.svelte';
  import FAB from '../../buttons/FAB.svelte';

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
      }
    },
    args: {
      collapsed: true,
      expandable: true,
      rounded: false,
      anchor: 'parent'
    }
  });
</script>

<script lang="ts">
  // Playground: clicking a destination selects it, to show the indicator growing from its centre.
  const destinations = [
    { label: 'Home', icon: 'house', badge: 0 },
    { label: 'Inbox', icon: 'mail', badge: 4 },
    { label: 'Chat', icon: 'chat', badge: -1 },
    { label: 'Settings', icon: 'settings', badge: 0 }
  ] as const;
  let current = $state<string>('Home');
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl">
      <Rail
        anchor={args.anchor}
        collapsed={args.collapsed}
        expandable={args.expandable}
        rounded={args.rounded}
      >
        {#each destinations as d (d.label)}
          <RailItem
            label={d.label}
            href="#{d.label.toLowerCase()}"
            iconProps={{ name: d.icon }}
            badge={d.badge}
            selected={current === d.label}
            onclick={(e) => {
              e.preventDefault();
              current = d.label;
            }}
          />
        {/each}
        <RailItem label="Disabled" href="#" iconProps={{ name: 'block' }} disabled />
      </Rail>
    </div>
  {/snippet}
</Story>

<Story name="With FAB">
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl">
      <Rail
        anchor={args.anchor}
        collapsed={args.collapsed}
        expandable={args.expandable}
        rounded={args.rounded}
      >
        {#snippet fab()}
          <FAB iconProps={{ name: 'add' }} label="New" />
        {/snippet}
        <RailItem label="Home" href="/" iconProps={{ name: 'house' }} selected />
        <RailItem label="Inbox" href="#" iconProps={{ name: 'mail' }} badge={4} />
        <RailItem label="Settings" href="#" iconProps={{ name: 'settings' }} />
      </Rail>
    </div>
  {/snippet}
</Story>
