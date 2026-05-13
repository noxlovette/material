<script lang="ts">
  import FAB from '$lib/components/buttons/FAB.svelte';
  import FABMenu from '$lib/components/buttons/FABMenu.svelte';
  import FABMenuItem from '$lib/components/buttons/FABMenuItem.svelte';
  import { App, Rail, RailItem, ThemeSwitcher, isDarkScheme } from '$lib/index.js';
  import '../app.css';

  const { children, data } = $props();

  const isDark = $derived(isDarkScheme(data.themeConfig.scheme));
  let collapsed = $state(true);

  // These icons will be pre-loaded by the MaterialSymbolsProvider inside App
  const icons = [
    'house',
    'circle',
    'unfold_more',
    'note_stack',
    'assignment',
    'book',
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
    'search'
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
<App iconProviderProps={{ extraIcons: icons }} themeConfig={data.themeConfig} {isDark}>
  <div class="flex min-h-screen">
    <Rail {fab} bind:collapsed>
      <RailItem {collapsed} name="Overview" href="/" iconProps={{ name: 'architecture' }} />
      <RailItem
        {collapsed}
        name="Clickables"
        href="/clickables"
        iconProps={{ name: 'smart_button' }}
      />
      <RailItem {collapsed} name="Inputs" href="/inputs" iconProps={{ name: 'edit' }} />
      <RailItem {collapsed} name="Commands" href="/commands" iconProps={{ name: 'terminal' }} />
      <RailItem {collapsed} name="Layouts" href="/layouts" iconProps={{ name: 'view_quilt' }} />
      <RailItem {collapsed} name="Table" href="/table" iconProps={{ name: 'table' }} />
      <RailItem {collapsed} name="Misc" href="/misc" iconProps={{ name: 'circle' }} />
    </Rail>
    <main class="flex-1">
      {@render children()}
    </main>
    <ThemeSwitcher />
  </div>
</App>
