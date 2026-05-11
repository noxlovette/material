type FloatingOptions = {
  anchor: HTMLElement;
  offset?: number;
  viewportPadding?: number;
};

export function positionFloating(node: HTMLElement, options: FloatingOptions) {
  let { anchor, offset = 8, viewportPadding = 8 } = options;

  function updatePosition() {
    if (!anchor || !node) return;

    const anchorRect = anchor.getBoundingClientRect();
    const pickerRect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const spaceBelow = vh - anchorRect.bottom;
    const spaceAbove = anchorRect.top;

    let placement: "top" | "bottom" = "bottom";

    if (spaceBelow < pickerRect.height && spaceAbove > spaceBelow) {
      placement = "top";
    }

    let top: number;
    if (placement === "bottom") {
      top = anchorRect.bottom + offset;
    } else {
      top = anchorRect.top - pickerRect.height - offset;
    }

    node.style.position = "fixed";
    const maxWidth = Math.max(vw - viewportPadding * 2, 0);
    const maxHeight = Math.max(vh - viewportPadding * 2, 0);
    const minWidth = Math.min(anchorRect.width, maxWidth);

    const clamp = (value: number, min: number, max: number) =>
      max < min ? min : Math.min(Math.max(value, min), max);

    const clampedTop = clamp(
      top,
      viewportPadding,
      vh - pickerRect.height - viewportPadding,
    );
    const clampedLeft = clamp(
      anchorRect.left,
      viewportPadding,
      vw - pickerRect.width - viewportPadding,
    );

    node.style.top = `${isFinite(clampedTop) ? clampedTop : viewportPadding}px`;
    node.style.left = `${isFinite(clampedLeft) ? clampedLeft : viewportPadding}px`;
    node.style.minWidth = `${minWidth}px`;
    node.style.maxWidth = `${maxWidth}px`;
    node.style.maxHeight = `${maxHeight}px`;
    node.style.overflow = "auto";
    node.dataset.placement = placement;
  }

  const ro = new ResizeObserver(() => updatePosition());
  ro.observe(node);
  ro.observe(anchor);

  const onScroll = () => updatePosition();
  const onResize = () => updatePosition();

  window.addEventListener("scroll", onScroll, true);
  window.addEventListener("resize", onResize);

  queueMicrotask(updatePosition);

  return {
    update(newOptions: FloatingOptions) {
      anchor = newOptions.anchor;
      offset = newOptions.offset ?? 8;
      viewportPadding = newOptions.viewportPadding ?? 8;
      updatePosition();
    },
    destroy() {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    },
  };
}
