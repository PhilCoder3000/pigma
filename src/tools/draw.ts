import type { Dispatch, Position, State } from '../types';

export function draw(position: Position, state: State, dispatch: Dispatch) {
  function drawPixel({ x, y }: Position, state: State) {
    dispatch({ picture: state.picture.draw([{ x, y, color: state.color }]) });
  }
  drawPixel(position, state)
  return drawPixel
}
