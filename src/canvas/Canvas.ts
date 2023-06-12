import { Picture } from './Picture';
import { drawPicture } from './drawPicture';
import { createElement } from '../helpers/createElement';
import type { OnDown } from '../types';

export class Canvas {
  dom: HTMLCanvasElement;
  picture: Picture | null = null;
  context: CanvasRenderingContext2D;

  #startX: number = 0;
  #startY: number = 0;

  mousemoveHandler; 

  constructor(picture: Picture, onDown: OnDown) {
    this.dom = createElement<HTMLCanvasElement>('canvas', {
      width: 500,
      height: 500,
    });

    this.context = this.dom.getContext('2d')!;

    this.mousemoveHandler = this.mousemove.bind(this)
    const mousedown = this.mousedown.bind(this)
    const mouseup = this.mouseup.bind(this)

    this.dom.addEventListener('mousedown', mousedown);
    this.dom.addEventListener('mouseup', mouseup);
  }

  mousedown(e: MouseEvent) {
    this.dom.addEventListener('mousemove', this.mousemoveHandler)
    this.#startX = e.clientX;
    this.#startY = e.clientY;
  }

  mousemove({ clientX, clientY }: MouseEvent) {
    this.context.beginPath();
    this.context.moveTo(this.#startX, this.#startY);
    this.context.lineTo(clientX, clientY);
    this.context.stroke();
    this.#startX = clientX;
    this.#startY = clientY;
  }

  mouseup() {
    this.dom.removeEventListener('mousemove', this.mousemoveHandler);
  }
}
