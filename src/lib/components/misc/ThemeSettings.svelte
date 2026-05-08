<script lang="ts">
	import { RadioGroup } from '../forms/radio-group/index.js';
	import { themeState, extractColorFromImage } from '$lib/utils/theme.svelte.js';
	import { Title } from '../typography/title/index.js';
	import { Body } from '../typography/body/index.js';

	const schemeItems = [
		{ label: 'System', value: 'system' },
		{ label: 'Light', value: 'light' },
		{ label: 'Dark', value: 'dark' }
	];

	const contrastItems = [
		{ label: 'Standard', value: 'standard' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'High', value: 'high' }
	];

	const variantItems = [
		{ label: 'Tonal Spot', value: 'tonal-spot' },
		{ label: 'Vibrant', value: 'vibrant' },
		{ label: 'Fidelity', value: 'fidelity' },
		{ label: 'Content', value: 'content' },
		{ label: 'Fruit Salad', value: 'fruit-salad' },
		{ label: 'Rainbow', value: 'rainbow' }
	];

	async function handleImageUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const color = await extractColorFromImage(file);
			if (color) {
				themeState.sourceColor = color;
			}
		}
	}
</script>

<div class="flex w-full flex-col gap-6">
	<!-- Source Color -->
	<div class="flex flex-col gap-2">
		<Title size="medium">Source Color</Title>
		<div class="flex items-center gap-4">
			<input
				type="color"
				bind:value={themeState.sourceColor}
				class="h-10 w-10 cursor-pointer rounded-full border-0 bg-transparent p-0"
			/>
			<Body size="medium">{themeState.sourceColor}</Body>
		</div>
		<div class="mt-2 flex flex-col gap-1">
			<Body size="medium">Or extract from image:</Body>
			<input
				type="file"
				accept="image/*"
				onchange={handleImageUpload}
				class="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-md-sys-color-primary-container file:px-4 file:py-2 file:text-sm file:font-semibold file:text-md-sys-color-on-primary-container hover:file:bg-md-sys-color-primary-container/80"
			/>
		</div>
	</div>

	<!-- Scheme -->
	<div class="flex flex-col gap-2">
		<Title size="medium">Scheme</Title>
		<RadioGroup items={schemeItems} bind:value={themeState.scheme as any} orientation="vertical" />
	</div>

	<!-- Contrast -->
	<div class="flex flex-col gap-2">
		<Title size="medium">Contrast</Title>
		<RadioGroup
			items={contrastItems}
			bind:value={themeState.contrast as any}
			orientation="vertical"
		/>
	</div>

	<!-- Variant -->
	<div class="flex flex-col gap-2">
		<Title size="medium">Variant</Title>
		<RadioGroup
			items={variantItems}
			bind:value={themeState.variant as any}
			orientation="vertical"
		/>
	</div>
</div>
