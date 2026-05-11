import {
  arrow as arrowMw,
  autoUpdate,
  computePosition,
  offset,
  shift,
  type Middleware,
  type Placement
} from '@floating-ui/dom';

export type FloatingParams = {
  reference: HTMLElement; // anchor
  placement?: Placement; // e.g. 'bottom-start'
  strategy?: 'absolute' | 'fixed'; // use 'fixed' to escape overflow clipping
  offsetPx?: number; // spacing between anchor and overlay
  middleware?: Middleware[]; // extra middleware
  arrowEl?: HTMLElement | null; // optional arrow element inside floating
  arrowPadding?: number;
  enabled?: boolean;
  onUpdate?: (data: { x: number; y: number; placement: Placement }) => void;
};

export function floating(node: HTMLElement, params: FloatingParams) {
  let cleanup: VoidFunction | null = null;

  let p: FloatingParams = { ...params };
  p.strategy ??= 'absolute';
  p.offsetPx ??= 8;
  p.enabled ??= true;

  async function update() {
    if (!p.enabled) return;
    if (!p.reference) return;

    const middleware: Middleware[] = [
      offset(p.offsetPx ?? 8),
      shift({ padding: 8 }),
      ...(p.middleware ?? [])
    ];

    if (p.arrowEl) {
      middleware.push(
        arrowMw({
          element: p.arrowEl,
          padding: p.arrowPadding ?? 6
        })
      );
    }

    const { x, y, placement, middlewareData } = await computePosition(p.reference, node, {
      placement: p.placement,
      strategy: p.strategy,
      middleware
    });

    Object.assign(node.style, {
      position: p.strategy,
      left: `${x}px`,
      top: `${y}px`
    });

    // Optional arrow positioning
    if (p.arrowEl && middlewareData.arrow) {
      const { x: ax, y: ay } = middlewareData.arrow as {
        x?: number;
        y?: number;
      };
      const side = placement.split('-')[0]; // 'top'|'bottom'|'left'|'right'
      const staticSide: Record<string, string> = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };

      Object.assign(p.arrowEl.style, {
        left: ax != null ? `${ax}px` : '',
        top: ay != null ? `${ay}px` : '',
        right: '',
        bottom: '',
        [staticSide[side]]: `-4px` // arrow size tweak
      });
    }

    p.onUpdate?.({ x, y, placement: placement as Placement });
  }

  function startAutoUpdate() {
    stopAutoUpdate();
    if (!p.enabled || !p.reference) return;

    cleanup = autoUpdate(p.reference, node, update, {
      // works well for scroll containers too
      ancestorScroll: true,
      ancestorResize: true,
      elementResize: true,
      layoutShift: true,
      animationFrame: false
    });
  }

  function stopAutoUpdate() {
    cleanup?.();
    cleanup = null;
  }

  // init
  startAutoUpdate();
  void update();

  return {
    update(next: FloatingParams) {
      p = { ...p, ...next };
      p.strategy ??= 'absolute';
      p.offsetPx ??= 8;
      p.enabled ??= true;
      startAutoUpdate();
      void update();
    },
    destroy() {
      stopAutoUpdate();
    }
  };
}
