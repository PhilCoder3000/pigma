import { createElement } from '~/helpers/createElement';
import styles from './DragnDrop.module.scss';

export class DragNDrop {
  #dotTL: HTMLDivElement;
  #dotTR: HTMLDivElement;
  #dotBR: HTMLDivElement;
  #dotBL: HTMLDivElement;

  isDragging: boolean = false;
  #offsetX = 0;
  #offsetY = 0;

  constructor(x: number, y: number, width: number, height: number) {
    this.#dotTL = this.#createDot(x, y);
    this.#dotTR = this.#createDot(x + width, y);
    this.#dotBR = this.#createDot(x + width, y + height);
    this.#dotBL = this.#createDot(x, y + height);
  }

  #createDot(x: number, y: number) {
    const dom = this.#createDomDot();
    dom.style.top = `${x}px`;
    dom.style.left = `${y}px`;

    dom.addEventListener('mousedown', this.mouseDown.bind(this));

    return dom;
  }

  #createDomDot() {
    return createElement<HTMLDivElement>('div', {
      className: styles.dot,
    });
  }

  mouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.#offsetX = e.clientX - (e.target as HTMLElement).offsetLeft;
    this.#offsetY = e.clientY - (e.target as HTMLElement).offsetTop;

    const popup = createElement<HTMLDivElement>('div', {
      className: styles.popup,
    });

    document.body.appendChild(popup);
    (e.target as HTMLElement).style.zIndex = '1001';

    const mouseMoveHandler = this.mouseMove.bind(this);

    const breakDrag = () => {
      document.removeEventListener('mouseup', breakDrag);
      document.removeEventListener('mouseleave', breakDrag);
      document.removeEventListener('mousemove', mouseMoveHandler);

      document.body.removeChild(popup);
      (e.target as HTMLElement).style.zIndex = '';
    };

    document.addEventListener('mouseup', breakDrag);
    document.addEventListener('mouseleave', breakDrag);
    document.addEventListener('mousemove', mouseMoveHandler);
  }

  mouseMove(e: MouseEvent) {
    if (this.isDragging) {
      (e.target as HTMLElement).style.left = e.clientX - this.#offsetX + 'px';
      (e.target as HTMLElement).style.top = e.clientY - this.#offsetY + 'px';
    }
  }

  get dots() {
    return [this.#dotTR, this.#dotTL, this.#dotBR, this.#dotBL];
  }
}
