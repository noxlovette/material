import { animate } from 'motion';
import type { Attachment } from 'svelte/attachments';
import { springTokens, springTransition } from './spring.js';

/* Hold at each end of the pulse — a critically damped spring alone settles in ~370ms, which reads
   as flicker. Not an M3 value: tune by eye. */
const PULSE_HOLD_S = 0.5;

/**
 * M3 skeleton loader: a placeholder pulses until real content replaces it. Swap the placeholder
 * for the content with `presence(…, enterExit.fade)` so the reveal is a fade, not a cut.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#skeleton-loaders
 *
 * M3 "stable layouts" (https://m3.material.io/styles/motion/transitions/applying-transitions): the placeholder takes the loaded
 * content's footprint so nothing pops in or shifts position when the data arrives.
 *
 * Not built into any component — none of them load their own data. Apps apply it to placeholders.
 *
 * ```svelte
 * <div class="bg-md-sys-color-surface-container-highest h-spacing-200 rounded-sm" {@attach skeleton}></div>
 * ```
 */
export const skeleton: Attachment<HTMLElement> = (node) => {
  const controls = animate(
    node,
    { opacity: [1, 0.4] },
    {
      ...springTransition(springTokens.slowEffects),
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: PULSE_HOLD_S
    }
  );
  return () => controls.stop();
};
