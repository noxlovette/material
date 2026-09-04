<!--
@component
Avatars can be used to represent people or objects.

@see https://m3.material.io/components/avatars/overview
-->
<script lang="ts">
  import { Avatar as AvatarPrimitive } from 'bits-ui';
  import { Layer } from '$lib/utils/index.js';
  import { avatar } from './theme.js';
  import { DicebearAvatarBuilder } from './DicebearAvatarBuilder.js';
  import { getMaterialAvatarPalette } from './materialAvatarPalette.js';
  import type { AvatarProps } from './types.js';

  let {
    src,
    alt = 'User avatar',
    seed = 'ogonek',
    dicebearStyle = 'shapes',
    backgroundColor,
    tags,
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

  let generatedAvatar = $state('');

  $effect(() => {
    const sizePx = sizeMap[size ?? 'lg'] ?? 96;
    const currentSeed = seed;
    const currentStyle = dicebearStyle ?? 'shapes';
    const palette = backgroundColor ?? getMaterialAvatarPalette();
    const currentTags = tags;
    let cancelled = false;

    const builder = new DicebearAvatarBuilder(currentStyle)
      .seed(currentSeed)
      .size(sizePx)
      .borderRadius(50)
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

  const { root, image, fallback, button } = $derived(avatar({ size }));

  const rootClasses = $derived(root({ class: className }));
</script>

{#if onclick}
  <button class={button({ class: rootClasses })} {onclick} type="button" data-cy="m3-avatar">
    <Layer />
    <AvatarPrimitive.Root {...rest} bind:loadingStatus class="h-full w-full">
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
  <AvatarPrimitive.Root {...rest} bind:loadingStatus class={rootClasses} data-cy="m3-avatar">
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
