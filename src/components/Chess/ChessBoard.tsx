import styled from 'styled-components';

import Tile from './Tile';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { setPossibleMovesForPiece } from './chessSlice';
import { showPossibleMovesForPiece } from './service/chess';
import Promotion from '../Promotion';
import ModalWindow from '../ModalWindow';

function ChessBoard() {
  const dispatch = useAppDispatch();
  const stateBoard = useAppSelector(state => state.chess.board);
  const selectedTile = useAppSelector(state => state.chess.selectedTile);
  const [showPromotion, setShowPromotion] = useState<boolean>(true);

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

      <ModalWindow
        isOpen={showPromotion}
        handleCloseModal={() => setShowPromotion(false)}
      >
        <Promotion color="w" />
      </ModalWindow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  place-self: center;

  aspect-ratio: 1/1;
  max-height: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;

export default ChessBoard;
