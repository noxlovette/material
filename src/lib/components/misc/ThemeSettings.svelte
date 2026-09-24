<script lang="ts">
  import { RadioGroup } from '../forms/radio-group/index.js';
  import { themeState, extractColorFromImage } from '$lib/utils/theme.svelte.js';
  import { Title } from '../typography/title/index.js';
  import { Body } from '../typography/body/index.js';

  const schemeItems = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ];

  const contrastItems = [
    { label: 'Standard', value: 'standard' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
  ];

  const variantItems = [
    { label: 'Tonal Spot', value: 'tonal-spot' },
    { label: 'Vibrant', value: 'vibrant' },
    { label: 'Fidelity', value: 'fidelity' },
    { label: 'Content', value: 'content' },
    { label: 'Fruit Salad', value: 'fruit-salad' },
    { label: 'Rainbow', value: 'rainbow' }
  ];

  async function handleImageUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const color = await extractColorFromImage(file);
      if (color) {
        themeState.sourceColor = color;
      }
    }
  }
</script>

<div class="gap-spacing-300 flex w-full flex-col">
  <!-- Source Color -->
  <div class="gap-spacing-100 flex flex-col">
    <Title size="medium">Source Color</Title>
    <div class="gap-spacing-200 flex items-center">
      <input
        type="color"
        bind:value={themeState.sourceColor}
        class="size-spacing-500 cursor-pointer bg-transparent"
      />
      <Body size="medium">{themeState.sourceColor}</Body>
    </div>
    <div class="mt-spacing-100 gap-spacing-50 flex flex-col">
      <Body size="medium">Or extract from image:</Body>
      <input
        type="file"
        accept="image/*"
        onchange={handleImageUpload}
        class="file:bg-md-sys-color-primary-container file:text-md-sys-color-on-primary-container hover:file:bg-md-sys-color-primary-container/80 md-sys-typescale-body-medium file:md-sys-typescale-label-large file:mr-spacing-200 file:px-spacing-200 file:py-spacing-100 file:rounded-full file:border-0"
      />
    </div>
  </div>

  <!-- Scheme -->
  <div class="gap-spacing-100 flex flex-col">
    <Title size="medium">Scheme</Title>
    <RadioGroup items={schemeItems} bind:value={themeState.scheme as any} orientation="vertical" />
  </div>

  <!-- Contrast -->
  <div class="gap-spacing-100 flex flex-col">
    <Title size="medium">Contrast</Title>
    <RadioGroup
      items={contrastItems}
      bind:value={themeState.contrast as any}
      orientation="vertical"
    />
  </div>

  <!-- Variant -->
  <div class="gap-spacing-100 flex flex-col">
    <Title size="medium">Variant</Title>
    <RadioGroup
      items={variantItems}
      bind:value={themeState.variant as any}
      orientation="vertical"
    />
  </div>
</div>
