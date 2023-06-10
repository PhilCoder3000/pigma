import { ColorSelect } from './controls/ColorSelect';
import { LoadButton } from './controls/LoadButton';
import { Picture } from './Picture';
import { PixelEditor } from './PixelEditor';
import { SaveButton } from './controls/SaveButton';
import { ToolSelect } from './controls/ToolSelect';
import { UndoButton } from './controls/UndoButton';
import './app/styles/index.css';
import { draw } from './tools/draw';
import { fill } from './tools/fill';
import { historyUpdateState } from './historyUpdateState';
import { pick } from './tools/pick';
import { rectangle } from './tools/rectangle';
import { State } from './types';

const startState: State = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(50, 50, '#f0f0f0'),
  done: [],
  doneAt: 0,
};

const baseTools = {
  draw,
  fill,
  rectangle,
  pick,
};

const BaseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton]

function startPixelEditor({
  state = startState,
  tools = baseTools,
  controls = BaseControls
}) {
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state)
    }
  })

  return app.dom
}

function main() {
  const app = document.getElementById('app');
  if (app) {
    app.appendChild(startPixelEditor({}));
  }
}

main();