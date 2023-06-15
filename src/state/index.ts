import { State } from '../types';

type ActionType = 'SET_TOOL' | 'SET_COLOR' | 'SET_LINE_WIDTH';

type Action = {
  type: ActionType;
  payload: Partial<State>;
};

type Sub = (s: State) => void;

type Subs = Record<keyof State, Array<Sub>>;

export class StateManager {
  #state: State;
  #stateChangeSubs: Subs;

  constructor(state: State) {
    this.#state = { ...state };

    this.#stateChangeSubs = Object.keys(state).reduce(
      (acc, v) => ({ ...acc, [v]: [] }),
      {} as Subs,
    );
  }

  dispatch({ type, payload }: Action) {
    switch (type) {
      case 'SET_TOOL':
        this.#state = {
          ...this.#state,
          ...payload,
        };

        this.#runSubs(payload);

        break;
      case 'SET_COLOR':
        this.#state = {
          ...this.#state,
          ...payload,
        };

        this.#runSubs(payload);

        break;
      case 'SET_LINE_WIDTH':
        this.#state = {
          ...this.#state,
          ...payload,
        };

        this.#runSubs(payload);

        break;
      default:
        break;
    }
  }

  subscribe(key: keyof State, func: Sub) {
    this.#stateChangeSubs[key].push(func);
  }

  unsubscribe(key: keyof State, func: Sub) {
    this.#stateChangeSubs[key] = this.#stateChangeSubs[key].filter(
      (f) => f !== func,
    );
  }

  #runSubs(payload: Action['payload']) {
    const keys = Object.keys(payload);
    if (keys) {
      keys.forEach((key) =>
        this.#stateChangeSubs[key].forEach((fn) => fn(this.#state)),
      );
    }
  }

  get state() {
    return this.#state;
  }
}
