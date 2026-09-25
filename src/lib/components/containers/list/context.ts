import { getContext, setContext } from 'svelte';

/** Where the outgoing selection was drawn, relative to the list's box. */
export type SelectionRect = { top: number; bottom: number; left: number; right: number };

type ListContext = {
  readonly variant: 'standard' | 'segmented';
  /** The list's own element, which selection rects are measured against. */
  readonly element: HTMLElement | undefined;
  /**
   * Handed from the item losing the selection to the one gaining it within one update, so the
   * selected fill travels between them. Cleared once that update settles.
   */
  from: SelectionRect | null;
};

const KEY = Symbol('list');

export const setListContext = (ctx: ListContext) => setContext(KEY, ctx);
export const getListContext = (): ListContext | undefined => getContext(KEY);
