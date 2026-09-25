import { animateView, type ViewTransitionTargetDefinition } from 'motion';
import { prefersReducedMotion } from './reducedMotion.js';
import { springTokens, springTransition, type SpringToken } from './spring.js';

export type NavigationDirection = 'forward' | 'backward';

interface NavigationOptions {
  /** The region whose content changes. Omit to transition the whole page. */
  target?: ViewTransitionTargetDefinition;
  /** `forward` moves deeper / to the next item, `backward` returns. */
  direction?: NavigationDirection;
  spring?: SpringToken;
}

export interface LateralOptions extends NavigationOptions {
  /**
   * The axis the peers are laid out on: `x` for a row (tabs, a carousel), `y` for a column
   * (vertical tabs, a vertical carousel, a stepper laid out top to bottom). `forward` moves to
   * the next peer: right or down.
   * @default 'x'
   */
  axis?: 'x' | 'y';
}

export interface SharedAxisOptions extends NavigationOptions {
  /** `x` for horizontal steps, `y` for vertical, `z` for parent → child depth. */
  axis?: 'x' | 'y' | 'z';
}

const SHARED_AXIS_OFFSET_PX = 30;

const view = (
  update: () => void | Promise<void>,
  target: ViewTransitionTargetDefinition | undefined,
  spring: SpringToken
) => {
  const builder = animateView(update, springTransition(spring));
  return target ? builder.add(target) : builder;
};

/* Outgoing content clears quickly; incoming content waits a beat so the two never overlap fully.
   M3 "clean fades" (https://m3.material.io/styles/motion/transitions/applying-transitions): fade out before fading in; any cross-fade stays short
   and hidden in the fastest part of the motion. Don't lengthen these. */
const fadeOut = springTransition(springTokens.fastEffects);
const fadeIn = { ...springTransition(springTokens.effects), delay: 0.05 };
/* For fades with nothing moving to hide the handover (fade through, reduced motion): the new
   page waits until the old one is all but gone (fastEffects is under 0.5% at 120ms). Starting
   earlier leaves a ghost of the old layout behind the new one, made brighter by the additive
   blend the browser puts on a crossfade. M3's fade through starts the incoming screen about a
   third of the way in, so this is on spec. */
const fadeInAfterOut = { ...springTransition(springTokens.effects), delay: 0.12 };

/*
  A region that fades in place, for fade through and every reduced-motion fade:
  - Its box swaps to the new page's at once: sliding or resizing it would be the spatial
    connection these fades avoid.
  - Neither snapshot is cropped. Motion crops a region whose aspect ratio changed, scaling both
    snapshots to cover the new box, so a short page fading out over a tall one looked zoomed.
  - The outgoing snapshot stays exactly where it was on screen. A navigation usually resets the
    scroll, so the region's new box sits elsewhere than the old one (400px lower after scrolling
    400px); drawn in the new box, the old page would jump to its top as it fades, and the two
    layouts look like they collide. The offset is measured around `update` and written into the
    old keyframes, which Motion reads only once the update has run.
*/
const fadeInPlace = (
  update: () => void | Promise<void>,
  target: ViewTransitionTargetDefinition | undefined,
  spring: SpringToken,
  incoming: Parameters<ReturnType<typeof view>['new']>
) => {
  const outgoing: { opacity: number[]; transform?: string[] } = { opacity: [1, 0] };
  const region = () =>
    typeof target === 'string' ? document.querySelector(target) : (target ?? null);
  const before = target ? region()?.getBoundingClientRect() : undefined;
  const run = async () => {
    await update();
    const after = region()?.getBoundingClientRect();
    if (!before || !after) return;
    const dx = before.left - after.left;
    const dy = before.top - after.top;
    if (dx || dy) outgoing.transform = Array(2).fill(`translate(${dx}px, ${dy}px)`);
  };
  const builder = view(run, target, spring);
  if (target) builder.layout({ duration: 0 }).crop(false);
  return builder.old(outgoing, fadeOut).new(...incoming);
};

/* Reduced motion: every navigation pattern becomes this fade, with no movement or scale. M3
   swaps movement for a subtle fade rather than cutting. */
const reducedFade = (
  update: () => void | Promise<void>,
  target: ViewTransitionTargetDefinition | undefined,
  spring: SpringToken
) => fadeInPlace(update, target, spring, [{ opacity: [0, 1] }, fadeInAfterOut]);

/**
 * M3 forward and backward (shared axis): outgoing and incoming content travel together along one
 * axis while fading through each other.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#forward-and-backward
 *
 * The default for common hierarchical navigation (https://m3.material.io/styles/motion/transitions/applying-transitions).
 * Don't use it for hero moments; use `containerTransform` for those. Keep one axis per relationship
 * across the app (coherent spatial model), and move one `target` region as a unit instead of
 * animating many elements independently.
 *
 * `update` performs the DOM change (`async () => { step++; await tick(); }`). Built on Motion's
 * `animateView()` — both states never need to coexist in the DOM.
 *
 * Not built into any component: hierarchy levels and wizard steps live in the consuming app.
 */
export const sharedAxis = (
  update: () => void | Promise<void>,
  {
    target,
    axis = 'x',
    direction = 'forward',
    spring = springTokens.spatial
  }: SharedAxisOptions = {}
) => {
  if (prefersReducedMotion()) return reducedFade(update, target, spring);
  const forward = direction === 'forward';
  const [outgoing, incoming] =
    axis === 'z'
      ? [`scale(${forward ? 1.1 : 0.8})`, `scale(${forward ? 0.8 : 1.1})`]
      : [
          `translate${axis.toUpperCase()}(${forward ? -SHARED_AXIS_OFFSET_PX : SHARED_AXIS_OFFSET_PX}px)`,
          `translate${axis.toUpperCase()}(${forward ? SHARED_AXIS_OFFSET_PX : -SHARED_AXIS_OFFSET_PX}px)`
        ];
  const rest = axis === 'z' ? 'scale(1)' : `translate${axis.toUpperCase()}(0px)`;

  return view(update, target, spring)
    .old({ opacity: [1, 0], transform: [rest, outgoing] }, { opacity: fadeOut })
    .new({ opacity: [0, 1], transform: [incoming, rest] }, { opacity: fadeIn });
};

/**
 * M3 lateral: peer screens at the same level (tabs, carousels) slide past each other edge to edge,
 * without fading — the new screen pushes the old one out. Along the axis the peers are laid out
 * on: `axis: 'y'` for a vertical set (vertical tabs, a vertical carousel, a top-to-bottom
 * stepper), where the next peer pushes up from below.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#lateral
 *
 * Only for peers in one set (https://m3.material.io/styles/motion/transitions/applying-transitions). Never use it for hierarchical screens
 * (use `sharedAxis`) or navbar/rail/drawer destinations (use `fadeThrough`, since the implied swipe
 * conflicts with carousels and swipeable list items). A vertical nav list is still a drawer: a
 * vertical slide there reads as the page jumping its scroll. Don't add a fade: it hides the peer
 * relationship and makes the slide look like forward/backward.
 *
 * Built in: `TabHolder` (switching content panels) and `DateField`/`DateRangeField` (changing the
 * visible month). Any new component that pages between peer views must use this too.
 */
export const lateral = (
  update: () => void | Promise<void>,
  { target, axis = 'x', direction = 'forward', spring = springTokens.spatial }: LateralOptions = {}
) => {
  if (prefersReducedMotion()) return reducedFade(update, target, spring);
  const sign = direction === 'forward' ? 1 : -1;
  const move = axis === 'y' ? 'translateY' : 'translateX';
  const builder = view(update, target, spring)
    .old({ transform: [`${move}(0%)`, `${move}(${-sign * 100}%)`] })
    .new({ transform: [`${move}(${sign * 100}%)`, `${move}(0%)`] });
  return target ? builder.crop(true) : builder;
};

/**
 * M3 top level (fade through): destinations with no spatial relationship, e.g. navigation bar
 * items. The outgoing screen fades out, then the incoming one fades in while scaling up from 92%.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#top-level
 *
 * The quick fade for navigation bar, rail and drawer destinations (https://m3.material.io/styles/motion/transitions/applying-transitions).
 * It deliberately creates no spatial connection between screens, and it's the pattern to use
 * instead of `lateral` there.
 *
 * Not built into `Navbar`/`Rail`: they don't own the content region that changes, so the app wraps
 * its own route change in this.
 *
 * The `target` region swaps its box instantly instead of sliding or resizing to the new page's:
 * that movement would be exactly the spatial connection this pattern avoids, and after a
 * navigation that resets the scroll, the region would glide down by the distance scrolled.
 * Its snapshots aren't cropped, and the old one stays where it was on screen (see `fadeInPlace`).
 */
export const fadeThrough = (
  update: () => void | Promise<void>,
  { target, spring = springTokens.spatial }: Omit<NavigationOptions, 'direction'> = {}
) => {
  if (prefersReducedMotion()) return reducedFade(update, target, spring);
  return fadeInPlace(update, target, spring, [
    { opacity: [0, 1], transform: ['scale(0.92)', 'scale(1)'] },
    { opacity: fadeInAfterOut }
  ]);
};
