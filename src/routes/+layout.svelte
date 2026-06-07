<script lang="ts">
  import FAB from '$lib/components/buttons/FAB.svelte';
  import FABMenuItem from '$lib/components/buttons/FABMenuItem.svelte';
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
    'bottom_navigation',
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
  <!--
    flex row: Rail's ghost div is a flex item that pushes content.
    Mobile (< md):  ghost hidden → content fills full width.
    Tablet (md–lg): ghost w-24 → content offset 96 px; expanded rail overlays with scrim.
    Desktop (lg+):  ghost transitions w-24 → w-60 on expand → content smoothly pushed right.
  -->
  <div class="flex min-h-dvh">
    <Rail {fab} bind:collapsed>
      <RailItem label="Overview" href="/" iconProps={{ name: 'architecture' }} />
      <RailItem label="Docs" href="/docs" iconProps={{ name: 'book' }} />
      <RailItem label="Clickables" href="/clickables" iconProps={{ name: 'smart_button' }} />
      <RailItem label="Inputs" href="/inputs" iconProps={{ name: 'edit' }} />
      <RailItem label="Commands" href="/commands" iconProps={{ name: 'terminal' }} />
      <RailItem label="Layouts" href="/layouts" iconProps={{ name: 'view_quilt' }} />
      <RailItem label="Table" href="/table" iconProps={{ name: 'table' }} />
      <RailItem label="Typography" href="/typography" iconProps={{ name: 'title' }} />
      <RailItem label="Nav" href="/nav" iconProps={{ name: 'bottom_navigation' }} />
      <RailItem label="Misc" href="/misc" iconProps={{ name: 'circle' }} />
    </Rail>
    <div class="min-w-0 flex-1">
      {@render children()}
    </div>
  </div>
  <ThemeSwitcher />
</App>
