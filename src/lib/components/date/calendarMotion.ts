import { lateral } from '$lib/animation/index.js';
import type { DateValue } from '@internationalized/date';
import { tick } from 'svelte';

const monthIndex = (date: DateValue) => date.year * 12 + date.month;

/**
 * Applies a new calendar placeholder (the month the grid shows). When the visible month changes
 * while the calendar is open, the grid runs the M3 lateral transition — months are peers, so a
 * later month pushes in from the right and an earlier one from the left. Covers every way the
 * month changes: prev/next buttons, arrow keys past the month edge, picking an outside day.
 * https://m3.material.io/styles/motion/transitions/transition-patterns#lateral
 */
export const slideMonth = (
  current: DateValue | undefined,
  next: DateValue,
  target: HTMLElement | null | undefined,
  apply: (next: DateValue) => void
) => {
  const update = async () => {
    apply(next);
    await tick();
  };
  if (!current || !target?.isConnected || monthIndex(current) === monthIndex(next)) {
    return void update();
  }
  lateral(update, {
    target,
    direction: monthIndex(next) > monthIndex(current) ? 'forward' : 'backward'
  });
};
