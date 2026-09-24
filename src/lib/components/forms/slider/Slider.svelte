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
  /* Pressed and focused handles narrow to 2dp. */
  const HANDLE_NARROW_PX = 2;
  const GAP_PX = 6;
  /* Stop indicators are 4dp with 4dp trailing space, so their centers sit 6dp in from each end. */
  const STOP_INSET_PX = 6;

  /* Inset icons exist only on M, L and XL: 24dp/6dp padding, 32dp/8dp on XL. */
  const hasIcons = $derived(size === 'm' || size === 'l' || size === 'xl');
  const iconPx = $derived(size === 'xl' ? 32 : 24);
  const iconPaddingPx = $derived(size === 'xl' ? 8 : 6);
  const leadingIcon = $derived(hasIcons ? leadingIconProps : undefined);
  const trailingIcon = $derived(hasIcons ? trailingIconProps : undefined);

  const stepValue = $derived(typeof step === 'number' ? step : undefined);
  const range = $derived(max - min);
  const toFraction = (v: number) => (range > 0 ? (v - min) / range : 0);

  /* ---- motion ---------------------------------------------------------------------------- */

  /*
    A press that jumps the value (a click on the track) springs; once the pointer moves while
    pressed, the handle is being dragged and tracks it directly.
  */
  let dragging = $state(false);
  let pressed = $state(false);
  let focusVisible = $state(false);

  const trackDrag: Attachment<HTMLElement> = (node) => {
    const move = () => (dragging = true);
    const release = () => {
      dragging = false;
      pressed = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
    const press = () => {
      if (disabled) return;
      pressed = true;
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

  /** Handle thickness: 4dp at rest, 2dp while pressed or keyboard-focused. */
  const handleThickness = new SpringValue(
    () => (pressed || focusVisible ? HANDLE_NARROW_PX : HANDLE_PX),
    springTokens.fastSpatial
  );
  const handlePx = $derived(Math.max(1, handleThickness.current));
  /* The gap is measured from the handle's current edge, so it stays 6dp as the handle narrows. */
  const clearPx = $derived(handlePx / 2 + GAP_PX);

  /* ---- geometry -------------------------------------------------------------------------- */

  let trackWidth = $state(0);
  let trackHeight = $state(0);
  const length = $derived(vertical ? trackHeight : trackWidth);

  const start = $derived(vertical ? 'bottom' : 'left');
  const extent = $derived(vertical ? 'height' : 'width');

  /** Handle center: travels the track inset by half a resting handle so it never overhangs the ends. */
  const center = (f: number) => `calc(${HANDLE_PX / 2}px + ${f} * (100% - ${HANDLE_PX}px))`;
  const centerPx = $derived(HANDLE_PX / 2 + pos * (length - HANDLE_PX));

  const activePx = $derived(centerPx - clearPx);
  const inactivePx = $derived(length - centerPx - clearPx);

  const trackStyle = (f: number) =>
    `${extent}: max(0px, calc(${f} * (100% - ${HANDLE_PX}px) + ${HANDLE_PX / 2 - clearPx}px))`;
  const activeStyle = $derived(trackStyle(pos));
  const inactiveStyle = $derived(trackStyle(1 - pos));

  /* Stops span the track inset by STOP_INSET_PX, so the end stops keep their 4dp trailing space. */
  const stopList = $derived.by(() => {
    const output: number[] = [];
    if (stops && stepValue && range > 0) {
      for (let v = min; v <= max; v += stepValue) output.push(toFraction(v));
    } else if (endStops) {
      output.push(1);
    }
    return output.filter((s) => {
      if (leadingIcon && s === 0) return false;
      if (trailingIcon && s === 1) return false;
      return !length || Math.abs(s - pos) * length > clearPx;
    });
  });

  /* Icons ride inside their track; when it gets too short they hop across the handle. */
  const iconFits = (trackPx: number) => trackPx >= iconPx + iconPaddingPx * 2;
  const leadingOnActive = $derived(!length || iconFits(activePx));
  const trailingOnInactive = $derived(!length || iconFits(inactivePx));

  const leadingOffset = $derived(
    leadingOnActive ? iconPaddingPx : centerPx + clearPx + iconPaddingPx
  );
  const trailingOffset = $derived(
    trailingOnInactive
      ? length - iconPaddingPx - iconPx
      : centerPx - clearPx - iconPaddingPx - iconPx
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
          style="{start}: calc({STOP_INSET_PX}px + {s} * (100% - {STOP_INSET_PX * 2}px))"
        ></div>
      {/each}

      {#if leadingIcon}
        <span
          class={cls.icon({ class: leadingOnActive ? cls.iconOnActive() : cls.iconOnInactive() })}
          style="{start}: {leadingOffset}px"
        >
          <Icon {...leadingIcon} class={cls.iconGlyph({ class: clsx(leadingIcon.class) })} />
        </span>
      {/if}
      {#if trailingIcon}
        <span
          class={cls.icon({
            class: trailingOnInactive ? cls.iconOnInactive() : cls.iconOnActive()
          })}
          style="{start}: {trailingOffset}px"
        >
          <Icon {...trailingIcon} class={cls.iconGlyph({ class: clsx(trailingIcon.class) })} />
        </span>
      {/if}

      <Slider.Thumb index={0}>
        {#snippet child({ props: thumbProps, active })}
          <div
            {...thumbProps}
            class={cls.handle()}
            data-active={active || undefined}
            style="{start}: {center(pos)}; {extent}: {handlePx}px"
            onfocus={(e) => (focusVisible = e.currentTarget.matches(':focus-visible'))}
            onblur={() => (focusVisible = false)}
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
