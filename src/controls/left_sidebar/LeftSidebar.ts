import { createElement } from '~/helpers/createElement';
import { StateManager } from '~/state';
import { Config, Control } from '~/types';
import classes from './LeftSidebar.module.scss';

export class LeftSidebar {
  dom: HTMLDivElement;
  controls: Control[];

  constructor(stateManager: StateManager, config: Config) {
    this.controls = config.controls.map(
      (Control: any) => new Control(stateManager, config),
    );

    this.dom = this.#createDom();
  }

  #createDom() {
    return createElement<HTMLDivElement>(
      'div',
      {
        className: classes.sidebar,
      },
      ...this.controls.map(({ dom }) => dom),
    );
  }
}
