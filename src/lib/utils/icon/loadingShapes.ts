import {
  pathAnimatableSmallFourSidedCookie,
  pathAnimatableSmallNineSidedCookie,
  pathAnimatableSmallOval,
  pathAnimatableSmallPentagon,
  pathAnimatableSmallPill,
  pathAnimatableSmallSoftBurst,
  pathAnimatableSmallSunny
} from '$lib/animation/shapesAnimatableSmall.js';

/*
  The seven shapes the M3 loading indicator morphs through, in a 48 × 48 viewBox. They come from the
  small animatable set, so every path has the same command structure (120 relative points) and
  Motion's `mix` can interpolate between any two.
  https://m3.material.io/components/loading-indicator/specs
*/
export const LOADING_SHAPES = [
  pathAnimatableSmallSoftBurst,
  pathAnimatableSmallNineSidedCookie,
  pathAnimatableSmallPentagon,
  pathAnimatableSmallPill,
  pathAnimatableSmallSunny,
  pathAnimatableSmallFourSidedCookie,
  pathAnimatableSmallOval
] as const;
