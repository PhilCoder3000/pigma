import { elt } from '../elt';
import type { Control, Dispatch, State } from '../types';

export class ToolSelect implements Control {
  select: HTMLSelectElement;
  dom: HTMLElement;
  constructor(
    state: State,
    { tools, dispatch }: { tools: any; dispatch: Dispatch },
  ) {
    this.select = elt<HTMLSelectElement>(
      'select',
      {
        onchange: () => dispatch({ tool: this.select.value }),
      },
      ...Object.keys(tools).map((name) =>
        elt<HTMLOptionElement>(
          'option',
          {
            selected: name === state.tool,
          },
          name,
        ),
      ),
    );

    this.dom = elt<HTMLLabelElement>(
      'label',
      {},
      ' 🖌 Инструмент: ',
      this.select,
    );
  }

  syncState(state: State) {
    this.select.value = state.tool;
  }
}
