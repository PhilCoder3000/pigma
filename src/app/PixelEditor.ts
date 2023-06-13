import type { State, Config } from '../types';
import { Canvas } from '../canvas/Canvas';
import { LeftSidebar } from '../controls/left_sidebar/LeftSidebar';
import { createElement } from '../helpers/createElement';
import { StateManager } from '../state';

export class PixelEditor {
  #state: State;
  canvas: Canvas;
  dom: HTMLDivElement;
  leftSidebar: LeftSidebar;

  constructor(stateManager: StateManager, state: State, config: Config) {
    this.#state = state;

    this.canvas = new Canvas(stateManager);

    this.leftSidebar = new LeftSidebar(stateManager, config);

    const button = createElement('button', {
      textContent: 'undo',
    })
    button.addEventListener('click', this.canvas.undo.bind(this.canvas))
    
    this.dom = createElement<HTMLDivElement>(
      'div',
      {},
      this.canvas.dom,
      this.leftSidebar.dom,
      button
    );
  }

  syncState(state: State) {
    this.#state = state;
    // this.canvas.syncState(state.picture);
    this.leftSidebar.syncState(state)
  }

  
  get state() : State {
    return this.#state
  }
  
}
