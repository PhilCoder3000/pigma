import { createElement } from '../helpers/createElement';
import { pictureFromImage } from './pictureFromImage';
import { Dispatch } from '../types';

export function finishLoad(file: File | null, dispatch: Dispatch) {
  if (file === null) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    let image: HTMLImageElement = createElement<HTMLImageElement>('img', {
      onload: () => dispatch({ picture: pictureFromImage(image)}),
      src: reader.result?.toString(),
    })
  })
  reader.readAsDataURL(file)
}