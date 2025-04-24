import styled, { css } from 'styled-components';
import Piece from './Piece';
import { TileColor, TileProps, TileWithoutPieceType } from './types/ChessTypes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearPossibleMoves,
  clearSelectedTile,
  movePiece,
  setSelectedTile,
  setPrevMoves,
  setAttackedTile,
  clearAttackedTile,
} from './chessSlice';
import { transformObjectToSAN } from '../../utils/helpers';
import { doMove, showPrevMove, showTileColor } from './service/chess';

function Tile({ column, row, piece }: TileProps) {
  const dispatch = useAppDispatch();
  const tileColor = showTileColor(`${column}${row}`) as TileColor;
  const { selectedTile, possibleMovesForPiece, prevMoves } = useAppSelector(
    state => state.chess
  );
  const isPossibleMove = possibleMovesForPiece.includes(column + row);
  const isSelected =
    selectedTile?.column === column && selectedTile?.row === row;

  function handleMove(
    attackedTileObject: TileWithoutPieceType,
    attackedTileString: string
  ) {
    if (selectedTile) {
      dispatch(
        movePiece({
          selectedTile,
          attackedTile: attackedTileObject,
        })
      );
      dispatch(clearSelectedTile());
      dispatch(clearPossibleMoves());

      // 1. Зробити крок в chess.js
      doMove(transformObjectToSAN(selectedTile), attackedTileString);
      // 2. Отримати інформацію про цей крок з історії кроків з chess.js
      dispatch(setPrevMoves(showPrevMove()));
    }
  }

  function handleDrop() {
    const attackedTileString = column + row;
    const attackedTileObject = { column, row };

    if (possibleMovesForPiece.includes(attackedTileString)) {
      handleMove(attackedTileObject, attackedTileString);
    }
  }

  function handleSetSelectedTile() {
    if (piece?.name && piece.color) {
      dispatch(setSelectedTile({ column, row, piece }));
    }
  }

  function handleSetAttackedTile() {
    if (isPossibleMove) {
      dispatch(setAttackedTile({ column, row }));
    } else dispatch(clearAttackedTile());
  }

  function handleClick() {
    handleSetAttackedTile();
    handleSetSelectedTile();
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ color: piece?.color, name: piece?.name, column, row })
    );

    setTimeout(() => {
      (e.target as HTMLDivElement).style.display = 'none';
    }, 0);
    handleSetSelectedTile();
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).style.display = 'block';
  }

  return (
    <Wrapper
      onDrop={handleDrop}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      onClick={handleClick}
      $light={tileColor}
      $isSelected={isSelected}
      $isPrevMove={prevMoves.includes(column + row)}
      $possibleMove={isPossibleMove}
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
  $isPrevMove: boolean;
}>`
  width: var(--tile-width);
  aspect-ratio: 1/1;
  position: relative;
  background-color: ${props =>
    props.$light === 'light'
      ? props.$isSelected || props.$isPrevMove
        ? 'var(--color-tile-light-selected)'
        : 'var(--color-tile-light)'
      : props.$isSelected || props.$isPrevMove
      ? 'var(--color-tile-dark-selected)'
      : 'var(--color-tile-dark)'};

  ${props =>
    props.$possibleMove &&
    css`
      --color: ${props.$light === 'light'
        ? 'var(--color-gray-600)'
        : 'var(--color-gray-800)'};
      &::after {
        content: '';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        aspect-ratio: 1/1;
        border-radius: 50%;
        opacity: 20%;
        width: 32%;
        background-color: var(--color);
      }
      &:has([draggable='true']) {
        &::after {
          width: 100%;
          background-color: transparent;
          border: 10px solid var(--color);
        }
      }
    `}
`;

export default Tile;
