import type { Control } from '~/types';
import { createElement } from '~/helpers/createElement';
import styles from './LoadButton.module.scss';
import { Canvas } from '~/canvas/Canvas';
import { DragNDrop } from '~/controls/drag_n_drop/DragNDrop';

export class LoadButton implements Control {
  dom: HTMLButtonElement;

  constructor(private canvas: Canvas) {
    this.dom = this.#createDom();
  }

  #createDom() {
    return createElement<HTMLButtonElement>('button', {
      textContent: 'Load image',
      className: styles.button,
      onclick: this.#handleLoad.bind(this),
    });
  }

  #handleLoad() {
    const input = createElement<HTMLInputElement>('input', {
      type: 'file',
      onchange: this.#handleChange.bind(this),
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
  }

  #handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        
        const img = new Image();
        img.src = e.target!.result as string;

        img.onload = () => {
          new DragNDrop(this.canvas, img)
        };
      };
    }
  }
}
