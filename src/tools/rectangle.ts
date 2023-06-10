import type { Position, State, Pixel, Dispatch } from '../types';

export function rectangle(start: Position, state: State, dispatch: Dispatch) {
  function drawRectangle(pos: Position) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y)

    let draw: Pixel[] = []
    for (let y = yStart; y <= yEnd; y++) {
      for(let x = xStart; x <= xEnd; x++) {
        draw.push({ x, y, color: state.color})
      }
      
    }
    dispatch({ picture: state.picture.draw(draw)})
  }
  drawRectangle(start)
  return drawRectangle
}