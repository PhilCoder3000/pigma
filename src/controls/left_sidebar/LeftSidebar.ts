import { createElement } from '../../helpers/createElement';
import { StateManager } from '../../state';
import { Config, Control, State } from '../../types';
import classes from './LeftSidebar.module.scss';

export class LeftSidebar {
  dom: HTMLDivElement;
  controls: Control[];


  constructor(stateManager: StateManager, config: Config) {
    this.controls = config.controls.map((Control: any) => new Control(stateManager, config));

    this.dom = createElement<HTMLDivElement>(
      'div',
      {
        className: classes.sidebar,
      },
      ...this.controls.map(({ dom }) => dom),
    );
  }

  syncState(state: State) {
    for (const control of this.controls) {
      control.syncState(state);
    }
  }
}
