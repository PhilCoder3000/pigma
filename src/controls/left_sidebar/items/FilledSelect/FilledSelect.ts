import { createElement } from '~/helpers/createElement';
import { Control } from '~/types';
import styles from './FilledSelect.module.scss';
import { StateManager } from '~/state';

export class FilledSelect implements Control {
  dom: HTMLDivElement;
  input: HTMLInputElement;
  label: HTMLParagraphElement;

  constructor(private stateManager: StateManager) {
    this.input = this.#createInput();

    this.label = this.#createLabel();

    this.dom = this.#createDom();
  }

  #changeHandler() {
    return (e: Event) => {
      const t = e.target as HTMLInputElement;
      this.stateManager.dispatch({
        type: 'SET_FIGURE_TYPE',
        payload: {
          figureType: t.checked ? 'fill' : 'stroke',
        },
      });
    };
  }

  #createInput() {
    return createElement<HTMLInputElement>('input', {
      type: 'checkbox',
      onchange: this.#changeHandler(),
    });
  }

  #createLabel() {
    return createElement<HTMLParagraphElement>('p', {
      textContent: 'Filled',
      className: styles.label,
    });
  }

  #createDom() {
    return createElement<HTMLDivElement>(
      'div',
      {
        className: styles.container,
      },
      this.label,
      this.input,
    );
  }
}
