import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { PillVariants } from "./theme.js";

export interface PillProps
  extends PillVariants, HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}
