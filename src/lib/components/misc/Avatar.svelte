<!--
@component
Avatars can be used to represent people or objects.

@see https://m3.material.io/components/avatars/overview
-->
<script lang="ts">
  import { Avatar as AvatarPrimitive } from "bits-ui";
  import { Layer } from "$lib/utils/index.js";
  import { avatar } from "./theme.js";
  import type { AvatarProps } from "./types.js";

  let {
    src,
    alt = "User avatar",
    seed = "ogonek",
    size = "lg",
    loadingStatus = $bindable("loading"),
    class: className,
    onclick,
    ...rest
  }: AvatarProps = $props();

  const materialPalette = ["e8f0fe", "e8f5e9", "fff7e6", "fde7ec", "e3f2fd"];
  const dicebearBaseUrl = "https://api.dicebear.com/9.x/shapes/svg";
  const sizeMap = {
    sm: 48,
    md: 72,
    lg: 96,
  } as const;

  const generatedAvatar = $derived.by(() => {
    const sizePx = sizeMap[size ?? "lg"] ?? 96;
    const params = new URLSearchParams({
      seed,
      size: String(sizePx),
      radius: "50",
      backgroundColor: materialPalette.join(","),
    });

    return `${dicebearBaseUrl}?${params.toString()}`;
  });

  const { root, image, fallback, button } = $derived(avatar({ size }));

  const rootClasses = $derived(root({ class: className }));
</script>

{#if onclick}
  <button class={button({ class: rootClasses })} {onclick} type="button">
    <Layer />
    <AvatarPrimitive.Root {...rest} bind:loadingStatus class="h-full w-full">
      {#if src}
        <AvatarPrimitive.Image {src} {alt} class={image()} />
      {/if}
      <AvatarPrimitive.Fallback class={fallback()}>
        <img src={generatedAvatar} {alt} class={image()} />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  </button>
{:else}
  <AvatarPrimitive.Root {...rest} bind:loadingStatus class={rootClasses}>
    {#if src}
      <AvatarPrimitive.Image {src} {alt} class={image()} />
    {/if}
    <AvatarPrimitive.Fallback class={fallback()}>
      <img src={generatedAvatar} {alt} class={image()} />
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
{/if}
