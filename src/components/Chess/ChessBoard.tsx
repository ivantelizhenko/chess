import styled from 'styled-components';

import Tile from './Tile';
import { useAppDispatch, useAppSelector } from '../../store';
import { Chess, Square } from 'chess.js';
import { useEffect } from 'react';
import { setPossibleMovesForPiece } from './chessSlice';
import { PosibleMoveType } from './types/ChessTypes';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const stateBoard = useAppSelector(state => state.chess.board);
  const selectedTile = useAppSelector(state => state.chess.selectedTile);

  useEffect(() => {
    if (selectedTile) {
      const chess = new Chess();
      const code = selectedTile.column + selectedTile.row;
      const posibleMoves = chess.moves({ square: code as Square }).map(cord => {
        const data = cord.split('');
        return {
          name: data.at(-3)?.toLowerCase() || 'p',
          column: data.at(-2),
          row: data.at(-1),
        };
      }) as PosibleMoveType[];
      dispatch(setPossibleMovesForPiece(posibleMoves));
    }
  }, [selectedTile, dispatch]);

  return (
    <Wrapper>
      {stateBoard.map(delegated => (
        <Tile key={delegated.column + delegated.row} {...delegated} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 100%;
  width: 100%;
`;

export default ChessBoard;
