import { createElement } from '../helpers/createElement';
import { finishLoad } from './finishLoad';
import { Dispatch } from '../types';

export function startLoad(dispatch: Dispatch) {
  let input = createElement<HTMLInputElement>('input', {
    type: 'file',
    onchange: (e) => {
      const t = e.target as HTMLInputElement;
      if (t && t.files) {
        finishLoad(t.files[0], dispatch);
      }
    },
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}