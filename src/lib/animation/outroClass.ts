export const outroClass = (node: Element) => {
  const addClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.add("leaving");
  };
  const removeClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.remove("leaving");
  };
  node.addEventListener("outrostart", addClass);
  node.addEventListener("outroend", removeClass);
  return {
    destroy() {
      node.removeEventListener("outrostart", addClass);
      node.removeEventListener("outroend", removeClass);
    },
  };
};
