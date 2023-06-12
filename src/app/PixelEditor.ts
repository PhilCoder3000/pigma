import { PictureCanvas } from '../canvas/PictureCanvas';
import { LeftSidebar } from '../controls/left_sidebar/LeftSidebar';
import { createElement } from '../helpers/createElement';
import type { State, Config, Position } from '../types';

export class PixelEditor {
  #state: State;
  canvas: PictureCanvas;
  dom: HTMLDivElement;
  leftSidebar: LeftSidebar;

  constructor(state: State, config: Config) {
    const { tools, dispatch } = config;
    this.#state = state;

    this.canvas = new PictureCanvas(state.picture, (position: Position) => {
      let tool = tools[this.#state.tool];
      let onMove = tool(position, this.#state, dispatch);
      if (onMove) {
        return (pos: Position) => onMove(pos, this.#state);
      }
    });

    this.leftSidebar = new LeftSidebar(state, config);
    
    this.dom = createElement<HTMLDivElement>(
      'div',
      {},
      this.canvas.dom,
      this.leftSidebar.dom,
    );
  }

  syncState(state: State) {
    this.#state = state;
    this.canvas.syncState(state.picture);
    this.leftSidebar.syncState(state)
  }

  
  get state() : State {
    return this.#state
  }
  
}
