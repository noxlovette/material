import { generateLinearEasing, spring } from 'motion';

/**
 * M3 Expressive spring tokens: `stiffness` plus a `dampingRatio` (1 = no overshoot).
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

const resolveSpring = ({ stiffness, dampingRatio }: SpringToken) => {
  // Motion takes an absolute damping coefficient; M3 specifies a ratio (mass is 1).
  const damping = dampingRatio * 2 * Math.sqrt(stiffness);
  const generator = spring({ keyframes: [0, 1], stiffness, damping });

  let duration = 0;
  while (!generator.next(duration).done && duration < MAX_MS) duration += STEP_MS;

  return { duration, at: (progress: number) => generator.next(duration * progress).value };
};

/**
 * A spring as a Svelte-transition-friendly `{ duration, easing }` pair. `duration` is the time
 * (ms) the spring takes to settle; `easing` may briefly exceed 1 for underdamped springs.
 *
 * ```svelte
 * <div in:enterExit={{ ...springEasing(springTokens.spatial), mode: 'scale' }}>
 * ```
 */
export const springEasing = (token: SpringToken) => {
  const { duration, at } = resolveSpring(token);
  return { duration, easing: at };
};

/**
 * A spring as CSS `transition` parts: a settle `duration` and a `linear()` `easing`.
 * Used by `scripts/generate-motion-springs.ts` to bake the tokens into `styles/motion.css`.
 */
export const springCss = (token: SpringToken, resolutionMs = STEP_MS) => {
  const { duration, at } = resolveSpring(token);
  return { duration: `${duration}ms`, easing: generateLinearEasing(at, duration, resolutionMs) };
};
