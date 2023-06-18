import type { ToolData, Color, FigureType, State } from '~/types';

export type Action =
  | {
      type: 'SET_TOOL';
      payload: ToolData;
    }
  | {
      type: 'SET_COLOR';
      payload: Color;
    }
  | {
      type: 'SET_LINE_WIDTH';
      payload: number;
    }
  | {
      type: 'SET_FIGURE_TYPE';
      payload: FigureType;
    };

export type SubFunc = (s: State) => void;

export type Subs = Partial<Record<keyof State, Array<SubFunc>>>;