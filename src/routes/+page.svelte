<script lang="ts">
	import { Display, Headline, Body, Card, Title, Icon, Divider } from '$lib/index.js';
	import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';

	const sections = [
		{
			title: 'Clickables',
			description: 'Buttons, FABs, Tooltips, Navigation, Cards, Dialogues, Popovers, and more.',
			href: '/clickables',
			icon: 'smart_button'
		},
		{
			title: 'Inputs',
			description: 'Text Fields, Checkboxes, Switches, Selects, Sliders, and Form components.',
			href: '/inputs',
			icon: 'edit'
		},
		{
			title: 'Layouts',
			description: 'Canonical Material 3 layouts: Single Pane, Split Pane, and Supporting Pane.',
			href: '/layouts',
			icon: 'view_quilt'
		}
	];
</script>

<svelte:head>
	<title>Overview | Ogonëk M3</title>
</svelte:head>

<SinglePane class="p-12" contentClass="gap-12">
	<div class="flex flex-col gap-4">
		<Display>Ogonëk M3</Display>
		<Headline>Component Library Overview</Headline>
		<Body class="max-w-2xl">
			Welcome to the Ogonëk M3 component library. This library is built following Material Design 3
			guidelines and uses Bits UI for headless components.
		</Body>
	</div>

	<Divider />

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each sections as section}
			<a href={section.href} class="no-underline">
				<Card class="h-full p-6 transition-all hover:bg-md-sys-color-surface-container-high">
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-3">
							<Icon name={section.icon} class="text-md-sys-color-primary" />
							<Title>{section.title}</Title>
						</div>
						<Body>{section.description}</Body>
					</div>
				</Card>
			</a>
		{/each}
	</div>
</SinglePane>
