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
}

export type Config = {
  tools: ToolData[];
  controls: any;
  dispatch: Dispatch;
};

export type State = {
  picture: Picture;
  tool: ToolData;
  color: Color;
  done: Picture[];
  doneAt: number;
};

export interface Control {
  dom: HTMLElement;
  syncState(state: State): void;
}

type ToolPosition = {
  startX: number;
  startY: number;
  context: CanvasRenderingContext2D;
  history: ImageData[];
  pushHistory: () => void;
  popHistory: () => void;
};

type ToolCallback = (arg: Partial<ToolPosition>) => void;

export type Tool = (e: MouseEvent, position: ToolPosition, cb: ToolCallback) => void;
