import { animate, type AnimationPlaybackControls } from 'motion';
import { untrack } from 'svelte';
import { springTransition, type SpringToken } from './spring.js';

/**
 * A number that springs towards a reactive target — for values rendered as geometry (a progress
 * fill, a slider handle) rather than as a Motion-animated element. Retargeting mid-flight keeps
 * the spring's velocity. Construct during component init.
 *
 * ```svelte
 * <script>
 *   const shown = new SpringValue(() => percent, springTokens.slowEffects);
 * </script>
 *
 * <div style:width="{shown.current}%"></div>
 * ```
 *
 * `immediate` jumps straight to the target while it returns true — e.g. while a handle is dragged,
 * where the value must track the pointer 1:1.
 */
export class SpringValue {
  current = $state(0);
  #controls: AnimationPlaybackControls | undefined;

  constructor(target: () => number, spring: SpringToken, immediate?: () => boolean) {
    this.current = untrack(target);

    $effect(() => {
      const to = target();
      const jump = immediate?.() ?? false;
      untrack(() => {
        this.#controls?.stop();
        if (jump) {
          this.current = to;
          return;
        }
        this.#controls = animate(this.current, to, {
          ...springTransition(spring),
          onUpdate: (latest) => (this.current = latest)
        });
      });
    });

    $effect(() => () => this.#controls?.stop());
  }
}
