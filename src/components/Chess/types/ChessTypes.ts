export type RowType = '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type ColumnType = 'h' | 'g' | 'f' | 'e' | 'd' | 'c' | 'b' | 'a';
export type PieceColor = 'w' | 'b';
export type PieceFigures = 'p' | 'n' | 'r' | 'b' | 'q' | 'k';
export type TileColor = 'light' | 'dark';

interface PieceType {
  name: PieceFigures;
  color: PieceColor;
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
  color: PieceColor;
  piece: PieceFigures;
}

export type StateType = {
  board: TileProps[];
  selectedTile: TileType | null;
  attackedTile: TileWithoutPieceType | null;
  possibleMovesForPiece: string[];
  prevMoves: string[];
};
