import { Picture } from './Picture';
import { elt } from './elt';
import { Color } from './types';

export function pictureFromImage(image: HTMLImageElement) {
  const width = Math.min(100, image.width);
  const height = Math.min(100, image.height);
  const canvas = elt<HTMLCanvasElement>('canvas', { width, height });
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0);
    let pixels: Color[] = [];
    let { data } = ctx.getImageData(0, 0, width, height);

    for (let i = 0; i < data.length; i += 4) {
      let [r,g,b] = data.slice(i, i + 3)
      pixels.push(`#${hex(r)}${hex(g)}${hex(b)}`)
    }
    return new Picture(width, height, pixels)
  }
}

function hex(n: number) {
  return n.toString(16).padStart(2, '0')
}