<!--
@component
Material 3 Linear Progress Indicator.

@see https://m3.material.io/components/progress-indicators/overview#linear-progress-indicators
-->
<script lang="ts">
  import clsx from 'clsx';
  import { tv } from 'tailwind-variants';
  import { Progress } from 'bits-ui';

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

  const linearProgress = tv({
    slots: {
      container: 'flex gap-1',
      fill: 'bg-md-sys-color-primary rounded-full shrink',
      track: 'bg-md-sys-color-secondary-container rounded-full grow'
    }
  });

  const { container, fill, track } = linearProgress();
</script>

<Progress.Root
  value={percent ?? null}
  max={100}
  class={container({ class: clsx(className) })}
  style="height: {height / 16}rem"
>
  {#if percent != null}
    <div class={fill()} style:width="{percent}%"></div>
  {/if}
  <div class={track()}></div>
</Progress.Root>
