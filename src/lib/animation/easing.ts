import { cubicBezier } from 'motion';

/*
  M3 easing curves as JS functions (progress 0–1 → eased 0–1), for Svelte's `easing` option and
  Motion's `ease`. Same curves as the CSS timing-function tokens in styles/motion.css.
  https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
*/

export const easeStandard = cubicBezier(0.2, 0, 0, 1);
export const easeStandardDecel = cubicBezier(0, 0, 0, 1);
export const easeStandardAccel = cubicBezier(0.3, 0, 1, 1);

export const easeEmphasizedDecel = cubicBezier(0.05, 0.7, 0.1, 1);
export const easeEmphasizedAccel = cubicBezier(0.3, 0, 0.8, 0.15);

/* M3 "emphasized" is a two-segment path: the accelerate curve up to 40% of the value at 1/6 of the
   time, then the decelerate curve for the rest. */
const EMPHASIZED_SPLIT_TIME = 1 / 6;
const EMPHASIZED_SPLIT_VALUE = 0.4;

export const easeEmphasized = (t: number) =>
  t < EMPHASIZED_SPLIT_TIME
    ? EMPHASIZED_SPLIT_VALUE * easeEmphasizedAccel(t / EMPHASIZED_SPLIT_TIME)
    : EMPHASIZED_SPLIT_VALUE +
      (1 - EMPHASIZED_SPLIT_VALUE) *
        easeEmphasizedDecel((t - EMPHASIZED_SPLIT_TIME) / (1 - EMPHASIZED_SPLIT_TIME));
