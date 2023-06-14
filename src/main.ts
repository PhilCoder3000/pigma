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
import { State, Tool, ToolData } from './types';
import { StateManager } from './state';

const startState: State = {
  tool: {
    label: 'Draw',
    func: draw,
  },
  color: '#000000',
  picture: Picture.empty(300, 300, '#f0f0f0'),
  done: [],
  doneAt: 0,
};

const baseTools: ToolData[] = [
  {
    label: 'Draw',
    func: draw
  },
  {
    label: 'Rectangle',
    func: rectangle
  }
];

const BaseControls = [ToolSelect, ColorSelect]

function startPixelEditor({
  state = startState,
  tools = baseTools,
  controls = BaseControls
}) {
  const stateManager = new StateManager(state);
  
  let app = new PixelEditor(stateManager, state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state)
    },
    width: 500,
    height: 500,
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