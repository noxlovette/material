import { mix } from 'motion';
import { describe, expect, it } from 'vitest';
import { animatableShapes, animatableShapesSmall, shapeNames } from './shapeMorph.svelte.js';

const numbers = (d: string) => d.match(/-?\d*\.?\d+(?:e-?\d+)?/g)!.length;
const commands = (d: string) => d.replace(/[^a-z]/gi, '');

describe.each([
  ['animatableShapes', animatableShapes, 1440],
  ['animatableShapesSmall', animatableShapesSmall, 240]
])('%s', (_, shapes, count) => {
  it('has a path for every shape', () => {
    expect(shapeNames).toHaveLength(35);
    for (const name of shapeNames) expect(shapes[name], name).toBeTypeOf('string');
  });

  it('shares one command structure, so any two paths morph', () => {
    for (const name of shapeNames) {
      expect(numbers(shapes[name]), name).toBe(count);
      expect(commands(shapes[name]), name).toBe('mz');
    }
  });

  it('interpolates through Motion, including spring overshoot', () => {
    const shape = mix(shapes.circle, shapes.heart);
    expect(shape(0)).toMatch(/^m/);
    expect(numbers(shape(0.5))).toBe(count);
    expect(numbers(shape(1.1))).toBe(count);
  });
});
