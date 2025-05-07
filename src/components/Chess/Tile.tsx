import styled, { css } from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { transformObjectToSAN } from '../../utils/helpers';
import { doMove, showPrevMove, showTileColor } from '../../service/chess';
import { PieceType, TileColor, TileProps } from '../../types/ChessTypes';

import {
  movePiece,
  setSelectedTile,
  setPrevTwoMoves,
  doCastling,
  openPromotionWindow,
} from '../../store/chessSlice';
import Piece from './Piece';

function Tile({ column, row, piece }: TileProps) {
  const dispatch = useAppDispatch();
  const tileColor = showTileColor(`${column}${row}`) as TileColor;
  const { selectedTile, possibleMovesForPiece, prevTwoMoves } = useAppSelector(
    state => state.chess
  );

  const attackedTile = { column, row };
  const attackedTileString = column + row;
  const isPossibleMove = possibleMovesForPiece
    .map(move => move.to)
    .includes(attackedTileString);

  function handleMove() {
    if (selectedTile && isPossibleMove) {
      // 1. Зробити крок в chess.js
      const moveType = doMove(
        transformObjectToSAN(selectedTile),
        attackedTileString
      );

      // 2. Отримати інформацію про цей крок з історії кроків з chess.js
      dispatch(setPrevTwoMoves(showPrevMove()));

      // 3. Зробити крок
      if (moveType === 'O-O' || moveType === 'O-O-O') {
        // 3.1 Якщо рокірування
        dispatch(
          doCastling({
            type: moveType,
            color: (selectedTile.piece as PieceType).color,
          })
        );
      }
      if (moveType === 'promotion') {
        // 3.2 Якщо перетворення пішака
        dispatch(openPromotionWindow());
      }
      if (moveType === 'normal') {
        // 3.3 Всі інші кроки
        dispatch(
          movePiece({
            selectedTile,
            attackedTile,
          })
        );
      }
    }
  }

  function handleSetSelectedTile() {
    if (piece?.name && piece.color) {
      dispatch(setSelectedTile({ column, row, piece }));
    }
  }

  function handleClick() {
    handleSetSelectedTile();
    handleMove();
  }

  function handleDragStart(e: React.DragEvent) {
    handleSetSelectedTile();
    const target = e.target as HTMLElement;
    setTimeout(() => {
      target.style.display = 'none';
    }, 0);

    const ghost = target.cloneNode(true) as HTMLElement;
    const rect = target.getBoundingClientRect();

    ghost.style.transform = 'scaleY(1)';
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;

    document.body.appendChild(ghost);

    // Центрування ghost на центр курсора
    e.dataTransfer.setDragImage(
      ghost,
      ghost.offsetWidth / 2 - 12,
      ghost.offsetHeight / 2 - 4
    );

    // Видаляємо його на наступному тіку
    requestAnimationFrame(() => {
      document.body.removeChild(ghost);
    });
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).style.display = 'block';
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <Wrapper
      onDrop={handleMove}
      onDragOver={handleDragOver}
      onClick={handleClick}
      $light={tileColor}
      $isSelected={selectedTile?.column === column && selectedTile?.row === row}
      $isPrevMove={
        prevTwoMoves.at(0)?.from === column + row ||
        prevTwoMoves.at(0)?.to === column + row
      }
      $possibleMove={isPossibleMove}
    >
      {piece?.name && (
        <Piece
          piece={piece.name}
          color={piece.color}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ transform: 'var(--sideTransform)' }}
        />
      )}
    </Wrapper>
  );
}

const tileColors = {
  light: {
    default: 'var(--color-tile-light)',
    selected: 'var(--color-tile-light-selected)',
    possibleMove: 'var(--color-gray-600)',
  },
  dark: {
    default: 'var(--color-tile-dark)',
    selected: 'var(--color-tile-dark-selected)',
    possibleMove: 'var(--color-gray-800)',
  },
};

const getBackgroundColor = ({
  $light,
  $isSelected,
  $isPrevMove,
}: {
  $light: TileColor;
  $isSelected: boolean;
  $isPrevMove: boolean;
}) => {
  const theme = tileColors[$light];
  return $isSelected || $isPrevMove ? theme.selected : theme.default;
};

const Wrapper = styled.div<{
  $light: TileColor;
  $isSelected: boolean;
  $possibleMove: boolean;
  $isPrevMove: boolean;
}>`
  width: 100%;
  height: 100%;

  position: relative;
  background-color: ${props => getBackgroundColor(props)};

  ${props =>
    props.$possibleMove &&
    css`
      --color: ${tileColors[props.$light].possibleMove};

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
