<!--
@component
Material 3 Circular Progress Indicator.

@see https://m3.material.io/components/progress-indicators/overview#circular-progress-indicators
-->
<script lang="ts">
  import { Progress } from 'bits-ui';

  let {
    percent,
    size = 48,
    thickness = 4
  }: {
    /** The current progress percentage (0–100). Omit or pass null for indeterminate. */
    percent?: number | null;
    /** Diameter of the indicator in pixels. Defaults to 48. */
    size?: number;
    /** Stroke thickness in pixels. Defaults to 4. */
    thickness?: number;
  } = $props();

  let r = $derived(size / 2 - thickness / 2);
  let circumference = $derived(Math.PI * r * 2);
</script>

<Progress.Root value={percent ?? null} max={100} data-cy="m3-circular-progress">
  {#snippet child({ props })}
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 {size} {size}"
      xmlns="http://www.w3.org/2000/svg"
      class="rotate-[-90deg]"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        {r}
        stroke="var(--color-md-sys-color-secondary-container)"
        stroke-width={thickness}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        {r}
        stroke="var(--color-md-sys-color-primary)"
        stroke-width={thickness}
        stroke-dasharray="{circumference} {circumference}"
        stroke-dashoffset={(percent != null ? (percent / -100) * circumference : 0) + circumference}
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  {/snippet}
</Progress.Root>
