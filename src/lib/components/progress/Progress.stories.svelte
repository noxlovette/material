<!--
  Three separate M3 progress-indicator components live under this folder — Circular, Linear, and
  the library's custom Wavy variant — each with its own (non-identical) prop set. They share one
  story file/title ('Feedback/Progress') with a Story block per component, each toggleable between
  determinate (`percent`, 0-100) and indeterminate (omit `percent`, or pass null).
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CircularProgress from './CircularProgress.svelte';
  import LinearProgress from './LinearProgress.svelte';
  import WavyLinearProgress from './WavyLinearProgress.svelte';

  const { Story } = defineMeta({
    title: 'Feedback/Progress',
    argTypes: {
      percent: { control: { type: 'range', min: 0, max: 100, step: 1 } }
    },
    args: {
      percent: 65
    }
  });
</script>

<Story name="Circular (Determinate)">
  {#snippet template(args)}
    <div class="flex items-center justify-center p-6">
      <CircularProgress percent={args.percent} />
    </div>
  {/snippet}
</Story>

<Story name="Circular (Indeterminate)" asChild>
  <div class="flex items-center justify-center p-6">
    <CircularProgress />
  </div>
</Story>

<Story name="Linear (Determinate)">
  {#snippet template(args)}
    <div class="flex items-center p-6">
      <LinearProgress percent={args.percent} class="w-full max-w-sm" />
    </div>
  {/snippet}
</Story>

<Story name="Linear (Indeterminate)" asChild>
  <div class="flex items-center p-6">
    <LinearProgress class="w-full max-w-sm" />
  </div>
</Story>

<Story name="Wavy (Determinate)">
  {#snippet template(args)}
    <div class="flex items-center p-6">
      <WavyLinearProgress percent={args.percent} class="w-full max-w-sm" />
    </div>
  {/snippet}
</Story>

<Story name="Wavy (Indeterminate)" asChild>
  <div class="flex items-center p-6">
    <WavyLinearProgress class="w-full max-w-sm" />
  </div>
</Story>
