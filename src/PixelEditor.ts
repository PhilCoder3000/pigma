import { PictureCanvas } from './PictureCanvas';
import { elt } from './elt';
import type { State, Control, Config, Position } from './types';

export class PixelEditor {
  state: State;
  canvas: PictureCanvas;
  controls: Control[];
  dom: HTMLDivElement;

  constructor(state: State, config: Config) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, (position: Position) => {
      let tool = tools[this.state.tool];
      let onMove = tool(position, this.state, dispatch);
      if (onMove) {
        return (pos: Position) => onMove(pos, this.state);
      }
    });

    this.controls = controls.map((Control: any) => new Control(state, config));
    this.dom = elt<HTMLDivElement>(
      'div',
      {},
      this.canvas.dom,
      elt<HTMLBRElement>('br'),
      ...this.controls.reduce(
        (acc: unknown[], cur) => acc.concat(' ', cur.dom),
        [],
      ),
      [],
    );
  }

  syncState(state: State) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (const control of this.controls) {
      control.syncState(state);
    }
  }
}
