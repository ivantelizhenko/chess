import { BoardType } from './BoardTypes';
import { SideColor } from './StatusTypes';

export type NewGameType = {
  gameId: string;
  userId: string;
  side: SideColor;
  board: BoardType;
  time: number;
  extraSeconds: number;
};
