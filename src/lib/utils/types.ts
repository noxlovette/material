import type {
  HTMLAnchorAttributes,
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLLabelAttributes
} from 'svelte/elements';

export const xs = 'xs';
export const sm = 'sm';
export const md = 'md';
export const lg = 'lg';
export const xl = 'xl';

export type SizeType = typeof xs | typeof sm | typeof md | typeof lg | typeof xl;

export type AnchorButtonAttributes =
  | ({ href: string } & HTMLAnchorAttributes)
  | ({ href?: undefined } & HTMLButtonAttributes);

export type LabelAttrs = HTMLLabelAttributes & Required<Pick<HTMLLabelAttributes, 'for'>>;

export type AnchorAttrs = HTMLAnchorAttributes & Required<Pick<HTMLAnchorAttributes, 'href'>>;

export type NotButton<T> = Omit<T, 'onclick'>;

export type ButtonAttrs = HTMLButtonAttributes & Required<Pick<HTMLButtonAttributes, 'onclick'>>;

export type DivAttrs = NotButton<HTMLAttributes<HTMLDivElement>>;

export type {
  ComputePositionConfig,
  Middleware,
  MiddlewareState,
  Placement,
  Strategy
} from '@floating-ui/dom';
