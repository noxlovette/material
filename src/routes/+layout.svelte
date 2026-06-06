<script lang="ts">
  import FAB from '$lib/components/buttons/FAB.svelte';
  import FABMenuItem from '$lib/components/buttons/FABMenuItem.svelte';
  import Navbar from '$lib/components/nav/navbar/Navbar.svelte';
  import NavbarItem from '$lib/components/nav/navbar/NavbarItem.svelte';
  import { App, Rail, RailItem, ThemeSwitcher } from '$lib/index.js';
  import '../app.css';

  const { children } = $props();

  let collapsed = $state(true);

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
    'architecture',
    'side_navigation',
    'table',
    'terminal',
    'keyboard',
    'calendar_month',
    'sentiment_satisfied',
    'rocket_launch',
    'credit_card',
    'settings',
    'light_mode',
    'dark_mode',
    'desktop_windows',
    'search',
    'title'
  ];
</script>

{#snippet fab()}
  <FAB withMenu label="Добавить" data-cy="fab-add" iconProps={{ name: 'add' }}>
    <FABMenuItem
      href="#"
      data-sveltekit-preload-data="tap"
      data-cy="fab-add-task"
      iconProps={{ name: 'assignment' }}>Задание</FABMenuItem
    >
    <FABMenuItem href="#" data-cy="fab-add-event" iconProps={{ name: 'home' }}>Событие</FABMenuItem>
    <FABMenuItem
      href="#"
      data-sveltekit-preload-data="tap"
      data-cy="fab-add-deck"
      iconProps={{ name: 'note_stack' }}>Дека</FABMenuItem
    >
  </FAB>
{/snippet}
<App iconProviderProps={{ extraIcons: icons }}>
  <Rail {fab} bind:collapsed>
    <RailItem label="Overview" href="/" iconProps={{ name: 'architecture' }} />
    <RailItem
      {collapsed}
      label="Clickables"
      href="/clickables"
      iconProps={{ name: 'smart_button' }}
    />
    <RailItem label="Inputs" href="/inputs" iconProps={{ name: 'edit' }} />
    <RailItem label="Commands" href="/commands" iconProps={{ name: 'terminal' }} />
    <RailItem label="Layouts" href="/layouts" iconProps={{ name: 'view_quilt' }} />
    <RailItem label="Table" href="/table" iconProps={{ name: 'table' }} />
    <RailItem label="Typography" href="/typography" iconProps={{ name: 'title' }} />
    <RailItem label="Misc" href="/misc" iconProps={{ name: 'circle' }} />
  </Rail>
  {@render children()}
  <ThemeSwitcher />
  <Navbar ghost>
    <NavbarItem label="Overview" href="/" iconProps={{ name: 'architecture' }} />
    <NavbarItem label="Clickables" href="/clickables" iconProps={{ name: 'smart_button' }} />
    <NavbarItem label="Inputs" href="/inputs" iconProps={{ name: 'edit' }} />
    <NavbarItem label="Typography" href="/typography" iconProps={{ name: 'title' }} />
  </Navbar>
</App>
