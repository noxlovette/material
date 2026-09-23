<script module lang="ts">
  import { animate, mix, type AnimationPlaybackControls } from 'motion';
  import type { Attachment } from 'svelte/attachments';
  import { springTransition } from '$lib/animation/spring.js';
  import { LOADING_SHAPES } from './loadingShapes.js';

  /*
    Component-level values from the M3 loading indicator (Jetpack Compose `LoadingIndicator`, the
    reference implementation): a new morph every 650ms on a 200 / 0.6 spring, each morph adding a
    quarter turn, on top of a constant full turn every 4666ms. The spring is the component's own,
    not one of the system springs in spring.ts.
    https://m3.material.io/components/loading-indicator/specs
  */
  const MORPH_INTERVAL_MS = 650;
  const MORPH_SPRING = springTransition({ stiffness: 200, dampingRatio: 0.6 });
  const MORPH_ROTATION_DEG = 90;
  const GLOBAL_ROTATION_S = 4.666;

  /** Constant spin — a linear transform, so Motion hands it to WAAPI. */
  const spin: Attachment<SVGGElement> = (group) => {
    const controls = animate(
      group,
      { transform: ['rotate(0deg)', 'rotate(360deg)'] },
      { duration: GLOBAL_ROTATION_S, ease: 'linear', repeat: Infinity }
    );
    return () => controls.stop();
  };

  /** Morphs to the next shape every interval; the spring's overshoot also swings the quarter turn. */
  const morph: Attachment<SVGPathElement> = (path) => {
    let index = 0;
    let controls: AnimationPlaybackControls | undefined;

    const next = () => {
      const shape = mix(
        LOADING_SHAPES[index % LOADING_SHAPES.length],
        LOADING_SHAPES[(index + 1) % LOADING_SHAPES.length]
      );
      const turn = (index % 4) * MORPH_ROTATION_DEG;
      controls = animate(0, 1, {
        ...MORPH_SPRING,
        onUpdate: (progress) => {
          path.setAttribute('d', shape(progress));
          path.setAttribute('transform', `rotate(${turn + progress * MORPH_ROTATION_DEG} 24 24)`);
        }
      });
      index++;
    };

    next();
    const timer = setInterval(next, MORPH_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      controls?.stop();
    };
  };
</script>

<script lang="ts">
  import type { LoadingIndicatorProps } from './types.js';
  import { loadingIndicator } from './theme.js';
  import clsx from 'clsx';

  let {
    size = 48,
    container = false,
    center = true,
    class: className
  }: LoadingIndicatorProps = $props();

  const styling = $derived(loadingIndicator({ center, container, class: clsx(className) }));
</script>

<svg width={size} height={size} class={styling} viewBox="0 0 48 48">
  <g style="transform-box: view-box; transform-origin: center" {@attach spin}>
    <path fill="currentColor" d={LOADING_SHAPES[0]} {@attach morph} />
  </g>
</svg>
