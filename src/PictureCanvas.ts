import { Picture } from './Picture';
import { drawPicture } from './drawPicture';
import { elt } from './elt';
import type { OnDown } from './types';

const scale = 10;

export class PictureCanvas {
  dom: HTMLCanvasElement;
  picture: Picture | null = null;

  constructor(picture: Picture, onDown: OnDown) {
    this.dom = elt<HTMLCanvasElement>('canvas', {
      onmousedown: (e) => this.mouse(e, onDown),
      ontouchstart: (e) => this.touch(e, onDown),
    });
    this.syncState(picture);
  }

  syncState(picture: Picture) {
    if (this.picture === picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }

  mouse(e: MouseEvent, onDown: OnDown) {
    if (e.button !== 0) return;
    let position = this.pointerPosition(e, this.dom);
    const onMove = onDown(position);
    if (!onMove) return;

    const move = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons === 0) {
        this.dom.removeEventListener('mousemove', move);
      } else {
        let newPosition = this.pointerPosition(moveEvent, this.dom);
        if (newPosition.x === position.x && newPosition.y === position.y)
          return;
        position = newPosition;
        onMove(newPosition);
      }
    };

    this.dom.addEventListener('mousemove', move);
  }

  touch(e: TouchEvent, onDown: OnDown) {
    let position = this.pointerPosition(e.touches[0], this.dom);
    const onMove = onDown(position);
    e.preventDefault();

    if (!onMove) return;

    let move = (e: TouchEvent) => {
      let newPosition = this.pointerPosition(e.touches[0], this.dom);
      if (newPosition.x === position.x && newPosition.y === position.y) return;
      position = newPosition;
      onMove(newPosition);
    };
    let end = () => {
      this.dom.removeEventListener('touchmove', move);
      this.dom.removeEventListener('touchend', end);
    };
    this.dom.addEventListener('touchmove', move);
    this.dom.addEventListener('touchend', end);
  }

  pointerPosition(position: MouseEvent | Touch, domNode: HTMLElement) {
    let rect = domNode.getBoundingClientRect();

    return {
      x: Math.floor((position.clientX - rect.left) / scale),
      y: Math.floor((position.clientY - rect.top) / scale),
    };
  }
}
