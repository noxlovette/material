import { springTokens, springTransition } from '$lib/animation/spring.js';
import { animate, motionValue, type AnimationPlaybackControls, type MotionValue } from 'motion';

/*
 * Corner morphs for every button shape, on Motion springs: Button, Toggle and ButtonIcon (press
 * and a toggle's shape swap), the split button (hover, focus, press, open) and connected button
 * group items (press, selection). CSS sets the resting corners for the first paint; once
 * mounted, each corner is a spring retargeted from its current radius and velocity whenever the
 * button's state changes. A CSS transition can't do that: a tap holds :active for ~100ms, so it
 * reverses early in its curve on a shortened, near-linear timing.
 *
 * Targets are read from CSS custom properties the size and shape classes set, so the classes stay
 * the single source of the measurements. M3: under reduced motion, shapes change without
 * morphing.
 */

export type ButtonState = {
  pressed: boolean;
  /** A mouse or pen over the button (never touch, where hover sticks after a tap). */
  hovered: boolean;
  focusVisible: boolean;
};

/** Corner radii in px, in logical order: start-start, start-end, end-end, end-start. */
export type Corners = [number, number, number, number];

type CornerResolver = (
  el: HTMLElement,
  state: ButtonState,
  px: (prop: string) => number
) => Corners;

const CORNER_PROPS = [
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndEndRadius',
  'borderEndStartRadius'
] as const;

/** A length custom property in px. Handles the px, rem and em values the button classes use. */
const lengthVar = (el: HTMLElement, style: CSSStyleDeclaration, prop: string) => {
  const value = style.getPropertyValue(prop).trim();
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 0;
  if (value.endsWith('rem'))
    return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (value.endsWith('em')) return n * parseFloat(style.fontSize);
  if (value.endsWith('%')) return (n / 100) * Math.min(el.offsetWidth, el.offsetHeight);
  return n;
};

const isDisabled = (el: HTMLElement) =>
  el.matches(':disabled, [aria-disabled="true"], [data-disabled]');

/** Springs `el`'s four corners to whatever `corners` resolves for its current state. */
export function shapeMorph(el: HTMLElement, corners: CornerResolver): () => void {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const spring = springTransition(springTokens.fastSpatial);
  const state: ButtonState = { pressed: false, hovered: false, focusVisible: false };

  const resolve = () => {
    const style = getComputedStyle(el);
    return corners(el, state, (prop) => lengthVar(el, style, prop));
  };

  const initial = resolve();
  const values: MotionValue<number>[] = initial.map((r) => motionValue(r));
  const controls: (AnimationPlaybackControls | undefined)[] = [];
  const unsubscribe = values.map((v, i) =>
    v.on('change', (r) => (el.style[CORNER_PROPS[i]] = `${r}px`))
  );
  values.forEach((v, i) => (el.style[CORNER_PROPS[i]] = `${v.get()}px`));

  // Each spring restarts only when its target changes; a retarget mid-flight inherits velocity.
  const targets: number[] = [...initial];
  const retarget = () => {
    resolve().forEach((to, i) => {
      if (to === targets[i]) return;
      targets[i] = to;
      controls[i]?.stop();
      if (reduced.matches) values[i].jump(to);
      else controls[i] = animate(values[i], to, spring);
    });
  };

  const set = (key: keyof ButtonState, on: boolean) => {
    if (state[key] === on) return;
    state[key] = on;
    retarget();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button === 0 && !isDisabled(el)) set('pressed', true);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (!e.repeat && (e.key === ' ' || e.key === 'Enter') && !isDisabled(el)) set('pressed', true);
  };
  const release = () => set('pressed', false);
  const onEnter = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') set('hovered', true);
  };
  const onLeave = () => set('hovered', false);
  const onFocus = () => set('focusVisible', el.matches(':focus-visible'));
  const onBlur = () => {
    state.pressed = false;
    set('focusVisible', false);
  };

  // Selection, open state, size and shape arrive as attribute changes. Not `style`: the springs
  // write the corners there every frame.
  const observer = new MutationObserver(retarget);
  observer.observe(el, {
    attributes: true,
    attributeFilter: ['class', 'data-state', 'aria-pressed', 'aria-expanded']
  });

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);
  el.addEventListener('keydown', onKeyDown);
  el.addEventListener('keyup', release);
  el.addEventListener('focus', onFocus);
  el.addEventListener('blur', onBlur);
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);

  return () => {
    observer.disconnect();
    controls.forEach((c) => c?.stop());
    unsubscribe.forEach((u) => u());
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointerleave', onLeave);
    el.removeEventListener('keydown', onKeyDown);
    el.removeEventListener('keyup', release);
    el.removeEventListener('focus', onFocus);
    el.removeEventListener('blur', onBlur);
    window.removeEventListener('pointerup', release);
    window.removeEventListener('pointercancel', release);
  };
}

const all = (r: number): Corners => [r, r, r, r];

/** Button, Toggle, ButtonIcon: --btn-shape at rest, --btn-pressed while pressed. */
export const buttonCorners: CornerResolver = (_el, { pressed }, px) =>
  all(pressed ? px('--btn-pressed') || px('--btn-shape') : px('--btn-shape'));

/**
 * Split button halves. Outer corners stay round; inner corners are --split-inner at rest,
 * --split-active while hovered, focused or pressed, and fully round on the trailing button while
 * its menu is open.
 */
export const splitCorners =
  (side: 'leading' | 'trailing'): CornerResolver =>
  (el, { pressed, hovered, focusVisible }, px) => {
    const outer = px('--btn-round');
    const open = side === 'trailing' && el.dataset.state === 'open';
    const active = (pressed || hovered || focusVisible) && !isDisabled(el);
    const inner = open ? outer : active ? px('--split-active') : px('--split-inner');
    return side === 'leading' ? [outer, inner, inner, outer] : [inner, outer, outer, inner];
  };

/**
 * Connected button group items. Inner corners (facing a neighbour) are --cbg-inner, then
 * --cbg-pressed while pressed and fully round while selected; outer corners (the group's ends)
 * are --cbg-outer.
 */
export const connectedCorners: CornerResolver = (el, { pressed }, px) => {
  const selected = el.dataset.state === 'on';
  const inner =
    pressed && !isDisabled(el)
      ? px('--cbg-pressed')
      : selected
        ? px('--btn-round')
        : px('--cbg-inner');
  const outer = px('--cbg-outer');
  const first = el.parentElement?.firstElementChild === el;
  const last = el.parentElement?.lastElementChild === el;
  const s = first ? outer : inner;
  const e = last ? outer : inner;
  // Horizontal: the start corners face the previous item. Vertical: the top corners do.
  return el.dataset.orientation === 'vertical' ? [s, s, e, e] : [s, e, e, s];
};
