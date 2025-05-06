import styled from 'styled-components';

import Tile from './Tile';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect } from 'react';
import { setPossibleMovesForPiece } from './chessSlice';
import { showPossibleMovesForPiece } from './service/chess';
import Promotion from '../Promotion';
import ModalWindow from '../ModalWindow';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const stateBoard = useAppSelector(state => state.chess.board);
  const selectedTile = useAppSelector(state => state.chess.selectedTile);
  const { promotion } = useAppSelector(state => state.chess);

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

      <ModalWindow isOpen={promotion.isOpen}>
        <Promotion />
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 100%;
  max-width: 100%;
  min-height: 0;
  grid-area: board;

  aspect-ratio: 1/1;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

export default ChessBoard;
