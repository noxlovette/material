import type { cubicOut } from "svelte/easing";

export type TransitionMode =
  | "fade"
  | "scale"
  | "slide-up"
  | "dialog"
  | "dialog-m3";

export interface TransitionOptions {
  delay?: number;
  duration?: number;
  easing?: typeof cubicOut;
  mode?: TransitionMode;
}
