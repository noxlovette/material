<script lang="ts">
	import { App } from '$lib/index.js';
	import './layout.css';

	const { children } = $props();

	// These icons will be pre-loaded by the MaterialSymbolsProvider inside App
	const icons = [
		'menu',
		'house',
		'circle',
		'note_stack',
		'assignment',
		'book',
		'notifications',
		'mail',
		'chat',
		'settings',
		'search',
		'favorite',
		'share',
		'delete',
		'edit',
		'add',
		'info',
		'help',
		'warning',
		'check',
		'calendar_month',
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
		'link'
	];
</script>

<App iconProviderProps={{ extraIcons: icons }}>
	{@render children()}
</App>
