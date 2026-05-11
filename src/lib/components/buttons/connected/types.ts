import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface ConnectedButtonsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The buttons to be connected.
   * @example
   * <ConnectedButtons>
   *   <Button>Left</Button>
   *   <Button>Center</Button>
   *   <Button>Right</Button>
   * </ConnectedButtons>
   */
  children: Snippet;
}
