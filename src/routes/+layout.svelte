<script lang="ts">
  import { base } from '$app/paths';
  import {
    App,
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
  <!--
    flex row: Rail's ghost div is a flex item that pushes content.
    Mobile (< md):  ghost hidden → content fills full width.
    Tablet (md–lg): ghost w-24 → content offset 96 px; expanded rail overlays with scrim.
    Desktop (lg+):  ghost transitions w-24 → w-60 on expand → content smoothly pushed right.
  -->
  <div class="flex min-h-dvh">
    <Rail bind:collapsed>
      {#each destinations as item (item.label)}
        <RailItem {...item} />
      {/each}
    </Rail>
    <div class="min-w-spacing-0 flex-1">
      {@render children()}
    </div>
  </div>
  <Navbar ghost>
    {#each destinations as item (item.label)}
      <NavbarItem label={item.label} href={item.href} iconProps={item.iconProps} />
    {/each}
  </Navbar>
  <ThemeSwitcher />
</App>
