import { StateManager } from 'state'
import { createElement } from '~/helpers/createElement';
import styles from './RightSidebar.module.scss'
import { Button, Config } from '~/types';

export class RightSidebar {
  dom: HTMLDivElement
  buttons: Button[]

  constructor(stateManager: StateManager, config: Config) {
    this.buttons = config.buttons.map((Btn: any) => new Btn(stateManager))
    this.dom = this.#createDom()
  }

  #createDom() {
    return createElement<HTMLDivElement>(
      'div',
      {
        className: styles.container,
      },
      ...this.buttons.map(({ dom }) => dom)
    );
  }
}