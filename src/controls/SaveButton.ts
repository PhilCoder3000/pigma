import { Picture } from '../Picture';
import { drawPicture } from '../drawPicture';
import { elt } from '../elt';
import type { Control, State } from '../types';

export class SaveButton implements Control {
  dom: HTMLButtonElement;
  picture: Picture;
  constructor(state: State) {
    this.picture = state.picture;
    this.dom = elt<HTMLButtonElement>(
      'button',
      {
        onclick: () => this.save(),
      },
      'Сохранить',
    );
  }

  save() {
    let canvas = elt<HTMLCanvasElement>('canvas');
    drawPicture(this.picture, canvas, 1);
    let link = elt<HTMLAnchorElement>('a', {
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
