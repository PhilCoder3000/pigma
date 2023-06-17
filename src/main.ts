import { ColorSelect } from './controls/left_sidebar/items/ColorSelect';
import { LoadButton } from './controls/right_sidebar/items/LoadButton';
import { Picture } from './canvas/Picture';
import { PixelEditor } from './app/PixelEditor';
import { SaveButton } from './controls/SaveButton';
import { ToolSelect } from './controls/left_sidebar/items/ToolSelect';
import { UndoButton } from './controls/right_sidebar/items/UndoButton';
import { FilledSelect } from './controls/left_sidebar/items/FilledSelect';
import './app/styles/index.css';
import { pen } from './tools/pen';
import { fill } from './tools/fill';
import { historyUpdateState } from './history/historyUpdateState';
import { pick } from './tools/pick';
import { rectangle } from './tools/rectangle';
import { State, ToolData } from './types';
import { StateManager } from './state';
import { LineWidthSelect } from './controls/left_sidebar/items/LineWidthSelect';
import { circle } from './tools/circle';
import { ellipse } from './tools/ellipse';
import { triangle } from './tools/triangle';

const startState: State = {
  tool: {
    label: 'Triangle',
    func: triangle,
  },
  color: '#000000',
  picture: Picture.empty(300, 300, '#f0f0f0'),
  done: [],
  doneAt: 0,
  lineWidth: 3,
  figureType: 'stroke',
};

const baseTools: ToolData[] = [
  {
    label: 'Pen',
    func: pen,
  },
  {
    label: 'Rectangle',
    func: rectangle,
  },
  {
    label: 'Circle',
    func: circle,
  },
  {
    label: 'Ellipse',
    func: ellipse,
  },
  {
    label: 'Triangle',
    func: triangle,
  },
];

const BaseControls = [ToolSelect, FilledSelect, ColorSelect, LineWidthSelect];
const buttons = [UndoButton, LoadButton];

function startPixelEditor({
  state = startState,
  tools = baseTools,
  controls = BaseControls,
}) {
  const stateManager = new StateManager(state);

  let app = new PixelEditor(stateManager, state, {
    tools,
    controls,
    buttons,
    width: 1000,
    height: 1000,
  });

  return app.dom;
}

function main() {
  const app = document.getElementById('app');
  if (app) {
    app.appendChild(startPixelEditor({}));
  }
}

main();
