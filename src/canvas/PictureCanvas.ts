import { Picture } from './Picture';
import { drawPicture } from './drawPicture';
import { createElement } from '../helpers/createElement';
import type { OnDown } from '../types';

export class PictureCanvas {
  dom: HTMLCanvasElement;
  picture: Picture | null = null;
  context: CanvasRenderingContext2D;
  #startX: number = 0;
  #startY: number = 0;

  constructor(picture: Picture, onDown: OnDown) {
    this.dom = createElement<HTMLCanvasElement>('canvas', {
      width: 500,
      height: 500,
    });

    this.context = this.dom.getContext('2d')!;
    const that = this;

    this.dom.addEventListener('mousedown', function (e) {
      this.addEventListener('mousemove', function({ clientX, clientY }) {
        that.context.beginPath();
        that.context.moveTo(that.#startX, that.#startY);
        that.context.lineTo(clientX, clientY);
        that.context.stroke();
        that.#startX = clientX;
        that.#startY = clientY;
      });
      that.#startX = e.clientX;
      that.#startY = e.clientY;
    });

    this.dom.addEventListener('mouseup', function (e) {
      this.removeEventListener('mousemove', that.mousemove);
    });
  }

  mousemove({ clientX, clientY }: MouseEvent) {
    this.context.beginPath();
    this.context.moveTo(this.#startX, this.#startY);
    this.context.lineTo(clientX, clientY);
    this.context.stroke();
    this.#startX = clientX;
    this.#startY = clientY;
  }

  mouseup(e: MouseEvent) {
    this.dom.removeEventListener('mousemove', this.mousemove);
  }
}
