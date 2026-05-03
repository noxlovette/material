<script lang="ts">
	import { App, Rail, RailItem } from '$lib/index.js';
	import { page } from '$app/state';
	import './layout.css';

	const { children } = $props();

	let collapsed = $state(true);

	// These icons will be pre-loaded by the MaterialSymbolsProvider inside App
	const icons = [
		'house',
		'circle',
		'note_stack',
		'assignment',
		'book',
		'notifications',
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
		'side_navigation'
	];
</script>

<App iconProviderProps={{ extraIcons: icons }}>
	<div class="flex min-h-screen">
		<Rail bind:collapsed>
			<RailItem {collapsed} name="Overview" href="/" iconProps={{ name: 'architecture' }} />
			<RailItem
				{collapsed}
				name="Clickables"
				href="/clickables"
				iconProps={{ name: 'smart_button' }}
			/>
			<RailItem {collapsed} name="Inputs" href="/inputs" iconProps={{ name: 'edit' }} />
			<RailItem {collapsed} name="Layouts" href="/layouts" iconProps={{ name: 'view_quilt' }} />
		</Rail>
		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</App>
