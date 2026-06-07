<script lang="ts">
  import {
    Rail,
    RailItem,
    FAB,
    Body,
    Title,
    Headline,
    Label,
    Card,
    Divider,
    Avatar
  } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';

  // ── Demo state ──────────────────────────────────────────────────
  let demoCollapsed = $state(true);
  let demoExpandable = $state(true);
  let demoRounded = $state(false);
  let demoFab = $state(false);
  let demoFooter = $state(false);

  // ── Props reference data ─────────────────────────────────────────
  type PropRow = {
    prop: string;
    type: string;
    default: string;
    required?: boolean;
    desc: string;
  };

  const railProps: PropRow[] = [
    {
      prop: 'collapsed',
      type: 'boolean',
      default: 'true',
      desc: 'Bind to this to drive the expanded/collapsed state externally. When true, the rail shows only icons (96 px wide); when false, it expands to show labels (240 px).'
    },
    {
      prop: 'expandable',
      type: 'boolean',
      default: 'true',
      desc: 'Shows the hamburger toggle button at the top of the rail. Set to false to lock the rail permanently collapsed.'
    },
    {
      prop: 'anchor',
      type: '"viewport" | "parent"',
      default: '"viewport"',
      desc: 'Controls positioning strategy. "viewport" fixes the rail to the left edge of the screen. "parent" positions it absolutely within the nearest relative ancestor — useful for contained demos or modular layouts.'
    },
    {
      prop: 'railTop',
      type: 'number',
      default: '0',
      desc: 'Top offset in pixels applied via a CSS custom property. Use when an AppBar sits above the rail, e.g. railTop={64}.'
    },
    {
      prop: 'rounded',
      type: 'boolean',
      default: 'false',
      desc: 'Adds rounded-xl corner rounding to the rail panel.'
    },
    {
      prop: 'mobileNav',
      type: 'boolean',
      default: 'true',
      desc: 'When true, the Rail automatically renders a bottom navigation bar on screens smaller than the md breakpoint.'
    },
    {
      prop: 'fab',
      type: 'Snippet',
      default: '—',
      desc: 'Optional Floating Action Button rendered above the navigation items. On mobile, when mobileNav is true, it floats above the bottom bar.'
    },
    {
      prop: 'railFooter',
      type: 'Snippet',
      default: '—',
      desc: 'Optional snippet pinned to the bottom of the rail. Typical use: an Avatar or settings link.'
    },
    {
      prop: 'showMobileFab',
      type: 'boolean',
      default: 'true',
      desc: 'Whether to show the fab snippet above the mobile navbar. Only applies when mobileNav is true.'
    },
    {
      prop: 'showMobileFooter',
      type: 'boolean',
      default: 'false',
      desc: 'Whether to include the railFooter snippet inside the mobile navbar.'
    }
  ];

  const railItemProps: PropRow[] = [
    {
      prop: 'href',
      type: 'string',
      default: '"/"',
      required: true,
      desc: 'The destination URL. Active state is automatically derived by comparing href to the current page URL — no manual tracking needed.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The text label. Shown below the icon when collapsed, or beside it when the rail is expanded.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      required: true,
      desc: 'Passed directly to the Icon component. At minimum provide { name: "symbol_name" } using any Material Symbols icon name.'
    },
    {
      prop: 'badge',
      type: 'number',
      default: '0',
      desc: 'Numeric badge overlaid on the icon. Pass -1 to show a small dot indicator with no number (useful for "unread" states).'
    },
    {
      prop: 'selected',
      type: 'boolean',
      default: 'false',
      desc: 'Manually force the active/selected visual state regardless of the current URL. Useful for non-route-based selection or demo purposes.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Prevents navigation and renders the item at 38% opacity with a not-allowed cursor.'
    },
    {
      prop: 'external',
      type: 'boolean',
      default: 'false',
      desc: 'Opens the link in a new tab with rel="noopener noreferrer" automatically applied.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'with-appbar', label: 'With App Bar' },
    { id: 'with-fab', label: 'With FAB' },
    { id: 'anchor-modes', label: 'Anchor Modes' },
    { id: 'rail-props', label: 'Rail Props' },
    { id: 'railitem-props', label: 'RailItem Props' },
    { id: 'responsive', label: 'Responsive Behaviour' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Rail — Ogonëk M3 Docs</title>
</svelte:head>

<div class="flex min-h-dvh">
  <!-- Main content -->
  <article class="min-w-0 flex-1 px-8 py-12 xl:px-12">
    <!-- ── Page header ─────────────────────────────────────────── -->
    <header class="mb-10 flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <nav class="text-md-sys-color-on-surface-variant text-sm" aria-label="Breadcrumb">
          <ol class="flex items-center gap-1">
            <li><a href="/docs" class="hover:text-md-sys-color-primary no-underline">Docs</a></li>
            <li class="mx-1 opacity-40">/</li>
            <li>
              <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Navigation</a>
            </li>
            <li class="mx-1 opacity-40">/</li>
            <li class="text-md-sys-color-on-surface font-medium">Rail</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Navigation Rail</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        Navigation Rails provide ergonomic access to 3–7 primary destinations on medium and large
        screens. On mobile they collapse into a bottom navigation bar automatically.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/navigation-rail/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          M3 Spec
          <span class="text-[14px] opacity-60">open_in_new</span>
        </a>
      </div>
    </header>

    <Divider class="mb-12" />

    <!-- ── Overview ───────────────────────────────────────────── -->
    <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Overview</Title>
      <Body>
        The <code class="doc-code">Rail</code> component implements the
        <a
          href="https://m3.material.io/components/navigation-rail/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary">Material Design 3 Navigation Rail</a
        >
        pattern. It renders as a fixed vertical sidebar on <code class="doc-code">md+</code>
        screens, and can expand to show text labels alongside icons. Below the
        <code class="doc-code">md</code> breakpoint it transparently becomes a bottom navigation bar
        (via its <code class="doc-code">mobileNav</code> prop).
      </Body>
      <Body>
        The Rail emits a <strong>ghost element</strong> — a hidden flex-item sibling that holds the
        same width as the rail. This means your page content is always pushed aside by the correct
        amount without any manual <code class="doc-code">margin-left</code> calculations.
      </Body>
    </section>

    <!-- ── Import ─────────────────────────────────────────────── -->
    <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Import</Title>
      <CodeBlock code={`import { Rail, RailItem } from '@noxlovette/material';`} />
    </section>

    <!-- ── Anatomy ────────────────────────────────────────────── -->
    <section id="anatomy" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Anatomy</Title>
      <Body>The Rail is composed of several cooperating pieces:</Body>

      <div class="flex flex-col gap-3">
        {#each [{ name: 'Rail', desc: 'The container. Renders the sidebar, ghost spacer, tablet scrim, and (optionally) the mobile bottom bar.' }, { name: 'RailItem', desc: 'A single navigation destination. Handles active-state detection, badge overlays, disabled state, and adapts its layout for collapsed/expanded/mobile modes.' }, { name: 'RailNavContext', desc: 'Internal context provider that tells RailItem whether it is rendering inside the sidebar or the mobile navbar. You do not use this directly.' }, { name: 'railStore', desc: 'A lightweight reactive store that exposes the current collapsed state for components that need to read it outside the Rail tree.' }] as part}
          <Card class="p-4">
            <code class="text-md-sys-color-primary text-sm font-semibold">{part.name}</code>
            <Body class="text-md-sys-color-on-surface-variant mt-1">{part.desc}</Body>
          </Card>
        {/each}
      </div>
    </section>

    <!-- ── Live Demo ──────────────────────────────────────────── -->
    <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        The demo uses <code class="doc-code">anchor="parent"</code> to position the rail within the sandbox
        rather than the viewport.
      </Body>

      <!-- Controls -->
      <div class="flex flex-wrap gap-2">
        <button
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          onclick={() => (demoCollapsed = !demoCollapsed)}
        >
          {demoCollapsed ? 'Expand' : 'Collapse'}
        </button>
        <button
          class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          onclick={() => (demoExpandable = !demoExpandable)}
        >
          expandable: {demoExpandable}
        </button>
        <button
          class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          onclick={() => (demoRounded = !demoRounded)}
        >
          rounded: {demoRounded}
        </button>
        <button
          class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          onclick={() => (demoFab = !demoFab)}
        >
          FAB: {demoFab ? 'on' : 'off'}
        </button>
        <button
          class="bg-md-sys-color-surface-container text-md-sys-color-on-surface rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          onclick={() => (demoFooter = !demoFooter)}
        >
          footer: {demoFooter ? 'on' : 'off'}
        </button>
      </div>

      <!-- Sandbox -->
      <div
        class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl border border-black/5"
      >
        <Rail
          anchor="parent"
          expandable={demoExpandable}
          rounded={demoRounded}
          mobileNav={false}
          bind:collapsed={demoCollapsed}
        >
          {#snippet fab()}
            {#if demoFab}
              <FAB size="small" iconProps={{ name: 'add' }} label="New" />
            {/if}
          {/snippet}

          {#snippet railFooter()}
            {#if demoFooter}
              <Avatar seed="DV" />
            {/if}
          {/snippet}

          <RailItem label="Home" href="/docs/rail" iconProps={{ name: 'house' }} selected />
          <RailItem label="Inbox" href="#" iconProps={{ name: 'mail' }} badge={4} />
          <RailItem label="Chat" href="#" iconProps={{ name: 'chat' }} badge={-1} />
          <RailItem label="Settings" href="#" iconProps={{ name: 'settings' }} />
          <RailItem label="Disabled" href="#" iconProps={{ name: 'block' }} disabled />
        </Rail>

        <div
          class="flex h-full flex-col justify-center gap-2 p-8 transition-all duration-[var(--md-sys-motion-duration-spatial)] ease-[var(--md-sys-motion-timing-function-emphasized)]"
          style={`margin-left: ${demoCollapsed ? '6rem' : '15rem'}`}
        >
          <Label class="text-md-sys-color-on-surface-variant">Page content area</Label>
          <Body class="text-md-sys-color-on-surface-variant/60 text-sm">
            Content shifts as the rail expands.
          </Body>
        </div>
      </div>
    </section>

    <!-- ── Basic Usage ────────────────────────────────────────── -->
    <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Basic Usage</Title>
      <Body>
        Mount <code class="doc-code">Rail</code> directly inside your root
        <code class="doc-code">+layout.svelte</code>, alongside a flex wrapper around your page
        content. The ghost div handles spacing automatically.
      </Body>

      <CodeBlock
        code={`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { App, Rail, RailItem } from '@noxlovette/material';

  let collapsed = $state(true);
  const { children } = $props();
<\/script>

<App>
  <div class="flex min-h-dvh">
    <Rail bind:collapsed>
      <RailItem label="Home"     href="/"        iconProps={{ name: 'house' }} />
      <RailItem label="Messages" href="/messages" iconProps={{ name: 'mail' }} badge={5} />
      <RailItem label="Settings" href="/settings" iconProps={{ name: 'settings' }} />
    </Rail>

    <!-- Ghost pushes content; no margin-left needed -->
    <div class="min-w-0 flex-1">
      {@render children()}
    </div>
  </div>
</App>`}
      />
    </section>

    <!-- ── With AppBar ────────────────────────────────────────── -->
    <section id="with-appbar" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>With App Bar</Title>
      <Body>
        When a top <code class="doc-code">AppBar</code> is present, pass its height (in px) to
        <code class="doc-code">railTop</code>. This shifts the rail down so it doesn't overlap the
        bar. The ghost element also respects this offset automatically.
      </Body>

      <CodeBlock
        code={`<AppBar class="fixed top-0 left-0 right-0 z-50 h-16">
  My App
</AppBar>

<div class="flex">
  <!-- rail starts at 64 px from the top (h-16 = 4rem = 64 px) -->
  <Rail railTop={64} bind:collapsed>
    <RailItem label="Home"     href="/" iconProps={{ name: 'house' }} />
    <RailItem label="Settings" href="/settings" iconProps={{ name: 'settings' }} />
  </Rail>

  <main class="min-w-0 flex-1 pt-16">
    {@render children()}
  </main>
</div>`}
      />
    </section>

    <!-- ── With FAB ───────────────────────────────────────────── -->
    <section id="with-fab" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>With FAB and Footer</Title>
      <Body>
        Use the <code class="doc-code">fab</code> snippet for a primary action button and
        <code class="doc-code">railFooter</code> for an account avatar or settings entry.
      </Body>

      <CodeBlock
        code={`<Rail bind:collapsed>
  {#snippet fab()}
    <FAB iconProps={{ name: 'edit' }} label="Compose" />
  {/snippet}

  <RailItem label="Inbox"   href="/inbox"   iconProps={{ name: 'mail' }} badge={12} />
  <RailItem label="Sent"    href="/sent"    iconProps={{ name: 'send' }} />
  <RailItem label="Drafts"  href="/drafts"  iconProps={{ name: 'draft' }} badge={-1} />
  <RailItem label="Trash"   href="/trash"   iconProps={{ name: 'delete' }} />

  {#snippet railFooter()}
    <Avatar seed="AB" href="/profile" />
  {/snippet}
</Rail>`}
      />
    </section>

    <!-- ── Anchor Modes ───────────────────────────────────────── -->
    <section id="anchor-modes" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Anchor Modes</Title>

      <div class="flex flex-col gap-4">
        {#each [{ mode: 'viewport (default)', desc: 'The rail is fixed to the left edge of the browser viewport. The ghost element in the flex row pushes content to the right. Use this for full-page app layouts.', code: `<Rail bind:collapsed>
  <!-- items -->
</Rail>` }, { mode: 'parent', desc: 'The rail is absolutely positioned within the nearest relative ancestor. Use this for embedded layouts, dashboard panels, or contained demos where you do not want the rail to escape its container.', code: `<div class="relative h-[500px] overflow-hidden">
  <Rail anchor="parent" bind:collapsed>
    <!-- items -->
  </Rail>
  <div class="ml-24">
    <!-- content -->
  </div>
</div>` }] as { mode, desc, code }}
          <div class="flex flex-col gap-2">
            <code class="text-md-sys-color-primary font-mono text-sm">{mode}</code>
            <Body class="text-md-sys-color-on-surface-variant">{desc}</Body>
            <CodeBlock {code} />
          </div>
        {/each}
      </div>
    </section>

    <!-- ── Rail Props ─────────────────────────────────────────── -->
    <section id="rail-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Rail Props</Title>

      <div class="overflow-x-auto rounded-xl border border-black/5">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-md-sys-color-surface-container-highest">
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Prop</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Type</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Default</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Description</th
              >
            </tr>
          </thead>
          <tbody>
            {#each railProps as row}
              <tr
                class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
              >
                <td class="p-3">
                  <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                    >{row.prop}</code
                  >
                </td>
                <td class="p-3">
                  <code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                    >{row.type}</code
                  >
                </td>
                <td class="p-3">
                  <code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                    >{row.default}</code
                  >
                </td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs leading-relaxed"
                  >{row.desc}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── RailItem Props ─────────────────────────────────────── -->
    <section id="railitem-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>RailItem Props</Title>

      <div class="overflow-x-auto rounded-xl border border-black/5">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-md-sys-color-surface-container-highest">
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Prop</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Type</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Default</th
              >
              <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                >Description</th
              >
            </tr>
          </thead>
          <tbody>
            {#each railItemProps as row}
              <tr
                class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
              >
                <td class="p-3">
                  <div class="flex items-center gap-1.5">
                    <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                      >{row.prop}</code
                    >
                    {#if row.required}
                      <span
                        class="bg-md-sys-color-error-container text-md-sys-color-on-error-container rounded px-1 text-[10px] font-medium"
                        >required</span
                      >
                    {/if}
                  </div>
                </td>
                <td class="p-3">
                  <code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                    >{row.type}</code
                  >
                </td>
                <td class="p-3">
                  <code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                    >{row.default}</code
                  >
                </td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs leading-relaxed"
                  >{row.desc}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Responsive Behaviour ───────────────────────────────── -->
    <section id="responsive" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Responsive Behaviour</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        The Rail and its mobile fallback are designed to work together without any manual breakpoint
        checks in your code.
      </Body>

      <div class="overflow-x-auto rounded-xl border border-black/5">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-md-sys-color-surface-container-highest">
              {#each ['Breakpoint', 'Rail', 'Scrim', 'Mobile navbar', 'Ghost width'] as h}
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >{h}</th
                >
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each [{ bp: '< md  (mobile)', rail: 'hidden', scrim: 'hidden', navbar: 'fixed bottom bar', ghost: '0' }, { bp: 'md – lg  (tablet)', rail: 'visible, 96 px', scrim: 'shown on expand', navbar: 'hidden', ghost: '96 px' }, { bp: 'lg+  (desktop)', rail: 'visible, 96 px', scrim: 'hidden', navbar: 'hidden', ghost: '96 px → 240 px' }] as row}
              <tr
                class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
              >
                <td class="p-3 font-mono text-xs">{row.bp}</td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs">{row.rail}</td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs">{row.scrim}</td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs">{row.navbar}</td>
                <td class="text-md-sys-color-on-surface-variant p-3 text-xs">{row.ghost}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <!-- ── Accessibility ──────────────────────────────────────── -->
    <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Accessibility</Title>

      <div class="flex flex-col gap-3">
        {#each [{ icon: 'keyboard', title: 'Keyboard navigation', desc: 'All RailItem links are focusable via Tab. The hamburger toggle is a native <button> and activates with Enter or Space.' }, { icon: 'visibility', title: 'Active state', desc: 'Active items receive aria-current="page" from the underlying NavigationMenu.Link (Bits UI), which assistive technology announces as the current page.' }, { icon: 'block', title: 'Disabled items', desc: 'Disabled RailItems set aria-disabled="true" and tabindex="-1", removing them from the focus order while keeping them visible.' }, { icon: 'smartphone', title: 'Mobile navbar', desc: 'The mobile navbar is a <nav> with aria-label="Mobile navigation", ensuring screen readers announce it as a separate landmark.' }] as item}
          <Card class="flex items-start gap-4 p-4">
            <div
              class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            >
              <span class="material-symbols-outlined text-[18px]">{item.icon}</span>
            </div>
            <div>
              <p class="text-md-sys-color-on-surface mb-1 text-sm font-semibold">{item.title}</p>
              <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
            </div>
          </Card>
        {/each}
      </div>
    </section>

    <!-- ── Page footer nav ────────────────────────────────────── -->
    <footer class="border-md-sys-color-outline-variant flex items-center justify-end border-t pt-8">
      <a
        href="/docs/navbar"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Navbar
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </a>
    </footer>
  </article>

  <!-- ── Right TOC ──────────────────────────────────────────────── -->
  <aside class="hidden w-52 shrink-0 xl:block">
    <TableOfContents sections={toc} />
  </aside>
</div>

<style>
  :global(.doc-code) {
    background-color: var(--md-sys-color-surface-container);
    border-radius: 4px;
    padding: 1px 6px;
    font-family: monospace;
    font-size: 0.875em;
  }
</style>
