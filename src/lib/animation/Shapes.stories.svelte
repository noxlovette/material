<!--
  The 35 M3 Expressive shapes (https://m3.material.io/styles/shape), all morphable with Motion.
  Pick a shape to morph the hero (720-point `animatableShapes`) and the icon-sized preview
  (120-point `animatableShapesSmall`) to it on the `fastSpatial` spring.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Motion/Shapes',
    tags: ['!autodocs']
  });
</script>

<script lang="ts">
  import Body from '$lib/components/typography/body/Body.svelte';
  import {
    animatableShapes,
    animatableShapesSmall,
    shapeMorph,
    shapeNames,
    type ShapeName
  } from './shapeMorph.svelte.js';

  let selected = $state<ShapeName>('circle');
</script>

<Story name="Shape library" asChild>
  <div class="gap-spacing-300 flex flex-col">
    <div class="gap-spacing-300 flex items-center">
      <svg viewBox="0 0 380 380" class="text-md-sys-color-primary size-48" aria-hidden="true">
        <path fill="currentColor" {@attach shapeMorph(() => animatableShapes[selected])} />
      </svg>
      <svg
        viewBox="0 0 48 48"
        class="text-md-sys-color-tertiary size-spacing-600"
        aria-hidden="true"
      >
        <path fill="currentColor" {@attach shapeMorph(() => animatableShapesSmall[selected])} />
      </svg>
      <Body>{selected}</Body>
    </div>

    <div class="gap-spacing-100 grid grid-cols-5 sm:grid-cols-7">
      {#each shapeNames as name (name)}
        <button
          type="button"
          aria-pressed={selected === name}
          onclick={() => (selected = name)}
          class="md-sys-typescale-label-small text-md-sys-color-on-surface-variant aria-pressed:bg-md-sys-color-secondary-container aria-pressed:text-md-sys-color-on-secondary-container gap-spacing-50 p-spacing-100 flex flex-col items-center rounded-md"
        >
          <svg viewBox="0 0 48 48" class="size-spacing-500" aria-hidden="true">
            <path fill="currentColor" d={animatableShapesSmall[name]} />
          </svg>
          {name}
        </button>
      {/each}
    </div>
  </div>
</Story>
