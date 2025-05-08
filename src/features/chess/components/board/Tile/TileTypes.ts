import { ColumnType, RowType } from '../../../../types/BoardTypes';
import { SideColor } from '../../../../types/StatusTypes';

type Tile<P extends PieceType | null> = {
  column: ColumnType;
  row: RowType;
  piece: P;
};

export type TileType = Tile<PieceType | null>;
export type TileWithPieceType = Tile<PieceType>;
export type TileWithoutPieceType = Omit<TileWithPieceType, 'piece'>;

export interface PieceType {
  name: PieceFigures;
  color: SideColor;
}

export type PieceFigures = 'p' | 'n' | 'r' | 'b' | 'q' | 'k';
