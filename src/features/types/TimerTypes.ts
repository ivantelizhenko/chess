import { SideColor } from './StatusTypes';

export type StateType = {
  time: { white: number; black: number };
  extraSeconds: number;
  turn: SideColor;
  isStartTimer: boolean;
};
