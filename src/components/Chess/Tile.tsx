import styled from 'styled-components';
import { Chess, Square } from 'chess.js';
import Piece from './Piece';
import { TileColor, TileProps } from './ChessTypes';

function Tile({ column, row, piece }: TileProps) {
  const chess = new Chess();
  const color = chess.squareColor(`${column}${row}` as Square) as TileColor;

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const data = e.dataTransfer!.getData('text');
    const entries = data
      .split(',') // ["color: w", " piece: p", " column: c", " row: 2"]
      .map(item => item.trim()) // прибираємо пробіли з початку і кінця кожного елементу
      .map(item => item.split(':').map(part => part.trim())); // розбиваємо кожну пару по ":" і обрізаємо пробіли
    const result = Object.fromEntries(entries);
    console.log(result);
    const currentTile = {
      column: result.column,
      row: result.row,
      piece: { name: result.piece, color: result.color },
    };
    const attacedTile = {
      column,
      row,
      piece,
    };
    console.log(currentTile);
    console.log(attacedTile);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <Wrapper $light={color} onDrop={handleDrop} onDragOver={handleDragOver}>
      {piece?.name && (
        <Piece
          piece={piece.name}
          color={piece.color}
          column={column}
          row={row}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $light: TileColor }>`
  width: var(--tile-width);
  aspect-ratio: 1/1;
  background-color: ${props =>
    props.$light === 'light'
      ? 'var(--color-tile-light)'
      : 'var(--color-tile-dark)'};
`;

export default Tile;
