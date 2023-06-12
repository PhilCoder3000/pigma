import type { Config, Control, State } from '../../../../types';
import { createElement } from '../../../../helpers/createElement';
import classes from './ToolSelect.module.scss';

export class ToolSelect implements Control {
  dom: HTMLElement;
  select: HTMLDivElement;
  value: string;
  label: HTMLParagraphElement;
  isSelectOpen: boolean = false;

  constructor(state: State, { tools, stateManager }: Config) {
    this.value = state.tool;
    this.select = createElement<HTMLDivElement>(
      'div',
      {
        className: this.isSelectOpen
          ? `${classes.select}${classes.open}`
          : classes.select,
      },
      ...Object.keys(tools).map((name) =>
        createElement<HTMLParagraphElement>(
          'p',
          {
            onclick: () => {
              stateManager.dispatch({
                type: 'SET_TOOL',
                payload: { tool: name as string },
              });
              this.select.classList.remove(classes.open);
            },
          },
          name,
        ),
      ),
    );

    this.label = createElement<HTMLParagraphElement>('p', {
      textContent: this.value,
      className: classes.tool,
      onclick: () => this.select.classList.toggle(classes.open),
    });

    this.dom = createElement(
      'div',
      {
        className: classes.container,
      },
      createElement<HTMLHeadElement>('h5', {
        textContent: 'Инструмент',
        className: classes.label,
      }),
      this.label,
      this.select,
    );

    stateManager.subscribe('tool', ({ tool }) => {
      this.value = tool;
      this.label.textContent = tool;
    });
  }

  syncState() {}
}
