<script lang="ts">
  import {
    Rail,
    RailItem,
    Navbar,
    NavbarItem,
    SinglePane,
    Headline,
    Title,
    Body,
    Label,
    Divider,
    Card,
    FAB
  } from '$lib/index.js';
  import CodeBlock from '../CodeBlock.svelte';

  let railCollapsed = $state(true);
  let railExpandable = $state(true);
  let railFooterVisible = $state(false);
  let railFabVisible = $state(false);
</script>

<svelte:head>
  <title>Navigation | Ogonëk M3</title>
</svelte:head>

<SinglePane class="p-8 lg:p-12" contentClass="gap-12">
  <!-- ─── RAIL ──────────────────────────────────────────────── -->
  <div class="flex flex-col gap-4">
    <Headline>Navigation Rail</Headline>
    <Body class="max-w-2xl">
      Navigation Rails provide access to primary destinations on tablet and desktop screens (<code
        class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">md+</code
      >). On mobile, use a <strong>Navbar</strong> instead. The Rail is hidden below the
      <code class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">md</code>
      breakpoint and expands to show labels between
      <code class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">md</code> and
      <code class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">lg</code>
      with a scrim; at
      <code class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">lg+</code>
      the scrim disappears and the expanded state is unobtrusive.
    </Body>
  </div>

  <Divider />

  <!-- Live demo -->
  <div class="flex flex-col gap-6">
    <Title>Live demo</Title>
    <Body>
      The demo below uses <code
        class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm"
        >anchor="parent"</code
      >
      so the Rail positions itself inside its container rather than the viewport.
    </Body>

    <!-- Controls -->
    <div class="flex flex-wrap gap-4">
      <button
        class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container rounded-full px-4 py-2 text-sm font-medium"
        onclick={() => (railCollapsed = !railCollapsed)}
      >
        {railCollapsed ? 'Expand rail' : 'Collapse rail'}
      </button>
      <button
        class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium"
        onclick={() => (railExpandable = !railExpandable)}
      >
        expandable: {railExpandable}
      </button>
      <button
        class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium"
        onclick={() => (railFabVisible = !railFabVisible)}
      >
        FAB: {railFabVisible ? 'on' : 'off'}
      </button>
      <button
        class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium"
        onclick={() => (railFooterVisible = !railFooterVisible)}
      >
        railFooter: {railFooterVisible ? 'on' : 'off'}
      </button>
    </div>

    <div class="bg-md-sys-color-surface-variant relative h-[400px] overflow-hidden rounded-2xl">
      <Rail anchor="parent" expandable={railExpandable} bind:collapsed={railCollapsed}>
        {#snippet fab()}
          {#if railFabVisible}
            <FAB size="small" iconProps={{ name: 'add' }} label="Add" />
          {/if}
        {/snippet}

        {#snippet railFooter()}
          {#if railFooterVisible}
            <div
              class="bg-md-sys-color-secondary-container flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
            >
              DV
            </div>
          {/if}
        {/snippet}

        <RailItem label="Home" href="/nav" iconProps={{ name: 'house' }} selected />
        <RailItem label="Mail" href="/nav#mail" iconProps={{ name: 'mail' }} badge={3} />
        <RailItem label="Chat" href="/nav#chat" iconProps={{ name: 'chat' }} badge={-1} />
        <RailItem label="Settings" href="/nav#settings" iconProps={{ name: 'settings' }} />
        <RailItem label="Disabled" href="/nav#x" iconProps={{ name: 'block' }} disabled />
      </Rail>

      <div
        class="flex h-full flex-col justify-center p-8 transition-all duration-300"
        style={`margin-left: ${railCollapsed ? '6rem' : '15rem'}`}
      >
        <Label class="text-md-sys-color-on-surface-variant">Page content</Label>
      </div>
    </div>
  </div>

  <Divider />

  <!-- Props -->
  <div class="flex flex-col gap-6">
    <Title>Rail props</Title>
    <div class="flex flex-col gap-3">
      {#each [{ prop: 'bind:collapsed', type: 'boolean', default: 'true', desc: 'Whether the rail is in its narrow (collapsed) state. Bind to drive it externally.' }, { prop: 'expandable', type: 'boolean', default: 'true', desc: 'Whether to show the hamburger toggle button. Set false to lock the rail collapsed.' }, { prop: 'anchor', type: '"viewport" | "parent"', default: '"viewport"', desc: 'viewport: fixed to the screen edge. parent: absolute within the nearest relative ancestor (good for contained demos).' }, { prop: 'railTop', type: 'number', default: '0', desc: 'Top offset in px — use when a top AppBar is present, e.g. railTop={64}.' }, { prop: 'fab', type: 'Snippet', default: '—', desc: 'Optional FAB rendered above the nav items.' }, { prop: 'railFooter', type: 'Snippet', default: '—', desc: 'Optional snippet pinned to the bottom of the rail (avatar, settings link, etc.).' }, { prop: 'rounded', type: 'boolean', default: 'false', desc: 'Adds rounded-xl corners to the rail panel.' }] as item}
        <Card class="flex flex-col gap-1 p-4">
          <div class="flex flex-wrap items-baseline gap-2">
            <code class="text-md-sys-color-primary font-mono text-sm font-semibold"
              >{item.prop}</code
            >
            <code class="text-md-sys-color-on-surface-variant font-mono text-xs">{item.type}</code>
            {#if item.default !== '—'}
              <Label class="text-md-sys-color-on-surface-variant">default: {item.default}</Label>
            {/if}
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
        </Card>
      {/each}
    </div>
  </div>

  <Divider />

  <!-- RailItem props -->
  <div class="flex flex-col gap-6">
    <Title>RailItem props</Title>
    <div class="flex flex-col gap-3">
      {#each [{ prop: 'href', type: 'string', default: '"/"', desc: 'The destination URL. Active state is derived automatically from the current page URL.' }, { prop: 'label', type: 'string', default: '—', desc: 'Text shown below the icon (collapsed) or beside it (expanded).' }, { prop: 'iconProps', type: 'IconProps', default: '—', desc: 'Passed directly to the Icon component. Required. At minimum: { name: "symbol_name" }.' }, { prop: 'badge', type: 'number', default: '0', desc: 'Numeric badge on the icon. Pass -1 for a small dot with no number.' }, { prop: 'selected', type: 'boolean', default: 'false', desc: 'Force the active state regardless of current URL (useful for demo or non-route selection).' }, { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Prevents navigation and dims the item.' }, { prop: 'external', type: 'boolean', default: 'false', desc: 'Opens in a new tab with rel="noopener noreferrer".' }] as item}
        <Card class="flex flex-col gap-1 p-4">
          <div class="flex flex-wrap items-baseline gap-2">
            <code class="text-md-sys-color-primary font-mono text-sm font-semibold"
              >{item.prop}</code
            >
            <code class="text-md-sys-color-on-surface-variant font-mono text-xs">{item.type}</code>
            {#if item.default !== '—'}
              <Label class="text-md-sys-color-on-surface-variant">default: {item.default}</Label>
            {/if}
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
        </Card>
      {/each}
    </div>
  </div>

  <Divider />

  <!-- Rail usage -->
  <div class="flex flex-col gap-4">
    <Title>Usage</Title>
    <Body>
      Mount the Rail at the top of your root layout alongside the page content. The Rail ghost
      element reserves the same width so content never slides under it.
    </Body>
    <CodeBlock
      code={`<script>
  let collapsed = $state(true);
<\/script>

<!-- In your root +layout.svelte -->
<Rail bind:collapsed railTop={0}>
  {#snippet fab()}
    <FAB iconProps={{ name: 'add' }} label="New" />
  {/snippet}

  <RailItem label="Home"     href="/"        iconProps={{ name: 'house' }} />
  <RailItem label="Messages" href="/messages" iconProps={{ name: 'mail' }} badge={5} />
  <RailItem label="Settings" href="/settings" iconProps={{ name: 'settings' }} />

  {#snippet railFooter()}
    <Avatar seed="DV" />
  {/snippet}
</Rail>

<!-- Offset page content by the collapsed rail width -->
<div class="md:ml-24">
  {@render children()}
</div>`}
    />
  </div>

  <!-- ─── NAVBAR ─────────────────────────────────────────────── -->
  <div class="flex flex-col gap-4 pt-4">
    <Headline>Navigation Bar</Headline>
    <Body class="max-w-2xl">
      The Navbar is the mobile companion to the Rail. It renders as a fixed bottom bar and is hidden
      at
      <code class="bg-md-sys-color-surface-container rounded px-1 font-mono text-sm">md+</code>.
      Resize to a narrow viewport to see it in action — it's already mounted on this page via the
      site layout.
    </Body>
  </div>

  <Divider />

  <!-- Navbar props -->
  <div class="flex flex-col gap-6">
    <Title>Navbar props</Title>
    <div class="flex flex-col gap-3">
      {#each [{ prop: 'ghost', type: 'boolean', default: 'false', desc: 'Renders an invisible same-height spacer after the fixed bar so page content is not obscured behind it. Always use this.' }, { prop: 'fab', type: 'Snippet', default: '—', desc: 'Optional FAB rendered anchored above the bar at bottom-right.' }] as item}
        <Card class="flex flex-col gap-1 p-4">
          <div class="flex flex-wrap items-baseline gap-2">
            <code class="text-md-sys-color-primary font-mono text-sm font-semibold"
              >{item.prop}</code
            >
            <code class="text-md-sys-color-on-surface-variant font-mono text-xs">{item.type}</code>
            {#if item.default !== '—'}
              <Label class="text-md-sys-color-on-surface-variant">default: {item.default}</Label>
            {/if}
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
        </Card>
      {/each}
    </div>
  </div>

  <Divider />

  <!-- NavbarItem props -->
  <div class="flex flex-col gap-6">
    <Title>NavbarItem props</Title>
    <div class="flex flex-col gap-3">
      {#each [{ prop: 'href', type: 'string', default: '"/"', desc: 'The destination URL. Active state is auto-derived from the current page.' }, { prop: 'label', type: 'string', default: '—', desc: 'Text label shown below the icon.' }, { prop: 'iconProps', type: 'IconProps', default: '—', desc: 'Required. At minimum: { name: "symbol_name" }.' }, { prop: 'badge', type: 'number', default: '0', desc: 'Numeric badge. Pass -1 for a small dot.' }, { prop: 'selected', type: 'boolean', default: 'false', desc: 'Force active state independently of URL.' }] as item}
        <Card class="flex flex-col gap-1 p-4">
          <div class="flex flex-wrap items-baseline gap-2">
            <code class="text-md-sys-color-primary font-mono text-sm font-semibold"
              >{item.prop}</code
            >
            <code class="text-md-sys-color-on-surface-variant font-mono text-xs">{item.type}</code>
            {#if item.default !== '—'}
              <Label class="text-md-sys-color-on-surface-variant">default: {item.default}</Label>
            {/if}
          </div>
          <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
        </Card>
      {/each}
    </div>
  </div>

  <Divider />

  <!-- Navbar usage -->
  <div class="flex flex-col gap-4">
    <Title>Usage</Title>
    <Body>
      Place the Navbar in the same root layout as the Rail. The two components are designed to be
      used together — Rail handles tablet/desktop, Navbar handles mobile.
    </Body>
    <CodeBlock
      code={`<!-- In your root +layout.svelte, alongside Rail -->
<Navbar ghost>
  {#snippet fab()}
    <FAB size="sm" iconProps={{ name: 'add' }} label="New" />
  {/snippet}

  <NavbarItem label="Home"     href="/"        iconProps={{ name: 'house' }} />
  <NavbarItem label="Messages" href="/messages" iconProps={{ name: 'mail' }} badge={5} />
  <NavbarItem label="Profile"  href="/profile"  iconProps={{ name: 'person' }} />
</Navbar>`}
    />
  </div>

  <!-- ─── BREAKPOINT SUMMARY ───────────────────────────────── -->
  <div class="flex flex-col gap-4 pt-4">
    <Title>Breakpoint behaviour at a glance</Title>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-md-sys-color-surface-container-highest">
            <th class="border-md-sys-color-outline-variant border p-3 text-left">Breakpoint</th>
            <th class="border-md-sys-color-outline-variant border p-3 text-left">Rail</th>
            <th class="border-md-sys-color-outline-variant border p-3 text-left">Rail scrim</th>
            <th class="border-md-sys-color-outline-variant border p-3 text-left">Navbar</th>
          </tr>
        </thead>
        <tbody>
          {#each [{ bp: '< md  (mobile)', rail: 'hidden', scrim: 'hidden', navbar: 'visible (fixed bottom)' }, { bp: 'md – lg (tablet)', rail: 'collapsed (96px)', scrim: 'visible on expand', navbar: 'hidden' }, { bp: 'lg+  (desktop)', rail: 'collapsed (96px)', scrim: 'hidden', navbar: 'hidden' }] as row}
            <tr class="even:bg-md-sys-color-surface-container/40">
              <td class="border-md-sys-color-outline-variant border p-3 font-mono text-xs"
                >{row.bp}</td
              >
              <td class="border-md-sys-color-outline-variant border p-3">{row.rail}</td>
              <td class="border-md-sys-color-outline-variant border p-3">{row.scrim}</td>
              <td class="border-md-sys-color-outline-variant border p-3">{row.navbar}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</SinglePane>
