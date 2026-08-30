<!--
  Global Storybook decorator (registered in preview.ts). Mirrors the subset of App.svelte's
  root-level setup that story previews actually need:
  - MaterialSymbolsProvider: without this, no component ever loads the Material Symbols font,
    so every Icon renders its raw ligature text (e.g. "edit") instead of a glyph.
  - Tooltip.Provider: ButtonIcon and Tooltip both require a bits-ui Tooltip context; without it
    they throw "Context not found" the moment a story mounts one.
  Deliberately does NOT wrap in <App> itself — App's root div forces min-h-dvh and a surface
  background on every story, which fights Storybook's canvas sizing.
-->
<script lang="ts">
  import { MaterialSymbolsProvider } from '../src/lib/utils/index.js';
  import { Tooltip } from 'bits-ui';

  // Every icon name referenced anywhere in src/lib or src/routes (components + stories), so no
  // story falls back to unstyled ligature text for an icon outside MaterialSymbolsProvider's
  // default baseIcons subset. Re-run the extraction if a new icon name is introduced:
  //   grep -rhoE "(iconProps\s*=\s*\{\s*name:\s*['\"][a-z_0-9]+['\"]|<Icon[^>]*\bname=['\"][a-z_0-9]+['\"]|\bname:\s*['\"][a-z_0-9]+['\"])" src/lib src/routes | grep -oE "['\"][a-z_0-9]+['\"]" | tr -d "'\"" | sort -u
  const extraIcons = [
    'add',
    'architecture',
    'archive',
    'arrow_back',
    'arrow_drop_down',
    'arrow_forward',
    'arrow_upward',
    'assignment',
    'block',
    'book',
    'bookmark',
    'calculate',
    'calendar_month',
    'calendar_today',
    'chat',
    'check',
    'check_circle',
    'chevron_left',
    'chevron_right',
    'close',
    'content_copy',
    'content_cut',
    'content_paste',
    'credit_card',
    'delete',
    'download',
    'draft',
    'draw',
    'edit',
    'explore',
    'favorite',
    'call_end',
    'flight',
    'folder',
    'format_align_center',
    'format_align_left',
    'format_align_right',
    'format_bold',
    'format_italic',
    'format_underlined',
    'grid_view',
    'home',
    'house',
    'image',
    'inbox',
    'info',
    'link',
    'luggage',
    'mail',
    'mic',
    'mood',
    'more_vert',
    'note_stack',
    'notifications',
    'nutrition',
    'open_in_new',
    'palette',
    'person',
    'schedule',
    'search',
    'send',
    'settings',
    'share',
    'star',
    'timer',
    'videocam',
    'view_list',
    'volume_down',
    'volume_up',
    'widgets'
  ];

  let { children } = $props();
</script>

<MaterialSymbolsProvider {extraIcons} />
<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
