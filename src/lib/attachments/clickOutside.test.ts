// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { clickOutside } from './clickOutside.js';

function setup() {
  const node = document.createElement('div');
  const child = document.createElement('button');
  const outside = document.createElement('button');
  node.append(child);
  document.body.append(node, outside);
  const handler = vi.fn();
  const cleanup = clickOutside(handler)(node) as () => void;
  return { node, child, outside, handler, cleanup };
}

describe('clickOutside', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('calls the handler for clicks outside the node', () => {
    const { outside, handler } = setup();
    outside.click();
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('ignores clicks on the node and its descendants', () => {
    const { node, child, handler } = setup();
    node.click();
    child.click();
    expect(handler).not.toHaveBeenCalled();
  });

  it('fires even when the outside target stops propagation', () => {
    const { outside, handler } = setup();
    outside.addEventListener('click', (e) => e.stopPropagation());
    outside.click();
    expect(handler).toHaveBeenCalledOnce();
  });

  it('treats a click inside a shadow root hosted in the node as inside', () => {
    const { node, handler } = setup();
    const host = document.createElement('div');
    node.append(host);
    const inner = document.createElement('button');
    host.attachShadow({ mode: 'open' }).append(inner);
    inner.click();
    expect(handler).not.toHaveBeenCalled();
  });

  it('stops listening after cleanup', () => {
    const { outside, handler, cleanup } = setup();
    cleanup();
    outside.click();
    expect(handler).not.toHaveBeenCalled();
  });
});
