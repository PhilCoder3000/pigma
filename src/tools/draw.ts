import type { Tool } from '../types';

export const draw: Tool = (
  { clientX, clientY },
  { startX, startY, context, stateManager },
  updateState,
) => {
  context.beginPath();
  context.strokeStyle = stateManager.state.color;
  context.moveTo(startX, startY);
  context.lineTo(clientX, clientY);
  context.stroke();

  updateState({
    startX: clientX,
    startY: clientY,
  });
};
