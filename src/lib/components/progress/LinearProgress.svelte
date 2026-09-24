<!--
@component
Material 3 Linear Progress Indicator.

Determinate: the bar springs to each new `percent` on the slow effects spring (critically damped,
so progress never visibly runs backwards). Indeterminate: the bar's head and tail spring across
the track on springs of different stiffness, so it stretches out and catches up on every pass.
The track always keeps a gap either side of the bar.

@see https://m3.material.io/components/progress-indicators/overview#linear-progress-indicators
-->
<script lang="ts">
  import clsx from 'clsx';
  import { tv } from '$lib/utils/tv.js';
  import { Progress } from 'bits-ui';
  import { animate, type AnimationPlaybackControls } from 'motion';
  import { springTokens, springTransition } from '$lib/animation/spring.js';
  import { SpringValue } from '$lib/animation/springValue.svelte.js';

  let {
    percent,
    height = 4,
    class: className
  }: {
    /** The current progress percentage (0–100). Omit or pass null for indeterminate. */
    percent?: number | null;
    /** Height of the bar in pixels. Defaults to 4. */
    height?: number;
    class?: string;
  } = $props();

  /* M3: 4dp between the indicator and the track. */
  const GAP_PX = 4;

  const linearProgress = tv({
    slots: {
      container: 'relative overflow-hidden',
      segment: 'absolute inset-y-spacing-0 rounded-full',
      bar: 'bg-md-sys-color-primary',
      track: 'bg-md-sys-color-secondary-container'
    }
  });

  const { container, segment, bar, track } = linearProgress();

  const shown = new SpringValue(() => (percent ?? 0) / 100, springTokens.slowEffects);

  /* Indeterminate pass: the head leads on the spatial spring, the tail trails on the slower one. */
  let head = $state(0);
  let tail = $state(0);

  $effect(() => {
    if (percent != null) return;
    let running = true;
    let controls: AnimationPlaybackControls[] = [];

    (async () => {
      while (running) {
        head = 0;
        tail = 0;
        controls = [
          animate(0, 1, {
            ...springTransition(springTokens.spatial),
            onUpdate: (v) => (head = v)
          }),
          animate(0, 1, {
            ...springTransition(springTokens.slowSpatial),
            onUpdate: (v) => (tail = v)
          })
        ];
        await Promise.all(controls);
      }
    })();

    return () => {
      running = false;
      controls.forEach((c) => c.stop());
    };
  });

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const start = $derived(percent != null ? 0 : clamp01(tail));
  const end = $derived(percent != null ? clamp01(shown.current) : clamp01(head));
</script>

<Progress.Root
  value={percent ?? null}
  max={100}
  class={container({ class: clsx(className) })}
  style="height: {height / 16}rem"
  data-cy="m3-linear-progress"
>
  {#if start > 0}
    <div
      class={segment({ class: track() })}
      style="left: 0; width: max(0px, calc({start} * 100% - {GAP_PX}px))"
    ></div>
  {/if}
  {#if end > start}
    <div
      class={segment({ class: bar() })}
      style="left: calc({start} * 100%); width: calc({end - start} * 100%)"
    ></div>
  {/if}
  <div
    class={segment({ class: track() })}
    style="right: 0; width: max(0px, calc({1 - end} * 100% - {end > start ? GAP_PX : 0}px))"
  ></div>
</Progress.Root>
