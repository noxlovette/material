import { generateLinearEasing, spring } from 'motion';

/**
 * M3 Expressive spring tokens: `stiffness` plus a `dampingRatio`
 *
 * - **spatial** springs move things (position, size, shape) and overshoot slightly.
 * - **effects** springs change things in place (opacity, color) and are critically damped.
 *
 * https://m3.material.io/styles/motion/overview/specs
 */
export const springTokens = {
  fastSpatial: { stiffness: 800, dampingRatio: 0.6 },
  spatial: { stiffness: 380, dampingRatio: 0.8 },
  slowSpatial: { stiffness: 200, dampingRatio: 0.8 },
  fastEffects: { stiffness: 3800, dampingRatio: 1 },
  effects: { stiffness: 1600, dampingRatio: 1 },
  slowEffects: { stiffness: 800, dampingRatio: 1 }
} as const;

export type SpringToken = { stiffness: number; dampingRatio: number };

const STEP_MS = 10;
const MAX_MS = 5000;

const resolveSpring = (token: SpringToken) => {
  // Motion takes an absolute damping coefficient; M3 specifies a ratio (mass is 1).
  const { stiffness, damping } = springTransition(token);
  const generator = spring({ keyframes: [0, 1], stiffness, damping });

  let duration = 0;
  while (!generator.next(duration).done && duration < MAX_MS) duration += STEP_MS;

  return { duration, at: (progress: number) => generator.next(duration * progress).value };
};

/**
 * A spring token as Motion transition options, for `animate()` / `animateView()`. Physics-based
 * (stiffness/damping, mass 1), so an animation that interrupts another inherits its velocity.
 *
 * ```ts
 * animate(node, { transform: 'scale(1)' }, springTransition(springTokens.fastSpatial));
 * ```
 */
export const springTransition = ({ stiffness, dampingRatio }: SpringToken) =>
  ({
    // The generator itself, not the string 'spring': the view-transition / WAAPI path
    // (`animateView`, NativeAnimation) only bakes springs from the function and otherwise falls
    // back to a 300ms easeOut.
    type: spring,
    stiffness,
    damping: dampingRatio * 2 * Math.sqrt(stiffness),
    mass: 1
  }) as const;

/**
 * A spring as CSS `transition` parts: a settle `duration` and a `linear()` `easing`.
 * Used by `scripts/generate-motion-springs.ts` to bake the tokens into `styles/motion.css`.
 */
export const springCss = (token: SpringToken, resolutionMs = STEP_MS) => {
  const { duration, at } = resolveSpring(token);
  return { duration: `${duration}ms`, easing: generateLinearEasing(at, duration, resolutionMs) };
};
