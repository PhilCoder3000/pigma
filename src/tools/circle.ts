import { Tool } from '~/types';

let localImageData: ImageData | null = null;

export const circle: Tool = (
  { clientX, clientY },
  { startX, startY, context, history },
) => {
  localImageData = history[history.length - 1];
  if (history.length > 1) {
    context.putImageData(localImageData, 0, 0);
  }

  context.beginPath();
  context.arc(
    startX + Math.abs(clientX - startX) / 2,
    startY + Math.abs(clientY - startY) / 2,
    Math.abs((clientX - startX) + (clientY - startY)) / 4,
    0,
    2 * Math.PI,
  );
  context.stroke();
};
