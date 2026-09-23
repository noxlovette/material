<!--
@component
Material 3 Circular Progress Indicator.

Determinate: the arc springs to each new `percent` on the slow effects spring (critically damped,
so progress never visibly runs backwards), with a gap separating it from the track.
Indeterminate: the arc's head and tail take turns springing ahead, so it grows, shrinks and
travels around the circle.

@see https://m3.material.io/components/progress-indicators/overview#circular-progress-indicators
-->
<script lang="ts">
  import { Progress } from 'bits-ui';
  import { animate, type AnimationPlaybackControls } from 'motion';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { SpringValue } from '$lib/animation/springValue.svelte.js';

  let {
    percent,
    size = 48,
    thickness = 4
  }: {
    /** The current progress percentage (0–100). Omit or pass null for indeterminate. */
    percent?: number | null;
    /** Diameter of the indicator in pixels. Defaults to 48. */
    size?: number;
    /** Stroke thickness in pixels. Defaults to 4. */
    thickness?: number;
  } = $props();

  /* M3: 4dp between the indicator and the track, measured between the rounded caps. */
  const GAP_PX = 4;
  /* Indeterminate arc lengths it grows to and shrinks back to. Not M3 values: tune by eye. */
  const MIN_SWEEP_DEG = 20;
  const MAX_SWEEP_DEG = 270;

  const r = $derived(size / 2 - thickness / 2);
  const circumference = $derived(Math.PI * r * 2);
  /* Round caps overhang each end by half the stroke; the gap sits between those caps. */
  const gapDeg = $derived((((GAP_PX + thickness) / r) * 180) / Math.PI);

  const shown = new SpringValue(() => percent ?? 0, springTokens.slowEffects);

  let head = $state(0);
  let tail = $state(0);

  $effect(() => {
    if (percent != null) return;
    let running = true;
    let controls: AnimationPlaybackControls | undefined;
    const spring = springTransition(springTokens.spatial);

    (async () => {
      let h = 0;
      let t = 0;
      while (running) {
        controls = animate(h, t + MAX_SWEEP_DEG, { ...spring, onUpdate: (v) => (head = v) });
        await controls;
        h = t + MAX_SWEEP_DEG;
        if (!running) break;
        controls = animate(t, h - MIN_SWEEP_DEG, { ...spring, onUpdate: (v) => (tail = v) });
        await controls;
        t = h - MIN_SWEEP_DEG;
      }
    })();

    return () => {
      running = false;
      controls?.stop();
    };
  });

  /** An arc from `fromDeg`, `sweepDeg` long, as stroke-dash values (0° = 12 o'clock). */
  const arc = (fromDeg: number, sweepDeg: number) => ({
    dasharray: `${(Math.max(0, sweepDeg) / 360) * circumference} ${circumference}`,
    dashoffset: (-(fromDeg % 360) / 360) * circumference,
    // A zero-length dash with round caps still paints a dot.
    opacity: sweepDeg > 0.5 ? 1 : 0
  });

  const from = $derived(percent != null ? 0 : tail);
  const sweep = $derived(percent != null ? (shown.current / 100) * 360 : head - tail);

  const indicator = $derived(arc(from, sweep));
  /* The track fills the rest of the circle, keeping a gap either side of the indicator. M3 draws
     no track while indeterminate. */
  const track = $derived(
    percent == null
      ? arc(0, 0)
      : indicator.opacity
        ? arc(from + sweep + gapDeg, 360 - sweep - gapDeg * 2)
        : arc(0, 360)
  );
</script>

<Progress.Root value={percent ?? null} max={100} data-cy="m3-circular-progress">
  {#snippet child({ props })}
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 {size} {size}"
      xmlns="http://www.w3.org/2000/svg"
      class="rotate-[-90deg]"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        {r}
        stroke="var(--color-md-sys-color-secondary-container)"
        stroke-width={thickness}
        stroke-dasharray={track.dasharray}
        stroke-dashoffset={track.dashoffset}
        opacity={track.opacity}
        stroke-linecap="round"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        {r}
        stroke="var(--color-md-sys-color-primary)"
        stroke-width={thickness}
        stroke-dasharray={indicator.dasharray}
        stroke-dashoffset={indicator.dashoffset}
        opacity={indicator.opacity}
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  {/snippet}
</Progress.Root>
