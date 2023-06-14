import { createElement } from '../helpers/createElement';
import { StateManager } from '../state';
type ClassState = {
  startX?: number;
  startY?: number;
};

export class Canvas {
  dom: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  #startX: number = 0;
  #startY: number = 0;

  #mousemoveHandler;

  history: ImageData[] = [];

  constructor(private stateManager: StateManager) {
    this.dom = createElement<HTMLCanvasElement>('canvas', {
      width: 500,
      height: 500,
    });

    this.context = this.dom.getContext('2d', {
      willReadFrequently: true
    })!;
    this.history.push(this.context.getImageData(0, 0, 500, 500));

    this.#mousemoveHandler = this.#mousemove.bind(this);

    this.dom.addEventListener('mousedown', this.#mousedown.bind(this));
    this.dom.addEventListener('mouseup', this.#mouseup.bind(this));
  }

  #mousedown(e: MouseEvent) {
    this.dom.addEventListener('mousemove', this.#mousemoveHandler);
    this.#startX = e.clientX;
    this.#startY = e.clientY;
  }

  #mousemove(e: MouseEvent) {
    this.stateManager.state.tool.func(
      e,
      {
        startX: this.#startX,
        startY: this.#startY,
        context: this.context,
        history: this.history,
        pushHistory: this.#pushHistory.bind(this),
        popHistory: this.#popHistory.bind(this),
      },
      (updateState: ClassState) => {
        this.#startX = updateState.startX || this.#startX;
        this.#startY = updateState.startY || this.#startY;
      },
    );
  }

  #mouseup() {
    this.#pushHistory();
    this.dom.removeEventListener('mousemove', this.#mousemoveHandler);
  }

  #pushHistory() {
    this.history.push(this.context.getImageData(0, 0, 500, 500));
  }

  #popHistory() {
    const data = this.history.pop();
    if (data) {
      this.context.putImageData(data, 0, 0);
    }
  }

  undo() {
    this.#popHistory();
  }
}
