import type { Control, Dispatch, State } from '../types';
import { elt } from '../elt';

export class ColorSelect implements Control {
  dom: HTMLLabelElement;
  input: HTMLInputElement;
  constructor(state: State, { dispatch }: { dispatch: Dispatch }) {
    this.input = elt<HTMLInputElement>('input', {
      type: 'color',
      value: state.color,
      onchange: () => dispatch({ color: this.input.value }),
    });

    this.dom = elt<HTMLLabelElement>('label', {}, ' 🎨 Цвет: ', this.input);
  }

  syncState(state: State) {
    this.input.value = state.color;
  }
}
