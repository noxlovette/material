<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Navbar from './Navbar.svelte';
  import NavbarItem from './NavbarItem.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/Navbar',
    component: Navbar,
    parameters: {
      // Navbar is the mobile fallback (md:hidden) for Rail — preview it at a mobile viewport.
      viewport: { defaultViewport: 'mobile1' }
    },
    argTypes: {
      ghost: { control: 'boolean' }
    },
    args: {
      ghost: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="relative h-24">
      <Navbar ghost={args.ghost}>
        <NavbarItem label="Home" href="/" iconProps={{ name: 'house' }} selected />
        <NavbarItem label="Inbox" href="#" iconProps={{ name: 'mail' }} badge={4} />
        <NavbarItem label="Chat" href="#" iconProps={{ name: 'chat' }} badge={-1} />
        <NavbarItem label="Settings" href="#" iconProps={{ name: 'settings' }} />
      </Navbar>
    </div>
  {/snippet}
</Story>
