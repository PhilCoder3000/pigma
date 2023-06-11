import { createElement } from '../../helpers/createElement';
import { Config, Control, State } from '../../types';
import classes from './LeftSidebar.module.scss';

export class LeftSidebar {
  dom: HTMLDivElement;
  controls: Control[];


  constructor(state: State, config: Config) {
    this.controls = config.controls.map((Control: any) => new Control(state, config));

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
