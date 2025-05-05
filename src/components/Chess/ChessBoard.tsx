import styled from 'styled-components';

import Tile from './Tile';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { setPossibleMovesForPiece } from './chessSlice';
import { showPossibleMovesForPiece } from './service/chess';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const stateBoard = useAppSelector(state => state.chess.board);
  const selectedTile = useAppSelector(state => state.chess.selectedTile);

  useEffect(() => {
    if (selectedTile) {
      const possibleMoves = showPossibleMovesForPiece(
        selectedTile.column,
        selectedTile.row
      );

      dispatch(setPossibleMovesForPiece(possibleMoves));
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
