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

	// Extract background color to apply to SVG path instead of the div
	// since we are using a custom shape.
	// We'll use CSS variables directly as requested.
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

<div class={clsx(styling, className)} style:color={onColorVar} {...restProps}>
	<svg
		viewBox="0 0 48 48"
		class="absolute inset-0 -z-10 h-full w-full"
		style:color={colorVar}
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path d={pathData} fill="currentColor" />
	</svg>
	<div class="relative">
		{@render children?.()}
	</div>
</div>
