import type { Color, Control } from '~/types';
import { createElement } from '~/helpers/createElement';
import { StateManager } from '~/state';
import styles from './ColorSelect.module.scss'

export class ColorSelect implements Control {
  dom: HTMLLabelElement;
  input: HTMLInputElement;

  constructor(private stateManager: StateManager) {
    this.input = this.#createInput();

    this.dom = this.#createDom();

    this.#subscribe();
  }

  #createInput() {
    return createElement<HTMLInputElement>('input', {
      type: 'color',
      value: this.stateManager.state.color,
      onchange: this.changeHandler(),
      className: styles.input,
    });
  }

  changeHandler() {
    return (e: Event) => {
      const t = e.target as HTMLInputElement;
      this.stateManager.dispatch({
        type: 'SET_COLOR',
        payload: t.value as Color,
      });
    }
  }

  #createDom() {
    return createElement<HTMLLabelElement>(
      'label',
      {
        textContent: '🎨 Цвет:',
        className: styles.label,
      },
      this.input,
    );
  }

  #subscribe() {
    this.stateManager.subscribe('color', ({ color }) => {
      this.input.value = color;
    });
  }
}
