import type { Color, Config, Control, State } from '../../../../types';
import { createElement } from '../../../../helpers/createElement';

export class ColorSelect implements Control {
  dom: HTMLLabelElement;
  input: HTMLInputElement;
  constructor(state: State, { stateManager }: Config) {
    this.input = createElement<HTMLInputElement>('input', {
      type: 'color',
      value: stateManager.state.color,
      onchange: (e) => {
        const t = e.target as HTMLInputElement;
        stateManager.dispatch({
          type: 'SET_COLOR',
          payload: { color: t.value as Color },
        });
      },
    });

    this.dom = createElement<HTMLLabelElement>(
      'label',
      {},
      ' 🎨 Цвет: ',
      this.input,
    );

    stateManager.subscribe('color', ({ color }) => {
      this.input.value = color;
    });
  }

  syncState() {}
}
