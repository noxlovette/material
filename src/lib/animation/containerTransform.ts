import { animateView, type ViewTransitionTargetDefinition } from 'motion';
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
 * M3 container transform: one container morphs its bounds, shape and color into another while
 * the outgoing content fades out and the incoming content fades in on top.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#container-transform
 *
 * Built on Motion's `animateView()` (View Transition API), so `from` and `to` never have to be in
 * the DOM at the same time — `update` swaps one for the other. Browsers without the API just run
 * `update`. A second call while one is running is queued, not interrupted.
 *
 * ```ts
 * containerTransform(
 *   async () => { expanded = true; await tick(); },
 *   { from: cardEl, to: '[data-detail]' }
 * );
 * ```
 */
export const containerTransform = (
  update: () => void | Promise<void>,
  { from, to, spring = springTokens.spatial }: ContainerTransformOptions
) =>
  animateView(update, springTransition(spring))
    .add(from, to)
    .old({ opacity: [1, 0] }, springTransition(springTokens.fastEffects))
    .new({ opacity: [0, 1] }, { ...springTransition(springTokens.effects), delay: 0.05 });
