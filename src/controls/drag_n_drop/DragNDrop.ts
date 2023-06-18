import { createElement } from '~/helpers/createElement';
import styles from './DragnDrop.module.scss';
import { Canvas } from '~/canvas/Canvas';

export class DragNDrop {
  #dotTL: HTMLDivElement;
  #dotTR: HTMLDivElement;
  #dotBR: HTMLDivElement;
  #dotBL: HTMLDivElement;

  isDragging: boolean = false;
  #offsetX = 0;
  #offsetY = 0;

  constructor(private canvas: Canvas, private image: HTMLImageElement) {
    const { width, height } = image;
    const x = 0,
      y = 0;
    this.#dotTL = this.#createDot(x, y);
    this.#dotTR = this.#createDot(x + height, y);
    this.#dotBR = this.#createDot(x + height, y + width);
    this.#dotBL = this.#createDot(x, y + width);

    this.dots.forEach((dot) => document.body.appendChild(dot));
    canvas.context.drawImage(image, x, y, width, height);
    canvas.pushHistory();
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
      this.canvas.context.putImageData(
        this.canvas.history[history.length - 1],
        0,
        0,
      );

      const width = e.clientX - this.#offsetX;
      const height = e.clientY - this.#offsetY;
      (e.target as HTMLElement).style.left = width + 'px';
      (e.target as HTMLElement).style.top = height + 'px';

      this.canvas.context.drawImage(this.image, 0, 0, width, height);
    }
  }

  get dots() {
    return [this.#dotTR, this.#dotTL, this.#dotBR, this.#dotBL];
  }
}
