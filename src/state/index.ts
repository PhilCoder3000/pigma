import { State } from '../types';

type ActionType = 'SET_TOOL' | 'SET_COLOR';

type Action = {
  type: ActionType;
  payload: Partial<State>;
};

type Sub = (s: State) => void;

type Subs = Record<keyof State, Array<Sub>>;

export class StateManager {
  #state: State;
  #subs: Subs;

  constructor(state: State) {
    this.#state = state;
    this.#subs = Object.keys(state).reduce(
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
      default:
        break;
    }
  }

  subscribe(key: keyof State, func: Sub) {
    this.#subs[key].push(func);
  }

  unsubscribe(key: keyof State, func: Sub) {
    this.#subs[key] = this.#subs[key].filter((f) => f !== func);
  }

  #runSubs(payload: Action['payload']) {
    Object.keys(payload).forEach((key) =>
      this.#subs[key].forEach((fn) => fn(this.#state)),
    );
  }

  get state(): State {
    return this.#state;
  }
}
