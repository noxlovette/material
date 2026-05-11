import type { TransitionConfig } from "svelte/transition";
import { easeEmphasized } from "./easing.js";
import type { TransitionOptions } from "./transitionTypes.js";

export const enterExit = (
  node: Element,
  options: TransitionOptions = {},
): TransitionConfig => {
  const mode = options.mode ?? "fade";
  return {
    delay: options.delay ?? 0,
    duration: options.duration ?? 300,
    easing: options.easing ?? easeEmphasized,
    css: (t) => {
      switch (mode) {
        case "scale":
          return `opacity: ${t}; transform: scale(${0.85 + t * 0.15});`;
        case "slide-up":
          return `opacity: ${t}; transform: translateY(${(1 - t) * 12}px);`;
        case "dialog":
          return `opacity: ${t}; transform: translateY(${(1 - t) * -24}px) scale(${0.9 + t * 0.1});`;
        case "dialog-m3":
          return `opacity: ${t}; transform: scale(${0.9 + t * 0.1});`;
        default:
          return `opacity: ${t};`;
      }
    },
  };
};
