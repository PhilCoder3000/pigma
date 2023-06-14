import type { Tool } from '../types';

let localImageData: ImageData | null = null;

export const rectangle: Tool = (
  { clientX, clientY },
  { startX, startY, context, history, stateManager },
) => {
  localImageData = history[history.length - 1];
  if (history.length > 1) {
    context.putImageData(localImageData, 0, 0);
  }
  context.strokeStyle = stateManager.state.color;
  context.lineWidth = 5;
  context.strokeRect(startX, startY, clientX - startX, clientY - startY);
};
