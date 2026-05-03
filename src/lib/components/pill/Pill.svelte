<script lang="ts">
	/**
	 * Pill component that can take various shapes.
	 */
	import * as shapes from '../../animation/shapes.js';
	import { pill } from './theme.js';
	import type { PillProps, ShapeName } from './types.js';
	import clsx from 'clsx';

	const {
		variant = 'primary',
		random = false,
		shape = 'pathPill',
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

	// Extract background color to apply to SVG path instead of the div
	// since we are using a custom shape.
	// We'll use a mapping for variants to M3 color classes.
	const variantColors: Record<string, string> = {
		primary: 'text-md-sys-color-primary',
		secondary: 'text-md-sys-color-secondary',
		tertiary: 'text-md-sys-color-tertiary',
		error: 'text-md-sys-color-error',
		container: 'text-md-sys-color-surface-container'
	};

	const onColors: Record<string, string> = {
		primary: 'text-md-sys-color-on-primary',
		secondary: 'text-md-sys-color-on-secondary',
		tertiary: 'text-md-sys-color-on-tertiary',
		error: 'text-md-sys-color-on-error',
		container: 'text-md-sys-color-on-surface'
	};
</script>

<div class={clsx(styling, onColors[variant], className)} {...restProps}>
	<svg
		viewBox="0 0 380 380"
		class={clsx('absolute inset-0 -z-10 h-full w-full', variantColors[variant])}
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path d={pathData} fill="currentColor" />
	</svg>
	<div class="relative">
		{@render children?.()}
	</div>
</div>

<style>
	div {
		/* Ensure the container doesn't have its own background if we want the shape to be the background */
		background: none !important;
	}
</style>
