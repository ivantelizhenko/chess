import {
  PieceFigures,
  TileType,
  TileWithPieceType,
} from '../chess/components/board/Tile/TileTypes';

export type StateType = {
  board: BoardType | null;
  selectedTile: TileWithPieceType | null;
  possibleMovesForPiece: PossibleMoveData[];
  prevTwoMoves: PrevMoveObject[];
  promotionPiece: Omit<PieceFigures, 'k' | 'p'> | null;
};

export type RowType = '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type ColumnType = 'h' | 'g' | 'f' | 'e' | 'd' | 'c' | 'b' | 'a';

export type PrevMoveObject = { from: string; to: string; piece: PieceFigures };

export type PossibleMoveData = {
  from: string;
  to: string;
  name: string;
  attackedPiece: PieceFigures | null;
};

export type BoardType = TileType[];
