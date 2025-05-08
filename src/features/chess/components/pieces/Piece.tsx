import { SideColor } from '../../../types/StatusTypes';
import { PieceFigures } from '../board/Tile/TileTypes';

import { pieces } from './pieces';

export interface PieceProps extends React.HTMLAttributes<HTMLDivElement> {
  color: SideColor;
  piece: PieceFigures;
}

function Piece({ color, piece, ...delegated }: PieceProps) {
  const Component = pieces[color][piece];

  return (
    <div {...delegated}>
      <Component />
    </div>
  );
}

export default Piece;
