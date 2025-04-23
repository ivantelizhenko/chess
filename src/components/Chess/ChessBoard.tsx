import styled from 'styled-components';
import Tile from './Tile';
import { useState } from 'react';
import { createBoard } from '../../utils/helpers';

function ChessBoard() {
  const [board, setBoard] = useState(createBoard());
  // const chess = new Chess();
  // const posibleMoves = chess.moves()

  return (
    <Wrapper>
      {board.map(delegated => (
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
