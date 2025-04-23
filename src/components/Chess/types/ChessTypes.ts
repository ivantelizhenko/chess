export interface BoardType {
  row: '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';
  column: 'h' | 'g' | 'f' | 'e' | 'd' | 'c' | 'b' | 'a';
  piece: PieceType | null;
}

interface PieceType {
  name: PieceFigures;
  color: PieceColor;
}

export type PieceColor = 'w' | 'b';
export type PieceFigures = 'p' | 'n' | 'r' | 'b' | 'q' | 'k';
export type TileColor = 'light' | 'dark';

export type TileProps = {
  column: BoardType['column'];
  row: BoardType['row'];
  piece: PieceType | null;
};

export interface PieceProps extends React.HTMLAttributes<HTMLDivElement> {
  color: PieceColor;
  piece: PieceFigures;
}
