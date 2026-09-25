import { getContext, setContext } from 'svelte';
import type { ButtonIconProps } from './types.js';

type ButtonIconVariant = NonNullable<ButtonIconProps['variant']>;

const KEY = Symbol('buttonIconVariant');

/**
 * Sets the variant a `ButtonIcon` below this component takes when it's given none, e.g. an
 * app bar's `standard` (M3: icon buttons in app bars have no container). An explicit
 * `variant` on the button always wins.
 */
export const setButtonIconVariant = (variant: ButtonIconVariant) => setContext(KEY, variant);
export const getButtonIconVariant = (): ButtonIconVariant | undefined => getContext(KEY);
