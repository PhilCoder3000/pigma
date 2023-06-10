import { Picture } from './Picture';

export function drawPicture(
  picture: Picture,
  canvas: HTMLCanvasElement,
  scale: number,
) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let ctx = canvas.getContext('2d');

  if (ctx) {
    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        ctx.fillStyle = picture.getPixel(x, y);
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}
