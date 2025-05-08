import styled from 'styled-components';

import ButtonDefault from '../../components/DefaultButton';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { doPromotion } from '../store/boardSlice';
import Piece from '../chess/components/pieces/Piece';
import { PieceFigures } from '../chess/components/board/Tile/TileTypes';
import { closeModalWindow } from '../store/uiSlice';

const variationsOfPieces = [
  { name: 'n', id: Math.random() },
  { name: 'q', id: Math.random() },
  { name: 'b', id: Math.random() },
  { name: 'r', id: Math.random() },
];

function Promotion() {
  const dispatch = useAppDispatch();
  const color = useAppSelector(state => state.timer.turn);

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    const selectedPiece = e.currentTarget.dataset.name as Omit<
      PieceFigures,
      'p' | 'k'
    >;
    dispatch(doPromotion({ name: selectedPiece, color }));
    dispatch(closeModalWindow());
  }

  return (
    <Wrapper>
      {variationsOfPieces.map(piece => (
        <PromotionPieceButton
          key={piece.id}
          onClick={handleSubmit}
          data-name={piece.name}
        >
          <Piece
            piece={piece.name as PieceFigures}
            color={color}
            style={{ width: '100%', height: '100%' }}
          />
        </PromotionPieceButton>
      ))}
    </Wrapper>
  );
}

const PromotionPieceButton = styled(ButtonDefault)`
  width: 100%;
  height: 100%;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 30%;
`;

export default Promotion;
