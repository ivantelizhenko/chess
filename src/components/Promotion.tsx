import styled from 'styled-components';
import Piece from './Chess/Piece';
import { PieceColor, PieceFigures } from './Chess/types/ChessTypes';

function Promotion({ color }: { color: PieceColor }) {
  const variationsOfPieces = [
    { name: 'n', id: Math.random() },
    { name: 'q', id: Math.random() },
    { name: 'b', id: Math.random() },
    { name: 'r', id: Math.random() },
  ];

  return (
    <Wrapper>
      {variationsOfPieces.map(piece => (
        <Piece
          key={piece.id}
          piece={piece.name as PieceFigures}
          color={color}
          style={{ width: '15px', height: '15px' }}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

export default Promotion;
