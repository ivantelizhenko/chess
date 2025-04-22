import { PieceProps } from './ChessTypes';
import { pieces } from './pieces';

function Piece({ color, piece }: PieceProps) {
  const Component = pieces[color][piece];

  return <Component />;
}

export default Piece;
