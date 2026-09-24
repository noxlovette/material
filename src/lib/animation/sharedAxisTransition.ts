import { animateView, type ViewTransitionTargetDefinition } from 'motion';
import { springTokens, springTransition, type SpringToken } from './spring.js';

export type NavigationDirection = 'forward' | 'backward';

interface NavigationOptions {
  /** The region whose content changes. Omit to transition the whole page. */
  target?: ViewTransitionTargetDefinition;
  /** `forward` moves deeper / to the next item, `backward` returns. */
  direction?: NavigationDirection;
  spring?: SpringToken;
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
 * without fading — the new screen pushes the old one out.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#lateral
 *
 * Only for peers in one set (https://m3.material.io/styles/motion/transitions/applying-transitions). Never use it for hierarchical screens
 * (use `sharedAxis`) or navbar/rail/drawer destinations (use `fadeThrough`, since the implied swipe
 * conflicts with carousels and swipeable list items). Don't add a fade: it hides the peer
 * relationship and makes the slide look like forward/backward.
 *
 * Built in: `TabHolder` (switching content panels) and `DateField`/`DateRangeField` (changing the
 * visible month). Any new component that pages between peer views must use this too.
 */
export const lateral = (
  update: () => void | Promise<void>,
  { target, direction = 'forward', spring = springTokens.spatial }: NavigationOptions = {}
) => {
  const sign = direction === 'forward' ? 1 : -1;
  const builder = view(update, target, spring)
    .old({ transform: ['translateX(0%)', `translateX(${-sign * 100}%)`] })
    .new({ transform: [`translateX(${sign * 100}%)`, 'translateX(0%)'] });
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
 */
export const fadeThrough = (
  update: () => void | Promise<void>,
  { target, spring = springTokens.spatial }: Omit<NavigationOptions, 'direction'> = {}
) =>
  view(update, target, spring)
    .old({ opacity: [1, 0] }, fadeOut)
    .new(
      { opacity: [0, 1], transform: ['scale(0.92)', 'scale(1)'] },
      { opacity: { ...springTransition(springTokens.effects), delay: 0.09 } }
    );
