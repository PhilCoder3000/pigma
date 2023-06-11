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

export type Config = {
  tools: {[key: string]: Function};
  controls: any;
  dispatch: Dispatch;
};

export type State = {
  picture: Picture;
  tool: string;
  color: Color;
  done: Picture[];
  doneAt: number;
};

export interface Control {
  dom: HTMLElement;
  syncState(state: State): void;
}
