/** Whether the user asked for reduced motion. False where there's no `matchMedia` (SSR). */
export const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
