import styled, { css } from 'styled-components';
import Piece from './Piece';
import { PieceType, TileColor, TileProps } from './types/ChessTypes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearPossibleMoves,
  clearSelectedTile,
  movePiece,
  setSelectedTile,
  setPrevTwoMoves,
  doCastling,
} from './chessSlice';
import { transformObjectToSAN } from '../../utils/helpers';
import { doMove, showPrevMove, showTileColor } from './service/chess';

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
      doMove(transformObjectToSAN(selectedTile), attackedTileString);

      // 2. Отримати інформацію про цей крок з історії кроків з chess.js
      dispatch(setPrevTwoMoves(showPrevMove()));

      // 2.1 Ідентифікація назви кроку
      const currentMove = possibleMovesForPiece.find(
        move => move.to === attackedTileString
      )?.name;

      // 3. Зробити крок
      if (currentMove === 'O-O' || currentMove === 'O-O-O') {
        // 3.1 Якщо рокірування
        console.log('castling');
        dispatch(
          doCastling({
            type: currentMove,
            color: (selectedTile.piece as PieceType).color,
          })
        );
      } else {
        // 3.2 Якщо не рокірування
        dispatch(
          movePiece({
            selectedTile,
            attackedTile,
          })
        );
      }

      // 4. Прибрати виділену фігуру та клітинки, на які моде позодити та ж виділена фігура
      dispatch(clearSelectedTile());
      dispatch(clearPossibleMoves());
    }
  }

  function handleDrop() {
    handleMove();
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

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
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
        />
      )}
      {column === 'a' && <CordNumber>{row}</CordNumber>}
      {row === '1' && <CordLetter>{column}</CordLetter>}
    </Wrapper>
  );
}

const tileColors = {
  light: {
    default: 'var(--color-tile-light)',
    selected: 'var(--color-tile-light-selected)',
    possibleMove: 'var(--color-gray-600)',
    text: 'var(--color-tile-dark)',
  },
  dark: {
    default: 'var(--color-tile-dark)',
    selected: 'var(--color-tile-dark-selected)',
    possibleMove: 'var(--color-gray-800)',
    text: 'var(--color-tile-light)',
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
  --textColor: ${({ $light }) => tileColors[$light].text};

  width: var(--tile-width);
  aspect-ratio: 1/1;
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

const Cord = styled.span`
  position: absolute;
  color: var(--textColor);
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: 700;
  filter: drop-shadow(0 2px 8px hsl(0 0 0 / 0.4));
`;

const CordLetter = styled(Cord)`
  bottom: 1px;
  right: 1px;
`;
const CordNumber = styled(Cord)`
  top: 1px;
  left: 1px;
`;

export default Tile;
