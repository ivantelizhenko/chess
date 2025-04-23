import styled from 'styled-components';
import { Chess, Square } from 'chess.js';
import Piece from './Piece';
import { TileColor, TileProps } from './types/ChessTypes';
import { useAppDispatch } from '../../store';
import { removePieceFromTile, setPieceToTile } from './chessSlice';
import { fromStringToObject } from '../../utils/helpers';

function Tile({ column, row, piece }: TileProps) {
  const chess = new Chess();
  const dispatch = useAppDispatch();
  const tileColor = chess.squareColor(`${column}${row}` as Square) as TileColor;

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const data = e.dataTransfer!.getData('text');
    const result = fromStringToObject(data);

    const selectedTile = {
      column: result.column,
      row: result.row,
      piece: { name: result.name, color: result.color },
    };
    const attacedTile = {
      column,
      row,
      piece,
    };
    dispatch(
      removePieceFromTile({
        column: selectedTile.column,
        row: selectedTile.row,
      })
    );
    dispatch(
      setPieceToTile({
        column: attacedTile.column,
        row: attacedTile.row,
        name: selectedTile.piece.name,
        color: selectedTile.piece.color,
      })
    );
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'text/plain',
      `color: ${piece?.color}, name: ${piece?.name}, column: ${column}, row: ${row}`
    );

    setTimeout(() => {
      (e.target as HTMLDivElement).style.display = 'none';
    }, 0);
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).style.display = 'block';
  }

  return (
    <Wrapper $light={tileColor} onDrop={handleDrop} onDragOver={handleDragOver}>
      {piece?.name && (
        <Piece
          piece={piece.name}
          color={piece.color}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
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
