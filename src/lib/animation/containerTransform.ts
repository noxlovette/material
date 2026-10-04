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
 * Persistent app chrome (`md-vt-persist`, built into bars/rails) keeps its own static snapshot
 * at its computed z-index; the morph uses the higher endpoint's layer in both directions.
 * Add `md-vt-persist` to app-owned overlays that must remain above the morph, too.
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
  instead, interpolating between the two endpoints on the bounds spring.
*/
const shadowOf = (target: Element | null) => {
  const shadow = target ? getComputedStyle(target).boxShadow : '';
  return shadow && shadow !== 'none' ? shadow : undefined;
};

// Fading to `none` also shrinks blur/spread/offset. Preserve those lengths and fade
// only the colour when one endpoint is flat. These are browser-computed colours.
const transparentShadow = (shadow: string) =>
  shadow.replace(/(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^)]*\)/g, 'rgba(0, 0, 0, 0)');

let sequence = 0;
const layerOf = (target: Element | null) => {
  const z = target ? Number.parseInt(getComputedStyle(target).zIndex, 10) : NaN;
  return Number.isFinite(z) ? z : 0;
};

/*
  The group's morph (size and position) is a spring that Motion retimes to native WAAPI. The
  shadow has to ride the same one: held constant it only vanishes when the transition ends and
  the live card takes over (closing a pane into a flat card), or pops in at the end (opening).
  Once the group's animations exist, read the morph's timing back off them and run the
  elevation from the source's shadow to the destination's on exactly that timing.
*/
const followMorph = (
  name: string,
  fromShadow: string | undefined,
  toShadow: string | undefined
) => {
  if (
    !name ||
    fromShadow === toShadow ||
    typeof document.getAnimations !== 'function' ||
    typeof KeyframeEffect === 'undefined'
  )
    return;
  const morph = document
    .getAnimations()
    .find(
      (animation) =>
        animation.effect instanceof KeyframeEffect &&
        animation.effect.pseudoElement === `::view-transition-group(${name})`
    );
  const effect = morph?.effect;
  if (!morph || !(effect instanceof KeyframeEffect) || !effect.pseudoElement) return;
  const { delay, duration, easing } = effect.getTiming();
  const from = fromShadow ?? (toShadow ? transparentShadow(toShadow) : 'none');
  const to = toShadow ?? (fromShadow ? transparentShadow(fromShadow) : 'none');
  const shadow = document.documentElement.animate(
    { boxShadow: [from, to] },
    { pseudoElement: effect.pseudoElement, delay, duration, easing, fill: 'both' }
  );
  // At transition.ready the browser can still be assigning the first frame's start time.
  // Explicitly setting null clears the new animation's start time and holds it at frame 0.
  // Leave autoplay alone until the morph has a real timeline time to synchronize against.
  if (morph.startTime !== null) shadow.startTime = morph.startTime;
  else
    requestAnimationFrame(() => {
      if (morph.startTime !== null && shadow.playState !== 'idle') {
        shadow.startTime = morph.startTime;
      }
    });
  return shadow;
};

export const containerTransform = (
  update: () => void | Promise<void>,
  { from, to, spring = springTokens.spatial }: ContainerTransformOptions
) => {
  // The incoming snapshot is opaque wherever the destination is, and the outgoing one fades
  // off it (motion.css layers them), so nothing behind shows through. The fill (motion.css) covers
  // the rest of a destination with its own background, e.g. a full-screen view's area below the
  // incoming snapshot's top as the bar grows, and the shadow keeps its elevation (`shadowOf`),
  // morphing from the source's to the destination's (`followMorph`). Only the transition's group
  // reads the properties, and they're rewritten before each new snapshot, so they're left in
  // place afterwards.
  const root = document.documentElement;
  let fromShadow: string | undefined;
  let toShadow: string | undefined;
  let name = '';
  const groupClass = `md-container-${sequence++}`;
  const styles = document.createElement('style');
  styles.dataset.containerTransformStyle = '';
  // View transitions paint above the live DOM regardless of its z-index. Capture persistent
  // chrome separately, then order the snapshot groups at their real layers. Also available
  // to app-owned floating surfaces via md-vt-persist (e.g. a snackbar above the pane).
  const source = resolve(from);
  const chrome = [...document.querySelectorAll('.md-vt-persist')].filter(
    (el) => el !== source && !el.contains(source) && !source?.contains(el)
  );
  const chromeRules = chrome
    .map(
      (el, i) => `::view-transition-group(.${groupClass}-chrome-${i}) { z-index: ${layerOf(el)}; }`
    )
    .join('\n');
  const updateAndFill = async () => {
    // Read before `update`, which may unmount it.
    const source = resolve(from);
    fromShadow = shadowOf(source);
    name = source ? getComputedStyle(source).viewTransitionName : '';
    const fromLayer = layerOf(source);
    await update();
    const target = resolve(to);
    toShadow = shadowOf(target);
    root.style.setProperty(FILL, fillOf(target));
    // Starts at the source's elevation; `followMorph` takes it from there.
    root.style.setProperty(SHADOW, (reduced ? toShadow : fromShadow) ?? 'none');
    styles.textContent = `${chromeRules}\n::view-transition-group(.${groupClass}) { z-index: ${Math.max(fromLayer, layerOf(target))}; }`;
    document.head.append(styles);
  };
  // The class lets motion.css keep both snapshots at their width, clipped by the container.
  const reduced = prefersReducedMotion();
  const builder = animateView(
    updateAndFill,
    springTransition(reduced ? springTokens.effects : spring)
  );
  chrome.forEach((el, i) => {
    builder
      .add(el)
      .group(false)
      .class(`${groupClass}-chrome-${i}`)
      .layout({ duration: 0 })
      .old({ opacity: [0, 0] })
      .new({ opacity: [1, 1] });
  });
  // Always clip the snapshot's baked-in elevation: otherwise same-aspect transforms can
  // carry a second, scaling shadow inside the separately animated group shadow.
  builder.add(from, to).group(false).crop(true).class(`md-container-transform ${groupClass}`);
  // Reduced motion: the container doesn't grow; its two states just crossfade in place.
  if (reduced) builder.layout({ duration: 0 });
  const transition = builder
    .old({ opacity: [1, 0] }, springTransition(springTokens.effects))
    .new({ opacity: [1, 1] }, springTransition(springTokens.effects));
  // Motion's builder resolves when animations start, not when they finish.
  new Promise<unknown>((resolve, reject) => transition.then(resolve as () => void, reject))
    .then(async (started) => {
      const shadow = followMorph(name, fromShadow, toShadow);
      try {
        await (started as { finished?: Promise<unknown> } | undefined)?.finished;
      } finally {
        // Removing the animation's fill must expose the destination elevation, not
        // flash the starting shadow again before the live DOM takes over.
        root.style.setProperty(SHADOW, toShadow ?? 'none');
        shadow?.cancel();
      }
    })
    .catch(() => {})
    .finally(() => styles.remove());
  return transition;
};
