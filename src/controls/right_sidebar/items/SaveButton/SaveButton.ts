import { Canvas } from '~/canvas/Canvas';
import { createElement } from '~/helpers/createElement';
import { Control } from '~/types';
import styles from './SaveButton.module.scss';

export class SaveButton implements Control {
  dom: HTMLButtonElement;

  constructor(private canvas: Canvas) {
    this.dom = this.#createDom();
  }

  #createDom() {
    return createElement<HTMLButtonElement>('button', {
      textContent: 'Save',
      className: styles.button,
      onclick: this.#save.bind(this),
    });
  }

  #save() {
    const dataUrl = this.canvas.dom.toDataURL('image/png');
    const a = createElement<HTMLAnchorElement>('a', {
      href: dataUrl,
      download: 'Pigma-image',
    });

    a.click();
    a.remove();
  }
}
