<!--
@component
Material 3 Slider.

Sliders allow users to make selections from a range of values.

The handle follows the pointer 1:1 while dragged; any other change (a keyboard step, a click on
the track, a new `value` from outside) springs to it on the fast spatial spring.

@see https://m3.material.io/components/sliders/overview
-->
<script lang="ts">
  import { Slider } from 'bits-ui';
  import clsx from 'clsx';
  import type { Attachment } from 'svelte/attachments';
  import { springTokens } from '$lib/animation/spring.js';
  import { SpringValue } from '$lib/animation/springValue.svelte.js';
  import { Icon } from '$lib/utils/index.js';
  import { slider } from './theme.js';
  import type { SliderProps } from './types.js';

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 'any',
    disabled = false,
    showValue = true,
    size = 'xs',
    leadingIconProps,
    trailingIconProps,
    stops = false,
    endStops = true,
    vertical = false,
    format = (n: number) => n.toFixed(0),
    class: className,
    dir,
    id,
    ...extra
  }: SliderProps = $props();

  /* M3 slider geometry, in px. */
  const HANDLE_PX = 4;
  const GAP_PX = 6;
  const ICON_PADDING_PX = 8;
  /* Stops closer than this to the handle's center are hidden under its gap. */
  const STOP_CLEARANCE_PX = HANDLE_PX / 2 + GAP_PX;

  const iconSize = $derived(size === 'xl' ? 'lg' : 'md');
  const iconPx = $derived(size === 'xl' ? 40 : 24);

  const stepValue = $derived(typeof step === 'number' ? step : undefined);
  const range = $derived(max - min);
  const toFraction = (v: number) => (range > 0 ? (v - min) / range : 0);

  /* ---- motion ---------------------------------------------------------------------------- */

  /*
    A press that jumps the value (a click on the track) springs; once the pointer moves while
    pressed, the handle is being dragged and tracks it directly.
  */
  let dragging = $state(false);

  const trackDrag: Attachment<HTMLElement> = (node) => {
    const move = () => (dragging = true);
    const release = () => {
      dragging = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
    const press = () => {
      if (disabled) return;
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', release);
      window.addEventListener('pointercancel', release);
    };
    node.addEventListener('pointerdown', press);
    return () => {
      node.removeEventListener('pointerdown', press);
      release();
    };
  };

  /** The rendered position as a 0–1 fraction; springs towards `value` unless dragging. */
  const fraction = new SpringValue(
    () => toFraction(value),
    springTokens.fastSpatial,
    () => dragging
  );

  /* The spring may overshoot the ends; the track can't. */
  const pos = $derived(Math.min(1, Math.max(0, fraction.current)));

  /* ---- geometry -------------------------------------------------------------------------- */

  let trackWidth = $state(0);
  let trackHeight = $state(0);
  const length = $derived(vertical ? trackHeight : trackWidth);

  const start = $derived(vertical ? 'bottom' : 'left');
  const extent = $derived(vertical ? 'height' : 'width');

  /** Handle center: travels the track inset by half a handle so it never overhangs the ends. */
  const center = (f: number) => `calc(${HANDLE_PX / 2}px + ${f} * (100% - ${HANDLE_PX}px))`;
  const centerPx = $derived(HANDLE_PX / 2 + pos * (length - HANDLE_PX));

  const activePx = $derived(centerPx - HANDLE_PX / 2 - GAP_PX);
  const inactivePx = $derived(length - centerPx - HANDLE_PX / 2 - GAP_PX);

  const activeStyle = $derived(
    `${extent}: max(0px, calc(${pos} * (100% - ${HANDLE_PX}px) - ${GAP_PX}px))`
  );
  const inactiveStyle = $derived(
    `${extent}: max(0px, calc(${1 - pos} * (100% - ${HANDLE_PX}px) - ${GAP_PX}px))`
  );

  /* Stops sit inset by half the track thickness so the end stops land in the rounded caps. */
  const stopList = $derived.by(() => {
    const output: number[] = [];
    if (stops && stepValue && range > 0) {
      for (let v = min; v <= max; v += stepValue) output.push(toFraction(v));
    } else if (endStops) {
      output.push(1);
    }
    return output.filter((s) => {
      if (leadingIconProps && s === 0) return false;
      if (trailingIconProps && s === 1) return false;
      return !length || Math.abs(s - pos) * length > STOP_CLEARANCE_PX;
    });
  });

  /* Icons ride inside their track; when it gets too short they hop across the handle. */
  const iconFits = (trackPx: number) => trackPx >= iconPx + ICON_PADDING_PX * 2;
  const leadingOnActive = $derived(!length || iconFits(activePx));
  const trailingOnInactive = $derived(!length || iconFits(inactivePx));

  const leadingOffset = $derived(
    leadingOnActive ? ICON_PADDING_PX : centerPx + HANDLE_PX / 2 + GAP_PX + ICON_PADDING_PX
  );
  const trailingOffset = $derived(
    trailingOnInactive
      ? length - ICON_PADDING_PX - iconPx
      : centerPx - HANDLE_PX / 2 - GAP_PX - ICON_PADDING_PX - iconPx
  );

  const sliderDir = $derived(dir === null || dir === 'auto' ? undefined : dir);
  const sliderId = $derived(id === null ? undefined : id);
</script>

<Slider.Root
  type="single"
  bind:value
  {min}
  {max}
  step={stepValue}
  {disabled}
  orientation={vertical ? 'vertical' : 'horizontal'}
  dir={sliderDir}
  id={sliderId}
  {...extra}
>
  {#snippet child({ props })}
    {@const cls = slider({ size, vertical, active: dragging })}
    <div
      {...props}
      class={cls.root({ class: clsx(className) })}
      bind:clientWidth={trackWidth}
      bind:clientHeight={trackHeight}
      {@attach trackDrag}
    >
      <div class={cls.track({ class: cls.activeTrack() })} style={activeStyle}></div>
      <div class={cls.track({ class: cls.inactiveTrack() })} style={inactiveStyle}></div>

      {#each stopList as s (s)}
        <div
          class={cls.stop({ class: s < pos ? cls.stopOnActive() : cls.stopOnInactive() })}
          style="{start}: calc(var(--track) / 2 + {s} * (100% - var(--track)))"
        ></div>
      {/each}

      {#if leadingIconProps}
        <span
          class={cls.icon({ class: leadingOnActive ? cls.iconOnActive() : cls.iconOnInactive() })}
          style="{start}: {leadingOffset}px"
        >
          <Icon size={iconSize} {...leadingIconProps} />
        </span>
      {/if}
      {#if trailingIconProps}
        <span
          class={cls.icon({
            class: trailingOnInactive ? cls.iconOnInactive() : cls.iconOnActive()
          })}
          style="{start}: {trailingOffset}px"
        >
          <Icon size={iconSize} {...trailingIconProps} />
        </span>
      {/if}

      <Slider.Thumb index={0}>
        {#snippet child({ props: thumbProps, active })}
          <div
            {...thumbProps}
            class={cls.handle()}
            data-active={active || undefined}
            style="{start}: {center(pos)}"
          ></div>
        {/snippet}
      </Slider.Thumb>

      {#if showValue}
        <div class={cls.value()} style="{start}: {center(pos)}" aria-hidden="true">
          {format(value)}
        </div>
      {/if}
    </div>
  {/snippet}
</Slider.Root>
