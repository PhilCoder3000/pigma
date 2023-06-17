import type { Button, Config } from '~/types';
import { StateManager } from 'state'
import { createElement } from '~/helpers/createElement';
import styles from './RightSidebar.module.scss'
import { Canvas } from '~/canvas/Canvas';

export class RightSidebar {
  dom: HTMLDivElement
  buttons: Button[]

  constructor(_: StateManager, config: Config, canvas: Canvas) {
    this.buttons = config.buttons.map((Btn: any) => new Btn(canvas))
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