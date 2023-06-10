import { elt } from '../elt';
import { startLoad } from '../startLoad';
import type { Control, Dispatch, State } from '../types';

export class LoadButton implements Control {
  dom: HTMLButtonElement;
  constructor(_: State, { dispatch }: { dispatch: Dispatch }) {
    this.dom = elt<HTMLButtonElement>(
      'button',
      {
        onclick: () => startLoad(dispatch),
      },
      'Загрузить',
    );
  }

  syncState() {}
}