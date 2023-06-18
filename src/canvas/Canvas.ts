import type { Config } from '~/types';
import { eventEmitter } from '~/EventEmitter';
import { createElement } from '~/helpers/createElement';
import { StateManager } from '~/state';

type ClassState = {
  startX?: number;
  startY?: number;
};

export class Canvas {
  dom: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  startX: number = 0;
  startY: number = 0;

  #mousemoveHandler;

  history: ImageData[] = [];

  constructor(public stateManager: StateManager, private config: Config) {
    this.dom = createElement<HTMLCanvasElement>('canvas', {
      width: config.width,
      height: config.height,
    });

    this.context = this.dom.getContext('2d', {
      willReadFrequently: true,
    })!;

    this.history.push(
      this.context.getImageData(0, 0, config.width, config.height),
    );

    this.#mousemoveHandler = this.#mousemove.bind(this);

    this.dom.addEventListener('mousedown', this.#mousedown.bind(this));
    this.dom.addEventListener('mouseup', this.#mouseup.bind(this));

    this.#subscribe();
  }

  #mousedown(e: MouseEvent) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.dom.addEventListener('mousemove', this.#mousemoveHandler);
    this.pushHistory();
  }

  #mousemove(e: MouseEvent) {
    this.stateManager.state.tool.func(e, this, (updateState: ClassState) => {
      this.startX = updateState.startX || this.startX;
      this.startY = updateState.startY || this.startY;
    });
  }

  #mouseup() {
    this.dom.removeEventListener('mousemove', this.#mousemoveHandler);
    this.history[this.history.length - 1] = this.context.getImageData(
      0,
      0,
      this.config.width,
      this.config.height,
    );
  }

  pushHistory() {
    this.history.push(
      this.context.getImageData(0, 0, this.config.width, this.config.height),
    );
  }

  popHistory() {
    const data = this.history.pop();
    if (data) {
      this.context.putImageData(data, 0, 0);
    }
  }

  #subscribe() {
    this.stateManager.subscribe('color', ({ color }) => {
      this.context.strokeStyle = color;
    });

    this.stateManager.subscribe('lineWidth', ({ lineWidth }) => {
      this.context.lineWidth = lineWidth;
    });

    eventEmitter.subscribe('pop_history', () => {
      this.popHistory();
    });
  }
}
