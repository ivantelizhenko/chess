import styled from 'styled-components';
import { Chess, Square } from 'chess.js';
import Piece from './Piece';
import { TileColor, TileProps } from './ChessTypes';

function Tile({ column, row, piece }: TileProps) {
  const chess = new Chess();
  const color = chess.squareColor(`${column}${row}` as Square) as TileColor;

  return (
    <Wrapper $light={color}>
      {piece?.name && <Piece piece={piece.name} color={piece.color} />}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $light: TileColor }>`
  width: 90px;

  background-color: green;
  aspect-ratio: 1/1;
  background-color: ${props =>
    props.$light === 'light'
      ? 'var(--color-tile-light)'
      : 'var(--color-tile-dark)'};
`;

export default Tile;
