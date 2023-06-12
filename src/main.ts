import { ColorSelect } from './controls/left_sidebar/items/ColorSelect';
import { LoadButton } from './controls/LoadButton';
import { Picture } from './canvas/Picture';
import { PixelEditor } from './app/PixelEditor';
import { SaveButton } from './controls/SaveButton';
import { ToolSelect } from './controls/left_sidebar/items/ToolSelect';
import { UndoButton } from './controls/UndoButton';
import './app/styles/index.css';
import { draw } from './tools/draw';
import { fill } from './tools/fill';
import { historyUpdateState } from './history/historyUpdateState';
import { pick } from './tools/pick';
import { rectangle } from './tools/rectangle';
import { State } from './types';
import { StateManager } from './state';

const startState: State = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(300, 300, '#f0f0f0'),
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
  const stateManager = new StateManager(state)
  
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state)
    },
    stateManager,
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