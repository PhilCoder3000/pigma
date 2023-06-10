import type { Dispatch, Pixel, Position, State } from '../types';

const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

export function fill({ x, y }: Position, state: State, dispatch: Dispatch) {
  let targetColor = state.picture.getPixel(x, y);
  let drawn: Pixel[] = [{ x, y, color: state.color }];

  for (let done = 0; done < drawn.length; done++) {
    for (const { dx, dy } of around) {
      let x = drawn[done].x + dx,
        y = drawn[done].y + dy;
      if (
        x >= 0 &&
        x < state.picture.width &&
        y >= 0 &&
        y < state.picture.height &&
        state.picture.getPixel(x, y) === targetColor &&
        !drawn.some((p) => p.x == x && p.y === y)
      ) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }

  dispatch({ picture: state.picture.draw(drawn) });
}
