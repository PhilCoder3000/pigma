import type { Action, State } from './types';

export function historyUpdateState(state: State, action: Action): State {
  if (action.undo === true) {
    if (state.done.length === 0) return state;
    return {
      ...state,
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0,
    }
  } else if (action.picture && state.doneAt < Date.now() - 1000) {
    return {
      ...state,
      ...action,
      done: [state.picture, ...state.done],
      doneAt: Date.now()
    }
  } else {
    return {
      ...state,
      ...action,
    }
  }
}