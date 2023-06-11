import { Picture } from '../canvas/Picture';
import { drawPicture } from '../canvas/drawPicture';
import { createElement } from '../helpers/createElement';
import type { Control, State } from '../types';

export class SaveButton implements Control {
  dom: HTMLButtonElement;
  picture: Picture;
  constructor(state: State) {
    this.picture = state.picture;
    this.dom = createElement<HTMLButtonElement>(
      'button',
      {
        onclick: () => this.save(),
      },
      'Сохранить',
    );
  }

  save() {
    let canvas = createElement<HTMLCanvasElement>('canvas');
    drawPicture(this.picture, canvas, 1);
    let link = createElement<HTMLAnchorElement>('a', {
      href: canvas.toDataURL(),
      download: 'pixelart.png',
    });

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state: State) {
    this.picture = state.picture;
  }
}
