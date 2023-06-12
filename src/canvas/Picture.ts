import type { Color, Pixel } from '../types';

export class Picture {
  width: number;
  height: number;
  pixels: Color[];

  constructor(width: number, height: number, pixels: Color[]) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width: number, height: number, color: Color): Picture {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  getPixel(x: number, y: number): string {
    return this.pixels[x + y * this.width];
  }

  draw(pixels: Pixel[]) {
    let copy = this.pixels.slice();

    for (const {x, y, color} of pixels) {
      copy[x + y * this.width] = color;
    }
    
    return new Picture(this.width, this.height, copy);
  }
}
