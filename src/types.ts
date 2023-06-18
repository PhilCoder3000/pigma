import { Canvas } from './canvas/Canvas';
import type { Picture } from './canvas/Picture';

export type Pixel = {
  x: number;
  y: number;
  color: Color;
};

export type Color = `#${string}`;

export type Action = {
  undo?: true;
  picture?: Picture;
  color?: any;
  tool?: string;
};
export type Dispatch = (act: Action) => void;

export type Position = {
  x: number;
  y: number;
};

export type OnDown = (p: Position) => Function | undefined;

export type ToolData = {
  label: string;
  func: Tool;
};

export type Config = {
  tools: ToolData[];
  controls: any[];
  buttons: any[];
  width: number;
  height: number;
};

export type FigureType = 'stroke' | 'fill';

export type State = {
  picture: Picture;
  tool: ToolData;
  done: Picture[];
  doneAt: number;

  color: Color;
  lineWidth: number;
  figureType: FigureType;
};

export interface Control {
  dom: HTMLElement;
}

type ToolPosition = {
  startX: number;
  startY: number;
  context: CanvasRenderingContext2D;
  history: ImageData[];
};

type ToolCallback = (arg: Partial<ToolPosition>) => void;

export type Tool = (e: MouseEvent, position: Canvas, cb: ToolCallback) => void;

export type Button = {
  dom: HTMLElement;
};
