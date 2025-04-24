import styled, { css } from 'styled-components';
import Piece from './Piece';
import {
  TileColor,
  TileType,
  TileProps,
  TileWithoutPieceType,
} from './types/ChessTypes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearPossibleMoves,
  clearSelectedTile,
  movePiece,
  selectTile,
  setPrevMoves,
} from './chessSlice';
import { transformObjectToSAN } from '../../utils/helpers';
import { doMove, showPrevMove, showTileColor } from './service/chess';

function Tile({ column, row, piece }: TileProps) {
  const dispatch = useAppDispatch();
  const tileColor = showTileColor(`${column}${row}`) as TileColor;
  const { selectedTile, possibleMovesForPiece, prevMoves } = useAppSelector(
    state => state.chess
  );

  function triggerhandleMove(
    selectedTile: TileType,
    attackedTileObject: TileWithoutPieceType,
    attackedTileString: string
  ) {
    dispatch(movePiece({ selectedTile, attackedTile: attackedTileObject }));
    dispatch(clearSelectedTile());
    dispatch(clearPossibleMoves());

    // 1. Зробити крок в chess.js
    doMove(transformObjectToSAN(selectedTile), attackedTileString);
    // 2. Отримати інформацію про цей крок з історії кроків з chess.js
    dispatch(setPrevMoves(showPrevMove()));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const data = e.dataTransfer!.getData('text');
    const result = JSON.parse(data);
    const selectedTile = {
      column: result.column,
      row: result.row,
      piece: { name: result.name, color: result.color },
    };
    const attackedTileString = column + row;
    const attackedTileObject = { column, row };

    if (possibleMovesForPiece.includes(attackedTileString)) {
      triggerhandleMove(selectedTile, attackedTileObject, attackedTileString);
    }
  }

  function handleSelectTile() {
    if (piece?.name && piece.color) {
      dispatch(selectTile({ column, row }));
    }
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
    handleSelectTile();
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLDivElement).style.display = 'block';
  }

  return (
    <Wrapper
      onDrop={handleDrop}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      onClick={handleSelectTile}
      $light={tileColor}
      $isSelected={selectedTile?.column === column && selectedTile?.row === row}
      $isPrevMove={prevMoves.includes(column + row)}
      $possibleMove={possibleMovesForPiece.includes(column + row)}
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
