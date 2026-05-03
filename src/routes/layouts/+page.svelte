<script lang="ts">
	import {
		SinglePane,
		SplitPane,
		SupportingPane,
		ScrollArea,
		Display,
		Body,
		Card,
		Title,
		Label,
		Divider,
		ListItem,
		ToggleGroup,
		ToggleGroupItem
	} from '$lib/index.js';

	let variant = $state('single');
	let leftWidth = $state(400);
</script>

<svelte:head>
	<title>Layouts | Ogonëk M3</title>
</svelte:head>

<div class="relative min-h-screen">
	{#if variant === 'single'}
		<SinglePane class="p-12" contentClass="gap-8">
			<Display>Single Pane Layout</Display>
			<Body>
				The Single Pane layout is the simplest canonical layout. It's used for focused tasks or
				simple content.
			</Body>

			<Card class="p-6">
				<Title>Content Card</Title>
				<Body>
					In a Single Pane layout, content usually flows vertically and is centered or left-aligned
					within a container.
				</Body>
			</Card>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _, i}
					<Card class="p-4">
						<Title>Item {i + 1}</Title>
						<Body>Some supporting text for this item.</Body>
					</Card>
				{/each}
			</div>
		</SinglePane>
	{:else if variant === 'split'}
		<SplitPane bind:leftWidth anchor="parent">
			{#snippet left()}
				<div class="flex flex-col gap-4 p-6">
					<Title>Navigation / List</Title>
					<Body>Left pane width: {leftWidth}px</Body>
					<div class="flex flex-col">
						{#each Array(10) as _, i}
							<ListItem
								headline="List Item {i + 1}"
								supporting="Supporting text for item {i + 1}"
							/>
						{/each}
					</div>
				</div>
			{/snippet}

			{#snippet right()}
				<div class="flex flex-col gap-8 p-12">
					<Display>Split Pane Layout</Display>
					<Body>
						Split Pane provides a resizable two-column layout. It's ideal for master-detail views.
					</Body>

					<Card class="p-6">
						<Title>Detail View</Title>
						<Body>
							Select an item from the left pane to see details here. The handle between panes allows
							resizing.
						</Body>
					</Card>

					<Card type="outlined" class="p-6">
						<Title>Resizable</Title>
						<Body>
							The left pane can be resized between its minimum and maximum defined widths.
						</Body>
					</Card>
				</div>
			{/snippet}
		</SplitPane>
	{:else if variant === 'supporting'}
		<SupportingPane collapsible anchor="parent">
			{#snippet main()}
				<div class="flex flex-col gap-8 p-12">
					<Display>Supporting Pane Layout</Display>
					<Body>The main content area is where the primary task or information is presented.</Body>

					<Card class="p-6">
						<Title>Primary Content</Title>
						<Body>
							This layout is great for complex apps where you need additional context or tools
							available but not always in the way.
						</Body>
					</Card>

					<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{#each Array(4) as _, i}
							<Card type="filled" class="p-4">
								<Title>Data Block {i + 1}</Title>
								<Body>Detailed information about this specific block of data.</Body>
							</Card>
							{#each Array(4) as _, i}
								<Card type="filled" class="p-4">
									<Title>Data Block {i + 5}</Title>
									<Body>Detailed information about this specific block of data.</Body>
								</Card>
							{/each}
						{/each}
					</div>
				</div>
			{/snippet}

			{#snippet supporting()}
				<div class="flex flex-col gap-4 p-6">
					<Title>Supporting Info</Title>
					<Body>
						This side pane provides extra context, metadata, or secondary actions related to the
						main content.
					</Body>
					<Divider />
					<Label>Metadata</Label>
					<Body>Created: Oct 24, 2023</Body>
					<Body>Author: Gemini CLI</Body>
					<Body>Status: Draft</Body>
					<Divider />
					<Label>Actions</Label>
					<div class="flex flex-col gap-2">
						<Card type="filled" class="p-3">
							<Label>Quick Note</Label>
						</Card>
						<Card type="filled" class="p-3">
							<Label>View History</Label>
						</Card>
					</div>
				</div>
			{/snippet}
		</SupportingPane>
	{:else if variant === 'scroll'}
		<div class="flex h-screen w-full items-center justify-center p-12">
			<Card class="flex h-[400px] w-full max-w-lg flex-col overflow-hidden">
				<div class="border-b border-md-sys-color-outline-variant p-4">
					<Title>Scrollable List</Title>
				</div>
				<ScrollArea class="flex-1">
					<div class="flex flex-col gap-1 p-2">
						{#each Array(50) as _, i}
							<ListItem
								headline="Scroll Item {i + 1}"
								supporting="Detailed description for index {i}"
							/>
						{/each}
					</div>
				</ScrollArea>
				<div class="border-t border-md-sys-color-outline-variant p-4">
					<Body>Footer content stays fixed</Body>
				</div>
			</Card>
		</div>
	{/if}

	<!-- FLOATING TOOLBAR -->
	<div class="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
		<Card class="flex items-center gap-2 p-2 shadow-lg ring-1 ring-md-sys-color-outline-variant">
			<ToggleGroup type="single" bind:value={variant}>
				<ToggleGroupItem value="single" label="Single" iconProps={{ name: 'square' }} />
				<ToggleGroupItem value="split" label="Split" iconProps={{ name: 'vertical_split' }} />
				<ToggleGroupItem
					value="supporting"
					label="Supporting"
					iconProps={{ name: 'side_navigation' }}
				/>
				<ToggleGroupItem value="scroll" label="Scroll Area" iconProps={{ name: 'unfold_more' }} />
			</ToggleGroup>
		</Card>
	</div>
</div>
