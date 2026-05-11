import type { AnchorButtonAttributes, IconProps } from "$lib/utils/index.js";
import type { Snippet } from "svelte";
import type {
  HTMLAnchorAttributes,
  HTMLAttributes,
  HTMLButtonAttributes,
} from "svelte/elements";
import type {
  ButtonGroupVariants,
  ButtonIconVariants,
  ButtonMDVariants,
  FABMenuItemVariants,
  FABMenuVariants,
  FABVariants,
} from "./theme.js";

export interface ButtonGroupProps
  extends ButtonGroupVariants, HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the button group.
   * @example
   * <ButtonGroup>
   *   <Button>Action 1</Button>
   *   <Button>Action 2</Button>
   * </ButtonGroup>
   */
  children: Snippet;
  /** Whether all buttons in the group are disabled. */
  disabled?: boolean;
}

export type HTMLButtonOrAnchorAttributes = HTMLButtonAttributes &
  HTMLAnchorAttributes;

export type ButtonMDProps = ButtonMDVariants &
  AnchorButtonAttributes & {
    /**
     * The visual style of the button.
     * - 'filled': High emphasis.
     * - 'tonal': Medium-high emphasis.
     * - 'outlined': Medium emphasis.
     * - 'text': Low emphasis.
     * - 'elevated': High emphasis with elevation.
     */
    variant?: ButtonMDVariants["variant"];
    /**
     * The color scheme of the button.
     */
    color?: ButtonMDVariants["color"];
    /**
     * The size of the button.
     */
    size?: ButtonMDVariants["size"];
    /**
     * The shape of the button corners.
     * - 'round': Fully rounded corners.
     * - 'square': Slightly rounded corners.
     */
    shape?: ButtonMDVariants["shape"];
    /**
     * The label or content to display inside the button.
     */
    children?: Snippet;
    /** Whether the button is disabled. */
    disabled?: boolean;
    /** Whether the button is currently in a selected state (e.g. for toggle buttons). */
    selected?: boolean;
    /** Whether the button behaves as a selection control (scopes selected styling). */
    usage?: ButtonMDVariants["usage"];
    /**
     * Configuration for the leading icon.
     */
    iconProps?: IconProps;
    /**
     * The URL to link to. If provided, the button will render as an `<a>` tag.
     */
    href?: string;
    /** The `formaction` attribute for the button when used in a form. */
    formaction?: string;
    /** Whether the button is in a loading state. Displays a loading indicator and may disable interaction. */
    loading?: boolean;
  };

export type ButtonIconProps = ButtonIconVariants &
  AnchorButtonAttributes & {
    /**
     * The visual style of the icon button.
     */
    variant?: ButtonIconVariants["variant"];
    /**
     * The color scheme of the icon button.
     */
    color?: ButtonIconVariants["color"];
    /**
     * The size of the icon button.
     */
    size?: ButtonIconVariants["size"];
    /**
     * The width style of the icon button.
     * - 'default': Aspect square.
     * - 'narrow': Narrower width.
     * - 'wide': Wider width.
     */
    width?: ButtonIconVariants["width"];
    /**
     * The shape of the icon button corners.
     */
    shape?: ButtonIconVariants["shape"];
    /**
     * The variation of the icon button.
     * - 'default': Standard icon button.
     * - 'toggle': Toggleable icon button.
     */
    variation?: ButtonIconVariants["variation"];
    /**
     * Optional content to render inside the button (usually not used for icon buttons, but available).
     */
    children?: Snippet;
    /** Whether the icon button is disabled. */
    disabled?: boolean;
    /**
     * Content to display in a tooltip when hovering over the button.
     * If omitted, no tooltip is shown.
     */
    tooltipContent?: string;
    /** CSS class added to the tooltip trigger wrapper. */
    triggerClass?: string;
    /** Configuration for the icon to display. */
    iconProps: IconProps;
    /** The URL to link to. If provided, the button will render as an `<a>` tag. */
    href?: string;
    /** The `formaction` attribute for the button when used in a form. */
    formaction?: string;
    /** Whether the toggle button is pressed (only meaningful when `variation === 'toggle'`). */
    pressed?: boolean;
    /** Callback when the pressed state changes (only meaningful when `variation === 'toggle'`). */
    onPressedChange?: (pressed: boolean) => void;
    /** Whether the button is in a loading state. Displays a loading indicator instead of the icon. */
    loading?: boolean;
    /** The side of the tooltip relative to the button. */
    triggerSide?: "top" | "right" | "bottom" | "left";
    /** The alignment of the tooltip relative to the button. */
    triggerAlign?: "start" | "center" | "end";
  };

export type FABProps = FABVariants &
  AnchorButtonAttributes & {
    /**
     * The color configuration of the FAB.
     */
    config?: FABVariants["config"];
    /**
     * The size of the FAB.
     */
    size?: FABVariants["size"];
    /** Whether the FAB is disabled. */
    disabled?: boolean;
    /**
     * Whether the FAB is in its extended state, showing the label.
     */
    expanded?: boolean;
    /** The text label to display when the FAB is extended. */
    label?: string;
    /**
     * Whether the FAB should toggle a menu when clicked.
     * If true, use `children` to provide `FABMenuItem` components.
     */
    withMenu?: boolean;
    /** Configuration for the FAB's icon. */
    iconProps: IconProps;
    /** The URL to link to. If provided, the FAB will render as an `<a>` tag. */
    href?: string;
    /** The `formaction` attribute for the FAB when used in a form. */
    formaction?: string;
    /**
     * The menu items to display when `withMenu` is true.
     * Expected to be one or more `FABMenuItem` components.
     */
    children?: Snippet;
  };

export type FABMenuProps = FABMenuVariants &
  HTMLAttributes<HTMLUListElement> & {
    /**
     * The vertical position of the menu relative to the anchor.
     */
    position?: FABMenuVariants["position"];
    /**
     * The menu items. Use `FABMenuItem` components.
     */
    children: Snippet;
  };

export type FABMenuItemProps = FABMenuItemVariants &
  AnchorButtonAttributes & {
    /**
     * The visual variant of the menu item.
     */
    variant?: FABMenuItemVariants["variant"];
    /** Whether the menu item is in a loading state. */
    loading?: boolean;
    /**
     * The content of the menu item (usually a text label).
     */
    children: Snippet;
    /** Configuration for the menu item's icon. */
    iconProps: IconProps;
    /** The URL to link to. If provided, the menu item will render as an `<a>` tag. */
    href?: string;
    /** The `formaction` attribute for the menu item when used in a form. */
    formaction?: string;
  };

export type ToggleMDProps = Pick<ButtonMDVariants, "size" | "shape"> &
  HTMLButtonAttributes & {
    /** Whether the toggle is currently pressed/selected. Bindable. */
    pressed?: boolean;
    /** Callback when pressed state changes. */
    onPressedChange?: (pressed: boolean) => void;
    /** Label or content inside the toggle. */
    children?: Snippet;
    /** Optional leading icon. */
    iconProps?: IconProps;
    /** Whether the toggle is disabled. */
    disabled?: boolean;
    /** Whether the toggle is in a loading state. */
    loading?: boolean;
  };
