import { Tool } from '~/types';

export const ellipse: Tool = (
  { clientX, clientY },
  { context, startX, startY, history, stateManager },
) => {
  context.putImageData(history[history.length - 1], 0, 0);

  context.beginPath();
  context.ellipse(
    startX + Math.abs(clientX - startX) / 2,
    startY + Math.abs(clientY - startY) / 2,
    Math.abs(clientY - startY) / 2,
    Math.abs(clientX - startX) / 2,
    Math.PI / 2,
    0,
    2 * Math.PI,
  );
  if (stateManager.state.figureType === 'fill') {
    context.fill()
  } else {
    context.stroke();
  }
};
