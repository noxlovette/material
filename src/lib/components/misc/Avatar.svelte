<!--
@component
Avatars can be used to represent people or objects.

The avatar is cut to one of the M3 Expressive shapes (`shape`, a circle by default), morphing on
`fastSpatial` when the shape changes. `spin` turns the shape at a constant speed, clockwise or
counterclockwise, while the picture inside stays upright.

@see https://m3.material.io/components/avatars/overview
@see https://m3.material.io/styles/shape
-->
<script module lang="ts">
  import { animate } from 'motion';
  import { prefersReducedMotion } from '$lib/animation/reducedMotion.js';

  /*
    One full turn of a spinning shape. A constant, linear spin has no spring to take from the
    motion tokens, like the loading indicator's global rotation (4.666s a turn); an avatar is
    decoration beside content, not a progress signal, so it turns about three times slower.
  */
  const SPIN_TURN_S = 14;

  /*
    The shapes sit in a 48 × 48 box with the circle spanning 8..40, so this maps the circle onto
    the avatar's bounding box (clip-path objectBoundingBox units are 0..1). Wider shapes
    (clamshell, the bursts) run to the avatar's edges.
  */
  const FIT = 'scale(0.03125) translate(-8 -8)';

  /** Turns the clip path around the shape's centre; never under reduced motion (decorative). */
  const spinClip = (path: SVGPathElement, direction: 'clockwise' | 'counterclockwise') => {
    if (prefersReducedMotion()) return;
    const sign = direction === 'clockwise' ? 1 : -1;
    const controls = animate(0, 360, {
      duration: SPIN_TURN_S,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (deg) => path.setAttribute('transform', `${FIT} rotate(${sign * deg} 24 24)`)
    });
    return () => {
      controls.stop();
      path.setAttribute('transform', FIT);
    };
  };
</script>

<script lang="ts">
  import { untrack } from 'svelte';
  import { Avatar as AvatarPrimitive } from 'bits-ui';
  import { Layer } from '$lib/utils/index.js';
  import { animatableShapesSmall, shapeMorph } from '$lib/animation/shapeMorph.svelte.js';
  import { avatar } from './theme.js';
  import { DicebearAvatarBuilder } from './DicebearAvatarBuilder.js';
  import { getMaterialAvatarPalette } from './materialAvatarPalette.js';
  import type { AvatarProps } from './types.js';

  let {
    src,
    alt = 'User avatar',
    seed = 'ogonek',
    dicebearStyle = 'gaze',
    backgroundColor,
    tags = ['animation'],
    shape = 'circle',
    spin = 'none',
    size = 'lg',
    loadingStatus = $bindable('loading'),
    class: className,
    onclick,
    ...rest
  }: AvatarProps = $props();

  const sizeMap = {
    xxs: 20,
    xs: 32,
    sm: 48,
    md: 72,
    lg: 96
  } as const;

  const uid = $props.id();
  const clipId = `m3-avatar-${uid}`;
  // Rendered into the markup so SSR draws the shape; later changes morph from here.
  const initialShape = untrack(() => animatableShapesSmall[shape]);

  let generatedAvatar = $state('');

  $effect(() => {
    const sizePx = sizeMap[size ?? 'lg'] ?? 96;
    const currentSeed = seed;
    const currentStyle = dicebearStyle ?? 'gaze';
    const palette = backgroundColor ?? getMaterialAvatarPalette();
    const currentTags = tags;
    let cancelled = false;

    // Square: the clip path gives the avatar its shape.
    const builder = new DicebearAvatarBuilder(currentStyle)
      .seed(currentSeed)
      .size(sizePx)
      .background(palette);

    if (currentTags) builder.tags(currentTags);

    builder.toDataUri().then((uri) => {
      if (cancelled) return;
      generatedAvatar = uri;
    });

    return () => {
      cancelled = true;
    };
  });

  const { root, image, fallback, button, clip } = $derived(avatar({ size }));

  const rootClasses = $derived(root({ class: className }));
</script>

<svg class={clip()} aria-hidden="true">
  <clipPath id={clipId} clipPathUnits="objectBoundingBox">
    <path
      d={initialShape}
      transform={FIT}
      {@attach shapeMorph(() => animatableShapesSmall[shape])}
      {@attach (path: SVGPathElement) => (spin === 'none' ? undefined : spinClip(path, spin))}
    />
  </clipPath>
</svg>

{#if onclick}
  <button class={button({ class: rootClasses })} {onclick} type="button" data-cy="m3-avatar">
    <!-- The state layer sits inside the clipped root, so hover and press take the shape too. -->
    <AvatarPrimitive.Root
      {...rest}
      bind:loadingStatus
      class="relative h-full w-full"
      style="clip-path: url(#{clipId})"
      data-shape={shape}
    >
      <Layer />
      {#if src}
        <AvatarPrimitive.Image {src} {alt} class={image()} />
      {/if}
      <AvatarPrimitive.Fallback class={fallback()}>
        {#if generatedAvatar}
          <img src={generatedAvatar} {alt} class={image()} />
        {/if}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  </button>
{:else}
  <AvatarPrimitive.Root
    {...rest}
    bind:loadingStatus
    class={rootClasses}
    style="clip-path: url(#{clipId})"
    data-cy="m3-avatar"
    data-shape={shape}
  >
    {#if src}
      <AvatarPrimitive.Image {src} {alt} class={image()} />
    {/if}
    <AvatarPrimitive.Fallback class={fallback()}>
      {#if generatedAvatar}
        <img src={generatedAvatar} {alt} class={image()} />
      {/if}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
{/if}
