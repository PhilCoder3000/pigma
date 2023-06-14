import type { Position, Pixel, Tool } from '../types';

let localHistory: ImageData[] = [];

export const rectangle: Tool = (
  { clientX, clientY },
  { startX, startY, context, history },
  updateState,
) => {
  if (history.length === 0) {
    localHistory = [history[history.length - 1]];
  }
  if (history.length > 1) {
    context.putImageData(history[0], 0, 0)
  }
  context.lineWidth = 5;
  context.strokeRect(startX, startY, clientX - startX, clientY - startY);
  history.push(context.getImageData(0, 0, 500, 500));
};
