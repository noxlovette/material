<script lang="ts">
	import { Headline, Body, Title, Divider, Avatar, LinkPreview } from '$lib/index.js';
	import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';

	let loadingStatus = $state<'loading' | 'loaded' | 'error'>('loading');
</script>

<svelte:head>
	<title>Misc | Ogonëk M3</title>
</svelte:head>

<SinglePane class="p-12" contentClass="gap-12">
	<div class="flex flex-col gap-4">
		<Headline>Miscellaneous</Headline>
		<Body class="max-w-2xl">
			A collection of smaller components that don't fit into other categories.
		</Body>
	</div>

	<Divider />

	<div class="flex flex-col gap-8">
		<Title>Avatars</Title>
		<Body>Avatars can be used to represent people or objects.</Body>

		<div class="flex flex-col gap-6">
			<div class="flex flex-wrap items-center gap-6">
				<Avatar size="sm" seed="S" />
				<Avatar size="md" seed="M" />
				<Avatar size="lg" seed="L" />
				<Avatar
					size="lg"
					src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
					alt="User"
				/>
			</div>

			<div class="flex flex-col gap-4">
				<Title>Loading Status</Title>
				<Body>You can bind to the loading status of the avatar image.</Body>
				<div class="flex items-center gap-4">
					<Avatar
						size="lg"
						src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"
						bind:loadingStatus
					/>
					<Body>Current status: <strong>{loadingStatus}</strong></Body>
				</div>
			</div>
		</div>
	</div>

	<Divider />

	<div class="flex flex-col gap-8">
		<Title>Link Preview</Title>
		<Body>Link Previews display a preview of a link's content when hovered.</Body>

		<div class="flex flex-col gap-6">
			<div class="flex flex-wrap items-center gap-6">
				<LinkPreview>
					{#snippet trigger()}
						<a
							href="https://github.com/sveltejs/svelte"
							target="_blank"
							rel="noreferrer"
							class="text-md-sys-color-primary hover:underline"
						>
							@sveltejs
						</a>
					{/snippet}

					<div class="flex flex-col gap-2">
						<div class="flex items-center gap-3">
							<Avatar src="https://github.com/sveltejs.png" size="md" alt="Svelte logo" />
							<div class="flex flex-col">
								<Title class="md-sys-typescale-title-small">Svelte</Title>
								<Body class="md-sys-typescale-body-small text-md-sys-color-on-surface-variant">
									@sveltejs
								</Body>
							</div>
						</div>
						<Body class="md-sys-typescale-body-medium">
							Cybernetic enhancements for your web apps.
						</Body>
					</div>
				</LinkPreview>
			</div>
		</div>
	</div>
</SinglePane>
