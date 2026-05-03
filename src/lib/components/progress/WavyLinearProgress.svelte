<script lang="ts">
	/**
	 * Wavy linear progress indicator — a custom M3-inspired variant.
	 *
	 * @see https://m3.material.io/components/progress-indicators/overview
	 */
	import { Progress } from 'bits-ui';
	import { linear, trackOpacity } from './_wavy.js';

	let {
		width = 600,
		height = 10,
		thickness = 4,
		percent,
		class: className
	}: {
		/** Width of the SVG viewBox. */
		width?: number;
		/** Height of the SVG viewBox. */
		height?: number;
		/** Thickness of the progress line. */
		thickness?: number;
		/** Completion percentage (0–100). Omit or pass null for indeterminate. */
		percent?: number | null;
		class?: string;
	} = $props();

	let left = $derived(thickness * 0.5);
	let right = $derived(width - thickness * 0.5);
	let percentX = $derived(percent != null ? (percent / 100) * (right - left) + left : left);
	let wavePath = $derived(linear(height / 2 - thickness / 2, height / 2, left, percentX, 0));
</script>

<Progress.Root value={percent ?? null} max={100}>
	{#snippet child({ props })}
		<svg {...props} viewBox="0 0 {width} {height}" class={className}>
			<path
				fill="none"
				stroke="var(--color-md-sys-color-primary)"
				stroke-width={thickness}
				stroke-linecap="round"
				d={wavePath}
			/>
			<line
				fill="none"
				stroke="var(--color-md-sys-color-secondary-container)"
				stroke-width={thickness}
				stroke-linecap="round"
				x1={percentX + thickness + 4}
				y1={height / 2}
				x2={right}
				y2={height / 2}
				opacity={trackOpacity(right, percentX + thickness + 4)}
			/>
		</svg>
	{/snippet}
</Progress.Root>
