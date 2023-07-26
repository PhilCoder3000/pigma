import { createElement } from '~/helpers/createElement';
import styles from './DragnDrop.module.scss';
import { Canvas } from '~/canvas/Canvas';

type Position = 'TL' | 'TR' | 'BR' | 'BL';

export class DragNDrop {
  #dotTL: HTMLDivElement;
  #dotTR: HTMLDivElement;
  #dotBR: HTMLDivElement;
  #dotBL: HTMLDivElement;

  isDragging: boolean = false;
  #offsetX = 0;
  #offsetY = 0;

  size = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  constructor(private canvas: Canvas, private image: HTMLImageElement) {
    const { width, height } = image;

    this.size = {
      startX: 0,
      startY: 0,
      endX: width,
      endY: height,
    };

    const { startX, startY, endX, endY } = this.size;

    this.#dotTL = this.#createDot(startX, startY, 'TL');
    this.#dotTR = this.#createDot(endX, startY, 'TR');
    this.#dotBR = this.#createDot(endX, endY, 'BR');
    this.#dotBL = this.#createDot(startX, endY, 'BL');

    this.#renderDots();
    this.#drawImage();
    canvas.pushHistory();
  }

  #createDot(x: number, y: number, position: Position) {
    const dom = createElement<HTMLDivElement>('div', {
      className: styles.dot,
    });
    dom.style.left = `${x}px`;
    dom.style.top = `${y}px`;
    dom.dataset.position = position;

    dom.addEventListener('mousedown', this.mouseDown.bind(this));

    return dom;
  }

  mouseDown(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    this.isDragging = true;
    this.#offsetX = e.clientX - target.offsetLeft;
    this.#offsetY = e.clientY - target.offsetTop;

    const popup = createElement<HTMLDivElement>('div', {
      className: styles.popup,
    });

    document.body.appendChild(popup);
    target.style.zIndex = '1001';

    const mouseMoveHandler = this.mouseMove.bind(this);

    const breakDrag = () => {
      document.removeEventListener('mouseup', breakDrag);
      document.removeEventListener('mouseleave', breakDrag);
      document.removeEventListener('mousemove', mouseMoveHandler);

      document.body.removeChild(popup);
      target.style.zIndex = '';
      this.canvas.pushHistory();
    };

    document.addEventListener('mouseup', breakDrag);
    document.addEventListener('mouseleave', breakDrag);
    document.addEventListener('mousemove', mouseMoveHandler);
  }

  mouseMove(e: MouseEvent) {
    if (this.isDragging) {
      const movingDot = e.target as HTMLDivElement;

      const diffX = e.clientX - this.#offsetX,
        diffXpx = `${diffX}px`,
        diffY = e.clientY - this.#offsetY,
        diffYpx = `${diffY}px`;

      switch (movingDot.dataset.position as Position) {
        case 'TL':
          this.size.startX = diffX;
          this.size.startY = diffY;

          movingDot.style.left = diffXpx;
          movingDot.style.top = diffYpx;

          this.#dotTR.style.top = diffYpx;
          this.#dotBL.style.left = diffXpx;

          break;

        case 'TR':
          this.size.endX = diffX;
          this.size.startY = diffY;

          movingDot.style.left = diffXpx;
          movingDot.style.top = diffYpx;

          this.#dotTL.style.top = diffYpx;
          this.#dotBR.style.left = diffXpx;

          break;

        case 'BR':
          this.size.endX = diffX;
          this.size.endY = diffY;

          movingDot.style.left = diffXpx;
          movingDot.style.top = diffYpx;

          this.#dotTR.style.left = diffXpx;
          this.#dotBL.style.top = diffYpx;

          break;

        case 'BL':
          this.size.startX = diffX;
          this.size.endY = diffY;

          movingDot.style.left = diffXpx;
          movingDot.style.top = diffYpx;

          this.#dotTL.style.left = diffXpx;
          this.#dotBR.style.top = diffYpx;

          break;

        default:
          break;
      }
      this.canvas.context.putImageData(
        this.canvas.history[history.length - 1],
        0,
        0,
      );

      this.#drawImage();
    }
  }

  #drawImage() {
    this.canvas.context.drawImage(
      this.image,
      this.size.startX,
      this.size.startY,
      this.size.endX - this.size.startX,
      this.size.endY - this.size.startY,
    );
  }

  #renderDots() {
    document.body.appendChild(this.#dotTL);
    document.body.appendChild(this.#dotTR);
    document.body.appendChild(this.#dotBR);
    document.body.appendChild(this.#dotBL);
  }

  get dots() {
    return [this.#dotTR, this.#dotTL, this.#dotBR, this.#dotBL];
  }
}
