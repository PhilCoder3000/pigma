import type { Control, Dispatch, State } from '../types';
import { createElement } from '../helpers/createElement';

export class ColorSelect implements Control {
  dom: HTMLLabelElement;
  input: HTMLInputElement;
  constructor(state: State, { dispatch }: { dispatch: Dispatch }) {
    this.input = createElement<HTMLInputElement>('input', {
      type: 'color',
      value: state.color,
      onchange: () => dispatch({ color: this.input.value }),
    });

    this.dom = createElement<HTMLLabelElement>('label', {}, ' 🎨 Цвет: ', this.input);
  }

  syncState(state: State) {
    this.input.value = state.color;
  }
}
