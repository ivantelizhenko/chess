export type RowType = '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type ColumnType = 'h' | 'g' | 'f' | 'e' | 'd' | 'c' | 'b' | 'a';
export type SideColor = 'w' | 'b';
export type PieceFigures = 'p' | 'n' | 'r' | 'b' | 'q' | 'k';
export type TileColor = 'light' | 'dark';

export interface PieceType {
  name: PieceFigures;
  color: SideColor;
}

export type TileProps = {
  column: ColumnType;
  row: RowType;
  piece: PieceType | null;
};
export type TileType = {
  column: ColumnType;
  row: RowType;
  piece: PieceType;
};

export type TileWithoutPieceType = Omit<TileType, 'piece'>;

export interface PieceProps extends React.HTMLAttributes<HTMLDivElement> {
  color: SideColor;
  piece: PieceFigures;
}

export type StateType = {
  board: TileProps[];
  selectedTile: TileType | null;
  possibleMovesForPiece: PossibleMoveData[];
  prevTwoMoves: PrevMoveObject[];
  promotion: {
    isOpen: boolean;
    selectedPiece: Omit<PieceFigures, 'k' | 'p'> | null;
  };
  turn: SideColor;
  time: { white: number; black: number };
  isGameOver: { is: boolean; message: string };
  side: SideColor;
};

export type PrevMoveObject = { from: string; to: string; piece: PieceFigures };

export type PossibleMoveData = {
  from: string;
  to: string;
  name: string;
  attackedPiece: PieceFigures | null;
};
