import { Tool } from '~/types';

export const triangle: Tool = (
  { clientX, clientY },
  { startX, startY, context, history, stateManager },
) => {
  context.putImageData(history[history.length - 1], 0, 0);

  let xb = clientX + (startY - clientY) * Math.sqrt(2),
    yb = clientY + (clientX - startX) * Math.sqrt(2),
    xc = clientX - (startY - clientY) * Math.sqrt(2),
    yc = clientY - (clientX - startX) * Math.sqrt(2);

  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(xb, yb);
  context.lineTo(xc, yc);
  context.closePath();
  if (stateManager.state.figureType === 'fill') {
    context.fill();
  } else {
    context.stroke();
  }
};
