import type { PresenceTransition } from '$lib/animation/enterExit.js';
import { springTokens, springTransition } from '$lib/animation/spring.js';
import type { IconTransition } from './types.js';

/*
  Glyph swaps for `Icon`'s `transition` prop. Both glyphs are on screen at once, stacked, so this
  is a crossfade: the outgoing one leaves while the incoming one arrives. An icon is a small
  component, so it moves on fastSpatial (M3: fast springs for small elements); opacity runs on
  fastEffects so the two glyphs never sit half-visible over each other for long. Exits are
  critically damped, like enterExit's. Only transform and opacity, so Motion runs them on WAAPI.
*/
const enter = {
  ...springTransition(springTokens.fastSpatial),
  opacity: springTransition(springTokens.fastEffects)
};
const exit = {
  ...springTransition(springTokens.effects),
  opacity: springTransition(springTokens.fastEffects)
};

export const iconSwap: Record<Exclude<IconTransition, 'none'>, PresenceTransition> = {
  fade: {
    hidden: { opacity: 0, scale: 0.5 },
    shown: { opacity: 1, scale: 1 },
    enter,
    exit
  },
  // The old glyph keeps turning the same way as it leaves, so the pair reads as one rotation.
  rotate: {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    shown: { opacity: 1, scale: 1, rotate: 0 },
    exited: { opacity: 0, scale: 0.5, rotate: 90 },
    enter,
    exit
  }
};

/* Reduced motion: no movement, the glyphs only crossfade. */
export const iconSwapReduced: PresenceTransition = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
  enter: springTransition(springTokens.fastEffects),
  exit: springTransition(springTokens.fastEffects)
};

/** The same transition, already at rest: for the glyph an icon mounts with, which shouldn't animate in. */
export const atRest = (transition: PresenceTransition): PresenceTransition => ({
  ...transition,
  hidden: transition.shown,
  exited: transition.exited ?? transition.hidden
});
