import type { Avatar as AvatarPrimitive } from "bits-ui";
import type { VariantProps } from "tailwind-variants";
import type { avatar } from "./theme.js";

export type AvatarVariants = VariantProps<typeof avatar>;

export type AvatarProps = AvatarPrimitive.RootProps & {
  /** The URL of the avatar image. If null or undefined, a generated avatar will be used. */
  src?: string | null;
  /** The alt text for the avatar image. */
  alt?: string;
  /** The seed for the generated avatar if no src is provided. */
  seed?: string;
  /** The loading status of the avatar image. */
  loadingStatus?: "loading" | "loaded" | "error";
  /** Callback for when the avatar is clicked. If provided, the avatar is wrapped in a button. */
  onclick?: (e: MouseEvent) => void;
  /** Additional CSS classes for the avatar element. */
  class?: string;
} & AvatarVariants;
