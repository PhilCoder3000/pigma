import type { State } from '../types';
import type { Action, SubFunc, Subs } from './types';

export class StateManager {
  #state: State;
  #stateChangeSubs: Subs;

  constructor(state: State) {
    this.#state = { ...state };

    this.#stateChangeSubs = {};
  }

  dispatch({ type, payload }: Action) {
    switch (type) {
      case 'SET_TOOL':
        this.#state.tool = payload;
        this.#runSubs('tool');

        break;

      case 'SET_COLOR':
        this.#state.color = payload;
        this.#runSubs('color');

        break;

      case 'SET_LINE_WIDTH':
        this.#state.lineWidth = payload;
        this.#runSubs('lineWidth');

        break;

      case 'SET_FIGURE_TYPE':
        this.#state.figureType = payload;
        this.#runSubs('figureType');

        break;

      default:
        break;
    }
  }

  subscribe(key: keyof State, func: SubFunc) {
    if (key in this.#stateChangeSubs) {
      this.#stateChangeSubs[key]!.push(func);
    } else {
      this.#stateChangeSubs[key] = [func];
    }
  }

  unsubscribe(key: keyof State, func: SubFunc) {
    if (key in this.#stateChangeSubs) {
      this.#stateChangeSubs[key] = this.#stateChangeSubs[key]!.filter(
        (f) => f !== func,
      );
    }
  }

  #runSubs(...keys: (keyof State)[]) {
    keys.forEach((key) => {
      if (key in this.#stateChangeSubs) {
        this.#stateChangeSubs[key]!.forEach((fn) => fn(this.state));
      }
    });
  }

  get state() {
    return this.#state;
  }
}
