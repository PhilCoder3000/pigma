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

  if (stateManager.state.figureType === 'fill') {
    context.fillRect(startX, startY, clientX - startX, clientY - startY);
  } else {
    context.strokeRect(startX, startY, clientX - startX, clientY - startY);
  }
};
