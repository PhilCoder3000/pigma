import type { Dispatch, Position, State } from '../types';

export function pick(pos: Position, state: State, dispatch: Dispatch) {
  dispatch({ color: state.picture.getPixel(pos.x, pos.y) });
}
