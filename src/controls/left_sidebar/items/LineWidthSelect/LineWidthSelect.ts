import type { Control } from '../../../../types';
import { createElement } from '../../../../helpers/createElement';
import styles from './LineWidthSelect.module.scss';
import { StateManager } from '../../../../state';

export class LineWidthSelect implements Control {
  dom: HTMLElement;
  input: HTMLInputElement;

  constructor(private stateManager: StateManager) {
    this.input = this.#createInput();

    this.dom = this.#createDom();

    this.input.value = `${stateManager.state.lineWidth}`;
  }

  #createInput() {
    return createElement<HTMLInputElement>('input', {
      type: 'number',
      className: styles.input,
      onchange: this.#changeHandler(),
      value: `${this.stateManager.state.lineWidth}`,
      min: '1',
    });
  }

  #changeHandler() {
    return (e: Event) => {
      const t = e.target as HTMLInputElement;
      const lineWidth = Number(t.value);
      this.stateManager.dispatch({
        type: 'SET_LINE_WIDTH',
        payload: {
          lineWidth,
        },
      });
    };
  }

  #createDom() {
    return createElement(
      'label',
      {
        textContent: 'Толщина',
        className: styles.label,
      },
      this.input,
    );
  }
}
