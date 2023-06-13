import type { Position, Pixel, Tool } from '../types';

let history: ImageData[] = [];
let firstMove = true;
export const rectangle: Tool = (
  { clientX, clientY },
  { startX, startY, context, pushHistory, popHistory },
  updateState,
) => {
  if (!firstMove) {
    const oldData = history.pop()
    console.log('🚀 ~ file: rectangle.ts:23 ~ firstMove:', firstMove);
    if (oldData) {
      console.log('🚀 ~ file: rectangle.ts:13 ~ oldData:', oldData);
      context.putImageData(oldData, 0, 0)
    }
  }
  context.lineWidth = 10;
  context.strokeRect(startX, startY, clientX - startX, clientY - startY);
  
  history.push(context.getImageData(0, 0, 500, 500));

  firstMove = false;
  // console.log('🚀 ~ file: rectangle.ts:4 ~ history:', history);
};
