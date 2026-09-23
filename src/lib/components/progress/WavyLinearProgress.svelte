<!--
@component
Wavy linear progress indicator — a custom M3-inspired variant.

The wave travels continuously; the filled length springs to each new `percent` on the slow
effects spring (critically damped, so progress never visibly runs backwards).

@see https://m3.material.io/components/progress-indicators/overview
-->
<script lang="ts">
  import { Progress } from 'bits-ui';
  import { animate } from 'motion';
  import { springTokens } from '$lib/animation/spring.js';
  import { SpringValue } from '$lib/animation/springValue.svelte.js';
  import { linear, trackOpacity, WAVE_PERIOD_MS } from './_wavy.js';

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

  const shown = new SpringValue(() => percent ?? 0, springTokens.slowEffects);

  /* The wave's phase: a travelling wave moves at constant speed, one wavelength per period. */
  let time = $state(0);
  $effect(() => {
    const controls = animate(0, WAVE_PERIOD_MS, {
      duration: WAVE_PERIOD_MS / 1000,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (v) => (time = v)
    });
    return () => controls.stop();
  });

  let left = $derived(thickness * 0.5);
  let right = $derived(width - thickness * 0.5);
  let percentX = $derived(
    percent != null
      ? (Math.min(100, Math.max(0, shown.current)) / 100) * (right - left) + left
      : left
  );
  let wavePath = $derived(linear(height / 2 - thickness / 2, height / 2, left, percentX, time));
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
