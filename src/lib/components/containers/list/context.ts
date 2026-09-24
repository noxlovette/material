import { getContext, setContext } from 'svelte';

type ListContext = { readonly variant: 'standard' | 'segmented' };

const KEY = Symbol('list');

export const setListContext = (ctx: ListContext) => setContext(KEY, ctx);
export const getListContext = (): ListContext | undefined => getContext(KEY);
