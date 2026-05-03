<!--
@component
Pill component that can take various shapes.
-->
<script lang="ts">
	import * as shapes from '../../animation/shapesAnimatableSmall.js';
	import { pill } from './theme.js';
	import type { PillProps, ShapeName } from './types.js';
	import clsx from 'clsx';

	const {
		variant = 'primary',
		random = false,
		shape = 'pathAnimatableSmallPill',
		children,
		class: className,
		...restProps
	}: PillProps = $props();

	const allShapeNames = Object.keys(shapes) as ShapeName[];

	function getRandomShape(): ShapeName {
		const randomIndex = Math.floor(Math.random() * allShapeNames.length);
		return allShapeNames[randomIndex];
	}

	const selectedShape = $derived(random ? getRandomShape() : shape);
	const pathData = $derived(shapes[selectedShape]);

	const styling = $derived(pill({ variant }));

	// To prevent "smashing", we only stretch the "Pill" shape.
	const isPill = $derived(selectedShape.toLowerCase().includes('pill'));

	// Theme color logic based on CSS variables from theme.css (light.css/dark.css)
	const colorVar = $derived(
		variant === 'container'
			? 'var(--color-md-sys-color-surface-container)'
			: `var(--color-md-sys-color-${variant})`
	);

	const onColorVar = $derived(
		variant === 'container'
			? 'var(--color-md-sys-color-on-surface)'
			: `var(--color-md-sys-color-on-${variant})`
	);
</script>

<div
	class={clsx(styling, className)}
	style:color={onColorVar}
	{...restProps}
>
	<svg
		viewBox="0 0 48 48"
		class="absolute inset-0 -z-10 h-full w-full"
		preserveAspectRatio={isPill ? 'none' : 'xMidYMid meet'}
		aria-hidden="true"
	>
		<path d={pathData} fill={colorVar} />
	</svg>
	<div class="relative flex items-center justify-center">
		{@render children?.()}
	</div>
</div>

<style>
	div {
		/* Disable default background/rounding from theme classes to use our SVG shape */
		background: none !important;
		border: none !important;
		border-radius: 0 !important;
	}
</style>
