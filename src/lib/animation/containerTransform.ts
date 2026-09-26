import { animateView, type ViewTransitionTargetDefinition } from 'motion';
import { prefersReducedMotion } from './reducedMotion.js';
import { springTokens, springTransition, type SpringToken } from './spring.js';

export interface ContainerTransformOptions {
  /** The container before the update (e.g. a card). */
  from: ViewTransitionTargetDefinition;
  /** The container after the update (e.g. the detail view). Pass a selector if it isn't mounted yet. */
  to: ViewTransitionTargetDefinition;
  /** Spring for the bounds/shape morph. `slowSpatial` suits full-screen expansions. */
  spring?: SpringToken;
}

/**
 * M3 container transform: one container morphs its bounds, shape and color into another. The
 * incoming state is drawn underneath at full opacity from the start and the outgoing one fades
 * out on top of it, so the morph ends exactly as the page looks and never shows through.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#container-transform
 *
 * The most dramatic pattern (https://m3.material.io/styles/motion/transitions/applying-transitions).
 * Use it for hero moments, shallow expand → collapse hierarchies and seamless element-to-element
 * connections. Don't use it in deep hierarchies or utility-focused navigation, where it becomes
 * excessive. Use `sharedAxis` there. Keep `spring` at `spatial`/`slowSpatial`, never the bouncy
 * `fastSpatial`.
 *
 * Built on Motion's `animateView()` (View Transition API), so `from` and `to` never have to be in
 * the DOM at the same time — `update` swaps one for the other. Browsers without the API just run
 * `update`. A second call while one is running is queued, not interrupted.
 *
 * Built into `SearchView`: the search bar (`Search`, or a search `AppBar`) grows into the search
 * view and back. FAB → sheet is the FAB's own morph (a clip-path on Motion, in `FAB.svelte`),
 * because M3 keeps that container opaque and changes its colour, which a snapshot cross-fade
 * can't. Card → detail is the app's own navigation.
 *
 * ```ts
 * containerTransform(
 *   async () => { expanded = true; await tick(); },
 *   { from: cardEl, to: '[data-detail]' }
 * );
 * ```
 */
const FILL = '--md-container-transform-color';
const SHADOW = '--md-container-transform-shadow';

const resolve = (target: ViewTransitionTargetDefinition) =>
  typeof target === 'string'
    ? document.querySelector(target)
    : target instanceof Element
      ? target
      : null;

const TRANSPARENT = new Set(['transparent', 'rgba(0, 0, 0, 0)']);

/*
  The destination's own background, if it has one. A container made of separate surfaces on a
  transparent wrapper (the docked search view's bar and results) gets no fill: its opaque
  incoming snapshot already covers what it should, and a flat fill would paper over the gaps
  between its surfaces until the transition ends, then pop.
*/
const fillOf = (target: Element | null) => {
  const colour = target ? getComputedStyle(target).backgroundColor : '';
  return colour && !TRANSPARENT.has(colour) ? colour : 'transparent';
};

/*
  The container's elevation while it morphs. Motion clips the group (`overflow: clip`) whenever
  the aspect ratio changes, which cuts the shadow out of both snapshots, so an elevated
  destination (a floating pane) would only get its shadow when the live DOM takes over at the
  end. The group's own `box-shadow` isn't clipped by its overflow, so it carries the shadow
  instead: the destination's when it has one (opening into an elevated pane), otherwise the
  source's (closing it back into a flat card), so the container stays elevated the whole way.
*/
const shadowOf = (target: Element | null) => {
  const shadow = target ? getComputedStyle(target).boxShadow : '';
  return shadow && shadow !== 'none' ? shadow : undefined;
};

export const containerTransform = (
  update: () => void | Promise<void>,
  { from, to, spring = springTokens.spatial }: ContainerTransformOptions
) => {
  // The incoming snapshot is opaque wherever the destination is, and the outgoing one fades off
  // it (motion.css layers them), so nothing behind shows through. The fill (motion.css) covers
  // the rest of a destination with its own background, e.g. a full-screen view's area below the
  // incoming snapshot's top as the bar grows, and the shadow keeps its elevation (`shadowOf`).
  // Only the transition's group reads the properties, and they're rewritten before each new
  // snapshot, so they're left in place afterwards.
  const root = document.documentElement;
  const updateAndFill = async () => {
    // Read before `update`, which may unmount it.
    const fromShadow = shadowOf(resolve(from));
    await update();
    const target = resolve(to);
    root.style.setProperty(FILL, fillOf(target));
    root.style.setProperty(SHADOW, shadowOf(target) ?? fromShadow ?? 'none');
  };
  // The class lets motion.css keep both snapshots at their width, clipped by the container.
  const builder = animateView(updateAndFill, springTransition(spring))
    .add(from, to)
    .class('md-container-transform');
  // Reduced motion: the container doesn't grow; its two states just crossfade in place.
  if (prefersReducedMotion()) builder.layout({ duration: 0 });
  return builder
    .old({ opacity: [1, 0] }, springTransition(springTokens.effects))
    .new({ opacity: [1, 1] }, springTransition(springTokens.effects));
};
