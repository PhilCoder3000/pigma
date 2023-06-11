export function createElement<T extends HTMLElement>(
  tag: HTMLTag,
  props?: Partial<GlobalEventHandlers & T>,
  ...children: any[]
): T {
  let dom = document.createElement(tag);
  if (props) {
    Object.assign(dom, props);
  }

  for (const child of children) {
    if (typeof child === 'string') {
      dom.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      dom.appendChild(child);
    }
  }
  return dom as T;
}
