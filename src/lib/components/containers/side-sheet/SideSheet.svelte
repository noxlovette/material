<!--
@component
Side sheets are supplementary surfaces which are anchored to the edge of the screen.

@see https://m3.material.io/components/side-sheets/guidelines
-->
<script lang="ts">
  import type { SideSheetProps } from './types.js';
  import ButtonIcon from '$lib/components/buttons/ButtonIcon.svelte';

  let { headline, children, close }: SideSheetProps = $props();
</script>

<div class="flex flex-col">
  <div class="flex items-center justify-between p-6">
    <span class="md-sys-typescale-title-large text-md-sys-color-on-surface-variant">{headline}</span
    >
    <ButtonIcon variant="text" iconProps={{ name: 'close' }} onclick={close} />
  </div>
  {@render children()}
</div>
