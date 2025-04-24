export type RowType = '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';
export type ColumnType = 'h' | 'g' | 'f' | 'e' | 'd' | 'c' | 'b' | 'a';
export type PieceColor = 'w' | 'b';
export type PieceFigures = 'p' | 'n' | 'r' | 'b' | 'q' | 'k';
export type TileColor = 'light' | 'dark';

export interface BoardType {
  row: RowType;
  column: ColumnType;
  piece: PieceType | null;
}

interface PieceType {
  name: PieceFigures;
  color: PieceColor;
}

export type TileProps = {
  column: ColumnType;
  row: RowType;
  piece: PieceType | null;
};

export interface PieceProps extends React.HTMLAttributes<HTMLDivElement> {
  color: PieceColor;
  piece: PieceFigures;
}

export type StateType = {
  board: BoardType[];
  selectedTile: { column: ColumnType; row: BoardType['row'] } | null;
  possibleMovesForPiece: string[];
  prevMoves: string[];
};
