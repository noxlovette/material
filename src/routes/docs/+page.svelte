<script lang="ts">
  import { Display, Body, Card, Icon, Divider, Headline } from '$lib/index.js';
</script>

<svelte:head>
  <title>Components | Ogonëk M3 Docs</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-8 py-12">
  <div class="mb-10 flex flex-col gap-3">
    <Display>Component Docs</Display>
    <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
      Reference documentation for every component in the Ogonëk M3 library. Each page includes
      props, usage examples, and live demos.
    </Body>
  </div>

  <Divider class="mb-10" />

  <div class="flex flex-col gap-8">
    <section>
      <Headline class="mb-4">Navigation</Headline>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {#each [{ label: 'Rail', href: '/docs/rail', icon: 'side_navigation', desc: 'Vertical nav for tablet and desktop with mobile fallback.' }, { label: 'Navbar', href: '/docs/navbar', icon: 'bottom_navigation', desc: 'Fixed bottom bar for primary destinations on mobile.' }, { label: 'Tabs', href: '/docs/tabs', icon: 'tab', desc: 'Horizontal content switcher for related views.' }, { label: 'App Bar', href: '/docs/appbar', icon: 'web_asset', desc: 'Top-anchored header with title and actions.' }] as item}
          <a href={item.href} class="no-underline">
            <Card
              class="hover:bg-md-sys-color-surface-container-high flex items-center gap-4 p-4 transition-colors"
            >
              <Icon name={item.icon} class="text-md-sys-color-primary shrink-0 text-[24px]" />
              <div class="min-w-0">
                <p class="text-md-sys-color-on-surface text-sm font-semibold">{item.label}</p>
                <p class="text-md-sys-color-on-surface-variant text-xs">{item.desc}</p>
              </div>
            </Card>
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>
