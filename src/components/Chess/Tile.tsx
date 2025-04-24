import styled, { css } from 'styled-components';
import { Chess, Square } from 'chess.js';
import Piece from './Piece';
import { TileColor, TileProps } from './types/ChessTypes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearPossibleMoves,
  clearSelectedTile,
  removePieceFromTile,
  selectTile,
  setPieceToTile,
  setPrevMoves,
} from './chessSlice';
import {
  fromStringToObject,
  transformFromMyAppToChessLibraryRules,
} from '../../utils/helpers';
import { doMove, showPrevMove } from './service/chess';

function Tile({ column, row, piece }: TileProps) {
  const chess = new Chess();
  const dispatch = useAppDispatch();
  const tileColor = chess.squareColor(`${column}${row}` as Square) as TileColor;
  const { selectedTile, possibleMovesForPiece, prevMoves } = useAppSelector(
    state => state.chess
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

    const currentMove = transformFromMyAppToChessLibraryRules(column, row);

    if (possibleMovesForPiece.includes(currentMove)) {
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
      dispatch(clearPossibleMoves());

      doMove(
        transformFromMyAppToChessLibraryRules(
          selectedTile.column,
          selectedTile.row,
          selectedTile.piece.name,
          selectedTile.piece.color
        ),
        transformFromMyAppToChessLibraryRules(
          attacedTile.column,
          attacedTile.row
        )
      );
      dispatch(setPrevMoves(showPrevMove()));
    }
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
      onDrop={handleDrop}
      onDragOver={handleDragOver}
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
