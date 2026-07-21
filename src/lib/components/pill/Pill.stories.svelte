<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pill from './Pill.svelte';

  const { Story } = defineMeta({
    title: 'Pill/Pill',
    component: Pill,
    argTypes: {
      variant: {
        control: 'select',
        options: [
          'primary',
          'secondary',
          'tertiary',
          'error',
          'container',
          'primary-container',
          'secondary-container',
          'tertiary-container',
          'error-container',
          'yellow',
          'green'
        ]
      }
    },
    args: {
      variant: 'primary'
    }
  });
</script>

<Story name="Playground">New</Story>

<Story name="Variants" asChild>
  <div class="flex flex-wrap items-center gap-3 p-6">
    <Pill variant="primary">Primary</Pill>
    <Pill variant="secondary">Secondary</Pill>
    <Pill variant="tertiary">Tertiary</Pill>
    <Pill variant="error">Error</Pill>
    <Pill variant="container">Container</Pill>
    <Pill variant="primary-container">Primary Container</Pill>
    <Pill variant="secondary-container">Secondary Container</Pill>
    <Pill variant="tertiary-container">Tertiary Container</Pill>
    <Pill variant="error-container">Error Container</Pill>
    <Pill variant="yellow">Yellow</Pill>
    <Pill variant="green">Green</Pill>
  </div>
</Story>
