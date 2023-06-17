import type { State, Config } from '../types';
import { Canvas } from '../canvas/Canvas';
import { LeftSidebar } from '../controls/left_sidebar/LeftSidebar';
import { createElement } from '../helpers/createElement';
import { StateManager } from '../state';
import { RightSidebar } from '~/controls/right_sidebar/RightSidebar';

export class PixelEditor {
  #state: State;
  canvas: Canvas;
  dom: HTMLDivElement;
  leftSidebar: LeftSidebar;
  rightSidebar: RightSidebar

  constructor(stateManager: StateManager, state: State, config: Config) {
    this.#state = state;

    this.canvas = new Canvas(stateManager, config);

    this.leftSidebar = new LeftSidebar(stateManager, config);
    this.rightSidebar = new RightSidebar(stateManager, config, this.canvas)

    this.dom = createElement<HTMLDivElement>(
      'div',
      {},
      this.canvas.dom,
      this.leftSidebar.dom,
      this.rightSidebar.dom,
    );
  }

  syncState(state: State) {
    this.#state = state;
  }

  
  get state() : State {
    return this.#state
  }
  
}
