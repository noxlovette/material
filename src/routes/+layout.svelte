<script lang="ts">
  import { base } from '$app/paths';
  import { onNavigate } from '$app/navigation';
  import {
    App,
    fadeThrough,
    type MaterialSymbolName,
    Navbar,
    NavbarItem,
    Rail,
    RailItem,
    ThemeSwitcher
  } from '$lib/index.js';
  import { storybookHref } from './storybook.js';
  import '../app.css';

  const { children } = $props();

  let collapsed = $state(true);

  /*
    Route changes are M3 top-level transitions (fade through): the rail and navbar destinations,
    and the guides nav, which is a drawer, all lead to unrelated pages. The region that fades is
    the one whose content changed: all of <main> between rail destinations, only the guide's
    content pane between guides, so the guides nav stays put while its selection moves. A change
    of hash alone (the "On this page" links) isn't a new page.
  */
  const inGuides = (url: URL) =>
    url.pathname === `${base}/guides` || url.pathname.startsWith(`${base}/guides/`);

  onNavigate((navigation) => {
    const from = navigation.from?.url;
    const to = navigation.to?.url;
    if (!from || !to || from.pathname === to.pathname) return;
    const target = inGuides(from) && inGuides(to) ? '[data-guide-content]' : 'main';
    return new Promise((resolve) => {
      fadeThrough(
        async () => {
          resolve();
          await navigation.complete;
        },
        { target }
      );
    });
  });

  const destinations = [
    { label: 'Overview', href: `${base}/`, iconProps: { name: 'architecture' } },
    { label: 'Guides', href: `${base}/guides`, iconProps: { name: 'menu_book' } },
    { label: 'Storybook', href: storybookHref(), external: true, iconProps: { name: 'widgets' } }
  ] as const;

  // These icons will be pre-loaded by the MaterialSymbolsProvider inside App
  const icons = [
    'house',
    'circle',
    'unfold_more',
    'note_stack',
    'assignment',
    'book',
    'gavel',
    'bug_report',
    'visibility',
    'notifications',
    'arrow_upward',
    'mail',
    'chat',
    'favorite',
    'share',
    'delete',
    'edit',
    'add',
    'info',
    'help',
    'warning',
    'check',
    'person',
    'close',
    'zoom_in',
    'zoom_out',
    'brush',
    'crop',
    'tune',
    'format_bold',
    'format_italic',
    'format_underlined',
    'strikethrough_s',
    'format_align_left',
    'format_align_right',
    'format_align_justify',
    'format_align_center',
    'undo',
    'redo',
    'link',
    'smart_button',
    'input',
    'square',
    'vertical_split',
    'view_quilt',
    'drag_indicator',
    'contrast',
    'visibility_off',
    'architecture',
    'side_navigation',
    'tab',
    'web_asset',
    'table',
    'terminal',
    'keyboard',
    'layers',
    'block',
    'open_in_new',
    'smartphone',
    'arrow_forward',
    'arrow_back',
    'more_vert',
    'flight',
    'luggage',
    'explore',
    'calendar_month',
    'sentiment_satisfied',
    'rocket_launch',
    'credit_card',
    'bottom_navigation',
    'settings',
    'light_mode',
    'dark_mode',
    'desktop_windows',
    'search',
    'title',
    'widgets',
    'waves',
    'palette',
    'menu_book',
    'token',
    'devices',
    'animation',
    'interests',
    'smart_toy'
  ] satisfies MaterialSymbolName[];
</script>

<App iconProviderProps={{ extraIcons: icons }}>
  <!-- The rail publishes --md-rail-inset and App's shell pads by it: no offset needed here. -->
  <Rail bind:collapsed>
    {#each destinations as item (item.label)}
      <RailItem {...item} />
    {/each}
  </Rail>
  <main>
    {@render children()}
  </main>
  <Navbar ghost>
    {#each destinations as item (item.label)}
      <NavbarItem label={item.label} href={item.href} iconProps={item.iconProps} />
    {/each}
  </Navbar>
  <ThemeSwitcher />
</App>
