import type { Button } from '~/types';
import { eventEmitter } from '~/EventEmitter';
import { createElement } from '~/helpers/createElement';
import styles from './UndoButton.module.scss'

export class UndoButton implements Button  {
  dom: HTMLButtonElement;

  constructor() {
    this.dom = this.#createDom()
  }

  #createDom(){
    return createElement<HTMLButtonElement>(
      'button',
      {
        onclick: () => eventEmitter.dispatch('pop_history'),
        className: styles.button,
      },
      'Отменить',
    );
  }
}
