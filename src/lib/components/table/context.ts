import { getContext, setContext } from 'svelte';

const TABLE_CTX = Symbol('table');

export interface TableContext {
	rounded: boolean;
}

export function setTableContext(ctx: TableContext): void {
	setContext(TABLE_CTX, ctx);
}

export function getTableContext(): TableContext {
	return getContext<TableContext>(TABLE_CTX) ?? { rounded: false };
}
