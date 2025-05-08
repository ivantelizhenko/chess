import { SideColor } from './StatusTypes';

export type StateType = {
  time: { white: number; black: number };
  turn: SideColor;
};
