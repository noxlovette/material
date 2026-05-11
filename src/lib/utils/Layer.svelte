<script module lang="ts">
  let initialized = false;

  const activePointerRipples: (() => void)[] = [];
  const activeKeyboardRipples: (() => void)[] = [];

  const isEnabled = (node: Element): boolean => {
    if (node instanceof HTMLButtonElement && node.disabled) return false;
    if (node instanceof HTMLInputElement && node.disabled) return false;
    if (node instanceof HTMLLabelElement) {
      const control = node.control;
      if (control instanceof HTMLInputElement && control.disabled) return false;
    }
    return true;
  };

  const createRippleSvg = (
    node: Element,
    x: number,
    y: number,
    width: number,
    height: number
  ): (() => void) | null => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

    const size = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) * 2.5;
    const speed = Math.max(Math.min(Math.log(size) * 50, 600), 200);

    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.id = `ripple-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    for (const { offset, opacity } of [
      { offset: '0%', opacity: '0.12' },
      { offset: '70%', opacity: '0.12' },
      { offset: '100%', opacity: '0' }
    ]) {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', 'currentColor');
      stop.setAttribute('stop-opacity', opacity);
      gradient.appendChild(stop);
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', `${x}`);
    circle.setAttribute('cy', `${y}`);
    circle.setAttribute('r', '0');
    circle.setAttribute('fill', `url(#${gradient.id})`);

    const expand = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    expand.setAttribute('attributeName', 'r');
    expand.setAttribute('from', '0');
    expand.setAttribute('to', `${size / 2}`);
    expand.setAttribute('dur', `${speed}ms`);
    expand.setAttribute('fill', 'freeze');
    expand.setAttribute('calcMode', 'spline');
    expand.setAttribute('keySplines', '0.4 0, 0.2 1');
    circle.appendChild(expand);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('m3-ripple');
    svg.style.cssText = [
      'position: absolute',
      'inset: 0',
      'width: 100%',
      'height: 100%',
      'overflow: hidden',
      'border-radius: inherit',
      'pointer-events: none'
    ].join(';');
    svg.appendChild(gradient);
    svg.appendChild(circle);

    const ua = navigator.userAgent;
    const isFirefox = ua.includes('Firefox');
    const isTrulySafari = !ua.includes('Chrome') && ua.includes('Safari');
    if (!isFirefox && !isTrulySafari && size > 100) {
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = `noise-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const turb = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
      turb.setAttribute('type', 'fractalNoise');
      turb.setAttribute('baseFrequency', '0.6');
      turb.setAttribute('seed', Math.random().toString());

      const disp = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      disp.setAttribute('in', 'SourceGraphic');
      disp.setAttribute('scale', `${size ** 2 * 0.0002}`);
      disp.setAttribute('xChannelSelector', 'R');
      disp.setAttribute('yChannelSelector', 'B');

      filter.appendChild(turb);
      filter.appendChild(disp);
      circle.setAttribute('filter', `url(#${filter.id})`);
      svg.appendChild(filter);
    }

    node.appendChild(svg);

    return () => {
      const fade = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      fade.setAttribute('attributeName', 'opacity');
      fade.setAttribute('from', '1');
      fade.setAttribute('to', '0');
      fade.setAttribute('dur', '800ms');
      fade.setAttribute('fill', 'freeze');
      fade.setAttribute('calcMode', 'spline');
      fade.setAttribute('keySplines', '0.4 0, 0.2 1');
      circle.appendChild(fade);
      fade.beginElement();
      setTimeout(() => svg.remove(), 800);
    };
  };

  function initRipple() {
    if (initialized || typeof document === 'undefined') return;
    initialized = true;

    document.documentElement.classList.add('js');

    document.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const layer = (e.target as Element).closest('.m3-layer');
      if (!layer || !isEnabled(layer)) return;
      const rect = layer.getBoundingClientRect();
      const cancel = createRippleSvg(
        layer,
        e.clientX - rect.left,
        e.clientY - rect.top,
        rect.width,
        rect.height
      );
      if (cancel) activePointerRipples.push(cancel);
    });

    const cancelPointerRipples = () => {
      for (const cancel of activePointerRipples) cancel();
      activePointerRipples.length = 0;
    };
    document.addEventListener('pointerup', cancelPointerRipples);
    document.addEventListener('dragend', cancelPointerRipples);

    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      const target = e.target as Element;
      const layer = target.closest('.m3-layer');
      if (!layer || !isEnabled(layer)) return;
      const isActivate = e.key === 'Enter' || (e.key === ' ' && layer.tagName === 'BUTTON');
      if (!isActivate) return;
      const rect = layer.getBoundingClientRect();
      const cancel = createRippleSvg(
        layer,
        rect.width / 2,
        rect.height / 2,
        rect.width,
        rect.height
      );
      if (cancel) activeKeyboardRipples.push(cancel);
    });

    document.addEventListener('keyup', () => {
      for (const cancel of activeKeyboardRipples) cancel();
      activeKeyboardRipples.length = 0;
    });
  }
</script>

<script lang="ts">
  let self: HTMLElement;

  $effect(() => {
    initRipple();
    const parent = self.parentElement;
    if (!parent) return;
    parent.classList.add('m3-layer');
    return () => parent.classList.remove('m3-layer');
  });
</script>

<span bind:this={self} style="display:none" aria-hidden="true"></span>
<div class="hitbox"></div>
<div class="tint"></div>

<style>
  .hitbox {
    position: absolute;
    inset: 0;
  }
  .tint {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background-color: currentColor;
    opacity: 0;
    transition: opacity var(--md-sys-motion-duration-fast, 150ms)
      var(--md-sys-motion-timing-function, cubic-bezier(0.34, 0.8, 0.34, 1));

    &:not(
      :global(input:disabled + label) > .tint,
      :global(input:disabled + .layer-container) > .tint,
      :global(:disabled) > .tint
    ) {
      @media (hover: hover) {
        &:is(:global(:hover) > .tint, :global(:active) > .tint) {
          opacity: 0.08;
        }
      }
      &:is(:global(input:focus-visible + label) > .tint),
      &:is(:global(:focus-visible) > .tint),
      &:is(:global(:active) > .tint) {
        opacity: 0.12;
      }
    }
  }
</style>
