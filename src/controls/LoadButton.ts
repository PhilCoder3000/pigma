import { createElement } from '../helpers/createElement';
import { startLoad } from '../loadImage/startLoad';
import type { Control, Dispatch, State } from '../types';

export class LoadButton implements Control {
  dom: HTMLButtonElement;
  constructor(_: State, { dispatch }: { dispatch: Dispatch }) {
    this.dom = createElement<HTMLButtonElement>(
      'button',
      {
        onclick: () => startLoad(dispatch),
      },
      'Загрузить',
    );
  }

  syncState() {}
}