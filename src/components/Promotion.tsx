import styled from 'styled-components';
import Piece from './Chess/Piece';
import { PieceFigures } from './Chess/types/ChessTypes';
import ButtonDefault from './DefaultButton';
import { useAppDispatch, useAppSelector } from '../store';
import { doPromotion } from './Chess/chessSlice';

const variationsOfPieces = [
  { name: 'n', id: Math.random() },
  { name: 'q', id: Math.random() },
  { name: 'b', id: Math.random() },
  { name: 'r', id: Math.random() },
];

function Promotion() {
  const dispatch = useAppDispatch();
  const color = useAppSelector(state => state.chess.turn);
  const prevColor = color === 'w' ? 'b' : 'w';

  function handleSubmit(e: React.MouseEvent<HTMLElement>) {
    const selectedPiece = e.currentTarget.dataset.name as Omit<
      PieceFigures,
      'p' | 'k'
    >;
    dispatch(doPromotion({ name: selectedPiece, color: prevColor }));
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
            color={prevColor}
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
  background-color: var(--color-gray-100);
  place-self: center;
  display: flex;
  gap: 24px;
  width: 30%;
`;

export default Promotion;
