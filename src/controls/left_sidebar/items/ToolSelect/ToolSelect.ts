import type { Config, Control, ToolData } from '../../../../types';
import { createElement } from '../../../../helpers/createElement';
import classes from './ToolSelect.module.scss';
import { StateManager } from '../../../../state';

export class ToolSelect implements Control {
  dom: HTMLElement;
  select: HTMLDivElement;
  label: HTMLParagraphElement;

  isSelectOpen: boolean = false;

  constructor(private stateManager: StateManager, { tools }: Config) {
    this.select = this.#createSelect(tools)

    this.label = this.#createLabel(stateManager.state.tool.label)

    this.dom = this.#createDom()

    this.#subscribe();
  }

  clickHandler(label: string, func: any) {
    return () => {
      this.stateManager.dispatch({
        type: 'SET_TOOL',
        payload: {
          tool: {
            label,
            func,
          },
        },
      });
      this.select.classList.remove(classes.open);
    };
  }

  #subscribe() {
    this.stateManager.subscribe('tool', ({ tool }) => {
      this.label.textContent = tool.label;
    });
  }

  #getToolsParagraph(tools: ToolData[]) {
    return tools.map(({ label, func }) =>
      createElement<HTMLParagraphElement>(
        'p',
        {
          onclick: this.clickHandler(label, func),
        },
        label,
      ),
    );
  }

  #createSelect(tools: ToolData[]) {
    return createElement<HTMLDivElement>(
      'div',
      {
        className: this.isSelectOpen
          ? `${classes.select}${classes.open}`
          : classes.select,
      },
      ...this.#getToolsParagraph(tools),
    );
  }

  #createLabel(label: string) {
    return createElement<HTMLParagraphElement>('p', {
      textContent: label,
      className: classes.tool,
      onclick: () => this.select.classList.toggle(classes.open),
    });
  }

  #createDom() {
    return createElement(
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
  }

  syncState() {}
}
