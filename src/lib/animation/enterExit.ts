import type { AnimationOptions, DOMKeyframesDefinition } from 'motion';
import { springTokens, springTransition, type SpringToken } from './spring.js';

/**
 * An M3 enter/exit transition for {@link presence} / `Presence`. Keep keyframes to `transform`
 * and `opacity` so Motion runs them on WAAPI (compositor), which is also what bits-ui's presence
 * layer detects to delay unmounting.
 *
 * https://m3.material.io/styles/motion/transitions/transition-patterns#enter-and-exit
 */
export interface PresenceTransition {
  /** Where the enter animation starts. */
  hidden: DOMKeyframesDefinition;
  shown: DOMKeyframesDefinition;
  /** Where the exit animation ends. Defaults to `hidden`. */
  exited?: DOMKeyframesDefinition;
  /** `transform-origin` applied while mounted. */
  origin?: string;
  enter: AnimationOptions;
  exit: AnimationOptions;
}

/*
  Scale and offset values come from Material Components Android, the reference implementation of
  the M3 transition patterns (github.com/material-components/material-components-android,
  lib/java/com/google/android/material/transition):
  - MaterialFade: enters from 0.8 scale, opacity done in the first 30%; exits by fading only.
  - BaseTransientBottomBar (snackbar), slide mode: translates by its own full height.
  Spring timings replace MDC's duration/easing pairs.
*/
const MATERIAL_FADE_START_SCALE = 0.8;

/* Spatial spring for the movement; the fade uses the fast effects spring so opacity lands early
   (MDC fades in over the first 30% of the enter) and never overshoots. */
const enterWith = (spatial: SpringToken): AnimationOptions => ({
  ...springTransition(spatial),
  opacity: springTransition(springTokens.fastEffects)
});

/* Exits leave quickly and don't bounce on the way out: critically damped throughout. */
const exit: AnimationOptions = {
  ...springTransition(springTokens.effects),
  opacity: springTransition(springTokens.fastEffects)
};

/* bits-ui sets this on every floating wrapper: the side of the content facing its anchor. */
const ANCHOR_ORIGIN = 'var(--bits-floating-transform-origin, center)';

export type EnterExitPreset = 'fade' | 'scale' | 'slideUp' | 'dialog' | 'sideSheet' | 'bottomSheet';

export const enterExit: Record<EnterExitPreset, PresenceTransition> = {
  /** Opacity only — scrims, overlays, content swapped in place. */
  fade: {
    hidden: { opacity: 0 },
    shown: { opacity: 1 },
    enter: springTransition(springTokens.effects),
    exit: springTransition(springTokens.fastEffects)
  },
  /** Anchored surfaces — menus, popovers, tooltips, pickers. Grows out of its anchor (MaterialFade). */
  scale: {
    hidden: { opacity: 0, transform: `scale(${MATERIAL_FADE_START_SCALE})` },
    shown: { opacity: 1, transform: 'scale(1)' },
    exited: { opacity: 0 },
    origin: ANCHOR_ORIGIN,
    enter: enterWith(springTokens.fastSpatial),
    exit
  },
  /** Snackbars — slide in from below by their own height (MDC slide mode). */
  slideUp: {
    hidden: { opacity: 0, transform: 'translateY(100%)' },
    shown: { opacity: 1, transform: 'translateY(0%)' },
    enter: enterWith(springTokens.fastSpatial),
    exit
  },
  /** Modal dialogs — MaterialFade from the center. */
  dialog: {
    hidden: { opacity: 0, transform: `scale(${MATERIAL_FADE_START_SCALE})` },
    shown: { opacity: 1, transform: 'scale(1)' },
    exited: { opacity: 0 },
    enter: enterWith(springTokens.spatial),
    exit
  },
  /** Side sheet anchored to the inline-end edge. */
  sideSheet: {
    hidden: { transform: 'translateX(100%)' },
    shown: { transform: 'translateX(0%)' },
    enter: springTransition(springTokens.spatial),
    exit: springTransition(springTokens.effects)
  },
  /** Bottom sheet anchored to the bottom edge. */
  bottomSheet: {
    hidden: { transform: 'translateY(100%)' },
    shown: { transform: 'translateY(0%)' },
    enter: springTransition(springTokens.spatial),
    exit: springTransition(springTokens.effects)
  }
};
