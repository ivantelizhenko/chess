import styled, { css } from 'styled-components';
import { Chess, Square } from 'chess.js';
import Piece from './Piece';
import { TileColor, TileProps } from './types/ChessTypes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearSelectedTile,
  removePieceFromTile,
  selectTile,
  setPieceToTile,
} from './chessSlice';
import { fromStringToObject } from '../../utils/helpers';

function Tile({ column, row, piece }: TileProps) {
  const chess = new Chess();
  const dispatch = useAppDispatch();
  const tileColor = chess.squareColor(`${column}${row}` as Square) as TileColor;
  const selectedTile = useAppSelector(state => state.chess.selectedTile);
  const possibleMovesForPiece = useAppSelector(
    state => state.chess.possibleMovesForPiece
  );

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
    dispatch(clearSelectedTile());
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
    handleSelectTile();
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).style.display = 'block';
  }

  function handleSelectTile() {
    if (piece?.name && piece.color) {
      dispatch(selectTile({ column, row }));
    }
  }

  return (
    <Wrapper
      $light={tileColor}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleSelectTile}
      $isSelected={selectedTile?.column === column && selectedTile?.row === row}
      $possibleMove={possibleMovesForPiece
        .map(obj => obj.column + obj.row)
        .includes(column + row)}
    >
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

const Wrapper = styled.div<{
  $light: TileColor;
  $isSelected: boolean;
  $possibleMove: boolean;
}>`
  width: var(--tile-width);
  aspect-ratio: 1/1;
  position: relative;
  background-color: ${props =>
    props.$light === 'light'
      ? props.$isSelected
        ? 'var(--color-tile-light-selected)'
        : 'var(--color-tile-light)'
      : props.$isSelected
      ? 'var(--color-tile-dark-selected)'
      : 'var(--color-tile-dark)'};

  ${props =>
    props.$possibleMove &&
    css`
      &::after {
        content: '';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 32%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: ${props.$light === 'light'
          ? 'var(--color-gray-600)'
          : 'var(--color-gray-800)'};
        opacity: 20%;
      }
    `}
`;

export default Tile;
